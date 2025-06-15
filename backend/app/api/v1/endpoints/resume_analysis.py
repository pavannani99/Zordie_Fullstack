from typing import Any, Dict, List, Optional
import os
import json
import shutil
import time
from pathlib import Path
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status, Query, Request
from sqlalchemy.ext.asyncio import AsyncSession
import logging
from pydantic import BaseModel, Field
from fastapi.responses import JSONResponse

from app import schemas
from app.api import deps
from app.crud import crud_job, crud_job_application, resume_analysis
from app.models.user import User
from app.utils.resume_analyzer import ResumeAnalyzer
from app.middleware.rate_limit import rate_limiter


class AnalysisSummary(BaseModel):
    overall_score: float
    skill_alignment_score: Optional[float] = None
    project_validation_score: Optional[float] = None
    formatting_score: Optional[float] = None
    trustworthiness_score: Optional[float] = None
    credibility_score: Optional[float] = None
    matched_skills: List[str] = []
    missing_skills: List[str] = []
    top_projects: List[Dict[str, Any]] = []


class AnalysisRecommendations(BaseModel):
    recommendations: List[str] = []


class AnalysisComparison(BaseModel):
    job_ids: List[int]
    job_titles: List[str]
    overall_scores: List[float]
    skill_alignment_scores: List[Optional[float]]
    best_match_index: int
    best_match_job_id: int
    best_match_job_title: str


class TopJobMatch(BaseModel):
    job_id: int
    job_title: str
    company_name: Optional[str] = None
    overall_score: float
    skill_alignment_score: Optional[float] = None
    project_validation_score: Optional[float] = None


class UserAnalysisStats(BaseModel):
    total_analyses: int
    average_overall_score: float
    average_skill_alignment_score: Optional[float] = None
    average_project_validation_score: Optional[float] = None
    most_common_missing_skills: List[str] = []
    most_common_matched_skills: List[str] = []
    top_job_match: Optional[TopJobMatch] = None

router = APIRouter()

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# API Documentation
'''
Resume Analysis API
===================

This API provides endpoints for analyzing resumes against job descriptions and retrieving analysis results.

Endpoints:
----------

1. POST /analyze
   - Upload and analyze a resume against a job description
   - Returns the full analysis results

2. GET /results/{job_id}
   - Get the full analysis results for a specific job

3. GET /summary/{job_id}
   - Get a concise summary of the analysis results
   - Includes overall score, skill scores, matched/missing skills, and top projects

4. GET /recommendations/{job_id}
   - Get improvement recommendations based on the analysis

5. GET /user/analyses
   - Get all analyses for the current user

6. GET /user/top-matches
   - Get the user's best job matches based on resume analysis

7. GET /user/stats
   - Get statistical insights across all of a user's job applications
   - Includes average scores, common skills, and best match

8. GET /compare
   - Compare analysis results across multiple jobs
   - Helps identify the best job match
'''

# Define paths
UPLOAD_DIR = Path("./uploads")
OUTPUT_DIR = Path("./output")

# Ensure directories exist
UPLOAD_DIR.mkdir(exist_ok=True)
OUTPUT_DIR.mkdir(exist_ok=True)

# File validation constants
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB
ALLOWED_FILE_TYPES = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
ALLOWED_FILE_EXTENSIONS = [".pdf", ".docx"]

# Cache for analysis results (job_id + user_id -> analysis_result)
analysis_cache = {}

# Helper function for file validation
async def validate_resume_file(resume: UploadFile) -> None:
    """Validate resume file size and type"""
    # Check file size
    content = await resume.read(MAX_FILE_SIZE + 1)
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File size exceeds the maximum allowed size of {MAX_FILE_SIZE/1024/1024}MB"
        )
    
    # Reset file position after reading
    await resume.seek(0)
    
    # Check file type
    file_ext = os.path.splitext(resume.filename)[1].lower()
    if file_ext not in ALLOWED_FILE_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=f"File type {file_ext} not supported. Supported types: {', '.join(ALLOWED_FILE_EXTENSIONS)}"
        )
    
    # Check content type
    content_type = resume.content_type
    if content_type not in ALLOWED_FILE_TYPES:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=f"Content type {content_type} not supported. Supported types: {', '.join(ALLOWED_FILE_TYPES)}"
        )

@router.post("/analyze", response_model=Dict[str, Any])
@rate_limiter(max_requests=5, window_seconds=60)
async def analyze_resume(
    *,
    request: Request,
    db: AsyncSession = Depends(deps.get_db),
    resume: UploadFile = File(...),
    job_id: int = Form(...),
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Analyze a resume against a job description.
    
    This endpoint accepts a resume file upload and a job ID, then analyzes the resume
    against the job description to provide detailed feedback and scoring.
    
    Parameters:
    - resume: PDF file containing the user's resume
    - job_id: ID of the job to analyze against
    
    Returns:
    - Dictionary containing analysis results including:
      - overall_score: Overall match score (0-100)
      - skill_alignment: Detailed skill matching analysis
      - project_validation: Analysis of projects and their relevance
      - formatting: Assessment of resume formatting
      - trustworthiness: Evaluation of resume credibility
      - credibility: Analysis of claims and their verification
      - comprehensive_quality: Overall quality assessment
      - analysis_summary: Text summary of the analysis
    """
    try:
        # Validate the uploaded file
        await validate_resume_file(resume)
        
        # Check cache first
        cache_key = f"{current_user.id}_{job_id}"
        if cache_key in analysis_cache:
            logger.info(f"Using cached analysis results for user {current_user.id} and job {job_id}")
            return analysis_cache[cache_key]
        
        # Get job details
        job = await crud_job.get(db, id=job_id)
        if not job:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Job with ID {job_id} not found",
            )
        
        # Save the uploaded resume with a unique filename
        user_id = current_user.id
        timestamp = int(time.time())
        filename = f"{user_id}_{job_id}_{timestamp}.pdf"
        resume_path = UPLOAD_DIR / filename
        
        with open(resume_path, "wb") as buffer:
            shutil.copyfileobj(resume.file, buffer)
        
        # Extract job details for analysis
        job_description = job.description
        required_skills = [skill.name for skill in job.skills] if job.skills else []
        
        # Initialize the resume analyzer
        analyzer = ResumeAnalyzer()
        
        # Analyze the resume
        analysis_results = analyzer.analyze_resume_for_job(
            resume_path=str(resume_path),
            job_description=job_description,
            required_skills=required_skills
        )
        
        # Cache the results
        analysis_cache[cache_key] = analysis_results
        
        # Save the analysis results to the database
        analysis_obj = schemas.ResumeAnalysisCreate(
            job_id=job_id,
            user_id=current_user.id,
            overall_score=analysis_results.get("overall_score", 0),
            skill_alignment_score=analysis_results.get("skill_alignment_score"),
            project_validation_score=analysis_results.get("project_validation_score"),
            formatting_score=analysis_results.get("formatting_score"),
            trustworthiness_score=analysis_results.get("trustworthiness_score"),
            credibility_score=analysis_results.get("credibility_score"),
            analysis_data=analysis_results
        )
        
        db_analysis = await resume_analysis.create_with_user_and_job(
            db, obj_in=analysis_obj, user_id=current_user.id, job_id=job_id
        )
        
        return analysis_results
    
    except Exception as e:
        logger.error(f"Error analyzing resume: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error analyzing resume: {str(e)}",
        )
    finally:
        resume.file.close()


@router.get("/summary/{job_id}", response_model=AnalysisSummary)
async def get_analysis_summary(
    job_id: int,
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get a summary of the resume analysis results for a specific job application.
    
    This endpoint provides a concise summary of the analysis results, focusing on
    the most important metrics and insights for quick review.
    
    Parameters:
    - job_id: ID of the job to get analysis summary for
    
    Returns:
    - AnalysisSummary object containing:
      - overall_score: Overall match score (0-100)
      - skill_alignment_score: Score for skill matching
      - project_validation_score: Score for project relevance
      - formatting_score: Score for resume formatting
      - trustworthiness_score: Score for resume credibility
      - credibility_score: Score for claim verification
      - matched_skills: List of skills found in both resume and job description
      - missing_skills: List of skills in job description but missing from resume
      - top_projects: List of top-scoring projects from the resume
    """
    # Get the full analysis results
    analysis_results = await get_analysis_results_internal(job_id, db, current_user)
    
    # Extract the summary information
    summary = AnalysisSummary(
        overall_score=analysis_results.get("overall_score", 0),
        skill_alignment_score=analysis_results.get("skill_alignment_score"),
        project_validation_score=analysis_results.get("project_validation_score"),
        formatting_score=analysis_results.get("formatting_score"),
        trustworthiness_score=analysis_results.get("trustworthiness_score"),
        credibility_score=analysis_results.get("credibility_score"),
        matched_skills=ResumeAnalyzer.get_matched_skills(analysis_results),
        missing_skills=ResumeAnalyzer.get_missing_skills(analysis_results),
        top_projects=ResumeAnalyzer.get_top_projects(analysis_results)
    )
    
    return summary


@router.get("/recommendations/{job_id}", response_model=AnalysisRecommendations)
async def get_analysis_recommendations(
    job_id: int,
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get recommendations based on the resume analysis results for a specific job application.
    """
    # Get the full analysis results
    analysis_results = await get_analysis_results_internal(job_id, db, current_user)
    
    # Generate recommendations
    recommendations = ResumeAnalyzer.get_improvement_recommendations(analysis_results)
    
    return AnalysisRecommendations(recommendations=recommendations)


async def get_analysis_results_internal(
    job_id: int,
    db: AsyncSession,
    current_user: User,
) -> Dict[str, Any]:
    """
    Internal function to get resume analysis results for a specific job application.
    """
    # Check if job exists
    job = await crud_job.get(db, id=job_id)
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found",
        )
    
    try:
        # Check if analysis exists in the database
        analysis = await resume_analysis.get_by_user_and_job(
            db, user_id=current_user.id, job_id=job_id
        )
        
        if analysis:
            # Return the saved analysis results
            return analysis.analysis_data
        
        # Check if user has applied to this job
        application = await crud_job_application.get_by_user_and_job(
            db, user_id=current_user.id, job_id=job_id
        )
        
        if not application:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No application or analysis found for this job",
            )
        
        # If there's an application but no analysis, generate a new analysis
        # This would typically happen if the user uploaded a resume but the analysis wasn't saved
        # For now, we'll use the sample data
        analysis_results = ResumeAnalyzer._read_analysis_results()
        
        # Save the analysis results to the database
        analysis_obj = schemas.ResumeAnalysisCreate(
            job_id=job_id,
            user_id=current_user.id,
            overall_score=analysis_results.get("overall_score", 0),
            skill_alignment_score=analysis_results.get("skill_alignment_score"),
            project_validation_score=analysis_results.get("project_validation_score"),
            formatting_score=analysis_results.get("formatting_score"),
            trustworthiness_score=analysis_results.get("trustworthiness_score"),
            credibility_score=analysis_results.get("credibility_score"),
            analysis_data=analysis_results
        )
        
        db_analysis = await resume_analysis.create_with_user_and_job(
            db, obj_in=analysis_obj, user_id=current_user.id, job_id=job_id
        )
        
        return analysis_results
    
    except Exception as e:
        logger.error(f"Error retrieving analysis results: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving analysis results: {str(e)}",
        )


@router.get("/results/{job_id}", response_model=Dict[str, Any])
async def get_analysis_results(
    job_id: int,
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get resume analysis results for a specific job application.
    """
    return await get_analysis_results_internal(job_id, db, current_user)


@router.get("/user/analyses", response_model=List[Dict[str, Any]])
async def get_user_analyses(
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
) -> Any:
    """
    Get all resume analyses for the current user.
    """
    analyses = await resume_analysis.get_multi_by_user(
        db, user_id=current_user.id, skip=skip, limit=limit
    )
    return analyses


@router.get("/top-matches", response_model=List[TopJobMatch])
async def get_top_job_matches(
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
    limit: int = Query(5, ge=1, le=20),
) -> Any:
    """
    Get top job matches for the current user based on resume analysis scores.
    """
    # Get top analyses for the user
    top_analyses = await resume_analysis.get_top_analyses_by_user(
        db, user_id=current_user.id, limit=limit
    )
    
    # Build response with job details
    top_matches = []
    for analysis in top_analyses:
        # Get job details
        job = await crud_job.get(db, id=analysis.job_id)
        if job:
            top_matches.append(TopJobMatch(
                job_id=job.id,
                job_title=job.title,
                company_name=job.company_name,
                overall_score=analysis.overall_score,
                skill_alignment_score=analysis.skill_alignment_score,
                project_validation_score=analysis.project_validation_score
            ))
    
    return top_matches


@router.get("/user/stats", response_model=UserAnalysisStats)
async def get_user_analysis_stats(
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get statistics about a user's resume analyses across all jobs.
    """
    # Get all analyses for the user
    analyses = await resume_analysis.get_multi_by_user(
        db, user_id=current_user.id, skip=0, limit=100
    )
    
    if not analyses:
        return UserAnalysisStats(
            total_analyses=0,
            average_overall_score=0,
        )
    
    # Calculate average scores
    total_analyses = len(analyses)
    overall_scores = [a.overall_score for a in analyses if a.overall_score is not None]
    skill_scores = [a.skill_alignment_score for a in analyses if a.skill_alignment_score is not None]
    project_scores = [a.project_validation_score for a in analyses if a.project_validation_score is not None]
    
    avg_overall = sum(overall_scores) / len(overall_scores) if overall_scores else 0
    avg_skill = sum(skill_scores) / len(skill_scores) if skill_scores else None
    avg_project = sum(project_scores) / len(project_scores) if project_scores else None
    
    # Get most common skills
    missing_skills_counter = {}
    matched_skills_counter = {}
    
    for analysis in analyses:
        # Get the full analysis data
        analysis_data = analysis.analysis_data
        
        # Count missing skills
        missing_skills = ResumeAnalyzer.get_missing_skills(analysis_data)
        for skill in missing_skills:
            missing_skills_counter[skill] = missing_skills_counter.get(skill, 0) + 1
        
        # Count matched skills
        matched_skills = ResumeAnalyzer.get_matched_skills(analysis_data)
        for skill in matched_skills:
            matched_skills_counter[skill] = matched_skills_counter.get(skill, 0) + 1
    
    # Get most common skills (top 5)
    most_common_missing = sorted(missing_skills_counter.items(), key=lambda x: x[1], reverse=True)[:5]
    most_common_matched = sorted(matched_skills_counter.items(), key=lambda x: x[1], reverse=True)[:5]
    
    # Get top job match
    top_job_match = None
    if analyses:
        # Get the analysis with the highest overall score
        top_analysis = max(analyses, key=lambda x: x.overall_score if x.overall_score is not None else 0)
        # Get job details
        job = await crud_job.get(db, id=top_analysis.job_id)
        if job:
            top_job_match = TopJobMatch(
                job_id=job.id,
                job_title=job.title,
                company_name=job.company_name,
                overall_score=top_analysis.overall_score,
                skill_alignment_score=top_analysis.skill_alignment_score,
                project_validation_score=top_analysis.project_validation_score
            )
    
    return UserAnalysisStats(
        total_analyses=total_analyses,
        average_overall_score=avg_overall,
        average_skill_alignment_score=avg_skill,
        average_project_validation_score=avg_project,
        most_common_missing_skills=[skill for skill, _ in most_common_missing],
        most_common_matched_skills=[skill for skill, _ in most_common_matched],
        top_job_match=top_job_match
    )


@router.get("/compare", response_model=AnalysisComparison)
async def compare_job_analyses(
    job_ids: List[int] = Query(..., description="List of job IDs to compare"),
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Compare resume analyses for multiple jobs to find the best match.
    """
    if len(job_ids) < 2:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="At least two job IDs are required for comparison",
        )
    
    # Get analyses for all jobs
    analyses_data = []
    job_titles = []
    
    for job_id in job_ids:
        try:
            # Get job info
            job = await crud_job.get(db, id=job_id)
            if not job:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Job with ID {job_id} not found",
                )
            job_titles.append(job.title)
            
            # Get analysis for this job
            analysis_results = await get_analysis_results_internal(job_id, db, current_user)
            analyses_data.append(analysis_results)
        except HTTPException as e:
            if e.status_code == status.HTTP_404_NOT_FOUND:
                # If no analysis exists, use a placeholder with zero scores
                analyses_data.append({
                    "overall_score": 0,
                    "skill_alignment_score": 0,
                })
            else:
                raise
    
    # Extract scores for comparison
    overall_scores = [data.get("overall_score", 0) for data in analyses_data]
    skill_alignment_scores = [data.get("skill_alignment_score") for data in analyses_data]
    
    # Find the best match (highest overall score)
    best_match_index = overall_scores.index(max(overall_scores)) if overall_scores else 0
    best_match_job_id = job_ids[best_match_index]
    best_match_job_title = job_titles[best_match_index]
    
    return AnalysisComparison(
        job_ids=job_ids,
        job_titles=job_titles,
        overall_scores=overall_scores,
        skill_alignment_scores=skill_alignment_scores,
        best_match_index=best_match_index,
        best_match_job_id=best_match_job_id,
        best_match_job_title=best_match_job_title
    )

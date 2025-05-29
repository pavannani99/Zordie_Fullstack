"""
Celery tasks for asynchronous processing.
"""

import logging
import os
import time
from pathlib import Path
from celery import shared_task
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import sessionmaker
import asyncio

from app.core.config import settings
from app.db.session import engine
from app.utils.resume_analyzer import ResumeAnalyzer
from app.utils.storage import StorageManager
from app.db.optimize import optimize_database
from app.crud import resume_analysis, crud_job
from app.schemas.resume_analysis import ResumeAnalysisCreate

# Configure logging
logger = logging.getLogger(__name__)

# Create async session factory
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

# Helper function to run async code in a Celery task
def run_async(coro):
    """Run an async coroutine in a synchronous context."""
    loop = asyncio.get_event_loop()
    return loop.run_until_complete(coro)

@shared_task(bind=True, name="app.worker.tasks.analyze_resume_task")
def analyze_resume_task(self, resume_path: str, job_id: int, user_id: int):
    """
    Analyze a resume against a job description asynchronously.
    
    Args:
        resume_path: Path to the resume file
        job_id: ID of the job to analyze against
        user_id: ID of the user who uploaded the resume
    
    Returns:
        Analysis results
    """
    logger.info(f"Starting resume analysis for user {user_id}, job {job_id}")
    
    try:
        # Create async session
        async def _analyze_resume():
            async with AsyncSessionLocal() as db:
                # Get job details
                job = await crud_job.get(db, id=job_id)
                if not job:
                    raise ValueError(f"Job with ID {job_id} not found")
                
                # Extract job details for analysis
                job_description = job.description
                required_skills = [skill.name for skill in job.skills] if job.skills else []
                
                # Initialize the resume analyzer
                analyzer = ResumeAnalyzer()
                
                # Analyze the resume
                analysis_results = analyzer.analyze_resume_for_job(
                    resume_path=resume_path,
                    job_description=job_description,
                    required_skills=required_skills
                )
                
                # Save the analysis results to the database
                analysis_obj = ResumeAnalysisCreate(
                    job_id=job_id,
                    user_id=user_id,
                    overall_score=analysis_results.get("overall_score", 0),
                    skill_alignment_score=analysis_results.get("skill_alignment_score"),
                    project_validation_score=analysis_results.get("project_validation_score"),
                    formatting_score=analysis_results.get("formatting_score"),
                    trustworthiness_score=analysis_results.get("trustworthiness_score"),
                    credibility_score=analysis_results.get("credibility_score"),
                    analysis_data=analysis_results
                )
                
                db_analysis = await resume_analysis.create_with_user_and_job(
                    db, obj_in=analysis_obj, user_id=user_id, job_id=job_id
                )
                
                logger.info(f"Resume analysis completed for user {user_id}, job {job_id}")
                return analysis_results
        
        # Run the async function
        return run_async(_analyze_resume())
    
    except Exception as e:
        logger.error(f"Error in analyze_resume_task: {str(e)}")
        self.retry(exc=e, countdown=60, max_retries=3)

@shared_task(name="app.worker.tasks.cleanup_files_task")
def cleanup_files_task():
    """
    Clean up temporary files that are older than the retention period.
    """
    logger.info("Starting file cleanup task")
    
    try:
        # Define paths
        upload_dir = Path("./uploads")
        output_dir = Path("./output")
        
        # Run the cleanup
        async def _cleanup_files():
            storage_manager = StorageManager()
            
            # Clean up upload directory
            upload_count = await storage_manager.cleanup_old_files(
                upload_dir, 
                settings.TEMP_FILE_RETENTION_DAYS
            )
            
            # Clean up output directory
            output_count = await storage_manager.cleanup_old_files(
                output_dir, 
                settings.TEMP_FILE_RETENTION_DAYS
            )
            
            logger.info(f"Cleanup task completed: removed {upload_count + output_count} files")
            return {"files_removed": upload_count + output_count}
        
        # Run the async function
        return run_async(_cleanup_files())
    
    except Exception as e:
        logger.error(f"Error in cleanup_files_task: {str(e)}")

@shared_task(name="app.worker.tasks.optimize_database_task")
def optimize_database_task():
    """
    Optimize the database by creating indexes and running VACUUM ANALYZE.
    """
    logger.info("Starting database optimization task")
    
    try:
        # Run the optimization
        async def _optimize_database():
            async with AsyncSessionLocal() as db:
                await optimize_database(db)
                logger.info("Database optimization completed")
                return {"status": "success"}
        
        # Run the async function
        return run_async(_optimize_database())
    
    except Exception as e:
        logger.error(f"Error in optimize_database_task: {str(e)}")

@shared_task(name="app.worker.tasks.migrate_to_s3_task")
def migrate_to_s3_task():
    """
    Migrate local files to S3 storage.
    This task will be implemented when S3 integration is ready.
    """
    logger.info("S3 migration task is not yet implemented")
    return {"status": "pending", "message": "S3 migration will be implemented when AWS S3 credentials are provided"}

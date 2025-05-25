from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta
import random

from app.api.deps import get_current_user
from app.schemas.user import User

router = APIRouter()

# Mock data generators for dashboard
def generate_recruitment_metrics():
    return {
        "total_applications": random.randint(2500, 4000),
        "hires_this_month": random.randint(20, 35),
        "time_to_hire": random.randint(30, 45),
        "cost_per_hire": round(random.uniform(3.5, 5.5), 2),
        "offer_accept_rate": random.randint(80, 95),
        "quality_score": round(random.uniform(7.8, 9.2), 1),
        "trends": {
            "applications": [random.randint(150, 300) for _ in range(7)],
            "hires": [random.randint(2, 8) for _ in range(7)],
            "time_to_hire": [random.randint(30, 45) for _ in range(7)]
        }
    }

def generate_candidate_matches(count: int = 5):
    roles = ["Frontend Developer", "Full Stack Engineer", "DevOps Engineer", "UX Designer", 
             "Product Manager", "Data Scientist", "Backend Developer", "QA Engineer"]
    levels = ["Junior", "Mid-level", "Senior", "Lead"]
    skills = ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "MongoDB", 
              "PostgreSQL", "GraphQL", "UI/UX", "CI/CD", "Kubernetes", "Java", "Go"]
    
    candidates = []
    for i in range(count):
        role = random.choice(roles)
        candidate_skills = random.sample(skills, random.randint(3, 6))
        strengths = random.sample(candidate_skills, min(3, len(candidate_skills)))
        all_skills = set(skills)
        weaknesses = random.sample(list(all_skills - set(candidate_skills)), min(2, len(all_skills - set(candidate_skills))))
        
        match_score = random.randint(70, 98)
        skills_score = random.randint(70, 95)
        experience_score = random.randint(70, 95)
        education_score = random.randint(70, 95)
        
        candidates.append({
            "id": i + 1,
            "name": f"Candidate {i + 1}",
            "role": role,
            "match": match_score,
            "skills": skills_score,
            "experience": experience_score,
            "education": education_score,
            "contact": f"candidate{i+1}@example.com",
            "level": random.choice(levels),
            "strengths": strengths,
            "weaknesses": weaknesses,
            "applied_date": (datetime.now() - timedelta(days=random.randint(1, 30))).isoformat()
        })
    
    # Sort by match score descending
    candidates.sort(key=lambda x: x["match"], reverse=True)
    return candidates

def generate_job_analytics():
    return {
        "open_positions": random.randint(5, 15),
        "avg_applications_per_job": random.randint(30, 100),
        "top_sources": [
            {"name": "LinkedIn", "value": random.randint(30, 50)},
            {"name": "Indeed", "value": random.randint(15, 30)},
            {"name": "Referrals", "value": random.randint(10, 25)},
            {"name": "Company Website", "value": random.randint(5, 15)},
            {"name": "Other", "value": random.randint(5, 10)}
        ],
        "application_trends": [random.randint(20, 100) for _ in range(30)],
        "skill_demand": [
            {"name": "JavaScript", "value": random.randint(70, 100)},
            {"name": "React", "value": random.randint(60, 90)},
            {"name": "Python", "value": random.randint(50, 85)},
            {"name": "AWS", "value": random.randint(40, 80)},
            {"name": "SQL", "value": random.randint(30, 75)}
        ]
    }

def generate_resume_analysis():
    return {
        "overall_score": random.randint(75, 95),
        "skills_match": random.randint(70, 95),
        "experience_relevance": random.randint(70, 95),
        "education_fit": random.randint(70, 95),
        "communication_skills": random.randint(70, 95),
        "technical_proficiency": random.randint(70, 95),
        "leadership_potential": random.randint(70, 95),
        "cultural_fit": random.randint(70, 95)
    }

@router.get("/dashboard", response_model=Dict[str, Any])
async def get_dashboard_data(current_user: User = Depends(get_current_user)):
    """
    Get Optimus dashboard data including recruitment metrics, candidate matches, and job analytics
    """
    return {
        "recruitment_metrics": generate_recruitment_metrics(),
        "candidate_matches": generate_candidate_matches(10),
        "job_analytics": generate_job_analytics(),
        "resume_analysis": generate_resume_analysis()
    }

@router.post("/analyze-resume", response_model=Dict[str, Any])
async def analyze_resume(
    job_description: str,
    current_user: User = Depends(get_current_user)
):
    """
    Analyze a resume against a job description
    """
    # In a real implementation, this would process the resume and job description
    # For now, we'll return mock data
    return {
        "analysis": generate_resume_analysis(),
        "job_match": random.randint(70, 95),
        "recommendations": [
            "Highlight more experience with cloud technologies",
            "Add specific metrics to quantify achievements",
            "Include more details about team leadership experience"
        ]
    }

@router.get("/job-insights/{job_id}", response_model=Dict[str, Any])
async def get_job_insights(
    job_id: int,
    current_user: User = Depends(get_current_user)
):
    """
    Get insights for a specific job
    """
    return {
        "job_id": job_id,
        "title": f"Job Position {job_id}",
        "applications": random.randint(30, 150),
        "qualified_candidates": random.randint(10, 50),
        "time_open": random.randint(5, 60),
        "candidate_demographics": {
            "experience_levels": {
                "entry": random.randint(10, 30),
                "mid": random.randint(30, 50),
                "senior": random.randint(20, 40)
            },
            "education": {
                "bachelor": random.randint(40, 60),
                "master": random.randint(20, 40),
                "phd": random.randint(5, 15),
                "other": random.randint(5, 15)
            }
        },
        "skill_distribution": [
            {"name": "Required Skill 1", "candidates_with_skill": random.randint(50, 90)},
            {"name": "Required Skill 2", "candidates_with_skill": random.randint(40, 80)},
            {"name": "Required Skill 3", "candidates_with_skill": random.randint(30, 70)},
            {"name": "Required Skill 4", "candidates_with_skill": random.randint(20, 60)},
            {"name": "Required Skill 5", "candidates_with_skill": random.randint(10, 50)}
        ]
    }

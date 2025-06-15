from typing import Dict, List, Optional, Any
from pydantic import BaseModel
from datetime import datetime


class SkillAlignment(BaseModel):
    overall_alignment: float
    skill_scores: Dict[str, Any]


class ProjectValidation(BaseModel):
    overall_score: float
    projects: Dict[str, Any]


class ResumeFormatting(BaseModel):
    overall_score: float
    issues: List[Dict[str, Any]]


class ResumeTrustworthiness(BaseModel):
    overall_score: float
    issues: List[Dict[str, Any]]


class ResumeCredibility(BaseModel):
    overall_score: float
    issues: List[Dict[str, Any]]


class ResumeAnalysisResult(BaseModel):
    overall_score: float
    skill_alignment: Optional[SkillAlignment] = None
    project_validation: Optional[ProjectValidation] = None
    formatting: Optional[ResumeFormatting] = None
    trustworthiness: Optional[ResumeTrustworthiness] = None
    credibility: Optional[ResumeCredibility] = None
    analysis_summary: Optional[str] = None
    created_at: datetime = datetime.now()

    class Config:
        from_attributes = True


class ResumeAnalysisCreate(BaseModel):
    job_id: int
    user_id: int
    overall_score: float
    skill_alignment_score: Optional[float] = None
    project_validation_score: Optional[float] = None
    formatting_score: Optional[float] = None
    trustworthiness_score: Optional[float] = None
    credibility_score: Optional[float] = None
    analysis_data: Dict[str, Any]


class ResumeAnalysisUpdate(BaseModel):
    overall_score: Optional[float] = None
    skill_alignment_score: Optional[float] = None
    project_validation_score: Optional[float] = None
    formatting_score: Optional[float] = None
    trustworthiness_score: Optional[float] = None
    credibility_score: Optional[float] = None
    analysis_data: Optional[Dict[str, Any]] = None


class ResumeAnalysisInDBBase(BaseModel):
    id: int
    job_id: int
    user_id: int
    overall_score: float
    skill_alignment_score: Optional[float] = None
    project_validation_score: Optional[float] = None
    formatting_score: Optional[float] = None
    trustworthiness_score: Optional[float] = None
    credibility_score: Optional[float] = None
    analysis_data: Dict[str, Any]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ResumeAnalysis(ResumeAnalysisInDBBase):
    pass

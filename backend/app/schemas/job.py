from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel
from app.models.job import JobStatus, JobType, ExperienceLevel


# Job schemas
class JobBase(BaseModel):
    title: str
    company: str
    location: str
    description: str
    requirements: str
    salary_min: Optional[int] = None
    salary_max: Optional[int] = None
    status: str = JobStatus.ACTIVE.value
    job_type: str = JobType.FULL_TIME.value
    experience_level: str = ExperienceLevel.MID.value


class JobCreate(JobBase):
    pass


class JobUpdate(BaseModel):
    title: Optional[str] = None
    company: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None
    requirements: Optional[str] = None
    salary_min: Optional[int] = None
    salary_max: Optional[int] = None
    status: Optional[str] = None
    job_type: Optional[str] = None
    experience_level: Optional[str] = None


class JobInDBBase(JobBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class Job(JobInDBBase):
    pass


class JobWithApplicationsCount(Job):
    applications_count: int


# Job Application schemas
class JobApplicationBase(BaseModel):
    job_id: int
    cover_letter: Optional[str] = None
    resume_url: Optional[str] = None
    status: str = "applied"


class JobApplicationCreate(JobApplicationBase):
    pass


class JobApplicationUpdate(BaseModel):
    cover_letter: Optional[str] = None
    resume_url: Optional[str] = None
    status: Optional[str] = None


class JobApplicationInDBBase(JobApplicationBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class JobApplication(JobApplicationInDBBase):
    pass


class JobApplicationWithDetails(JobApplication):
    job: Job

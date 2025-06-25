from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime


class LearningBase(BaseModel):
    course_id: str
    course_name: str
    progress: float = 0.0
    skills_acquired: Optional[List[str]] = None
    completion_date: Optional[datetime] = None


class LearningCreate(LearningBase):
    user_id: int


class LearningUpdate(BaseModel):
    course_name: Optional[str] = None
    progress: Optional[float] = None
    skills_acquired: Optional[List[str]] = None
    completion_date: Optional[datetime] = None


class LearningInDBBase(LearningBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class Learning(LearningInDBBase):
    pass
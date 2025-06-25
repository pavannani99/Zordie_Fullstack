from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class FeedbackBase(BaseModel):
    mood_score: Optional[float] = None
    feedback_text: Optional[str] = None
    feedback_type: str


class FeedbackCreate(FeedbackBase):
    user_id: int


class FeedbackUpdate(BaseModel):
    mood_score: Optional[float] = None
    feedback_text: Optional[str] = None
    feedback_type: Optional[str] = None


class FeedbackInDBBase(FeedbackBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class Feedback(FeedbackInDBBase):
    pass
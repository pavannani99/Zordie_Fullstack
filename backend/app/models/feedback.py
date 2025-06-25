from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float, Text
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class Feedback(Base):
    """
    Database model for user feedback (for ONIX and PRIME agents).
    """
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    mood_score = Column(Float, nullable=True)  # 1-10 scale
    feedback_text = Column(Text, nullable=True)
    feedback_type = Column(String, nullable=False)  # daily, weekly, project, etc.
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    
    # Relationships
    user = relationship("User", back_populates="feedbacks")
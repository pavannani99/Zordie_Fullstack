from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class Learning(Base):
    """
    Database model for user learning history (for NOVA agent).
    """
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    course_id = Column(String, nullable=False)
    course_name = Column(String, nullable=False)
    progress = Column(Float, nullable=False, default=0.0)  # 0-100%
    skills_acquired = Column(JSON, nullable=True)  # List of skills
    completion_date = Column(DateTime(timezone=True), nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    # Relationships
    user = relationship("User", back_populates="learning_history")
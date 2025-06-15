from sqlalchemy import Column, Integer, Float, String, ForeignKey, DateTime, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class ResumeAnalysis(Base):
    """
    Database model for resume analysis results.
    """
    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey("job.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    
    # Analysis scores
    overall_score = Column(Float, nullable=False)
    skill_alignment_score = Column(Float, nullable=True)
    project_validation_score = Column(Float, nullable=True)
    formatting_score = Column(Float, nullable=True)
    trustworthiness_score = Column(Float, nullable=True)
    credibility_score = Column(Float, nullable=True)
    
    # Full analysis data as JSON
    analysis_data = Column(JSON, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    # Relationships
    job = relationship("Job", back_populates="resume_analyses")
    user = relationship("User", back_populates="resume_analyses")

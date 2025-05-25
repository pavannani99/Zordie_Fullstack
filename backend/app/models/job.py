from sqlalchemy import Column, String, Integer, Boolean, Text, ForeignKey, DateTime, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
import enum
from app.db.base_class import Base


class JobStatus(str, enum.Enum):
    ACTIVE = "active"
    CLOSED = "closed"
    DRAFT = "draft"
    ARCHIVED = "archived"


class JobType(str, enum.Enum):
    FULL_TIME = "full_time"
    PART_TIME = "part_time"
    CONTRACT = "contract"
    FREELANCE = "freelance"
    INTERNSHIP = "internship"


class ExperienceLevel(str, enum.Enum):
    ENTRY = "entry"
    JUNIOR = "junior"
    MID = "mid"
    SENIOR = "senior"
    LEAD = "lead"
    EXECUTIVE = "executive"


class Job(Base):
    """Model for job listings"""
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(255), index=True)
    company: Mapped[str] = mapped_column(String(255), index=True)
    location: Mapped[str] = mapped_column(String(255), index=True)
    description: Mapped[str] = mapped_column(Text)
    requirements: Mapped[str] = mapped_column(Text)
    salary_min: Mapped[int] = mapped_column(Integer, nullable=True)
    salary_max: Mapped[int] = mapped_column(Integer, nullable=True)
    status: Mapped[str] = mapped_column(String(50), default=JobStatus.ACTIVE.value)
    job_type: Mapped[str] = mapped_column(String(50), default=JobType.FULL_TIME.value)
    experience_level: Mapped[str] = mapped_column(String(50), default=ExperienceLevel.MID.value)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id"))
    
    # Relationships
    user = relationship("User", back_populates="jobs")
    applications = relationship("JobApplication", back_populates="job", cascade="all, delete-orphan")


class JobApplication(Base):
    """Model for job applications"""
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    job_id: Mapped[int] = mapped_column(Integer, ForeignKey("job.id"))
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id"))
    cover_letter: Mapped[str] = mapped_column(Text, nullable=True)
    resume_url: Mapped[str] = mapped_column(String(255), nullable=True)
    status: Mapped[str] = mapped_column(String(50), default="applied")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    job = relationship("Job", back_populates="applications")
    user = relationship("User", back_populates="applications")

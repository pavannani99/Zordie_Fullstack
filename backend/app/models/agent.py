from sqlalchemy import Column, Integer, Float, String, ForeignKey, DateTime, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class AgentOutput(Base):
    """
    Database model for AI agent outputs (nudges, suggestions, predictions).
    """
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    agent_id = Column(String, nullable=False)  # e.g., "LAXMI", "ONIX", "PRIME", "NOVA"
    message = Column(String, nullable=False)
    confidence_score = Column(Float, nullable=True)
    agent_metadata = Column(JSON, nullable=True)  # Renamed from metadata to agent_metadata
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    # Relationships
    user = relationship("User", back_populates="agent_outputs")
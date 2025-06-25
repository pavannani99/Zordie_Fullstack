from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime


class AgentOutputBase(BaseModel):
    agent_id: str
    message: str
    confidence_score: Optional[float] = None
    metadata: Optional[Dict[str, Any]] = None  # Keep as metadata in the schema


class AgentOutputCreate(AgentOutputBase):
    user_id: int


class AgentOutputUpdate(BaseModel):
    agent_id: Optional[str] = None
    message: Optional[str] = None
    confidence_score: Optional[float] = None
    metadata: Optional[Dict[str, Any]] = None


class AgentOutputInDBBase(AgentOutputBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
        # Add this field mapping to connect schema's metadata to model's agent_metadata
        model_config = {"populate_by_name": True}


class AgentOutput(AgentOutputInDBBase):
    pass
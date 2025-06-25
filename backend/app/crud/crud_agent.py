from typing import List, Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.base import CRUDBase
from app.models.agent import AgentOutput
from app.schemas.agent import AgentOutputCreate, AgentOutputUpdate


class CRUDAgentOutput(CRUDBase[AgentOutput, AgentOutputCreate, AgentOutputUpdate]):
    async def create_with_user(self, db: AsyncSession, *, obj_in: AgentOutputCreate, user_id: int) -> AgentOutput:
        """Create a new agent output with user ID"""
        # Update the create_with_user method to use agent_metadata instead of metadata
        db_obj = AgentOutput(
            user_id=user_id,
            agent_id=obj_in.agent_id,
            message=obj_in.message,
            confidence_score=obj_in.confidence_score,
            agent_metadata=obj_in.metadata,  # Map from schema's metadata to model's agent_metadata
        )
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def get_multi_by_user(self, db: AsyncSession, *, user_id: int, skip: int = 0, limit: int = 100) -> List[AgentOutput]:
        """Get multiple agent outputs by user ID"""
        query = select(self.model).where(
            self.model.user_id == user_id
        ).offset(skip).limit(limit)
        result = await db.execute(query)
        return result.scalars().all()

    async def get_multi_by_agent(self, db: AsyncSession, *, agent_id: str, skip: int = 0, limit: int = 100) -> List[AgentOutput]:
        """Get multiple agent outputs by agent ID"""
        query = select(self.model).where(
            self.model.agent_id == agent_id
        ).offset(skip).limit(limit)
        result = await db.execute(query)
        return result.scalars().all()


agent_output = CRUDAgentOutput(AgentOutput)
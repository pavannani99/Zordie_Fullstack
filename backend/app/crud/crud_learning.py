from typing import List

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.base import CRUDBase
from app.models.learning import Learning
from app.schemas.learning import LearningCreate, LearningUpdate


class CRUDLearning(CRUDBase[Learning, LearningCreate, LearningUpdate]):
    async def get_multi_by_user(
        self, db: AsyncSession, *, user_id: int, skip: int = 0, limit: int = 100
    ) -> List[Learning]:
        query = select(self.model).where(
            self.model.user_id == user_id
        ).offset(skip).limit(limit)
        result = await db.execute(query)
        return result.scalars().all()


crud_learning = CRUDLearning(Learning)
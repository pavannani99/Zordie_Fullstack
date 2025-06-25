from typing import List

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.base import CRUDBase
from app.models.feedback import Feedback
from app.schemas.feedback import FeedbackCreate, FeedbackUpdate


class CRUDFeedback(CRUDBase[Feedback, FeedbackCreate, FeedbackUpdate]):
    async def get_multi_by_user(
        self, db: AsyncSession, *, user_id: int, skip: int = 0, limit: int = 100
    ) -> List[Feedback]:
        query = select(self.model).where(
            self.model.user_id == user_id
        ).offset(skip).limit(limit)
        result = await db.execute(query)
        return result.scalars().all()


crud_feedback = CRUDFeedback(Feedback)
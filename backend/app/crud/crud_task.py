from typing import List

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.base import CRUDBase
from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate


class CRUDTask(CRUDBase[Task, TaskCreate, TaskUpdate]):
    async def get_multi_by_user(
        self, db: AsyncSession, *, user_id: int, skip: int = 0, limit: int = 100
    ) -> List[Task]:
        query = select(self.model).where(
            self.model.user_id == user_id
        ).offset(skip).limit(limit)
        result = await db.execute(query)
        return result.scalars().all()


crud_task = CRUDTask(Task)
from typing import Any, Dict, List, Optional, Union

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.base import CRUDBase
from app.models.resume_analysis import ResumeAnalysis
from app.schemas.resume_analysis import ResumeAnalysisCreate, ResumeAnalysisUpdate


class CRUDResumeAnalysis(CRUDBase[ResumeAnalysis, ResumeAnalysisCreate, ResumeAnalysisUpdate]):
    async def create_with_user_and_job(
        self, db: AsyncSession, *, obj_in: ResumeAnalysisCreate, user_id: int, job_id: int
    ) -> ResumeAnalysis:
        """
        Create a new resume analysis with user and job IDs.
        """
        db_obj = ResumeAnalysis(
            user_id=user_id,
            job_id=job_id,
            overall_score=obj_in.overall_score,
            skill_alignment_score=obj_in.skill_alignment_score,
            project_validation_score=obj_in.project_validation_score,
            formatting_score=obj_in.formatting_score,
            trustworthiness_score=obj_in.trustworthiness_score,
            credibility_score=obj_in.credibility_score,
            analysis_data=obj_in.analysis_data,
        )
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def get_by_user_and_job(
        self, db: AsyncSession, *, user_id: int, job_id: int
    ) -> Optional[ResumeAnalysis]:
        """
        Get resume analysis by user and job IDs.
        """
        query = select(self.model).where(
            self.model.user_id == user_id,
            self.model.job_id == job_id
        )
        result = await db.execute(query)
        return result.scalars().first()

    async def get_multi_by_user(
        self, db: AsyncSession, *, user_id: int, skip: int = 0, limit: int = 100
    ) -> List[ResumeAnalysis]:
        """
        Get multiple resume analyses by user ID.
        """
        query = select(self.model).where(
            self.model.user_id == user_id
        ).offset(skip).limit(limit)
        result = await db.execute(query)
        return result.scalars().all()

    async def get_multi_by_job(
        self, db: AsyncSession, *, job_id: int, skip: int = 0, limit: int = 100
    ) -> List[ResumeAnalysis]:
        """
        Get multiple resume analyses by job ID.
        """
        query = select(self.model).where(
            self.model.job_id == job_id
        ).offset(skip).limit(limit)
        result = await db.execute(query)
        return result.scalars().all()
        
    async def get_top_analyses_by_user(
        self, db: AsyncSession, *, user_id: int, limit: int = 5
    ) -> List[ResumeAnalysis]:
        """
        Get top resume analyses for a user based on overall score.
        """
        query = select(self.model).where(
            self.model.user_id == user_id
        ).order_by(self.model.overall_score.desc()).limit(limit)
        result = await db.execute(query)
        return result.scalars().all()


resume_analysis = CRUDResumeAnalysis(ResumeAnalysis)

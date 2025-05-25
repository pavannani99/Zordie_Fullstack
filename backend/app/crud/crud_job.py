from typing import List, Optional, Dict, Any, Union
from sqlalchemy import select, func, and_
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.base import CRUDBase
from app.models.job import Job, JobApplication
from app.schemas.job import JobCreate, JobUpdate, JobApplicationCreate, JobApplicationUpdate


class CRUDJob(CRUDBase[Job, JobCreate, JobUpdate]):
    async def create_with_user(self, db: AsyncSession, *, obj_in: JobCreate, user_id: int) -> Job:
        """Create a new job with the user ID"""
        obj_in_data = obj_in.dict()
        db_obj = Job(**obj_in_data, user_id=user_id)
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj
    async def get_multi_by_user(
        self, db: AsyncSession, *, user_id: int, skip: int = 0, limit: int = 100
    ) -> List[Job]:
        """Get all jobs posted by a specific user"""
        result = await db.execute(
            select(Job)
            .where(Job.user_id == user_id)
            .offset(skip)
            .limit(limit)
        )
        return result.scalars().all()
    
    async def get_multi_with_applications_count(
        self, db: AsyncSession, *, skip: int = 0, limit: int = 100
    ) -> List[Dict[str, Any]]:
        """Get all jobs with the count of applications for each job"""
        result = await db.execute(
            select(
                Job,
                func.count(JobApplication.id).label("applications_count")
            )
            .outerjoin(JobApplication, Job.id == JobApplication.job_id)
            .group_by(Job.id)
            .offset(skip)
            .limit(limit)
        )
        
        jobs_with_counts = []
        for job, applications_count in result.all():
            job_dict = {
                "id": job.id,
                "title": job.title,
                "company": job.company,
                "location": job.location,
                "description": job.description,
                "requirements": job.requirements,
                "salary_min": job.salary_min,
                "salary_max": job.salary_max,
                "status": job.status,
                "job_type": job.job_type,
                "experience_level": job.experience_level,
                "created_at": job.created_at,
                "updated_at": job.updated_at,
                "user_id": job.user_id,
                "applications_count": applications_count
            }
            jobs_with_counts.append(job_dict)
        
        return jobs_with_counts
    
    async def search(
        self, db: AsyncSession, *, query: str, skip: int = 0, limit: int = 100
    ) -> List[Job]:
        """Search for jobs by title, company, or location"""
        search_term = f"%{query}%"
        result = await db.execute(
            select(Job)
            .where(
                (Job.title.ilike(search_term)) |
                (Job.company.ilike(search_term)) |
                (Job.location.ilike(search_term)) |
                (Job.description.ilike(search_term))
            )
            .offset(skip)
            .limit(limit)
        )
        return result.scalars().all()


class CRUDJobApplication(CRUDBase[JobApplication, JobApplicationCreate, JobApplicationUpdate]):
    async def create_with_user(self, db: AsyncSession, *, obj_in: JobApplicationCreate, user_id: int) -> JobApplication:
        """Create a new job application with the user ID"""
        obj_in_data = obj_in.dict()
        db_obj = JobApplication(**obj_in_data, user_id=user_id)
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj
    async def get_by_user_and_job(
        self, db: AsyncSession, *, user_id: int, job_id: int
    ) -> Optional[JobApplication]:
        """Get a job application by user_id and job_id"""
        result = await db.execute(
            select(JobApplication)
            .where(
                and_(
                    JobApplication.user_id == user_id,
                    JobApplication.job_id == job_id
                )
            )
        )
        return result.scalars().first()
    
    async def get_multi_by_user(
        self, db: AsyncSession, *, user_id: int, skip: int = 0, limit: int = 100
    ) -> List[JobApplication]:
        """Get all job applications by a specific user"""
        result = await db.execute(
            select(JobApplication)
            .where(JobApplication.user_id == user_id)
            .offset(skip)
            .limit(limit)
        )
        return result.scalars().all()
    
    async def get_multi_by_job(
        self, db: AsyncSession, *, job_id: int, skip: int = 0, limit: int = 100
    ) -> List[JobApplication]:
        """Get all applications for a specific job"""
        result = await db.execute(
            select(JobApplication)
            .where(JobApplication.job_id == job_id)
            .offset(skip)
            .limit(limit)
        )
        return result.scalars().all()


crud_job = CRUDJob(Job)
crud_job_application = CRUDJobApplication(JobApplication)

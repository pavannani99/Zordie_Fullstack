from typing import Any, List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app import schemas
from app.api import deps
from app.crud import crud_job
from app.models.user import User

router = APIRouter()


@router.get("/", response_model=List[schemas.Job])
async def get_jobs(
    db: AsyncSession = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: Optional[User] = Depends(deps.get_optional_current_user),
) -> Any:
    """
    Retrieve all jobs.
    """
    jobs = await crud_job.get_multi(db, skip=skip, limit=limit)
    return jobs


@router.get("/with-applications-count", response_model=List[schemas.JobWithApplicationsCount])
async def get_jobs_with_applications_count(
    db: AsyncSession = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Retrieve all jobs with application counts.
    Only for superusers.
    """
    jobs = await crud_job.get_multi_with_applications_count(db, skip=skip, limit=limit)
    return jobs


@router.post("/", response_model=schemas.Job)
async def create_job(
    *,
    db: AsyncSession = Depends(deps.get_db),
    job_in: schemas.JobCreate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create new job posting.
    """
    job = await crud_job.create_with_user(db, obj_in=job_in, user_id=current_user.id)
    return job


@router.get("/search", response_model=List[schemas.Job])
async def search_jobs(
    query: str = Query(..., description="Search term"),
    db: AsyncSession = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Search for jobs by title, company, location, or description.
    """
    jobs = await crud_job.search(db, query=query, skip=skip, limit=limit)
    return jobs


@router.get("/my-jobs", response_model=List[schemas.Job])
async def get_my_jobs(
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Get all jobs posted by the current user.
    """
    jobs = await crud_job.get_multi_by_user(db, user_id=current_user.id, skip=skip, limit=limit)
    return jobs


@router.get("/{job_id}", response_model=schemas.Job)
async def get_job(
    job_id: int,
    db: AsyncSession = Depends(deps.get_db),
) -> Any:
    """
    Get job by ID.
    """
    job = await crud_job.get(db, id=job_id)
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found",
        )
    return job


@router.put("/{job_id}", response_model=schemas.Job)
async def update_job(
    *,
    db: AsyncSession = Depends(deps.get_db),
    job_id: int,
    job_in: schemas.JobUpdate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update a job posting.
    """
    job = await crud_job.get(db, id=job_id)
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found",
        )
    if job.user_id != current_user.id and not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions",
        )
    job = await crud_job.update(db, db_obj=job, obj_in=job_in)
    return job


@router.delete("/{job_id}", response_model=schemas.Job)
async def delete_job(
    *,
    db: AsyncSession = Depends(deps.get_db),
    job_id: int,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Delete a job posting.
    """
    job = await crud_job.get(db, id=job_id)
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found",
        )
    if job.user_id != current_user.id and not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions",
        )
    job = await crud_job.remove(db, id=job_id)
    return job

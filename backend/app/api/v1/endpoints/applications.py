from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app import schemas
from app.api import deps
from app.crud import crud_job, crud_job_application
from app.models.user import User

router = APIRouter()


@router.post("/", response_model=schemas.JobApplication)
async def create_application(
    *,
    db: AsyncSession = Depends(deps.get_db),
    application_in: schemas.JobApplicationCreate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create a new job application.
    """
    # Check if job exists
    job = await crud_job.get(db, id=application_in.job_id)
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found",
        )
    
    # Check if user already applied for this job
    existing_application = await crud_job_application.get_by_user_and_job(
        db, user_id=current_user.id, job_id=application_in.job_id
    )
    if existing_application:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You have already applied for this job",
        )
    
    # Create application
    application = await crud_job_application.create_with_user(
        db, obj_in=application_in, user_id=current_user.id
    )
    return application


@router.get("/", response_model=List[schemas.JobApplication])
async def get_applications(
    db: AsyncSession = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Retrieve all job applications.
    Only for superusers.
    """
    applications = await crud_job_application.get_multi(db, skip=skip, limit=limit)
    return applications


@router.get("/my-applications", response_model=List[schemas.JobApplication])
async def get_my_applications(
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Get all applications made by the current user.
    """
    applications = await crud_job_application.get_multi_by_user(
        db, user_id=current_user.id, skip=skip, limit=limit
    )
    return applications


@router.get("/job/{job_id}", response_model=List[schemas.JobApplication])
async def get_applications_for_job(
    job_id: int,
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Get all applications for a specific job.
    Only the job creator or superusers can access this endpoint.
    """
    job = await crud_job.get(db, id=job_id)
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found",
        )
    
    # Check if user is authorized to view applications
    if job.user_id != current_user.id and not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions",
        )
    
    applications = await crud_job_application.get_multi_by_job(
        db, job_id=job_id, skip=skip, limit=limit
    )
    return applications


@router.get("/{application_id}", response_model=schemas.JobApplication)
async def get_application(
    application_id: int,
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get application by ID.
    Only the applicant, job creator, or superusers can access this endpoint.
    """
    application = await crud_job_application.get(db, id=application_id)
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found",
        )
    
    # Get the job to check if current user is the job creator
    job = await crud_job.get(db, id=application.job_id)
    
    # Check if user is authorized to view the application
    if (application.user_id != current_user.id and 
        job.user_id != current_user.id and 
        not current_user.is_superuser):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions",
        )
    
    return application


@router.put("/{application_id}", response_model=schemas.JobApplication)
async def update_application(
    *,
    db: AsyncSession = Depends(deps.get_db),
    application_id: int,
    application_in: schemas.JobApplicationUpdate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update a job application.
    Applicants can update their own applications, and job creators can update the status.
    """
    application = await crud_job_application.get(db, id=application_id)
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found",
        )
    
    # Get the job to check if current user is the job creator
    job = await crud_job.get(db, id=application.job_id)
    
    # If user is the applicant, they can update cover letter and resume
    # If user is the job creator, they can only update the status
    if application.user_id == current_user.id:
        # Applicant can't update status
        if application_in.status is not None:
            application_in.status = application.status
    elif job.user_id == current_user.id:
        # Job creator can only update status
        updated_data = {"status": application_in.status}
        application_in = schemas.JobApplicationUpdate(**updated_data)
    elif not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions",
        )
    
    application = await crud_job_application.update(db, db_obj=application, obj_in=application_in)
    return application


@router.delete("/{application_id}", response_model=schemas.JobApplication)
async def delete_application(
    *,
    db: AsyncSession = Depends(deps.get_db),
    application_id: int,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Delete a job application.
    Only the applicant or superusers can delete an application.
    """
    application = await crud_job_application.get(db, id=application_id)
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found",
        )
    
    if application.user_id != current_user.id and not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions",
        )
    
    application = await crud_job_application.remove(db, id=application_id)
    return application

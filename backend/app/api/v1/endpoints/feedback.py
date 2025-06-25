from fastapi import APIRouter, Depends, HTTPException, status
from typing import Any, List
from sqlalchemy.ext.asyncio import AsyncSession

from app.api import deps
from app.models.user import User
from app.schemas.feedback import FeedbackCreate, FeedbackUpdate, FeedbackInDBBase as FeedbackSchema
from app.crud.crud_feedback import crud_feedback

router = APIRouter()


@router.post("/", response_model=FeedbackSchema)
async def create_feedback(
    *,
    db: AsyncSession = Depends(deps.get_db),
    feedback_in: FeedbackCreate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """Create new feedback"""
    feedback_in.user_id = current_user.id
    feedback = await crud_feedback.create(db=db, obj_in=feedback_in)
    return feedback


@router.get("/", response_model=List[FeedbackSchema])
async def read_feedbacks(
    db: AsyncSession = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """Retrieve feedbacks"""
    if current_user.is_superuser:
        feedbacks = await crud_feedback.get_multi(db=db, skip=skip, limit=limit)
    else:
        feedbacks = await crud_feedback.get_multi_by_user(
            db=db, user_id=current_user.id, skip=skip, limit=limit
        )
    return feedbacks


@router.get("/{feedback_id}", response_model=FeedbackSchema)
async def read_feedback(
    *,
    db: AsyncSession = Depends(deps.get_db),
    feedback_id: int,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """Get feedback by ID"""
    feedback = await crud_feedback.get(db=db, id=feedback_id)
    if not feedback:
        raise HTTPException(status_code=404, detail="Feedback not found")
    if feedback.user_id != current_user.id and not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return feedback
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app import schemas
from app.api import deps
from app.crud import crud_user
from app.models.user import User

router = APIRouter()


@router.get("/me", response_model=schemas.User)
async def get_profile(
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get current user profile
    """
    return current_user


@router.put("/me", response_model=schemas.User)
async def update_profile(
    *,
    db: AsyncSession = Depends(deps.get_db),
    user_update: schemas.UserUpdate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update current user profile
    """
    # Check if email is being updated and if it already exists
    if user_update.email and user_update.email != current_user.email:
        user_by_email = await crud_user.get_by_email(db, email=user_update.email)
        if user_by_email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered",
            )
    
    user = await crud_user.update(db, db_obj=current_user, obj_in=user_update)
    return user

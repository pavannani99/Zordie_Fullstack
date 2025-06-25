from fastapi import APIRouter, Depends, HTTPException, status
from typing import Any, List
from sqlalchemy.ext.asyncio import AsyncSession

from app.api import deps
from app.models.user import User
from app.schemas.learning import LearningCreate, LearningUpdate, LearningInDBBase as LearningSchema
from app.crud.crud_learning import crud_learning

router = APIRouter()


@router.post("/", response_model=LearningSchema)
async def create_learning_record(
    *,
    db: AsyncSession = Depends(deps.get_db),
    learning_in: LearningCreate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """Create new learning record"""
    learning_in.user_id = current_user.id
    learning = await crud_learning.create(db=db, obj_in=learning_in)
    return learning


@router.get("/", response_model=List[LearningSchema])
async def read_learning_records(
    db: AsyncSession = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """Retrieve learning records"""
    learning_records = await crud_learning.get_multi_by_user(
        db=db, user_id=current_user.id, skip=skip, limit=limit
    )
    return learning_records


@router.get("/{learning_id}", response_model=LearningSchema)
async def read_learning_record(
    *,
    db: AsyncSession = Depends(deps.get_db),
    learning_id: int,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """Get learning record by ID"""
    learning = await crud_learning.get(db=db, id=learning_id)
    if not learning:
        raise HTTPException(status_code=404, detail="Learning record not found")
    if learning.user_id != current_user.id and not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return learning


@router.put("/{learning_id}", response_model=LearningSchema)
async def update_learning_record(
    *,
    db: AsyncSession = Depends(deps.get_db),
    learning_id: int,
    learning_in: LearningUpdate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """Update a learning record"""
    learning = await crud_learning.get(db=db, id=learning_id)
    if not learning:
        raise HTTPException(status_code=404, detail="Learning record not found")
    if learning.user_id != current_user.id and not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    learning = await crud_learning.update(db=db, db_obj=learning, obj_in=learning_in)
    return learning
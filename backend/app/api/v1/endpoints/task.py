from fastapi import APIRouter, Depends, HTTPException, status
from typing import Any, List
from sqlalchemy.ext.asyncio import AsyncSession

from app.api import deps
from app.models.user import User
from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate, Task as TaskSchema
from app.crud.crud_task import crud_task

router = APIRouter()


@router.post("/", response_model=TaskSchema)
async def create_task(
    *,
    db: AsyncSession = Depends(deps.get_db),
    task_in: TaskCreate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """Create new task"""
    task_in.user_id = current_user.id
    task = await crud_task.create(db=db, obj_in=task_in)
    return task


@router.get("/", response_model=List[TaskSchema])
async def read_tasks(
    db: AsyncSession = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """Retrieve tasks"""
    tasks = await crud_task.get_multi_by_user(
        db=db, user_id=current_user.id, skip=skip, limit=limit
    )
    return tasks


@router.get("/{task_id}", response_model=TaskSchema)
async def read_task(
    *,
    db: AsyncSession = Depends(deps.get_db),
    task_id: int,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """Get task by ID"""
    task = await crud_task.get(db=db, id=task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    if task.user_id != current_user.id and not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return task


@router.put("/{task_id}", response_model=TaskSchema)
async def update_task(
    *,
    db: AsyncSession = Depends(deps.get_db),
    task_id: int,
    task_in: TaskUpdate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """Update a task"""
    task = await crud_task.get(db=db, id=task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    if task.user_id != current_user.id and not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    task = await crud_task.update(db=db, db_obj=task, obj_in=task_in)
    return task


@router.delete("/{task_id}", response_model=TaskSchema)
async def delete_task(
    *,
    db: AsyncSession = Depends(deps.get_db),
    task_id: int,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """Delete a task"""
    task = await crud_task.get(db=db, id=task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    if task.user_id != current_user.id and not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    task = await crud_task.remove(db=db, id=task_id)
    return task
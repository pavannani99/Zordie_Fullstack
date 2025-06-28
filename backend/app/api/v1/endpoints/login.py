from datetime import timedelta
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from app import schemas
from app.api import deps
from app.core import security
from app.core.config import settings
from app.crud import crud_user

router = APIRouter()


@router.post("/login/access-token", response_model=schemas.Token)
async def login_access_token(
    db: AsyncSession = Depends(deps.get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    user = await crud_user.authenticate(
        db, email=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    elif not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    refresh_token_expires = timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)

    return {
        "access_token": security.create_access_token(
            user.id, expires_delta=access_token_expires
        ),
        "refresh_token": security.create_refresh_token(
            user.id, expires_delta=refresh_token_expires
        ),
        "token_type": "bearer",
        "user_id": user.id,
        "email": user.email,
        "full_name": user.full_name,
    }


@router.post("/login/refresh-token", response_model=schemas.Token)
async def refresh_token(
    token_data: schemas.TokenRefresh,
    db: AsyncSession = Depends(deps.get_db),
) -> Any:
    """
    Refresh access token using refresh token
    """
    payload = security.verify_refresh_token(token_data.refresh_token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token",
        )

    try:
        token_payload = schemas.TokenPayload(**payload)
        user = await crud_user.get(db, id=token_payload.sub)
        if not user or not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid user or inactive user",
            )

        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        return {
            "access_token": security.create_access_token(
                user.id, expires_delta=access_token_expires
            ),
            "token_type": "bearer",
            "user_id": user.id,
            "email": user.email,
            "full_name": user.full_name,
        }
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload",
        )


@router.post("/login/test-token", response_model=schemas.User)
async def test_token(
    current_user: schemas.User = Depends(deps.get_current_user)
) -> Any:
    """
    Test access token
    """
    return current_user


@router.post("/login/clerk-auth", response_model=schemas.Token)
async def clerk_auth(
    clerk_token: str,
    db: AsyncSession = Depends(deps.get_db),
) -> Any:
    """
    Authenticate with Clerk token and issue JWT tokens
    """
    from app.utils.clerk import get_user_from_clerk_token

    # Get user information from Clerk token
    user_data = await get_user_from_clerk_token(clerk_token)
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Clerk token",
        )

    # Extract user email and Clerk ID from Clerk response
    email = user_data.get("email")
    clerk_id = user_data.get("id")
    if not email or not clerk_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email or Clerk ID not found in user data",
        )

    # Check if user exists by Clerk ID first
    user = None
    from sqlalchemy import select
    from app.models.user import User
    existing_users = await db.execute(select(User).where(User.clerk_id == clerk_id))
    user = existing_users.scalars().first()

    # If not found by Clerk ID, try by email
    if not user:
        user = await crud_user.get_by_email(db, email=email)

    # If user still not found, create a new one
    if not user:
        # Create a new user with a random password (since auth is handled by Clerk)
        user_in = schemas.UserCreate(
            email=email,
            password=security.get_password_hash("clerk_generated_password"),
            full_name=user_data.get("full_name", ""),
            clerk_id=clerk_id,
            is_active=True,
        )
        user = await crud_user.create(db, obj_in=user_in)
    elif not user.clerk_id:  # Update existing user with Clerk ID if not set
        user.clerk_id = clerk_id
        db.add(user)
        await db.commit()
        await db.refresh(user)

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    refresh_token_expires = timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)

    return {
        "access_token": security.create_access_token(
            user.id, expires_delta=access_token_expires
        ),
        "refresh_token": security.create_refresh_token(
            user.id, expires_delta=refresh_token_expires
        ),
        "token_type": "bearer",
        "user_id": user.id,
        "email": user.email,
        "full_name": user.full_name
    }

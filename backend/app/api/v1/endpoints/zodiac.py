from typing import Any, List, Optional
from datetime import date, datetime

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app import schemas
from app.api import deps
from app.crud import crud_zodiac_sign, crud_horoscope, crud_user_profile
from app.models.user import User

router = APIRouter()


@router.get("/signs", response_model=List[schemas.ZodiacSign])
async def get_zodiac_signs(
    db: AsyncSession = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Get all zodiac signs.
    """
    zodiac_signs = await crud_zodiac_sign.get_multi(db, skip=skip, limit=limit)
    return zodiac_signs


@router.get("/signs/{sign_id}", response_model=schemas.ZodiacSign)
async def get_zodiac_sign(
    sign_id: int,
    db: AsyncSession = Depends(deps.get_db),
) -> Any:
    """
    Get a specific zodiac sign by ID.
    """
    zodiac_sign = await crud_zodiac_sign.get(db, id=sign_id)
    if not zodiac_sign:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Zodiac sign not found",
        )
    return zodiac_sign


@router.get("/signs/by-name/{name}", response_model=schemas.ZodiacSign)
async def get_zodiac_sign_by_name(
    name: str,
    db: AsyncSession = Depends(deps.get_db),
) -> Any:
    """
    Get a specific zodiac sign by name.
    """
    zodiac_sign = await crud_zodiac_sign.get_by_name(db, name=name)
    if not zodiac_sign:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Zodiac sign not found",
        )
    return zodiac_sign


@router.get("/signs/by-date", response_model=schemas.ZodiacSign)
async def get_zodiac_sign_by_date(
    birth_date: date = Query(..., description="Birth date in YYYY-MM-DD format"),
    db: AsyncSession = Depends(deps.get_db),
) -> Any:
    """
    Get zodiac sign by birth date.
    """
    zodiac_sign = await crud_zodiac_sign.get_by_date(db, birth_date=birth_date)
    if not zodiac_sign:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Could not determine zodiac sign for the given date",
        )
    return zodiac_sign


@router.get("/horoscopes/daily", response_model=List[schemas.HoroscopeWithZodiac])
async def get_daily_horoscopes(
    date_str: Optional[str] = Query(None, description="Date in YYYY-MM-DD format"),
    db: AsyncSession = Depends(deps.get_db),
) -> Any:
    """
    Get daily horoscopes for all zodiac signs.
    If date is not provided, today's horoscopes will be returned.
    """
    if date_str:
        try:
            target_date = datetime.strptime(date_str, "%Y-%m-%d").date()
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid date format. Use YYYY-MM-DD",
            )
    else:
        target_date = datetime.now().date()
    
    horoscopes = await crud_horoscope.get_by_date(db, date=target_date)
    
    # Load zodiac sign for each horoscope
    result = []
    for horoscope in horoscopes:
        zodiac_sign = await crud_zodiac_sign.get(db, id=horoscope.zodiac_sign_id)
        if zodiac_sign:
            horoscope_with_zodiac = schemas.HoroscopeWithZodiac.from_orm(horoscope)
            horoscope_with_zodiac.zodiac_sign = zodiac_sign
            result.append(horoscope_with_zodiac)
    
    return result


@router.get("/horoscopes/{sign_id}", response_model=schemas.Horoscope)
async def get_horoscope_by_sign(
    sign_id: int,
    date_str: Optional[str] = Query(None, description="Date in YYYY-MM-DD format"),
    db: AsyncSession = Depends(deps.get_db),
) -> Any:
    """
    Get horoscope for a specific zodiac sign.
    If date is not provided, today's horoscope will be returned.
    """
    # Verify zodiac sign exists
    zodiac_sign = await crud_zodiac_sign.get(db, id=sign_id)
    if not zodiac_sign:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Zodiac sign not found",
        )
    
    if date_str:
        try:
            target_date = datetime.strptime(date_str, "%Y-%m-%d").date()
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid date format. Use YYYY-MM-DD",
            )
    else:
        target_date = datetime.now().date()
    
    horoscope = await crud_horoscope.get_by_sign_and_date(
        db, zodiac_sign_id=sign_id, date=target_date
    )
    
    if not horoscope:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No horoscope found for {zodiac_sign.name} on {target_date}",
        )
    
    return horoscope


@router.post("/profile", response_model=schemas.UserProfile)
async def create_user_profile(
    profile_in: schemas.UserProfileCreate,
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create user astrological profile.
    """
    # Check if user already has a profile
    existing_profile = await crud_user_profile.get_by_user_id(db, user_id=current_user.id)
    if existing_profile:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already has a profile",
        )
    
    # Verify zodiac sign exists
    zodiac_sign = await crud_zodiac_sign.get(db, id=profile_in.zodiac_sign_id)
    if not zodiac_sign:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Zodiac sign not found",
        )
    
    # Create user profile
    user_profile = await crud_user_profile.create_with_user(
        db, obj_in=profile_in, user_id=current_user.id
    )
    
    return user_profile


@router.get("/profile/me", response_model=schemas.UserProfileWithZodiac)
async def get_my_profile(
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get current user's astrological profile.
    """
    user_profile = await crud_user_profile.get_by_user_id(db, user_id=current_user.id)
    if not user_profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User profile not found",
        )
    
    # Load zodiac sign
    zodiac_sign = await crud_zodiac_sign.get(db, id=user_profile.zodiac_sign_id)
    
    # Create response with zodiac sign
    profile_with_zodiac = schemas.UserProfileWithZodiac.from_orm(user_profile)
    profile_with_zodiac.zodiac_sign = zodiac_sign
    
    return profile_with_zodiac


@router.put("/profile/me", response_model=schemas.UserProfile)
async def update_my_profile(
    profile_in: schemas.UserProfileUpdate,
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update current user's astrological profile.
    """
    user_profile = await crud_user_profile.get_by_user_id(db, user_id=current_user.id)
    if not user_profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User profile not found",
        )
    
    # If zodiac sign is being updated, verify it exists
    if profile_in.zodiac_sign_id:
        zodiac_sign = await crud_zodiac_sign.get(db, id=profile_in.zodiac_sign_id)
        if not zodiac_sign:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Zodiac sign not found",
            )
    
    # Update user profile
    user_profile = await crud_user_profile.update(db, db_obj=user_profile, obj_in=profile_in)
    
    return user_profile

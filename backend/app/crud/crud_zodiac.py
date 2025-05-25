from typing import List, Optional, Dict, Any, Union
from datetime import date

from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.base import CRUDBase
from app.models.zodiac import ZodiacSign, Horoscope, UserProfile
from app.schemas.zodiac import (
    ZodiacSignCreate, ZodiacSignUpdate,
    HoroscopeCreate, HoroscopeUpdate,
    UserProfileCreate, UserProfileUpdate
)


class CRUDZodiacSign(CRUDBase[ZodiacSign, ZodiacSignCreate, ZodiacSignUpdate]):
    async def get_by_name(self, db: AsyncSession, *, name: str) -> Optional[ZodiacSign]:
        result = await db.execute(select(ZodiacSign).where(ZodiacSign.name == name))
        return result.scalars().first()
    
    async def get_by_date(self, db: AsyncSession, *, birth_date: date) -> Optional[ZodiacSign]:
        """Get zodiac sign by birth date"""
        month = birth_date.month
        day = birth_date.day
        
        # Convert birth date to MM-DD format for comparison
        date_str = f"{month:02d}-{day:02d}"
        
        # Query all zodiac signs
        result = await db.execute(select(ZodiacSign))
        zodiac_signs = result.scalars().all()
        
        # Find the matching zodiac sign
        for sign in zodiac_signs:
            start_month, start_day = sign.start_date.month, sign.start_date.day
            end_month, end_day = sign.end_date.month, sign.end_date.day
            
            start_str = f"{start_month:02d}-{start_day:02d}"
            end_str = f"{end_month:02d}-{end_day:02d}"
            
            # Handle special case for Capricorn (Dec-Jan)
            if start_month > end_month:
                if date_str >= start_str or date_str <= end_str:
                    return sign
            else:
                if start_str <= date_str <= end_str:
                    return sign
        
        return None


class CRUDHoroscope(CRUDBase[Horoscope, HoroscopeCreate, HoroscopeUpdate]):
    async def get_by_sign_and_date(
        self, db: AsyncSession, *, zodiac_sign_id: int, date: date
    ) -> Optional[Horoscope]:
        result = await db.execute(
            select(Horoscope).where(
                and_(
                    Horoscope.zodiac_sign_id == zodiac_sign_id,
                    Horoscope.date == date
                )
            )
        )
        return result.scalars().first()
    
    async def get_by_date(self, db: AsyncSession, *, date: date) -> List[Horoscope]:
        result = await db.execute(select(Horoscope).where(Horoscope.date == date))
        return result.scalars().all()


class CRUDUserProfile(CRUDBase[UserProfile, UserProfileCreate, UserProfileUpdate]):
    async def get_by_user_id(self, db: AsyncSession, *, user_id: int) -> Optional[UserProfile]:
        result = await db.execute(select(UserProfile).where(UserProfile.user_id == user_id))
        return result.scalars().first()
    
    async def create_with_user(
        self, db: AsyncSession, *, obj_in: UserProfileCreate, user_id: int
    ) -> UserProfile:
        obj_in_data = obj_in.dict()
        db_obj = UserProfile(**obj_in_data, user_id=user_id)
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj


crud_zodiac_sign = CRUDZodiacSign(ZodiacSign)
crud_horoscope = CRUDHoroscope(Horoscope)
crud_user_profile = CRUDUserProfile(UserProfile)

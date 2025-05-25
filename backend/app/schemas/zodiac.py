from typing import Optional, List
from datetime import date
from pydantic import BaseModel


# ZodiacSign schemas
class ZodiacSignBase(BaseModel):
    name: str
    symbol: str
    element: str
    ruling_planet: str
    start_date: date
    end_date: date
    description: str


class ZodiacSignCreate(ZodiacSignBase):
    pass


class ZodiacSignUpdate(ZodiacSignBase):
    name: Optional[str] = None
    symbol: Optional[str] = None
    element: Optional[str] = None
    ruling_planet: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    description: Optional[str] = None


class ZodiacSignInDBBase(ZodiacSignBase):
    id: int

    class Config:
        from_attributes = True


class ZodiacSign(ZodiacSignInDBBase):
    pass


# Horoscope schemas
class HoroscopeBase(BaseModel):
    zodiac_sign_id: int
    date: date
    content: str
    mood: Optional[str] = None
    lucky_number: Optional[int] = None
    lucky_color: Optional[str] = None


class HoroscopeCreate(HoroscopeBase):
    pass


class HoroscopeUpdate(HoroscopeBase):
    zodiac_sign_id: Optional[int] = None
    date: Optional[date] = None
    content: Optional[str] = None
    mood: Optional[str] = None
    lucky_number: Optional[int] = None
    lucky_color: Optional[str] = None


class HoroscopeInDBBase(HoroscopeBase):
    id: int

    class Config:
        from_attributes = True


class Horoscope(HoroscopeInDBBase):
    pass


class HoroscopeWithZodiac(Horoscope):
    zodiac_sign: ZodiacSign


# UserProfile schemas
class UserProfileBase(BaseModel):
    birth_date: date
    birth_time: Optional[str] = None
    birth_place: Optional[str] = None
    zodiac_sign_id: int


class UserProfileCreate(UserProfileBase):
    pass


class UserProfileUpdate(BaseModel):
    birth_date: Optional[date] = None
    birth_time: Optional[str] = None
    birth_place: Optional[str] = None
    zodiac_sign_id: Optional[int] = None


class UserProfileInDBBase(UserProfileBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True


class UserProfile(UserProfileInDBBase):
    pass


class UserProfileWithZodiac(UserProfile):
    zodiac_sign: ZodiacSign

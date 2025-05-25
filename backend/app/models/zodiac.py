from sqlalchemy import Column, String, Integer, Date, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import date
from app.db.base_class import Base


class ZodiacSign(Base):
    """Model for zodiac signs"""
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(50), index=True)
    symbol: Mapped[str] = mapped_column(String(20))
    element: Mapped[str] = mapped_column(String(20))
    ruling_planet: Mapped[str] = mapped_column(String(50))
    start_date: Mapped[date] = mapped_column(Date)
    end_date: Mapped[date] = mapped_column(Date)
    description: Mapped[str] = mapped_column(Text)
    
    # Relationships
    horoscopes = relationship("Horoscope", back_populates="zodiac_sign", cascade="all, delete-orphan")


class Horoscope(Base):
    """Model for daily horoscopes"""
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    zodiac_sign_id: Mapped[int] = mapped_column(Integer, ForeignKey("zodiacsign.id"))
    date: Mapped[date] = mapped_column(Date, index=True)
    content: Mapped[str] = mapped_column(Text)
    mood: Mapped[str] = mapped_column(String(50), nullable=True)
    lucky_number: Mapped[int] = mapped_column(Integer, nullable=True)
    lucky_color: Mapped[str] = mapped_column(String(50), nullable=True)
    
    # Relationships
    zodiac_sign = relationship("ZodiacSign", back_populates="horoscopes")


class UserProfile(Base):
    """Model for user astrological profiles"""
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id"))
    birth_date: Mapped[date] = mapped_column(Date)
    birth_time: Mapped[str] = mapped_column(String(10), nullable=True)
    birth_place: Mapped[str] = mapped_column(String(100), nullable=True)
    zodiac_sign_id: Mapped[int] = mapped_column(Integer, ForeignKey("zodiacsign.id"))
    
    # Relationships
    user = relationship("User", back_populates="profile")
    zodiac_sign = relationship("ZodiacSign")

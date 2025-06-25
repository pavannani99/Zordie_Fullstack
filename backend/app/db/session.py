import logging
import re
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# Configure logging
logger = logging.getLogger(__name__)

# Fix DATABASE_URL to asyncpg and strip SSL if present
database_url = settings.DATABASE_URL
if database_url.startswith('postgresql://') and 'asyncpg' not in database_url:
    database_url = database_url.replace('postgresql://', 'postgresql+asyncpg://')

# Remove sslmode from URL if present
database_url = re.sub(r'\?sslmode=\w+', '', database_url)

# Create async SQLAlchemy engine with connection pool
engine = create_async_engine(
    database_url,
    pool_pre_ping=True,
    pool_size=settings.DATABASE_POOL_SIZE,
    max_overflow=settings.DATABASE_MAX_CONNECTIONS - settings.DATABASE_POOL_SIZE,
    pool_timeout=30,
    pool_recycle=1800,
    echo=settings.ENVIRONMENT == "development",
)

# Create async session factory
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False
)

# Dependency for FastAPI routes (used with Depends)
async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

# Generator-based session (also used in FastAPI endpoints if needed)
async def get_async_session():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

# Function-based session for scripts like init_and_run.py
def async_session() -> AsyncSession:
    return AsyncSessionLocal()

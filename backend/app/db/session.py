import logging
import re
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# Configure logging
logger = logging.getLogger(__name__)

# Convert the DATABASE_URL to use the asyncpg driver
database_url = settings.DATABASE_URL
if database_url.startswith('postgresql://') and 'asyncpg' not in database_url:
    database_url = database_url.replace('postgresql://', 'postgresql+asyncpg://')

# Remove sslmode parameter as it's not supported by SQLAlchemy directly
database_url = re.sub(r'\?sslmode=\w+', '', database_url)

# Create engine with connection pooling for production
engine = create_async_engine(
    database_url,
    pool_pre_ping=True,  # Check connection before using it
    pool_size=settings.DATABASE_POOL_SIZE,  # Number of connections to keep open
    max_overflow=settings.DATABASE_MAX_CONNECTIONS - settings.DATABASE_POOL_SIZE,  # Max additional connections
    pool_timeout=30,  # Seconds to wait for a connection
    pool_recycle=1800,  # Recycle connections after 30 minutes
    echo=settings.ENVIRONMENT == "development",  # Log SQL in development only
)

# Create session factory
AsyncSessionLocal = sessionmaker(
    engine, 
    class_=AsyncSession, 
    expire_on_commit=False,
    autoflush=False
)


async def get_db() -> AsyncSession:
    """Dependency for getting a database session."""
    session = AsyncSessionLocal()
    try:
        yield session
    except Exception as e:
        logger.error(f"Database session error: {str(e)}")
        await session.rollback()
        raise
    finally:
        await session.close()

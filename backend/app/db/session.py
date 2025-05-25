from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings
import re

# Convert the DATABASE_URL to use the asyncpg driver
database_url = settings.DATABASE_URL
if database_url.startswith('postgresql://') and 'asyncpg' not in database_url:
    database_url = database_url.replace('postgresql://', 'postgresql+asyncpg://')

# Remove sslmode parameter as it's not supported by SQLAlchemy directly
database_url = re.sub(r'\?sslmode=\w+', '', database_url)

engine = create_async_engine(
    database_url,
    echo=True,
    future=True,
    connect_args={"ssl": True}
)

# Create async session
async_session = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

async def get_db() -> AsyncSession:
    """
    Dependency for getting async DB session
    """
    async with async_session() as session:
        try:
            yield session
        finally:
            await session.close()

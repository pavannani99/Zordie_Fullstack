import asyncio
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.base import Base
from app.db.session import engine
from app.crud.crud_user import crud_user
from app.schemas.user import UserCreate
from app.core.config import settings
from app.db.init_job_data import init_job_data


async def init_db(db: AsyncSession) -> None:
    # Create tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    # Create initial superuser
    user = await crud_user.get_by_email(db, email="admin@example.com")
    if not user:
        user_in = UserCreate(
            email="admin@example.com",
            password="admin",
            full_name="Initial Admin",
            is_superuser=True,
        )
        user = await crud_user.create(db, obj_in=user_in)
        print(f"Created initial admin user: {user.email}")
    
    # Initialize job data
    await init_job_data(db)


async def main() -> None:
    from app.db.session import async_session
    async with async_session() as session:
        await init_db(session)


if __name__ == "__main__":
    asyncio.run(main())

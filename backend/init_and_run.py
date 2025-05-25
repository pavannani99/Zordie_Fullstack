import asyncio
import os
import uvicorn
from app.db.init_db import init_db
from app.db.session import async_session

async def setup():
    """Initialize the database and create initial data"""
    print("Initializing database...")
    async with async_session() as session:
        await init_db(session)
    print("Database initialization completed")

def run_app():
    """Run the FastAPI application"""
    print("Starting FastAPI application...")
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)

if __name__ == "__main__":
    # Run database initialization
    asyncio.run(setup())
    
    # Start the application
    run_app()

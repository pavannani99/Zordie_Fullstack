"""
Script to run the Celery worker for production.
"""

import os
from app.worker.celery_app import celery_app

if __name__ == "__main__":
    # Start the Celery worker
    os.system("celery -A app.worker.celery_app worker --loglevel=info")

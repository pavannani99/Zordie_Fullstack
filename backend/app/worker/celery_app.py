"""
Celery worker configuration for asynchronous task processing.
"""

import os
from celery import Celery
from app.core.config import settings

# Create Celery instance
celery_app = Celery(
    "zodie_worker",
    broker=os.getenv("CELERY_BROKER_URL", "redis://localhost:6379/0"),
    backend=os.getenv("CELERY_RESULT_BACKEND", "redis://localhost:6379/0"),
    include=["app.worker.tasks"]
)

# Configure Celery
celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    worker_prefetch_multiplier=1,
    worker_max_tasks_per_child=1000,
    task_acks_late=True,
    task_reject_on_worker_lost=True,
    task_time_limit=600,  # 10 minutes
    task_soft_time_limit=300,  # 5 minutes
)

# Optional: Configure task routes
celery_app.conf.task_routes = {
    "app.worker.tasks.analyze_resume_task": {"queue": "resume_analysis"},
    "app.worker.tasks.cleanup_files_task": {"queue": "maintenance"},
}

# Optional: Configure scheduled tasks
celery_app.conf.beat_schedule = {
    "cleanup-files-daily": {
        "task": "app.worker.tasks.cleanup_files_task",
        "schedule": 86400.0,  # 24 hours
    },
    "optimize-database-weekly": {
        "task": "app.worker.tasks.optimize_database_task",
        "schedule": 604800.0,  # 7 days
    },
}

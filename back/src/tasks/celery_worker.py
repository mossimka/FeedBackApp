# src/tasks/celery_worker.py

from celery import Celery
import os
from dotenv import load_dotenv

load_dotenv()

celery_app = Celery(
    "feedback_tasks",
    broker=os.getenv("REDIS_URL", "redis://localhost:6379/0"),
    backend=os.getenv("REDIS_URL", "redis://localhost:6379/0")
)

celery_app.config_from_object('src.config.celeryconfig')

celery_app.autodiscover_tasks(["src.tasks"])

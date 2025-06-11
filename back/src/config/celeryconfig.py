# src/celeryconfig.py
from celery.schedules import crontab

beat_schedule = {
    'fetch-every-day-9am': {
        'task': 'src.tasks.tasks.fetch_data',
        'schedule': crontab(hour=9, minute=0),
    },
}

timezone = 'UTC'

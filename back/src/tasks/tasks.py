from src.tasks.celery_worker import celery_app
import requests
from src.models import Category, Feedback
from src.database import SessionLocal
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATA_SOURCE_URL")

@celery_app.task
def fetch_data():
    response = requests.get(DATA_SOURCE_URL)

    if response.status_code == 200:
        data = response.json()

        session = SessionLocal()
        try:
            for item in data:

                feedback = Feedback(
                    text=item["text"],
                    likes=item.get("likes", 0),
                    category_id=category.id
                )
                session.add(feedback)

            session.commit()
        except Exception as e:
            session.rollback()
            raise e
        finally:
            session.close()
    else:
        raise Exception(f"Failed to fetch data. Status code: {response.status_code}")

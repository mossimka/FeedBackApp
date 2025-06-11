from sqlalchemy.orm import Session
from . import models
from . import schemas
from .redis_client import redis_client
import json
from fastapi import HTTPException

async def get_feedbacks(db: Session):
    cache_key = "feedbacks:all"
    cached_data = await redis_client.get(cache_key)

    if cached_data:
        print("📦 From Redis Cache")
        return json.loads(cached_data)

    feedbacks = db.query(models.Feedback).all()
    serialized = [feedback.__dict__ for feedback in feedbacks]

    for item in serialized:
        item.pop("_sa_instance_state", None)

    await redis_client.set(cache_key, json.dumps(serialized), ex=3600)
    print("💾 Saved to Redis Cache")

    return serialized

async def create_feedback(db: Session, feedback_data: schemas.FeedbackCreate):
    new_feedback = models.Feedback(**feedback_data.model_dump())
    db.add(new_feedback)
    db.commit()
    db.refresh(new_feedback)

    await redis_client.delete("feedbacks:all")
    
    # Возвращаем словарь (как и в get_feedbacks)
    result = new_feedback.__dict__.copy()
    result.pop("_sa_instance_state", None)
    return result

async def update_feedback(db: Session, feedback_id: int, update_data: schemas.FeedbackUpdate):
    feedback = db.query(models.Feedback).filter(models.Feedback.id == feedback_id).first()
    if not feedback:
        raise HTTPException(status_code=404, detail="Feedback not found")

    update_fields = update_data.model_dump(exclude_unset=True)
    for key, value in update_fields.items():
        setattr(feedback, key, value)

    db.commit()
    db.refresh(feedback)
    
    await redis_client.delete("feedbacks:all")
    
    result = feedback.__dict__.copy()
    result.pop("_sa_instance_state", None)
    return result

async def delete_feedback(db: Session, feedback_id: int):
    feedback = db.query(models.Feedback).filter(models.Feedback.id == feedback_id).first()
    if not feedback:
        raise HTTPException(status_code=404, detail="Feedback not found")
    db.delete(feedback)
    db.commit()
    await redis_client.delete("feedbacks:all")
    return {"message": f"Feedback {feedback_id} deleted successfully"}


def get_categories(db: Session):
    return db.query(models.Category).all()

def create_category(db: Session, category_data: schemas.CategoryCreate):
    new_category = models.Category(**category_data.model_dump())
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    return new_category

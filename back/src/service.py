from sqlalchemy.orm import Session
from . import models
from . import schemas

def get_feedbacks(db: Session):
    return db.query(models.Feedback).all()

def create_feedback(db: Session, feedback_data: schemas.FeedbackCreate):
    new_feedback = models.Feedback(**feedback_data.model_dump())
    db.add(new_feedback)
    db.commit()
    db.refresh(new_feedback)
    return new_feedback

def get_categories(db: Session):
    return db.query(models.Category).all()

def create_category(db: Session, category_data: schemas.CategoryCreate):
    new_category = models.Category(**category_data.model_dump())
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    return new_category
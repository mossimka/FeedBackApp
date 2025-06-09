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

def update_feedback(db: Session, feedback_id: int, update_data: schemas.FeedbackUpdate):
    feedback = db.query(models.Feedback).filter(models.Feedback.id == feedback_id).first()
    if not feedback:
        raise HTTPException(status_code=404, detail="Feedback not found")

    update_fields = update_data.model_dump(exclude_unset=True)
    for key, value in update_fields.items():
        setattr(feedback, key, value)

    db.commit()
    db.refresh(feedback)
    return feedback

def delete_feedback(db: Session, feedback_id: int):
    feedback = db.query(models.Feedback).filter(models.Feedback.id == feedback_id).first()
    if not feedback:
        raise HTTPException(status_code=404, detail="Feedback not found")
    db.delete(feedback)
    db.commit()
    return {"message": f"Feedback {feedback_id} deleted successfully"}


def get_categories(db: Session):
    return db.query(models.Category).all()

def create_category(db: Session, category_data: schemas.CategoryCreate):
    new_category = models.Category(**category_data.model_dump())
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    return new_category
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from .database import SessionLocal, engine, Base
from . import models, service, schemas

app = FastAPI()

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def root():
    return {"message": "Welcome!!"}

@app.get("/feedbacks", response_model=list[schemas.Feedback])
def get_all_feedbacks(db: Session = Depends(get_db)):
    return service.get_feedbacks(db)

@app.post("/feedbacks", response_model=schemas.Feedback)
def create_feedback(feedback: schemas.FeedbackCreate, db: Session  = Depends(get_db)):
    return service.create_feedback(db, feedback)

@app.get("/categories", response_model=list[schemas.Category])
def get_all_categories(db:  Session = Depends(get_db)):
    return service.get_categories(db)

@app.post("/categories", response_model=schemas.Category)
def create_category(category: schemas.CategoryCreate, db: Session = Depends(get_db)):
    return service.create_category(db, category)
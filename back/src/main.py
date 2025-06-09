from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from .database import SessionLocal, engine, Base
from . import models, service, schemas
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://localhost:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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

@app.patch("/feedbacks/{feedback_id}", response_model=schemas.Feedback)
def patch_feedback(feedback_id: int, update: schemas.FeedbackUpdate, db: Session = Depends(get_db)):
    updated = service.update_feedback(db, feedback_id, update)
    return updated

@app.delete("/feedbacks/{feedback_id}")
def delete_feedback(feedback_id: int, db: Session = Depends(get_db)):
    return service.delete_feedback(db, feedback_id)

@app.get("/categories", response_model=list[schemas.Category])
def get_all_categories(db:  Session = Depends(get_db)):
    return service.get_categories(db)

@app.post("/categories", response_model=schemas.Category)
def create_category(category: schemas.CategoryCreate, db: Session = Depends(get_db)):
    return service.create_category(db, category)
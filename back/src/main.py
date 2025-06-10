from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from .database import SessionLocal, engine, Base
from . import models, service, schemas
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from starlette import status
from .auth.router import router
from .auth.service import get_current_user

app = FastAPI()
app.include_router(router)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
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

user_dependency = Annotated[dict, Depends(get_current_user)]
@app.get("/")
def root():
    return {"message": "Welcome!!"}


@app.get("/me", status_code=status.HTTP_200_OK)
async def get_current_user_data(user: user_dependency, db: Session = Depends(get_db)):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication Failed")
    return {"user": user}

@app.get("/feedbacks", response_model=list[schemas.Feedback])
def get_all_feedbacks(db: Session = Depends(get_db)):
    return service.get_feedbacks(db)

@app.post("/feedbacks", response_model=schemas.Feedback, status_code=status.HTTP_201_CREATED)
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

@app.post("/categories", response_model=schemas.Category, status_code=status.HTTP_201_CREATED)
def create_category(category: schemas.CategoryCreate, db: Session = Depends(get_db)):
    return service.create_category(db, category)
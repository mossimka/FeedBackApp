from database import Base
from sqlalchemy import Column, Integer, String

class Users(Base):
    __tablenamw__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=true)
    hashed_password = Column(String)

from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import datetime

class UserBase(SQLModel):
  fullname: str
  username: str
  email: str
  avatar: Optional[str] = None
  
class UserLogin(SQLModel):
  username: str
  password: str

class UserRead(UserBase):
  level: int
  role: str
  createAt: datetime

class UserCreate(UserBase):
  password: str

class UserUpdate(UserBase):
  pass

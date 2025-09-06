from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import datetime
from typing import List
from schemas.movie import MovieRead
from schemas.like import LikeRead

class UserBase(SQLModel):
  fullname: str
  username: str
  email: str
  avatar: Optional[str] = None
  
class UserLogin(SQLModel):
  username: str
  password: str

class UserRead(UserBase):
  id: int
  level: int
  role: str
  createAt: datetime
  likes: Optional[List["LikeRead"]] = None
  list: Optional[List["MovieRead"]] = None

class UserCreate(UserBase):
  password: str

class UserUpdate(UserBase):
  pass

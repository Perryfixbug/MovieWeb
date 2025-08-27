from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import datetime

class UserBase(SQLModel):
  fullname: str
  username: str
  email: str
  password: str
  avatar: Optional[str] = None
  role: str = "user"
  level: int = Field(default=0)
  createAt: datetime
  



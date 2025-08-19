from sqlmodel import SQLModel, Field, Relationship
from typing import Optional

class UserBase(SQLModel):
  fullname: str
  username: str
  email: str
  password: str
  avatar: Optional[str] = None
  role: str = "user"
  level: Optional[str] = None
  



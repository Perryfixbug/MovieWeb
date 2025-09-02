from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import date

class ActorBase(SQLModel):
  name: str
  description: Optional[str] = None
  dob: Optional[date] = None
  country: Optional[str] = None


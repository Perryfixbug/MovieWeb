from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import date

class ActorBase(SQLModel):
  name: str
  description: str
  dob: date
  country: str


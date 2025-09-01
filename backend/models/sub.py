from sqlmodel import SQLModel, Field, Relationship
from typing import List
from datetime import datetime
from schemas.sub import SubBase

class Sub(SubBase, table=True):
  id: int = Field(primary_key=True)
  createAt: datetime = Field(default_factory=datetime.now)
  movie: "Movie" = Relationship(back_populates="subs")

from models.movie import Movie
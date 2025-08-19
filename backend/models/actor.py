from schemas.actor import ActorBase
from sqlmodel import Field, Relationship
from typing import List

from models.acting import Acting

class Actor(ActorBase, table=True):
  id: int = Field(primary_key=True)
  actedMovies: List["Movie"] = Relationship(back_populates="actors", link_model=Acting)

from models.movie import Movie
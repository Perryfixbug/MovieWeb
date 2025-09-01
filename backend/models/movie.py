from schemas.movie import MovieBase
from sqlmodel import Field, Relationship
from typing import List
from datetime import datetime

from models.userListMovie import UserListMovie
from models.categorymovie import CategoryMovie
from models.acting import Acting

class Movie(MovieBase, table=True):
  id: int = Field(primary_key=True)
  slug: str = Field(index=True, unique=True)
  createAt: datetime = Field(default_factory=datetime.now)
  categories: List["Category"] = Relationship(back_populates="movies", link_model=CategoryMovie)
  videos: List["Video"] = Relationship(back_populates="movie")
  subs: List["Sub"] = Relationship(back_populates="movie")
  actors: List["Actor"] = Relationship(back_populates="actedMovies", link_model=Acting)
  uploader: "User" = Relationship(back_populates="uploaded_movies")
  reviews: List["Review"] = Relationship(back_populates="movie")
  userList: List["User"] = Relationship(back_populates="listMovies", link_model=UserListMovie)

  
from models.category import Category
from models.video import Video
from models.sub import Sub
from models.actor import Actor
from models.user import User
from models.review import Review

  

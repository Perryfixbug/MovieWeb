from schemas.user import UserBase
from sqlmodel import Field, Relationship
from typing import List
from datetime import datetime

from models.userListMovie import UserListMovie

class User(UserBase, table=True):
  id: int = Field(primary_key=True)
  password: str
  level: int = Field(default=0)
  role: str = Field(default="user")
  createAt: datetime = Field(default_factory=datetime.now)
  uploaded_movies: List["Movie"] = Relationship(back_populates="uploader")
  comments: List["Comment"] = Relationship(back_populates="user")
  likes: List["Like"] = Relationship(back_populates="user")
  payments: List["Payment"] = Relationship(back_populates="user")
  listMovies: List["Movie"] = Relationship(back_populates="userList", link_model=UserListMovie)

from models.movie import Movie
from models.comment import Comment
from models.like import Like
from models.payment import Payment

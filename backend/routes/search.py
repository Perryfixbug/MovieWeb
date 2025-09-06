from fastapi import APIRouter, Depends, HTTPException
from dependencies import get_session, get_user_id
from schemas.movie import MovieMetadataSearch
from models.movie import Movie
from sqlmodel import Session, select
from typing import List

router = APIRouter(
  prefix='/search',
  tags=['Search']
)

@router.get('/')
async def search_movie(
  session: Session = Depends(get_session)
)->List[MovieMetadataSearch]:
  movies = session.exec(select(Movie)).all()
  return movies
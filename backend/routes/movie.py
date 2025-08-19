from fastapi import APIRouter, Depends
from dependencies import get_session
from sqlmodel import Session
from schemas.movie import MovieRead

router = APIRouter(
  prefix='/movie',
  tags=["Movie"]
)

@router.get('/')
async def get_all_movies(
  session: Session = Depends(get_session)
)->MovieRead:
  return
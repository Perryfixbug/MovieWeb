from fastapi import APIRouter, Depends, Request
from dependencies import get_session
from sqlmodel import Session, select
from sqlalchemy.orm import selectinload
from models.carousel import Carousel
from schemas.carousel import CarouselCreate, CarouselUpdate, CarouselRead
from typing import List

router = APIRouter(
  prefix='/carousel',
  tags=['Carousel']
)

@router.get('/')
async def get_all_carousels(
  sessison: Session = Depends(get_session)
)->List[CarouselRead]:
  query = select(Carousel).options(selectinload(Carousel.movie))
  carousels = sessison.exec(query).all() 
  return carousels

@router.post('/')
async def create_carousel(
  carousel_data: CarouselCreate,
  session: Session = Depends(get_session)
)->Carousel:
  carousel = Carousel(**carousel_data.model_dump())
  session.add(carousel)
  session.commit()
  session.refresh(carousel)
  return carousel

@router.put('/{id}')
async def update_carousel(
  id : int,
  carousel_data: CarouselUpdate,
  session: Session = Depends(get_session)
)->Carousel:
  carousel = session.get(Carousel, id)
  for key, value in carousel_data:
    setattr(carousel, key, value)

  session.commit()
  session.refresh(carousel)
  
  return carousel

@router.delete('/{id}')
async def delete_carousel(
  id: int,
  session: Session = Depends(get_session)
):
  carousel = session.get(Carousel, id)
  session.delete(carousel)
  return "Delete successfully!" 
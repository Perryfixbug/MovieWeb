from fastapi import APIRouter, Depends, HTTPException, Response, Request
from sqlmodel import Session, select, or_
from dependencies import get_session
from schemas.video import VideoRead, VideoCreate
from models.video import Video
from typing import Dict

router = APIRouter(
  prefix='/video',
  tags=['Video']
)

@router.post('/')
async def create_video_of_movie(
  video_data: VideoCreate,
  session: Session = Depends(get_session)
)->VideoRead:
  video = Video(**video_data.model_dump())
  session.add(video)
  session.commit()
  session.refresh(video)
  return video
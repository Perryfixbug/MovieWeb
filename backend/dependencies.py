from fastapi import HTTPException
from sqlmodel import Session
from db import engine
from fastapi import Request
from lib.jwt import jwt_decoder

def get_session():
    with Session(engine) as session:
        yield session

def get_user_id(
    request: Request
)->int:
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer"):
        raise HTTPException(status_code=401, detail="Yêu cầu chưa xác thực, xin mời đăng nhập")
    token = auth_header.split(" ")[1]
    try:
        payload = jwt_decoder(token)
        userId = int(payload["userId"])
    except:
        raise HTTPException(status_code=401, detail="Phiên đăng nhập hết hạn")
    return userId
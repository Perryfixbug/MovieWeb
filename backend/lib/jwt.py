import jwt
from dotenv import load_dotenv
import os
import datetime

load_dotenv()

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM")

def jwt_encoder(data: any, delta_time=1):
  payload = {
    **data,
    "exp": datetime.datetime.now() + datetime.timedelta(hours=delta_time)
  }
  token = jwt.encode(payload, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
  return token

def jwt_decoder(token: str):
  payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
  return payload
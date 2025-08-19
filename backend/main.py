from fastapi import FastAPI
from routes import movie

app = FastAPI()

@app.get('/')
def init():
  return "Hello world!"

app.include_router(movie.router)
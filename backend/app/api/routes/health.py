from fastapi import APIRouter
from sqlalchemy import text

from app.database.database import engine

router = APIRouter()

@router.get("/db-health")
def db_health():
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))

    return {"database": "connected"}
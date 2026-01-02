from pydantic import BaseModel
from typing import List

class Player(BaseModel):
    user_id: str

class Room(BaseModel):
    room_id: str
    players: List[str]
    current_turn: str | None = None

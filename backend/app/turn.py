from fastapi import APIRouter
from app.rooms import rooms
from app.llm import generate_story
from app.prompt import build_story_prompt
from app.story import build_recent_context
from app.websocket import broadcast
import time
from pydantic import BaseModel

router = APIRouter()

class EndTurnRequest(BaseModel):
    room_id: str

@router.post("/end-turn")
async def end_turn(payload: EndTurnRequest):
    room = rooms.get(payload.room_id)
    if not room:
        return {"status": "invalid_room"}

    # ONLY manage turns, no AI
    room["current_player_index"] = (
        room["current_player_index"] + 1
    ) % len(room["players"])

    return {"status": "ok"}

import uuid
from typing import Optional

rooms = {}

def create_room(room_id: Optional[str] = None):
    if not room_id:
        room_id = str(uuid.uuid4())[:6]

    rooms[room_id] = {
        "players": [],
        "current_turn": None,
        "turn_history": [],
        "summary": ""
    }
    return room_id


def join_room(room_id: str, user_id: str):
    if not room_id:
        return None

    if room_id not in rooms:
        create_room(room_id)

    room = rooms[room_id]

    if user_id not in room["players"]:
        room["players"].append(user_id)

    if room["current_turn"] is None:
        room["current_turn"] = user_id

    return room


from fastapi import APIRouter, WebSocket
from app.rooms import create_room, join_room

router = APIRouter()

connections = {}
async def broadcast(room_id: str, message: dict):
    for ws in connections.get(room_id, []):
        await ws.send_json(message)

@router.websocket("/ws/{room_id}/{user_id}")
async def websocket_endpoint(ws: WebSocket, room_id: str, user_id: str):
    await ws.accept()

    if room_id not in connections:
        connections[room_id] = []

    connections[room_id].append(ws)
    room = join_room(room_id, user_id)

    # Notify room
    for conn in connections[room_id]:
        await conn.send_json({
            "event": "USER_JOINED",
            "user": user_id,
            "room_id": room_id
        })

    try:
        while True:
            data = await ws.receive_json()
            
            if data["event"] == "NEW_TURN":
                for conn in connections[room_id]:
                    await conn.send_json(data)
            else:
                for conn in connections[room_id]:
                    await conn.send_json(data)

    except:
        connections[room_id].remove(ws)

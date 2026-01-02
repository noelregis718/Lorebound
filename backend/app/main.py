from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.websocket import router as ws_router
from app.audio import router as audio_router
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from app.turn import router as turn_router
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.include_router(audio_router)
app.include_router(turn_router)

app.mount("/audio", StaticFiles(directory="audio"), name="audio")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ws_router)

@app.get("/")
def health():
    return {"status": "ok"}


@app.websocket("/ws/{username}/{room_id}")
async def websocket_endpoint(
    websocket: WebSocket,
    username: str,
    room_id: str
):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            await websocket.send_text(
                f"{username} said: {data}"
            )
    except WebSocketDisconnect:
        print(f"{username} disconnected from {room_id}")



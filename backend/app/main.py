from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from app.websocket import router as ws_router
from app.audio import router as audio_router
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from app.turn import router as turn_router
from fastapi.staticfiles import StaticFiles
from app.story import save_story, load_story, export_story_audio, export_story_text
from app.rooms import rooms
from fastapi.responses import FileResponse
from app.story import export_story_audio
from pydantic import BaseModel
from app.auth import (
    verify_google_token,
    get_or_create_user,
    create_access_token
)
from app.auth import get_current_user



app = FastAPI()

app.include_router(audio_router)
app.include_router(turn_router)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
app.mount("/audio", StaticFiles(directory="audio"), name="audio")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ws_router)

class GoogleAuthRequest(BaseModel):
    token: str


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

@app.post("/end-story/{room_id}")
def end_story(room_id: str, user=Depends(get_current_user)):

    room = rooms.get(room_id)
    if not room:
        return {"status": "invalid_room"}

    story_id = save_story(room_id, room["turn_history"])

    return {
        "status": "saved",
        "story_id": story_id
    }


@app.get("/story/{story_id}")
def get_story(story_id: str):
    story = load_story(story_id)
    if not story:
        return {"status": "not_found"}
    return story

@app.get("/story/{story_id}/export/text")
def export_text(story_id: str):
    story = load_story(story_id)
    return {
        "text": export_story_text(story)
    }


@app.get("/story/{story_id}/export/audio")
def export_audio(story_id: str):
    story = load_story(story_id)
    out = f"stories/{story_id}.mp3"
    export_story_audio(story["turns"], out)
    return {"audio_path": out}

@app.get("/story/{story_id}/download")
def download_story_audio(story_id: str):
    story = load_story(story_id)
    if not story:
        return {"status": "not_found"}

    output = f"stories/{story_id}.mp3"
    export_story_audio(story["turns"], output)

    return FileResponse(
        output,
        media_type="audio/mpeg",
        filename=f"{story_id}.mp3"
    )

@app.post("/auth/google")
def google_auth(payload: GoogleAuthRequest):
    google_user = verify_google_token(payload.token)
    user = get_or_create_user(google_user)

    jwt_token = create_access_token({
        "sub": user["email"],
        "name": user["name"]
    })

    return {
        "access_token": jwt_token,
        "token_type": "bearer",
        "user": user
    }


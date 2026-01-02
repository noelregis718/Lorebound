import uuid
from typing import Optional
from fastapi import APIRouter, UploadFile, File, HTTPException
from pathlib import Path
from app.tts import generate_tts
from app.asr import transcribe_audio
from app.rooms import rooms
from app.llm import generate_story
from app.prompt import build_story_prompt
from app.story import build_recent_context
from app.websocket import broadcast

router = APIRouter()

UPLOADS_DIR = Path("uploads")
UPLOADS_DIR.mkdir(exist_ok=True)


@router.post("/upload-audio")
async def upload_audio(
    file: UploadFile = File(...),
    room_id: Optional[str] = None,
    user_id: Optional[str] = None
):
    if not room_id or not user_id:
        raise HTTPException(status_code=400, detail="room_id and user_id required")

    room = rooms.get(room_id)
    if not room:
        return {"status": "waiting"}

    # Save audio
    file_path = UPLOADS_DIR / f"{uuid.uuid4()}_{file.filename}"
    with open(file_path, "wb") as f:
        f.write(await file.read())

    # Transcribe
    transcript = transcribe_audio(str(file_path))

    human_turn = {
        "speaker": user_id,
        "transcript": transcript,
        "audio_path": str(file_path)
    }

    room.setdefault("turn_history", []).append(human_turn)

    # Count only human turns
    human_turns = [
        t for t in room["turn_history"]
        if t["speaker"] != "AI"
    ]

    # 🔒 Do NOT call AI until at least 2 human turns exist
    if len(human_turns) < 2:
        return {
            "status": "ok",
            "human_turn": human_turn
        }

    # Build prompt
    recent_context = build_recent_context(room["turn_history"])
    prompt = build_story_prompt(
        room.get("summary", ""),
        recent_context,
        transcript
    )

    # 🤖 AI response
    ai_text = generate_story(prompt)

    # 🎙 Generate AI voice
    ai_audio_path = generate_tts(ai_text)

    ai_turn = {
        "speaker": "AI",
        "transcript": ai_text,
        "audio_path": ai_audio_path
    }

    room["turn_history"].append(ai_turn)

    # 📡 Broadcast AI to room
    await broadcast(
        room_id,
        {
            "event": "AI_MESSAGE",
            "turn": ai_turn
        }
    )

    return {
        "human_turn": human_turn,
        "ai_turn": ai_turn
    }
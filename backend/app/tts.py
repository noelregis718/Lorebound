# backend/app/tts.py
from TTS.api import TTS
from pathlib import Path
import uuid

AUDIO_DIR = Path("audio")
AUDIO_DIR.mkdir(exist_ok=True)

tts = TTS("tts_models/en/ljspeech/tacotron2-DDC", gpu=False)

def generate_tts(text: str) -> str:
    audio_id = str(uuid.uuid4())
    path = AUDIO_DIR / f"{audio_id}.wav"
    tts.tts_to_file(text=text, file_path=str(path))
    return str(path)

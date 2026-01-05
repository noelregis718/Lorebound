def build_recent_context(turns, n=5):
    return "\n".join(
        f"{t['speaker']}: {t['transcript']}"
        for t in turns[-n:]
    )
import json
import uuid
from pathlib import Path
from datetime import datetime
from pydub import AudioSegment

STORIES_DIR = Path("stories")
STORIES_DIR.mkdir(exist_ok=True)

def save_story(room_id: str, turns: list) -> str:
    story_id = str(uuid.uuid4())

    story = {
        "story_id": story_id,
        "room_id": room_id,
        "title": f"Story from room {room_id}",
        "turns": turns,
        "created_at": datetime.utcnow().isoformat()
    }

    path = STORIES_DIR / f"{story_id}.json"
    with open(path, "w") as f:
        json.dump(story, f, indent=2)

    return story_id


def load_story(story_id: str):
    path = STORIES_DIR / f"{story_id}.json"
    if not path.exists():
        return None

    with open(path) as f:
        return json.load(f)
    
def export_story_text(story):
    return "\n\n".join(
        f"{t['speaker'].upper()}:\n{t['transcript']}"
        for t in story["turns"]
    )


def export_story_audio(turns, output_path):
    final = AudioSegment.empty()

    for t in turns:
        if t.get("audio_path"):
            final += AudioSegment.from_file(t["audio_path"])

    final.export(output_path, format="mp3")

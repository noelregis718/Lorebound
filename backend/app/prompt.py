def build_story_prompt(summary, recent_context, player_text):
    return f"""
This is a work of dark fantasy fiction.

The following text describes events and dialogue in a fictional world.
It is not advice, instructions, or real-world guidance.

Story so far:
{summary or "The story has just begun."}

Recent events:
{recent_context}

The last character said:
\"{player_text}\"

Write the next part of the fictional story in a serious, dark fantasy tone.
Do not repeat previous lines.
End with an unresolved moment that invites another character to act.
If appropriate, include a brief line of dialogue spoken by a character.
Limit to 2–3 sentences.
"""

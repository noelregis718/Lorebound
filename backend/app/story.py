def build_recent_context(turns, n=5):
    return "\n".join(
        f"{t['speaker']}: {t['transcript']}"
        for t in turns[-n:]
    )

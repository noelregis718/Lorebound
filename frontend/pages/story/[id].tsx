import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

type Turn = {
  speaker: string;
  transcript: string;
  audio_path?: string;
};

type Story = {
  story_id: string;
  title: string;
  turns: Turn[];
};

export default function StoryReplay() {
  const router = useRouter();
  const { id } = router.query;
  const [story, setStory] = useState<Story | null>(null);
  const [playing, setPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [paused, setPaused] = useState(false);

  // 🔹 Fetch story
  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:8000/story/${id}`)
      .then((res) => res.json())
      .then((data) => setStory(data));
  }, [id]);

  // 🔊 Sequential audio playback
  async function playStory() {
    if (!story || playing) return;
    setPlaying(true);
    for (let i = 0; i < story.turns.length; i++) {
      const turn = story.turns[i];
      setCurrentIndex(i);
      if (turn.audio_path) {
        await playAudio(`http://localhost:8000/${turn.audio_path}`);
      }
    }
    setPlaying(false);
    setCurrentIndex(0);
  }

  function playAudio(src: string) {
    return new Promise<void>((resolve) => {
      const audio = new Audio(src);
      audioRef.current = audio;
      audio.onended = () => {
        audioRef.current = null;
        resolve();
      };
      audio.play();
    });
  }

  function pause() {
    if (audioRef.current) {
      audioRef.current.pause();
      setPaused(true);
    }
  }

  function resume() {
    if (audioRef.current) {
      audioRef.current.play();
      setPaused(false);
    }
  }

  function copyShareLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert("🔗 Share link copied!");
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-400 mb-4"></div>
          <p className="text-white text-xl font-semibold">Loading story...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated background stars */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8 border border-white/20">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <span className="text-4xl">📖</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-6 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
            {story.title}
          </h1>

          {/* Control Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <button
              onClick={playStory}
              disabled={playing}
              className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg ${
                playing
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:scale-105 hover:shadow-2xl"
              } text-white flex items-center gap-2`}
            >
              <span className="text-2xl">{playing ? "▶" : "▶"}</span>
              {playing ? "Playing..." : "Play Story"}
            </button>

            {playing && (
              <button
                onClick={paused ? resume : pause}
                className="px-8 py-4 rounded-full font-semibold text-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <span className="text-2xl">{paused ? "▶" : "⏸"}</span>
                {paused ? "Resume" : "Pause"}
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`http://localhost:8000/story/${story.story_id}/download`}
              download
              className="px-6 py-3 rounded-full font-semibold bg-white/20 hover:bg-white/30 text-white transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-sm border border-white/30 flex items-center gap-2"
            >
              <span className="text-xl">⬇</span>
              Download MP3
            </a>

            <button
              onClick={copyShareLink}
              className="px-6 py-3 rounded-full font-semibold bg-white/20 hover:bg-white/30 text-white transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-sm border border-white/30 flex items-center gap-2"
            >
              <span className="text-xl">🔗</span>
              Share Story
            </button>
          </div>
        </div>

        {/* Story Timeline */}
        <div className="space-y-6">
          {story.turns.map((t, i) => {
            const isAI = t.speaker === "AI";
            const isCurrent = playing && i === currentIndex;
            
            return (
              <div
                key={i}
                className={`transform transition-all duration-500 ${
                  isCurrent ? "scale-105" : playing ? "scale-95 opacity-60" : "opacity-100"
                }`}
              >
                <div
                  className={`relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border transition-all duration-300 ${
                    isCurrent
                      ? "border-yellow-400 shadow-2xl shadow-yellow-400/50"
                      : "border-white/20"
                  }`}
                >
                  {/* Animated indicator for current playing */}
                  {isCurrent && (
                    <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                        <span className="text-white text-xl">🔊</span>
                      </div>
                    </div>
                  )}

                  {/* Speaker Badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                        isAI
                          ? "bg-gradient-to-br from-purple-500 to-pink-500"
                          : "bg-gradient-to-br from-blue-500 to-cyan-500"
                      }`}
                    >
                      <span className="text-2xl">{isAI ? "🤖" : "👤"}</span>
                    </div>
                    <div>
                      <p
                        className={`font-bold text-lg ${
                          isAI ? "text-purple-300" : "text-cyan-300"
                        }`}
                      >
                        {isAI ? "AI Narrator" : "Player"}
                      </p>
                      <p className="text-white/50 text-sm">Turn {i + 1}</p>
                    </div>
                  </div>

                  {/* Transcript */}
                  <div
                    className={`text-white text-lg leading-relaxed pl-4 border-l-4 ${
                      isAI ? "border-purple-400" : "border-cyan-400"
                    }`}
                  >
                    {t.transcript}
                  </div>

                  {/* Audio indicator */}
                  {t.audio_path && (
                    <div className="mt-4 flex items-center gap-2 text-white/50 text-sm">
                      <span className="text-base">🎵</span>
                      <span>Audio available</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Indicator */}
        {playing && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-lg rounded-full px-6 py-3 shadow-2xl border border-white/30">
            <div className="flex items-center gap-3 text-white">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="font-semibold">
                Playing turn {currentIndex + 1} of {story.turns.length}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
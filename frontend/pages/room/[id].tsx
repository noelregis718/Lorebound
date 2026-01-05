import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { recordAudio } from "@/utils/recorder";
import { uploadAudio } from "@/utils/upload";
import { useAuth } from "@/utils/useAuth";

export default function Room() {
  const params = useParams();
  const id = params?.id as string;
  const [messages, setMessages] = useState<any[]>([]);
  const [recorder, setRecorder] = useState<any>(null);
  const [recording, setRecording] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);
  const [userId, setUserId] = useState("");
  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useAuth();

  function playAudio(url: string) {
    const audio = new Audio(url);
    audio.play();
  }

  useEffect(() => {
    // Generate userId on client side only
    setUserId(Math.random().toString(36).slice(2, 7));
  }, []);

  useEffect(() => {
    if (!id || !userId) return;
    const ws = new WebSocket(
      `ws://localhost:8000/ws/${id}/${userId}`
    );
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
      if (data.event === "AI_MESSAGE" && data.turn?.audio_path) {
        playAudio(`http://localhost:8000/${data.turn.audio_path}`);
      }
    };
    ws.onopen = () => console.log("WS connected");
    ws.onclose = () => console.log("WS closed");
    wsRef.current = ws;
    return () => ws.close();
  }, [id, userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function startRecording() {
    const rec = await recordAudio();
    setRecorder(rec);
    setRecording(true);
  }

  async function stopRecording() {
    const audioBlob = await recorder.stop();
    setRecording(false);
    await uploadAudio(audioBlob, id as string, userId);
    setAiThinking(true);
    await fetch("http://localhost:8000/end-turn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ room_id: id }),
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-xl">🎙</span>
              </div>
              <div>
                <h2 className="text-white font-semibold text-lg">Room: {id}</h2>
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Live Session</span>
                </div>
              </div>
            </div>
            <div className="px-3 py-1.5 bg-white/10 rounded-full text-white text-sm font-medium">
              ID: {userId || "Loading..."}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600/50 to-pink-600/50 px-6 py-4 border-b border-white/10">
                <h3 className="text-white font-semibold text-lg">Conversation</h3>
              </div>
              
              <div className="p-6 h-[500px] overflow-y-auto space-y-4">
                {messages.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <div className="text-6xl mb-4">💬</div>
                      <p className="text-lg">Start recording to begin your story...</p>
                    </div>
                  </div>
                ) : (
                  messages.map((m, i) => {
                    if (m.event === "AI_MESSAGE") {
                      return (
                        <div
                          key={i}
                          className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-500/30 animate-fadeIn"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-sm">🤖</span>
                            </div>
                            <div className="flex-1">
                              <p className="text-purple-300 font-semibold text-sm mb-1">AI Narrator</p>
                              <p className="text-white leading-relaxed">{m.turn.transcript}</p>
                              {m.turn?.speaker === "AI" && (
                                <div className="mt-2 flex items-center gap-2 text-pink-300 text-sm">
                                  <div className="flex gap-1">
                                    <div className="w-1 h-4 bg-pink-400 rounded-full animate-pulse"></div>
                                    <div className="w-1 h-4 bg-pink-400 rounded-full animate-pulse delay-75"></div>
                                    <div className="w-1 h-4 bg-pink-400 rounded-full animate-pulse delay-150"></div>
                                  </div>
                                  <span>Playing audio...</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    }
                    if (m.event === "USER_JOINED") {
                      return (
                        <div
                          key={i}
                          className="flex items-center justify-center"
                        >
                          <div className="bg-white/5 rounded-full px-4 py-2 border border-white/10">
                            <p className="text-gray-400 text-sm">
                              👤 User {m.user} joined the room
                            </p>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            {/* Recording Controls */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-6">
              <h3 className="text-white font-semibold text-lg mb-4">Controls</h3>
              
              <div className="space-y-4">
                {!recording ? (
                  <button
                    onClick={startRecording}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                    </svg>
                    <span>Start Recording</span>
                  </button>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 relative z-10 animate-bounce" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                    </svg>
                    <span className="relative z-10">Stop Recording</span>
                  </button>
                )}

                {aiThinking && (
                  <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-xl p-4 border border-orange-500/30 animate-fadeIn">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full animate-spin"></div>
                        <div className="absolute inset-1 bg-gray-900 rounded-full"></div>
                      </div>
                      <div>
                        <p className="text-orange-300 font-semibold text-sm">AI Processing</p>
                        <p className="text-white text-xs">Generating response...</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Status Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-6">
              <h3 className="text-white font-semibold text-lg mb-4">Session Info</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Messages</span>
                  <span className="text-white font-semibold">{messages.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    recording 
                      ? 'bg-red-500/20 text-red-300' 
                      : aiThinking 
                      ? 'bg-orange-500/20 text-orange-300'
                      : 'bg-green-500/20 text-green-300'
                  }`}>
                    {recording ? 'Recording' : aiThinking ? 'Processing' : 'Ready'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Connection</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-white text-sm">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Debug Panel (Optional - can be hidden) */}
        <div className="mt-6 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
          <details className="group">
            <summary className="px-6 py-4 cursor-pointer text-white font-semibold hover:bg-white/5 transition-colors flex items-center justify-between">
              <span>Debug Data</span>
              <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-6 pb-6">
              <pre className="text-gray-300 text-xs overflow-x-auto bg-black/40 p-4 rounded-xl">
                {JSON.stringify(messages, null, 2)}
              </pre>
            </div>
          </details>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .delay-75 {
          animation-delay: 75ms;
        }
        .delay-150 {
          animation-delay: 150ms;
        }
      `}</style>
    </div>
  );
}
module.exports = [
"[project]/pages/room/[id].tsx [ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

// import { useParams } from "next/navigation";
// import { useEffect, useState, useRef } from "react";
// import { recordAudio } from "@/utils/recorder";
// import { uploadAudio } from "@/utils/upload";
// export default function Room() {
//   const params = useParams();
//   const id = params?.id as string;
//   const [messages, setMessages] = useState<any[]>([]);
//   const [recorder, setRecorder] = useState<any>(null);
//   const [recording, setRecording] = useState(false);
//   const [aiThinking, setAiThinking] = useState(false)
//   const wsRef = useRef<WebSocket | null>(null);
//   const userId = useRef(Math.random().toString(36).slice(2, 7));
//   function playAudio(url: string) {
//     const audio = new Audio(url)
//     audio.play()
//   }
//   useEffect(() => {
//     if (!id) return;
//     const ws = new WebSocket(
//       `ws://localhost:8000/ws/${id}/${userId.current}`
//     );
//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       setMessages((prev) => [...prev, data]);
//       // Play AI audio if available
//       if (data.event === "AI_MESSAGE" && data.turn?.audio_path) {
//         playAudio(`http://localhost:8000/${data.turn.audio_path}`)
//       }
//     };
//     ws.onopen = () => console.log("WS connected");
//     ws.onclose = () => console.log("WS closed");
//     wsRef.current = ws;
//     return () => ws.close();
//   }, [id]);
//   async function startRecording() {
//     const rec = await recordAudio();
//     setRecorder(rec);
//     setRecording(true);
//   }
//   async function stopRecording() {
//   const audioBlob = await recorder.stop()
//   setRecording(false)
//   // 1️⃣ Upload audio
//   await uploadAudio(audioBlob, id as string, userId.current)
//   // 2️⃣ Tell backend the turn ended
//   setAiThinking(true) // 🔑 START THINKING
//   await fetch("http://localhost:8000/end-turn", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ room_id: id })
//   })
// }
//   return (
//     <div style={{ padding: 40 }}>
//       <h2>Room: {id}</h2>
//       <div style={{ marginBottom: 20 }}>
//         {!recording ? (
//           <button onClick={startRecording}>Start Recording</button>
//         ) : (
//           <button onClick={stopRecording}>Stop Recording</button>
//         )}
//          {aiThinking && (
//   <p style={{ color: "orange", fontStyle: "italic" }}>
//     🤖 AI is thinking...
//   </p>
// )}
//       </div>
//       <div style={{ marginBottom: 20 }}>
//         {messages.map((m, i) => {
//           if (m.event === "AI_MESSAGE") {
//             return (
//               <div key={i}>
//                 <p>
//                   <b style={{ color: "purple" }}>AI:</b>{" "}
//                   {m.turn.transcript}
//                 </p>
//                 {m.turn?.speaker === "AI" && <p>🔊 AI Narrating...</p>}
//               </div>
//             );
//           }
//           if (m.event === "USER_JOINED") {
//             return (
//               <p key={i} style={{ color: "gray" }}>
//                 User {m.user} joined
//               </p>
//             );
//           }
//           return null;
//         })}
//       </div>
//       <pre>{JSON.stringify(messages, null, 2)}</pre>
//     </div>
//   );
// }
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2c0011e3._.js.map
module.exports = [
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/utils/recorder.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "recordAudio",
    ()=>recordAudio
]);
async function recordAudio() {
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
    });
    const mediaRecorder = new MediaRecorder(stream);
    const chunks = [];
    mediaRecorder.ondataavailable = (e)=>chunks.push(e.data);
    mediaRecorder.start();
    return {
        stop: ()=>new Promise((resolve)=>{
                mediaRecorder.onstop = ()=>{
                    const blob = new Blob(chunks, {
                        type: "audio/webm"
                    });
                    resolve(blob);
                };
                mediaRecorder.stop();
            })
    };
}
}),
"[project]/utils/upload.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "uploadAudio",
    ()=>uploadAudio
]);
async function uploadAudio(blob, roomId, userId) {
    const formData = new FormData();
    formData.append("file", blob);
    const res = await fetch(`http://localhost:8000/upload-audio?room_id=${roomId}&user_id=${userId}`, {
        method: "POST",
        body: formData
    });
    return res.json();
}
}),
"[project]/pages/room/[id].tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Room
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$recorder$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/recorder.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$upload$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/upload.ts [ssr] (ecmascript)");
;
;
;
;
;
function Room() {
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const id = params?.id;
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [recorder, setRecorder] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [recording, setRecording] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [aiThinking, setAiThinking] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const wsRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const userId = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(Math.random().toString(36).slice(2, 7));
    function playAudio(url) {
        const audio = new Audio(url);
        audio.play();
    }
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!id) return;
        const ws = new WebSocket(`ws://localhost:8000/ws/${id}/${userId.current}`);
        ws.onmessage = (event)=>{
            const data = JSON.parse(event.data);
            setMessages((prev)=>[
                    ...prev,
                    data
                ]);
            // Play AI audio if available
            if (data.event === "AI_MESSAGE" && data.turn?.audio_path) {
                playAudio(`http://localhost:8000/${data.turn.audio_path}`);
            }
        };
        ws.onopen = ()=>console.log("WS connected");
        ws.onclose = ()=>console.log("WS closed");
        wsRef.current = ws;
        return ()=>ws.close();
    }, [
        id
    ]);
    async function startRecording() {
        const rec = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$recorder$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["recordAudio"])();
        setRecorder(rec);
        setRecording(true);
    }
    async function stopRecording() {
        const audioBlob = await recorder.stop();
        setRecording(false);
        // 1️⃣ Upload audio
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$upload$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["uploadAudio"])(audioBlob, id, userId.current);
        // 2️⃣ Tell backend the turn ended
        setAiThinking(true); // 🔑 START THINKING
        await fetch("http://localhost:8000/end-turn", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                room_id: id
            })
        });
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            padding: 40
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                children: [
                    "Room: ",
                    id
                ]
            }, void 0, true, {
                fileName: "[project]/pages/room/[id].tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 20
                },
                children: [
                    !recording ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: startRecording,
                        children: "Start Recording"
                    }, void 0, false, {
                        fileName: "[project]/pages/room/[id].tsx",
                        lineNumber: 81,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: stopRecording,
                        children: "Stop Recording"
                    }, void 0, false, {
                        fileName: "[project]/pages/room/[id].tsx",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this),
                    aiThinking && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        style: {
                            color: "orange",
                            fontStyle: "italic"
                        },
                        children: "🤖 AI is thinking..."
                    }, void 0, false, {
                        fileName: "[project]/pages/room/[id].tsx",
                        lineNumber: 86,
                        columnNumber: 3
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/room/[id].tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 20
                },
                children: messages.map((m, i)=>{
                    if (m.event === "AI_MESSAGE") {
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("b", {
                                            style: {
                                                color: "purple"
                                            },
                                            children: "AI:"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/room/[id].tsx",
                                            lineNumber: 98,
                                            columnNumber: 19
                                        }, this),
                                        " ",
                                        m.turn.transcript
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/room/[id].tsx",
                                    lineNumber: 97,
                                    columnNumber: 17
                                }, this),
                                m.turn?.speaker === "AI" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    children: "🔊 AI Narrating..."
                                }, void 0, false, {
                                    fileName: "[project]/pages/room/[id].tsx",
                                    lineNumber: 101,
                                    columnNumber: 46
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/pages/room/[id].tsx",
                            lineNumber: 96,
                            columnNumber: 15
                        }, this);
                    }
                    if (m.event === "USER_JOINED") {
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            style: {
                                color: "gray"
                            },
                            children: [
                                "User ",
                                m.user,
                                " joined"
                            ]
                        }, i, true, {
                            fileName: "[project]/pages/room/[id].tsx",
                            lineNumber: 109,
                            columnNumber: 15
                        }, this);
                    }
                    return null;
                })
            }, void 0, false, {
                fileName: "[project]/pages/room/[id].tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("pre", {
                children: JSON.stringify(messages, null, 2)
            }, void 0, false, {
                fileName: "[project]/pages/room/[id].tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/room/[id].tsx",
        lineNumber: 74,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8500261d._.js.map
# VoxTale
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lorebound - Voice-Driven AI Storytelling Platform</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
            background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
            color: #e0e0e0;
            line-height: 1.7;
            overflow-x: hidden;
        }

        /* Animated Background */
        .stars {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
        }

        .star {
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            animation: twinkle 3s infinite;
        }

        @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
        }

        /* Container */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
            position: relative;
            z-index: 1;
        }

        /* Hero Section */
        .hero {
            text-align: center;
            padding: 80px 0 60px;
            position: relative;
        }

        .floating-book {
            width: 120px;
            height: 140px;
            margin: 0 auto 30px;
            position: relative;
            animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
        }

        .book {
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 10px;
            position: relative;
            box-shadow: 0 20px 60px rgba(102, 126, 234, 0.5);
        }

        .book::before {
            content: '📖';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 60px;
        }

        .title {
            font-size: 72px;
            font-weight: 800;
            background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 15px;
            text-shadow: 0 0 40px rgba(102, 126, 234, 0.5);
        }

        .subtitle {
            font-size: 28px;
            color: #a0a0c0;
            margin-bottom: 10px;
            font-weight: 300;
        }

        .tagline {
            font-size: 20px;
            color: #667eea;
            font-weight: 500;
            font-style: italic;
            margin-top: 20px;
        }

        .description {
            font-size: 18px;
            color: #b0b0c0;
            max-width: 800px;
            margin: 30px auto;
            line-height: 1.8;
        }

        /* Badges */
        .badges {
            display: flex;
            justify-content: center;
            gap: 10px;
            flex-wrap: wrap;
            margin: 30px 0;
        }

        .badge {
            padding: 8px 16px;
            background: rgba(102, 126, 234, 0.2);
            border: 1px solid rgba(102, 126, 234, 0.4);
            border-radius: 20px;
            color: #667eea;
            font-size: 14px;
            font-weight: 600;
            backdrop-filter: blur(10px);
        }

        /* Section Styling */
        .section {
            margin: 60px 0;
            padding: 40px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 20px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
        }

        .section:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 50px rgba(102, 126, 234, 0.3);
        }

        .section-title {
            font-size: 36px;
            font-weight: 700;
            color: #fff;
            margin-bottom: 30px;
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .section-title::before {
            content: '';
            width: 5px;
            height: 40px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 10px;
        }

        /* Features Grid */
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 25px;
            margin-top: 30px;
        }

        .feature-card {
            background: rgba(255, 255, 255, 0.08);
            padding: 30px;
            border-radius: 15px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .feature-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            transform: scaleX(0);
            transition: transform 0.3s ease;
        }

        .feature-card:hover::before {
            transform: scaleX(1);
        }

        .feature-card:hover {
            transform: translateY(-5px);
            background: rgba(255, 255, 255, 0.12);
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }

        .feature-icon {
            font-size: 40px;
            margin-bottom: 15px;
        }

        .feature-title {
            font-size: 20px;
            font-weight: 600;
            color: #fff;
            margin-bottom: 10px;
        }

        .feature-desc {
            font-size: 15px;
            color: #b0b0c0;
            line-height: 1.6;
        }

        /* Architecture Diagram */
        .architecture {
            background: rgba(0, 0, 0, 0.3);
            padding: 30px;
            border-radius: 15px;
            border-left: 4px solid #667eea;
            font-family: 'Courier New', monospace;
            overflow-x: auto;
        }

        .architecture pre {
            color: #e0e0e0;
            font-size: 14px;
            line-height: 1.8;
        }

        /* Tech Stack */
        .tech-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }

        .tech-category {
            background: rgba(102, 126, 234, 0.1);
            padding: 25px;
            border-radius: 12px;
            border: 1px solid rgba(102, 126, 234, 0.3);
        }

        .tech-category h4 {
            color: #667eea;
            font-size: 18px;
            margin-bottom: 15px;
            font-weight: 600;
        }

        .tech-category ul {
            list-style: none;
            padding: 0;
        }

        .tech-category li {
            padding: 8px 0;
            color: #d0d0d0;
            position: relative;
            padding-left: 20px;
        }

        .tech-category li::before {
            content: '▹';
            position: absolute;
            left: 0;
            color: #667eea;
            font-weight: bold;
        }

        /* Workflow Steps */
        .workflow {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .workflow-step {
            display: flex;
            align-items: center;
            gap: 20px;
            padding: 20px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            border-left: 4px solid #667eea;
            transition: all 0.3s ease;
        }

        .workflow-step:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateX(10px);
        }

        .step-number {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 18px;
            flex-shrink: 0;
        }

        .step-text {
            flex: 1;
            color: #d0d0d0;
            font-size: 16px;
        }

        /* Code Blocks */
        .code-block {
            background: rgba(0, 0, 0, 0.5);
            padding: 25px;
            border-radius: 12px;
            margin: 20px 0;
            border: 1px solid rgba(102, 126, 234, 0.3);
            position: relative;
            overflow-x: auto;
        }

        .code-block::before {
            content: attr(data-lang);
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 12px;
            color: #667eea;
            font-weight: 600;
            text-transform: uppercase;
        }

        .code-block pre {
            color: #e0e0e0;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            line-height: 1.6;
            margin: 0;
        }

        .code-block code {
            color: #4ec9b0;
        }

        /* CTA Buttons */
        .cta-buttons {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
            margin: 40px 0;
        }

        .cta-button {
            padding: 15px 40px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            text-decoration: none;
            border-radius: 30px;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
            border: none;
            cursor: pointer;
        }

        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
        }

        .cta-button.secondary {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid #667eea;
        }

        /* Author Section */
        .author {
            text-align: center;
            padding: 40px;
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
            border-radius: 20px;
            margin-top: 60px;
        }

        .author-avatar {
            width: 100px;
            height: 100px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 50px;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.5);
        }

        .author h3 {
            font-size: 28px;
            color: #fff;
            margin-bottom: 10px;
        }

        .author p {
            color: #b0b0c0;
            font-size: 16px;
            margin: 5px 0;
        }

        /* Highlights */
        .highlights {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }

        .highlight {
            text-align: center;
            padding: 25px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 15px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .highlight-icon {
            font-size: 35px;
            margin-bottom: 10px;
        }

        .highlight-text {
            color: #d0d0d0;
            font-size: 14px;
            line-height: 1.5;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .title {
                font-size: 48px;
            }

            .subtitle {
                font-size: 22px;
            }

            .section {
                padding: 25px;
            }

            .section-title {
                font-size: 28px;
            }

            .features-grid,
            .tech-grid {
                grid-template-columns: 1fr;
            }

            .cta-buttons {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <div class="stars" id="stars"></div>
    
    <div class="container">
        <!-- Hero Section -->
        <div class="hero">
            <div class="floating-book">
                <div class="book"></div>
            </div>
            <h1 class="title">Lorebound</h1>
            <p class="subtitle">A Voice-Driven, Multiplayer AI Storytelling Platform</p>
            <p class="tagline">Speak. Create. Become the story.</p>
            
            <div class="badges">
                <span class="badge">🎙 Voice-First</span>
                <span class="badge">👥 Multiplayer</span>
                <span class="badge">🤖 AI-Powered</span>
                <span class="badge">🔊 Offline TTS</span>
                <span class="badge">⚡ Real-Time</span>
            </div>

            <p class="description">
                Lorebound is a real-time, voice-based collaborative storytelling platform where multiple users take turns speaking, 
                and an AI dynamically continues the narrative. Stories are narrated aloud, persist across sessions, 
                and can be replayed or exported like a podcast.
            </p>

            <p class="description" style="font-style: italic; color: #667eea;">
                This project blends speech recognition, AI storytelling, offline neural text-to-speech, 
                and real-time multiplayer systems into one immersive experience.
            </p>

            <div class="cta-buttons">
                <button class="cta-button">⭐ Star on GitHub</button>
                <button class="cta-button secondary">📖 View Documentation</button>
            </div>
        </div>

        <!-- Key Features -->
        <div class="section">
            <h2 class="section-title">✨ Key Features</h2>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">🎙</div>
                    <div class="feature-title">Voice-First Interaction</div>
                    <div class="feature-desc">Users contribute to the story using spoken input instead of typing.</div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">👥</div>
                    <div class="feature-title">Multiplayer Rooms</div>
                    <div class="feature-desc">Multiple participants join a shared room and collaboratively build a story.</div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🤖</div>
                    <div class="feature-title">AI Story Continuation</div>
                    <div class="feature-desc">After human turns, an AI continues the narrative based on recent context.</div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🔊</div>
                    <div class="feature-title">AI Voice Narration</div>
                    <div class="feature-desc">AI responses are narrated using an offline neural TTS engine (no API limits).</div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">⚡</div>
                    <div class="feature-title">Real-Time Updates</div>
                    <div class="feature-desc">WebSocket-based live events for joins, turns, and AI narration.</div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📖</div>
                    <div class="feature-title">Persistent Stories</div>
                    <div class="feature-desc">Completed stories are saved and can be replayed anytime.</div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🎧</div>
                    <div class="feature-title">Podcast-Style Replay</div>
                    <div class="feature-desc">Stories can be replayed turn-by-turn or exported as audio/text.</div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🌌</div>
                    <div class="feature-title">Immersive Onboarding</div>
                    <div class="feature-desc">Animated landing experience with a floating storybook intro.</div>
                </div>
            </div>
        </div>

        <!-- Architecture -->
        <div class="section">
            <h2 class="section-title">🧠 System Architecture</h2>
            <div class="architecture">
                <pre>Frontend (Next.js + Framer Motion)
│
├── Animated Landing Page (Floating Book)
├── Join Room UI
├── Real-time Story View
│
Backend (FastAPI)
│
├── WebSockets (Live Events)
├── Audio Upload API
├── ASR (Whisper)
├── AI Story Generation (LLM)
├── Offline Neural TTS (Mozilla / Coqui)
├── Room & Turn Management
└── Story Persistence (JSON-based)</pre>
            </div>
        </div>

        <!-- Tech Stack -->
        <div class="section">
            <h2 class="section-title">🛠 Tech Stack</h2>
            <div class="tech-grid">
                <div class="tech-category">
                    <h4>Frontend</h4>
                    <ul>
                        <li>Next.js (React)</li>
                        <li>Framer Motion (animations)</li>
                        <li>Web Audio API</li>
                    </ul>
                </div>
                <div class="tech-category">
                    <h4>Backend</h4>
                    <ul>
                        <li>FastAPI</li>
                        <li>WebSockets</li>
                        <li>Whisper ASR</li>
                        <li>Offline Neural TTS</li>
                        <li>Background tasks</li>
                    </ul>
                </div>
                <div class="tech-category">
                    <h4>AI / ML</h4>
                    <ul>
                        <li>Speech-to-Text (ASR)</li>
                        <li>Prompt-engineered AI</li>
                        <li>Neural Text-to-Speech</li>
                        <li>Offline processing</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- How It Works -->
        <div class="section">
            <h2 class="section-title">🚀 How It Works</h2>
            <div class="workflow">
                <div class="workflow-step">
                    <div class="step-number">1</div>
                    <div class="step-text">User joins a room</div>
                </div>
                <div class="workflow-step">
                    <div class="step-number">2</div>
                    <div class="step-text">User records voice input</div>
                </div>
                <div class="workflow-step">
                    <div class="step-number">3</div>
                    <div class="step-text">Backend transcribes audio (ASR)</div>
                </div>
                <div class="workflow-step">
                    <div class="step-number">4</div>
                    <div class="step-text">Human turn is saved & broadcast</div>
                </div>
                <div class="workflow-step">
                    <div class="step-number">5</div>
                    <div class="step-text">AI generates next story segment</div>
                </div>
                <div class="workflow-step">
                    <div class="step-number">6</div>
                    <div class="step-text">AI narration is generated (TTS)</div>
                </div>
                <div class="workflow-step">
                    <div class="step-number">7</div>
                    <div class="step-text">AI turn is broadcast and played aloud</div>
                </div>
                <div class="workflow-step">
                    <div class="step-number">8</div>
                    <div class="step-text">Story continues collaboratively</div>
                </div>
            </div>
        </div>

        <!-- Setup -->
        <div class="section">
            <h2 class="section-title">🧪 Local Setup</h2>
            
            <h3 style="color: #667eea; margin: 30px 0 15px; font-size: 24px;">Backend</h3>
            <div class="code-block" data-lang="bash">
                <pre>cd backend
python3.11 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload</pre>
            </div>

            <h3 style="color: #667eea; margin: 30px 0 15px; font-size: 24px;">Frontend</h3>
            <div class="code-block" data-lang="bash">
                <pre>cd frontend
npm install
npm run dev</pre>
            </div>

            <h3 style="color: #667eea; margin: 30px 0 15px; font-size: 24px;">Open Application</h3>
            <div class="code-block" data-lang="url">
                <pre>http://localhost:3000</pre>
            </div>
        </div>

        <!-- Project Structure -->
        <div class="section">
            <h2 class="section-title">📂 Project Structure</h2>
            <div class="code-block" data-lang="structure">
                <pre>backend/
 ├── app/
 │   ├── audio.py        # Audio upload & ASR
 │   ├── tts.py          # Offline TTS
 │   ├── llm.py          # AI story generation
 │   ├── rooms.py        # Room & state management
 │   ├── websocket.py    # Real-time events
 │   └── persistence.py  # Story saving & loading
 └── stories/             # Saved stories

frontend/
 ├── pages/
 │   ├── index.tsx       # Animated landing page
 │   ├── join.tsx        # Join room
 │   └── room/[id].tsx   # Story room
 └── components/
     └── FloatingBook.tsx</pre>
            </div>
        </div>

        <!-- Why Different -->
        <div class="section">
            <h2 class="section-title">🎯 Why Lorebound Is Different</h2>
            <div class="highlights">
                <div class="highlight">
                    <div class="highlight-icon">🎙</div>
                    <div class="highlight-text">Voice-native, not text-first</div>
                </div>
                <div class="highlight">
                    <div class="highlight-icon">👥</div>
                    <div class="highlight-text">Multiplayer, not single-player</div>
                </div>
                <div class="highlight">
                    <div class="highlight-icon">🔒</div>
                    <div class="highlight-text">Offline-safe, no paid TTS APIs</div>
                </div>
                <div class="highlight">
                    <div class="highlight-icon">⚡</div>
                    <div class="highlight-text">Event-driven architecture</div>
                </div>
                <div class="highlight">
                    <div class="highlight-icon">🎨</div>
                    <div class="highlight-text">Designed like a real product</div>
                </div>
            </div>
        </div>

        <!-- Future Enhancements -->
        <div class="section">
            <h2 class="section-title">🧩 Future Enhancements</h2>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">🎭</div>
                    <div class="feature-title">Character Personas</div>
                    <div class="feature-desc">Distinct AI voices for different characters</div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🌳</div>
                    <div class="feature-title">Branching Timelines</div>
                    <div class="feature-desc">Multiple story paths and outcomes</div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">☁️</div>
                    <div class="feature-title">Cloud Persistence</div>
                    <div class="feature-desc">Postgres / Supabase integration</div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🎙</div>
                    <div class="feature-title">Multi-Voice AI</div>
                    <div class="feature-desc">Different narrators for story segments</div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📱</div>
                    <div class="feature-title">Mobile-First UI</div>
                    <div class="feature-desc">Optimized mobile experience</div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🔐</div>
                    <div class="feature-title">Auth & Private Rooms</div>
                    <div class="feature-desc">User authentication and private storytelling</div>
                </div>
            </div>
        </div>

        <!-- Author -->
        <div class="author">
            <div class="author-avatar">👩‍💻</div>
            <h3>Umangi Nigam</h3>
            <p>B.Tech CSE | AI & Full-Stack Developer</p>
            <p style="margin-top: 10px; font-style: italic;">Focus: Real-time systems, AI orchestration, applied ML</p>
        </div>
    </div>

    <script>
        // Create animated stars
        function createStars() {
            const starsContainer = document.getElementById('stars');
            for (let i = 0; i < 100; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animationDelay = Math.random() * 3 + 's';
                starsContainer.appendChild(star);
            }
        }
        createStars();
    </script>
</body>
</html>

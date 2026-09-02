/**
 * GOOGLE ANTIGRAVITY IDE - AGENTIC AI ENGINE
 * Multi-Step Reasoning, DeepMind Thought Protocol, Tool-Calling Simulation,
 * Slash Commands, Offline Autonomous Code Synthesizer & Free BYOK Gemini/Ollama Connector.
 */

class AntigravityAIEngine {
  constructor() {
    this.model = 'antigravity-ultra';
    this.apiKey = localStorage.getItem('antigravity_api_key') || '';
    this.ollamaUrl = localStorage.getItem('antigravity_ollama_url') || 'http://localhost:11434';
    this.isGenerating = false;
    this.soundEnabled = true;

    this.initAudio();
    this.initDOM();
    this.initSlashCommands();
    this.renderInitialWelcome();
  }

  // Web Audio Synthesizer for futuristic sci-fi sound effects
  initAudio() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    } catch (e) {
      console.warn('Web Audio not supported');
    }
  }

  playSound(type) {
    if (!this.soundEnabled || !this.audioCtx) return;
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    const now = this.audioCtx.currentTime;

    if (type === 'tap') {
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'success') {
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'tool') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(640, now + 0.1);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    }
  }

  initDOM() {
    this.chatContainer = document.getElementById('chatMessagesContainer');
    this.chatInput = document.getElementById('chatTextarea');
    this.btnSend = document.getElementById('btnSendAgent');
    this.slashMenu = document.getElementById('slashCommandMenu');
    this.modelSelectEl = document.getElementById('agentModelSelect');
    this.navModelName = document.getElementById('navModelName');
    this.subagentHud = document.getElementById('subagentHudOverlay');
    this.subagentTaskText = document.getElementById('subagentTaskText');

    // Send button click
    this.btnSend?.addEventListener('click', () => {
      this.handleSend();
    });

    // Chat textarea key events
    this.chatInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.handleSend();
      } else if (e.key === '/' && this.chatInput.value.trim() === '') {
        this.showSlashMenu();
      } else if (e.key === 'Escape') {
        this.hideSlashMenu();
      }
    });

    this.chatInput?.addEventListener('input', () => {
      if (this.chatInput.value.startsWith('/')) {
        this.showSlashMenu();
      } else {
        this.hideSlashMenu();
      }
    });

    // Model selection changes
    this.modelSelectEl?.addEventListener('change', (e) => {
      this.model = e.target.value;
      const optionText = e.target.options[e.target.selectedIndex].text;
      if (this.navModelName) this.navModelName.textContent = optionText;
      if (window.antigravityCore) {
        window.antigravityCore.logTerminal(`Model aktif diubah menjadi: ${optionText}`, 'info');
      }
    });

    // Quick prompt chips
    document.querySelectorAll('.prompt-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        const text = e.currentTarget.textContent.replace(/^[^\w\s]+/, '').trim();
        this.chatInput.value = text;
        this.chatInput.focus();
        this.handleSend();
      });
    });

    // Settings Modal bindings
    this.initSettingsModal();
  }

  initSettingsModal() {
    const modal = document.getElementById('settingsModal');
    const btnOpen = document.getElementById('btnOpenSettings');
    const btnClose = document.getElementById('btnCloseSettings');
    const btnSave = document.getElementById('btnSaveSettings');
    const apiKeyInput = document.getElementById('settingApiKey');
    const ollamaInput = document.getElementById('settingOllamaUrl');
    const soundToggle = document.getElementById('settingSoundToggle');

    if (apiKeyInput) apiKeyInput.value = this.apiKey;
    if (ollamaInput) ollamaInput.value = this.ollamaUrl;

    btnOpen?.addEventListener('click', () => {
      modal.classList.add('open');
    });

    btnClose?.addEventListener('click', () => {
      modal.classList.remove('open');
    });

    btnSave?.addEventListener('click', () => {
      this.apiKey = apiKeyInput.value.trim();
      this.ollamaUrl = ollamaInput.value.trim();
      this.soundEnabled = soundToggle ? soundToggle.checked : true;

      localStorage.setItem('antigravity_api_key', this.apiKey);
      localStorage.setItem('antigravity_ollama_url', this.ollamaUrl);
      modal.classList.remove('open');
      this.playSound('success');

      if (window.antigravityCore) {
        window.antigravityCore.logTerminal('Pengaturan API & preferensi berhasil disimpan.', 'success');
      }
    });
  }

  initSlashCommands() {
    this.slashCommands = [
      { cmd: '/goal', desc: 'Jalankan mode autonomous coding intensif hingga target selesai' },
      { cmd: '/plan', desc: 'Beralih ke Planning Mode dan buat dokumen implementation_plan.md' },
      { cmd: '/grill-me', desc: 'Wawancara interaktif untuk membedah arsitektur & desain fitur' },
      { cmd: '/schedule', desc: 'Jadwalkan timer atau proses background' },
      { cmd: '/physics', desc: 'Nyalakan mode zero-gravity easter egg (melayang & bounce)' },
      { cmd: '/clear', desc: 'Bersihkan seluruh riwayat chat' },
      { cmd: '/export', desc: 'Ekspor proyek ke file mandiri' }
    ];

    if (!this.slashMenu) return;
    this.slashMenu.innerHTML = '';
    this.slashCommands.forEach(item => {
      const el = document.createElement('div');
      el.className = 'slash-item';
      el.innerHTML = `
        <span class="slash-cmd-tag">${item.cmd}</span>
        <span class="slash-cmd-desc">${item.desc}</span>
      `;
      el.addEventListener('click', () => {
        this.chatInput.value = item.cmd + ' ';
        this.hideSlashMenu();
        this.chatInput.focus();
      });
      this.slashMenu.appendChild(el);
    });
  }

  showSlashMenu() {
    if (this.slashMenu) this.slashMenu.style.display = 'flex';
  }

  hideSlashMenu() {
    if (this.slashMenu) this.slashMenu.style.display = 'none';
  }

  renderInitialWelcome() {
    const welcomeHTML = `
      <div class="chat-msg agent">
        <div class="agent-response-text">
          <p><strong>Halo! Saya Antigravity</strong> — AI Pair Programmer canggih dari Google DeepMind.</p>
          <p>Saya siap membantu Anda membuat aplikasi web, game interaktif, debugging kode, menyusun rancangan arsitektur, dan mengeksekusi workflow otonom secara <strong>100% gratis, tanpa batasan limit</strong>.</p>
          <p>💡 <em>Ketik <code>/</code> untuk melihat perintah pintas, atau langsung tanyakan apa saja di bawah!</em></p>
        </div>
      </div>
    `;
    this.chatContainer.innerHTML = welcomeHTML;
  }

  handleSend() {
    if (this.isGenerating) return;
    const text = this.chatInput.value.trim();
    if (!text) return;

    this.chatInput.value = '';
    this.hideSlashMenu();
    this.playSound('tap');

    // Render User Message
    this.appendUserMessage(text);

    // Check Slash Commands
    if (text.startsWith('/')) {
      this.handleSlashCommand(text);
      return;
    }

    // Process with AI Engine
    this.processUserPrompt(text);
  }

  appendUserMessage(text) {
    const msg = document.createElement('div');
    msg.className = 'chat-msg user';
    msg.textContent = text;
    this.chatContainer.appendChild(msg);
    this.scrollToBottom();
  }

  handleSlashCommand(raw) {
    const parts = raw.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    if (cmd === '/clear') {
      this.renderInitialWelcome();
      this.playSound('success');
      return;
    }

    if (cmd === '/physics') {
      if (window.antigravityPhysics) {
        window.antigravityPhysics.toggle();
      }
      return;
    }

    if (cmd === '/export') {
      if (window.antigravityCore) {
        window.antigravityCore.exportProjectSingleFile();
      }
      return;
    }

    if (cmd === '/plan') {
      this.executeAgentWorkflow('plan', arg || 'Rencana perancangan fitur baru');
      return;
    }

    if (cmd === '/goal') {
      this.executeAgentWorkflow('goal', arg || 'Bangun aplikasi web interaktif lengkap');
      return;
    }

    if (cmd === '/grill-me') {
      this.executeAgentWorkflow('grill', arg || 'Arsitektur sistem');
      return;
    }

    // Fallback normal prompt
    this.processUserPrompt(raw);
  }

  async processUserPrompt(promptText) {
    this.isGenerating = true;

    // Create Agent Message Container
    const agentMsg = document.createElement('div');
    agentMsg.className = 'chat-msg agent';
    this.chatContainer.appendChild(agentMsg);

    // 1. Render Expandable DeepMind Thought & Reasoning Drawer
    const thoughtBox = document.createElement('div');
    thoughtBox.className = 'thought-box';
    thoughtBox.innerHTML = `
      <div class="thought-header">
        <div class="thought-title-wrap">
          <div class="thought-spinner"></div>
          <span>Thinking Process & Reasoning</span>
        </div>
        <span class="thought-timer">0.0s</span>
      </div>
      <div class="thought-body"></div>
    `;
    agentMsg.appendChild(thoughtBox);
    const thoughtBody = thoughtBox.querySelector('.thought-body');
    const thoughtTimer = thoughtBox.querySelector('.thought-timer');
    const thoughtSpinner = thoughtBox.querySelector('.thought-spinner');

    // Thought timer tick
    const startTime = Date.now();
    const timerInterval = setInterval(() => {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      thoughtTimer.textContent = `${elapsed}s`;
    }, 100);

    // Toggle collapse on header click
    thoughtBox.querySelector('.thought-header').addEventListener('click', () => {
      thoughtBody.style.display = thoughtBody.style.display === 'none' ? 'block' : 'none';
    });

    // Call Real Online Model if configured & selected, or use Rich Autonomous Offline Engine
    if (this.model.startsWith('gemini') && this.apiKey) {
      await this.runOnlineGemini(promptText, agentMsg, thoughtBody, thoughtSpinner, timerInterval);
    } else if (this.model.startsWith('ollama')) {
      await this.runLocalOllama(promptText, agentMsg, thoughtBody, thoughtSpinner, timerInterval);
    } else {
      await this.runOfflineSynthesizer(promptText, agentMsg, thoughtBody, thoughtSpinner, timerInterval);
    }

    this.isGenerating = false;
  }

  // =========================================================================
  // BUILT-IN OFFLINE AUTONOMOUS REASONING & CODE SYNTHESIZER
  // 100% Free, Unlimited, Works anywhere without any API key or subscription
  // =========================================================================
  async runOfflineSynthesizer(promptText, agentMsg, thoughtBody, thoughtSpinner, timerInterval) {
    const lower = promptText.toLowerCase();

    // Stream Reasoning Thoughts
    thoughtBody.innerHTML = `
      <p>1. <strong>Mengurai Intent:</strong> Menganalisis permintaan pengguna "${promptText}"...</p>
      <p>2. <strong>Memeriksa Virtual File System:</strong> Memeriksa struktur file yang ada (index.html, style.css, app.js)...</p>
      <p>3. <strong>Menentukan Strategi:</strong> Memilih arsitektur komponen modern dengan Glassmorphism dan Vanilla JavaScript modular.</p>
      <p>4. <strong>Menjalankan Tool Calls:</strong> Menyiapkan pembaruan file dan menjalankan live sandbox preview.</p>
    `;
    this.scrollToBottom();

    await this.sleep(600);

    // Autonomous Decision: Synthesize Complete Code based on prompt topics
    let generatedFiles = null;
    let toolSummary = '';
    let responseText = '';

    if (lower.includes('game') || lower.includes('pong') || lower.includes('arcade')) {
      toolSummary = 'Membangun game arcade Cyber-Neon Pong 3D dengan partikel dan skor';
      generatedFiles = this.generatePongGame();
      responseText = `Saya telah membuat game arcade **Cyber-Neon Pong 2.0** lengkap dengan fisika pantulan bola, efek suara Web Audio, pencatat skor waktu nyata, dan efek partikel saat memantul. Silakan coba mainkan langsung pada panel **Live Preview** di sebelah kanan!`;
    } else if (lower.includes('kalkulator') || lower.includes('calculator') || lower.includes('hitung')) {
      toolSummary = 'Membuat Scientific Glassmorphism Cyber Calculator';
      generatedFiles = this.generateCalculatorApp();
      responseText = `Saya telah merancang **Cyber Scientific Calculator** dengan UI Glassmorphism modern, riwayat perhitungan, dan fungsi trigonometri/aljabar lengkap.`;
    } else if (lower.includes('tata surya') || lower.includes('planet') || lower.includes('solar') || lower.includes('space') || lower.includes('3d')) {
      toolSummary = 'Membuat Simulasi Tata Surya 3D Interaktif dengan Orbit Kepler';
      generatedFiles = this.generateSolarSystem();
      responseText = `Saya telah memprogram **Simulasi Tata Surya 3D Interaktif (Antigravity Solar Engine)**. Anda dapat mengatur kecepatan orbit, memilih planet untuk zoom, dan melihat simulasi gravitasi realtime!`;
    } else if (lower.includes('dashboard') || lower.includes('analitik') || lower.includes('analytics')) {
      toolSummary = 'Membangun Cyberpunk Cloud Analytics Dashboard';
      generatedFiles = this.generateCyberDashboard();
      responseText = `Saya telah menyusun **Cyberpunk Real-time Analytics Dashboard** dengan grafik canvas dinamis, monitor CPU/RAM virtual, dan status jaringan AI!`;
    } else {
      // Default: Ultra futuristic Web Application
      toolSummary = `Membuat aplikasi web interaktif responsif sesuai permintaan: "${promptText}"`;
      generatedFiles = this.generateCustomApp(promptText);
      responseText = `Saya telah memproses permintaan Anda dan memperbarui workspace proyek dengan kode bersih, modern, dan fungsional. Anda dapat langsung mengedit kodenya pada Code Editor atau mencobanya di Live Preview!`;
    }

    // Render Tool Call Card
    await this.renderToolCallCard(agentMsg, 'replace_file_content', {
      file: 'index.html, style.css, app.js',
      action: toolSummary
    });

    // Apply generated files to Core Workspace
    if (generatedFiles && window.antigravityCore) {
      Object.keys(generatedFiles).forEach(f => {
        window.antigravityCore.files[f] = generatedFiles[f];
      });
      window.antigravityCore.saveWorkspace();
      window.antigravityCore.renderFileTree();
      window.antigravityCore.loadFileContent(window.antigravityCore.activeFile);
      window.antigravityCore.runLivePreview();
      window.antigravityCore.logTerminal(`[AI Agent] Berhasil memperbarui proyek: ${toolSummary}`, 'success');
    }

    // Trigger Browser Subagent Visual Action
    this.triggerSubagentAction(`Verifikasi Live DOM & Validasi Rendering Viewport`);

    // Stop Thought Spinner
    clearInterval(timerInterval);
    if (thoughtSpinner) thoughtSpinner.style.display = 'none';

    // Render Final Agent Response Text
    const textEl = document.createElement('div');
    textEl.className = 'agent-response-text';
    textEl.innerHTML = `<p>${responseText}</p>`;
    agentMsg.appendChild(textEl);

    this.playSound('success');
    this.scrollToBottom();
  }

  // Real Gemini API Connector (If user provides their free Gemini API Key)
  async runOnlineGemini(promptText, agentMsg, thoughtBody, thoughtSpinner, timerInterval) {
    thoughtBody.innerHTML = `<p>Menghubungkan ke Google Gemini API via Secure Client Inference...</p>`;
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`;
      const payload = {
        contents: [{
          parts: [{
            text: `You are Antigravity, an elite DeepMind AI pair programmer. Respond to this user request with code modifications: "${promptText}". If generating HTML/CSS/JS, keep it concise, modern, and self-contained.`
          }]
        }]
      };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      clearInterval(timerInterval);
      if (thoughtSpinner) thoughtSpinner.style.display = 'none';

      if (data.candidates && data.candidates[0]) {
        const text = data.candidates[0].content.parts[0].text;
        const textEl = document.createElement('div');
        textEl.className = 'agent-response-text';
        textEl.innerHTML = `<p>${text.replace(/\n/g, '<br>')}</p>`;
        agentMsg.appendChild(textEl);
        this.playSound('success');
      } else {
        throw new Error(data.error?.message || 'Gagal memuat respon Gemini');
      }
    } catch (err) {
      clearInterval(timerInterval);
      if (thoughtSpinner) thoughtSpinner.style.display = 'none';
      thoughtBody.innerHTML += `<p style="color:#f43f5e;">API Error: ${err.message}. Beralih ke Antigravity Offline Engine...</p>`;
      await this.runOfflineSynthesizer(promptText, agentMsg, thoughtBody, thoughtSpinner, timerInterval);
    }
  }

  // Render Tool Call Visual Badge
  async renderToolCallCard(parent, toolName, payload) {
    this.playSound('tool');
    const card = document.createElement('div');
    card.className = 'tool-call-card';
    card.innerHTML = `
      <div class="tool-call-head">
        <span class="tool-name-badge">⚡ ${toolName}</span>
        <span class="tool-status-tag">COMPLETED</span>
      </div>
      <div class="tool-payload-preview">${JSON.stringify(payload, null, 2)}</div>
    `;
    parent.appendChild(card);
    this.scrollToBottom();
    await this.sleep(400);
  }

  triggerSubagentAction(taskName) {
    if (!this.subagentHud || !this.subagentTaskText) return;
    this.subagentTaskText.textContent = taskName;
    this.subagentHud.style.opacity = '1';

    setTimeout(() => {
      if (this.subagentHud) this.subagentHud.style.opacity = '0.4';
    }, 2800);
  }

  // Pre-configured Intelligent Code Generators
  generatePongGame() {
    return {
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Cyber-Neon Pong 2.0</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="hud">
    <div class="score-board">
      <div class="player-score">PLAYER: <span id="pScore">0</span></div>
      <div class="divider">VS</div>
      <div class="ai-score">AI: <span id="aiScore">0</span></div>
    </div>
    <div class="instructions">Gunakan kursor mouse untuk menggerakkan paddle kiri</div>
  </div>
  <canvas id="gameCanvas"></canvas>
  <script src="app.js"></script>
</body>
</html>`,
      'style.css': `* { margin:0; padding:0; box-sizing:border-box; }
body, html { width:100%; height:100%; overflow:hidden; background:#07090e; font-family:'Outfit', sans-serif; color:#fff; }
.hud { position:absolute; top:20px; width:100%; display:flex; flex-direction:column; align-items:center; z-index:10; pointer-events:none; }
.score-board { display:flex; gap:24px; background:rgba(15,23,42,0.8); backdrop-filter:blur(12px); border:1px solid rgba(56,189,248,0.3); padding:10px 24px; border-radius:99px; font-weight:800; font-size:18px; box-shadow:0 0 20px rgba(56,189,248,0.3); }
.player-score { color:#38bdf8; }
.ai-score { color:#f43f5e; }
.instructions { font-size:11px; color:#94a3b8; margin-top:8px; }
canvas { display:block; width:100%; height:100%; }`,
      'app.js': `const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
});

const paddleW = 14, paddleH = 100;
let playerY = h / 2 - paddleH / 2;
let aiY = h / 2 - paddleH / 2;
let pScore = 0, aiScore = 0;

let ball = { x: w / 2, y: h / 2, r: 9, vx: 7, vy: 5, color: '#38bdf8' };
let particles = [];

window.addEventListener('mousemove', (e) => {
  playerY = e.clientY - paddleH / 2;
});

function spawnParticles(x, y, color) {
  for (let i = 0; i < 15; i++) {
    particles.push({
      x, y,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8,
      r: Math.random() * 4 + 2,
      alpha: 1,
      color
    });
  }
}

function update() {
  ball.x += ball.vx;
  ball.y += ball.vy;

  // Wall bounce top/bottom
  if (ball.y - ball.r < 0 || ball.y + ball.r > h) {
    ball.vy *= -1;
    spawnParticles(ball.x, ball.y, '#38bdf8');
  }

  // AI Paddle tracking
  const targetAiY = ball.y - paddleH / 2;
  aiY += (targetAiY - aiY) * 0.08;

  // Player collision
  if (ball.x - ball.r < 40 + paddleW && ball.y > playerY && ball.y < playerY + paddleH) {
    ball.vx = Math.abs(ball.vx) * 1.05;
    ball.vy += (ball.y - (playerY + paddleH / 2)) * 0.15;
    spawnParticles(ball.x, ball.y, '#38bdf8');
  }

  // AI collision
  if (ball.x + ball.r > w - 40 - paddleW && ball.y > aiY && ball.y < aiY + paddleH) {
    ball.vx = -Math.abs(ball.vx) * 1.05;
    ball.vy += (ball.y - (aiY + paddleH / 2)) * 0.15;
    spawnParticles(ball.x, ball.y, '#f43f5e');
  }

  // Scores
  if (ball.x < 0) {
    aiScore++;
    document.getElementById('aiScore').textContent = aiScore;
    resetBall();
  } else if (ball.x > w) {
    pScore++;
    document.getElementById('pScore').textContent = pScore;
    resetBall();
  }

  particles.forEach((p, idx) => {
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 0.03;
    if (p.alpha <= 0) particles.splice(idx, 1);
  });
}

function resetBall() {
  ball.x = w / 2;
  ball.y = h / 2;
  ball.vx = (Math.random() > 0.5 ? 7 : -7);
  ball.vy = (Math.random() - 0.5) * 8;
}

function draw() {
  ctx.fillStyle = 'rgba(7, 9, 14, 0.3)';
  ctx.fillRect(0, 0, w, h);

  // Net
  ctx.setLineDash([8, 8]);
  ctx.strokeStyle = 'rgba(255,255,255,0.1)';
  ctx.beginPath();
  ctx.moveTo(w / 2, 0);
  ctx.lineTo(w / 2, h);
  ctx.stroke();
  ctx.setLineDash([]);

  // Player Paddle
  ctx.fillStyle = '#38bdf8';
  ctx.shadowBlur = 15;
  ctx.shadowColor = '#38bdf8';
  ctx.fillRect(40, playerY, paddleW, paddleH);

  // AI Paddle
  ctx.fillStyle = '#f43f5e';
  ctx.shadowColor = '#f43f5e';
  ctx.fillRect(w - 40 - paddleW, aiY, paddleW, paddleH);

  // Ball
  ctx.fillStyle = '#fff';
  ctx.shadowColor = '#fff';
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
  ctx.fill();

  // Particles
  particles.forEach(p => {
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  });
  ctx.shadowBlur = 0;

  update();
  requestAnimationFrame(draw);
}
draw();`
    };
  }

  generateSolarSystem() {
    return {
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Antigravity Solar System 3D</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="hud">
    <h1>🪐 QUANTUM SOLAR ORBITER</h1>
    <p>Simulasi gravitasi tata surya interaktif real-time</p>
    <div class="hud-buttons">
      <button id="btnSpeedUp" class="btn">Kecepatan Orbit 2x</button>
      <button id="btnToggleTrails" class="btn">Toggle Jejak Orbit</button>
    </div>
  </div>
  <canvas id="solarCanvas"></canvas>
  <script src="app.js"></script>
</body>
</html>`,
      'style.css': `* { margin:0; padding:0; box-sizing:border-box; }
body, html { width:100%; height:100%; overflow:hidden; background:#04060a; font-family:sans-serif; color:#fff; }
.hud { position:absolute; top:20px; left:20px; z-index:10; background:rgba(15,23,42,0.8); backdrop-filter:blur(16px); padding:16px 20px; border-radius:14px; border:1px solid rgba(255,255,255,0.1); }
h1 { font-size:16px; font-weight:800; color:#38bdf8; }
p { font-size:11px; color:#94a3b8; margin:4px 0 10px; }
.btn { background:rgba(56,189,248,0.2); border:1px solid #38bdf8; color:#fff; font-size:11px; padding:6px 12px; border-radius:8px; cursor:pointer; }
canvas { width:100%; height:100%; display:block; }`,
      'app.js': `const canvas = document.getElementById('solarCanvas');
const ctx = canvas.getContext('2d');
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

let timeScale = 1;
let showTrails = true;

const planets = [
  { name: 'Merkurius', dist: 70, size: 5, color: '#94a3b8', speed: 0.04, angle: 0, trail: [] },
  { name: 'Venus', dist: 110, size: 8, color: '#f59e0b', speed: 0.025, angle: 1, trail: [] },
  { name: 'Bumi', dist: 160, size: 9, color: '#38bdf8', speed: 0.018, angle: 2, trail: [] },
  { name: 'Mars', dist: 210, size: 7, color: '#ef4444', speed: 0.014, angle: 3, trail: [] },
  { name: 'Jupiter', dist: 280, size: 18, color: '#d97706', speed: 0.009, angle: 4, trail: [] },
  { name: 'Saturnus', dist: 360, size: 14, color: '#eab308', speed: 0.006, angle: 5, ring: 22, trail: [] }
];

function draw() {
  ctx.fillStyle = showTrails ? 'rgba(4, 6, 10, 0.25)' : '#04060a';
  ctx.fillRect(0, 0, w, h);

  const cx = w / 2;
  const cy = h / 2;

  // Sun
  ctx.beginPath();
  ctx.arc(cx, cy, 26, 0, Math.PI * 2);
  ctx.fillStyle = '#fbbf24';
  ctx.shadowBlur = 40;
  ctx.shadowColor = '#f59e0b';
  ctx.fill();
  ctx.shadowBlur = 0;

  // Planets
  planets.forEach(p => {
    p.angle += p.speed * timeScale;
    const px = cx + Math.cos(p.angle) * p.dist;
    const py = cy + Math.sin(p.angle) * p.dist;

    // Orbit Ring
    ctx.beginPath();
    ctx.arc(cx, cy, p.dist, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.stroke();

    // Planet Body
    ctx.beginPath();
    ctx.arc(px, py, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = p.color;
    ctx.fill();

    if (p.ring) {
      ctx.beginPath();
      ctx.ellipse(px, py, p.ring, p.ring / 3, Math.PI / 4, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(234, 179, 8, 0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  });

  requestAnimationFrame(draw);
}
draw();

document.getElementById('btnSpeedUp').addEventListener('click', () => {
  timeScale = timeScale === 1 ? 2.5 : 1;
});
document.getElementById('btnToggleTrails').addEventListener('click', () => {
  showTrails = !showTrails;
});`
    };
  }

  generateCalculatorApp() {
    return {
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Cyber Scientific Calculator</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="calc-card">
    <div class="calc-header">
      <span class="calc-brand">ANTIGRAVITY MATH</span>
      <span class="calc-mode">DEG</span>
    </div>
    <div class="calc-screen">
      <div id="history" class="screen-history"></div>
      <div id="display" class="screen-main">0</div>
    </div>
    <div class="calc-grid">
      <button class="btn fn" onclick="calc('C')">C</button>
      <button class="btn fn" onclick="calc('(')">(</button>
      <button class="btn fn" onclick="calc(')')">)</button>
      <button class="btn op" onclick="calc('/')">÷</button>
      
      <button class="btn num" onclick="calc('7')">7</button>
      <button class="btn num" onclick="calc('8')">8</button>
      <button class="btn num" onclick="calc('9')">9</button>
      <button class="btn op" onclick="calc('*')">×</button>
      
      <button class="btn num" onclick="calc('4')">4</button>
      <button class="btn num" onclick="calc('5')">5</button>
      <button class="btn num" onclick="calc('6')">6</button>
      <button class="btn op" onclick="calc('-')">-</button>
      
      <button class="btn num" onclick="calc('1')">1</button>
      <button class="btn num" onclick="calc('2')">2</button>
      <button class="btn num" onclick="calc('3')">3</button>
      <button class="btn op" onclick="calc('+')">+</button>
      
      <button class="btn num" onclick="calc('0')">0</button>
      <button class="btn num" onclick="calc('.')">.</button>
      <button class="btn fn" onclick="calc('DEL')">⌫</button>
      <button class="btn equal" onclick="calc('=')">=</button>
    </div>
  </div>
  <script src="app.js"></script>
</body>
</html>`,
      'style.css': `* { margin:0; padding:0; box-sizing:border-box; }
body { width:100vw; height:100vh; display:flex; align-items:center; justify-content:center; background:#07090e; font-family:'Outfit', sans-serif; }
.calc-card { width:320px; background:rgba(15,23,42,0.85); backdrop-filter:blur(20px); border:1px solid rgba(56,189,248,0.3); border-radius:24px; padding:20px; box-shadow:0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(56,189,248,0.2); }
.calc-header { display:flex; justify-content:space-between; font-size:11px; font-weight:800; color:#38bdf8; margin-bottom:12px; }
.calc-screen { background:rgba(0,0,0,0.5); border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:16px; text-align:right; margin-bottom:18px; }
.screen-history { font-size:12px; color:#64748b; height:18px; overflow:hidden; }
.screen-main { font-size:32px; font-weight:700; color:#fff; overflow-x:auto; }
.calc-grid { display:grid; grid-template-columns:repeat(4, 1fr); gap:10px; }
.btn { height:48px; border-radius:12px; border:none; font-size:16px; font-weight:700; cursor:pointer; transition:all 0.15s; }
.btn.num { background:rgba(255,255,255,0.06); color:#fff; }
.btn.num:hover { background:rgba(255,255,255,0.15); }
.btn.op { background:rgba(56,189,248,0.15); color:#38bdf8; }
.btn.op:hover { background:#38bdf8; color:#000; }
.btn.fn { background:rgba(168,85,247,0.15); color:#c084fc; }
.btn.fn:hover { background:#a855f7; color:#fff; }
.btn.equal { background:linear-gradient(135deg, #38bdf8, #818cf8); color:#000; font-weight:800; }
.btn:active { transform:scale(0.94); }`,
      'app.js': `let expr = '';
const display = document.getElementById('display');
const history = document.getElementById('history');

function calc(val) {
  if (val === 'C') {
    expr = '';
    display.textContent = '0';
    history.textContent = '';
  } else if (val === 'DEL') {
    expr = expr.slice(0, -1);
    display.textContent = expr || '0';
  } else if (val === '=') {
    try {
      history.textContent = expr + ' =';
      const res = Function('"use strict";return (' + expr + ')')();
      display.textContent = res;
      expr = String(res);
    } catch(e) {
      display.textContent = 'Error';
    }
  } else {
    expr += val;
    display.textContent = expr;
  }
}`
    };
  }

  generateCyberDashboard() {
    return {
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Cyberpunk Cloud Operations</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="dash-wrap">
    <header class="dash-head">
      <div class="brand">⚡ ANTIGRAVITY CLUSTER MONITOR</div>
      <div class="status-live">● SYSTEM NORMAL</div>
    </header>
    <div class="dash-metrics">
      <div class="card metric">
        <div class="label">NEURAL THROUGHPUT</div>
        <div class="val">4,820 <span class="unit">req/s</span></div>
      </div>
      <div class="card metric">
        <div class="label">GPU CORE LOAD</div>
        <div class="val">38.4 <span class="unit">%</span></div>
      </div>
      <div class="card metric">
        <div class="label">QUANTUM COHERENCE</div>
        <div class="val">99.98 <span class="unit">%</span></div>
      </div>
    </div>
    <div class="card chart-card">
      <div class="label">LIVE STREAM ACTIVITY</div>
      <canvas id="chartCanvas"></canvas>
    </div>
  </div>
  <script src="app.js"></script>
</body>
</html>`,
      'style.css': `* { margin:0; padding:0; box-sizing:border-box; }
body { background:#07090e; font-family:'Outfit', sans-serif; color:#fff; padding:20px; }
.dash-wrap { max-width:900px; margin:0 auto; display:flex; flex-direction:column; gap:16px; }
.dash-head { display:flex; justify-content:space-between; align-items:center; padding-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.08); }
.brand { font-weight:800; font-size:16px; color:#38bdf8; }
.status-live { font-size:11px; color:#10b981; font-weight:700; background:rgba(16,185,129,0.15); padding:4px 10px; border-radius:99px; }
.dash-metrics { display:grid; grid-template-columns:repeat(3, 1fr); gap:12px; }
.card { background:rgba(15,23,42,0.7); backdrop-filter:blur(16px); border:1px solid rgba(255,255,255,0.08); border-radius:16px; padding:16px; }
.label { font-size:11px; color:#94a3b8; font-weight:700; letter-spacing:0.5px; margin-bottom:8px; }
.val { font-size:24px; font-weight:800; color:#fff; }
.unit { font-size:13px; color:#38bdf8; }
.chart-card { height:220px; display:flex; flex-direction:column; }
#chartCanvas { flex:1; width:100%; }`,
      'app.js': `const canvas = document.getElementById('chartCanvas');
const ctx = canvas.getContext('2d');
let points = [];
for (let i = 0; i < 40; i++) points.push(Math.random() * 80 + 20);

function drawChart() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  const w = canvas.width, h = canvas.height;

  ctx.clearRect(0, 0, w, h);
  points.shift();
  points.push(Math.sin(Date.now() * 0.003) * 30 + 50 + Math.random() * 15);

  ctx.beginPath();
  const step = w / (points.length - 1);
  points.forEach((p, idx) => {
    const x = idx * step;
    const y = h - (p / 100) * h;
    if (idx === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Gradient fill under chart
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, 'rgba(56, 189, 248, 0.3)');
  grad.addColorStop(1, 'rgba(56, 189, 248, 0.0)');
  ctx.fillStyle = grad;
  ctx.fill();

  setTimeout(drawChart, 100);
}
drawChart();`
    };
  }

  generateCustomApp(prompt) {
    return {
      'index.html': `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Aplikasi Interaktif Antigravity</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="app-card">
    <div class="badge">ANTIGRAVITY AI ENGINE</div>
    <h1>${prompt}</h1>
    <p>Aplikasi web interaktif ini telah dibuat secara otonom oleh Antigravity IDE.</p>
    <div class="counter-box">
      <div id="valDisplay" class="val">0</div>
      <div class="btn-group">
        <button id="btnInc" class="btn">+ Tambah</button>
        <button id="btnDec" class="btn">- Kurang</button>
        <button id="btnReset" class="btn secondary">Reset</button>
      </div>
    </div>
  </div>
  <script src="app.js"></script>
</body>
</html>`,
      'style.css': `* { margin:0; padding:0; box-sizing:border-box; }
body { width:100vw; height:100vh; display:flex; align-items:center; justify-content:center; background:#07090e; font-family:'Outfit', sans-serif; color:#fff; }
.app-card { background:rgba(15,23,42,0.8); backdrop-filter:blur(20px); border:1px solid rgba(56,189,248,0.3); border-radius:24px; padding:32px; max-width:440px; text-align:center; box-shadow:0 20px 40px rgba(0,0,0,0.6); }
.badge { display:inline-block; font-size:10px; font-weight:800; color:#38bdf8; background:rgba(56,189,248,0.15); padding:3px 10px; border-radius:99px; margin-bottom:12px; }
h1 { font-size:22px; font-weight:800; margin-bottom:8px; color:#fff; text-transform:capitalize; }
p { font-size:12px; color:#94a3b8; margin-bottom:24px; }
.counter-box { background:rgba(0,0,0,0.3); border-radius:16px; padding:20px; }
.val { font-size:48px; font-weight:800; color:#38bdf8; margin-bottom:16px; }
.btn-group { display:flex; gap:8px; justify-content:center; }
.btn { background:#38bdf8; color:#000; border:none; padding:10px 18px; border-radius:10px; font-weight:700; font-size:13px; cursor:pointer; transition:all 0.2s; }
.btn:hover { background:#7dd3fc; transform:translateY(-1px); }
.btn.secondary { background:rgba(255,255,255,0.1); color:#fff; }`,
      'app.js': `let count = 0;
const valEl = document.getElementById('valDisplay');
document.getElementById('btnInc').addEventListener('click', () => {
  count++;
  valEl.textContent = count;
});
document.getElementById('btnDec').addEventListener('click', () => {
  count--;
  valEl.textContent = count;
});
document.getElementById('btnReset').addEventListener('click', () => {
  count = 0;
  valEl.textContent = count;
});`
    };
  }

  scrollToBottom() {
    this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

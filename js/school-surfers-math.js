/**
 * SCHOOL SURFERS 3D - MATH JETPACK ENGINE & WEB AUDIO SYNTHESIZER
 * Generates 10 Rapid-fire Math Questions, Handles Answer Validation,
 * Jetpack Flight Sequences, and Full Procedural Web Audio FX.
 */

class SchoolSurfersMath {
  constructor() {
    this.totalQuestions = 10;
    this.currentQuestionIndex = 0;
    this.currentQuestion = null;
    this.timerDuration = 6.0; // 6 seconds per question
    this.timeLeft = 6.0;
    this.timerInterval = null;
    this.onCompleteCallback = null;
    this.onGameOverCallback = null;

    this.initAudio();
  }

  // Web Audio Procedural Synthesizer
  initAudio() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioCtx();
    } catch (e) {
      console.warn('Web Audio not supported');
    }
  }

  ensureAudio() {
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playCoinSound() {
    if (!this.audioCtx) return;
    this.ensureAudio();
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.frequency.setValueAtTime(987.77, now); // B5
    osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  playJumpSound() {
    if (!this.audioCtx) return;
    this.ensureAudio();
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.frequency.setValueAtTime(240, now);
    osc.frequency.exponentialRampToValueAtTime(620, now + 0.15);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.18);
  }

  playSlideSound() {
    if (!this.audioCtx) return;
    this.ensureAudio();
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.2);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  }

  playJetpackLaunch() {
    if (!this.audioCtx) return;
    this.ensureAudio();
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.6);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.8);
  }

  playCorrectSound() {
    if (!this.audioCtx) return;
    this.ensureAudio();
    const now = this.audioCtx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const t = now + idx * 0.08;
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(t);
      osc.stop(t + 0.25);
    });
  }

  playWrongSound() {
    if (!this.audioCtx) return;
    this.ensureAudio();
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.setValueAtTime(140, now + 0.15);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.45);
  }

  // Generate 10 Math Questions dynamically
  generateQuestions() {
    const list = [];
    for (let i = 1; i <= 10; i++) {
      let qText = '';
      let correct = 0;

      if (i <= 3) {
        // Simple Addition & Subtraction (e.g. 12 + 15, 34 - 16)
        const a = Math.floor(Math.random() * 20) + 5;
        const b = Math.floor(Math.random() * 15) + 3;
        const isAdd = Math.random() > 0.4;
        if (isAdd) {
          qText = `${a} + ${b} = ?`;
          correct = a + b;
        } else {
          qText = `${a + b} - ${a} = ?`;
          correct = b;
        }
      } else if (i <= 7) {
        // Multiplication & Division (e.g. 6 × 7, 48 ÷ 6)
        const a = Math.floor(Math.random() * 8) + 3;
        const b = Math.floor(Math.random() * 9) + 2;
        const isMult = Math.random() > 0.4;
        if (isMult) {
          qText = `${a} × ${b} = ?`;
          correct = a * b;
        } else {
          qText = `${a * b} ÷ ${a} = ?`;
          correct = b;
        }
      } else {
        // Mixed Operations (e.g. 5 × 6 + 10, 8 × 7 - 12)
        const a = Math.floor(Math.random() * 6) + 3;
        const b = Math.floor(Math.random() * 6) + 2;
        const c = Math.floor(Math.random() * 15) + 5;
        const isPlus = Math.random() > 0.5;
        if (isPlus) {
          qText = `${a} × ${b} + ${c} = ?`;
          correct = (a * b) + c;
        } else {
          qText = `${a * b + c} - ${c} = ?`;
          correct = a * b;
        }
      }

      // Generate 2 wrong distractors
      const dist1 = correct + (Math.random() > 0.5 ? (Math.floor(Math.random() * 5) + 1) : -(Math.floor(Math.random() * 4) + 1));
      let dist2 = correct + (Math.random() > 0.5 ? (Math.floor(Math.random() * 6) + 6) : -(Math.floor(Math.random() * 5) + 4));
      if (dist2 === dist1) dist2 = correct + 3;

      const options = [correct, dist1, dist2].sort(() => Math.random() - 0.5);

      list.push({
        num: i,
        prompt: qText,
        correctAnswer: correct,
        options: options,
        correctLane: options.indexOf(correct) // 0 = Left, 1 = Center, 2 = Right
      });
    }

    return list;
  }

  startJetpackChallenge(onComplete, onGameOver) {
    this.questions = this.generateQuestions();
    this.currentQuestionIndex = 0;
    this.onCompleteCallback = onComplete;
    this.onGameOverCallback = onGameOver;

    this.playJetpackLaunch();
    this.showNextQuestion();
  }

  showNextQuestion() {
    if (this.currentQuestionIndex >= 10) {
      // Completed all 10 questions!
      clearInterval(this.timerInterval);
      this.playCorrectSound();
      if (this.onCompleteCallback) this.onCompleteCallback();
      return;
    }

    this.currentQuestion = this.questions[this.currentQuestionIndex];
    this.timeLeft = this.timerDuration;

    // Update DOM elements
    const overlay = document.getElementById('mathJetpackOverlay');
    const qCountEl = document.getElementById('mathQuestionCount');
    const promptEl = document.getElementById('mathQuestionPrompt');
    const timerFill = document.getElementById('mathTimerFill');
    const optionsGrid = document.getElementById('mathOptionsGrid');

    if (overlay) overlay.style.display = 'flex';
    if (qCountEl) qCountEl.textContent = `SOAL ${this.currentQuestion.num} / 10`;
    if (promptEl) promptEl.textContent = this.currentQuestion.prompt;

    // Render 3 Option Buttons (mapped to 3 lanes)
    if (optionsGrid) {
      optionsGrid.innerHTML = '';
      const laneLabels = ['JALUR KIRI (1)', 'JALUR TENGAH (2)', 'JALUR KANAN (3)'];

      this.currentQuestion.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'math-option-btn';
        btn.innerHTML = `
          <span>${opt}</span>
          <span class="lane-hint">${laneLabels[idx]}</span>
        `;
        btn.addEventListener('click', () => {
          this.submitAnswer(opt, btn);
        });
        optionsGrid.appendChild(btn);
      });
    }

    // Timer Interval
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timeLeft -= 0.1;
      const pct = Math.max(0, (this.timeLeft / this.timerDuration) * 100);
      if (timerFill) timerFill.style.width = `${pct}%`;

      if (this.timeLeft <= 0) {
        clearInterval(this.timerInterval);
        this.handleTimeout();
      }
    }, 100);
  }

  submitAnswer(chosenValue, btnElement) {
    clearInterval(this.timerInterval);

    if (chosenValue === this.currentQuestion.correctAnswer) {
      // Correct!
      this.playCorrectSound();
      if (btnElement) btnElement.classList.add('correct');

      setTimeout(() => {
        this.currentQuestionIndex++;
        this.showNextQuestion();
      }, 450);
    } else {
      // Wrong! Game Over!
      this.playWrongSound();
      if (btnElement) btnElement.classList.add('wrong');

      setTimeout(() => {
        const overlay = document.getElementById('mathJetpackOverlay');
        if (overlay) overlay.style.display = 'none';
        if (this.onGameOverCallback) {
          this.onGameOverCallback(`Salah menjawab kuis matematika (${this.currentQuestion.prompt} = ${this.currentQuestion.correctAnswer})! Cikgu Besar memberi sanksi akademik!`);
        }
      }, 600);
    }
  }

  handleTimeout() {
    this.playWrongSound();
    const overlay = document.getElementById('mathJetpackOverlay');
    if (overlay) overlay.style.display = 'none';
    if (this.onGameOverCallback) {
      this.onGameOverCallback(`Waktu menjawab soal ${this.currentQuestion.num} habis! Cikgu Besar berhasil menangkapmu!`);
    }
  }
}

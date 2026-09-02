/**
 * GAME DETEKTIF KRIMINAL - MASTER GAME ENGINE & FLOW CONTROLLER
 * Manages 15 Cases, Step-by-Step Dossier Navigation, 15-Minute Nanosecond Timer,
 * 3-Minute Typing Countdown, AI Evaluation Modal, and Web Audio SFX.
 */

class DetectiveGame {
  constructor() {
    this.storageKey = 'detective_cases_progress_v1';
    this.loadProgress();

    this.cases = DetectiveCasesData;
    this.activeCase = null;
    this.currentStep = 0; // 0 = Chronology, 1 = Suspect 1, 2 = Suspect 2, 3 = Suspect 3

    // Timers
    this.thinkingTotalMs = 15 * 60 * 1000; // 15 Minutes
    this.thinkingRemainingMs = this.thinkingTotalMs;
    this.thinkingStartPerf = null;
    this.thinkingAnimId = null;

    this.typingTotalSec = 3 * 60; // 3 Minutes
    this.typingRemainingSec = this.typingTotalSec;
    this.typingInterval = null;

    this.aiEngine = new DetectiveAIEngine();
    this.initAudio();
    this.initDOM();
    this.renderCasesGrid();
    this.updateBureauStats();
  }

  // Persistent Progress (Solved cases & scores)
  loadProgress() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      try {
        this.progress = JSON.parse(saved);
      } catch (e) {
        this.progress = {};
      }
    } else {
      this.progress = {};
    }
  }

  saveProgress(caseId, score, grade) {
    this.progress[caseId] = {
      solved: true,
      score: score,
      grade: grade,
      date: new Date().toLocaleDateString()
    };
    localStorage.setItem(this.storageKey, JSON.stringify(this.progress));
    this.renderCasesGrid();
    this.updateBureauStats();
  }

  updateBureauStats() {
    const total = this.cases.length;
    const solvedCount = Object.keys(this.progress).length;
    const counterEl = document.getElementById('bureauSolvedCounter');
    if (counterEl) counterEl.textContent = `Arsip Terpecahkan: ${solvedCount} / ${total}`;
  }

  // Web Audio Sound Synthesizer
  initAudio() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioCtx();
    } catch (e) {
      console.warn('Web Audio not available');
    }
  }

  ensureAudio() {
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playTypewriterClick() {
    if (!this.audioCtx) return;
    this.ensureAudio();
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(800 + Math.random() * 400, now);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.04);
  }

  playGavelSound() {
    if (!this.audioCtx) return;
    this.ensureAudio();
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.35);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.4);
  }

  playMysteryChime() {
    if (!this.audioCtx) return;
    this.ensureAudio();
    const now = this.audioCtx.currentTime;
    const notes = [293.66, 349.23, 440.00, 523.25]; // D4, F4, A4, C5
    notes.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const t = now + idx * 0.12;
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(t);
      osc.stop(t + 0.5);
    });
  }

  initDOM() {
    // Screens
    this.casesGridScreen = document.getElementById('casesGridScreen');
    this.investigationScreen = document.getElementById('investigationScreen');
    this.thinkingScreen = document.getElementById('thinkingScreen');
    this.typingScreen = document.getElementById('typingScreen');
    this.evaluationModal = document.getElementById('evaluationModal');
    this.dossierBody = document.getElementById('dossierBody');

    // Navigation Buttons
    document.getElementById('btnNavGrid')?.addEventListener('click', () => {
      this.cancelTimers();
      this.showScreen('casesGrid');
    });

    document.getElementById('btnPrevDossier')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.handlePrevStep();
    });

    document.getElementById('btnNextDossier')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.handleNextStep();
    });

    // Step Tabs (1. Kronologi, 2. Suspect 1, 3. Suspect 2, 4. Suspect 3)
    document.querySelectorAll('.dossier-step-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const step = parseInt(e.currentTarget.dataset.step, 10);
        if (!isNaN(step)) {
          this.goToStep(step);
        }
      });
    });

    // Keyboard Navigation (Arrow Right / Enter -> Next, Arrow Left -> Prev)
    window.addEventListener('keydown', (e) => {
      if (this.investigationScreen.classList.contains('active')) {
        if (e.key === 'ArrowRight' || e.key === 'Enter') {
          e.preventDefault();
          this.handleNextStep();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          this.handlePrevStep();
        }
      }
    });

    document.getElementById('btnProceedTyping')?.addEventListener('click', () => {
      this.startTypingChamber();
    });

    document.getElementById('btnSubmitDeduction')?.addEventListener('click', () => {
      this.submitDeductionReport();
    });

    document.getElementById('btnCloseEvaluation')?.addEventListener('click', () => {
      this.evaluationModal.style.display = 'none';
      this.showScreen('casesGrid');
    });
  }

  showScreen(screenName) {
    this.casesGridScreen.classList.toggle('active', screenName === 'casesGrid');
    this.investigationScreen.classList.toggle('active', screenName === 'investigation');
    this.thinkingScreen.classList.toggle('active', screenName === 'thinking');
    this.typingScreen.classList.toggle('active', screenName === 'typing');
  }

  // =========================================================================
  // 1. RENDER 15 CASES DOSSIER GRID
  // =========================================================================
  renderCasesGrid() {
    const grid = document.getElementById('casesGridContainer');
    if (!grid) return;
    grid.innerHTML = '';

    this.cases.forEach(c => {
      const isSolved = !!this.progress[c.id];
      const card = document.createElement('div');
      card.className = `case-card ${isSolved ? 'solved' : ''}`;

      let solvedBadge = '';
      if (isSolved) {
        const p = this.progress[c.id];
        solvedBadge = `<span style="color:var(--wax-red); font-weight:800;">Skor: ${p.score}/100 (${p.grade})</span>`;
      } else {
        solvedBadge = `<span>🔍 Belum Diinvestigasi</span>`;
      }

      card.innerHTML = `
        <div class="solved-stamp">TERPECAHKAN</div>
        <div class="case-card-header">
          <span class="case-number-badge">DOSSIER #${String(c.id).padStart(2, '0')}</span>
          <span class="case-difficulty">${c.difficulty}</span>
        </div>
        <div class="case-title">${c.title}</div>
        <div class="case-brief">
          <strong>Korban:</strong> ${c.victim}<br>
          <strong>TKP:</strong> ${c.location}
        </div>
        <div class="case-footer">
          <span>📁 ${c.category}</span>
          ${solvedBadge}
        </div>
      `;

      card.addEventListener('click', () => {
        this.openCase(c);
      });

      grid.appendChild(card);
    });
  }

  // =========================================================================
  // 2. OPEN CASE & DOSSIER MULTI-STEP NAVIGATION
  // =========================================================================
  openCase(caseObj) {
    this.activeCase = caseObj;
    this.currentStep = 0; // Step 0: Chronology
    this.playMysteryChime();
    this.renderDossierStep();
    this.showScreen('investigation');
  }

  goToStep(stepIndex) {
    this.currentStep = stepIndex;
    this.playTypewriterClick();
    this.renderDossierStep();
  }

  renderDossierStep() {
    const c = this.activeCase;
    if (!c) return;

    const metaLabel = document.getElementById('dossierCaseMeta');
    const counterLabel = document.getElementById('dossierStepCounter');
    const bodyEl = document.getElementById('dossierBody');
    const btnPrev = document.getElementById('btnPrevDossier');
    const btnNext = document.getElementById('btnNextDossier');

    // Update active tab buttons
    document.querySelectorAll('.dossier-step-tab').forEach(tab => {
      const stepVal = parseInt(tab.dataset.step, 10);
      tab.classList.toggle('active', stepVal === this.currentStep);
    });

    if (counterLabel) counterLabel.textContent = `Langkah ${this.currentStep + 1} dari 4`;
    if (metaLabel) metaLabel.textContent = `KASUS #${c.id}: ${c.title.toUpperCase()}`;

    // Auto-scroll body to top
    if (bodyEl) bodyEl.scrollTop = 0;

    if (this.currentStep === 0) {
      // Step 0: KRONOLOGI KEJADIAN
      if (btnPrev) btnPrev.style.visibility = 'hidden';
      if (btnNext) btnNext.innerHTML = 'Lanjut: Pembelaan Suspect 1 ➔';

      bodyEl.innerHTML = `
        <div class="dossier-page-title">
          <span>📜 KRONOLOGI & BUKTI AWAL TKP</span>
          <span style="font-size:12px; color:var(--ink-faded);">${c.time}</span>
        </div>

        <div class="dossier-section-block">
          <h4>📍 Lokasi & Korban Kejahatan:</h4>
          <p class="dossier-text"><strong>Korban:</strong> ${c.victim}<br><strong>Tempat Kejadian Perkara:</strong> ${c.location}</p>
        </div>

        <div class="dossier-section-block">
          <h4>🔎 Temuan Bukti Forensik & Fakta Kejadian:</h4>
          <p class="dossier-text">${c.chronology}</p>
        </div>

        <div class="quote-box">
          💡 <em>Catatan Detektif: Teliti alibi dan rincian waktu dari ketiga tersangka di halaman selanjutnya sebelum memasuki ruang berpikir!</em>
        </div>
      `;
    } else {
      // Step 1, 2, 3: SUSPECT 1, SUSPECT 2, SUSPECT 3
      const suspectIndex = this.currentStep - 1;
      const suspect = c.suspects[suspectIndex];
      const stepNum = this.currentStep + 1;

      if (btnPrev) btnPrev.style.visibility = 'visible';

      if (this.currentStep === 3) {
        if (btnNext) btnNext.innerHTML = '⚡ Masuk Ruang Berpikir (15 Menit) ➔';
      } else {
        if (btnNext) btnNext.innerHTML = `Lanjut: Pembelaan Suspect ${this.currentStep + 1} ➔`;
      }

      bodyEl.innerHTML = `
        <div class="dossier-page-title">
          <div style="display:flex; align-items:center; gap:14px;">
            <div class="suspect-avatar-badge">${suspect.avatar}</div>
            <div>
              <div style="font-size:20px; font-weight:700;">${suspect.name}</div>
              <div style="font-size:12px; color:var(--ink-faded);">${suspect.role}</div>
            </div>
          </div>
          <span style="font-size:12px; color:var(--ink-red); font-weight:700;">TERSANGKA #${this.currentStep}</span>
        </div>

        <div class="dossier-section-block">
          <h4>👤 Profil & Hubungan dengan Korban:</h4>
          <p class="dossier-text">${suspect.profile}</p>
        </div>

        <div class="dossier-section-block">
          <h4>💬 Kesaksian & Pernyataan Pembelaan (Alibi):</h4>
          <div class="quote-box">${suspect.defense}</div>
        </div>

        <div class="dossier-section-block">
          <h4>🔍 Catatan Anomali & Kejanggalan:</h4>
          <p class="dossier-text"><strong>Potensi Motif:</strong> ${suspect.motive}<br><strong>Temuan Celah Investigasi:</strong> ${suspect.clueFlaw}</p>
        </div>
      `;
    }
  }

  handlePrevStep() {
    this.playTypewriterClick();
    if (this.currentStep > 0) {
      this.currentStep--;
      this.renderDossierStep();
    }
  }

  handleNextStep() {
    this.playTypewriterClick();
    if (this.currentStep < 3) {
      this.currentStep++;
      this.renderDossierStep();
    } else {
      // Reached end of suspect 3 -> Launch 15-Minute Thinking Chamber!
      this.startThinkingChamber();
    }
  }

  // =========================================================================
  // 3. 15-MINUTE THINKING CHAMBER (NANOSECOND CLOCK DISPLAY)
  // =========================================================================
  startThinkingChamber() {
    this.showScreen('thinking');
    this.playMysteryChime();

    this.thinkingRemainingMs = this.thinkingTotalMs;
    this.thinkingStartPerf = performance.now();

    const mainDigitsEl = document.getElementById('clockMainDigits');
    const nanoDigitsEl = document.getElementById('clockNanoDigits');
    const caseTitleEl = document.getElementById('thinkingCaseTitle');

    if (caseTitleEl) caseTitleEl.textContent = `KASUS #${this.activeCase.id}: ${this.activeCase.title}`;

    cancelAnimationFrame(this.thinkingAnimId);

    const updateClock = () => {
      const elapsed = performance.now() - this.thinkingStartPerf;
      this.thinkingRemainingMs = Math.max(0, this.thinkingTotalMs - elapsed);

      const totalSec = Math.floor(this.thinkingRemainingMs / 1000);
      const minutes = Math.floor(totalSec / 60);
      const seconds = totalSec % 60;

      // Nanoseconds simulation from remaining milliseconds + high-res fraction
      const fractionMs = this.thinkingRemainingMs % 1000;
      const nanoSimulation = Math.floor(fractionMs * 1000000 + (performance.now() * 1000) % 999999);

      if (mainDigitsEl) {
        mainDigitsEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      }
      if (nanoDigitsEl) {
        nanoDigitsEl.textContent = `.${String(nanoSimulation).padStart(9, '0')}`;
      }

      if (this.thinkingRemainingMs <= 0) {
        // 15 Minutes expired -> Auto transition to 3-Minute Typing Chamber!
        this.startTypingChamber();
      } else {
        this.thinkingAnimId = requestAnimationFrame(updateClock);
      }
    };

    this.thinkingAnimId = requestAnimationFrame(updateClock);
  }

  // =========================================================================
  // 4. 3-MINUTE DEDUCTION TYPING CHAMBER
  // =========================================================================
  startTypingChamber() {
    cancelAnimationFrame(this.thinkingAnimId);
    this.showScreen('typing');
    this.playTypewriterClick();

    const textarea = document.getElementById('deductionTextarea');
    const countdownBadge = document.getElementById('typingCountdownBadge');
    const caseTitleEl = document.getElementById('typingCaseTitle');

    if (textarea) textarea.value = '';
    if (caseTitleEl) caseTitleEl.textContent = `KASUS #${this.activeCase.id}: ${this.activeCase.title}`;

    this.typingRemainingSec = this.typingTotalSec;
    if (countdownBadge) countdownBadge.textContent = '03:00';

    clearInterval(this.typingInterval);
    this.typingInterval = setInterval(() => {
      this.typingRemainingSec--;
      const m = Math.floor(this.typingRemainingSec / 60);
      const s = this.typingRemainingSec % 60;
      if (countdownBadge) countdownBadge.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

      if (this.typingRemainingSec <= 0) {
        clearInterval(this.typingInterval);
        this.submitDeductionReport();
      }
    }, 1000);
  }

  // =========================================================================
  // 5. SUBMIT & EVALUATE DEDUCTION WITH AI (Score 1-100)
  // =========================================================================
  submitDeductionReport() {
    clearInterval(this.typingInterval);
    cancelAnimationFrame(this.thinkingAnimId);

    const textarea = document.getElementById('deductionTextarea');
    const userText = textarea ? textarea.value : '';

    const evalResult = this.aiEngine.evaluateDeduction(this.activeCase, userText);

    this.playGavelSound();
    this.saveProgress(this.activeCase.id, evalResult.totalScore, evalResult.grade);

    // Populate Evaluation Modal
    const modal = this.evaluationModal;
    document.getElementById('evalCaseTitle').textContent = `BERKAS KASUS #${this.activeCase.id}: ${this.activeCase.title}`;
    document.getElementById('evalScoreNumber').textContent = evalResult.totalScore;
    document.getElementById('evalRankTitle').textContent = `🏆 Grade ${evalResult.grade} • ${evalResult.rankTitle}`;

    document.getElementById('evalCulpritScore').textContent = `${evalResult.culpritScore} / 40 Poin`;
    document.getElementById('evalMotiveScore').textContent = `${evalResult.motiveScore} / 30 Poin`;
    document.getElementById('evalEvidenceScore').textContent = `${evalResult.evidenceScore} / 30 Poin`;

    document.getElementById('evalAiCommentary').innerHTML = evalResult.commentary;

    // Truth Revealed Box
    document.getElementById('truthCulprit').textContent = evalResult.realCulprit;
    document.getElementById('truthMotive').textContent = evalResult.trueMotive;
    document.getElementById('truthModus').textContent = evalResult.modusOperandi;
    document.getElementById('truthEvidence').textContent = evalResult.keyEvidence;

    modal.style.display = 'flex';
  }

  cancelTimers() {
    cancelAnimationFrame(this.thinkingAnimId);
    clearInterval(this.typingInterval);
  }
}

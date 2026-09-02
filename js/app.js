/**
 * SMA DEVIL - Main Application & State Manager
 * Handles UI interactions, Level Transitions, Audio, Modals, and Touch Controls.
 */

class App {
  constructor() {
    this.engine = null;
    this.deaths = 0;
    this.startTime = Date.now();
    this.timerInterval = null;
    this.elapsedSeconds = 0;
    this.unlockedLevels = 1;
    this.completedLevels = [];
    this.currentLevelIndex = 0;

    // Indonesian School Life Troll Quotes on Death
    this.deathQuotes = [
      "Waduh, belum ngerjain PR Matematika!",
      "Kena razia rambut sama Guru BK!",
      "Kesandung tali sepatu sendiri!",
      "Kepleset kuah bakso kantin!",
      "Panik gara-gara bel masuk sudah bunyi!",
      "Lupa bawa kartu peserta ujian!",
      "Kena lempar penghapus papan tulis!",
      "Ketinggalan angkot sekolah!",
      "Baju seragam keluar, disuruh hormat bendera!",
      "Salah masuk kelas kakak tingkat!"
    ];

    this.init();
  }

  init() {
    this.loadSaveData();

    // Instantiate Engine
    this.engine = new GameEngine('gameCanvas');

    // Setup Engine Callbacks
    this.engine.onPlayerDeath = (reason) => this.handlePlayerDeath(reason);
    this.engine.onLevelComplete = () => this.handleLevelComplete();

    // Setup UI Listeners & Controls
    this.initUI();
    this.initMobileControls();
    this.initCharacterCustomizerPreview();
    this.startTimer();

    // Load first level or last played
    this.loadLevel(this.currentLevelIndex);

    // Start Game Loop
    this.gameLoop();

    // Auto start BGM on first user interaction
    const startAudioOnce = () => {
      window.sound.startBGM();
      window.removeEventListener('pointerdown', startAudioOnce);
      window.removeEventListener('keydown', startAudioOnce);
    };
    window.addEventListener('pointerdown', startAudioOnce);
    window.addEventListener('keydown', startAudioOnce);
  }

  loadSaveData() {
    try {
      const saved = localStorage.getItem('smadevil_save');
      if (saved) {
        const data = JSON.parse(saved);
        this.deaths = data.deaths || 0;
        this.unlockedLevels = data.unlockedLevels || 1;
        this.completedLevels = data.completedLevels || [];
        if (data.gender) {
          this.engine.charRenderer.setGender(data.gender);
        }
      }
    } catch (e) {
      console.warn("Could not load save data", e);
    }
  }

  saveData() {
    try {
      const data = {
        deaths: this.deaths,
        unlockedLevels: this.unlockedLevels,
        completedLevels: this.completedLevels,
        gender: this.engine.charRenderer.gender
      };
      localStorage.setItem('smadevil_save', JSON.stringify(data));
    } catch (e) {
      console.warn("Could not save data", e);
    }
  }

  initUI() {
    // Top Bar Buttons
    const btnSound = document.getElementById('btnSound');
    const btnLevelSelect = document.getElementById('btnLevelSelect');
    const btnCharSelect = document.getElementById('btnCharSelect');
    const btnRestart = document.getElementById('btnRestart');

    if (btnSound) {
      btnSound.addEventListener('click', () => {
        const isMuted = window.sound.toggleMute();
        btnSound.innerHTML = isMuted ? '🔇' : '🔊';
      });
    }

    if (btnRestart) {
      btnRestart.addEventListener('click', () => {
        window.sound.playClick();
        this.engine.reloadCurrentLevel();
      });
    }

    if (btnLevelSelect) {
      btnLevelSelect.addEventListener('click', () => {
        window.sound.playClick();
        this.openLevelSelectModal();
      });
    }

    if (btnCharSelect) {
      btnCharSelect.addEventListener('click', () => {
        window.sound.playClick();
        this.openCharModal();
      });
    }

    // Modal Close Buttons
    document.querySelectorAll('.modal-close, .btn-close-modal').forEach(btn => {
      btn.addEventListener('click', () => {
        window.sound.playClick();
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
      });
    });

    // Character Gender Switchers
    const btnBoy = document.getElementById('btnCharBoy');
    const btnGirl = document.getElementById('btnCharGirl');
    if (btnBoy && btnGirl) {
      btnBoy.addEventListener('click', () => {
        window.sound.playClick();
        this.engine.charRenderer.setGender('boy');
        btnBoy.classList.add('active');
        btnGirl.classList.remove('active');
        this.updateCharPreview();
        this.saveData();
      });
      btnGirl.addEventListener('click', () => {
        window.sound.playClick();
        this.engine.charRenderer.setGender('girl');
        btnGirl.classList.add('active');
        btnBoy.classList.remove('active');
        this.updateCharPreview();
        this.saveData();
      });
    }

    // Victory Modal Buttons
    const btnPlayAgain = document.getElementById('btnPlayAgain');
    if (btnPlayAgain) {
      btnPlayAgain.addEventListener('click', () => {
        window.sound.playClick();
        document.getElementById('victoryModal').classList.remove('active');
        this.loadLevel(0);
      });
    }

    this.updateStatsHUD();
  }

  initMobileControls() {
    const btnLeft = document.getElementById('btnTouchLeft');
    const btnRight = document.getElementById('btnTouchRight');
    const btnJump = document.getElementById('btnTouchJump');

    const handleTouch = (btn, key, isPressed) => {
      if (!btn) return;
      if (key === 'jump' && isPressed) {
        if (!this.engine.input.jump) this.engine.input.jumpJustPressed = true;
      }
      this.engine.input[key] = isPressed;
      btn.classList.toggle('active', isPressed);
    };

    if (btnLeft) {
      btnLeft.addEventListener('touchstart', (e) => { e.preventDefault(); handleTouch(btnLeft, 'left', true); });
      btnLeft.addEventListener('touchend', (e) => { e.preventDefault(); handleTouch(btnLeft, 'left', false); });
      btnLeft.addEventListener('mousedown', () => handleTouch(btnLeft, 'left', true));
      btnLeft.addEventListener('mouseup', () => handleTouch(btnLeft, 'left', false));
      btnLeft.addEventListener('mouseleave', () => handleTouch(btnLeft, 'left', false));
    }

    if (btnRight) {
      btnRight.addEventListener('touchstart', (e) => { e.preventDefault(); handleTouch(btnRight, 'right', true); });
      btnRight.addEventListener('touchend', (e) => { e.preventDefault(); handleTouch(btnRight, 'right', false); });
      btnRight.addEventListener('mousedown', () => handleTouch(btnRight, 'right', true));
      btnRight.addEventListener('mouseup', () => handleTouch(btnRight, 'right', false));
      btnRight.addEventListener('mouseleave', () => handleTouch(btnRight, 'right', false));
    }

    if (btnJump) {
      btnJump.addEventListener('touchstart', (e) => { e.preventDefault(); handleTouch(btnJump, 'jump', true); });
      btnJump.addEventListener('touchend', (e) => { e.preventDefault(); handleTouch(btnJump, 'jump', false); });
      btnJump.addEventListener('mousedown', () => handleTouch(btnJump, 'jump', true));
      btnJump.addEventListener('mouseup', () => handleTouch(btnJump, 'jump', false));
      btnJump.addEventListener('mouseleave', () => handleTouch(btnJump, 'jump', false));
    }
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.elapsedSeconds += 0.1;
      const elTimer = document.getElementById('hudTimer');
      if (elTimer) {
        const mins = Math.floor(this.elapsedSeconds / 60).toString().padStart(2, '0');
        const secs = Math.floor(this.elapsedSeconds % 60).toString().padStart(2, '0');
        const ms = Math.floor((this.elapsedSeconds * 10) % 10);
        elTimer.textContent = `${mins}:${secs}.${ms}`;
      }
    }, 100);
  }

  loadLevel(index) {
    if (index >= window.GAME_LEVELS.length) {
      this.showVictoryModal();
      return;
    }

    this.currentLevelIndex = index;
    this.engine.loadLevel(index);

    const levelData = window.GAME_LEVELS[index];
    this.showLevelBanner(levelData.title, levelData.hint);
    this.updateStatsHUD();
  }

  showLevelBanner(title, hint) {
    const banner = document.getElementById('levelBanner');
    if (!banner) return;
    banner.querySelector('.title').textContent = title;
    banner.querySelector('.hint').textContent = hint;

    banner.classList.add('show');
    clearTimeout(this.bannerTimeout);
    this.bannerTimeout = setTimeout(() => {
      banner.classList.remove('show');
    }, 2800);
  }

  showTrollToast(msg) {
    const toast = document.getElementById('trollToast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  }

  handlePlayerDeath(reason) {
    this.deaths++;
    this.updateStatsHUD();
    this.saveData();

    // Random hilarious death quip
    const randomQuote = this.deathQuotes[Math.floor(Math.random() * this.deathQuotes.length)];
    this.showTrollToast(`${reason} (${randomQuote})`);
  }

  handleLevelComplete() {
    if (!this.completedLevels.includes(this.currentLevelIndex + 1)) {
      this.completedLevels.push(this.currentLevelIndex + 1);
    }
    if (this.unlockedLevels < this.currentLevelIndex + 2) {
      this.unlockedLevels = this.currentLevelIndex + 2;
    }
    this.saveData();

    setTimeout(() => {
      this.loadLevel(this.currentLevelIndex + 1);
    }, 1200);
  }

  updateStatsHUD() {
    const elLevel = document.getElementById('hudLevel');
    const elDeaths = document.getElementById('hudDeaths');
    if (elLevel) elLevel.textContent = `${this.currentLevelIndex + 1} / ${window.GAME_LEVELS.length}`;
    if (elDeaths) elDeaths.textContent = this.deaths;
  }

  openLevelSelectModal() {
    const modal = document.getElementById('levelSelectModal');
    const grid = document.getElementById('levelGrid');
    if (!modal || !grid) return;

    grid.innerHTML = '';
    window.GAME_LEVELS.forEach((lvl, idx) => {
      const card = document.createElement('div');
      card.className = 'level-card';
      const isUnlocked = (idx + 1) <= this.unlockedLevels;
      const isCompleted = this.completedLevels.includes(idx + 1);

      if (isCompleted) card.classList.add('completed');
      if (!isUnlocked) card.classList.add('locked');

      card.innerHTML = `<span>${lvl.id}</span>`;

      if (isUnlocked) {
        card.addEventListener('click', () => {
          window.sound.playClick();
          modal.classList.remove('active');
          this.loadLevel(idx);
        });
      }
      grid.appendChild(card);
    });

    modal.classList.add('active');
  }

  openCharModal() {
    const modal = document.getElementById('charModal');
    if (!modal) return;
    this.updateCharPreview();
    modal.classList.add('active');
  }

  initCharacterCustomizerPreview() {
    this.previewCanvas = document.getElementById('charPreviewCanvas');
    if (this.previewCanvas) {
      this.previewCtx = this.previewCanvas.getContext('2d');
      this.previewCanvas.width = 120;
      this.previewCanvas.height = 120;
    }
  }

  updateCharPreview() {
    if (!this.previewCtx || !this.previewCanvas) return;
    const ctx = this.previewCtx;
    ctx.clearRect(0, 0, this.previewCanvas.width, this.previewCanvas.height);
    this.engine.charRenderer.draw(ctx, 60, 95, 1, 'idle', Date.now() * 0.05, false);
  }

  showVictoryModal() {
    const modal = document.getElementById('victoryModal');
    if (!modal) return;
    document.getElementById('finalDeaths').textContent = this.deaths;
    document.getElementById('finalTime').textContent = document.getElementById('hudTimer').textContent;
    modal.classList.add('active');
  }

  gameLoop() {
    this.engine.update();
    this.engine.render();

    // If character modal is open, animate preview
    const charModal = document.getElementById('charModal');
    if (charModal && charModal.classList.contains('active')) {
      this.updateCharPreview();
    }

    requestAnimationFrame(() => this.gameLoop());
  }
}

// Global expose
window.showTrollToast = (msg) => {
  if (window.app) window.app.showTrollToast(msg);
};

// Start application when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});

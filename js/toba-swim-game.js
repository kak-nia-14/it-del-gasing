/**
 * LOMBA BERENANG DANAU TOBA - CORE GAME ENGINE (PERFECTED 400M & DYNAMIC VISUAL RENANG)
 * Instant Dive-In Momentum, Smooth 400M Realtime Progress, Articulated Freestyle Strokes,
 * Flutter Kicks, Body Roll, Checkpoint Triggers, Competitive AI, and EXP Progression.
 */

class TobaSwimGame {
  constructor() {
    this.storageKey = 'toba_swim_save_v1';
    this.loadPlayerData();

    this.selectedChar = TobaData.characters[0];
    this.selectedLocation = TobaData.locations[0];
    this.selectedGear = TobaData.gears[0];

    this.audio = new TobaAudio();
    this.gameState = 'lobby'; // lobby, countdown, racing, finished

    this.rhythmPos = 0;
    this.rhythmDir = 1;
    this.rhythmSpeed = 1.6;

    this.checkpointsPassed = { 100: false, 200: false, 300: false };

    this.initDOM();
    this.renderLobby();
    this.updateExpHUD();
    this.initCanvas();
  }

  // Persistent Player Profile (EXP, Matches, Wins)
  loadPlayerData() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      try {
        this.playerData = JSON.parse(saved);
      } catch (e) {
        this.initDefaultPlayerData();
      }
    } else {
      this.initDefaultPlayerData();
    }
  }

  initDefaultPlayerData() {
    this.playerData = {
      exp: 0,
      matches: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      bestTime: null
    };
  }

  savePlayerData() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.playerData));
    this.updateExpHUD();
  }

  getRankTitle(exp) {
    if (exp >= 200) return { title: 'Legenda Nusantara', level: 5, icon: '👑' };
    if (exp >= 120) return { title: 'Master Toba', level: 4, icon: '🔱' };
    if (exp >= 70) return { title: 'Kapten Danau Toba', level: 3, icon: '⭐' };
    if (exp >= 30) return { title: 'Perenang Samosir', level: 2, icon: '🌊' };
    return { title: 'Pemula Danau', level: 1, icon: '🏊' };
  }

  updateExpHUD() {
    const exp = Math.max(0, this.playerData.exp);
    const rank = this.getRankTitle(exp);

    const rankTitleEl = document.getElementById('rankTitle');
    const expCountEl = document.getElementById('expCount');
    const expFillEl = document.getElementById('expBarFill');

    if (rankTitleEl) rankTitleEl.innerHTML = `${rank.icon} ${rank.title} (Lv.${rank.level})`;
    if (expCountEl) expCountEl.textContent = `${exp} EXP`;

    const thresholds = [0, 30, 70, 120, 200, 350];
    const curBase = thresholds[rank.level - 1] || 0;
    const nextTarget = thresholds[rank.level] || 350;
    const progress = Math.min(100, Math.max(0, ((exp - curBase) / (nextTarget - curBase)) * 100));
    if (expFillEl) expFillEl.style.width = `${progress}%`;
  }

  initDOM() {
    this.lobbyScreen = document.getElementById('lobbyScreen');
    this.raceScreen = document.getElementById('raceScreen');
    this.resultOverlay = document.getElementById('resultOverlay');

    // Selection Containers
    this.charGridEl = document.getElementById('charGrid');
    this.locGridEl = document.getElementById('locGrid');
    this.gearGridEl = document.getElementById('gearGrid');

    // 400M Progress Elements
    this.rhythmIndicator = document.getElementById('rhythmIndicator');
    this.rhythmFeedback = document.getElementById('rhythmFeedback');
    this.staminaFill = document.getElementById('staminaFill');
    this.boosterFill = document.getElementById('boosterFill');
    this.btnBooster = document.getElementById('btnActivateBooster');
    this.playerTrackPin = document.getElementById('playerTrackPin');
    this.aiTrackPin = document.getElementById('aiTrackPin');
    this.progressMetersText = document.getElementById('progressMetersText');
    this.progressPercentText = document.getElementById('progressPercentText');
    this.gapIndicatorBadge = document.getElementById('gapIndicatorBadge');
    this.checkpointBanner = document.getElementById('checkpointPopupBanner');
    this.aiDialogueText = document.getElementById('aiDialogueText');

    // Buttons
    document.getElementById('btnStartRace')?.addEventListener('click', () => {
      this.startRaceCountdown();
    });

    document.getElementById('btnSwimStroke')?.addEventListener('click', () => {
      this.handlePlayerStroke();
    });

    this.btnBooster?.addEventListener('click', () => {
      this.handlePlayerBooster();
    });

    document.getElementById('btnSoundToggle')?.addEventListener('click', (e) => {
      this.audio.enabled = !this.audio.enabled;
      e.currentTarget.textContent = this.audio.enabled ? '🔊' : '🔇';
    });

    // Rematch & Return
    document.getElementById('btnRematch')?.addEventListener('click', () => {
      this.resultOverlay.style.display = 'none';
      this.startRaceCountdown();
    });

    document.getElementById('btnReturnLobby')?.addEventListener('click', () => {
      this.resultOverlay.style.display = 'none';
      this.showScreen('lobby');
    });

    // Screen Click / Tap anywhere on race screen to swim
    this.raceScreen?.addEventListener('click', (e) => {
      if (e.target.closest('#btnActivateBooster') || e.target.closest('#btnSoundToggle')) return;
      if (this.gameState === 'racing') {
        this.handlePlayerStroke();
      }
    });

    // Keyboard Controls
    window.addEventListener('keydown', (e) => {
      if (this.gameState === 'racing') {
        if (e.code === 'Space' || e.code === 'ArrowRight' || e.code === 'KeyW' || e.code === 'ArrowUp') {
          e.preventDefault();
          this.handlePlayerStroke();
        } else if (e.code === 'KeyB' || e.code === 'ShiftRight' || e.code === 'Enter') {
          e.preventDefault();
          this.handlePlayerBooster();
        }
      }
    });
  }

  showScreen(name) {
    this.gameState = name;
    this.lobbyScreen.classList.toggle('active', name === 'lobby');
    this.raceScreen.classList.toggle('active', name === 'racing' || name === 'countdown');
    if (name === 'racing' || name === 'countdown') {
      this.resizeCanvas();
    }
  }

  resizeCanvas() {
    if (this.canvas) {
      this.canvas.width = this.canvas.offsetWidth || window.innerWidth;
      this.canvas.height = this.canvas.offsetHeight || window.innerHeight;
    }
  }

  renderLobby() {
    // 1. Render Characters (3 Cowok, 2 Cewek)
    this.charGridEl.innerHTML = '';
    TobaData.characters.forEach(char => {
      const card = document.createElement('div');
      card.className = `char-card ${char.id === this.selectedChar.id ? 'selected' : ''}`;
      card.innerHTML = `
        <span class="char-gender-tag ${char.gender}">${char.genderLabel}</span>
        <div class="char-avatar-box">
          ${TobaSprites.getCharacterSVG(char)}
        </div>
        <div class="char-name">${char.name}</div>
        <div class="char-origin">📍 ${char.origin}</div>
        <div class="char-stats">
          <div class="stat-row"><span>Speed</span><strong>${char.stats.speed}</strong></div>
          <div class="stat-row"><span>Stamina</span><strong>${char.stats.stamina}</strong></div>
          <div class="stat-row"><span>Boost</span><strong>${char.stats.boost}</strong></div>
        </div>
      `;
      card.addEventListener('click', () => {
        this.selectedChar = char;
        this.renderLobby();
        this.audio.playStroke('good');
      });
      this.charGridEl.appendChild(card);
    });

    // 2. Render Locations (All 400m)
    this.locGridEl.innerHTML = '';
    TobaData.locations.forEach(loc => {
      const card = document.createElement('div');
      card.className = `loc-card ${loc.id === this.selectedLocation.id ? 'selected' : ''}`;
      card.innerHTML = `
        <div class="loc-banner">
          ${TobaSprites.getLocationBannerSVG(loc.id)}
        </div>
        <div class="loc-title">📍 ${loc.name}</div>
        <div class="loc-desc">${loc.desc}</div>
        <div class="loc-modifier">${loc.modifier} (Jarak 400M)</div>
      `;
      card.addEventListener('click', () => {
        this.selectedLocation = loc;
        this.renderLobby();
        this.audio.playStroke('good');
      });
      this.locGridEl.appendChild(card);
    });

    // 3. Render Gears
    this.gearGridEl.innerHTML = '';
    TobaData.gears.forEach(gear => {
      const card = document.createElement('div');
      card.className = `gear-card ${gear.id === this.selectedGear.id ? 'selected' : ''}`;
      card.innerHTML = `
        <div class="gear-icon-box">
          ${TobaSprites.getGearSVG(gear.id)}
        </div>
        <div class="gear-info">
          <h4>${gear.icon} ${gear.name}</h4>
          <div class="gear-passive">${gear.passive}</div>
          <div class="gear-booster-tag">⚡ Booster: ${gear.boosterName}</div>
        </div>
      `;
      card.addEventListener('click', () => {
        this.selectedGear = gear;
        this.renderLobby();
        this.audio.playStroke('good');
      });
      this.gearGridEl.appendChild(card);
    });

    // Update Preview
    const pPrev = document.getElementById('playerVsPreview');
    if (pPrev) {
      pPrev.innerHTML = `
        <div style="width:36px; height:36px; border-radius:50%; background:#fff; overflow:hidden;">
          ${TobaSprites.getCharacterSVG(this.selectedChar)}
        </div>
        <div>
          <div style="font-weight:800; color:#fff;">${this.selectedChar.name}</div>
          <div style="font-size:10px; color:var(--gorga-gold);">${this.selectedGear.name}</div>
        </div>
      `;
    }
  }

  // Start Countdown (3... 2... 1... GO!)
  startRaceCountdown() {
    this.showScreen('countdown');
    this.resetRaceEntities();

    const overlay = document.getElementById('countdownOverlay');
    const numEl = document.getElementById('countdownNum');
    overlay.style.display = 'flex';

    let count = 3;
    numEl.textContent = count;
    this.audio.playStroke('good');

    const interval = setInterval(() => {
      count--;
      if (count > 0) {
        numEl.textContent = count;
        this.audio.playStroke('good');
      } else if (count === 0) {
        numEl.textContent = 'PRRRIT!';
        this.audio.playWhistle();

        // Initial Dive In Momentum
        this.player.speed = 5.5;
        this.ai.speed = 5.2;
        this.spawnSplash(0, 150, '#38bdf8');
        this.spawnSplash(0, 260, '#a855f7');
      } else {
        clearInterval(interval);
        overlay.style.display = 'none';
        this.gameState = 'racing';
        this.raceStartTime = Date.now();
        this.setAIBanter(TobaData.aiDialogues[0]);
      }
    }, 700);
  }

  resetRaceEntities() {
    this.raceDistance = 400; // Standardized exactly to 400m
    this.checkpointsPassed = { 100: false, 200: false, 300: false };

    this.player = {
      x: 0,
      speed: 3.0, // initial gliding speed
      stamina: 100,
      boosterGauge: 0,
      boosterActive: 0,
      strokeCycle: 0,
      kickCycle: 0,
      bodyRoll: 0
    };

    this.ai = {
      x: 0,
      speed: 3.0,
      stamina: 100,
      boosterGauge: 0,
      boosterActive: 0,
      strokeCycle: 0,
      kickCycle: 0,
      bodyRoll: 0,
      nextStrokeTime: 0
    };

    this.bubbles = [];
    this.updateInRaceHUD();
  }

  // Handle Player Stroke Input
  handlePlayerStroke() {
    if (this.gameState !== 'racing') return;

    let quality = 'miss';
    let speedBonus = 1.0;
    let boostGain = 8;
    let staminaCost = 5.0;

    if (this.selectedGear.id === 'lifejacket') staminaCost *= 0.75;

    if (this.player.stamina <= 0) {
      quality = 'exhausted';
      speedBonus = 0.45;
      boostGain = 2;
    } else if (this.rhythmPos >= 60 && this.rhythmPos <= 92) {
      quality = 'perfect';
      speedBonus = 2.4;
      boostGain = 18;
      staminaCost *= 0.7;
    } else if (this.rhythmPos >= 35 && this.rhythmPos <= 98) {
      quality = 'good';
      speedBonus = 1.5;
      boostGain = 10;
    } else {
      quality = 'miss';
      speedBonus = 0.85;
      boostGain = 4;
      staminaCost *= 1.2;
    }

    if (this.player.boosterActive > 0 && this.selectedGear.id === 'lifejacket') {
      staminaCost = 0;
    }

    const baseSpeed = (this.selectedChar.stats.speed / 100) * 2.2;
    let push = baseSpeed * speedBonus;

    if (this.player.boosterActive > 0) {
      if (this.selectedGear.id === 'fins') push *= 2.5;
      else if (this.selectedGear.id === 'pelampung') push *= 1.8;
    }

    this.player.speed = Math.min(10.5, this.player.speed + push);
    this.player.stamina = Math.max(0, this.player.stamina - staminaCost);
    this.player.boosterGauge = Math.min(100, this.player.boosterGauge + boostGain);

    // Trigger splash particles
    this.spawnSplash(this.player.x, 150, '#38bdf8');

    // Feedback
    this.showRhythmFeedback(quality);
    this.audio.playStroke(quality === 'perfect' ? 'perfect' : (quality === 'good' ? 'good' : 'miss'));
    this.updateInRaceHUD();
  }

  // Handle Player Booster Activation
  handlePlayerBooster() {
    if (this.gameState !== 'racing') return;
    if (this.player.boosterGauge < 100 || this.player.boosterActive > 0) return;

    this.player.boosterGauge = 0;
    this.player.boosterActive = 4.0;
    this.audio.playBooster();

    if (this.selectedGear.id === 'lifejacket') {
      this.player.stamina = 100;
    }

    this.setAIBanter("Pemain mengaktifkan Booster! DeepMind kalkulasi counter-boost!");
    this.updateInRaceHUD();
  }

  showRhythmFeedback(quality) {
    if (!this.rhythmFeedback) return;
    this.rhythmFeedback.className = `rhythm-feedback ${quality}`;
    if (quality === 'perfect') this.rhythmFeedback.textContent = 'PERFECT! ⚡';
    else if (quality === 'good') this.rhythmFeedback.textContent = 'GOOD! 🌊';
    else if (quality === 'exhausted') this.rhythmFeedback.textContent = 'LELAH! 💦';
    else this.rhythmFeedback.textContent = 'MISS! ❌';

    clearTimeout(this.feedbackTimer);
    this.feedbackTimer = setTimeout(() => {
      if (this.rhythmFeedback) this.rhythmFeedback.textContent = '';
    }, 600);
  }

  setAIBanter(text) {
    if (this.aiDialogueText) this.aiDialogueText.textContent = text;
  }

  showCheckpointBanner(text) {
    if (!this.checkpointBanner) return;
    this.checkpointBanner.textContent = text;
    this.checkpointBanner.style.display = 'block';
    this.audio.playWhistle();

    setTimeout(() => {
      if (this.checkpointBanner) this.checkpointBanner.style.display = 'none';
    }, 2000);
  }

  // Canvas Water World & Game Loop
  initCanvas() {
    this.canvas = document.getElementById('raceCanvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    window.addEventListener('resize', () => this.resizeCanvas());
    this.resizeCanvas();

    this.lastTime = performance.now();
    requestAnimationFrame((t) => this.loop(t));
  }

  loop(currentTime) {
    const dt = Math.min(0.05, (currentTime - this.lastTime) / 1000);
    this.lastTime = currentTime;

    if (this.gameState === 'racing') {
      this.updatePhysics(dt);
      this.updateAI(dt);
      this.updateRhythm(dt);
      this.updateSwimmerAnimations(dt);
      this.checkCheckpoints();
      this.checkFinishLine();
    }

    this.renderCanvas();
    requestAnimationFrame((t) => this.loop(t));
  }

  updateRhythm(dt) {
    this.rhythmPos += this.rhythmDir * this.rhythmSpeed * 65 * dt;
    if (this.rhythmPos >= 100) {
      this.rhythmPos = 100;
      this.rhythmDir = -1;
    } else if (this.rhythmPos <= 0) {
      this.rhythmPos = 0;
      this.rhythmDir = 1;
    }

    if (this.rhythmIndicator) {
      this.rhythmIndicator.style.left = `${this.rhythmPos}%`;
    }
  }

  updateSwimmerAnimations(dt) {
    // Player stroke cycle advances proportionally to speed
    const pFreq = Math.max(1.8, this.player.speed * 1.5);
    this.player.strokeCycle += pFreq * dt;
    this.player.kickCycle += pFreq * 2.8 * dt;
    this.player.bodyRoll = Math.sin(this.player.strokeCycle * Math.PI) * 0.25;

    // AI stroke cycle
    const aiFreq = Math.max(1.8, this.ai.speed * 1.5);
    this.ai.strokeCycle += aiFreq * dt;
    this.ai.kickCycle += aiFreq * 2.8 * dt;
    this.ai.bodyRoll = Math.sin(this.ai.strokeCycle * Math.PI) * 0.25;
  }

  updatePhysics(dt) {
    const waveDrag = this.selectedLocation.waveStrength * 0.35;

    // Minimum cruising/glide speed so swimmer is always swimming smoothly
    const minGlideSpeed = 2.4;
    if (this.player.speed < minGlideSpeed) {
      this.player.speed += (minGlideSpeed - this.player.speed) * 2.0 * dt;
    }
    if (this.ai.speed < minGlideSpeed) {
      this.ai.speed += (minGlideSpeed - this.ai.speed) * 2.0 * dt;
    }

    // Player Physics
    if (this.player.boosterActive > 0) {
      this.player.boosterActive -= dt;
      if (this.selectedGear.id !== 'pelampung') this.player.speed *= (1 - (waveDrag * 0.4) * dt);
    } else {
      this.player.speed *= (1 - waveDrag * dt);
    }
    this.player.speed *= (1 - 0.45 * dt); // Water friction
    this.player.x += this.player.speed * dt * 3.5; // Steady distance progression

    // Passive Stamina Recovery
    const recBonus = this.selectedLocation.id === 'bukit_gibeon' ? 1.4 : 1.0;
    this.player.stamina = Math.min(100, this.player.stamina + 4.5 * recBonus * dt);

    // AI Physics
    if (this.ai.boosterActive > 0) {
      this.ai.boosterActive -= dt;
    } else {
      this.ai.speed *= (1 - waveDrag * dt);
    }
    this.ai.speed *= (1 - 0.45 * dt);
    this.ai.x += this.ai.speed * dt * 3.5;
    this.ai.stamina = Math.min(100, this.ai.stamina + 4.5 * dt);

    this.updateInRaceHUD();
  }

  // Competitive Antigravity AI
  updateAI(dt) {
    const remainingDist = this.raceDistance - this.ai.x;

    if (Date.now() > this.ai.nextStrokeTime) {
      let strokeCadence = 540;

      // Aggressive catch-up in 400m race
      if (this.player.x > this.ai.x + 8 || remainingDist < 120) {
        strokeCadence = 380;
      }

      if (this.ai.stamina > 10) {
        const aiPush = 2.2 + (Math.random() * 0.65);
        this.ai.speed = Math.min(9.5, this.ai.speed + aiPush);
        this.ai.stamina -= 4.8;
        this.ai.boosterGauge = Math.min(100, this.ai.boosterGauge + 12);
        this.spawnSplash(this.ai.x, 260, '#a855f7');
      }

      this.ai.nextStrokeTime = Date.now() + strokeCadence;
    }

    // AI Booster Trigger
    if (this.ai.boosterGauge >= 100 && this.ai.boosterActive <= 0) {
      if (remainingDist < 130 || this.player.x > this.ai.x + 18) {
        this.ai.boosterGauge = 0;
        this.ai.boosterActive = 4.0;
        this.ai.speed = 9.8;
        this.setAIBanter("⚡ DeepMind Quantum Propulsion OVERDRIVE!");
      }
    }
  }

  checkCheckpoints() {
    if (this.player.x >= 100 && !this.checkpointsPassed[100]) {
      this.checkpointsPassed[100] = true;
      this.showCheckpointBanner('🚩 CHECKPOINT 100M! (Sisa 300m)');
      this.setAIBanter("Checkpoint 100m terlewati! Jaga ritme kayuhanmu!");
    } else if (this.player.x >= 200 && !this.checkpointsPassed[200]) {
      this.checkpointsPassed[200] = true;
      this.showCheckpointBanner('🚩 CHECKPOINT 200M! (Separuh Jalan)');
      this.setAIBanter(TobaData.aiDialogues[3]);
    } else if (this.player.x >= 300 && !this.checkpointsPassed[300]) {
      this.checkpointsPassed[300] = true;
      this.showCheckpointBanner('🚩 CHECKPOINT 300M! (100m SPRINT AKHIR!)');
      this.setAIBanter(TobaData.aiDialogues[4]);
    }
  }

  spawnSplash(x, y, color) {
    for (let i = 0; i < 6; i++) {
      this.bubbles.push({
        x,
        y: y + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        r: Math.random() * 4 + 2,
        alpha: 1,
        color
      });
    }
  }

  updateInRaceHUD() {
    if (this.staminaFill) this.staminaFill.style.width = `${this.player.stamina}%`;
    if (this.boosterFill) this.boosterFill.style.width = `${this.player.boosterGauge}%`;

    if (this.btnBooster) {
      if (this.player.boosterActive > 0) {
        this.btnBooster.className = 'btn-activate-booster active';
        this.btnBooster.textContent = `⚡ AKTIF (${this.player.boosterActive.toFixed(1)}s)`;
      } else if (this.player.boosterGauge >= 100) {
        this.btnBooster.className = 'btn-activate-booster ready';
        this.btnBooster.textContent = `⚡ BOOSTER SIAP!`;
      } else {
        this.btnBooster.className = 'btn-activate-booster';
        this.btnBooster.textContent = `⚡ Booster (${Math.floor(this.player.boosterGauge)}%)`;
      }
    }

    // 400M Progress HUD Numbers
    const pPercent = Math.min(100, Math.max(0, (this.player.x / 400) * 100));
    const aiPercent = Math.min(100, Math.max(0, (this.ai.x / 400) * 100));

    if (this.playerTrackPin) this.playerTrackPin.style.left = `${pPercent}%`;
    if (this.aiTrackPin) this.aiTrackPin.style.left = `${aiPercent}%`;

    if (this.progressMetersText) {
      this.progressMetersText.textContent = `${Math.floor(this.player.x)}m / 400m`;
    }
    if (this.progressPercentText) {
      this.progressPercentText.textContent = `(${pPercent.toFixed(1)}%)`;
    }

    // Gap indicator
    if (this.gapIndicatorBadge) {
      const gap = this.player.x - this.ai.x;
      if (gap >= 0.5) {
        this.gapIndicatorBadge.className = 'gap-indicator-badge ahead';
        this.gapIndicatorBadge.textContent = `⚡ +${gap.toFixed(1)}m Unggul`;
      } else if (gap <= -0.5) {
        this.gapIndicatorBadge.className = 'gap-indicator-badge behind';
        this.gapIndicatorBadge.textContent = `⚠️ ${Math.abs(gap).toFixed(1)}m Tertinggal`;
      } else {
        this.gapIndicatorBadge.className = 'gap-indicator-badge ahead';
        this.gapIndicatorBadge.textContent = `⚖️ Berdampingan`;
      }
    }
  }

  checkFinishLine() {
    if (this.player.x >= 400 || this.ai.x >= 400) {
      this.finishRace();
    }
  }

  finishRace() {
    this.gameState = 'finished';
    const playerWin = this.player.x >= this.ai.x;
    const isDraw = Math.abs(this.player.x - this.ai.x) < 0.8;
    const timeTaken = ((Date.now() - this.raceStartTime) / 1000).toFixed(2);

    this.playerData.matches++;

    let expChange = 0;
    let statusClass = 'win';
    let statusText = 'KAMU MENANG! 🏆';
    let subText = `Selamat! ${this.selectedChar.name} mengalahkan Antigravity AI pada jarak 400m di ${this.selectedLocation.name}!`;

    if (isDraw) {
      expChange = 3;
      statusClass = 'draw';
      statusText = 'HASIL SERI! 🤝';
      subText = 'Pertandingan 400m sengit luar biasa! Kedua perenang menyentuh garis finish bersamaan.';
      this.playerData.draws++;
      this.audio.playVictory();
    } else if (playerWin) {
      expChange = 10;
      statusClass = 'win';
      statusText = 'KAMU MENANG! 🏆';
      this.playerData.wins++;
      this.audio.playVictory();
    } else {
      expChange = -1;
      statusClass = 'lose';
      statusText = 'ANTIGRAVITY AI MENANG! 🤖';
      subText = 'Antigravity AI berhasil mendahului dengan perhitungan ritme dan stamina 400m.';
      this.playerData.losses++;
      this.audio.playDefeat();
    }

    this.playerData.exp = Math.max(0, this.playerData.exp + expChange);
    this.savePlayerData();

    // Show Result Overlay
    const overlay = this.resultOverlay;
    const trophyEl = document.getElementById('resultTrophy');
    const titleEl = document.getElementById('resultStatusTitle');
    const subEl = document.getElementById('resultSub');
    const expBadge = document.getElementById('expDiffBadge');
    const statTime = document.getElementById('resTimeTaken');
    const statWins = document.getElementById('resWinCount');

    if (trophyEl) trophyEl.textContent = playerWin ? '🥇' : (isDraw ? '🤝' : '🥈');
    if (titleEl) {
      titleEl.className = `result-status-title ${statusClass}`;
      titleEl.textContent = statusText;
    }
    if (subEl) subEl.textContent = subText;
    if (expBadge) {
      expBadge.className = `exp-diff-badge ${expChange >= 0 ? 'plus' : 'minus'}`;
      expBadge.textContent = expChange > 0 ? `+${expChange} EXP` : `${expChange} EXP`;
    }
    if (statTime) statTime.textContent = `${timeTaken}s`;
    if (statWins) statWins.textContent = `${this.playerData.wins} Win (${this.playerData.matches} Total)`;

    overlay.style.display = 'flex';
  }

  // =========================================================================
  // DETAILED 2D SWIMMING VISUAL ANIMATION ENGINE
  // =========================================================================
  renderCanvas() {
    const ctx = this.ctx;
    if (!ctx || !this.canvas) return;

    const w = this.canvas.width;
    const h = this.canvas.height;

    // Background Water Gradient
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, this.selectedLocation.waterColor1);
    grad.addColorStop(1, this.selectedLocation.waterColor2);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Camera offset to track swimmer pack smoothly
    const leaderX = Math.max(this.player.x, this.ai.x);
    const cameraX = Math.max(0, leaderX * 14 - w * 0.35);

    ctx.save();
    ctx.translate(-cameraX, 0);

    const lane1Y = h * 0.42;
    const lane2Y = h * 0.72;

    // Split Markers along the 400m water track
    [100, 200, 300].forEach(m => {
      const splitX = m * 14;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(splitX, lane1Y - 70);
      ctx.lineTo(splitX, lane2Y + 70);
      ctx.stroke();

      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 12px Outfit, sans-serif';
      ctx.fillText(`🚩 ${m}M`, splitX - 18, lane1Y - 78);
    });

    // Swimming Lane Lines with floating Batak Gorga Buoys
    this.drawLaneRope(ctx, lane1Y - 55, cameraX, w);
    this.drawLaneRope(ctx, (lane1Y + lane2Y) / 2, cameraX, w, true);
    this.drawLaneRope(ctx, lane2Y + 55, cameraX, w);

    // Finish Line at 400M
    const finishScreenX = 400 * 14;
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(finishScreenX, lane1Y - 85);
    ctx.lineTo(finishScreenX, lane2Y + 85);
    ctx.stroke();

    // Checkered Finish Gate
    for (let y = lane1Y - 85; y < lane2Y + 85; y += 16) {
      ctx.fillStyle = (Math.floor(y / 16) % 2 === 0) ? '#fff' : '#111827';
      ctx.fillRect(finishScreenX - 5, y, 10, 16);
    }

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 16px Outfit, sans-serif';
    ctx.fillText('🏁 GARIS FINISH (400M)', finishScreenX - 85, lane1Y - 95);

    // Water Surface Wave Ripples
    const time = Date.now() * 0.003;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    ctx.lineWidth = 1.5;
    for (let r = 0; r < 8; r++) {
      ctx.beginPath();
      const waveY = (h / 9) * (r + 1);
      for (let x = cameraX - 50; x < cameraX + w + 50; x += 40) {
        const yOffset = Math.sin(x * 0.02 + time + r) * 6;
        if (x === cameraX - 50) ctx.moveTo(x, waveY + yOffset);
        else ctx.lineTo(x, waveY + yOffset);
      }
      ctx.stroke();
    }

    // Dynamic Bubbles & Splash particles
    this.bubbles.forEach((b, idx) => {
      b.x += b.vx * 0.2;
      b.y += b.vy * 0.2;
      b.alpha -= 0.02;

      ctx.beginPath();
      ctx.arc(b.x * 14, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = b.color;
      ctx.globalAlpha = Math.max(0, b.alpha);
      ctx.fill();
      ctx.globalAlpha = 1;

      if (b.alpha <= 0) this.bubbles.splice(idx, 1);
    });

    // Draw Swimmers
    this.drawRealisticSwimmer(ctx, this.player.x * 14, lane1Y, this.selectedChar, this.player, true);
    this.drawRealisticSwimmer(ctx, this.ai.x * 14, lane2Y, TobaData.aiOpponent, this.ai, false);

    ctx.restore();
  }

  drawLaneRope(ctx, y, cameraX, w, isCenter = false) {
    ctx.strokeStyle = isCenter ? 'rgba(245, 158, 11, 0.4)' : 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cameraX - 50, y);
    ctx.lineTo(cameraX + w + 50, y);
    ctx.stroke();

    const step = 28;
    const startIdx = Math.floor((cameraX - 50) / step);
    const endIdx = Math.ceil((cameraX + w + 50) / step);

    for (let i = startIdx; i <= endIdx; i++) {
      const bx = i * step;
      ctx.fillStyle = (i % 3 === 0) ? '#d90429' : (i % 3 === 1 ? '#f59e0b' : '#ffffff');
      ctx.beginPath();
      ctx.arc(bx, y, 4.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Hyper-Detailed 2D Freestyle Swimmer Renderer
  drawRealisticSwimmer(ctx, screenX, y, charData, entity, isPlayer) {
    ctx.save();
    ctx.translate(screenX, y);

    const isBoosting = entity.boosterActive > 0;
    const strokeAngle = entity.strokeCycle * Math.PI * 2;
    const kickAngle = entity.kickCycle * Math.PI * 2;

    // 1. Booster Aura & Propulsion Vortex
    if (isBoosting) {
      ctx.beginPath();
      ctx.arc(0, 0, 42, 0, Math.PI * 2);
      ctx.fillStyle = isPlayer ? 'rgba(245, 158, 11, 0.35)' : 'rgba(168, 85, 247, 0.45)';
      ctx.shadowBlur = 30;
      ctx.shadowColor = isPlayer ? '#f59e0b' : '#a855f7';
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // 2. White Water Splash Wake & Foam
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.beginPath();
    ctx.ellipse(-32, Math.sin(kickAngle) * 4, 22, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // 3. Feet & Leg Flutter Kicks
    const leg1Y = -4 + Math.sin(kickAngle) * 7;
    const leg2Y = 4 + Math.sin(kickAngle + Math.PI) * 7;
    const skin = charData.skinColor || '#d97706';

    // Left Leg
    ctx.fillStyle = skin;
    ctx.beginPath();
    ctx.ellipse(-28, leg1Y, 14, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Right Leg
    ctx.beginPath();
    ctx.ellipse(-28, leg2Y, 14, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Gear: Fins on Feet
    if (isPlayer && this.selectedGear.id === 'fins') {
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(-36, leg1Y - 4);
      ctx.lineTo(-48, leg1Y - 7);
      ctx.lineTo(-44, leg1Y + 4);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-36, leg2Y - 4);
      ctx.lineTo(-48, leg2Y - 7);
      ctx.lineTo(-44, leg2Y + 4);
      ctx.closePath();
      ctx.fill();
    }

    // 4. Swimmer Torso / Swimsuit with Body Roll
    ctx.save();
    ctx.rotate(entity.bodyRoll);

    ctx.fillStyle = charData.color || '#0284c7';
    ctx.beginPath();
    ctx.ellipse(0, 0, 24, 14, 0, 0, Math.PI * 2);
    ctx.fill();

    // Gear: Lifejacket Vest
    if (isPlayer && this.selectedGear.id === 'lifejacket') {
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(-12, -14, 24, 28);
      ctx.fillStyle = '#fff';
      ctx.fillRect(-12, -4, 24, 4);
    }

    // Gear: Pelampung Swim Ring
    if (isPlayer && this.selectedGear.id === 'pelampung') {
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(0, 0, 20, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 8;
      ctx.setLineDash([12, 12]);
      ctx.beginPath();
      ctx.arc(0, 0, 20, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // 5. Swimmer Head & Swim Cap
    ctx.fillStyle = charData.capColor || '#0369a1';
    ctx.beginPath();
    ctx.arc(16, 0, 10, 0, Math.PI * 2);
    ctx.fill();

    // Goggles
    ctx.fillStyle = charData.gogglesColor || '#38bdf8';
    ctx.fillRect(20, -5, 5, 10);

    ctx.restore();

    // 6. Articulated Freestyle Arms
    const arm1Phase = strokeAngle;
    const arm1X = 6 + Math.cos(arm1Phase) * 22;
    const arm1Y = -14 + Math.sin(arm1Phase) * 12;

    ctx.strokeStyle = skin;
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(8, -10);
    ctx.lineTo(arm1X, arm1Y);
    ctx.stroke();

    if (Math.sin(arm1Phase) > 0.8) {
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(arm1X, arm1Y, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    const arm2Phase = strokeAngle + Math.PI;
    const arm2X = 6 + Math.cos(arm2Phase) * 22;
    const arm2Y = 14 + Math.sin(arm2Phase) * 12;

    ctx.beginPath();
    ctx.moveTo(8, 10);
    ctx.lineTo(arm2X, arm2Y);
    ctx.stroke();

    if (Math.sin(arm2Phase) > 0.8) {
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(arm2X, arm2Y, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // 7. Name & Distance Badge Above Swimmer
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${charData.name} (${Math.floor(entity.x)}m)`, 0, -28);

    ctx.restore();
  }
}

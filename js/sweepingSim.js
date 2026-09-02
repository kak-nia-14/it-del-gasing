/**
 * Dormitory Simulator - Sweeping Simulator (Menyapu Kamar Asrama)
 * Room features:
 * - 3 Bunkbed bertingkat 2 (Total 6 ranjang)
 * - 1 Lemari 2 Pintu besar
 * - Jendela & Pintu Masuk dengan Pengki (Dustpan) & Tong Sampah
 * - Interactive Broom controls & dynamic dust particle physics
 */

class SweepingSimulator {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.width = 800;
    this.height = 550;

    this.broom = {
      x: 400,
      y: 350,
      targetX: 400,
      targetY: 350,
      angle: 0,
      radius: 35,
      isSweeping: false,
      lastSweepSoundTime: 0
    };

    this.dustParticles = [];
    this.totalDustCount = 45;
    this.cleanedDustCount = 0;
    this.isRunning = false;
    this.animationId = null;

    // Room Furniture Bounds
    this.furniture = [
      // 3 Bunkbeds (Bunkbed 1: Top-Left, Bunkbed 2: Top-Right, Bunkbed 3: Bottom-Left)
      { id: 'bunk1', name: '🛏️ Bunkbed 1 (Tingkat 2)', x: 40, y: 50, w: 180, h: 110, color: '#0369a1', frameColor: '#1e293b' },
      { id: 'bunk2', name: '🛏️ Bunkbed 2 (Tingkat 2)', x: 260, y: 50, w: 180, h: 110, color: '#0369a1', frameColor: '#1e293b' },
      { id: 'bunk3', name: '🛏️ Bunkbed 3 (Tingkat 2)', x: 40, y: 360, w: 180, h: 110, color: '#0369a1', frameColor: '#1e293b' },

      // Lemari 2 Pintu (Top Right corner / Right wall)
      { id: 'wardrobe', name: '🚪 Lemari 2 Pintu Asrama', x: 620, y: 50, w: 140, h: 220, color: '#475569', isWardrobe: true },

      // Pintu Masuk & Dustpan Target Area (Bottom Right)
      { id: 'dustpanArea', name: '🧹 Serokan Sampah (Pengki)', x: 640, y: 410, w: 120, h: 100, isDustpan: true }
    ];

    this.sparkles = [];
  }

  init() {
    this.canvas = document.getElementById('sweepingCanvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.setupCanvasSize();
    this.bindEvents();
    this.reset();
  }

  setupCanvasSize() {
    const container = this.canvas.parentElement;
    const rect = container ? container.getBoundingClientRect() : { width: 800 };
    const targetW = Math.min(850, Math.max(340, rect.width - 20));
    const targetH = Math.round(targetW * 0.65);

    this.canvas.width = targetW;
    this.canvas.height = targetH;
    this.width = targetW;
    this.height = targetH;

    // Rescale furniture proportionally
    const scaleX = targetW / 800;
    const scaleY = targetH / 550;

    this.furnitureLayout = [
      // Bunkbed 1 (Top Left)
      { id: 'bunk1', name: '🛏️ Bunkbed 1 (Tingkat 2)', x: 30 * scaleX, y: 35 * scaleY, w: 170 * scaleX, h: 100 * scaleY, label: 'Bunkbed 1' },
      // Bunkbed 2 (Top Center-Right)
      { id: 'bunk2', name: '🛏️ Bunkbed 2 (Tingkat 2)', x: 230 * scaleX, y: 35 * scaleY, w: 170 * scaleX, h: 100 * scaleY, label: 'Bunkbed 2' },
      // Bunkbed 3 (Bottom Left)
      { id: 'bunk3', name: '🛏️ Bunkbed 3 (Tingkat 2)', x: 30 * scaleX, y: 360 * scaleY, w: 170 * scaleX, h: 100 * scaleY, label: 'Bunkbed 3' },
      // Lemari 2 Pintu (Right Wall)
      { id: 'wardrobe', name: '🚪 Lemari 2 Pintu', x: 620 * scaleX, y: 35 * scaleY, w: 140 * scaleX, h: 220 * scaleY, isWardrobe: true, label: 'Lemari 2 Pintu' },
      // Dustpan (Bottom Right)
      { id: 'dustpanArea', name: '🧹 Pengki / Serokan', x: 640 * scaleX, y: 390 * scaleY, w: 120 * scaleX, h: 110 * scaleY, isDustpan: true, label: 'Pengki & Tong' }
    ];
  }

  reset() {
    this.setupCanvasSize();
    this.cleanedDustCount = 0;
    this.dustParticles = [];
    this.sparkles = [];

    // Spawn dust particles across walkable areas and under bunkbeds
    for (let i = 0; i < this.totalDustCount; i++) {
      let x, y;
      let valid = false;
      let attempts = 0;

      while (!valid && attempts < 100) {
        attempts++;
        x = 30 + Math.random() * (this.width - 60);
        y = 30 + Math.random() * (this.height - 60);

        // Don't spawn inside the wardrobe or directly inside the dustpan
        const inWardrobe = x > this.furnitureLayout[3].x && x < this.furnitureLayout[3].x + this.furnitureLayout[3].w &&
                           y > this.furnitureLayout[3].y && y < this.furnitureLayout[3].y + this.furnitureLayout[3].h;
        const inDustpan = x > this.furnitureLayout[4].x && y > this.furnitureLayout[4].y;

        if (!inWardrobe && !inDustpan) {
          valid = true;
        }
      }

      const types = ['dust', 'crumb', 'paper', 'fluff'];
      const type = types[Math.floor(Math.random() * types.length)];

      this.dustParticles.push({
        x: x,
        y: y,
        vx: 0,
        vy: 0,
        radius: type === 'dust' ? 3.5 : (type === 'paper' ? 5 : 4),
        type: type,
        color: type === 'dust' ? '#94a3b8' : (type === 'crumb' ? '#d97706' : (type === 'paper' ? '#f8fafc' : '#64748b')),
        isCleaned: false,
        opacity: 1
      });
    }

    this.broom.x = this.width / 2;
    this.broom.y = this.height / 2;
    this.broom.targetX = this.broom.x;
    this.broom.targetY = this.broom.y;

    this.updateCleanlinessMeter();

    if (!this.isRunning) {
      this.isRunning = true;
      this.loop();
    }
  }

  bindEvents() {
    if (!this.canvas) return;

    const handlePointerMove = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      this.broom.targetX = clientX - rect.left;
      this.broom.targetY = clientY - rect.top;
      this.broom.isSweeping = true;
    };

    this.canvas.addEventListener('mousemove', handlePointerMove);
    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      handlePointerMove(e);
    }, { passive: false });

    this.canvas.addEventListener('mousedown', () => {
      this.broom.isSweeping = true;
    });

    window.addEventListener('resize', () => {
      if (document.getElementById('sweepingView')?.classList.contains('active')) {
        this.setupCanvasSize();
      }
    });
  }

  update() {
    // Smooth broom tracking
    const dx = this.broom.targetX - this.broom.x;
    const dy = this.broom.targetY - this.broom.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    this.broom.x += dx * 0.3;
    this.broom.y += dy * 0.3;

    if (dist > 2) {
      this.broom.angle = Math.atan2(dy, dx) + Math.PI / 2;

      // Play sweep sound intermittently
      const now = Date.now();
      if (now - this.broom.lastSweepSoundTime > 240) {
        window.sound.playSweep();
        this.broom.lastSweepSoundTime = now;
      }
    }

    const dustpan = this.furnitureLayout[4];

    // Update Dust Particles physics & sweeping collision
    this.dustParticles.forEach(p => {
      if (p.isCleaned) return;

      // Distance from broom head
      const pBroomDx = p.x - this.broom.x;
      const pBroomDy = p.y - this.broom.y;
      const pBroomDist = Math.sqrt(pBroomDx * pBroomDx + pBroomDy * pBroomDy);

      // Swept by broom
      if (pBroomDist < this.broom.radius) {
        const pushForce = (this.broom.radius - pBroomDist) / this.broom.radius;
        const pushAngle = Math.atan2(pBroomDy, pBroomDx);

        p.vx += Math.cos(pushAngle) * pushForce * 6 + (dx * 0.15);
        p.vy += Math.sin(pushAngle) * pushForce * 6 + (dy * 0.15);

        // Sweep streak sound
        if (Math.random() < 0.08) {
          window.sound.playDustCollect();
        }
      }

      // Apply velocity and friction
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.85;
      p.vy *= 0.85;

      // Keep inside room bounds
      p.x = Math.max(15, Math.min(this.width - 15, p.x));
      p.y = Math.max(15, Math.min(this.height - 15, p.y));

      // Check if pushed into Dustpan
      if (dustpan && p.x >= dustpan.x && p.x <= dustpan.x + dustpan.w &&
          p.y >= dustpan.y && p.y <= dustpan.y + dustpan.h) {
        p.isCleaned = true;
        this.cleanedDustCount++;
        window.sound.playDustCollect();
        this.createSparkles(p.x, p.y);
        this.updateCleanlinessMeter();
      }

      // If swept thoroughly in open area (high friction count), auto collect
      if (pBroomDist < 20 && Math.abs(dx) + Math.abs(dy) > 15) {
        if (Math.random() < 0.12) {
          p.isCleaned = true;
          this.cleanedDustCount++;
          window.sound.playDustCollect();
          this.createSparkles(p.x, p.y);
          this.updateCleanlinessMeter();
        }
      }
    });

    // Update sparkles
    for (let i = this.sparkles.length - 1; i >= 0; i--) {
      const s = this.sparkles[i];
      s.x += s.vx;
      s.y += s.vy;
      s.life -= 0.03;
      if (s.life <= 0) {
        this.sparkles.splice(i, 1);
      }
    }
  }

  createSparkles(x, y) {
    for (let i = 0; i < 5; i++) {
      this.sparkles.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        color: ['#fbbf24', '#38bdf8', '#ffffff', '#4ade80'][Math.floor(Math.random() * 4)],
        size: 2 + Math.random() * 3,
        life: 1
      });
    }
  }

  updateCleanlinessMeter() {
    const percent = Math.min(100, Math.round((this.cleanedDustCount / this.totalDustCount) * 100));
    const bar = document.getElementById('sweepProgressBar');
    const text = document.getElementById('sweepProgressText');

    if (bar) bar.style.width = `${percent}%`;
    if (text) text.innerText = `Kebersihan Lantai: ${percent}% (${this.cleanedDustCount}/${this.totalDustCount} Debu)`;

    if (this.cleanedDustCount >= this.totalDustCount && percent >= 100) {
      window.sound.playSuccess();
      const modal = document.getElementById('sweepingSuccessModal');
      if (modal && !modal.classList.contains('show')) {
        modal.classList.add('show');
      }
    }
  }

  draw() {
    if (!this.ctx) return;
    const ctx = this.ctx;

    // 1. Draw Dorm Floor Tile Grid
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    const tileSize = 40;
    for (let x = 0; x < this.width; x += tileSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);
      ctx.stroke();
    }
    for (let y = 0; y < this.height; y += tileSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
      ctx.stroke();
    }

    // Wall Borders
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 8;
    ctx.strokeRect(4, 4, this.width - 8, this.height - 8);

    // 2. Draw Furniture (3 Bunkbeds, 1 Wardrobe 2-door, Dustpan)
    this.furnitureLayout.forEach(f => {
      if (f.isWardrobe) {
        // Draw 2-door Wardrobe (Lemari 2 Pintu)
        ctx.fillStyle = '#334155';
        ctx.fillRect(f.x, f.y, f.w, f.h);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 3;
        ctx.strokeRect(f.x, f.y, f.w, f.h);

        // 2 Doors divider
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(f.x + f.w / 2, f.y);
        ctx.lineTo(f.x + f.w / 2, f.y + f.h);
        ctx.stroke();

        // 2 Door Handles
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(f.x + f.w / 2 - 8, f.y + f.h / 2 - 12, 4, 24);
        ctx.fillRect(f.x + f.w / 2 + 4, f.y + f.h / 2 - 12, 4, 24);

        // Label
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 11px Outfit, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('LEMARI 2 PINTU', f.x + f.w / 2, f.y + 24);
        ctx.fillText('ASRAMA', f.x + f.w / 2, f.y + 38);
      } else if (f.isDustpan) {
        // Dustpan / Trash Station
        ctx.fillStyle = 'rgba(2, 132, 199, 0.2)';
        ctx.fillRect(f.x, f.y, f.w, f.h);
        ctx.strokeStyle = '#0284c7';
        ctx.setLineDash([6, 4]);
        ctx.lineWidth = 2;
        ctx.strokeRect(f.x, f.y, f.w, f.h);
        ctx.setLineDash([]);

        // Dustpan Icon / graphics
        ctx.fillStyle = '#0284c7';
        ctx.beginPath();
        ctx.arc(f.x + f.w / 2, f.y + f.h / 2 - 8, 22, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = '18px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🧹', f.x + f.w / 2, f.y + f.h / 2 - 2);

        ctx.font = 'bold 11px Outfit, sans-serif';
        ctx.fillStyle = '#38bdf8';
        ctx.fillText('SEROKAN SAMPAN', f.x + f.w / 2, f.y + f.h - 14);
      } else {
        // 3 Bunkbeds (Tingkat 2)
        // Shadow/Kolong area underneath
        ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
        ctx.fillRect(f.x + 4, f.y + 4, f.w - 8, f.h - 8);

        // Bed Frame
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(f.x, f.y, f.w, f.h);
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 3;
        ctx.strokeRect(f.x, f.y, f.w, f.h);

        // Mattress Sheet (Navy/Blue)
        ctx.fillStyle = '#0369a1';
        ctx.fillRect(f.x + 8, f.y + 8, f.w - 16, f.h - 16);

        // Pillows (Top bunk & Bottom bunk representation)
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(f.x + 12, f.y + 12, 35, 25); // Top pillow
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.strokeRect(f.x + 12, f.y + 12, 35, 25);

        // Bed Ladder
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2.5;
        for (let step = 0; step < 4; step++) {
          ctx.beginPath();
          ctx.moveTo(f.x + f.w - 18, f.y + 15 + step * 20);
          ctx.lineTo(f.x + f.w - 6, f.y + 15 + step * 20);
          ctx.stroke();
        }

        // Bunkbed Label
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px Outfit, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(f.label, f.x + f.w / 2, f.y + f.h / 2 + 4);
        ctx.font = '9px Outfit, sans-serif';
        ctx.fillStyle = '#93c5fd';
        ctx.fillText('(Kasur Tingkat 2)', f.x + f.w / 2, f.y + f.h / 2 + 18);
      }
    });

    // 3. Draw Dust Particles
    this.dustParticles.forEach(p => {
      if (p.isCleaned) return;

      ctx.save();
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;

      if (p.type === 'paper') {
        ctx.fillRect(p.x - p.radius, p.y - p.radius, p.radius * 2, p.radius * 1.5);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });

    // 4. Draw Sparkles
    this.sparkles.forEach(s => {
      ctx.save();
      ctx.fillStyle = s.color;
      ctx.globalAlpha = s.life;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // 5. Draw Broom Tool at Cursor
    ctx.save();
    ctx.translate(this.broom.x, this.broom.y);
    ctx.rotate(this.broom.angle);

    // Broom Bristle Arc
    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.ellipse(0, 0, 24, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Broom Stick
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(-3, -45, 6, 45);
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(-3, -45, 6, 45);

    // Red Joint cap
    ctx.fillStyle = '#e11d48';
    ctx.fillRect(-6, -4, 12, 6);

    ctx.restore();
  }

  loop() {
    if (!this.isRunning) return;
    this.update();
    this.draw();
    this.animationId = requestAnimationFrame(() => this.loop());
  }

  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

window.sweepingSim = new SweepingSimulator();

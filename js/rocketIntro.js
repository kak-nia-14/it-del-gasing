/**
 * SkyViewDel - Cinematic Rocket Launch Intro & Welcome Transition
 * Efek partikel semburan api, kepulan asap volumetrik, getaran kamera (screen shake),
 * dan transisi menembus awan menuju layar sambutan SkyViewDel.
 */

import { soundFx } from './audio.js';

export class RocketIntroController {
  constructor(containerId, onCompleteCallback) {
    this.container = document.getElementById(containerId);
    this.canvas = document.getElementById('rocket-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.onComplete = onCompleteCallback;

    this.particles = [];
    this.clouds = [];
    this.stars = [];
    this.state = 'idle'; // 'idle' -> 'launching' -> 'clouds' -> 'space' -> 'ready'
    this.progress = 0;
    this.shakeAmount = 0;
    this.rocketY = 0;
    this.rocketVelocity = 0;
    this.animationFrameId = null;

    this.init();
  }

  init() {
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    this.initStars();
    this.initClouds();

    this.rocketY = this.canvas.height * 0.72;
    this.rocketVelocity = 0;

    this.renderInitialScene();
  }

  resizeCanvas() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  initStars() {
    this.stars = [];
    const count = 150;
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.02 + 0.01
      });
    }
  }

  initClouds() {
    this.clouds = [];
    const cloudCount = 18;
    for (let i = 0; i < cloudCount; i++) {
      this.clouds.push({
        x: (Math.random() - 0.5) * this.canvas.width * 1.5 + this.canvas.width / 2,
        y: this.canvas.height + Math.random() * 400 + i * 80,
        radius: Math.random() * 80 + 70,
        alpha: Math.random() * 0.4 + 0.4,
        speedY: 0
      });
    }
  }

  startLaunch() {
    if (this.state !== 'idle') return;
    this.state = 'launching';
    soundFx.playRocketLaunch(4.5);

    // Fade out launch prompt if any
    const prompt = document.getElementById('launch-prompt');
    if (prompt) prompt.classList.add('fade-out');

    let startTime = performance.now();
    const duration = 4800; // 4.8 detik

    const animate = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);

      this.updatePhysics(t);
      this.draw(t);

      if (t < 1) {
        this.animationFrameId = requestAnimationFrame(animate);
      } else {
        this.showWelcomeScreen();
      }
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  updatePhysics(t) {
    // Percepatan roket eksponensial
    if (t < 0.2) {
      // Fase ignition & getaran awal
      this.shakeAmount = (t / 0.2) * 12;
      this.rocketVelocity = 0.5;
    } else if (t < 0.65) {
      // Fase percepatan naik menembus troposfer
      this.shakeAmount = 10 * (1 - (t - 0.2) / 0.45);
      this.rocketVelocity += 0.45;
      this.rocketY -= this.rocketVelocity;
    } else {
      // Menembus stratosfer ke luar angkasa
      this.shakeAmount = 2;
      this.rocketVelocity += 0.8;
      this.rocketY -= this.rocketVelocity;
    }

    // Spawn flame & smoke particles
    const nozzleX = this.canvas.width / 2;
    const nozzleY = this.rocketY + 95;

    // Partikel api bertekanan tinggi
    for (let i = 0; i < 7; i++) {
      this.particles.push({
        x: nozzleX + (Math.random() - 0.5) * 16,
        y: nozzleY,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 12 + 8,
        size: Math.random() * 14 + 10,
        color: ['#ffffff', '#fef08a', '#fbbf24', '#f97316', '#ef4444'][Math.floor(Math.random() * 5)],
        alpha: 1.0,
        decay: Math.random() * 0.04 + 0.03,
        type: 'fire'
      });
    }

    // Partikel asap mengembang
    if (t < 0.7) {
      for (let i = 0; i < 4; i++) {
        this.particles.push({
          x: nozzleX + (Math.random() - 0.5) * 30,
          y: nozzleY + Math.random() * 20,
          vx: (Math.random() - 0.5) * 6,
          vy: Math.random() * 4 + 2,
          size: Math.random() * 25 + 15,
          color: '#cbd5e1',
          alpha: 0.6,
          decay: Math.random() * 0.015 + 0.01,
          type: 'smoke'
        });
      }
    }

    // Update partikel
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.size += p.type === 'smoke' ? 0.9 : -0.2;
      p.alpha -= p.decay;

      if (p.alpha <= 0 || p.size <= 0) {
        this.particles.splice(i, 1);
      }
    }

    // Update awan saat roket menembus
    if (t > 0.35) {
      this.clouds.forEach(c => {
        c.y -= (this.rocketVelocity * 1.2);
      });
    }
  }

  draw(t) {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    ctx.save();

    // Screen Shake effect
    if (this.shakeAmount > 0) {
      const shakeX = (Math.random() - 0.5) * this.shakeAmount;
      const shakeY = (Math.random() - 0.5) * this.shakeAmount;
      ctx.translate(shakeX, shakeY);
    }

    // Background Gradient: dari senja/langit bumi -> transisi ke antariksa pekat
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    if (t < 0.4) {
      bgGrad.addColorStop(0, '#0c1a30');
      bgGrad.addColorStop(0.5, '#1e293b');
      bgGrad.addColorStop(1, '#334155');
    } else {
      const spaceBlend = Math.min((t - 0.4) / 0.5, 1);
      bgGrad.addColorStop(0, '#030712');
      bgGrad.addColorStop(0.5, this.lerpColor('#0c1a30', '#050b14', spaceBlend));
      bgGrad.addColorStop(1, this.lerpColor('#334155', '#0a0f24', spaceBlend));
    }

    ctx.fillStyle = bgGrad;
    ctx.fillRect(-20, -20, w + 40, h + 40);

    // Gambar bintang yang semakin terlihat saat naik ke orbit
    const starAlphaMultiplier = Math.min(t * 1.5, 1);
    this.stars.forEach(s => {
      ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha * starAlphaMultiplier})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // Gambar asap partikel
    this.particles.forEach(p => {
      if (p.type === 'smoke') {
        ctx.fillStyle = `rgba(203, 213, 225, ${p.alpha * 0.4})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, p.size), 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Gambar api semburan partikel (additive glow)
    ctx.globalCompositeOperation = 'lighter';
    this.particles.forEach(p => {
      if (p.type === 'fire') {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, p.size), 0, Math.PI * 2);
        ctx.fill();
      }
    });
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1.0;

    // Gambar Roket Futuristik Astronot
    if (this.rocketY > -200) {
      this.drawAstronautRocket(w / 2, this.rocketY);
    }

    // Gambar awan stratosfer
    this.clouds.forEach(c => {
      if (c.y > -200 && c.y < h + 200) {
        const cloudGrad = ctx.createRadialGradient(c.x, c.y, 10, c.x, c.y, c.radius);
        cloudGrad.addColorStop(0, `rgba(255, 255, 255, ${c.alpha * 0.6})`);
        cloudGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = cloudGrad;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Radial Speed Lines saat kecepatan tinggi (t > 0.5)
    if (t > 0.45 && t < 0.9) {
      this.drawSpeedLines(w, h, (t - 0.45) / 0.45);
    }

    ctx.restore();
  }

  drawAstronautRocket(x, y) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(x, y);

    // Body Roket Elegan (Putih Titanium & Emas Astronot)
    // Kerucut Kepala (Capsule Nosecone)
    ctx.beginPath();
    ctx.moveTo(0, -90);
    ctx.quadraticCurveTo(18, -45, 16, 0);
    ctx.lineTo(-16, 0);
    ctx.quadraticCurveTo(-18, -45, 0, -90);
    ctx.fillStyle = '#f8fafc';
    ctx.fill();
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Kaca Visor Astronot (Gold Reflection)
    const visorGrad = ctx.createLinearGradient(-8, -45, 8, -25);
    visorGrad.addColorStop(0, '#fde047');
    visorGrad.addColorStop(0.5, '#f59e0b');
    visorGrad.addColorStop(1, '#b45309');
    ctx.fillStyle = visorGrad;
    ctx.beginPath();
    ctx.ellipse(0, -38, 7, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Silinder Badan Roket (Fuselage)
    const bodyGrad = ctx.createLinearGradient(-16, 0, 16, 0);
    bodyGrad.addColorStop(0, '#e2e8f0');
    bodyGrad.addColorStop(0.3, '#ffffff');
    bodyGrad.addColorStop(0.7, '#f8fafc');
    bodyGrad.addColorStop(1, '#94a3b8');

    ctx.fillStyle = bodyGrad;
    ctx.fillRect(-16, 0, 32, 80);

    // Garis Aksen Emas & Biru Kosmik
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(-16, 12, 32, 4);

    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(-16, 65, 32, 4);

    // Teks Logo Badan
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 8px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('DEL-1', 0, 42);

    // Sayap Kiri & Kanan (Fins)
    // Sayap Kiri
    ctx.beginPath();
    ctx.moveTo(-16, 40);
    ctx.lineTo(-34, 85);
    ctx.lineTo(-16, 80);
    ctx.closePath();
    ctx.fillStyle = '#0284c7';
    ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Sayap Kanan
    ctx.beginPath();
    ctx.moveTo(16, 40);
    ctx.lineTo(34, 85);
    ctx.lineTo(16, 80);
    ctx.closePath();
    ctx.fillStyle = '#0284c7';
    ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Nozzle Pendorong Mesin Roket (Thruster Nozzle)
    ctx.beginPath();
    ctx.moveTo(-12, 80);
    ctx.lineTo(-15, 95);
    ctx.lineTo(15, 95);
    ctx.lineTo(12, 80);
    ctx.closePath();
    ctx.fillStyle = '#334155';
    ctx.fill();

    // Pijar Nozzle Dalam (Thruster Glow)
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.ellipse(0, 95, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  drawSpeedLines(w, h, intensity) {
    const ctx = this.ctx;
    ctx.strokeStyle = `rgba(186, 230, 253, ${intensity * 0.45})`;
    ctx.lineWidth = 1.5;

    for (let i = 0; i < 20; i++) {
      const lineX = (i / 20) * w + (Math.random() - 0.5) * 40;
      const lineLen = Math.random() * 120 + 80;
      const lineY = Math.random() * (h - lineLen);

      ctx.beginPath();
      ctx.moveTo(lineX, lineY);
      ctx.lineTo(lineX, lineY + lineLen);
      ctx.stroke();
    }
  }

  renderInitialScene() {
    this.draw(0);
  }

  showWelcomeScreen() {
    this.state = 'ready';
    soundFx.playWhoosh();

    const welcomeOverlay = document.getElementById('welcome-overlay');
    if (welcomeOverlay) {
      welcomeOverlay.classList.remove('hidden');
      welcomeOverlay.classList.add('visible');
    }

    // Sound ambient starts
    soundFx.startAmbientMusic();
  }

  lerpColor(a, b, amount) {
    const ah = parseInt(a.replace(/#/g, ''), 16),
      ar = ah >> 16, ag = (ah >> 8) & 0xff, ab = ah & 0xff,
      bh = parseInt(b.replace(/#/g, ''), 16),
      br = bh >> 16, bg = (bh >> 8) & 0xff, bb = bh & 0xff,
      rr = Math.round(ar + amount * (br - ar)),
      rg = Math.round(ag + amount * (bg - ag)),
      rb = Math.round(ab + amount * (bb - ab));

    return `#${((1 << 24) + (rr << 16) + (rg << 8) + rb).toString(16).slice(1)}`;
  }

  hide() {
    if (this.container) {
      this.container.classList.add('fade-out-all');
      setTimeout(() => {
        this.container.style.display = 'none';
        if (this.onComplete) this.onComplete();
      }, 900);
    }
  }
}

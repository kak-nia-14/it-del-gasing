/**
 * SMA DEVIL - Game Physics & Rendering Engine
 * Handles Player Physics, Collisions, Traps, Particles, and Canvas rendering.
 */

class Particle {
  constructor(x, y, vx, vy, color, size, life) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.size = size;
    this.maxLife = life;
    this.life = life;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.15; // Gravity
    this.life--;
  }

  draw(ctx) {
    const alpha = Math.max(0, this.life / this.maxLife);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class Player {
  constructor(x, y, engine) {
    this.engine = engine;
    this.spawnX = x;
    this.spawnY = y;
    this.x = x;
    this.y = y;
    this.w = 18;
    this.h = 42;
    this.vx = 0;
    this.vy = 0;
    this.facing = 1; // 1: Right, -1: Left
    this.isGrounded = false;
    this.coyoteTime = 0;
    this.jumpBuffer = 0;
    this.isDead = false;
    this.isWon = false;
    this.state = 'idle'; // 'idle', 'run', 'jump', 'fall', 'dead', 'win'
    this.animTime = 0;
    this.deathTimer = 0;
    this.winTimer = 0;
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
    this.spawnX = x;
    this.spawnY = y;
    this.vx = 0;
    this.vy = 0;
    this.facing = 1;
    this.isGrounded = false;
    this.isDead = false;
    this.isWon = false;
    this.state = 'idle';
    this.animTime = 0;
    this.deathTimer = 0;
    this.winTimer = 0;
  }

  die(reason = "Kena jebakan!") {
    if (this.isDead || this.isWon) return;
    this.isDead = true;
    this.state = 'dead';
    this.deathTimer = 45; // ~0.75s respawn
    window.sound.playDeath();
    this.engine.shake(12);

    // Spawn death particles
    for (let i = 0; i < 24; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      const colors = ['#f43f5e', '#ffffff', '#8b5cf6', '#38bdf8'];
      this.engine.particles.push(new Particle(
        this.x, this.y - 20,
        Math.cos(angle) * speed, Math.sin(angle) * speed - 2,
        colors[Math.floor(Math.random() * colors.length)],
        2 + Math.random() * 3,
        30 + Math.random() * 20
      ));
    }

    if (this.engine.onPlayerDeath) {
      this.engine.onPlayerDeath(reason);
    }
  }

  win() {
    if (this.isWon || this.isDead) return;
    this.isWon = true;
    this.state = 'win';
    this.vx = 0;
    this.vy = -3;
    window.sound.playVictory();

    // Spawn victory confetti particles
    for (let i = 0; i < 40; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.5;
      const speed = 3 + Math.random() * 6;
      const colors = ['#38bdf8', '#8b5cf6', '#c084fc', '#ffffff', '#fbbf24'];
      this.engine.particles.push(new Particle(
        this.x, this.y - 20,
        Math.cos(angle) * speed, Math.sin(angle) * speed,
        colors[Math.floor(Math.random() * colors.length)],
        3 + Math.random() * 3,
        50 + Math.random() * 30
      ));
    }

    if (this.engine.onLevelComplete) {
      this.engine.onLevelComplete();
    }
  }

  update(input, level) {
    this.animTime++;

    if (this.isDead) {
      this.deathTimer--;
      if (this.deathTimer <= 0) {
        this.engine.reloadCurrentLevel();
      }
      return;
    }

    if (this.isWon) {
      return;
    }

    const invertedGravity = level.invertedGravity || false;
    const gravityForce = invertedGravity ? -0.55 : 0.55;
    const maxFallSpeed = 11;
    const accel = level.slippery ? 0.25 : 0.8;
    const friction = level.slippery ? 0.98 : 0.78;
    const moveSpeed = 4.2;

    // Handle Input (with Reversed Controls check)
    let moveDir = 0;
    let leftPressed = input.left;
    let rightPressed = input.right;

    if (level.reversedControls) {
      // Swap left & right!
      const tmp = leftPressed;
      leftPressed = rightPressed;
      rightPressed = tmp;
    }

    if (leftPressed) moveDir -= 1;
    if (rightPressed) moveDir += 1;

    // Horizontal Movement
    if (moveDir !== 0) {
      this.vx += moveDir * accel;
      if (Math.abs(this.vx) > moveSpeed) {
        this.vx = Math.sign(this.vx) * moveSpeed;
      }
      this.facing = moveDir;
      if (this.isGrounded) {
        this.state = 'run';
        // Spawn footstep dust
        if (this.animTime % 7 === 0) {
          this.engine.particles.push(new Particle(
            this.x - this.facing * 6, this.y,
            -this.facing * 0.5, -0.5,
            'rgba(255, 255, 255, 0.4)', 2, 12
          ));
        }
      }
    } else {
      this.vx *= friction;
      if (Math.abs(this.vx) < 0.1) this.vx = 0;
      if (this.isGrounded) this.state = 'idle';
    }

    // Jump Buffering & Coyote Time
    if (this.isGrounded) {
      this.coyoteTime = 6;
    } else {
      if (this.coyoteTime > 0) this.coyoteTime--;
    }

    if (input.jumpJustPressed) {
      this.jumpBuffer = 6;
    } else if (this.jumpBuffer > 0) {
      this.jumpBuffer--;
    }

    // Execute Jump
    if (this.jumpBuffer > 0 && this.coyoteTime > 0) {
      const jumpPower = invertedGravity ? 9.8 : -9.8;
      this.vy = jumpPower;
      this.jumpBuffer = 0;
      this.coyoteTime = 0;
      this.isGrounded = false;
      window.sound.playJump();

      // Jump burst particles
      for (let i = 0; i < 6; i++) {
        this.engine.particles.push(new Particle(
          this.x + (Math.random() - 0.5) * 12, this.y,
          (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 1.5,
          'rgba(139, 92, 246, 0.6)', 2.5, 15
        ));
      }
    }

    // Variable Jump Height (cut jump short if button released)
    if (!input.jump && (invertedGravity ? this.vy > 2 : this.vy < -2)) {
      this.vy *= 0.65;
    }

    // Apply Gravity
    this.vy += gravityForce;
    if (Math.abs(this.vy) > maxFallSpeed) {
      this.vy = Math.sign(this.vy) * maxFallSpeed;
    }

    if (!this.isGrounded) {
      this.state = (invertedGravity ? this.vy < 0 : this.vy > 0) ? 'fall' : 'jump';
    }

    // Move & Collision Resolution
    this.moveX(level);
    this.moveY(level, invertedGravity);

    // Check Spikes Collision
    this.checkSpikes(level);

    // Check Door (Win) Collision
    this.checkDoor(level);

    // Out of bounds check
    if (this.y > 560 || this.y < -120) {
      this.die("Jatuh ke jurang!");
    }
  }

  moveX(level) {
    this.x += this.vx;
    const halfW = this.w / 2;

    level.blocks.forEach(b => {
      if (b.active === false) return;
      if (
        this.x + halfW > b.x &&
        this.x - halfW < b.x + b.w &&
        this.y > b.y &&
        this.y - this.h < b.y + b.h
      ) {
        if (this.vx > 0) {
          this.x = b.x - halfW;
          this.vx = 0;
        } else if (this.vx < 0) {
          this.x = b.x + b.w + halfW;
          this.vx = 0;
        }
      }
    });
  }

  moveY(level, invertedGravity) {
    this.y += this.vy;
    const halfW = this.w / 2;
    this.isGrounded = false;

    level.blocks.forEach(b => {
      if (b.active === false) return;
      if (
        this.x + halfW - 3 > b.x &&
        this.x - halfW + 3 < b.x + b.w &&
        this.y >= b.y &&
        this.y - this.h <= b.y + b.h
      ) {
        if (!invertedGravity) {
          // Normal Gravity (Falling down onto block)
          if (this.vy > 0 && this.y - this.vy <= b.y + 4) {
            this.y = b.y;
            this.vy = 0;
            this.isGrounded = true;
          } else if (this.vy < 0) {
            // Hitting ceiling
            this.y = b.y + b.h + this.h;
            this.vy = 0;
          }
        } else {
          // Inverted Gravity (Falling UP onto ceiling block)
          if (this.vy < 0 && (this.y - this.h) - this.vy >= b.y + b.h - 4) {
            this.y = b.y + b.h + this.h;
            this.vy = 0;
            this.isGrounded = true;
          } else if (this.vy > 0) {
            // Hitting floor
            this.y = b.y;
            this.vy = 0;
          }
        }
      }
    });
  }

  checkSpikes(level) {
    if (this.isDead || !level.spikes) return;
    const halfW = this.w / 2 - 2;

    level.spikes.forEach(s => {
      const spikeW = s.size || 20;
      const spikeH = s.size || 20;
      if (
        this.x + halfW > s.x &&
        this.x - halfW < s.x + spikeW &&
        this.y > s.y &&
        this.y - this.h < s.y + spikeH
      ) {
        this.die("Tertusuk jebakan duri!");
      }
    });
  }

  checkDoor(level) {
    if (this.isDead || this.isWon || !level.door) return;
    const door = level.door;
    if (
      this.x + this.w / 2 > door.x &&
      this.x - this.w / 2 < door.x + door.width &&
      this.y >= door.y &&
      this.y - this.h <= door.y + door.height + 10
    ) {
      this.win();
    }
  }
}

class GameEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.width = 800;
    this.height = 480;

    this.charRenderer = new CharacterRenderer();
    this.currentLevelIndex = 0;
    this.currentLevel = null;
    this.player = new Player(60, 380, this);
    this.particles = [];
    this.shakeIntensity = 0;

    // Input States
    this.input = {
      left: false,
      right: false,
      jump: false,
      jumpJustPressed: false
    };

    // Callbacks
    this.onPlayerDeath = null;
    this.onLevelComplete = null;

    this.initCanvasSize();
    this.initInput();
    this.loadLevel(0);
  }

  initCanvasSize() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  initInput() {
    window.addEventListener('keydown', (e) => {
      if (['ArrowUp', 'KeyW', 'Space'].includes(e.code)) {
        if (!this.input.jump) this.input.jumpJustPressed = true;
        this.input.jump = true;
        e.preventDefault();
      }
      if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        this.input.left = true;
        e.preventDefault();
      }
      if (['ArrowRight', 'KeyD'].includes(e.code)) {
        this.input.right = true;
        e.preventDefault();
      }
      if (e.code === 'KeyR') {
        this.reloadCurrentLevel();
      }
    });

    window.addEventListener('keyup', (e) => {
      if (['ArrowUp', 'KeyW', 'Space'].includes(e.code)) {
        this.input.jump = false;
        this.input.jumpJustPressed = false;
      }
      if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        this.input.left = false;
      }
      if (['ArrowRight', 'KeyD'].includes(e.code)) {
        this.input.right = false;
      }
    });
  }

  shake(amount = 8) {
    this.shakeIntensity = amount;
  }

  loadLevel(index) {
    if (!window.GAME_LEVELS || !window.GAME_LEVELS[index]) return;
    this.currentLevelIndex = index;
    // Deep clone level definition
    this.currentLevel = JSON.parse(JSON.stringify(window.GAME_LEVELS[index]));
    
    // Re-attach trap logic functions from definitions
    const origLevel = window.GAME_LEVELS[index];
    if (origLevel.traps) {
      this.currentLevel.traps = origLevel.traps;
    }

    this.player.reset(this.currentLevel.spawn.x, this.currentLevel.spawn.y);
    this.particles = [];
  }

  reloadCurrentLevel() {
    this.loadLevel(this.currentLevelIndex);
  }

  update() {
    if (!this.currentLevel) return;

    // Run Level Troll Traps
    if (this.currentLevel.traps) {
      this.currentLevel.traps.forEach(trap => {
        if (trap.update) {
          trap.update(this.currentLevel, this.player);
        }
      });
    }

    // Update Player
    this.player.update(this.input, this.currentLevel);
    this.input.jumpJustPressed = false;

    // Update Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.update();
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }

    // Decay Shake
    if (this.shakeIntensity > 0) {
      this.shakeIntensity *= 0.85;
      if (this.shakeIntensity < 0.5) this.shakeIntensity = 0;
    }
  }

  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    ctx.save();
    // Screen Shake offset
    if (this.shakeIntensity > 0) {
      const ox = (Math.random() - 0.5) * this.shakeIntensity;
      const oy = (Math.random() - 0.5) * this.shakeIntensity;
      ctx.translate(ox, oy);
    }

    // 1. Draw School Classroom / Hallway Background
    this.renderBackground(ctx);

    // 2. Draw Solid Platforms / Blocks (with Neon Blue-Purple Theme)
    this.renderBlocks(ctx);

    // 3. Draw Hazards & Crystals
    this.renderHazardsAndCrystals(ctx);

    // 4. Draw Spikes
    this.renderSpikes(ctx);

    // 5. Draw Exit Door
    if (this.currentLevel.door) {
      const d = this.currentLevel.door;
      CharacterRenderer.drawDoor(ctx, d.x, d.y, d.width, d.height, this.player.isWon, this.player.animTime * 0.1);
    }

    // 6. Draw Fake Doors if present
    if (this.currentLevel.fakeDoors) {
      this.currentLevel.fakeDoors.forEach(fd => {
        CharacterRenderer.drawDoor(ctx, fd.x, fd.y, fd.width, fd.height, false, 0);
      });
    }

    // 7. Draw Player Character
    this.charRenderer.draw(
      ctx,
      this.player.x,
      this.player.y,
      this.player.facing,
      this.player.state,
      this.player.animTime,
      this.currentLevel.invertedGravity
    );

    // 8. Draw Particles
    this.particles.forEach(p => p.draw(ctx));

    // 9. Darkness Mode Spotlight (Level 7)
    if (this.currentLevel.darknessMode) {
      this.renderDarknessSpotlight(ctx);
    }

    // 10. Searchlight Beams (Level 14)
    if (this.currentLevel.searchlights) {
      this.renderSearchlights(ctx);
    }

    ctx.restore();
  }

  renderBackground(ctx) {
    // Elegant Deep Blue & Violet Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, this.height);
    bgGrad.addColorStop(0, '#090d1a');
    bgGrad.addColorStop(0.5, '#0f172a');
    bgGrad.addColorStop(1, '#070a14');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, this.width, this.height);

    // Grid pattern
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < this.width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);
      ctx.stroke();
    }
    for (let y = 0; y < this.height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
      ctx.stroke();
    }

    // Classroom Whiteboard / Poster in background
    ctx.fillStyle = 'rgba(30, 41, 59, 0.35)';
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
    ctx.beginPath();
    ctx.roundRect(80, 80, 220, 110, [6]);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.font = 'bold 11px monospace';
    ctx.fillText('PAPAN TULIS: SMA DEVIL', 95, 105);
    ctx.font = '9px sans-serif';
    ctx.fillText('PR Matematika Bab 4 Hal 120', 95, 125);
    ctx.fillText('Razia Rambut & Sepatu Hari Ini!', 95, 142);
  }

  renderBlocks(ctx) {
    if (!this.currentLevel.blocks) return;

    this.currentLevel.blocks.forEach(b => {
      if (b.active === false) return;

      // Block Body
      const grad = ctx.createLinearGradient(b.x, b.y, b.x, b.y + b.h);
      grad.addColorStop(0, '#1e293b');
      grad.addColorStop(1, '#0f172a');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(b.x, b.y, b.w, b.h, [4]);
      ctx.fill();

      // Neon Top Border (Electric Blue / Purple Glow)
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(b.x, b.y);
      ctx.lineTo(b.x + b.w, b.y);
      ctx.stroke();

      // Subtle cyan accent on corners
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(b.x, b.y, 4, 3);
      ctx.fillRect(b.x + b.w - 4, b.y, 4, 3);
    });
  }

  renderHazardsAndCrystals(ctx) {
    // 1. Gravity Crystals (Level 5)
    if (this.currentLevel.crystals) {
      this.currentLevel.crystals.forEach(c => {
        if (!c.collected) {
          ctx.save();
          ctx.shadowColor = '#c084fc';
          ctx.shadowBlur = 15;
          ctx.fillStyle = '#a855f7';
          ctx.beginPath();
          ctx.arc(c.x, c.y + Math.sin(this.player.animTime * 0.1) * 3, c.radius, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(c.x, c.y + Math.sin(this.player.animTime * 0.1) * 3, c.radius * 0.4, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });
    }

    // 2. Moving Exam Books / Hazards (Level 10)
    if (this.currentLevel.hazards) {
      this.currentLevel.hazards.forEach(h => {
        ctx.save();
        ctx.translate(h.x + h.w / 2, h.y + h.h / 2);
        // Spinning book / eraser
        ctx.fillStyle = '#f43f5e';
        ctx.beginPath();
        ctx.roundRect(-h.w / 2, -h.h / 2, h.w, h.h, [4]);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('PR', 0, 3);
        ctx.restore();
      });
    }
  }

  renderSpikes(ctx) {
    if (!this.currentLevel.spikes) return;
    this.currentLevel.spikes.forEach(s => {
      CharacterRenderer.drawSpike(ctx, s.x, s.y, s.size || 20, s.dir || 'up');
    });
  }

  renderDarknessSpotlight(ctx) {
    ctx.save();
    const lightRadius = 90;
    const grad = ctx.createRadialGradient(
      this.player.x, this.player.y - 20, 10,
      this.player.x, this.player.y - 20, lightRadius
    );
    grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    grad.addColorStop(0.7, 'rgba(9, 13, 26, 0.85)');
    grad.addColorStop(1, 'rgba(9, 13, 26, 0.98)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.restore();
  }

  renderSearchlights(ctx) {
    ctx.save();
    this.currentLevel.searchlights.forEach(sl => {
      const beamX = sl.x + Math.sin(sl.angle) * sl.range;
      const grad = ctx.createRadialGradient(beamX, 390, 5, beamX, 390, 45);
      grad.addColorStop(0, 'rgba(244, 63, 94, 0.7)');
      grad.addColorStop(1, 'rgba(244, 63, 94, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(beamX, 390, 45, 0, Math.PI * 2);
      ctx.fill();

      // Laser beam line from ceiling
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(sl.x, 0);
      ctx.lineTo(beamX, 390);
      ctx.stroke();
    });
    ctx.restore();
  }
}

// Global engine instance
window.GameEngine = GameEngine;

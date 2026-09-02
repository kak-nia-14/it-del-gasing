/**
 * GOOGLE ANTIGRAVITY - ZERO-G PHYSICS ENGINE (EASTER EGG & WOW FACTOR)
 * Floating physics simulation with collision detection, mouse drag & throw dynamics,
 * gravity slider controls, and smooth workspace restoration.
 */

class AntigravityPhysics {
  constructor() {
    this.isActive = false;
    this.gravity = 0; // 0G by default
    this.bodies = [];
    this.isDragging = false;
    this.draggedBody = null;
    this.dragOffset = { x: 0, y: 0 };
    this.mouse = { x: 0, y: 0, prevX: 0, prevY: 0, vx: 0, vy: 0 };

    this.initDOM();
  }

  initDOM() {
    this.canvas = document.getElementById('physicsCanvasOverlay');
    if (this.canvas) this.ctx = this.canvas.getContext('2d');
    this.toggleBtn = document.getElementById('btnAntigravityPhysics');
    this.hud = document.getElementById('physicsHud');
    this.gravitySlider = document.getElementById('physicsGravitySlider');
    this.gravityVal = document.getElementById('gravityVal');
    this.btnReset = document.getElementById('btnResetPhysics');

    this.toggleBtn?.addEventListener('click', () => {
      this.toggle();
    });

    this.btnReset?.addEventListener('click', () => {
      this.restore();
    });

    this.gravitySlider?.addEventListener('input', (e) => {
      this.gravity = parseFloat(e.target.value);
      if (this.gravityVal) this.gravityVal.textContent = `${this.gravity.toFixed(2)}G`;
    });

    window.addEventListener('resize', () => {
      if (this.canvas) {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
      }
    });

    // Mouse events for interacting with floating panels
    window.addEventListener('mousedown', (e) => this.onMouseDown(e));
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    window.addEventListener('mouseup', () => this.onMouseUp());
  }

  toggle() {
    if (this.isActive) {
      this.restore();
    } else {
      this.start();
    }
  }

  start() {
    this.isActive = true;
    document.body.classList.add('physics-active');
    if (this.toggleBtn) {
      this.toggleBtn.classList.add('active');
      this.toggleBtn.innerHTML = '🪐 Zero-G Active (Click to Restore)';
    }

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Collect DOM elements to turn into floating bodies
    const selectors = [
      '.nav-brand', '.nav-project-crumbs', '.nav-model-pill',
      '.editor-panel', '.stage-preview-panel', '.agent-chat-panel',
      '.bottom-terminal-panel', '.sidebar-header', '.template-card',
      '.chat-msg', '.tool-call-card'
    ];

    this.bodies = [];
    const elements = document.querySelectorAll(selectors.join(','));

    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 20 && rect.height > 20) {
        // Clone appearance as a visual snapshot
        this.bodies.push({
          el: el,
          origTransform: el.style.transform || '',
          x: rect.left,
          y: rect.top,
          w: rect.width,
          h: rect.height,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4 - 2,
          angle: 0,
          va: (Math.random() - 0.5) * 0.05,
          mass: (rect.width * rect.height) / 1000
        });

        el.style.transition = 'none';
      }
    });

    if (window.antigravityCore) {
      window.antigravityCore.logTerminal('🚀 [Physics Engine] Gravitasi dinonaktifkan! Workspace melayang dalam zero-G.', 'info');
    }

    this.loop();
  }

  restore() {
    this.isActive = false;
    document.body.classList.remove('physics-active');
    if (this.toggleBtn) {
      this.toggleBtn.classList.remove('active');
      this.toggleBtn.innerHTML = '🚀 Anti-Gravity Physics';
    }

    // Restore original positions
    this.bodies.forEach(b => {
      b.el.style.transition = 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      b.el.style.transform = b.origTransform;
    });

    setTimeout(() => {
      this.bodies.forEach(b => {
        b.el.style.transition = '';
      });
      this.bodies = [];
    }, 650);

    if (window.antigravityCore) {
      window.antigravityCore.logTerminal('🌐 [Physics Engine] Gravitasi normal dipulihkan. Workspace tertata kembali.', 'success');
    }
  }

  onMouseDown(e) {
    if (!this.isActive) return;
    const mx = e.clientX;
    const my = e.clientY;

    for (let i = this.bodies.length - 1; i >= 0; i--) {
      const b = this.bodies[i];
      if (mx >= b.x && mx <= b.x + b.w && my >= b.y && my <= b.y + b.h) {
        this.isDragging = true;
        this.draggedBody = b;
        this.dragOffset.x = mx - b.x;
        this.dragOffset.y = my - b.y;
        b.vx = 0;
        b.vy = 0;
        break;
      }
    }
  }

  onMouseMove(e) {
    this.mouse.prevX = this.mouse.x;
    this.mouse.prevY = this.mouse.y;
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
    this.mouse.vx = this.mouse.x - this.mouse.prevX;
    this.mouse.vy = this.mouse.y - this.mouse.prevY;

    if (this.isDragging && this.draggedBody) {
      this.draggedBody.x = this.mouse.x - this.dragOffset.x;
      this.draggedBody.y = this.mouse.y - this.dragOffset.y;
      this.draggedBody.vx = this.mouse.vx * 0.8;
      this.draggedBody.vy = this.mouse.vy * 0.8;
      this.draggedBody.va = this.mouse.vx * 0.002;
    }
  }

  onMouseUp() {
    this.isDragging = false;
    this.draggedBody = null;
  }

  loop() {
    if (!this.isActive) return;

    const w = this.canvas.width;
    const h = this.canvas.height;
    const g = this.gravity * 0.25;

    this.bodies.forEach(b => {
      if (b !== this.draggedBody) {
        b.vy += g;
        b.x += b.vx;
        b.y += b.vy;
        b.angle += b.va;

        // Friction / Air damping
        b.vx *= 0.992;
        b.vy *= 0.992;
        b.va *= 0.985;

        // Screen boundary collisions
        if (b.x < 0) {
          b.x = 0;
          b.vx *= -0.7;
        } else if (b.x + b.w > w) {
          b.x = w - b.w;
          b.vx *= -0.7;
        }

        if (b.y < 0) {
          b.y = 0;
          b.vy *= -0.7;
        } else if (b.y + b.h > h) {
          b.y = h - b.h;
          b.vy *= -0.7;
          b.vx *= 0.95; // floor friction
        }
      }

      // Apply CSS transform to floating DOM element
      const rect = b.el.getBoundingClientRect();
      const currentOriginX = rect.left - (b.currentDx || 0);
      const currentOriginY = rect.top - (b.currentDy || 0);

      const dx = b.x - currentOriginX;
      const dy = b.y - currentOriginY;
      b.currentDx = dx;
      b.currentDy = dy;

      b.el.style.transform = `translate3d(${dx}px, ${dy}px, 0px) rotate(${b.angle}rad)`;
    });

    requestAnimationFrame(() => this.loop());
  }
}

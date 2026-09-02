/**
 * SkyViewDel - Astronaut Hologram Info Modal & Mini 3D Inspector
 * Kartu data interaktif elegan dengan preview hologram 3D berputar,
 * statistik ilmiah, fakta unik, cerita mitologi, dan Text-to-Speech narator astronot.
 */

import { soundFx } from './audio.js';

export class CelestialInfoModal {
  constructor() {
    this.modal = document.getElementById('celestial-modal');
    this.modalBody = document.getElementById('modal-content');
    this.closeBtn = document.getElementById('modal-close-btn');
    this.hologramContainer = document.getElementById('hologram-canvas-container');
    this.ttsBtn = document.getElementById('modal-tts-btn');

    this.currentData = null;
    this.hologramScene = null;
    this.hologramCamera = null;
    this.hologramRenderer = null;
    this.hologramMesh = null;
    this.hologramAnimId = null;

    this.isSpeaking = false;
    this.activeTab = 'overview';

    this.init();
  }

  init() {
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    // Close on clicking backdrop
    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.close();
        }
      });
    }

    // Esc key close
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal && !this.modal.classList.contains('hidden')) {
        this.close();
      }
    });

    // TTS button
    if (this.ttsBtn) {
      this.ttsBtn.addEventListener('click', () => this.toggleSpeech());
    }

    this.setupHologramRenderer();
  }

  setupHologramRenderer() {
    if (!this.hologramContainer) return;

    const width = 220;
    const height = 220;

    this.hologramScene = new THREE.Scene();
    this.hologramCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    this.hologramCamera.position.z = 18;

    this.hologramRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.hologramRenderer.setSize(width, height);
    this.hologramRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.hologramContainer.appendChild(this.hologramRenderer.domElement);

    // Hologram lights
    const amb = new THREE.AmbientLight(0xffffff, 0.7);
    this.hologramScene.add(amb);

    const dirLight = new THREE.DirectionalLight(0xfff3d1, 1.2);
    dirLight.position.set(5, 10, 7);
    this.hologramScene.add(dirLight);

    // Interactive drag to rotate hologram
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    this.hologramRenderer.domElement.addEventListener('mousedown', (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (isDragging && this.hologramMesh) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        this.hologramMesh.rotation.y += deltaX * 0.02;
        this.hologramMesh.rotation.x += deltaY * 0.02;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    });
  }

  show(data) {
    if (!data) return;
    this.currentData = data;
    this.activeTab = 'overview';

    soundFx.playCelestialChime(data.type === 'planet' ? 'planet' : 'star');

    // Populate Modal Header
    const titleEl = document.getElementById('modal-title');
    const categoryEl = document.getElementById('modal-category');
    const tagEl = document.getElementById('modal-tag');

    if (titleEl) titleEl.innerText = data.name || 'Objek Langit';
    if (categoryEl) categoryEl.innerText = data.category || 'Objek Astronomi';
    if (tagEl) tagEl.innerText = data.tag || (data.type === 'star' ? 'Bintang Cemerlang' : 'Rasi Langit');

    // Render Tabs Content
    this.renderTabs();
    this.switchTab('overview');

    // Create 3D Hologram Model
    this.createHologramMesh(data);

    // Show modal with animation
    this.modal.classList.remove('hidden');
    setTimeout(() => {
      this.modal.classList.add('active');
    }, 10);
  }

  createHologramMesh(data) {
    if (!this.hologramScene) return;

    // Clear previous mesh
    if (this.hologramMesh) {
      this.hologramScene.remove(this.hologramMesh);
      this.hologramMesh = null;
    }

    const group = new THREE.Group();

    if (data.type === 'star' || data.type === 'star-center') {
      // Bintang bercahaya
      const geo = new THREE.SphereGeometry(5.2, 32, 32);
      const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(data.baseColor || '#fbbf24') });
      const star = new THREE.Mesh(geo, mat);
      group.add(star);

      // Outer glow shell
      const glowGeo = new THREE.SphereGeometry(6.4, 24, 24);
      const glowMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(data.glowColor || '#f59e0b'),
        transparent: true,
        opacity: 0.35,
        wireframe: true
      });
      group.add(new THREE.Mesh(glowGeo, glowMat));
    } else if (data.hasRings) {
      // Planet dengan cincin (Saturnus/Uranus)
      const geo = new THREE.SphereGeometry(4.5, 32, 32);
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(data.baseColor || '#fde047'),
        roughness: 0.4
      });
      group.add(new THREE.Mesh(geo, mat));

      const ringGeo = new THREE.RingGeometry(5.8, 9.2, 48);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(data.glowColor || '#fef08a'),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2.5;
      group.add(ring);
    } else {
      // Planet standar
      const geo = new THREE.SphereGeometry(5.0, 32, 32);
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(data.baseColor || '#38bdf8'),
        roughness: 0.4,
        metalness: 0.1
      });
      group.add(new THREE.Mesh(geo, mat));

      // Holographic grid rings
      const holoRingGeo = new THREE.TorusGeometry(6.6, 0.05, 16, 64);
      const holoRingMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.4
      });
      const holoRing = new THREE.Mesh(holoRingGeo, holoRingMat);
      holoRing.rotation.x = Math.PI / 2;
      group.add(holoRing);
    }

    this.hologramMesh = group;
    this.hologramScene.add(this.hologramMesh);

    // Start animation loop
    this.animateHologram();
  }

  animateHologram() {
    if (this.hologramAnimId) cancelAnimationFrame(this.hologramAnimId);

    const loop = () => {
      if (this.modal.classList.contains('active') && this.hologramMesh) {
        this.hologramMesh.rotation.y += 0.012;
        this.hologramRenderer.render(this.hologramScene, this.hologramCamera);
        this.hologramAnimId = requestAnimationFrame(loop);
      }
    };
    loop();
  }

  renderTabs() {
    const tabsNav = document.getElementById('modal-tabs-nav');
    if (!tabsNav) return;

    tabsNav.innerHTML = `
      <button class="modal-tab-btn active" data-tab="overview">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        Ikhtisar & Data
      </button>
      <button class="modal-tab-btn" data-tab="facts">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        Fakta Menakjubkan
      </button>
      <button class="modal-tab-btn" data-tab="lore">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
        Mitologi & Sejarah
      </button>
    `;

    tabsNav.querySelectorAll('.modal-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        soundFx.playUiClick();
        const tab = btn.getAttribute('data-tab');
        this.switchTab(tab);
      });
    });
  }

  switchTab(tabKey) {
    this.activeTab = tabKey;
    const navBtns = document.querySelectorAll('.modal-tab-btn');
    navBtns.forEach(btn => {
      if (btn.getAttribute('data-tab') === tabKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const data = this.currentData;
    const bodyEl = document.getElementById('modal-tab-body');
    if (!bodyEl || !data) return;

    if (tabKey === 'overview') {
      let statsHtml = '';
      if (data.diameter) {
        statsHtml += `<div class="stat-card"><span class="stat-label">Diameter</span><span class="stat-val">${data.diameter}</span></div>`;
      }
      if (data.distanceFromEarth) {
        statsHtml += `<div class="stat-card"><span class="stat-label">Jarak dari Bumi</span><span class="stat-val">${data.distanceFromEarth}</span></div>`;
      }
      if (data.surfaceTemp) {
        statsHtml += `<div class="stat-card"><span class="stat-label">Suhu Permukaan</span><span class="stat-val">${data.surfaceTemp}</span></div>`;
      }
      if (data.mass) {
        statsHtml += `<div class="stat-card"><span class="stat-label">Massa</span><span class="stat-val">${data.mass}</span></div>`;
      }
      if (data.rotationPeriod) {
        statsHtml += `<div class="stat-card"><span class="stat-label">Periode Rotasi</span><span class="stat-val">${data.rotationPeriod}</span></div>`;
      }
      if (data.orbitalPeriod) {
        statsHtml += `<div class="stat-card"><span class="stat-label">Periode Orbit</span><span class="stat-val">${data.orbitalPeriod}</span></div>`;
      }
      if (data.spectralType) {
        statsHtml += `<div class="stat-card"><span class="stat-label">Tipe Spektral</span><span class="stat-val">${data.spectralType}</span></div>`;
      }
      if (data.luminosity) {
        statsHtml += `<div class="stat-card"><span class="stat-label">Luminositas</span><span class="stat-val">${data.luminosity}</span></div>`;
      }

      bodyEl.innerHTML = `
        <div class="tab-pane animate-fade-in">
          <p class="object-desc">${data.description || 'Tidak ada deskripsi tersedia.'}</p>
          <div class="stats-grid">${statsHtml}</div>
        </div>
      `;
    } else if (tabKey === 'facts') {
      const facts = data.funFacts || (data.funFact ? [data.funFact] : ['Objek luar angkasa yang sangat mempesona untuk diamati.']);
      const factsHtml = facts.map((fact, i) => `
        <div class="fact-item">
          <span class="fact-number">0${i + 1}</span>
          <p class="fact-text">${fact}</p>
        </div>
      `).join('');

      bodyEl.innerHTML = `
        <div class="tab-pane animate-fade-in">
          <div class="facts-list">${factsHtml}</div>
        </div>
      `;
    } else if (tabKey === 'lore') {
      bodyEl.innerHTML = `
        <div class="tab-pane animate-fade-in">
          <div class="lore-card">
            <div class="lore-icon">📜</div>
            <p class="lore-text">${data.mythology || 'Kisah objek astronomi ini diabadikan dalam berbagai peradaban masa silam sebagai panduan waktu dan arah penjelajahan samudra.'}</p>
          </div>
        </div>
      `;
    }
  }

  toggleSpeech() {
    if (!('speechSynthesis' in window)) {
      alert('Browser Anda belum mendukung fitur Text-To-Speech.');
      return;
    }

    if (this.isSpeaking) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
      this.updateTtsButton(false);
    } else {
      if (!this.currentData) return;
      const textToRead = `${this.currentData.name}. ${this.currentData.description}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'id-ID';
      utterance.rate = 1.0;
      utterance.pitch = 1.05;

      utterance.onstart = () => {
        this.isSpeaking = true;
        this.updateTtsButton(true);
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        this.updateTtsButton(false);
      };

      utterance.onerror = () => {
        this.isSpeaking = false;
        this.updateTtsButton(false);
      };

      window.speechSynthesis.speak(utterance);
    }
  }

  updateTtsButton(speaking) {
    if (!this.ttsBtn) return;
    if (speaking) {
      this.ttsBtn.classList.add('speaking');
      this.ttsBtn.innerHTML = `
        <span class="pulse-ring"></span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
        Hentikan Narasi
      `;
    } else {
      this.ttsBtn.classList.remove('speaking');
      this.ttsBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
        Dengarkan Narasi
      `;
    }
  }

  close() {
    if (this.isSpeaking) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
      this.updateTtsButton(false);
    }

    soundFx.playUiClick();
    this.modal.classList.remove('active');
    setTimeout(() => {
      this.modal.classList.add('hidden');
    }, 300);
  }
}

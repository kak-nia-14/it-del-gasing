/**
 * Dormitory Simulator - Folding Clothes Simulator (Baju, Celana, Jaket)
 */

class FoldingSimulator {
  constructor() {
    this.currentGarment = 'baju'; // 'baju' | 'celana' | 'jaket'
    this.currentStep = 0;
    this.completedGarments = {
      baju: false,
      celana: false,
      jaket: false
    };

    this.garmentSteps = {
      baju: [
        {
          title: "Langkah 1: Ratakan Kain",
          desc: "Klik atau usap permukaan baju untuk menghilangkan kerutan kain.",
          actionText: "Ratakan Baju ✨",
          foldedStateClass: "fold-step-0"
        },
        {
          title: "Langkah 2: Lipat Sisi & Lengan Kiri",
          desc: "Tarik atau klik sisi kiri baju ke arah garis tengah lipatan.",
          actionText: "Lipat Sisi Kiri ⬅️",
          foldedStateClass: "fold-step-1"
        },
        {
          title: "Langkah 3: Lipat Sisi & Lengan Kanan",
          desc: "Tarik atau klik sisi kanan baju ke arah garis tengah lipatan.",
          actionText: "Lipat Sisi Kanan ➡️",
          foldedStateClass: "fold-step-2"
        },
        {
          title: "Langkah 4: Lipat Bagian Bawah ke Atas",
          desc: "Lipat sepertiga bawah ke atas agar baju menjadi lipatan persegi rapi khas lemari Del.",
          actionText: "Lipat ke Atas ⬆️",
          foldedStateClass: "fold-step-3"
        }
      ],
      celana: [
        {
          title: "Langkah 1: Ratakan Celana",
          desc: "Bentangkan celana panjang dan luruskan saku serta resleting.",
          actionText: "Ratakan Celana ✨",
          foldedStateClass: "fold-pants-0"
        },
        {
          title: "Langkah 2: Lipat Menjadi Dua (Kiri ke Kanan)",
          desc: "Tumpukkan kaki celana kiri tepat di atas kaki celana kanan.",
          actionText: "Lipat Belah Dua ↔️",
          foldedStateClass: "fold-pants-1"
        },
        {
          title: "Langkah 3: Lipat Sepertiga Bawah (Ujung Kaki)",
          desc: "Tarik ujung bawah celana ke arah lutut / pertengahan paha.",
          actionText: "Lipat Kaki Bawah ⬆️",
          foldedStateClass: "fold-pants-2"
        },
        {
          title: "Langkah 4: Lipat Pinggang ke Bawah",
          desc: "Lipat bagian pinggang menutupi lipatan bawah menjadi balok lipatan celana yang rapi.",
          actionText: "Lipat Kompak 📦",
          foldedStateClass: "fold-pants-3"
        }
      ],
      jaket: [
        {
          title: "Langkah 1: Pasang Resleting & Ratakan Hoodie",
          desc: "Tarik resleting jaket hingga rapat dan rapikan tudung kepala.",
          actionText: "Kancingkan & Ratakan 🧥",
          foldedStateClass: "fold-jacket-0"
        },
        {
          title: "Langkah 2: Lipat Lengan Kiri Menyilang",
          desc: "Tarik lengan kiri menyilang secara diagonal ke tengah dada.",
          actionText: "Lipat Lengan Kiri ↙️",
          foldedStateClass: "fold-jacket-1"
        },
        {
          title: "Langkah 3: Lipat Lengan Kanan Menyilang",
          desc: "Tarik lengan kanan menyilang rapi di atas lengan kiri.",
          actionText: "Lipat Lengan Kanan ↘️",
          foldedStateClass: "fold-jacket-2"
        },
        {
          title: "Langkah 4: Lipat Bagian Bawah ke Atas",
          desc: "Lipat badan jaket dari bawah ke atas sehingga tebal dan rapi.",
          actionText: "Lipat Badan Jaket ⬆️",
          foldedStateClass: "fold-jacket-3"
        }
      ]
    };
  }

  init() {
    this.renderTabs();
    this.renderGarmentView();
    this.updateControls();
  }

  selectGarment(garment) {
    if (this.currentGarment === garment) return;
    this.currentGarment = garment;
    this.currentStep = 0;
    window.sound.playClick();
    this.renderTabs();
    this.renderGarmentView();
    this.updateControls();
  }

  renderTabs() {
    const tabsContainer = document.getElementById('foldingTabs');
    if (!tabsContainer) return;

    const items = [
      { id: 'baju', label: '👕 Baju Kaos / Kemeja', done: this.completedGarments.baju },
      { id: 'celana', label: '👖 Celana Panjang', done: this.completedGarments.celana },
      { id: 'jaket', label: '🧥 Jaket / Hoodie', done: this.completedGarments.jaket }
    ];

    tabsContainer.innerHTML = items.map(item => `
      <button class="folding-tab-btn ${this.currentGarment === item.id ? 'active' : ''} ${item.done ? 'completed' : ''}" 
              onclick="window.foldingSim.selectGarment('${item.id}')">
        ${item.label} ${item.done ? '✅' : ''}
      </button>
    `).join('');
  }

  performFoldStep() {
    const steps = this.garmentSteps[this.currentGarment];
    if (this.currentStep < steps.length) {
      window.sound.playFold();
      this.currentStep++;

      if (this.currentStep === steps.length) {
        // Finished this garment!
        this.completedGarments[this.currentGarment] = true;
        window.sound.playSuccess();
        this.renderTabs();
        this.showSuccessBanner();
      }

      this.renderGarmentView();
      this.updateControls();
    }
  }

  resetCurrentGarment() {
    window.sound.playClick();
    this.currentStep = 0;
    this.renderGarmentView();
    this.updateControls();
    const banner = document.getElementById('foldingSuccessBanner');
    if (banner) banner.classList.remove('show');
  }

  updateControls() {
    const steps = this.garmentSteps[this.currentGarment];
    const isDone = this.currentStep >= steps.length;
    const stepData = isDone ? steps[steps.length - 1] : steps[this.currentStep];

    const titleEl = document.getElementById('foldStepTitle');
    const descEl = document.getElementById('foldStepDesc');
    const actionBtn = document.getElementById('btnFoldAction');
    const stepDots = document.getElementById('foldStepDots');
    const foldGuideLine = document.getElementById('foldGuideLine');

    if (titleEl) {
      titleEl.innerText = isDone ? `🎉 Lipatan ${this.getGarmentName()} Selesai & Sangat Rapi!` : stepData.title;
    }
    if (descEl) {
      descEl.innerText = isDone ? `Standar kerapian asrama terpenuhi! Siap dimasukkan ke lemari rak tengah.` : stepData.desc;
    }
    if (actionBtn) {
      if (isDone) {
        actionBtn.innerText = "Lipat Ulang 🔄";
        actionBtn.onclick = () => this.resetCurrentGarment();
        actionBtn.className = "sim-btn secondary";
      } else {
        actionBtn.innerText = stepData.actionText;
        actionBtn.onclick = () => this.performFoldStep();
        actionBtn.className = "sim-btn primary pulse-btn";
      }
    }

    if (stepDots) {
      let dotsHtml = '';
      for (let i = 0; i < steps.length; i++) {
        const dotClass = i < this.currentStep ? 'done' : (i === this.currentStep && !isDone ? 'active' : '');
        dotsHtml += `<div class="step-dot ${dotClass}" title="Langkah ${i + 1}"></div>`;
      }
      stepDots.innerHTML = dotsHtml;
    }

    // Guide Line positioning
    if (foldGuideLine) {
      if (isDone || this.currentStep === 0) {
        foldGuideLine.style.opacity = '0';
      } else {
        foldGuideLine.style.opacity = '1';
        this.updateGuideLinePosition(foldGuideLine);
      }
    }
  }

  updateGuideLinePosition(el) {
    if (this.currentGarment === 'baju') {
      if (this.currentStep === 1) {
        el.style.left = '32%';
        el.style.top = '10%';
        el.style.height = '80%';
        el.style.width = '2px';
        el.style.transform = 'none';
      } else if (this.currentStep === 2) {
        el.style.left = '68%';
        el.style.top = '10%';
        el.style.height = '80%';
        el.style.width = '2px';
        el.style.transform = 'none';
      } else if (this.currentStep === 3) {
        el.style.left = '10%';
        el.style.top = '58%';
        el.style.width = '80%';
        el.style.height = '2px';
        el.style.transform = 'none';
      }
    } else if (this.currentGarment === 'celana') {
      if (this.currentStep === 1) {
        el.style.left = '50%';
        el.style.top = '10%';
        el.style.height = '80%';
        el.style.width = '2px';
      } else if (this.currentStep === 2) {
        el.style.left = '20%';
        el.style.top = '60%';
        el.style.width = '60%';
        el.style.height = '2px';
      } else if (this.currentStep === 3) {
        el.style.left = '20%';
        el.style.top = '35%';
        el.style.width = '60%';
        el.style.height = '2px';
      }
    } else if (this.currentGarment === 'jaket') {
      if (this.currentStep === 1) {
        el.style.left = '35%';
        el.style.top = '25%';
        el.style.height = '65%';
        el.style.width = '2px';
      } else if (this.currentStep === 2) {
        el.style.left = '65%';
        el.style.top = '25%';
        el.style.height = '65%';
        el.style.width = '2px';
      } else if (this.currentStep === 3) {
        el.style.left = '15%';
        el.style.top = '60%';
        el.style.width = '70%';
        el.style.height = '2px';
      }
    }
  }

  showSuccessBanner() {
    const banner = document.getElementById('foldingSuccessBanner');
    if (banner) {
      banner.classList.add('show');
      setTimeout(() => banner.classList.remove('show'), 3500);
    }
  }

  getGarmentName() {
    if (this.currentGarment === 'baju') return 'Baju';
    if (this.currentGarment === 'celana') return 'Celana';
    return 'Jaket';
  }

  renderGarmentView() {
    const canvasStage = document.getElementById('foldingStage');
    if (!canvasStage) return;

    if (this.currentGarment === 'baju') {
      canvasStage.innerHTML = this.getBajuSVG();
    } else if (this.currentGarment === 'celana') {
      canvasStage.innerHTML = this.getCelanaSVG();
    } else {
      canvasStage.innerHTML = this.getJaketSVG();
    }
  }

  getBajuSVG() {
    const step = this.currentStep;
    // Interactive SVG visualization based on step
    if (step === 0) {
      // Flat Shirt with slight wrinkles
      return `
        <svg viewBox="0 0 300 320" class="folding-garment-svg" onclick="window.foldingSim.performFoldStep()">
          <defs>
            <linearGradient id="shirtBase" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#38bdf8"/>
              <stop offset="100%" stop-color="#0284c7"/>
            </linearGradient>
          </defs>
          <!-- Torso -->
          <path d="M 85,80 L 85,280 L 215,280 L 215,80 Z" fill="url(#shirtBase)" stroke="#0369a1" stroke-width="4"/>
          <!-- Left Sleeve -->
          <polygon points="85,80 30,140 55,165 85,125" fill="#0284c7" stroke="#0369a1" stroke-width="4"/>
          <!-- Right Sleeve -->
          <polygon points="215,80 270,140 245,165 215,125" fill="#0284c7" stroke="#0369a1" stroke-width="4"/>
          <!-- Neck Collar (White) -->
          <path d="M 120,80 Q 150,110 180,80 Q 150,60 120,80" fill="#f8fafc" stroke="#cbd5e1" stroke-width="3"/>
          <polygon points="120,80 135,100 115,96" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
          <polygon points="180,80 165,100 185,96" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
          <!-- SUD Pocket -->
          <rect x="100" y="115" width="28" height="30" rx="3" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
          <text x="114" y="132" font-size="10" font-weight="900" fill="#0284c7" text-anchor="middle">SUD</text>
          <!-- Wrinkles to smooth -->
          <path d="M 100,180 Q 120,185 140,178" stroke="#0369a1" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
          <path d="M 160,210 Q 180,215 200,208" stroke="#0369a1" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
        </svg>
      `;
    } else if (step === 1) {
      // Left side folded in
      return `
        <svg viewBox="0 0 300 320" class="folding-garment-svg" onclick="window.foldingSim.performFoldStep()">
          <defs>
            <linearGradient id="shirtBase" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#38bdf8"/>
              <stop offset="100%" stop-color="#0284c7"/>
            </linearGradient>
          </defs>
          <!-- Right Sleeve -->
          <polygon points="215,80 270,140 245,165 215,125" fill="#0284c7" stroke="#0369a1" stroke-width="4"/>
          <!-- Body Unfolded part -->
          <path d="M 120,80 L 120,280 L 215,280 L 215,80 Z" fill="url(#shirtBase)" stroke="#0369a1" stroke-width="4"/>
          <!-- Left Folded in layer -->
          <path d="M 120,80 L 120,280 L 155,280 L 155,80 Z" fill="#0369a1" stroke="#075985" stroke-width="3" opacity="0.9"/>
          <!-- Folded sleeve down -->
          <rect x="124" y="110" width="25" height="110" rx="4" fill="#0284c7" stroke="#0369a1" stroke-width="2"/>
          <!-- Neck Collar -->
          <path d="M 120,80 Q 150,110 180,80" fill="none" stroke="#cbd5e1" stroke-width="3"/>
          <polygon points="180,80 165,100 185,96" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
        </svg>
      `;
    } else if (step === 2) {
      // Both Left and Right sides folded in
      return `
        <svg viewBox="0 0 300 320" class="folding-garment-svg" onclick="window.foldingSim.performFoldStep()">
          <defs>
            <linearGradient id="shirtBase" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#38bdf8"/>
              <stop offset="100%" stop-color="#0284c7"/>
            </linearGradient>
          </defs>
          <!-- Center rectangle column -->
          <rect x="120" y="80" width="60" height="200" rx="4" fill="url(#shirtBase)" stroke="#0369a1" stroke-width="4"/>
          <!-- Fold shadows -->
          <line x1="120" y1="80" x2="120" y2="280" stroke="#075985" stroke-width="3"/>
          <line x1="180" y1="80" x2="180" y2="280" stroke="#075985" stroke-width="3"/>
          <!-- Neck Collar on top -->
          <polygon points="135,80 150,96 140,94" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
          <polygon points="165,80 150,96 160,94" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
        </svg>
      `;
    } else {
      // Final Folded Shirt Box
      return `
        <svg viewBox="0 0 300 320" class="folding-garment-svg folded-bounce">
          <defs>
            <linearGradient id="shirtFolded" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#38bdf8"/>
              <stop offset="100%" stop-color="#0284c7"/>
            </linearGradient>
          </defs>
          <!-- Perfect Compact Rectangle -->
          <rect x="80" y="100" width="140" height="130" rx="10" fill="url(#shirtFolded)" stroke="#0369a1" stroke-width="5"/>
          <!-- Bottom Lip / Fold layer -->
          <rect x="85" y="180" width="130" height="42" rx="6" fill="#0284c7" stroke="#075985" stroke-width="3"/>
          <!-- Crisp White Collar -->
          <polygon points="120,100 150,126 132,122" fill="#ffffff" stroke="#94a3b8" stroke-width="2.5"/>
          <polygon points="180,100 150,126 168,122" fill="#ffffff" stroke="#94a3b8" stroke-width="2.5"/>
          <!-- Pocket Emblem -->
          <rect x="160" y="140" width="26" height="28" rx="3" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
          <text x="173" y="156" font-size="8" font-weight="900" fill="#0284c7" text-anchor="middle">SUD</text>
          <!-- Star Quality Badge -->
          <circle cx="215" cy="105" r="18" fill="#eab308" stroke="#ffffff" stroke-width="3"/>
          <text x="215" y="111" font-size="16" text-anchor="middle">⭐</text>
        </svg>
      `;
    }
  }

  getCelanaSVG() {
    const step = this.currentStep;
    if (step === 0) {
      // Flat open pants
      return `
        <svg viewBox="0 0 300 320" class="folding-garment-svg" onclick="window.foldingSim.performFoldStep()">
          <!-- Waistband -->
          <rect x="80" y="50" width="140" height="24" rx="4" fill="#334155" stroke="#1e293b" stroke-width="3"/>
          <rect x="142" y="50" width="16" height="24" fill="#cbd5e1" stroke="#475569" stroke-width="2"/> <!-- Buckle -->
          <!-- Two legs -->
          <path d="M 80,74 L 105,280 L 140,280 L 150,130 L 160,280 L 195,280 L 220,74 Z" fill="#1e293b" stroke="#0f172a" stroke-width="4"/>
          <!-- Belt loops & crease -->
          <line x1="120" y1="90" x2="120" y2="275" stroke="#475569" stroke-width="2" stroke-dasharray="4,4"/>
          <line x1="180" y1="90" x2="180" y2="275" stroke="#475569" stroke-width="2" stroke-dasharray="4,4"/>
        </svg>
      `;
    } else if (step === 1) {
      // Left leg over right leg (folded in half vertically)
      return `
        <svg viewBox="0 0 300 320" class="folding-garment-svg" onclick="window.foldingSim.performFoldStep()">
          <path d="M 125,50 L 175,50 L 175,280 L 135,280 L 125,120 Z" fill="#1e293b" stroke="#0f172a" stroke-width="4"/>
          <rect x="125" y="50" width="50" height="24" rx="3" fill="#334155" stroke="#1e293b" stroke-width="3"/>
          <line x1="150" y1="74" x2="150" y2="275" stroke="#475569" stroke-width="2.5"/>
        </svg>
      `;
    } else if (step === 2) {
      // Folded 1/3 up
      return `
        <svg viewBox="0 0 300 320" class="folding-garment-svg" onclick="window.foldingSim.performFoldStep()">
          <path d="M 125,50 L 175,50 L 175,190 L 125,190 Z" fill="#1e293b" stroke="#0f172a" stroke-width="4"/>
          <!-- Folded bottom layer -->
          <rect x="125" y="130" width="50" height="60" rx="3" fill="#334155" stroke="#0f172a" stroke-width="3"/>
        </svg>
      `;
    } else {
      // Final Compact Folded Pants
      return `
        <svg viewBox="0 0 300 320" class="folding-garment-svg folded-bounce">
          <!-- Stacked Neat Pants Block -->
          <rect x="85" y="110" width="130" height="95" rx="8" fill="#1e293b" stroke="#0f172a" stroke-width="5"/>
          <!-- Waistband & loops on top -->
          <rect x="85" y="110" width="130" height="22" rx="4" fill="#334155" stroke="#1e293b" stroke-width="2"/>
          <rect x="105" y="110" width="6" height="22" fill="#64748b"/>
          <rect x="145" y="110" width="10" height="22" fill="#cbd5e1"/>
          <rect x="185" y="110" width="6" height="22" fill="#64748b"/>
          <!-- Hem crease -->
          <line x1="85" y1="160" x2="215" y2="160" stroke="#0f172a" stroke-width="3"/>
          <!-- Star Quality Badge -->
          <circle cx="210" cy="115" r="18" fill="#eab308" stroke="#ffffff" stroke-width="3"/>
          <text x="210" y="121" font-size="16" text-anchor="middle">⭐</text>
        </svg>
      `;
    }
  }

  getJaketSVG() {
    const step = this.currentStep;
    if (step === 0) {
      // Open jacket with zipper & hood
      return `
        <svg viewBox="0 0 300 320" class="folding-garment-svg" onclick="window.foldingSim.performFoldStep()">
          <!-- Hood -->
          <path d="M 115,70 Q 150,20 185,70 Z" fill="#334155" stroke="#1e293b" stroke-width="3"/>
          <!-- Main Body -->
          <rect x="85" y="70" width="130" height="200" rx="8" fill="#1e293b" stroke="#0f172a" stroke-width="4"/>
          <!-- Sleeves -->
          <polygon points="85,70 25,140 50,170 85,130" fill="#334155" stroke="#1e293b" stroke-width="3"/>
          <polygon points="215,70 275,140 250,170 215,130" fill="#334155" stroke="#1e293b" stroke-width="3"/>
          <!-- Zipper -->
          <line x1="150" y1="70" x2="150" y2="270" stroke="#cbd5e1" stroke-width="4" stroke-dasharray="3,3"/>
          <circle cx="150" cy="80" r="4" fill="#ffffff"/>
        </svg>
      `;
    } else if (step === 1) {
      // Left sleeve crossed in
      return `
        <svg viewBox="0 0 300 320" class="folding-garment-svg" onclick="window.foldingSim.performFoldStep()">
          <path d="M 115,70 Q 150,30 185,70 Z" fill="#334155" stroke="#1e293b" stroke-width="3"/>
          <!-- Right Sleeve -->
          <polygon points="215,70 275,140 250,170 215,130" fill="#334155" stroke="#1e293b" stroke-width="3"/>
          <!-- Main Body -->
          <rect x="85" y="70" width="130" height="200" rx="8" fill="#1e293b" stroke="#0f172a" stroke-width="4"/>
          <!-- Left Sleeve crossed -->
          <polygon points="85,70 190,165 170,190 85,120" fill="#475569" stroke="#1e293b" stroke-width="3"/>
        </svg>
      `;
    } else if (step === 2) {
      // Both sleeves crossed in
      return `
        <svg viewBox="0 0 300 320" class="folding-garment-svg" onclick="window.foldingSim.performFoldStep()">
          <path d="M 115,70 Q 150,30 185,70 Z" fill="#334155" stroke="#1e293b" stroke-width="3"/>
          <!-- Main Body -->
          <rect x="85" y="70" width="130" height="200" rx="8" fill="#1e293b" stroke="#0f172a" stroke-width="4"/>
          <!-- Left Sleeve crossed -->
          <polygon points="85,70 190,165 170,190 85,120" fill="#475569" stroke="#1e293b" stroke-width="3"/>
          <!-- Right Sleeve crossed -->
          <polygon points="215,70 110,165 130,190 215,120" fill="#475569" stroke="#1e293b" stroke-width="3"/>
        </svg>
      `;
    } else {
      // Final Folded Jacket Box
      return `
        <svg viewBox="0 0 300 320" class="folding-garment-svg folded-bounce">
          <rect x="75" y="95" width="150" height="135" rx="12" fill="#1e293b" stroke="#0f172a" stroke-width="5"/>
          <!-- Hood tucked in top -->
          <path d="M 110,95 Q 150,115 190,95" fill="#334155" stroke="#0f172a" stroke-width="3"/>
          <!-- Zipper visible -->
          <line x1="150" y1="95" x2="150" y2="230" stroke="#cbd5e1" stroke-width="3" stroke-dasharray="2,2"/>
          <rect x="146" y="105" width="8" height="12" fill="#ffffff" rx="2"/>
          <!-- Bottom fold edge -->
          <rect x="80" y="175" width="140" height="48" rx="8" fill="#334155" stroke="#1e293b" stroke-width="2"/>
          <!-- Star Quality Badge -->
          <circle cx="220" cy="100" r="18" fill="#eab308" stroke="#ffffff" stroke-width="3"/>
          <text x="220" y="106" font-size="16" text-anchor="middle">⭐</text>
        </svg>
      `;
    }
  }
}

window.foldingSim = new FoldingSimulator();

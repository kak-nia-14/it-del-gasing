/**
 * Dormitory Simulator - Bed Making Simulator (Membereskan Tempat Tidur)
 * Steps:
 * 1. Merapikan Sprei (Hilangkan kerutan & kencangkan 4 sudut sprei)
 * 2. Menata Bantal (Posisikan di kepala ranjang & ratakan)
 * 3. Menaruh Alkitab (Tepat di samping bantal dengan rapi)
 * 4. Melipat & Menyusun Selimut (Lipat rapi di bagian bawah ranjang)
 * 5. Kurve Bed Check (Inspeksi kelulusan standar asrama)
 */

class BedMakingSimulator {
  constructor() {
    this.currentStep = 1; // 1: Sprei, 2: Bantal, 3: Alkitab, 4: Selimut, 5: Selesai
    this.sheetWrinkles = [
      { id: 1, x: 25, y: 25, fixed: false, name: 'Sudut Kiri Atas' },
      { id: 2, x: 75, y: 25, fixed: false, name: 'Sudut Kanan Atas' },
      { id: 3, x: 25, y: 75, fixed: false, name: 'Sudut Kiri Bawah' },
      { id: 4, x: 75, y: 75, fixed: false, name: 'Sudut Kanan Bawah' }
    ];
    this.pillowPlaced = false;
    this.biblePlaced = false;
    this.blanketPlaced = false;
  }

  init() {
    this.reset();
  }

  reset() {
    this.currentStep = 1;
    this.sheetWrinkles.forEach(w => w.fixed = false);
    this.pillowPlaced = false;
    this.biblePlaced = false;
    this.blanketPlaced = false;

    this.renderBedView();
    this.renderControls();
  }

  fixWrinkle(id) {
    const wrinkle = this.sheetWrinkles.find(w => w.id === id);
    if (!wrinkle || wrinkle.fixed) return;

    wrinkle.fixed = true;
    window.sound.playSmooth();

    const allFixed = this.sheetWrinkles.every(w => w.fixed);
    if (allFixed) {
      setTimeout(() => {
        window.sound.playSuccess();
        this.currentStep = 2;
        this.renderBedView();
        this.renderControls();
      }, 300);
    } else {
      this.renderBedView();
      this.renderControls();
    }
  }

  placePillow() {
    if (this.currentStep !== 2) return;
    this.pillowPlaced = true;
    window.sound.playSnap();
    this.currentStep = 3;
    this.renderBedView();
    this.renderControls();
  }

  placeBible() {
    if (this.currentStep !== 3) return;
    this.biblePlaced = true;
    window.sound.playSnap();
    this.currentStep = 4;
    this.renderBedView();
    this.renderControls();
  }

  placeBlanket() {
    if (this.currentStep !== 4) return;
    this.blanketPlaced = true;
    window.sound.playFold();
    this.currentStep = 5;
    window.sound.playFanfare();
    this.renderBedView();
    this.renderControls();
    this.showSuccessModal();
  }

  renderControls() {
    const titleEl = document.getElementById('bedStepTitle');
    const descEl = document.getElementById('bedStepDesc');
    const actionWrap = document.getElementById('bedActionButtons');
    const stepDots = document.getElementById('bedStepDots');

    const stepsInfo = [
      {
        num: 1,
        title: "Langkah 1: Kencangkan Sprei",
        desc: "Klik atau ketuk 4 sudut kerutan pada kasur untuk menarik dan mengencangkan sprei.",
        action: null
      },
      {
        num: 2,
        title: "Langkah 2: Menata Bantal",
        desc: "Posisikan bantal di bagian kepala ranjang (atas) dan tepuk agar simetris.",
        btnText: "Letakkan Bantal 🛏️",
        handler: () => this.placePillow()
      },
      {
        num: 3,
        title: "Langkah 3: Menaruh Alkitab di Samping Bantal",
        desc: "Sesuai tata krama asrama, letakkan Alkitab dengan rapi tepat di samping bantal.",
        btnText: "Letakkan Alkitab 📖",
        handler: () => this.placeBible()
      },
      {
        num: 4,
        title: "Langkah 4: Melipat & Menyusun Selimut",
        desc: "Lipat selimut dengan rapi dan letakkan di bagian bawah kasur.",
        btnText: "Susun Selimut Rapi 🧶",
        handler: () => this.placeBlanket()
      },
      {
        num: 5,
        title: "🎉 Tempat Tidur Sempurna & Rapi!",
        desc: "Standar Kurve asrama tercapai! Bantal simetris, Alkitab terhormat, dan selimut rapi.",
        btnText: "Bereskan Ulang 🔄",
        handler: () => this.reset()
      }
    ];

    const currentInfo = stepsInfo[this.currentStep - 1];

    if (titleEl) titleEl.innerText = currentInfo.title;
    if (descEl) descEl.innerText = currentInfo.desc;

    if (stepDots) {
      let dotsHtml = '';
      for (let i = 1; i <= 4; i++) {
        const dotClass = i < this.currentStep ? 'done' : (i === this.currentStep ? 'active' : '');
        dotsHtml += `<div class="step-dot ${dotClass}" title="Langkah ${i}"></div>`;
      }
      stepDots.innerHTML = dotsHtml;
    }

    if (actionWrap) {
      if (this.currentStep === 1) {
        const unFixedCount = this.sheetWrinkles.filter(w => !w.fixed).length;
        actionWrap.innerHTML = `
          <button class="sim-btn secondary" onclick="window.bedSim.fixAllWrinkles()">
            Kencangkan Semua Sudut (${4 - unFixedCount}/4) ✨
          </button>
        `;
      } else {
        actionWrap.innerHTML = `
          <button class="sim-btn primary pulse-btn" id="btnBedMainAction">
            ${currentInfo.btnText}
          </button>
        `;
        document.getElementById('btnBedMainAction').onclick = currentInfo.handler;
      }
    }
  }

  fixAllWrinkles() {
    this.sheetWrinkles.forEach(w => w.fixed = true);
    window.sound.playSmooth();
    setTimeout(() => {
      window.sound.playSuccess();
      this.currentStep = 2;
      this.renderBedView();
      this.renderControls();
    }, 250);
  }

  renderBedView() {
    const stage = document.getElementById('bedMakingStage');
    if (!stage) return;

    const allWrinklesFixed = this.sheetWrinkles.every(w => w.fixed);

    stage.innerHTML = `
      <div class="bed-frame-box">
        <!-- Bed Headboard -->
        <div class="bed-headboard">
          <div class="wood-bar"></div>
        </div>

        <!-- Mattress Surface -->
        <div class="bed-mattress ${allWrinklesFixed ? 'sheet-smooth' : 'sheet-wrinkly'}">
          
          <!-- Wrinkle hotspots on step 1 -->
          ${this.currentStep === 1 ? this.sheetWrinkles.map(w => `
            <div class="wrinkle-hotspot ${w.fixed ? 'fixed' : 'pulse'}" 
                 style="top: ${w.y}%; left: ${w.x}%;"
                 onclick="window.bedSim.fixWrinkle(${w.id})"
                 title="Klik untuk ratakan ${w.name}">
              ${w.fixed ? '✅' : '👋 Tarik'}
            </div>
          `).join('') : ''}

          <!-- Pillow Item -->
          ${this.pillowPlaced ? `
            <div class="placed-pillow animate-drop">
              ${window.SVGAssets.bantal}
            </div>
          ` : (this.currentStep === 2 ? `
            <div class="target-pillow-zone pulse-zone" onclick="window.bedSim.placePillow()">
              <span>🛏️ Klik di sini untuk letakkan bantal</span>
            </div>
          ` : '')}

          <!-- Bible Item (Right or Left of Pillow) -->
          ${this.biblePlaced ? `
            <div class="placed-bible animate-drop">
              ${window.SVGAssets.alkitab}
            </div>
          ` : (this.currentStep === 3 ? `
            <div class="target-bible-zone pulse-zone" onclick="window.bedSim.placeBible()">
              <span>📖 Klik di sini untuk letakkan Alkitab</span>
            </div>
          ` : '')}

          <!-- Blanket Item (Bottom of Bed) -->
          ${this.blanketPlaced ? `
            <div class="placed-blanket animate-drop">
              ${window.SVGAssets.selimutLipat}
            </div>
          ` : (this.currentStep === 4 ? `
            <div class="target-blanket-zone pulse-zone" onclick="window.bedSim.placeBlanket()">
              <span>🧶 Klik di sini untuk menyusun selimut</span>
            </div>
          ` : '')}
        </div>

        <!-- Bed Footboard -->
        <div class="bed-footboard">
          <div class="wood-bar"></div>
        </div>
      </div>
    `;
  }

  showSuccessModal() {
    const modal = document.getElementById('bedSuccessModal');
    if (modal) modal.classList.add('show');
  }
}

window.bedSim = new BedMakingSimulator();

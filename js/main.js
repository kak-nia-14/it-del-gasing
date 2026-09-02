/**
 * Dormitory Simulator - Main App Controller & Navigation Router
 */

class AppController {
  constructor() {
    this.currentView = 'hub'; // 'hub' | 'folding' | 'closet' | 'sweeping' | 'bed'
    this.isMarathonMode = false;
    this.marathonStageIndex = 0;
    this.marathonStages = ['folding', 'closet', 'sweeping', 'bed'];
    this.marathonStartTime = 0;
    this.marathonTimerInterval = null;
  }

  init() {
    this.bindGlobalEvents();
    this.switchView('hub');

    // Init Audio toggle UI
    const soundBtn = document.getElementById('btnSoundToggle');
    if (soundBtn) {
      soundBtn.onclick = () => {
        const isMuted = window.sound.toggleMute();
        soundBtn.innerText = isMuted ? '🔇' : '🔊';
        soundBtn.title = isMuted ? 'Suara Mati' : 'Suara Hidup';
      };
    }
  }

  bindGlobalEvents() {
    // Navigation links / buttons
    document.querySelectorAll('[data-view-target]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget.getAttribute('data-view-target');
        this.switchView(target);
      });
    });

    // Modal close buttons
    document.querySelectorAll('.modal-close, .btn-modal-close').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('show'));
      });
    });
  }

  switchView(viewName) {
    window.sound.playClick();
    this.currentView = viewName;

    // Stop sweeping loop if exiting sweeping
    if (viewName !== 'sweeping' && window.sweepingSim) {
      window.sweepingSim.stop();
    }

    // Hide all views
    document.querySelectorAll('.view-section').forEach(view => {
      view.classList.remove('active');
    });

    // Show target view
    const targetEl = document.getElementById(`view-${viewName}`);
    if (targetEl) {
      targetEl.classList.add('active');
    }

    // Update Header HUD
    const hudTitle = document.getElementById('currentSimTitle');
    const btnBackHub = document.getElementById('btnBackToHub');

    if (btnBackHub) {
      btnBackHub.style.display = viewName === 'hub' ? 'none' : 'inline-flex';
    }

    switch (viewName) {
      case 'hub':
        if (hudTitle) hudTitle.innerText = "🏫 Beranda Asrama SUD";
        break;
      case 'folding':
        if (hudTitle) hudTitle.innerText = "👔 Simulator Melipat Pakaian";
        if (window.foldingSim) window.foldingSim.init();
        break;
      case 'closet':
        if (hudTitle) hudTitle.innerText = "🗄️ Simulator Merapikan Lemari 3 Tingkat";
        if (window.closetSim) window.closetSim.init();
        break;
      case 'sweeping':
        if (hudTitle) hudTitle.innerText = "🧹 Simulator Menyapu Kamar (3 Bunkbed)";
        if (window.sweepingSim) window.sweepingSim.init();
        break;
      case 'bed':
        if (hudTitle) hudTitle.innerText = "🛏️ Simulator Membereskan Tempat Tidur";
        if (window.bedSim) window.bedSim.init();
        break;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  startMarathonMode() {
    window.sound.playSuccess();
    this.isMarathonMode = true;
    this.marathonStageIndex = 0;
    this.marathonStartTime = Date.now();

    const banner = document.getElementById('marathonHudBanner');
    if (banner) banner.classList.add('show');

    this.startMarathonTimer();
    this.switchView(this.marathonStages[this.marathonStageIndex]);
  }

  startMarathonTimer() {
    if (this.marathonTimerInterval) clearInterval(this.marathonTimerInterval);
    const timerText = document.getElementById('marathonTimerText');

    this.marathonTimerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - this.marathonStartTime) / 1000);
      const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
      const secs = String(elapsed % 60).padStart(2, '0');
      if (timerText) timerText.innerText = `${mins}:${secs}`;
    }, 1000);
  }

  nextMarathonStage() {
    this.marathonStageIndex++;
    if (this.marathonStageIndex < this.marathonStages.length) {
      this.switchView(this.marathonStages[this.marathonStageIndex]);
    } else {
      // Completed all 4!
      if (this.marathonTimerInterval) clearInterval(this.marathonTimerInterval);
      this.isMarathonMode = false;
      const banner = document.getElementById('marathonHudBanner');
      if (banner) banner.classList.remove('show');

      const elapsed = Math.floor((Date.now() - this.marathonStartTime) / 1000);
      const mins = Math.floor(elapsed / 60);
      const secs = elapsed % 60;

      window.sound.playFanfare();
      const finalModal = document.getElementById('marathonCompleteModal');
      const finalTime = document.getElementById('marathonFinalTime');
      if (finalTime) finalTime.innerText = `${mins} Menit ${secs} Detik`;
      if (finalModal) finalModal.classList.add('show');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new AppController();
  window.app.init();
});

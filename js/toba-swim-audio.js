/**
 * LOMBA BERENANG DANAU TOBA - AUDIO SYNTHESIZER
 * Web Audio API procedural sound engine for water splashes, whistles, booster jets, and fanfares.
 */

class TobaAudio {
  constructor() {
    this.enabled = true;
    this.ctx = null;
    this.initAudioContext();
  }

  initAudioContext() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    } catch (e) {
      console.warn('Web Audio not supported', e);
    }
  }

  ensureContext() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playWhistle() {
    if (!this.enabled || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const mod = this.ctx.createOscillator();
    const modGain = this.ctx.createGain();

    // Whistle trill vibrato
    mod.frequency.setValueAtTime(25, now);
    modGain.gain.setValueAtTime(40, now);
    mod.connect(osc.frequency);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(2600, now);
    osc.frequency.exponentialRampToValueAtTime(2800, now + 0.3);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    mod.start(now);
    osc.start(now);
    mod.stop(now + 0.5);
    osc.stop(now + 0.5);
  }

  playStroke(quality = 'good') {
    if (!this.enabled || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;

    // Filtered noise for water splash
    const bufferSize = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';

    if (quality === 'perfect') {
      filter.frequency.setValueAtTime(900, now);
      filter.Q.setValueAtTime(3.0, now);
    } else if (quality === 'good') {
      filter.frequency.setValueAtTime(600, now);
      filter.Q.setValueAtTime(1.5, now);
    } else {
      filter.frequency.setValueAtTime(300, now);
      filter.Q.setValueAtTime(0.8, now);
    }

    const gain = this.ctx.createGain();
    const vol = quality === 'perfect' ? 0.18 : (quality === 'good' ? 0.12 : 0.06);
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);

    // Perfect stroke melodic chime
    if (quality === 'perfect') {
      const chime = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();
      chime.frequency.setValueAtTime(880, now); // A5
      chimeGain.gain.setValueAtTime(0.05, now);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      chime.connect(chimeGain);
      chimeGain.connect(this.ctx.destination);
      chime.start(now);
      chime.stop(now + 0.18);
    }
  }

  playBooster() {
    if (!this.enabled || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(850, now + 0.4);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.6);
  }

  playVictory() {
    if (!this.enabled || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const noteTime = now + idx * 0.12;

      osc.frequency.setValueAtTime(freq, noteTime);
      gain.gain.setValueAtTime(0.1, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.35);
    });
  }

  playDefeat() {
    if (!this.enabled || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;

    const notes = [440, 392, 349.23, 293.66]; // A4, G4, F4, D4
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const noteTime = now + idx * 0.15;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, noteTime);
      gain.gain.setValueAtTime(0.12, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.3);
    });
  }
}

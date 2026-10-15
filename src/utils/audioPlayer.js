/**
 * Audio System with Fallback Procedural Romantic Chime Synthesizer
 * 
 * Works with any provided MP3 file (e.g. /audio/romantic-background.mp3),
 * and automatically falls back to an enchanting Web Audio API romantic melody
 * if no MP3 file is present or fails to load.
 */

class RomanticAudioManager {
  constructor() {
    this.audioElement = null;
    this.audioContext = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.synthInterval = null;
    this.subscribers = new Set();
    this.useSynth = false;
    this.initialized = false;
  }

  init(src) {
    if (this.initialized) return;
    this.initialized = true;

    this.audioElement = new Audio();
    this.audioElement.src = src;
    this.audioElement.loop = true;
    this.audioElement.preload = "auto";

    // Handle error by switching to dreamy Web Audio API synthesizer
    this.audioElement.addEventListener("error", () => {
      // console.info("Physical audio file not found, using romantic ambient chime synth fallback.");
      this.useSynth = true;
    });

    this.audioElement.addEventListener("ended", () => {
      if (this.isPlaying) {
        this.audioElement.play().catch(() => {});
      }
    });
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    callback(this.isPlaying);
    return () => this.subscribers.delete(callback);
  }

  notify() {
    this.subscribers.forEach(cb => cb(this.isPlaying));
  }

  async toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      await this.play();
    }
  }

  async play() {
    this.isPlaying = true;
    this.notify();

    if (!this.useSynth && this.audioElement) {
      try {
        await this.audioElement.play();
        return;
      } catch (err) {
        // Fall back to synthetic romantic melody if play was blocked or file missing
        this.useSynth = true;
      }
    }

    if (this.useSynth) {
      this.startRomanticSynth();
    }
  }

  pause() {
    this.isPlaying = false;
    this.notify();

    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.stopRomanticSynth();
  }

  // Romantic Web Audio Synthesizer (dreamy music box / acoustic chime melody)
  startRomanticSynth() {
    if (this.synthInterval) return;

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!this.audioContext) {
        this.audioContext = new AudioCtx();
      }
      if (this.audioContext.state === "suspended") {
        this.audioContext.resume();
      }

      // Pentatonic romantic notes (C4, D4, E4, G4, A4, C5, D5, E5, G5)
      const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99];
      // Romantic arpeggio sequence
      const melodySequence = [0, 2, 4, 7, 5, 4, 2, 0, 3, 5, 8, 7, 5, 3, 2, 4];
      let step = 0;

      const playChime = () => {
        if (!this.isPlaying || !this.audioContext) return;

        const now = this.audioContext.currentTime;
        const noteIndex = melodySequence[step % melodySequence.length];
        const freq = notes[noteIndex];
        step++;

        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        // Music box / warm sine tone
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);

        // Gentle envelope (soft attack, slow decay)
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.08, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.start(now);
        osc.stop(now + 1.8);
      };

      playChime();
      this.synthInterval = setInterval(playChime, 450);
    } catch (e) {
      console.warn("AudioContext not supported or blocked", e);
    }
  }

  stopRomanticSynth() {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }

  // Interactive Sound Effects
  playCelebrationSound() {
    if (!this.isPlaying) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!this.audioContext) this.audioContext = new AudioCtx();
      const now = this.audioContext.currentTime;

      // Magical chime chord (C5, E5, G5, C6)
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);
        gain.gain.setValueAtTime(0.12, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.1 + 1.2);
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 1.2);
      });
    } catch (e) {}
  }

  playBlowoutSound() {
    if (!this.isPlaying) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!this.audioContext) this.audioContext = new AudioCtx();
      const now = this.audioContext.currentTime;

      // Gentle fairy chime
      [880, 1174.66, 1318.51].forEach((freq, idx) => {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.08, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.8);
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.8);
      });
    } catch (e) {}
  }
}

export const romanticAudio = new RomanticAudioManager();

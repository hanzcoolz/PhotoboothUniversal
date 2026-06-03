// Sound Synthesizer - Web Audio API
export class SoundSynthesizer {
  private audioContext: AudioContext | null = null;

  private getAudioContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  // Digital beep - notification sound
  beep(frequency: number = 800, duration: number = 100) {
    const ctx = this.getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.value = frequency;
    osc.type = 'sine';

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration / 1000);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration / 1000);
  }

  // Camera shutter sound - mechanical
  shutter() {
    const ctx = this.getAudioContext();
    const now = ctx.currentTime;

    // Click 1 - high frequency
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.frequency.setValueAtTime(150, now);
    osc1.frequency.exponentialRampToValueAtTime(100, now + 0.05);
    gain1.gain.setValueAtTime(0.4, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
    osc1.start(now);
    osc1.stop(now + 0.05);

    // Click 2 - low frequency
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.frequency.setValueAtTime(80, now + 0.05);
    osc2.frequency.exponentialRampToValueAtTime(50, now + 0.15);
    gain2.gain.setValueAtTime(0.3, now + 0.05);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    osc2.start(now + 0.05);
    osc2.stop(now + 0.15);

    // Noise burst
    const noise = ctx.createBufferSource();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.08, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < buffer.length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    noise.buffer = buffer;
    const noiseGain = ctx.createGain();
    noise.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noiseGain.gain.setValueAtTime(0.2, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    noise.start(now + 0.12);
  }

  // Success chime - pleasant ascending tone
  successChime() {
    const ctx = this.getAudioContext();
    const now = ctx.currentTime;
    const notes = [
      { freq: 523.25, start: 0 },    // C5
      { freq: 659.25, start: 0.15 }, // E5
      { freq: 783.99, start: 0.3 },  // G5
    ];

    notes.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.frequency.value = note.freq;
      osc.type = 'sine';

      const startTime = now + note.start;
      gain.gain.setValueAtTime(0.4, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);

      osc.start(startTime);
      osc.stop(startTime + 0.2);
    });
  }

  // Countdown beep - urgent warning
  countdownBeep() {
    const ctx = this.getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.value = 1000;
    osc.type = 'square';

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.05, now + 0.1);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  // Error buzz - sad descending tone
  errorBuzz() {
    const ctx = this.getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.3);
    osc.type = 'sine';

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  // Processing sound - robotic beep sequence
  processingSound() {
    const ctx = this.getAudioContext();
    const now = ctx.currentTime;

    for (let i = 0; i < 3; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const freq = 600 + i * 100;
      osc.frequency.value = freq;
      osc.type = 'sine';

      const start = now + i * 0.15;
      gain.gain.setValueAtTime(0.25, start);
      gain.gain.exponentialRampToValueAtTime(0.01, start + 0.1);

      osc.start(start);
      osc.stop(start + 0.1);
    }
  }
}

// Singleton instance
export const soundSynth = new SoundSynthesizer();

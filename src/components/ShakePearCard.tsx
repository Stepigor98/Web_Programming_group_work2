import React, { useState } from 'react';
import { Sparkles, Maximize2, X, RefreshCw, Volume2, Smile, Cpu, Terminal, Zap } from 'lucide-react';
import { ReadingTheme } from '../types';

interface ShakePearCardProps {
  theme: ReadingTheme;
}

const SHAKE_QUOTES = [
  "To shake, or not to shake: that is the pear!",
  "A hit, a very palpable pear!",
  "Though this be madness, yet there is pear in 't!",
  "To sleep, perchance to pear: ay, there's the rub!",
  "O, what a noble pear is here o'erthrown!",
  "There are more pears in heaven and earth, Horatio, than are dreamt of!",
  "The pear is the thing wherein I'll catch the conscience of the King!",
];

const CYBER_SHAKESPEARE_QUOTES = [
  "To compute, or not to compute: that is the cyber question.",
  "Whether 'tis nobler in the neural cortex to suffer the surges and spikes of rogue AI...",
  "There are more algorithms in cyberspace and quantum reality, Horatio, than are dreamt of!",
  "Though this be digital madness, yet there is sublime syntax in 't!",
  "What a piece of work is cyborg man! How infinite in processing power!",
  "The glitch is the thing wherein I'll test the conscience of the mainframe!",
];

export const ShakePearCard: React.FC<ShakePearCardProps> = ({ theme }) => {
  const [isShaking, setIsShaking] = useState(false);
  const [shakeCount, setShakeCount] = useState(0);
  const [pearQuoteIndex, setPearQuoteIndex] = useState(0);
  const [cyberQuoteIndex, setCyberQuoteIndex] = useState(0);
  const [zoomedImage, setZoomedImage] = useState<{ url: string; title: string } | null>(null);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; emoji: string }[]>([]);

  // Synthesizes a playful, soft rattle/shake sound using Web Audio API
  const playShakeSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Create a crisp synth-rattle burst
      const bufferSize = ctx.sampleRate * 0.25;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 3400;
      filter.Q.value = 3.2;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start();
    } catch {
      // Audio autoplay policy fallback
    }
  };

  const handleShake = () => {
    setIsShaking(true);
    setShakeCount(prev => prev + 1);
    setPearQuoteIndex(prev => (prev + 1) % SHAKE_QUOTES.length);
    playShakeSound();

    // Spawn floating playful cyber particles
    const emojis = ['🍐', '⚡', '✨', '🍐', '💫', '👾', '🍐'];
    const newParticles = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      x: 25 + Math.random() * 50,
      y: 35 + Math.random() * 35,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setParticles(prev => [...prev.slice(-12), ...newParticles]);

    setTimeout(() => {
      setIsShaking(false);
    }, 700);
  };

  const handleNextCyberQuote = () => {
    setCyberQuoteIndex(prev => (prev + 1) % CYBER_SHAKESPEARE_QUOTES.length);
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch {
      // ignore
    }
  };

  return (
    <>
      {/* Dual Cyber Showcase Container */}
      <div
        id="cyber-showcase-container"
        className="relative overflow-hidden rounded-2xl p-4 sm:p-6 mb-8 border transition-all duration-300 bg-[#090b14]/95 border-cyan-500/40 shadow-2xl shadow-cyan-950/50 backdrop-blur-xl"
        style={{
          boxShadow: '0 0 30px rgba(0, 240, 255, 0.15), 0 0 50px rgba(255, 0, 127, 0.1), inset 0 0 20px rgba(0, 240, 255, 0.05)',
        }}
      >
        {/* Futuristic Cyber Top Scanner Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-pink-500 via-yellow-400 to-cyan-400 animate-iridescent-shift" />

        {/* Cyberpunk HUD Header Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-5 pb-3 border-b border-cyan-500/20 text-[11px] font-mono tracking-wider uppercase text-cyan-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="font-bold text-cyan-300">NEURAL_FOLIO // CYBER_BARD 2077</span>
            <span className="text-pink-500">•</span>
            <span className="text-zinc-400 hidden sm:inline">WILLIAM SHAKESPEARE ARCHIVE</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              SYSTEM: ONLINE
            </span>
            <span className="text-pink-400 font-mono">
              TOTAL SHAKES: <span className="text-white font-bold">{shakeCount}</span>
            </span>
          </div>
        </div>

        {/* Two Column Grid: Cyber Shakespeare Portrait + William Shake-Pear Meme Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* Card 1: Cyberpunk William Shakespeare Portrait */}
          <div className="flex flex-col justify-between rounded-xl p-4 sm:p-5 bg-zinc-950/80 border border-cyan-500/40 shadow-lg shadow-cyan-500/10 relative overflow-hidden group">
            {/* Corner Cyber HUD Accents */}
            <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
            <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
            <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
            <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

            <div className="flex items-start gap-4">
              {/* Portrait with Glowing Cyber Frame */}
              <div
                className="relative group cursor-pointer shrink-0"
                onClick={() =>
                  setZoomedImage({
                    url: '/assets/cyberpunk_shakespeare.jpg',
                    title: 'William Shakespeare 2077 • Cyber-Bard Edition',
                  })
                }
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition duration-300 animate-iridescent-shift" />
                <div className="relative overflow-hidden rounded-lg bg-black border-2 border-cyan-400/80 w-28 h-28 sm:w-32 sm:h-32">
                  <img
                    src="/assets/cyberpunk_shakespeare.jpg"
                    alt="Cyberpunk William Shakespeare Portrait"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-cyan-950/30 group-hover:opacity-0 transition-opacity" />
                  <div className="absolute bottom-1 right-1 p-1 rounded bg-black/70 text-cyan-300 hover:text-white">
                    <Maximize2 className="w-3 h-3" />
                  </div>
                </div>
              </div>

              {/* Info & Cyber Verse */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono uppercase text-cyan-400 tracking-wider">
                  <Cpu className="w-3 h-3 text-pink-400" />
                  <span>SYNTHETIC BARD // MK-IV</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-display text-white tracking-wide leading-snug">
                  William Shakespeare <span className="text-cyan-400 font-mono text-sm">2077</span>
                </h3>
                <p className="text-xs text-zinc-400 font-sans-ui mt-0.5 line-clamp-2">
                  Neural quantum Elizabethan blank verse synthesizer & cybernetic bionic bard.
                </p>

                {/* Cyber Quote Display */}
                <div className="mt-3 p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-200 text-xs font-mono relative">
                  <p className="italic leading-relaxed">
                    "{CYBER_SHAKESPEARE_QUOTES[cyberQuoteIndex]}"
                  </p>
                </div>
              </div>
            </div>

            {/* Synthesize Verse Button */}
            <div className="mt-4 pt-3 border-t border-cyan-500/20 flex items-center justify-between gap-2">
              <button
                onClick={handleNextCyberQuote}
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold tracking-wider flex items-center gap-1.5 text-cyan-300 bg-cyan-900/40 hover:bg-cyan-800/60 border border-cyan-400/60 transition-all hover:scale-[1.02] active:scale-95"
              >
                <Zap className="w-3 h-3 text-yellow-300" />
                <span>SYNTHESIZE VERSE</span>
              </button>

              <button
                onClick={() =>
                  setZoomedImage({
                    url: '/assets/cyberpunk_shakespeare.jpg',
                    title: 'William Shakespeare 2077 • Cyber-Bard Edition',
                  })
                }
                className="text-[11px] font-mono text-zinc-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
              >
                <Maximize2 className="w-3 h-3" />
                <span>Inspect Portrait</span>
              </button>
            </div>
          </div>

          {/* Card 2: William Shake-Pear Meme Card with Shake Button & Audio */}
          <div className="flex flex-col justify-between rounded-xl p-4 sm:p-5 bg-zinc-950/80 border border-pink-500/40 shadow-lg shadow-pink-500/10 relative overflow-hidden group">
            {/* Corner Cyber HUD Accents */}
            <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-pink-400 pointer-events-none" />
            <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-pink-400 pointer-events-none" />
            <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-pink-400 pointer-events-none" />
            <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-pink-400 pointer-events-none" />

            <div className="flex items-start gap-4">
              {/* Meme Image with Wobble and Particles */}
              <div className="relative group cursor-pointer shrink-0" onClick={handleShake}>
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-400 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition duration-300 animate-iridescent-shift" />
                <div
                  className={`relative overflow-hidden rounded-lg bg-black border-2 border-pink-400/80 w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center ${
                    isShaking ? 'animate-pear-wobble' : ''
                  }`}
                >
                  <img
                    src="/assets/william_shake_pear.jpg"
                    alt="William Shake-Pear Meme"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover select-none pointer-events-none"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80';
                    }}
                  />

                  {/* Floating particles upon shaking */}
                  {particles.map((p) => (
                    <span
                      key={p.id}
                      className="absolute pointer-events-none text-xl animate-float-slow"
                      style={{ left: `${p.x}%`, top: `${p.y}%` }}
                    >
                      {p.emoji}
                    </span>
                  ))}

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 text-white text-[11px] font-mono font-semibold backdrop-blur-[1px]">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Shake!</span>
                  </div>

                  <div className="absolute bottom-1 right-1 p-1 rounded bg-black/70 text-pink-300 hover:text-white">
                    <Maximize2 className="w-3 h-3" />
                  </div>
                </div>
              </div>

              {/* Info & Pear Pun Quote */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono uppercase text-pink-400 tracking-wider">
                  <Sparkles className="w-3 h-3 text-yellow-400" />
                  <span>VIRAL MEME // WILLIAM + PEAR</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-display text-white tracking-wide leading-snug">
                  William Shake-Pear
                </h3>
                <p className="text-xs text-zinc-400 font-sans-ui mt-0.5 line-clamp-2">
                  To shake, or not to shake: that is the pear! Click below to shake with sound.
                </p>

                {/* Pun Quote Display */}
                <div className="mt-3 p-2.5 rounded-lg bg-pink-950/40 border border-pink-500/30 text-pink-200 text-xs font-mono relative">
                  <p className="italic leading-relaxed">
                    "{SHAKE_QUOTES[pearQuoteIndex]}"
                  </p>
                </div>
              </div>
            </div>

            {/* Shake Button & Fullscreen Trigger */}
            <div className="mt-4 pt-3 border-t border-pink-500/20 flex flex-wrap items-center justify-between gap-2">
              <button
                id="shake-pear-button"
                onClick={handleShake}
                className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider flex items-center gap-2 text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 border border-pink-400 shadow-lg shadow-pink-500/30 transition-all hover:scale-105 active:scale-95"
              >
                <span className="text-sm">🍐</span>
                <span>SHAKE THE PEAR!</span>
                <Volume2 className="w-3.5 h-3.5 opacity-80" />
              </button>

              <button
                onClick={() =>
                  setZoomedImage({
                    url: '/assets/william_shake_pear.jpg',
                    title: 'William + Pear = William Shakespeare Meme',
                  })
                }
                className="text-[11px] font-mono text-zinc-400 hover:text-pink-300 transition-colors flex items-center gap-1"
              >
                <Maximize2 className="w-3 h-3" />
                <span>View Full Size</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Fullscreen Zoom Modal */}
      {zoomedImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setZoomedImage(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-zinc-950 rounded-2xl overflow-hidden border border-cyan-500/40 p-3 shadow-2xl shadow-cyan-900/50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setZoomedImage(null)}
                className="p-2 rounded-full bg-black/80 text-white hover:bg-black/100 border border-white/20 transition-colors"
                aria-label="Close zoom"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <img
              src={zoomedImage.url}
              alt={zoomedImage.title}
              referrerPolicy="no-referrer"
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl border border-white/10"
            />
            <div className="p-3 text-center text-cyan-300 text-xs font-mono tracking-wide">
              {zoomedImage.title}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

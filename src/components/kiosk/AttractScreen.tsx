import { Camera, Sparkles, Star, Zap } from 'lucide-react';
import AutoSlider from './AutoSlider';

interface Props {
  onStart: () => void;
}

export default function AttractScreen({ onStart }: Props) {
  return (
    <div
      className="relative w-full h-screen overflow-auto"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, #1a0e00 0%, #0a0a0a 60%)',
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              background: `rgba(212,168,68,${Math.random() * 0.5 + 0.1})`,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 4 + 3}s ease-in-out infinite`,
              animationDelay: Math.random() * 5 + 's',
            }}
          />
        ))}
      </div>

      {/* Top gradient band */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: 'linear-gradient(90deg, transparent, #D4A844, transparent)' }}
      />

      {/* Center content - scrollable */}
      <div className="relative z-10 px-8 pt-12 pb-8">
        {/* Logo / Icon cluster */}
        <div className="flex flex-col items-center justify-center mb-10 animate-float">
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center gold-glow"
            style={{
              background: 'radial-gradient(circle, rgba(212,168,68,0.2) 0%, rgba(212,168,68,0.05) 70%)',
              border: '2px solid rgba(212,168,68,0.5)',
            }}
          >
            <Camera size={56} className="text-amber-400" />
          </div>
          {/* Orbit ring */}
          <div
            className="absolute inset-0 rounded-full animate-spin-slow"
            style={{
              border: '1px dashed rgba(212,168,68,0.3)',
              transform: 'scale(1.3)',
            }}
          />
          <Star
            size={14}
            className="absolute -top-1 -right-1 text-amber-400 fill-amber-400"
            style={{ animation: 'float 2s ease-in-out infinite' }}
          />
          <Sparkles
            size={16}
            className="absolute -bottom-2 left-0 text-amber-300"
            style={{ animation: 'float 2.5s ease-in-out infinite reverse' }}
          />
        </div>

        {/* Main title */}
        <h1
          className="font-bold mb-2 leading-none tracking-tight text-center"
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(3rem, 8vw, 7rem)',
          }}
        >
          <span className="shimmer-text">PHOTO</span>
          <br />
          <span className="text-white">BOOTH</span>
        </h1>

        {/* Tagline */}
        <p
          className="text-gray-400 font-light tracking-widest uppercase text-sm md:text-base mb-14 text-center"
          style={{ letterSpacing: '0.25em' }}
        >
          Capture Your Perfect Moment
        </p>

        {/* CTA Button */}
        <div className="flex justify-center relative mb-12">
          <button
            className="kiosk-btn relative px-14 py-5 rounded-full text-black font-bold text-xl tracking-wide"
            style={{
              background: 'linear-gradient(135deg, #D4A844 0%, #F0C96A 50%, #D4A844 100%)',
              backgroundSize: '200% auto',
              animation: 'shimmer 3s linear infinite',
              boxShadow: '0 0 40px rgba(212,168,68,0.5), 0 0 80px rgba(212,168,68,0.2)',
            }}
            onClick={onStart}
          >
            <span className="relative z-10 flex items-center gap-3">
              <Zap size={22} className="fill-black" />
              MULAI SEKARANG
            </span>
          </button>

          {/* Pulse ring around button */}
          <div
            className="absolute inset-0 rounded-full animate-pulse-ring"
            style={{ border: '2px solid rgba(212,168,68,0.6)' }}
          />
        </div>

        {/* Tap hint */}
        <p className="mt-4 text-gray-600 text-sm tracking-widest uppercase text-center">
          Sentuh layar untuk mulai
        </p>

        {/* Auto-sliding gallery */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="text-center mb-4">
            <p className="text-gray-400 text-xs uppercase tracking-widest">GALERI TERBARU</p>
            <h2 className="text-white font-bold text-lg mt-1">Hasil Foto Guest Terbaru</h2>
          </div>
          <AutoSlider />
        </div>
      </div>

      {/* Bottom info bar */}
      <div className="absolute bottom-0 left-0 right-0 px-8 py-4 flex justify-between items-center glass-dark">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-gray-400 text-xs tracking-wide">KIOSK AKTIF</span>
        </div>
        <span
          className="text-xs font-light tracking-widest"
          style={{ color: 'rgba(212,168,68,0.6)' }}
        >
          PHOTOBOOTH v2.0 PREMIUM
        </span>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-gray-400 text-xs tracking-wide">KAMERA SIAP</span>
        </div>
      </div>

      {/* Corner decorations */}
      <div
        className="absolute top-6 left-6 w-8 h-8"
        style={{
          borderTop: '2px solid rgba(212,168,68,0.5)',
          borderLeft: '2px solid rgba(212,168,68,0.5)',
        }}
      />
      <div
        className="absolute top-6 right-6 w-8 h-8"
        style={{
          borderTop: '2px solid rgba(212,168,68,0.5)',
          borderRight: '2px solid rgba(212,168,68,0.5)',
        }}
      />
      <div
        className="absolute bottom-14 left-6 w-8 h-8"
        style={{
          borderBottom: '2px solid rgba(212,168,68,0.5)',
          borderLeft: '2px solid rgba(212,168,68,0.5)',
        }}
      />
      <div
        className="absolute bottom-14 right-6 w-8 h-8"
        style={{
          borderBottom: '2px solid rgba(212,168,68,0.5)',
          borderRight: '2px solid rgba(212,168,68,0.5)',
        }}
      />
    </div>
  );
}

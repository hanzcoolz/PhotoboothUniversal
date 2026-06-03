import { Camera, Sparkles, Star, Zap, MousePointer, Play } from 'lucide-react';
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
      {/* Enhanced animated background with multiple particle layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Slower particles (depth) */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`slow-${i}`}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              background: `rgba(212,168,68,${Math.random() * 0.3 + 0.05})`,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 6 + 5}s ease-in-out infinite`,
              animationDelay: Math.random() * 5 + 's',
            }}
          />
        ))}
        {/* Faster particles (foreground) */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`fast-${i}`}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              background: `rgba(212,168,68,${Math.random() * 0.6 + 0.2})`,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: Math.random() * 3 + 's',
            }}
          />
        ))}
      </div>

      {/* Animated gradient orbs */}
      <div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 animate-pulse-ring"
        style={{
          background: 'radial-gradient(circle, rgba(212,168,68,0.4) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-15 animate-pulse-ring"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animationDelay: '1s',
        }}
      />

      {/* Top gradient band with enhanced glow */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5"
        style={{
          background: 'linear-gradient(90deg, transparent, #D4A844, transparent)',
          boxShadow: '0 0 20px rgba(212,168,68,0.6)',
        }}
      />

      {/* Center content - scrollable with premium spacing */}
      <div className="relative z-10 px-8 pt-16 pb-12">
        {/* Premium badge */}
        <div className="flex justify-center mb-8 animate-fade-in">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
            style={{
              background: 'rgba(212,168,68,0.12)',
              border: '1px solid rgba(212,168,68,0.3)',
              color: '#D4A844',
            }}
          >
            <Sparkles size={12} />
            PREMIUM v2.0
          </div>
        </div>

        {/* Logo / Icon cluster with enhanced animation */}
        <div className="flex flex-col items-center justify-center mb-12 animate-float">
          <div
            className="w-40 h-40 rounded-full flex items-center justify-center gold-glow relative group"
            style={{
              background: 'radial-gradient(circle, rgba(212,168,68,0.25) 0%, rgba(212,168,68,0.08) 70%)',
              border: '2.5px solid rgba(212,168,68,0.6)',
              boxShadow: '0 0 50px rgba(212,168,68,0.4), inset 0 0 30px rgba(212,168,68,0.2)',
            }}
          >
            <Camera size={64} className="text-amber-300 group-hover:scale-110 transition-transform" />
          </div>
          {/* Orbit ring with enhanced animation */}
          <div
            className="absolute inset-0 rounded-full animate-spin-slow"
            style={{
              border: '1.5px dashed rgba(212,168,68,0.5)',
              transform: 'scale(1.35)',
            }}
          />
          {/* Rotating accent stars */}
          <Star
            size={16}
            className="absolute -top-2 -right-2 text-amber-300 fill-amber-300 animate-pulse"
            style={{ animation: 'float 2.5s ease-in-out infinite, spin-slow 20s linear infinite' }}
          />
          <Sparkles
            size={18}
            className="absolute -bottom-3 left-2 text-amber-200"
            style={{ animation: 'float 3s ease-in-out infinite reverse, spin-slow 25s linear infinite reverse' }}
          />
          <div
            className="absolute -top-3 left-1 w-2 h-2 rounded-full bg-amber-300 opacity-70"
            style={{
              animation: 'float 2.8s ease-in-out infinite',
              animationDelay: '0.5s',
            }}
          />
        </div>

        {/* Main title with premium typography */}
        <div className="text-center mb-4 animate-fade-in-up">
          <h1
            className="font-black mb-2 leading-none tracking-tight"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.5rem, 9vw, 8rem)',
              letterSpacing: '-0.02em',
              textShadow: '0 0 30px rgba(212,168,68,0.3)',
            }}
          >
            <span className="shimmer-text">PHOTO</span>
            <br />
            <span className="text-white" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
              BOOTH
            </span>
          </h1>
          <div
            className="h-0.5 w-16 mx-auto mb-6"
            style={{
              background: 'linear-gradient(90deg, transparent, #D4A844, transparent)',
            }}
          />
        </div>

        {/* Tagline with enhanced styling */}
        <p
          className="text-gray-300 font-light tracking-widest uppercase text-xs md:text-sm mb-16 text-center animate-fade-in-up"
          style={{
            letterSpacing: '0.3em',
            animationDelay: '0.1s',
            opacity: 0,
            animation: 'fadeInUp 0.6s ease 0.1s forwards',
          }}
        >
          Abadikan Momen Sempurna Anda
        </p>

        {/* CTA Button with premium effects */}
        <div className="flex justify-center relative mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <button
            className="kiosk-btn relative px-16 py-6 rounded-full text-black font-black text-2xl tracking-wide transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #D4A844 0%, #F0C96A 50%, #D4A844 100%)',
              backgroundSize: '200% auto',
              animation: 'shimmer 3s linear infinite',
              boxShadow:
                '0 0 50px rgba(212,168,68,0.6), 0 0 100px rgba(212,168,68,0.3), inset 0 -2px 10px rgba(0,0,0,0.2)',
            }}
            onClick={onStart}
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <Play size={24} className="fill-black" />
              MULAI SEKARANG
            </span>
          </button>

          {/* Enhanced pulse ring */}
          <div
            className="absolute inset-0 rounded-full animate-pulse-ring"
            style={{
              border: '2px solid rgba(212,168,68,0.7)',
              boxShadow: '0 0 30px rgba(212,168,68,0.3)',
            }}
          />

          {/* Glow orbs around button */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: '80px',
                height: '80px',
                border: '1px solid rgba(212,168,68,0.2)',
                left: `calc(50% - 40px)`,
                top: `calc(50% - 40px)`,
                animation: `pulse-ring 2s infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        {/* Tap hint with icon */}
        <div className="flex justify-center items-center gap-2 mb-16 text-gray-500 text-xs tracking-widest uppercase animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <MousePointer size={14} className="animate-bounce" />
          <span>Sentuh layar untuk mulai</span>
        </div>

        {/* Auto-sliding gallery section with enhanced styling */}
        <div className="mt-20 max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <p
              className="text-gray-500 text-xs uppercase tracking-widest mb-2 animate-fade-in"
              style={{ animationDelay: '0.4s' }}
            >
              Galeri Terbaru
            </p>
            <h2
              className="text-white font-bold text-xl md:text-2xl mt-2 animate-fade-in-up"
              style={{ animationDelay: '0.5s' }}
            >
              Hasil Foto <span className="shimmer-text">Guest Terbaru</span>
            </h2>
            <div
              className="h-0.5 w-12 mx-auto mt-3"
              style={{
                background: 'linear-gradient(90deg, transparent, #D4A844, transparent)',
              }}
            />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <AutoSlider />
          </div>
        </div>
      </div>

      {/* Bottom info bar with enhanced styling */}
      <div
        className="absolute bottom-0 left-0 right-0 px-8 py-5 flex justify-between items-center glass-dark"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent), rgba(0,0,0,0.3)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(212,168,68,0.2)',
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-gray-400 text-xs tracking-wide font-semibold">KIOSK AKTIF</span>
        </div>
        <span
          className="text-xs font-light tracking-widest"
          style={{ color: 'rgba(212,168,68,0.7)' }}
        >
          PHOTOBOOTH v2.0 PREMIUM
        </span>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-gray-400 text-xs tracking-wide font-semibold">KAMERA SIAP</span>
        </div>
      </div>

      {/* Elegant corner decorations with enhanced styling */}
      {[
        { pos: 'top-6 left-6', styles: 'borderT borderL' },
        { pos: 'top-6 right-6', styles: 'borderT borderR' },
        { pos: 'bottom-20 left-6', styles: 'borderB borderL' },
        { pos: 'bottom-20 right-6', styles: 'borderB borderR' },
      ].map((corner, i) => (
        <div
          key={i}
          className={`absolute ${corner.pos} w-8 h-8 transition-all hover:scale-125 hover:shadow-lg`}
          style={{
            borderTop: corner.styles.includes('borderT') ? '2px solid rgba(212,168,68,0.6)' : 'none',
            borderLeft: corner.styles.includes('borderL') ? '2px solid rgba(212,168,68,0.6)' : 'none',
            borderBottom: corner.styles.includes('borderB') ? '2px solid rgba(212,168,68,0.6)' : 'none',
            borderRight: corner.styles.includes('borderR') ? '2px solid rgba(212,168,68,0.6)' : 'none',
            boxShadow: 'hover' ? 'inset 0 0 10px rgba(212,168,68,0.3)' : 'none',
          }}
        />
      ))}
    </div>
  );
}

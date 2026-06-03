import { useEffect, useState } from 'react';
import { Layers, Cpu, ImageIcon, CheckCircle } from 'lucide-react';

interface Props {
  onDone: () => void;
}

const STEPS = [
  { label: 'Mengambil frame dari kamera', icon: ImageIcon, duration: 800 },
  { label: 'Menerapkan overlay template', icon: Layers, duration: 1200 },
  { label: 'Memproses komposit gambar', icon: Cpu, duration: 1000 },
  { label: 'Menyimpan ke penyimpanan lokal', icon: CheckCircle, duration: 700 },
];

export default function ProcessingScreen({ onDone }: Props) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let total = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    STEPS.forEach((s, i) => {
      total += s.duration;
      const t = setTimeout(() => setStep(i + 1), total);
      timers.push(t);
    });

    const done = setTimeout(() => onDone(), total + 300);
    timers.push(done);

    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  useEffect(() => {
    const totalDuration = STEPS.reduce((a, s) => a + s.duration, 0);
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + 100 / (totalDuration / 50);
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 50%, #0d0a00 0%, #0a0a0a 70%)' }}
    >
      {/* Background rings */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="absolute rounded-full animate-spin-slow"
          style={{
            width: `${i * 250}px`,
            height: `${i * 250}px`,
            border: `1px solid rgba(212,168,68,${0.15 / i})`,
            animationDuration: `${i * 10}s`,
            animationDirection: i % 2 === 0 ? 'reverse' : 'normal',
          }}
        />
      ))}

      {/* Central processor icon */}
      <div className="relative mb-10 z-10">
        <div
          className="w-28 h-28 rounded-2xl flex items-center justify-center"
          style={{
            background: 'rgba(212,168,68,0.1)',
            border: '1px solid rgba(212,168,68,0.4)',
            boxShadow: '0 0 40px rgba(212,168,68,0.3)',
          }}
        >
          <Cpu size={52} className="text-amber-400 animate-pulse" />
        </div>
      </div>

      {/* Title */}
      <h2
        className="text-3xl font-bold mb-2 z-10 text-center"
        style={{ fontFamily: 'Playfair Display, serif' }}
      >
        <span className="shimmer-text">Memproses</span>
        <span className="text-white"> Foto</span>
      </h2>
      <p className="text-gray-500 text-sm z-10 mb-10">Harap tunggu sebentar...</p>

      {/* Steps list */}
      <div className="z-10 w-full max-w-sm px-8 space-y-4 mb-8">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const done = step > i;
          const active = step === i;
          return (
            <div
              key={i}
              className="flex items-center gap-3 transition-all duration-300"
              style={{ opacity: step >= i ? 1 : 0.3 }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                  background: done
                    ? 'rgba(74,222,128,0.15)'
                    : active
                    ? 'rgba(212,168,68,0.15)'
                    : 'rgba(255,255,255,0.05)',
                  border: done
                    ? '1px solid rgba(74,222,128,0.5)'
                    : active
                    ? '1px solid rgba(212,168,68,0.5)'
                    : '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {done ? (
                  <CheckCircle size={16} className="text-green-400" />
                ) : (
                  <Icon
                    size={15}
                    className={active ? 'text-amber-400' : 'text-gray-600'}
                  />
                )}
              </div>
              <span
                className={`text-sm transition-colors ${
                  done ? 'text-green-400' : active ? 'text-amber-300' : 'text-gray-600'
                }`}
              >
                {s.label}
              </span>
              {active && (
                <div className="ml-auto">
                  <div className="w-4 h-4 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                </div>
              )}
              {done && (
                <span className="ml-auto text-green-400 text-xs">✓</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="z-10 w-full max-w-sm px-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-500 text-xs">Progress</span>
          <span className="text-amber-400 text-xs font-mono font-bold">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #D4A844, #F0C96A)',
              boxShadow: '0 0 10px rgba(212,168,68,0.5)',
            }}
          />
        </div>
      </div>
    </div>
  );
}

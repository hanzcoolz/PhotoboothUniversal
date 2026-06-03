import { useState, useEffect, useCallback } from 'react';
import { Camera, ZoomIn, Aperture, Timer } from 'lucide-react';
import { SessionType } from '../../types';
import { soundSynth } from '../../utils/soundSynthesizer';

interface Props {
  sessionType: SessionType;
  onComplete: (frames: string[]) => void;
}

type CaptureState = 'preview' | 'countdown' | 'flash' | 'captured' | 'done';

const TOTAL_FRAMES: Record<SessionType, number> = {
  photo: 3,
  gif: 6,
  boomerang: 6,
  video: 1,
};

const SESSION_LABELS: Record<SessionType, string> = {
  photo: 'Photo Strip',
  gif: 'Animated GIF',
  boomerang: 'Boomerang',
  video: 'Short Video',
};

// Mock frame images from Pexels
const MOCK_FRAMES = [
  'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=400',
];

export default function CaptureScreen({ sessionType, onComplete }: Props) {
  const totalFrames = TOTAL_FRAMES[sessionType];
  const [currentFrame, setCurrentFrame] = useState(0);
  const [captureState, setCaptureState] = useState<CaptureState>('preview');
  const [countdown, setCountdown] = useState(3);
  const [capturedFrames, setCapturedFrames] = useState<string[]>([]);
  const [flashOpacity, setFlashOpacity] = useState(0);

  const startCountdown = useCallback(() => {
    soundSynth.countdownBeep();
    setCaptureState('countdown');
    setCountdown(3);
  }, []);

  useEffect(() => {
    if (captureState !== 'countdown') return;
    if (countdown <= 0) {
      // Trigger capture with sound
      soundSynth.shutter();
      setCaptureState('flash');
      setFlashOpacity(1);
      setTimeout(() => {
        setFlashOpacity(0);
        const newFrames = [...capturedFrames, MOCK_FRAMES[currentFrame % MOCK_FRAMES.length]];
        setCapturedFrames(newFrames);
        setCaptureState('captured');
        soundSynth.beep(1200, 100);
        setTimeout(() => {
          if (currentFrame + 1 >= totalFrames) {
            setCaptureState('done');
            soundSynth.successChime();
            setTimeout(() => onComplete(newFrames), 800);
          } else {
            setCurrentFrame((p) => p + 1);
            setCaptureState('preview');
            soundSynth.beep(600, 80);
          }
        }, 1200);
      }, 200);
      return;
    }
    const t = setTimeout(() => {
      setCountdown((c) => c - 1);
      if (countdown > 1) soundSynth.countdownBeep();
    }, 1000);
    return () => clearTimeout(t);
  }, [captureState, countdown, capturedFrames, currentFrame, totalFrames, onComplete]);

  const isVideo = sessionType === 'video';

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{ background: '#000' }}
    >
      {/* Flash overlay */}
      <div
        className="absolute inset-0 z-50 bg-white pointer-events-none transition-opacity duration-100"
        style={{ opacity: flashOpacity }}
      />

      {/* Live preview / camera feed area */}
      <div className="relative h-full">
        {/* Mock camera preview */}
        <div
          className="w-full h-full relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          }}
        >
          {/* Simulated live feed grid lines */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(212,168,68,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(212,168,68,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Center composition guides */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="relative"
              style={{ width: '60%', height: '75%' }}
            >
              {/* Rule of thirds grid */}
              <div className="absolute inset-0" style={{ border: '1px solid rgba(212,168,68,0.2)' }} />
              <div className="absolute left-1/3 top-0 bottom-0" style={{ borderLeft: '1px solid rgba(212,168,68,0.15)' }} />
              <div className="absolute left-2/3 top-0 bottom-0" style={{ borderLeft: '1px solid rgba(212,168,68,0.15)' }} />
              <div className="absolute top-1/3 left-0 right-0" style={{ borderTop: '1px solid rgba(212,168,68,0.15)' }} />
              <div className="absolute top-2/3 left-0 right-0" style={{ borderTop: '1px solid rgba(212,168,68,0.15)' }} />

              {/* Crosshair corners */}
              {[
                'top-0 left-0 border-t border-l',
                'top-0 right-0 border-t border-r',
                'bottom-0 left-0 border-b border-l',
                'bottom-0 right-0 border-b border-r',
              ].map((cls, i) => (
                <div
                  key={i}
                  className={`absolute w-6 h-6 ${cls}`}
                  style={{ borderColor: 'rgba(212,168,68,0.7)', borderWidth: '2px' }}
                />
              ))}
            </div>
          </div>

          {/* Overlay template preview hint */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Camera size={80} className="opacity-5 text-white" />
          </div>
        </div>
      </div>

      {/* Countdown overlay */}
      {captureState === 'countdown' && countdown > 0 && (
        <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
          <div
            key={countdown}
            className="animate-countdown font-black text-center"
            style={{
              fontSize: 'clamp(8rem, 25vw, 20rem)',
              color: '#D4A844',
              textShadow: '0 0 60px rgba(212,168,68,0.8), 0 0 120px rgba(212,168,68,0.4)',
              lineHeight: 1,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {countdown}
          </div>
        </div>
      )}

      {/* Frame strip indicator (bottom) */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        {/* Captured frames thumbnails */}
        <div className="flex items-end justify-center gap-3 px-6 pb-3">
          {Array.from({ length: totalFrames }).map((_, i) => (
            <div
              key={i}
              className="relative rounded-lg overflow-hidden transition-all duration-300"
              style={{
                width: capturedFrames[i] ? '70px' : '50px',
                height: capturedFrames[i] ? '90px' : '65px',
                border: i === currentFrame && captureState !== 'done'
                  ? '2px solid #D4A844'
                  : capturedFrames[i]
                  ? '2px solid rgba(74,222,128,0.5)'
                  : '2px solid rgba(255,255,255,0.15)',
                boxShadow: i === currentFrame ? '0 0 15px rgba(212,168,68,0.5)' : 'none',
              }}
            >
              {capturedFrames[i] ? (
                <img
                  src={capturedFrames[i]}
                  alt={`Frame ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  <span className="text-white font-bold text-xs opacity-50">{i + 1}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Control bar */}
        <div
          className="px-6 py-4 flex items-center justify-between"
          style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)' }}
        >
          {/* Left info */}
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-0.5">{SESSION_LABELS[sessionType]}</p>
            <p className="text-white font-semibold text-sm">
              Frame {Math.min(currentFrame + 1, totalFrames)} / {totalFrames}
            </p>
          </div>

          {/* Capture button */}
          <button
            onClick={startCountdown}
            disabled={captureState !== 'preview'}
            className="relative w-20 h-20 rounded-full transition-all"
            style={{
              background:
                captureState === 'preview'
                  ? 'radial-gradient(circle, #F0C96A 0%, #D4A844 100%)'
                  : 'rgba(255,255,255,0.1)',
              boxShadow: captureState === 'preview' ? '0 0 30px rgba(212,168,68,0.6)' : 'none',
              cursor: captureState === 'preview' ? 'pointer' : 'not-allowed',
            }}
          >
            {captureState === 'preview' && (
              <div className="absolute inset-2 rounded-full bg-white opacity-90 flex items-center justify-center">
                <Camera size={28} className="text-black" />
              </div>
            )}
            {captureState === 'countdown' && (
              <div className="w-full h-full rounded-full flex items-center justify-center">
                <Timer size={28} className="text-amber-400" />
              </div>
            )}
            {(captureState === 'captured' || captureState === 'done') && (
              <div className="w-full h-full rounded-full flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-green-400 animate-pulse" />
              </div>
            )}
          </button>

          {/* Right info */}
          <div className="text-right">
            <div className="flex items-center gap-1.5 justify-end mb-0.5">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs">LIVE</span>
            </div>
            <div className="flex items-center gap-1.5 justify-end">
              <Aperture size={12} className="text-gray-500" />
              <span className="text-gray-500 text-xs">f/2.8</span>
              <ZoomIn size={12} className="text-gray-500" />
              <span className="text-gray-500 text-xs">1x</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top overlay status */}
      <div className="absolute top-0 left-0 right-0 z-30 px-6 py-4 flex items-center justify-between"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)' }}
      >
        <span
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: 'rgba(212,168,68,0.8)' }}
        >
          {SESSION_LABELS[sessionType]}
        </span>

        {isVideo && (
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.4)' }}
          >
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 text-xs font-semibold">REC</span>
          </div>
        )}

        <span className="text-gray-500 text-xs">Kamera Siap</span>
      </div>
    </div>
  );
}

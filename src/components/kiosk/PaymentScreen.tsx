import { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, CheckCircle, Clock, AlertCircle, QrCode, Smartphone, Wifi } from 'lucide-react';
import { SessionType } from '../../types';
import { soundSynth } from '../../utils/soundSynthesizer';

interface Props {
  sessionType: SessionType;
  onPaid: () => void;
  onBack: () => void;
}

const prices: Record<SessionType, number> = {
  photo: 50000,
  gif: 75000,
  boomerang: 75000,
  video: 100000,
};

const labels: Record<SessionType, string> = {
  photo: 'Photo Strip',
  gif: 'Animated GIF',
  boomerang: 'Boomerang',
  video: 'Short Video',
};

function formatRupiah(n: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(n);
}

type PayState = 'idle' | 'generating' | 'waiting' | 'paid' | 'expired';

export default function PaymentScreen({ sessionType, onPaid, onBack }: Props) {
  const [payState, setPayState] = useState<PayState>('idle');
  const [timeLeft, setTimeLeft] = useState(300); // 5 min for demo

  useEffect(() => {
    const t = setTimeout(() => setPayState('generating'), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (payState === 'generating') {
      soundSynth.processingSound();
      const t = setTimeout(() => {
        setPayState('waiting');
        soundSynth.beep(800, 150);
      }, 1800);
      return () => clearTimeout(t);
    }
  }, [payState]);

  // Countdown timer when waiting
  useEffect(() => {
    if (payState !== 'waiting') return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setPayState('expired');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [payState]);

  const amount = prices[sessionType];
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  // Demo: simulate payment
  const simulatePaid = () => {
    soundSynth.countdownBeep();
    setPayState('paid');
    setTimeout(() => {
      soundSynth.successChime();
      onPaid();
    }, 1500);
  };

  return (
    <div
      className="relative w-full min-h-screen overflow-auto"
      style={{ background: 'radial-gradient(ellipse at 70% 30%, #001a0e 0%, #0a0a0a 60%)' }}
    >
      {/* Top bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-8 py-4 glass-dark">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          disabled={payState === 'paid'}
        >
          <ArrowLeft size={20} />
          <span className="text-sm">Kembali</span>
        </button>
        <span
          className="text-sm font-semibold tracking-widest uppercase"
          style={{ color: 'rgba(212,168,68,0.8)' }}
        >
          Pembayaran QRIS
        </span>
        <div className="w-20" />
      </div>

      <div className="px-6 py-8 max-w-3xl mx-auto">
        {/* Order summary card */}
        <div
          className="rounded-2xl p-5 mb-6 animate-fade-in-up"
          style={{
            background: 'rgba(212,168,68,0.07)',
            border: '1px solid rgba(212,168,68,0.25)',
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Sesi yang dipilih</p>
              <p className="text-white font-semibold text-lg">{labels[sessionType]}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Total Pembayaran</p>
              <p
                className="font-bold text-2xl"
                style={{ color: '#D4A844' }}
              >
                {formatRupiah(amount)}
              </p>
            </div>
          </div>
        </div>

        {/* QR Code area */}
        <div
          className="rounded-2xl p-8 mb-6 text-center animate-scale-in"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {payState === 'idle' && (
            <div className="py-8 text-gray-500">
              <QrCode size={40} className="mx-auto mb-3 opacity-30" />
              <p>Mempersiapkan pembayaran...</p>
            </div>
          )}

          {payState === 'generating' && (
            <div className="py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
              <p className="text-gray-400">Membuat QRIS...</p>
              <p className="text-gray-600 text-sm mt-1">Menghubungi gateway pembayaran</p>
            </div>
          )}

          {(payState === 'waiting' || payState === 'paid') && (
            <>
              {payState === 'paid' ? (
                <div className="py-6 animate-scale-in">
                  <CheckCircle
                    size={80}
                    className="mx-auto mb-4 text-green-400"
                    style={{ filter: 'drop-shadow(0 0 20px rgba(74,222,128,0.5))' }}
                  />
                  <p className="text-white text-xl font-bold">Pembayaran Berhasil!</p>
                  <p className="text-gray-400 mt-2">Memulai sesi foto...</p>
                </div>
              ) : (
                <>
                  {/* Mock QR Code */}
                  <div className="inline-block p-4 bg-white rounded-2xl mb-4 relative">
                    {/* Simulated QR with grid pattern */}
                    <div
                      className="w-52 h-52 relative"
                      style={{
                        backgroundImage: `
                          repeating-linear-gradient(0deg, #000 0px, #000 8px, transparent 8px, transparent 16px),
                          repeating-linear-gradient(90deg, #000 0px, #000 8px, transparent 8px, transparent 16px)
                        `,
                        backgroundSize: '16px 16px',
                      }}
                    >
                      <div
                        className="absolute inset-4"
                        style={{
                          background: 'radial-gradient(circle at 30% 30%, #000 20%, transparent 20%)',
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white p-2 rounded">
                          <QrCode size={32} className="text-black" />
                        </div>
                      </div>
                    </div>
                    {/* Corner marks */}
                    {['top-left', 'top-right', 'bottom-left'].map((pos) => (
                      <div
                        key={pos}
                        className={`absolute w-12 h-12 border-4 border-black ${
                          pos === 'top-left' ? 'top-4 left-4 rounded-tl-lg' :
                          pos === 'top-right' ? 'top-4 right-4 rounded-tr-lg' :
                          'bottom-4 left-4 rounded-bl-lg'
                        }`}
                      />
                    ))}
                  </div>

                  {/* QRIS logo */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="h-1 w-8 bg-red-500 rounded" />
                    <span className="font-black text-gray-800 bg-white px-3 py-1 rounded text-sm">QRIS</span>
                    <div className="h-1 w-8 bg-blue-500 rounded" />
                  </div>

                  <p className="text-gray-300 font-semibold mb-2">Scan dengan aplikasi banking Anda</p>
                  <p className="text-gray-500 text-sm mb-4">GoPay · OVO · Dana · ShopeePay · m-Banking</p>

                  {/* Timer */}
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                    style={{
                      background: timeLeft < 60 ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${timeLeft < 60 ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.1)'}`,
                    }}
                  >
                    <Clock size={14} className={timeLeft < 60 ? 'text-red-400' : 'text-gray-400'} />
                    <span className={`font-mono font-bold ${timeLeft < 60 ? 'text-red-400' : 'text-gray-300'}`}>
                      {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4 h-1 rounded-full bg-gray-800 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(timeLeft / 300) * 100}%`,
                        background: timeLeft < 60 ? '#ef4444' : '#D4A844',
                      }}
                    />
                  </div>
                </>
              )}
            </>
          )}

          {payState === 'expired' && (
            <div className="py-8">
              <AlertCircle size={56} className="mx-auto mb-4 text-red-400" />
              <p className="text-white text-lg font-semibold">Waktu Habis</p>
              <p className="text-gray-400 text-sm mt-2 mb-6">Sesi pembayaran telah berakhir</p>
              <button
                onClick={() => { setPayState('idle'); setTimeLeft(300); }}
                className="flex items-center gap-2 mx-auto px-6 py-3 rounded-full text-sm font-semibold"
                style={{ background: 'rgba(212,168,68,0.15)', border: '1px solid rgba(212,168,68,0.4)', color: '#D4A844' }}
              >
                <RefreshCw size={16} />
                Buat QRIS Baru
              </button>
            </div>
          )}
        </div>

        {/* Instructions */}
        {payState === 'waiting' && (
          <div className="grid grid-cols-3 gap-3 mb-6 animate-fade-in">
            {[
              { icon: Smartphone, label: 'Buka aplikasi banking / dompet digital' },
              { icon: QrCode, label: 'Scan QR code di atas layar' },
              { icon: CheckCircle, label: 'Konfirmasi nominal & selesaikan' },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  className="rounded-xl p-3 text-center"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center mx-auto mb-2"
                    style={{ background: 'rgba(212,168,68,0.1)', border: '1px solid rgba(212,168,68,0.3)' }}
                  >
                    <Icon size={16} className="text-amber-400" />
                  </div>
                  <p className="text-gray-400 text-xs leading-snug">{step.label}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* Status row */}
        <div
          className="flex items-center justify-between rounded-xl px-5 py-3"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-2">
            <Wifi size={14} className="text-green-400" />
            <span className="text-gray-500 text-xs">Menunggu konfirmasi pembayaran</span>
          </div>
          {payState === 'waiting' && (
            // Demo shortcut button
            <button
              onClick={simulatePaid}
              className="px-4 py-1.5 rounded-full text-xs font-semibold text-green-400"
              style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)' }}
            >
              [Demo] Bayar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

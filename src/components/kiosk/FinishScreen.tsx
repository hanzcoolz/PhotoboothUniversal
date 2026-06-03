import { useState, useEffect } from 'react';
import { Printer, MessageCircle, Download, QrCode, Share2, Home, CheckCircle, Mail, Wand2 } from 'lucide-react';
import AIMagicStudio from './AIMagicStudio';
import FrameLayoutSelector from './FrameLayoutSelector';
import { soundSynth } from '../../utils/soundSynthesizer';

interface Props {
  frames: string[];
  onHome: () => void;
}

type ShareState = 'idle' | 'printing' | 'printed' | 'sharing' | 'shared';

export default function FinishScreen({ frames, onHome }: Props) {
  const [printState, setPrintState] = useState<ShareState>('idle');
  const [showWaModal, setShowWaModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [phone, setPhone] = useState('');

  // Play success sound on mount
  useEffect(() => {
    soundSynth.successChime();
  }, []);

  const handlePrint = () => {
    soundSynth.processingSound();
    setPrintState('printing');
    setTimeout(() => {
      setPrintState('printed');
      soundSynth.successChime();
    }, 3000);
  };

  const handleWa = () => {
    soundSynth.beep(600, 150);
    setShowWaModal(true);
  };

  // Use the first frame as the "processed" result, or a fallback
  const resultImg =
    frames[0] ||
    'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400';

  return (
    <div
      className="relative w-full min-h-screen overflow-auto"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, #0a0d00 0%, #0a0a0a 60%)' }}
    >
      {/* Top bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-8 py-4 glass-dark">
        <div />
        <span
          className="text-sm font-semibold tracking-widest uppercase"
          style={{ color: 'rgba(212,168,68,0.8)' }}
        >
          Sesi Selesai!
        </span>
        <div className="w-20" />
      </div>

      <div className="px-6 py-8 max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <CheckCircle
            size={48}
            className="mx-auto mb-4 text-green-400"
            style={{ filter: 'drop-shadow(0 0 15px rgba(74,222,128,0.5))' }}
          />
          <h2
            className="text-3xl font-bold text-white mb-2"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Foto Siap!
          </h2>
          <p className="text-gray-400">Foto kamu sudah diproses dan siap dicetak atau dibagikan</p>
        </div>

        {/* Photo strip preview */}
        <div
          className="rounded-2xl overflow-hidden mb-8 animate-scale-in"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(212,168,68,0.25)',
            boxShadow: '0 0 40px rgba(212,168,68,0.1)',
          }}
        >
          {/* Overlay strip mockup */}
          <div
            className="p-4"
            style={{
              background: 'linear-gradient(135deg, #1a1008 0%, #0d0a00 100%)',
              borderBottom: '1px solid rgba(212,168,68,0.2)',
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div
                className="h-0.5 flex-1"
                style={{ background: 'linear-gradient(90deg, rgba(212,168,68,0.5), transparent)' }}
              />
              <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">Photo Strip</span>
              <div
                className="h-0.5 flex-1"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(212,168,68,0.5))' }}
              />
            </div>

            {/* Frames in strip layout */}
            <div
              className="flex gap-2 justify-center"
              style={{ padding: '0 8px' }}
            >
              {(frames.length > 0 ? frames : [
                'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400',
                'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
                'https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg?auto=compress&cs=tinysrgb&w=400',
              ]).map((f, i) => (
                <div
                  key={i}
                  className="rounded-lg overflow-hidden flex-1"
                  style={{
                    border: '1px solid rgba(212,168,68,0.3)',
                    aspectRatio: '3/4',
                    maxWidth: '140px',
                  }}
                >
                  <img
                    src={f}
                    alt={`Frame ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="mt-3 text-center">
              <p className="text-amber-400 text-xs tracking-widest uppercase opacity-60">
                Demo Wedding Jakarta · 2026
              </p>
            </div>
          </div>
        </div>

        {/* AI Magic Studio */}
        {showAI && (
          <div className="mb-6">
            <AIMagicStudio />
          </div>
        )}

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Print */}
          <button
            onClick={handlePrint}
            disabled={printState === 'printing' || printState === 'printed'}
            className="kiosk-btn flex flex-col items-center gap-3 p-5 rounded-2xl transition-all"
            style={{
              background:
                printState === 'printed'
                  ? 'rgba(74,222,128,0.1)'
                  : 'rgba(255,255,255,0.05)',
              border:
                printState === 'printed'
                  ? '1px solid rgba(74,222,128,0.4)'
                  : printState === 'printing'
                  ? '1px solid rgba(212,168,68,0.4)'
                  : '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {printState === 'printing' ? (
              <div className="w-10 h-10 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
            ) : printState === 'printed' ? (
              <CheckCircle size={36} className="text-green-400" />
            ) : (
              <Printer size={36} className="text-gray-300" />
            )}
            <div>
              <p className="text-white font-semibold text-base">
                {printState === 'printing' ? 'Mencetak...' : printState === 'printed' ? 'Dicetak!' : 'Cetak Foto'}
              </p>
              <p className="text-gray-500 text-xs mt-0.5">Printer lokal</p>
            </div>
          </button>

          {/* WhatsApp */}
          <button
            onClick={handleWa}
            className="kiosk-btn flex flex-col items-center gap-3 p-5 rounded-2xl"
            style={{
              background: 'rgba(37,211,102,0.08)',
              border: '1px solid rgba(37,211,102,0.3)',
            }}
          >
            <MessageCircle size={36} className="text-green-400" />
            <div>
              <p className="text-white font-semibold text-base">WhatsApp</p>
              <p className="text-gray-500 text-xs mt-0.5">Kirim ke HP</p>
            </div>
          </button>

          {/* AI Magic */}
          <button
            onClick={() => {
              soundSynth.beep(800, 100);
              setShowAI(!showAI);
            }}
            className="kiosk-btn flex flex-col items-center gap-3 p-5 rounded-2xl"
            style={{
              background: 'rgba(168,85,247,0.08)',
              border: '1px solid rgba(168,85,247,0.3)',
            }}
          >
            <Wand2 size={36} className="text-purple-400" />
            <div>
              <p className="text-white font-semibold text-base">AI Magic</p>
              <p className="text-gray-500 text-xs mt-0.5">Edit dengan AI</p>
            </div>
          </button>

          {/* QR Download */}
          <button
            onClick={() => {
              soundSynth.beep(600, 100);
              setShowQrModal(true);
            }}
            className="kiosk-btn flex flex-col items-center gap-3 p-5 rounded-2xl"
            style={{
              background: 'rgba(56,189,248,0.08)',
              border: '1px solid rgba(56,189,248,0.3)',
            }}
          >
            <QrCode size={36} className="text-sky-400" />
            <div>
              <p className="text-white font-semibold text-base">QR Download</p>
              <p className="text-gray-500 text-xs mt-0.5">Scan & unduh</p>
            </div>
          </button>
        </div>

        {/* Drive sync status */}
        <div
          className="flex items-center gap-3 rounded-xl px-4 py-3 mb-6"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <div>
            <p className="text-gray-300 text-sm font-medium">Sinkronisasi Google Drive</p>
            <p className="text-gray-600 text-xs">Mengupload foto ke backup cloud...</p>
          </div>
          <Share2 size={16} className="ml-auto text-gray-600" />
        </div>

        {/* Home button */}
        <button
          onClick={() => {
            soundSynth.beep(400, 200);
            onHome();
          }}
          className="kiosk-btn w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-base"
          style={{
            background: 'linear-gradient(135deg, #D4A844, #F0C96A)',
            color: '#000',
          }}
        >
          <Home size={20} />
          Selesai & Kembali ke Awal
        </button>
      </div>

      {/* Modals... (rest unchanged) */}

      {/* WhatsApp modal */}
      {showWaModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: 'rgba(0,0,0,0.85)' }}
          onClick={() => setShowWaModal(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl p-6 animate-scale-in"
            style={{ background: '#111', border: '1px solid rgba(37,211,102,0.3)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <MessageCircle size={36} className="text-green-400 mb-4 mx-auto block" />
            <h3 className="text-white font-bold text-lg text-center mb-2">Kirim via WhatsApp</h3>
            <p className="text-gray-400 text-sm text-center mb-5">Masukkan nomor HP untuk menerima link foto</p>
            <input
              type="tel"
              placeholder="+62 812 3456 7890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl px-4 py-3 text-white text-base mb-4 outline-none"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            />
            <button
              onClick={() => {
                soundSynth.successChime();
                setShowWaModal(false);
              }}
              className="kiosk-btn w-full py-3 rounded-xl font-bold text-black"
              style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
            >
              <Download size={18} className="inline mr-2" />
              Kirim Sekarang
            </button>
          </div>
        </div>
      )}

      {/* QR Download modal */}
      {showQrModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: 'rgba(0,0,0,0.85)' }}
          onClick={() => setShowQrModal(false)}
        >
          <div
            className="w-full max-w-xs rounded-2xl p-6 text-center animate-scale-in"
            style={{ background: '#111', border: '1px solid rgba(56,189,248,0.3)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-white font-bold text-lg mb-2">Scan QR untuk Download</h3>
            <p className="text-gray-400 text-sm mb-5">Scan dengan kamera HP untuk download foto</p>
            {/* Mock QR */}
            <div className="bg-white p-4 rounded-xl inline-block mb-4">
              <div
                className="w-40 h-40 relative"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(0deg, #000 0, #000 6px, transparent 6px, transparent 12px),
                    repeating-linear-gradient(90deg, #000 0, #000 6px, transparent 6px, transparent 12px)
                  `,
                  backgroundSize: '12px 12px',
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white p-1 rounded">
                    <QrCode size={28} className="text-black" />
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sky-400 text-xs mb-4">drive.google.com/file/d/mock-id</p>
            <button
              onClick={() => {
                soundSynth.beep(400, 100);
                setShowQrModal(false);
              }}
              className="text-gray-400 text-sm underline"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

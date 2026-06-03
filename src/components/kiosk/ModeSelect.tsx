import { Camera, Film, Video, RefreshCw, ArrowLeft, Check } from 'lucide-react';
import { SessionType } from '../../types';

interface Props {
  onSelect: (type: SessionType) => void;
  onBack: () => void;
}

const modes = [
  {
    type: 'photo' as SessionType,
    label: 'Photo',
    sublabel: '3 Jepretan',
    desc: 'Strip foto klasik 3 frame dengan overlay premium',
    price: 50000,
    icon: Camera,
    color: '#D4A844',
    bg: 'rgba(212,168,68,0.1)',
    border: 'rgba(212,168,68,0.4)',
    features: ['3 foto strip', 'Overlay template', 'Print & share'],
  },
  {
    type: 'gif' as SessionType,
    label: 'GIF',
    sublabel: 'Animated',
    desc: 'Animasi GIF lucu dari serangkaian pose unik',
    price: 75000,
    icon: Film,
    color: '#38bdf8',
    bg: 'rgba(56,189,248,0.1)',
    border: 'rgba(56,189,248,0.4)',
    features: ['6 frame animasi', 'GIF looping', 'Share via WA'],
  },
  {
    type: 'boomerang' as SessionType,
    label: 'Boomerang',
    sublabel: 'Loop Effect',
    desc: 'Video boomerang pendek yang auto-loop seperti Instagram',
    price: 75000,
    icon: RefreshCw,
    color: '#f472b6',
    bg: 'rgba(244,114,182,0.1)',
    border: 'rgba(244,114,182,0.4)',
    features: ['Efek bolak-balik', 'MP4 format', 'Share via WA'],
  },
  {
    type: 'video' as SessionType,
    label: 'Video',
    sublabel: '15 Detik',
    desc: 'Video singkat berkualitas tinggi dengan overlay cinematic',
    price: 100000,
    icon: Video,
    color: '#4ade80',
    bg: 'rgba(74,222,128,0.1)',
    border: 'rgba(74,222,128,0.4)',
    features: ['Durasi 15 detik', 'MP4 HD', 'Download & share'],
  },
];

function formatRupiah(amount: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
}

export default function ModeSelect({ onSelect, onBack }: Props) {
  return (
    <div
      className="relative w-full min-h-screen overflow-auto"
      style={{
        background: 'radial-gradient(ellipse at 30% 20%, #0d0d1a 0%, #0a0a0a 70%)',
      }}
    >
      {/* Top bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-8 py-4 glass-dark">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm">Kembali</span>
        </button>
        <span
          className="text-sm font-semibold tracking-widest uppercase"
          style={{ color: 'rgba(212,168,68,0.8)' }}
        >
          Pilih Mode
        </span>
        <div className="w-20" />
      </div>

      <div className="px-6 py-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in-up">
          <h2
            className="text-4xl font-bold mb-3"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Pilih <span className="shimmer-text">Mode Sesi</span>
          </h2>
          <p className="text-gray-400 text-base">
            Setiap mode menghasilkan kenangan yang berbeda-beda
          </p>
        </div>

        {/* Mode cards grid */}
        <div className="grid grid-cols-2 gap-5 md:gap-6">
          {modes.map((mode, idx) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.type}
                onClick={() => onSelect(mode.type)}
                className="kiosk-btn relative rounded-2xl p-6 text-left group"
                style={{
                  background: mode.bg,
                  border: `1px solid ${mode.border}`,
                  animationDelay: `${idx * 0.1}s`,
                  animation: 'fadeInUp 0.5s ease forwards',
                  opacity: 0,
                }}
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{
                    background: `${mode.bg}`,
                    border: `1px solid ${mode.border}`,
                    boxShadow: `0 0 20px ${mode.bg}`,
                  }}
                >
                  <Icon size={26} style={{ color: mode.color }} />
                </div>

                {/* Labels */}
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-bold text-white">{mode.label}</span>
                  <span
                    className="text-xs font-semibold tracking-widest uppercase"
                    style={{ color: mode.color }}
                  >
                    {mode.sublabel}
                  </span>
                </div>

                <p className="text-gray-400 text-sm mb-5 leading-relaxed">{mode.desc}</p>

                {/* Features */}
                <ul className="space-y-1.5 mb-5">
                  {mode.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-gray-300 text-sm">
                      <Check size={13} style={{ color: mode.color }} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Price */}
                <div
                  className="flex items-center justify-between pt-4"
                  style={{ borderTop: `1px solid ${mode.border}` }}
                >
                  <span className="text-gray-500 text-xs uppercase tracking-wide">Harga</span>
                  <span className="text-lg font-bold" style={{ color: mode.color }}>
                    {formatRupiah(mode.price)}
                  </span>
                </div>

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at center, ${mode.bg} 0%, transparent 70%)`,
                    boxShadow: `0 0 40px ${mode.bg}`,
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Hint */}
        <p className="text-center text-gray-600 text-sm mt-8">
          Sentuh salah satu mode untuk melanjutkan ke pembayaran
        </p>
      </div>
    </div>
  );
}

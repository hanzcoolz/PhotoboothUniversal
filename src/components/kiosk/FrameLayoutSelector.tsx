import { useState } from 'react';
import { Grid3X3, Layers, RotateCw, Settings2 } from 'lucide-react';

interface FrameLayout {
  id: string;
  name: string;
  cols: number;
  rows: number;
  icon: string;
  preview: string;
  price?: number;
}

const FRAME_LAYOUTS: FrameLayout[] = [
  {
    id: 'classic-3x1',
    name: 'Classic 3x1',
    cols: 3,
    rows: 1,
    icon: '📸',
    preview: 'Tiga frame horizontal tradisional',
    price: 0, // Included
  },
  {
    id: 'grid-2x2',
    name: 'Grid 2x2',
    cols: 2,
    rows: 2,
    icon: '⊞',
    preview: 'Empat frame dalam grid sempurna',
    price: 10000,
  },
  {
    id: 'collage-5',
    name: 'Creative Collage',
    cols: 3,
    rows: 2,
    icon: '🎭',
    preview: 'Lima frame dengan layout kreatif',
    price: 15000,
  },
  {
    id: 'split-half',
    name: 'Split Screen',
    cols: 2,
    rows: 1,
    icon: '⫸',
    preview: 'Dua frame side-by-side besar',
    price: 0,
  },
  {
    id: 'panorama',
    name: 'Panorama Wide',
    cols: 4,
    rows: 1,
    icon: '⟷',
    preview: 'Empat frame panorama ultra wide',
    price: 20000,
  },
  {
    id: 'artistic-3x3',
    name: 'Artistic 3x3',
    cols: 3,
    rows: 3,
    icon: '✨',
    preview: 'Sembilan frame untuk maksimum detail',
    price: 25000,
  },
];

interface Props {
  onSelect: (layout: FrameLayout) => void;
  selectedId?: string;
}

function formatRupiah(n: number) {
  if (n === 0) return 'Gratis';
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);
}

export default function FrameLayoutSelector({ onSelect, selectedId }: Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(34,197,94,0.05) 100%)',
        border: '1px solid rgba(59,130,246,0.2)',
      }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(59,130,246,0.2)' }}>
            <Grid3X3 size={20} className="text-blue-400" />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">Pilih Layout Frame</h3>
            <p className="text-gray-400 text-xs mt-0.5">Berbagai pilihan layout foto premium</p>
          </div>
        </div>

        {/* Grid layouts */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {FRAME_LAYOUTS.map((layout) => {
            const isSelected = selectedId === layout.id;
            const isHovered = hoveredId === layout.id;

            return (
              <button
                key={layout.id}
                onClick={() => onSelect(layout)}
                onMouseEnter={() => setHoveredId(layout.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative rounded-xl overflow-hidden group transition-all"
                style={{
                  background: isSelected
                    ? 'rgba(59,130,246,0.25)'
                    : 'rgba(255,255,255,0.06)',
                  border: isSelected
                    ? '2px solid #3b82f6'
                    : '1px solid rgba(255,255,255,0.1)',
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                {/* Layout preview grid */}
                <div className="p-3 aspect-square flex flex-col items-center justify-center gap-1">
                  <div
                    className="w-full flex flex-wrap gap-1"
                    style={{
                      gridTemplateColumns: `repeat(${layout.cols}, 1fr)`,
                    }}
                  >
                    {Array.from({ length: layout.cols * layout.rows }).map((_, i) => (
                      <div
                        key={i}
                        className="rounded"
                        style={{
                          background: isSelected ? 'rgba(59,130,246,0.5)' : 'rgba(255,255,255,0.1)',
                          border: '1px solid rgba(255,255,255,0.2)',
                          width: `${100 / layout.cols - 2}%`,
                          aspectRatio: '1',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Info overlay */}
                <div
                  className="absolute inset-0 rounded-xl flex flex-col justify-end p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.9))',
                  }}
                >
                  <p className="text-white font-semibold text-xs mb-0.5">{layout.name}</p>
                  <p className="text-gray-300 text-xs">{layout.preview}</p>
                  <p
                    className="text-xs font-bold mt-1"
                    style={{ color: layout.price === 0 ? '#4ade80' : '#f0c96a' }}
                  >
                    {formatRupiah(layout.price)}
                  </p>
                </div>

                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-blue-400 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Info box */}
        <div
          className="mt-4 rounded-lg p-3"
          style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}
        >
          <div className="flex items-start gap-2">
            <Settings2 size={14} className="text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-blue-300 text-xs font-semibold">Tips:</p>
              <p className="text-blue-200 text-xs mt-0.5">
                Pilih layout sesuai jumlah pose yang ingin Anda ambil. Semakin banyak frame, semakin detail hasilnya!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

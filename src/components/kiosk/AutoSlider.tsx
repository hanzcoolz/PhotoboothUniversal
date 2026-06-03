import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface GalleryItem {
  id: string;
  thumb: string;
  title: string;
  date: string;
  type: 'photo' | 'gif' | 'video';
}

const MOCK_GALLERY: GalleryItem[] = [
  { id: '1', thumb: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=300', title: 'Foto Pernikahan', date: '2 jam lalu', type: 'photo' },
  { id: '2', thumb: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300', title: 'GIF Lucu', date: '5 jam lalu', type: 'gif' },
  { id: '3', thumb: 'https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg?auto=compress&cs=tinysrgb&w=300', title: 'Video Cinematic', date: '1 hari lalu', type: 'video' },
  { id: '4', thumb: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=300', title: 'Boomerang', date: '2 hari lalu', type: 'photo' },
  { id: '5', thumb: 'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=300', title: 'Foto Group', date: '3 hari lalu', type: 'photo' },
  { id: '6', thumb: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=300', title: 'Selfie Premium', date: '4 hari lalu', type: 'photo' },
];

export default function AutoSlider() {
  const [offset, setOffset] = useState(0);
  const itemWidth = 180;
  const gap = 12;
  const itemWithGap = itemWidth + gap;

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => prev + 2);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const extendedGallery = [...MOCK_GALLERY, ...MOCK_GALLERY];

  const typeColors: Record<string, { bg: string; text: string }> = {
    photo: { bg: 'rgba(59,130,246,0.2)', text: '#60a5fa' },
    gif: { bg: 'rgba(34,197,94,0.2)', text: '#4ade80' },
    video: { bg: 'rgba(244,63,94,0.2)', text: '#f87171' },
  };

  return (
    <div className="relative w-full py-8 overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
      {/* Top row - LTR */}
      <div className="mb-4 overflow-hidden">
        <div
          className="flex gap-3"
          style={{
            transform: `translateX(-${offset % (itemWithGap * MOCK_GALLERY.length)}px)`,
            transition: 'none',
          }}
        >
          {extendedGallery.map((item, idx) => {
            const color = typeColors[item.type];
            return (
              <div
                key={`top-${idx}`}
                className="flex-shrink-0 rounded-xl overflow-hidden group cursor-pointer"
                style={{ width: itemWidth }}
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={item.thumb}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Overlay gradient */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.8))',
                    }}
                  />
                  {/* Badge */}
                  <div
                    className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold"
                    style={{ background: color.bg, color: color.text }}
                  >
                    {item.type.toUpperCase()}
                  </div>
                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 px-2 py-2">
                    <p className="text-white text-xs font-semibold truncate">{item.title}</p>
                    <p className="text-gray-300 text-xs">{item.date}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom row - RTL */}
      <div className="overflow-hidden">
        <div
          className="flex gap-3"
          style={{
            transform: `translateX(${offset % (itemWithGap * MOCK_GALLERY.length)}px)`,
            transition: 'none',
          }}
        >
          {[...extendedGallery].reverse().map((item, idx) => {
            const color = typeColors[item.type];
            return (
              <div
                key={`bottom-${idx}`}
                className="flex-shrink-0 rounded-xl overflow-hidden group cursor-pointer"
                style={{ width: itemWidth }}
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={item.thumb}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.8))',
                    }}
                  />
                  <div
                    className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold"
                    style={{ background: color.bg, color: color.text }}
                  >
                    {item.type.toUpperCase()}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 px-2 py-2">
                    <p className="text-white text-xs font-semibold truncate">{item.title}</p>
                    <p className="text-gray-300 text-xs">{item.date}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Left fade */}
      <div
        className="absolute top-0 left-0 w-24 h-full pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(10,10,10,1) 0%, transparent 100%)',
        }}
      />
      {/* Right fade */}
      <div
        className="absolute top-0 right-0 w-24 h-full pointer-events-none"
        style={{
          background: 'linear-gradient(to left, rgba(10,10,10,1) 0%, transparent 100%)',
        }}
      />

      {/* CTA button - hover overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
        style={{ background: 'rgba(0,0,0,0.3)' }}>
        <button
          className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white pointer-events-auto"
          style={{
            background: 'linear-gradient(135deg, #D4A844, #F0C96A)',
            color: '#000',
          }}
        >
          <ChevronRight size={16} />
          Lihat Galeri Lengkap
        </button>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Wand2, Loader, AlertCircle, Check, Copy } from 'lucide-react';

interface AIFilter {
  id: string;
  name: string;
  prompt: string;
  icon: string;
  description: string;
}

const AI_FILTERS: AIFilter[] = [
  { id: 'oil_paint', name: 'Oil Painting', prompt: 'Transform into oil painting style with rich textures', icon: '🎨', description: 'Classic art style' },
  { id: 'watercolor', name: 'Watercolor', prompt: 'Convert to beautiful watercolor painting aesthetic', icon: '🌊', description: 'Soft & flowing' },
  { id: 'cyberpunk', name: 'Cyberpunk', prompt: 'Apply neon cyberpunk style with vibrant colors', icon: '⚡', description: 'Futuristic glow' },
  { id: 'vintage', name: 'Vintage Film', prompt: 'Apply vintage film effect with film grain', icon: '📽️', description: 'Retro vibes' },
  { id: 'anime', name: 'Anime', prompt: 'Convert to anime/manga illustration style', icon: '✨', description: 'Manga aesthetic' },
  { id: 'sketch', name: 'Pencil Sketch', prompt: 'Create detailed pencil sketch version', icon: '✏️', description: 'Line art style' },
];

type AIState = 'idle' | 'processing' | 'success' | 'error' | 'fallback';

export default function AIMagicStudio() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [state, setState] = useState<AIState>('idle');
  const [retryCount, setRetryCount] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState('');

  const maxRetries = 5;

  // Exponential backoff retry logic
  const exponentialBackoff = (attempt: number): number => {
    return Math.min(1000 * Math.pow(2, attempt) + Math.random() * 1000, 10000);
  };

  // Mock Imagen 4.0 API call with exponential backoff
  const callImagenAPI = async (filterId: string, attempt: number = 0): Promise<string | null> => {
    try {
      // Simulate API call (replace with real Imagen endpoint)
      const filter = AI_FILTERS.find((f) => f.id === filterId);
      if (!filter) throw new Error('Filter not found');

      // Simulate API latency & potential failure
      const simulatedSuccess = Math.random() > 0.3 || attempt === maxRetries;

      if (!simulatedSuccess && attempt < maxRetries) {
        const delay = exponentialBackoff(attempt);
        console.log(`Attempt ${attempt + 1} failed, retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return callImagenAPI(filterId, attempt + 1);
      }

      if (!simulatedSuccess) {
        throw new Error('Max retries exceeded');
      }

      // Mock successful response with Pexels image (simulating Imagen output)
      const mockImages = [
        'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg?auto=compress&cs=tinysrgb&w=600',
      ];
      return mockImages[Math.floor(Math.random() * mockImages.length)];
    } catch (err) {
      console.error(`API Error (Attempt ${attempt}):`, err);
      if (attempt < maxRetries) {
        const delay = exponentialBackoff(attempt);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return callImagenAPI(filterId, attempt + 1);
      }
      return null;
    }
  };

  const applyFilter = async (filterId: string) => {
    setSelectedFilter(filterId);
    setState('processing');
    setError('');
    setRetryCount(0);
    setResultUrl(null);

    try {
      const result = await callImagenAPI(filterId);

      if (result) {
        setResultUrl(result);
        setState('success');
      } else {
        // Fallback to premium mockup
        setState('fallback');
        const filter = AI_FILTERS.find((f) => f.id === filterId);
        setResultUrl(`https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600&q=80`);
      }
    } catch (err) {
      setState('error');
      setError('Gagal memproses filter. Coba lagi nanti.');
    }
  };

  const filter = selectedFilter ? AI_FILTERS.find((f) => f.id === selectedFilter) : null;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(59,130,246,0.05) 100%)',
        border: '1px solid rgba(168,85,247,0.2)',
      }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(168,85,247,0.2)' }}>
            <Wand2 size={20} className="text-purple-400" />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">AI Magic Studio</h3>
            <p className="text-gray-400 text-xs mt-0.5">Powered by Imagen 4.0 dengan Exponential Backoff</p>
          </div>
        </div>

        {state === 'idle' && (
          <>
            <p className="text-gray-300 text-sm mb-4">Pilih filter AI untuk mengubah gaya foto Anda secara instan:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {AI_FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => applyFilter(f.id)}
                  className="group relative rounded-xl p-4 text-center transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <div className="text-2xl mb-1 group-hover:scale-125 transition-transform">{f.icon}</div>
                  <p className="text-white font-semibold text-sm">{f.name}</p>
                  <p className="text-gray-500 text-xs mt-1">{f.description}</p>
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: 'radial-gradient(ellipse at center, rgba(168,85,247,0.2) 0%, transparent 70%)' }} />
                </button>
              ))}
            </div>
          </>
        )}

        {state === 'processing' && (
          <div className="py-8 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full border-3 border-purple-400 border-t-transparent animate-spin" />
            <p className="text-white font-semibold mb-1">Menerapkan Filter AI...</p>
            <p className="text-gray-400 text-sm">Ini mungkin memakan waktu beberapa detik</p>
            <p className="text-gray-600 text-xs mt-3">Dengan exponential backoff (retry otomatis hingga 5x)</p>
          </div>
        )}

        {(state === 'success' || state === 'fallback') && resultUrl && (
          <div>
            <div className="rounded-xl overflow-hidden mb-4 relative">
              <img src={resultUrl} alt="AI Result" className="w-full h-48 object-cover" />
              {state === 'fallback' && (
                <div
                  className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold"
                  style={{ background: 'rgba(251,146,60,0.9)', color: '#fff' }}
                >
                  <AlertCircle size={12} />
                  Fallback Premium
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setState('idle')}
                className="flex-1 py-2 rounded-lg text-sm font-semibold text-white transition-all"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                Coba Filter Lain
              </button>
              <button
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold text-black"
                style={{ background: 'linear-gradient(135deg, #D4A844, #F0C96A)' }}
              >
                <Check size={14} />
                Terapkan
              </button>
            </div>
          </div>
        )}

        {state === 'error' && (
          <div className="py-6 text-center">
            <AlertCircle size={40} className="mx-auto text-red-400 mb-3" />
            <p className="text-white font-semibold mb-1">Terjadi Kesalahan</p>
            <p className="text-gray-400 text-sm mb-4">{error}</p>
            <button
              onClick={() => setState('idle')}
              className="px-6 py-2 rounded-lg text-sm font-semibold"
              style={{ background: 'rgba(168,85,247,0.2)', color: '#d8b4fe' }}
            >
              Kembali
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

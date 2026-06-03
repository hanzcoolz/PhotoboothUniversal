import { Copy, Check, Key, Calendar, Zap, XCircle, RefreshCw } from 'lucide-react';
import { useState } from 'react';

export default function AdminLicense() {
  const [copied, setCopied] = useState('');

  const license = {
    key: 'PBOOTH-DEMO-2026-X7K9M',
    plan: 'Pro',
    status: 'active',
    booth: 'Demo Jakarta',
    machine: 'DESKTOP-ABC123XYZ',
    activated: '2026-05-15',
    expires: '2026-12-31',
    forceReleases: { used: 2, limit: 3 },
  };

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(''), 2000);
  };

  const planColors: Record<string, string> = {
    Basic: '#60a5fa',
    Pro: '#fbbf24',
    Unlimited: '#34d399',
  };

  return (
    <div className="admin-scroll overflow-auto h-full bg-slate-950 text-white">
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Lisensi & Aktivasi</h1>
          <p className="text-slate-400 text-sm mt-0.5">Kelola lisensi booth dan perangkat yang terikat</p>
        </div>

        {/* Main license card */}
        <div
          className="rounded-2xl overflow-hidden mb-6"
          style={{
            background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(34,197,94,0.05) 100%)',
            border: '1px solid rgba(59,130,246,0.3)',
          }}
        >
          {/* Header */}
          <div
            className="px-6 py-5 flex items-center justify-between"
            style={{ background: 'rgba(59,130,246,0.15)', borderBottom: '1px solid rgba(59,130,246,0.2)' }}
          >
            <div>
              <h2 className="text-lg font-bold text-white">{license.booth}</h2>
              <p className="text-slate-400 text-sm mt-0.5">Lisensi aktif untuk photobooth ini</p>
            </div>
            <div
              className="px-4 py-2 rounded-lg text-sm font-bold"
              style={{ background: 'rgba(74,222,128,0.15)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.3)' }}
            >
              {license.status.toUpperCase()}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-5">
            {/* License key */}
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-widest mb-2">Kunci Lisensi</p>
              <div
                className="flex items-center gap-3 p-4 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <Key size={16} className="text-slate-500 flex-shrink-0" />
                <code className="text-white font-mono text-sm flex-1">{license.key}</code>
                <button
                  onClick={() => copy(license.key, 'key')}
                  className="text-slate-500 hover:text-white transition-colors flex-shrink-0"
                >
                  {copied === 'key' ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            {/* Grid info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Paket', value: license.plan, color: planColors[license.plan] },
                { label: 'Perangkat', value: license.machine, icon: true },
                { label: 'Diaktifkan', value: license.activated, icon: true },
                { label: 'Kadaluarsa', value: license.expires, icon: true },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-lg p-3"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">{item.label}</p>
                  <p
                    className="text-white font-semibold text-sm"
                    style={{ color: item.color || 'white' }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Machine binding info */}
            <div
              className="rounded-lg p-4"
              style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}
            >
              <div className="flex items-start gap-3">
                <Zap size={16} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-indigo-300 text-sm font-medium">Lisensi Terikat ke Perangkat</p>
                  <p className="text-indigo-200 text-xs mt-1">
                    Lisensi ini sudah terikat ke perangkat <code className="font-mono">{license.machine}</code>.
                    Untuk memindahkan ke PC lain, gunakan tombol "Cabut Lisensi" atau Force Release di bawah.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-all"
                style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }}
              >
                <Check size={16} />
                Lisensi Aktif
              </button>
              <button
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium"
                style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}
              >
                <XCircle size={16} />
                Cabut Lisensi
              </button>
            </div>
          </div>
        </div>

        {/* Force Release section */}
        <div
          className="rounded-2xl p-6"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <h3 className="text-lg font-bold text-white mb-1">Force Release Perangkat</h3>
          <p className="text-slate-400 text-sm mb-5">
            Jika perangkat lama rusak atau hilang, Anda dapat memaksa melepas lisensi dari sini.
          </p>

          <div
            className="rounded-lg p-4 mb-5"
            style={{ background: 'rgba(251,146,60,0.1)', border: '1px solid rgba(251,146,60,0.2)' }}
          >
            <div className="flex items-start gap-3">
              <RefreshCw size={16} className="text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-orange-300 text-sm font-medium">Batas Bulanan</p>
                <p className="text-orange-200 text-xs mt-1">
                  Anda telah menggunakan <strong>{license.forceReleases.used} dari {license.forceReleases.limit}</strong> force release bulan ini.
                  Limit akan direset pada awal bulan depan.
                </p>
              </div>
            </div>
          </div>

          <button
            className={`w-full px-6 py-3 rounded-lg font-semibold transition-all ${
              license.forceReleases.used >= license.forceReleases.limit
                ? 'opacity-50 cursor-not-allowed text-slate-500'
                : 'text-white'
            }`}
            style={{
              background:
                license.forceReleases.used >= license.forceReleases.limit
                  ? 'rgba(100,116,139,0.3)'
                  : 'rgba(251,146,60,0.2)',
              border: `1px solid ${
                license.forceReleases.used >= license.forceReleases.limit
                  ? 'rgba(100,116,139,0.2)'
                  : 'rgba(251,146,60,0.3)'
              }`,
            }}
            disabled={license.forceReleases.used >= license.forceReleases.limit}
          >
            <RefreshCw
              size={16}
              className="inline mr-2"
              style={{
                color:
                  license.forceReleases.used >= license.forceReleases.limit ? '#64748b' : '#fb923c',
              }}
            />
            Force Release Sekarang
          </button>
        </div>

        {/* History */}
        <div className="mt-6">
          <h3 className="text-lg font-bold text-white mb-3">Riwayat Aktivasi</h3>
          <div className="space-y-2">
            {[
              { action: 'Lisensi Diaktifkan', date: '15 Mei 2026 10:32', device: 'DESKTOP-ABC123XYZ' },
              { action: 'Plan Diupgrade', date: '01 Mei 2026 14:15', device: '—' },
              { action: 'Lisensi Dibeli', date: '28 April 2026 09:00', device: '—' },
            ].map((h, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-4 py-3 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div>
                  <p className="text-white font-medium text-sm">{h.action}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{h.device}</p>
                </div>
                <span className="text-slate-600 text-xs">{h.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

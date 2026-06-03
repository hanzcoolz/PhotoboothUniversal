import { Search, MoreHorizontal, Filter, TrendingUp } from 'lucide-react';

const sessions = [
  { id: 'sess-001', event: 'Wedding Demo', type: 'Photo', guest: '0812-3456-7890', status: 'completed', amount: 50000, date: '2 jam lalu' },
  { id: 'sess-002', event: 'Wedding Demo', type: 'GIF', guest: '0821-9876-5432', status: 'completed', amount: 75000, date: '5 jam lalu' },
  { id: 'sess-003', event: 'Prom Night', type: 'Video', guest: '0856-1234-5678', status: 'completed', amount: 100000, date: '1 hari lalu' },
  { id: 'sess-004', event: 'Wedding Demo', type: 'Photo', guest: '0877-8765-4321', status: 'failed', amount: 0, date: '2 hari lalu' },
  { id: 'sess-005', event: 'Company Outing', type: 'Boomerang', guest: '0811-2345-6789', status: 'completed', amount: 75000, date: '3 hari lalu' },
];

const statusColors: Record<string, { bg: string; text: string }> = {
  completed: { bg: 'rgba(74,222,128,0.1)', text: '#4ade80' },
  failed: { bg: 'rgba(239,68,68,0.1)', text: '#ef4444' },
  processing: { bg: 'rgba(251,191,36,0.1)', text: '#fbbf24' },
};

function formatRupiah(n: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);
}

export default function AdminSessions() {
  return (
    <div className="admin-scroll overflow-auto h-full bg-slate-950 text-white">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Riwayat Sesi</h1>
            <p className="text-slate-400 text-sm mt-0.5">Lihat semua transaksi dan sesi yang sudah berjalan</p>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <Filter size={16} />
            Filter
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Total Sesi', value: '847', icon: '📸' },
            { label: 'Berhasil', value: '821', icon: '✓' },
            { label: 'Gagal', value: '26', icon: '✕' },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl p-4"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">{s.label}</p>
              <p className="text-2xl font-bold text-white">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Search & filters */}
        <div className="flex gap-3 mb-5">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              placeholder="Cari ID sesi, guest, atau event..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-white text-sm outline-none"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            />
          </div>
        </div>

        {/* Table */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  {['ID Sesi', 'Event', 'Tipe', 'Guest', 'Status', 'Jumlah', 'Tanggal', ''].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-widest"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sessions.map((s, i) => {
                  const sc = statusColors[s.status] || { bg: 'rgba(255,255,255,0.05)', text: '#94a3b8' };
                  return (
                    <tr
                      key={s.id}
                      className="transition-colors hover:bg-white/5"
                      style={{
                        borderBottom: i < sessions.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                      }}
                    >
                      <td className="px-5 py-3.5 text-slate-300 font-mono">{s.id}</td>
                      <td className="px-5 py-3.5 text-white font-medium">{s.event}</td>
                      <td className="px-5 py-3.5 text-slate-400">{s.type}</td>
                      <td className="px-5 py-3.5 text-slate-400">{s.guest}</td>
                      <td className="px-5 py-3.5">
                        <span
                          className="status-badge text-xs"
                          style={{ background: sc.bg, color: sc.text }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full inline-block mr-1" style={{ background: sc.text }} />
                          {s.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-300 font-medium">
                        {s.amount > 0 ? formatRupiah(s.amount) : '—'}
                      </td>
                      <td className="px-5 py-3.5 text-slate-500 text-xs">{s.date}</td>
                      <td className="px-5 py-3.5">
                        <button className="text-slate-600 hover:text-slate-300 transition-colors">
                          <MoreHorizontal size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

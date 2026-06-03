import {
  TrendingUp, Camera, Users, CreditCard, Activity,
  ArrowUpRight, ArrowDownRight, MoreHorizontal, Calendar
} from 'lucide-react';

const stats = [
  { label: 'Total Sesi', value: '1,284', change: '+12%', up: true, icon: Camera, color: '#3b82f6' },
  { label: 'Pendapatan Bulan Ini', value: 'Rp 64,2jt', change: '+8.5%', up: true, icon: TrendingUp, color: '#10b981' },
  { label: 'Guest Unik', value: '943', change: '+21%', up: true, icon: Users, color: '#f59e0b' },
  { label: 'Transaksi Berhasil', value: '97.3%', change: '-0.4%', up: false, icon: CreditCard, color: '#ef4444' },
];

const recentSessions = [
  { id: 'sess-001', type: 'Photo', guest: '0812-3456-7890', status: 'completed', amount: 50000, time: '5 menit lalu' },
  { id: 'sess-002', type: 'GIF', guest: '0821-9876-5432', status: 'completed', amount: 75000, time: '12 menit lalu' },
  { id: 'sess-003', type: 'Video', guest: '0856-1234-5678', status: 'processing', amount: 100000, time: '18 menit lalu' },
  { id: 'sess-004', type: 'Photo', guest: '0877-8765-4321', status: 'failed', amount: 50000, time: '34 menit lalu' },
  { id: 'sess-005', type: 'Boomerang', guest: '0811-2345-6789', status: 'completed', amount: 75000, time: '1 jam lalu' },
];

const statusColors: Record<string, { bg: string; text: string }> = {
  completed: { bg: 'rgba(74,222,128,0.1)', text: '#4ade80' },
  processing: { bg: 'rgba(251,191,36,0.1)', text: '#fbbf24' },
  failed: { bg: 'rgba(239,68,68,0.1)', text: '#ef4444' },
  printing: { bg: 'rgba(56,189,248,0.1)', text: '#38bdf8' },
};

function formatRupiah(n: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);
}

// Simple bar chart data
const chartData = [
  { day: 'Sen', value: 42, revenue: 2100000 },
  { day: 'Sel', value: 65, revenue: 3250000 },
  { day: 'Rab', value: 55, revenue: 2750000 },
  { day: 'Kam', value: 78, revenue: 3900000 },
  { day: 'Jum', value: 91, revenue: 4550000 },
  { day: 'Sab', value: 124, revenue: 6200000 },
  { day: 'Min', value: 108, revenue: 5400000 },
];

const maxVal = Math.max(...chartData.map((d) => d.value));

export default function AdminDashboard() {
  return (
    <div className="admin-scroll overflow-auto h-full bg-slate-950 text-white">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Page header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-slate-400 text-sm mt-0.5">Selamat datang, Demo Operator</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Calendar size={14} />
            <span>Juni 2026</span>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="rounded-xl p-4"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `${s.color}18` }}
                  >
                    <Icon size={18} style={{ color: s.color }} />
                  </div>
                  <span
                    className="flex items-center gap-0.5 text-xs font-medium"
                    style={{ color: s.up ? '#4ade80' : '#f87171' }}
                  >
                    {s.up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                    {s.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-white mb-0.5">{s.value}</p>
                <p className="text-slate-500 text-xs">{s.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
          {/* Bar chart */}
          <div
            className="xl:col-span-2 rounded-xl p-5"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-semibold text-white">Sesi per Hari</h3>
                <p className="text-slate-500 text-xs mt-0.5">7 hari terakhir</p>
              </div>
              <Activity size={16} className="text-slate-500" />
            </div>

            <div className="flex items-end gap-3 h-32">
              {chartData.map((d) => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-md transition-all duration-500 relative group"
                    style={{
                      height: `${(d.value / maxVal) * 100}%`,
                      background: 'linear-gradient(to top, #2563eb, #60a5fa)',
                      minHeight: '4px',
                    }}
                  >
                    <div
                      className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{ background: 'rgba(0,0,0,0.8)' }}
                    >
                      {d.value} sesi
                    </div>
                  </div>
                  <span className="text-slate-500 text-xs">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Session type breakdown */}
          <div
            className="rounded-xl p-5"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <h3 className="font-semibold text-white mb-1">Tipe Sesi</h3>
            <p className="text-slate-500 text-xs mb-5">Distribusi bulan ini</p>

            {[
              { label: 'Photo Strip', value: 54, color: '#3b82f6' },
              { label: 'GIF', value: 24, color: '#10b981' },
              { label: 'Boomerang', value: 14, color: '#f59e0b' },
              { label: 'Video', value: 8, color: '#f472b6' },
            ].map((item) => (
              <div key={item.label} className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300">{item.label}</span>
                  <span className="text-slate-400 font-medium">{item.value}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${item.value}%`, background: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent sessions */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <h3 className="font-semibold text-white">Sesi Terbaru</h3>
            <button className="text-blue-400 text-xs hover:text-blue-300 transition-colors">Lihat semua →</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  {['ID Sesi', 'Tipe', 'Guest', 'Status', 'Jumlah', 'Waktu', ''].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-widest">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentSessions.map((s) => {
                  const sc = statusColors[s.status] || { bg: 'rgba(255,255,255,0.05)', text: '#94a3b8' };
                  return (
                    <tr
                      key={s.id}
                      className="transition-colors hover:bg-white/5"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                    >
                      <td className="px-5 py-3.5 text-slate-300 text-sm font-mono">{s.id}</td>
                      <td className="px-5 py-3.5">
                        <span className="text-white text-sm font-medium">{s.type}</span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-400 text-sm">{s.guest}</td>
                      <td className="px-5 py-3.5">
                        <span
                          className="status-badge text-xs"
                          style={{ background: sc.bg, color: sc.text }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: sc.text }} />
                          {s.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-300 text-sm">{formatRupiah(s.amount)}</td>
                      <td className="px-5 py-3.5 text-slate-500 text-xs">{s.time}</td>
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

import { useState } from 'react';
import { Camera, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface Props {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: Props) {
  const [email, setEmail] = useState('operator@demo.com');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email dan password wajib diisi.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (password === 'demo123') {
        onLogin();
      } else {
        setError('Password salah. Gunakan: demo123');
      }
    }, 1200);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-md mx-6 rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(15,23,42,0.9)',
          border: '1px solid rgba(59,130,246,0.2)',
          boxShadow: '0 0 60px rgba(59,130,246,0.1)',
        }}
      >
        {/* Top accent */}
        <div
          className="h-1"
          style={{ background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)' }}
        />

        <div className="p-8">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)' }}
            >
              <Camera size={24} className="text-blue-400" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-none">PhotoBooth</h1>
              <p className="text-blue-400 text-xs tracking-widest uppercase mt-0.5">Web Admin</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-1">Masuk ke Dashboard</h2>
          <p className="text-slate-400 text-sm mb-7">Kelola booth, event, dan lisensi Anda</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-slate-400 text-xs uppercase tracking-widest block mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                placeholder="operator@demo.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-slate-400 text-xs uppercase tracking-widest block mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-xl text-white text-sm outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-400 text-sm"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}
              >
                <AlertCircle size={15} />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all mt-2"
              style={{
                background: loading ? 'rgba(59,130,246,0.4)' : 'linear-gradient(135deg, #2563eb, #3b82f6)',
                boxShadow: loading ? 'none' : '0 0 20px rgba(59,130,246,0.3)',
              }}
            >
              {loading ? (
                <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <>
                  <Lock size={16} />
                  Masuk
                </>
              )}
            </button>
          </form>

          {/* Hint */}
          <p className="text-slate-600 text-xs text-center mt-6">Demo: password = demo123</p>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { AppMode, KioskView, AdminView, SessionType } from './types';
import AttractScreen from './components/kiosk/AttractScreen';
import ModeSelect from './components/kiosk/ModeSelect';
import PaymentScreen from './components/kiosk/PaymentScreen';
import CaptureScreen from './components/kiosk/CaptureScreen';
import ProcessingScreen from './components/kiosk/ProcessingScreen';
import FinishScreen from './components/kiosk/FinishScreen';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminEvents from './components/admin/AdminEvents';
import AdminLicense from './components/admin/AdminLicense';
import {
  Menu,
  LogOut,
  Settings,
  BarChart3,
  Calendar,
  Lock,
  Home,
  Zap,
  Camera,
  Film,
  Gauge,
  Smartphone,
  Music,
  Grid3X3,
  Wand2,
  ChevronRight,
  Sparkles,
  Star,
  Play,
  Info,
  GitBranch,
} from 'lucide-react';
import { soundSynth } from './utils/soundSynthesizer';

type AppView = AppMode | 'menu';

export default function App() {
  const [view, setView] = useState<AppView>('menu');
  const [mode, setMode] = useState<AppMode>('kiosk');
  const [kioskView, setKioskView] = useState<KioskView>('attract');
  const [adminView, setAdminView] = useState<AdminView>('dashboard');
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [sessionType, setSessionType] = useState<SessionType>('photo');
  const [capturedFrames, setCapturedFrames] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleMenuItemClick = (action: () => void) => {
    soundSynth.beep(800, 100);
    action();
  };

  // Kiosk flow
  const handleKioskStart = () => setKioskView('mode-select');
  const handleModeSelect = (type: SessionType) => {
    setSessionType(type);
    setKioskView('payment');
  };
  const handlePaymentDone = () => setKioskView('capture');
  const handleCaptureDone = (frames: string[]) => {
    setCapturedFrames(frames);
    setKioskView('processing');
  };
  const handleProcessingDone = () => setKioskView('finish');
  const handleFinishHome = () => {
    setKioskView('attract');
    setCapturedFrames([]);
  };

  // Admin flow
  const handleAdminLogin = () => {
    setAdminLoggedIn(true);
    setAdminView('dashboard');
    setView('admin');
  };
  const handleAdminLogout = () => {
    setAdminLoggedIn(false);
    setView('menu');
    setMode('kiosk');
    setKioskView('attract');
  };

  // Kiosk mode
  if (view === 'kiosk') {
    if (kioskView === 'attract') {
      return <AttractScreen onStart={handleKioskStart} />;
    }
    if (kioskView === 'mode-select') {
      return (
        <ModeSelect
          onSelect={handleModeSelect}
          onBack={() => setKioskView('attract')}
        />
      );
    }
    if (kioskView === 'payment') {
      return (
        <PaymentScreen
          sessionType={sessionType}
          onPaid={handlePaymentDone}
          onBack={() => setKioskView('mode-select')}
        />
      );
    }
    if (kioskView === 'capture') {
      return (
        <CaptureScreen
          sessionType={sessionType}
          onComplete={handleCaptureDone}
        />
      );
    }
    if (kioskView === 'processing') {
      return <ProcessingScreen onDone={handleProcessingDone} />;
    }
    if (kioskView === 'finish') {
      return (
        <FinishScreen frames={capturedFrames} onHome={handleFinishHome} />
      );
    }
  }

  // Admin mode
  if (view === 'admin') {
    if (!adminLoggedIn) {
      return <AdminLogin onLogin={handleAdminLogin} />;
    }

    return (
      <div className="flex h-screen bg-slate-950 text-white">
        <div
          className="transition-all duration-300"
          style={{
            width: sidebarOpen ? '280px' : '0',
            overflow: 'hidden',
            background: '#0f172a',
            borderRight: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div className="h-full flex flex-col">
            <div className="px-6 py-5 border-b border-slate-800 flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }}
              >
                📸
              </div>
              <div>
                <h1 className="font-bold text-white text-sm">PhotoBooth</h1>
                <p className="text-blue-400 text-xs">Admin</p>
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                { id: 'events', label: 'Event', icon: Calendar },
                { id: 'sessions', label: 'Sesi', icon: Menu },
                { id: 'license', label: 'Lisensi', icon: Lock },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = adminView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setAdminView(item.id as AdminView)}
                    className="admin-sidebar-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all"
                    style={{
                      background: isActive ? 'rgba(59,130,246,0.15)' : 'transparent',
                      borderLeft: isActive ? '3px solid #3b82f6' : 'none',
                      color: isActive ? '#93c5fd' : '#94a3b8',
                    }}
                  >
                    <Icon size={18} />
                    <span className="font-medium text-sm">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="px-3 py-3 border-t border-slate-800 space-y-2">
              <button
                className="admin-sidebar-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white transition-colors"
                style={{ background: 'rgba(255,255,255,0.05)' }}
              >
                <Settings size={18} />
                <span className="font-medium text-sm">Pengaturan</span>
              </button>
              <button
                onClick={handleAdminLogout}
                className="admin-sidebar-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:text-red-300 transition-colors"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <LogOut size={18} />
                <span className="font-medium text-sm">Keluar</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div
            className="h-14 flex items-center justify-between px-6"
            style={{
              background: '#0f172a',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600" />
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            {adminView === 'dashboard' && <AdminDashboard />}
            {adminView === 'events' && <AdminEvents />}
            {adminView === 'sessions' && <AdminEvents />}
            {adminView === 'license' && <AdminLicense />}
          </div>
        </div>
      </div>
    );
  }

  // Main Menu
  return (
    <div
      className="relative w-full min-h-screen overflow-auto"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, #1a0e00 0%, #0a0a0a 60%)',
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 5 + 1 + 'px',
              height: Math.random() * 5 + 1 + 'px',
              background: `rgba(212,168,68,${Math.random() * 0.5 + 0.1})`,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 5 + 3}s ease-in-out infinite`,
              animationDelay: Math.random() * 5 + 's',
            }}
          />
        ))}
      </div>

      {/* Animated orbs */}
      <div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 animate-pulse-ring"
        style={{
          background: 'radial-gradient(circle, rgba(212,168,68,0.4) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-15 animate-pulse-ring"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animationDelay: '1s',
        }}
      />

      <div className="relative z-10 px-6 md:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
            style={{
              background: 'rgba(212,168,68,0.12)',
              border: '1px solid rgba(212,168,68,0.3)',
              color: '#D4A844',
            }}
          >
            <Sparkles size={12} />
            PHOTOBOOTH v2.0 PREMIUM
          </div>

          <h1
            className="font-black mb-4 leading-none tracking-tight"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
              textShadow: '0 0 30px rgba(212,168,68,0.3)',
            }}
          >
            <span className="shimmer-text">PHOTO</span>
            <br />
            <span className="text-white">BOOTH MENU</span>
          </h1>

          <p className="text-gray-400 font-light tracking-widest uppercase text-xs md:text-sm mt-6 mb-2" style={{ letterSpacing: '0.3em' }}>
            Pilih mode untuk melanjutkan
          </p>
        </div>

        {/* Main Menu Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
            {/* Kiosk Menu */}
            <button
              onClick={() => {
                handleMenuItemClick(() => {
                  setView('kiosk');
                  setMode('kiosk');
                  setKioskView('attract');
                });
              }}
              className="kiosk-btn group relative rounded-2xl p-8 text-center transition-all hover:scale-105 active:scale-95 animate-fade-in-up"
              style={{
                background: 'linear-gradient(135deg, rgba(212,168,68,0.15) 0%, rgba(212,168,68,0.05) 100%)',
                border: '2px solid rgba(212,168,68,0.4)',
                boxShadow: '0 0 40px rgba(212,168,68,0.2), inset 0 0 20px rgba(212,168,68,0.1)',
              }}
            >
              <div className="flex flex-col items-center gap-4">
                <div
                  className="w-20 h-20 rounded-xl flex items-center justify-center group-hover:scale-125 transition-transform"
                  style={{
                    background: 'rgba(212,168,68,0.2)',
                    boxShadow: '0 0 30px rgba(212,168,68,0.4)',
                  }}
                >
                  <Camera size={40} style={{ color: '#D4A844' }} />
                </div>
                <div>
                  <h3 className="text-white font-black text-xl mb-1">KIOSK</h3>
                  <p className="text-gray-400 text-sm">Mulai ambil foto sekarang</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-center gap-2 text-amber-400 font-bold text-sm">
                <Play size={16} className="fill-current" />
                Mulai Sesi
              </div>
            </button>

            {/* Admin Menu */}
            <button
              onClick={() => {
                handleMenuItemClick(() => {
                  setView('admin');
                  setMode('admin');
                });
              }}
              className="kiosk-btn group relative rounded-2xl p-8 text-center transition-all hover:scale-105 active:scale-95 animate-fade-in-up"
              style={{
                background: 'linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0.05) 100%)',
                border: '2px solid rgba(59,130,246,0.4)',
                boxShadow: '0 0 40px rgba(59,130,246,0.2), inset 0 0 20px rgba(59,130,246,0.1)',
                animationDelay: '0.1s',
              }}
            >
              <div className="flex flex-col items-center gap-4">
                <div
                  className="w-20 h-20 rounded-xl flex items-center justify-center group-hover:scale-125 transition-transform"
                  style={{
                    background: 'rgba(59,130,246,0.2)',
                    boxShadow: '0 0 30px rgba(59,130,246,0.4)',
                  }}
                >
                  <BarChart3 size={40} style={{ color: '#3b82f6' }} />
                </div>
                <div>
                  <h3 className="text-white font-black text-xl mb-1">ADMIN</h3>
                  <p className="text-gray-400 text-sm">Kelola photobooth</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-center gap-2 text-blue-400 font-bold text-sm">
                <Settings size={16} />
                Buka Dashboard
              </div>
            </button>

            {/* Features Menu */}
            <button
              onClick={() => {
                handleMenuItemClick(() => {
                  /* Features showcase */
                });
              }}
              className="kiosk-btn group relative rounded-2xl p-8 text-center transition-all hover:scale-105 active:scale-95 animate-fade-in-up"
              style={{
                background: 'linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(168,85,247,0.05) 100%)',
                border: '2px solid rgba(168,85,247,0.4)',
                boxShadow: '0 0 40px rgba(168,85,247,0.2), inset 0 0 20px rgba(168,85,247,0.1)',
                animationDelay: '0.2s',
              }}
            >
              <div className="flex flex-col items-center gap-4">
                <div
                  className="w-20 h-20 rounded-xl flex items-center justify-center group-hover:scale-125 transition-transform"
                  style={{
                    background: 'rgba(168,85,247,0.2)',
                    boxShadow: '0 0 30px rgba(168,85,247,0.4)',
                  }}
                >
                  <Sparkles size={40} style={{ color: '#d8b4fe' }} />
                </div>
                <div>
                  <h3 className="text-white font-black text-xl mb-1">FITUR</h3>
                  <p className="text-gray-400 text-sm">Lihat semua fitur premium</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-center gap-2 text-purple-400 font-bold text-sm">
                <Star size={16} className="fill-current" />
                Jelajahi
              </div>
            </button>
          </div>

          {/* Features Grid */}
          <div className="mb-12">
            <h2
              className="text-center text-white font-bold text-2xl mb-8 animate-fade-in-up"
              style={{ fontFamily: 'Playfair Display, serif', animationDelay: '0.3s' }}
            >
              Fitur <span className="shimmer-text">Premium v2.0</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Feature Cards */}
              {[
                {
                  icon: <Film size={24} />,
                  title: 'Auto-Slider Gallery',
                  desc: 'Galeri otomatis dengan scroll berlawanan',
                  color: '#D4A844',
                  bg: 'rgba(212,168,68,0.1)',
                  border: 'rgba(212,168,68,0.3)',
                  delay: '0.4s',
                },
                {
                  icon: <Wand2 size={24} />,
                  title: 'AI Magic Studio',
                  desc: 'Filter AI dengan Imagen 4.0 & fallback',
                  color: '#d8b4fe',
                  bg: 'rgba(168,85,247,0.1)',
                  border: 'rgba(168,85,247,0.3)',
                  delay: '0.5s',
                },
                {
                  icon: <Music size={24} />,
                  title: 'Web Audio Synthesizer',
                  desc: '6 sound effects synthesized real-time',
                  color: '#38bdf8',
                  bg: 'rgba(56,189,248,0.1)',
                  border: 'rgba(56,189,248,0.3)',
                  delay: '0.6s',
                },
                {
                  icon: <Grid3X3 size={24} />,
                  title: 'Frame Layouts',
                  desc: '6 layout templates dengan pricing dinamis',
                  color: '#4ade80',
                  bg: 'rgba(74,222,128,0.1)',
                  border: 'rgba(74,222,128,0.3)',
                  delay: '0.7s',
                },
                {
                  icon: <Zap size={24} />,
                  title: 'Smart Kiosk Flow',
                  desc: 'Workflow lengkap dari QRIS hingga cetak',
                  color: '#f97316',
                  bg: 'rgba(249,115,22,0.1)',
                  border: 'rgba(249,115,22,0.3)',
                  delay: '0.8s',
                },
                {
                  icon: <Gauge size={24} />,
                  title: 'Premium Design',
                  desc: 'Glassmorphism UI dengan 60fps smooth',
                  color: '#ec4899',
                  bg: 'rgba(236,72,153,0.1)',
                  border: 'rgba(236,72,153,0.3)',
                  delay: '0.9s',
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl p-6 transition-all hover:scale-102 animate-fade-in-up"
                  style={{
                    background: feature.bg,
                    border: `1px solid ${feature.border}`,
                    animationDelay: feature.delay,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform hover:scale-110"
                      style={{
                        background: `${feature.bg}`,
                        border: `1.5px solid ${feature.border}`,
                        color: feature.color,
                      }}
                    >
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold mb-1">{feature.title}</h3>
                      <p className="text-gray-400 text-sm">{feature.desc}</p>
                    </div>
                    <ChevronRight size={16} className="text-gray-600 flex-shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12">
            {[
              {
                icon: <GitBranch size={20} />,
                title: 'Version 2.0',
                desc: 'Fully enhanced premium experience',
              },
              {
                icon: <Smartphone size={20} />,
                title: 'Responsive Design',
                desc: 'Mobile → Desktop optimized',
              },
              {
                icon: <Info size={20} />,
                title: 'Production Ready',
                desc: 'Ready for deployment',
              },
            ].map((info, idx) => (
              <div
                key={idx}
                className="rounded-xl p-4 text-center animate-fade-in-up"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  animationDelay: `${1 + idx * 0.1}s`,
                }}
              >
                <div className="flex justify-center mb-2" style={{ color: '#D4A844' }}>
                  {info.icon}
                </div>
                <p className="text-white font-bold text-sm mb-1">{info.title}</p>
                <p className="text-gray-400 text-xs">{info.desc}</p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center py-8 border-t border-gray-800 animate-fade-in" style={{ animationDelay: '1.2s' }}>
            <p className="text-gray-500 text-xs tracking-widest uppercase">
              Powered by React + TypeScript + Tailwind + Web Audio API
            </p>
            <p className="text-gray-600 text-xs mt-2">
              © 2026 PhotoBooth Premium. All features preserved & enhanced.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

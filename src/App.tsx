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
import { Menu, LogOut, Settings, BarChart3, Calendar, Lock } from 'lucide-react';

export default function App() {
  const [mode, setMode] = useState<AppMode>('kiosk');
  const [kioskView, setKioskView] = useState<KioskView>('attract');
  const [adminView, setAdminView] = useState<AdminView>('dashboard');
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [sessionType, setSessionType] = useState<SessionType>('photo');
  const [capturedFrames, setCapturedFrames] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

  const handleAdminLogin = () => {
    setAdminLoggedIn(true);
    setAdminView('dashboard');
  };
  const handleAdminLogout = () => {
    setAdminLoggedIn(false);
    setMode('kiosk');
    setKioskView('attract');
  };

  if (mode === 'kiosk') {
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

  if (mode === 'admin') {
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

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, #1a1a2e 0%, #0a0a0a 70%)' }}
    >
      <div className="text-center z-10">
        <h1 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
          <span className="shimmer-text">PHOTOBOOTH</span>
        </h1>
        <p className="text-gray-400 mb-8">Pilih mode untuk melanjutkan</p>

        <div className="flex gap-6">
          <button
            onClick={() => setMode('kiosk')}
            className="kiosk-btn px-8 py-4 rounded-2xl font-bold text-lg"
            style={{
              background: 'linear-gradient(135deg, #D4A844, #F0C96A)',
              color: '#000',
            }}
          >
            Kiosk
          </button>
          <button
            onClick={() => setMode('admin')}
            className="px-8 py-4 rounded-2xl font-bold text-lg"
            style={{
              background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
              color: '#fff',
            }}
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { BackgroundGlow } from './BackgroundGlow';
import { SpotlightSearch } from '../modals/SpotlightSearch';
import { SetupModal } from '../modals/SetupModal';
import { LogoutModal } from '../modals/LogoutModal';
import { useAuth } from '../../context/AuthContext';
import { sound } from '../../utils/sound';
import type { AppScreen, InterviewRole, InterviewConfig } from '../../types';

export const MainLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleConfirmLogout = () => {
    logout();
    setIsLogoutOpen(false);
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Convert legacy AppScreen to route paths
  const handleNavigate = (screen: AppScreen, role?: InterviewRole) => {
    if (screen === 'setup') {
      setIsSetupOpen(true);
      return;
    }

    const pathMap: Record<string, string> = {
      'dashboard': '/dashboard',
      'analytics': '/analytics',
      'history': '/history',
      'profile': '/profile',
      'settings': '/profile',
    };
    
    const path = pathMap[screen] || '/dashboard';
    navigate(path, { state: { role } });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartInterviewFromSetup = (config: InterviewConfig) => {
    setIsSetupOpen(false);
    navigate('/interview/loading', { state: { config, role: config.role } });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCurrentScreen = (): AppScreen => {
    const path = location.pathname;
    if (path.includes('analytics')) return 'analytics';
    if (path.includes('history')) return 'history';
    if (path.includes('profile')) return 'profile';
    if (path.includes('dashboard')) return 'dashboard';
    return 'dashboard';
  };

  const currentScreen = getCurrentScreen();

  return (
    <div className="min-h-screen text-gray-100 relative font-sans selection:bg-blue-500/30 selection:text-blue-200 flex flex-col">
      <BackgroundGlow />

      <Sidebar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        user={user!}
        onOpenLogout={() => setIsLogoutOpen(true)}
        onOpenSetup={() => setIsSetupOpen(true)}
      />

      <Navbar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        user={user!}
        onOpenLogout={() => setIsLogoutOpen(true)}
        onOpenSetup={() => setIsSetupOpen(true)}
      />

      <SpotlightSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      <SetupModal
        isOpen={isSetupOpen}
        onClose={() => setIsSetupOpen(false)}
        onStartInterview={handleStartInterviewFromSetup}
      />

      <LogoutModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onConfirmLogout={handleConfirmLogout}
      />

      <main className="relative z-10 overflow-hidden min-h-screen flex-1 transition-all duration-300 md:pl-64">
        <Outlet />
      </main>

      <footer className="relative z-10 md:pl-64 px-6 py-8 border-t border-white/[0.06] text-center text-xs text-gray-500 bg-[#030712]/60">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Nexus Studio. Built with Apple, Linear, and Vercel design aesthetics.</p>
          <div className="flex items-center gap-6 font-medium text-gray-400">
            <span onClick={() => setIsSearchOpen(true)} className="cursor-pointer hover:text-white transition-colors">⌘K Command Center</span>
            <span onClick={() => setIsSetupOpen(true)} className="cursor-pointer hover:text-white transition-colors">New Interview</span>
            <span onClick={() => navigate('/analytics')} className="cursor-pointer hover:text-white transition-colors">Telemetry</span>
            <span onClick={() => setIsLogoutOpen(true)} className="cursor-pointer text-red-400 hover:text-red-300 transition-colors">Logout</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BackgroundGlow } from './components/layout/BackgroundGlow';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { SpotlightSearch } from './components/modals/SpotlightSearch';
import { SetupModal } from './components/modals/SetupModal';
import { LogoutModal } from './components/modals/LogoutModal';
import { LoginView } from './components/views/LoginView';
import { LandingView } from './components/views/LandingView';
import { DashboardView } from './components/views/DashboardView';
import { LoadingOrbView } from './components/views/LoadingOrbView';
import { InterviewSessionView } from './components/views/InterviewSessionView';
import { FeedbackReportView } from './components/views/FeedbackReportView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { ProfileSettingsView } from './components/views/ProfileSettingsView';
import { pageVariants } from './utils/motion';
import { sound } from './utils/sound';
import type { AppScreen, InterviewRole, InterviewConfig, User } from './types';

export const App: React.FC = () => {
  // Authentication state: mandatory first step! Restored from localStorage if available.
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('nexus_ai_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  
  // Navigation & session state
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(() => {
    try {
      const saved = localStorage.getItem('nexus_ai_user');
      return saved ? 'dashboard' : 'landing';
    } catch {
      return 'landing';
    }
  });
  const [targetRole, setTargetRole] = useState<InterviewRole>('Java Backend');
  const [interviewConfig, setInterviewConfig] = useState<InterviewConfig | undefined>();
  
  // Modals state
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  
  // Audio state
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('nexus_ai_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('nexus_ai_user');
      }
    } catch {
      // Ignore storage errors
    }
  }, [user]);

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleLoginSuccess = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    setCurrentScreen('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmLogout = () => {
    setUser(null);
    setIsLogoutOpen(false);
    setCurrentScreen('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (screen: AppScreen, role?: InterviewRole) => {
    if (role) setTargetRole(role);
    if (screen === 'setup') {
      setIsSetupOpen(true);
    } else {
      setCurrentScreen(screen);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStartInterviewFromSetup = (config: InterviewConfig) => {
    setInterviewConfig(config);
    setTargetRole(config.role);
    setIsSetupOpen(false);
    setCurrentScreen('loading-orb');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  // If not authenticated, render LandingView by default, or LoginView if explicitly requested
  if (!user || currentScreen === 'landing' || currentScreen === 'login') {
    if (currentScreen === 'login') {
      return (
        <div className="min-h-screen text-gray-100 relative font-sans selection:bg-blue-500/30 selection:text-blue-200">
          <BackgroundGlow />
          <LoginView onLoginSuccess={handleLoginSuccess} />
        </div>
      );
    }
    return (
      <div className="min-h-screen text-gray-100 relative font-sans selection:bg-blue-500/30 selection:text-blue-200">
        <BackgroundGlow />
        <LandingView onNavigateAuth={() => {
          setCurrentScreen(user ? 'dashboard' : 'login');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} />
      </div>
    );
  }

  // Check if current screen is immersive session (hide sidebar/navbar for focus)
  const isImmersiveSession = currentScreen === 'loading-orb' || currentScreen === 'session';

  return (
    <div className="min-h-screen text-gray-100 relative font-sans selection:bg-blue-500/30 selection:text-blue-200 flex flex-col">
      {/* Layered ambient dark background with floating blobs & mouse glow */}
      <BackgroundGlow />

      {/* Left Sidebar Navigation (Desktop only, hidden during immersive session) */}
      {!isImmersiveSession && (
        <Sidebar
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          user={user}
          onOpenLogout={() => setIsLogoutOpen(true)}
          onOpenSetup={() => setIsSetupOpen(true)}
        />
      )}

      {/* Top Floating Glass Navbar (hidden during immersive session) */}
      {!isImmersiveSession && (
        <Navbar
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          onOpenSearch={() => setIsSearchOpen(true)}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          user={user}
          onOpenLogout={() => setIsLogoutOpen(true)}
          onOpenSetup={() => setIsSetupOpen(true)}
        />
      )}

      {/* Cmd + K Spotlight Search Modal */}
      <SpotlightSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* 28px Glass Setup Dialog */}
      <SetupModal
        isOpen={isSetupOpen}
        onClose={() => setIsSetupOpen(false)}
        onStartInterview={handleStartInterviewFromSetup}
      />

      {/* Logout Confirmation Dialog */}
      <LogoutModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onConfirmLogout={handleConfirmLogout}
      />

      {/* Main View Container with 600ms Page Transitions */}
      <main className={`relative z-10 overflow-hidden min-h-screen flex-1 transition-all duration-300 ${
        !isImmersiveSession ? 'md:pl-64' : ''
      }`}>
        <AnimatePresence mode="wait">
          {currentScreen === 'dashboard' && (
            <motion.div
              key="dashboard"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <DashboardView
                onNavigate={handleNavigate}
                onOpenSetup={() => setIsSetupOpen(true)}
                onOpenLogout={() => setIsLogoutOpen(true)}
                user={user}
              />
            </motion.div>
          )}

          {currentScreen === 'loading-orb' && (
            <motion.div
              key="loading-orb"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <LoadingOrbView
                role={targetRole}
                config={interviewConfig}
                onLoadingComplete={() => setCurrentScreen('session')}
              />
            </motion.div>
          )}

          {currentScreen === 'session' && (
            <motion.div
              key="session"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <InterviewSessionView
                role={targetRole}
                onCompleteSession={(role) => {
                  setTargetRole(role);
                  setCurrentScreen('report');
                }}
                onCancelSession={() => setCurrentScreen('dashboard')}
              />
            </motion.div>
          )}

          {currentScreen === 'report' && (
            <motion.div
              key="report"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <FeedbackReportView
                role={targetRole}
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}

          {(currentScreen === 'analytics' || currentScreen === 'history') && (
            <motion.div
              key="analytics"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <AnalyticsView
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}

          {(currentScreen === 'profile' || currentScreen === 'settings') && (
            <motion.div
              key="profile"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ProfileSettingsView
                user={user}
                onUpdateUser={handleUpdateUser}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Subtle Footer */}
      {!isImmersiveSession && (
        <footer className="relative z-10 md:pl-64 px-6 py-8 border-t border-white/[0.06] text-center text-xs text-gray-500 bg-[#030712]/60">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© 2026 Nexus Studio. Built with Apple, Linear, and Vercel design aesthetics.</p>
            <div className="flex items-center gap-6 font-medium text-gray-400">
              <span onClick={() => setIsSearchOpen(true)} className="cursor-pointer hover:text-white transition-colors">⌘K Command Center</span>
              <span onClick={() => setIsSetupOpen(true)} className="cursor-pointer hover:text-white transition-colors">New Interview</span>
              <span onClick={() => handleNavigate('analytics')} className="cursor-pointer hover:text-white transition-colors">Telemetry</span>
              <span onClick={() => setIsLogoutOpen(true)} className="cursor-pointer text-red-400 hover:text-red-300 transition-colors">Logout</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};
export default App;

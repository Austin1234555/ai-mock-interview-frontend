import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Search, 
  Volume2, 
  VolumeX, 
  Play, 
  User as UserIcon, 
  ChevronDown, 
  BarChart2, 
  Home, 
  LogOut, 
  History
} from 'lucide-react';
import { sound } from '../../utils/sound';
import { buttonVariants } from '../../utils/motion';
import type { AppScreen, User } from '../../types';

interface NavbarProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  onOpenSearch: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  user: User | null;
  onOpenLogout: () => void;
  onOpenSetup: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  onOpenSearch,
  isMuted,
  onToggleMute,
  user,
  onOpenLogout,
  onOpenSetup,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!user) return null; // Do not display navbar on login screen

  const navItems: { id: AppScreen; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-4 h-4" /> },
    { id: 'history', label: 'History', icon: <History className="w-4 h-4" /> },
    { id: 'analytics', label: 'Reports', icon: <BarChart2 className="w-4 h-4" /> },
  ];

  return (
    <header className="fixed top-0 left-0 md:left-64 right-0 z-30 px-4 sm:px-6 pt-4 transition-all duration-300">
      <motion.div
        animate={{
          height: isScrolled ? '64px' : '76px',
          scale: isScrolled ? 0.99 : 1,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`max-w-6xl mx-auto flex items-center justify-between px-5 sm:px-6 rounded-[20px] transition-all duration-300 ${
          isScrolled
            ? 'bg-[#111827]/85 backdrop-blur-xl border border-white/[0.12] shadow-2xl shadow-blue-500/10'
            : 'bg-[#111827]/40 backdrop-blur-md border border-white/[0.06]'
        }`}
      >
        {/* Mobile Brand / Left Title */}
        <div className="flex items-center gap-3">
          <div className="md:hidden flex items-center gap-2" onClick={() => onNavigate('dashboard')}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-white text-base">AI Interview</span>
          </div>

          {/* Desktop Breadcrumb/Status */}
          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-gray-400">
            <span className="text-blue-400 uppercase font-extrabold tracking-wider">Workspace</span>
            <span>/</span>
            <span className="text-white capitalize font-bold">{currentScreen.replace('-', ' ')}</span>
          </div>
        </div>

        {/* Center Mobile Navigation Links */}
        <nav className="flex md:hidden items-center gap-1 bg-white/[0.03] p-1 rounded-2xl border border-white/[0.05]">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playClick();
                  onNavigate(item.id);
                }}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isActive ? 'text-white font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-indicator"
                    className="absolute inset-0 bg-blue-500/20 border border-blue-500/40 rounded-xl -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                {item.icon}
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Tools */}
        <div className="flex items-center gap-3">
          {/* Cmd + K Spotlight Search Trigger */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenSearch();
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] text-gray-300 text-xs font-medium transition-all duration-200 group shadow-sm"
            title="Open Spotlight Search (Cmd + K)"
          >
            <Search className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-400 transition-colors" />
            <span className="hidden lg:inline">Command Center</span>
            <kbd className="px-1.5 py-0.5 rounded bg-[#030712]/60 border border-white/10 text-[10px] text-gray-400 font-sans">
              ⌘K
            </kbd>
          </button>

          {/* Sound Toggle Button */}
          <button
            onClick={() => {
              onToggleMute();
            }}
            className={`p-2.5 rounded-xl border transition-all duration-200 ${
              isMuted
                ? 'bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20'
                : 'bg-white/[0.05] border-white/[0.08] text-gray-300 hover:text-green-400 hover:bg-white/[0.08]'
            }`}
            title={isMuted ? 'UI Sounds Muted' : 'UI Sounds Active'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Quick Visible Logout Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenLogout();
            }}
            className="p-2.5 px-3 rounded-xl bg-white/[0.05] hover:bg-red-500/15 border border-white/[0.08] hover:border-red-500/30 text-gray-300 hover:text-red-400 transition-all duration-200 flex items-center gap-1.5 shadow-sm"
            title="Logout of session"
          >
            <LogOut className="w-4 h-4 text-gray-400 hover:text-red-400 transition-colors" />
            <span className="hidden lg:inline text-xs font-bold">Logout</span>
          </button>

          {/* Primary CTA: Start Interview */}
          <motion.button
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            onClick={() => {
              sound.playClick();
              onOpenSetup();
            }}
            className="relative group hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-[16px] bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 border border-white/20 overflow-hidden"
          >
            <Play className="w-4 h-4 fill-current transition-transform duration-200 group-hover:scale-110" />
            <span>New Interview</span>
          </motion.button>

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => {
                sound.playClick();
                setProfileOpen(!profileOpen);
              }}
              className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-xl bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.1] transition-colors"
            >
              <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-lg object-cover border border-blue-500/40" />
              <span className="text-xs font-bold text-white hidden sm:block truncate max-w-[80px]">{user.name}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {/* Dropdown Menu */}
            {profileOpen && (
              <div
                onClick={() => setProfileOpen(false)}
                className="absolute right-0 mt-2 w-52 rounded-[20px] bg-[#111827]/95 border border-white/[0.12] shadow-2xl backdrop-blur-2xl py-2 px-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="px-3 py-2.5 border-b border-white/[0.08] mb-1">
                  <p className="text-xs font-bold text-white truncate">{user.name}</p>
                  <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
                </div>

                <button
                  onClick={() => onNavigate('dashboard')}
                  className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/[0.06] rounded-xl font-medium transition-colors flex items-center gap-2"
                >
                  <Home className="w-3.5 h-3.5 text-blue-400" />
                  <span>Dashboard</span>
                </button>

                <button
                  onClick={() => onNavigate('profile')}
                  className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/[0.06] rounded-xl font-medium transition-colors flex items-center gap-2"
                >
                  <UserIcon className="w-3.5 h-3.5 text-purple-400" />
                  <span>My Profile & Stats</span>
                </button>

                <div className="my-1 border-t border-white/[0.06]" />

                <button
                  onClick={() => onOpenLogout()}
                  className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-red-500/15 rounded-xl font-bold transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Confirm Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </header>
  );
};

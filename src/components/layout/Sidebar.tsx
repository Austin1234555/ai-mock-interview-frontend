import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  PlusCircle, 
  History, 
  BarChart2, 
  User as UserIcon, 
  LogOut, 
  Sparkles,
  ChevronRight,
  Award
} from 'lucide-react';
import { sound } from '../../utils/sound';
import type { AppScreen, User } from '../../types';

interface SidebarProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  user: User;
  onOpenLogout: () => void;
  onOpenSetup: () => void;
  isMobileMenuOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  user,
  onOpenLogout,
  onOpenSetup,
  isMobileMenuOpen,
}) => {
  const navItems: { id: AppScreen | 'new-interview'; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'landing', label: 'Explore Studio', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-4 h-4" /> },
    { id: 'new-interview', label: 'New Interview', icon: <PlusCircle className="w-4 h-4" />, badge: 'AI' },
    { id: 'history', label: 'Interview History', icon: <History className="w-4 h-4" /> },
    { id: 'analytics', label: 'Reports & Telemetry', icon: <BarChart2 className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile & Rubric', icon: <UserIcon className="w-4 h-4" /> },
  ];

  const handleItemClick = (id: AppScreen | 'new-interview') => {
    sound.playClick();
    if (id === 'new-interview') {
      onOpenSetup();
    } else {
      onNavigate(id as AppScreen);
    }
  };

  return (
    <aside className={`flex flex-col w-64 h-screen fixed left-0 top-0 bg-[#0b1120]/90 border-r border-white/[0.08] backdrop-blur-2xl z-50 selection:bg-blue-500/30 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      {/* Top Brand */}
      <div className="p-6 pb-4 flex items-center gap-3 border-b border-white/[0.06]">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30 border border-white/20">
          <Sparkles className="w-5 h-5 text-white animate-pulse" />
        </div>
        <div>
          <span className="text-base font-extrabold text-white tracking-tight block">AI Interview</span>
          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block">Nexus Studio</span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-3 py-6 space-y-1 overflow-y-auto custom-scrollbar">
        <div className="px-3 pb-2 text-[10px] font-extrabold uppercase tracking-widest text-gray-500">
          Main Navigation
        </div>
        {navItems.map((item) => {
          const isActive = currentScreen === item.id || (item.id === 'new-interview' && currentScreen === 'setup');
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all relative group ${
                isActive
                  ? 'text-white font-bold bg-white/[0.08] shadow-inner'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.03]'
              }`}
            >
              {/* Active animated background indicator */}
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-r-full shadow-glow-blue"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}

              <div className="flex items-center gap-3">
                <span className={`${isActive ? 'text-blue-400' : 'text-gray-500 group-hover:text-gray-300'} transition-colors`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 text-[10px] font-extrabold border border-blue-500/30">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Quick Pro Tier Promotion Box */}
        <div className="pt-6 px-2">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-900/40 via-indigo-900/30 to-purple-900/40 border border-blue-500/30 text-left relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-blue-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
              <Award className="w-4 h-4" />
              <span>FAANG L6 Pass Rate</span>
            </div>
            <p className="text-[11px] text-gray-300 font-medium leading-relaxed mb-3">
              Your speech cadence and system design telemetry rank in the top 5% of engineers.
            </p>
            <button
              onClick={() => {
                sound.playSuccess();
                alert("Simulated: You have unlocked unlimited AI practice tokens!");
              }}
              className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1"
            >
              <span>Upgrade to Pro</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom User Profile Card */}
      <div className="p-4 border-t border-white/[0.06] bg-[#0b1120]/60">
        <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/[0.05]">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="relative shrink-0">
              <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover border border-blue-500/40" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-[#0b1120]" title="Online & Ready" />
            </div>
            <div className="truncate">
              <span className="text-xs font-bold text-white block truncate">{user.name}</span>
              <span className="text-[10px] text-gray-400 block truncate">{user.title}</span>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onOpenLogout();
            }}
            title="Logout"
            className="p-2 rounded-lg hover:bg-red-500/15 text-gray-400 hover:text-red-400 transition-colors shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

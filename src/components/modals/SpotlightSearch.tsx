import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Terminal, Play, BarChart2, Volume2, VolumeX, CornerDownLeft, Clock } from 'lucide-react';
import { modalVariants } from '../../utils/motion';
import { sound } from '../../utils/sound';
import type { AppScreen, InterviewRole } from '../../types';

interface SpotlightSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: AppScreen, role?: InterviewRole) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Actions' | 'Mock Roles' | 'Recent Sessions';
  icon: React.ReactNode;
  action: () => void;
  badge?: string;
}

export const SpotlightSearch: React.FC<SpotlightSearchProps> = ({
  isOpen,
  onClose,
  onNavigate,
  isMuted,
  onToggleMute,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const allItems: SearchItem[] = [
    {
      id: 'act-start',
      title: 'Start New Mock Interview',
      subtitle: 'Configure role, difficulty, and focus questions',
      category: 'Actions',
      icon: <Play className="w-4 h-4 text-blue-400" />,
      action: () => {
        onNavigate('setup');
        onClose();
      },
      badge: '⌘ N',
    },
    {
      id: 'act-analytics',
      title: 'View Performance Analytics',
      subtitle: 'Analyze competency breakdown and mastery scores',
      category: 'Actions',
      icon: <BarChart2 className="w-4 h-4 text-purple-400" />,
      action: () => {
        onNavigate('analytics');
        onClose();
      },
    },
    {
      id: 'act-mute',
      title: isMuted ? 'Unmute UI Sound Effects' : 'Mute UI Sound Effects',
      subtitle: 'Toggle native Web Audio synthesizer sound feedback',
      category: 'Actions',
      icon: isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-green-400" />,
      action: () => {
        onToggleMute();
        onClose();
      },
      badge: '⌘ M',
    },
    {
      id: 'role-fa',
      title: 'Frontend Architect Prep',
      subtitle: 'System architecture, state reconciliation, 60 FPS rendering',
      category: 'Mock Roles',
      icon: <Terminal className="w-4 h-4 text-indigo-400" />,
      action: () => {
        onNavigate('loading-orb', 'Frontend Architect');
        onClose();
      },
      badge: 'Senior',
    },
    {
      id: 'role-fs',
      title: 'Full Stack Engineer Prep',
      subtitle: 'Microservices, database scaling, API security',
      category: 'Mock Roles',
      icon: <Terminal className="w-4 h-4 text-teal-400" />,
      action: () => {
        onNavigate('loading-orb', 'Full Stack Engineer');
        onClose();
      },
      badge: 'Senior',
    },
    {
      id: 'role-pm',
      title: 'Product Manager Prep',
      subtitle: 'Product metrics, roadmap prioritization, execution',
      category: 'Mock Roles',
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      action: () => {
        onNavigate('loading-orb', 'Product Manager');
        onClose();
      },
      badge: 'Mid-Level',
    },
    {
      id: 'role-ai',
      title: 'AI / ML Researcher Prep',
      subtitle: 'LLM fine-tuning, transformers, latency optimization',
      category: 'Mock Roles',
      icon: <Sparkles className="w-4 h-4 text-pink-400" />,
      action: () => {
        onNavigate('loading-orb', 'AI / ML Researcher');
        onClose();
      },
      badge: 'Principal',
    },
    {
      id: 'ses-last',
      title: 'Review Frontend Architect Report',
      subtitle: 'Session scored 92% • 32 mins ago',
      category: 'Recent Sessions',
      icon: <Clock className="w-4 h-4 text-blue-500" />,
      action: () => {
        onNavigate('report');
        onClose();
      },
      badge: 'Score 92',
    },
  ];

  const filteredItems = allItems.filter(
    item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setSelectedIndex(0);
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
      sound.playTransition();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        sound.playHover();
        setSelectedIndex(prev => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        sound.playHover();
        setSelectedIndex(prev => (prev - 1 + (filteredItems.length || 1)) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          sound.playClick();
          filteredItems[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        sound.playClick(300, 0.02);
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#030712]/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-2xl rounded-[28px] bg-[#111827]/90 border border-white/[0.08] shadow-2xl shadow-blue-500/10 overflow-hidden backdrop-blur-2xl z-10"
          >
            {/* Search Input Bar */}
            <div className="relative flex items-center px-6 py-4 border-b border-white/[0.08]">
              <Search className="w-5 h-5 text-gray-400 mr-4 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                  sound.playHover();
                }}
                placeholder="Search commands, mock interviews, analytics... (type 'prep')"
                className="w-full bg-transparent text-white placeholder-gray-500 font-medium text-base focus:outline-none"
              />
              <div className="flex items-center gap-1.5 ml-4 shrink-0">
                <span className="px-2 py-1 text-xs font-semibold text-gray-400 bg-white/[0.06] border border-white/[0.08] rounded-md">
                  ESC
                </span>
              </div>
            </div>

            {/* Results List */}
            <div className="max-h-[380px] overflow-y-auto py-2 px-2 custom-scrollbar">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center">
                  <Sparkles className="w-8 h-8 text-gray-600 mx-auto mb-3 animate-pulse" />
                  <p className="text-gray-400 font-medium text-sm">No commands found matching &quot;{query}&quot;</p>
                  <p className="text-gray-600 text-xs mt-1">Try searching for &quot;Frontend&quot; or &quot;Analytics&quot;</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredItems.map((item, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <motion.div
                        key={item.id}
                        onMouseEnter={() => {
                          setSelectedIndex(idx);
                          sound.playHover();
                        }}
                        onClick={() => {
                          sound.playClick();
                          item.action();
                        }}
                        className={`flex items-center justify-between px-4 py-3 rounded-[16px] cursor-pointer transition-all duration-150 ${
                          isSelected
                            ? 'bg-blue-600/15 border border-blue-500/30 shadow-lg shadow-blue-500/5'
                            : 'hover:bg-white/[0.04] border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className={`p-2 rounded-xl ${isSelected ? 'bg-blue-500/20 text-blue-300' : 'bg-white/[0.05] text-gray-400'}`}>
                            {item.icon}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p className={`text-sm font-semibold truncate ${isSelected ? 'text-white' : 'text-gray-200'}`}>
                                {item.title}
                              </p>
                              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-white/[0.05] text-gray-400">
                                {item.category}
                              </span>
                            </div>
                            <p className="text-xs text-gray-400 truncate mt-0.5">{item.subtitle}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 ml-3 shrink-0">
                          {item.badge && (
                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${isSelected ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'bg-white/[0.05] text-gray-400'}`}>
                              {item.badge}
                            </span>
                          )}
                          {isSelected && (
                            <motion.div
                              initial={{ opacity: 0, x: -4 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex items-center text-blue-400 text-xs font-semibold gap-1 ml-1"
                            >
                              <span>Select</span>
                              <CornerDownLeft className="w-3.5 h-3.5" />
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer with hints */}
            <div className="flex items-center justify-between px-6 py-3 bg-[#080d1a]/80 border-t border-white/[0.06] text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 bg-white/[0.08] rounded text-gray-300 font-sans">↑↓</kbd> to navigate
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 bg-white/[0.08] rounded text-gray-300 font-sans">↵</kbd> to select
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 bg-white/[0.08] rounded text-gray-300 font-sans">ESC</kbd> to close
                </span>
              </div>
              <div className="flex items-center gap-1 text-blue-400 font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Command Center v3.0</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

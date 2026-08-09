import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Play, 
  Briefcase, 
  CheckCircle2, 
  Award, 
  Clock, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  Users, 
  Code2, 
  History, 
  ArrowUpRight,
  TrendingUp,
  LogOut
} from 'lucide-react';
import { mockMetrics, mockRecentSessions } from '../../data/mockData';
import { cardVariants, containerVariants, buttonVariants } from '../../utils/motion';
import { sound } from '../../utils/sound';
import type { AppScreen, InterviewRole, User } from '../../types';

interface DashboardViewProps {
  onNavigate: (screen: AppScreen, role?: InterviewRole) => void;
  onOpenSetup: () => void;
  onOpenLogout: () => void;
  user: User;
}

// Helper for animated counter
const CounterDisplay: React.FC<{ target: number; suffix?: string; prefix?: string }> = ({ target, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (target - start) * ease);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [target]);

  return <span>{prefix}{count}{suffix}</span>;
};

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onOpenSetup,
  onOpenLogout,
  user,
}) => {
  // Table search, filter, and pagination state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Completed' | 'In Progress' | 'Needs Review'>('ALL');
  const [difficultyFilter, setDifficultyFilter] = useState<'ALL' | 'Easy' | 'Medium' | 'Hard'>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter sessions
  const filteredSessions = mockRecentSessions.filter((session) => {
    const matchesSearch = session.role.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          session.level.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || session.status === statusFilter;
    const matchesDifficulty = difficultyFilter === 'ALL' || session.difficulty === difficultyFilter;
    return matchesSearch && matchesStatus && matchesDifficulty;
  });

  const totalPages = Math.ceil(filteredSessions.length / itemsPerPage);
  const paginatedSessions = filteredSessions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const quickActionCards = [
    {
      id: 'start-new',
      title: 'Start New Interview',
      desc: 'Configure custom job roles, difficulty levels, and durations.',
      icon: <Play className="w-6 h-6 text-blue-400 fill-blue-400" />,
      action: () => onOpenSetup(),
      gradient: 'from-blue-500/20 via-indigo-500/10 to-transparent',
      border: 'border-blue-500/30'
    },
    {
      id: 'resume-analysis',
      title: 'Resume Analysis',
      desc: 'Upload CV to auto-generate personalized technical probe questions.',
      icon: <FileText className="w-6 h-6 text-purple-400" />,
      action: () => {
        sound.playSuccess();
        alert('Simulated: Resume AI analyzer opened! Your profile has been pre-scanned against FAANG L5 criteria.');
      },
      gradient: 'from-purple-500/20 via-pink-500/10 to-transparent',
      border: 'border-purple-500/30'
    },
    {
      id: 'mock-loop',
      title: 'Full Onsite Loop',
      desc: 'Simulate 4 consecutive FAANG rounds (Technical, Coding, System Design, Behavioral).',
      icon: <Briefcase className="w-6 h-6 text-green-400" />,
      action: () => {
        sound.playClick();
        onNavigate('setup', 'Full Stack');
      },
      gradient: 'from-green-500/20 via-emerald-500/10 to-transparent',
      border: 'border-green-500/30'
    },
    {
      id: 'behavioral',
      title: 'Behavioral Prep',
      desc: 'Master the STAR method for Amazon Leadership Principles & Meta values.',
      icon: <Users className="w-6 h-6 text-amber-400" />,
      action: () => {
        sound.playClick();
        onNavigate('setup', 'Product Manager');
      },
      gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
      border: 'border-amber-500/30'
    },
    {
      id: 'coding',
      title: 'Coding Interview',
      desc: 'Live algorithmic problem solving with real-time complexity grading.',
      icon: <Code2 className="w-6 h-6 text-cyan-400" />,
      action: () => {
        sound.playClick();
        onNavigate('setup', 'Python Backend');
      },
      gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
      border: 'border-cyan-500/30'
    },
    {
      id: 'history-action',
      title: 'Interview History',
      desc: 'Review past transcripts, AI voice evaluations, and telemetry charts.',
      icon: <History className="w-6 h-6 text-indigo-400" />,
      action: () => {
        sound.playClick();
        onNavigate('analytics');
      },
      gradient: 'from-indigo-500/20 via-purple-500/10 to-transparent',
      border: 'border-indigo-500/30'
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-20 space-y-12 relative z-10"
    >
      {/* 1. PERSONALIZED WELCOME HERO BANNER */}
      <div className="p-8 sm:p-12 rounded-[32px] bg-gradient-to-br from-[#111827]/90 via-[#111827]/60 to-[#030712]/90 border border-white/[0.12] shadow-2xl backdrop-blur-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-transparent rounded-full blur-[90px] pointer-events-none animate-pulseGlow" />
        
        <div className="space-y-3 relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Studio Active • L6 FAANG Rubric</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Welcome back, {user.name} 👋
          </h1>
          <p className="text-base sm:text-lg text-gray-300 font-normal max-w-xl">
            <strong className="text-white font-bold">Ready for your next interview?</strong> Your speech cadence and technical accuracy rank in the top 5% of active users today.
          </p>
        </div>

        <div className="relative z-10 shrink-0 flex flex-col sm:flex-row items-center gap-3.5 w-full md:w-auto">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => {
              sound.playClick();
              onOpenSetup();
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white font-extrabold text-base shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 border border-white/20 flex items-center justify-center gap-3 group"
          >
            <Play className="w-5 h-5 fill-current transform group-hover:scale-110 transition-transform" />
            <span>Start New Interview</span>
          </motion.button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenLogout();
            }}
            title="Logout of session"
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/[0.06] hover:bg-red-500/20 border border-white/[0.1] hover:border-red-500/40 text-gray-300 hover:text-red-300 font-bold text-base transition-all flex items-center justify-center gap-2.5 shadow-lg group"
          >
            <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* 2. STATISTICS CARDS SECTION (5 Cards) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <span>Telemetry Statistics</span>
          </h2>
          <span className="text-xs font-bold text-gray-400">Real-time telemetry</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {mockMetrics.map((metric) => (
            <motion.div
              key={metric.id}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-5 sm:p-6 rounded-[24px] bg-[#111827]/70 border border-white/[0.08] shadow-xl backdrop-blur-xl relative overflow-hidden flex flex-col justify-between group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="flex items-center justify-between mb-3 relative z-10">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {metric.label}
                </span>
                <div className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-blue-400 group-hover:scale-110 transition-transform">
                  {metric.id === 'total-interviews' && <Briefcase className="w-4 h-4" />}
                  {metric.id === 'completed-interviews' && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                  {metric.id === 'average-score' && <Award className="w-4 h-4 text-purple-400" />}
                  {metric.id === 'highest-score' && <Sparkles className="w-4 h-4 text-amber-400" />}
                  {metric.id === 'total-practice-time' && <Clock className="w-4 h-4 text-cyan-400" />}
                </div>
              </div>

              <div className="relative z-10">
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {metric.id === 'average-score' ? (
                    <CounterDisplay target={metric.numericValue} suffix="%" />
                  ) : metric.id === 'highest-score' ? (
                    <CounterDisplay target={metric.numericValue} suffix="%" />
                  ) : metric.id === 'total-interviews' || metric.id === 'completed-interviews' ? (
                    <CounterDisplay target={metric.numericValue} />
                  ) : (
                    metric.value
                  )}
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs font-semibold text-green-400">
                  <span>{metric.change}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3. QUICK ACTIONS GRID (6 Large Action Cards) */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <span>Quick Actions</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActionCards.map((card) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.01 }}
              onClick={card.action}
              className={`p-6 sm:p-8 rounded-[28px] bg-[#111827]/70 border ${card.border} shadow-2xl backdrop-blur-xl cursor-pointer relative overflow-hidden group flex flex-col justify-between transition-all`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-20 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center group-hover:scale-110 group-hover:border-white/30 transition-all shadow-md">
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center justify-between">
                    <span>{card.title}</span>
                    <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1.5 font-normal leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 4. RECENT INTERVIEWS TABLE with Search, Filter & Pagination */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <History className="w-5 h-5 text-indigo-400" />
              <span>Recent Interview Sessions</span>
            </h2>
            <p className="text-xs text-gray-400">Search, filter, and review your historical simulated interviews</p>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search role or level..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-9 pr-4 py-2 rounded-xl bg-black/40 border border-white/[0.08] text-white placeholder-gray-500 text-xs font-semibold focus:outline-none focus:border-blue-500 w-48 sm:w-56"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              className="px-3 py-2 rounded-xl bg-black/40 border border-white/[0.08] text-gray-200 text-xs font-semibold focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="ALL">All Status</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Needs Review">Needs Review</option>
            </select>

            <select
              value={difficultyFilter}
              onChange={(e) => {
                setDifficultyFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              className="px-3 py-2 rounded-xl bg-black/40 border border-white/[0.08] text-gray-200 text-xs font-semibold focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="ALL">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Table Card */}
        <div className="rounded-[28px] bg-[#111827]/80 border border-white/[0.08] shadow-2xl backdrop-blur-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] text-[11px] font-extrabold uppercase tracking-widest text-gray-400 bg-black/20">
                  <th className="py-4 px-6">Interview Role</th>
                  <th className="py-4 px-6">Difficulty</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6">Duration</th>
                  <th className="py-4 px-6">Score</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-xs sm:text-sm font-medium">
                {paginatedSessions.length > 0 ? (
                  paginatedSessions.map((session) => (
                    <motion.tr
                      key={session.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-white/[0.03] transition-colors group"
                    >
                      <td className="py-4 px-6 font-bold text-white flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-150 transition-transform" />
                        <div>
                          <span>{session.role}</span>
                          <span className="text-[11px] font-normal text-gray-400 block">{session.level}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                          session.difficulty === 'Hard' ? 'bg-red-500/15 text-red-300 border border-red-500/30' :
                          session.difficulty === 'Medium' ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30' :
                          'bg-green-500/15 text-green-300 border border-green-500/30'
                        }`}>
                          {session.difficulty || 'Medium'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-400">{session.date}</td>
                      <td className="py-4 px-6 text-gray-300 font-semibold">{session.duration}</td>
                      <td className="py-4 px-6">
                        <span className="font-extrabold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20">
                          {session.score}%
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                          session.status === 'Completed' ? 'bg-green-500/15 text-green-400' : 'bg-amber-500/15 text-amber-400'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            session.status === 'Completed' ? 'bg-green-500' : 'bg-amber-500 animate-ping'
                          }`} />
                          {session.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        {session.status === 'Completed' ? (
                          <button
                            onClick={() => {
                              sound.playClick();
                              onNavigate('report', session.role);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-bold text-gray-200 border border-white/[0.08] transition-colors inline-flex items-center gap-1"
                          >
                            <span>Review</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              sound.playClick();
                              onNavigate('session', session.role);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-xs font-bold text-blue-400 border border-blue-500/20 transition-colors inline-flex items-center gap-1 shadow-sm"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>Resume</span>
                          </button>
                        )}
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-500 text-sm">
                      No matching interview sessions found for your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="p-4 bg-black/20 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-gray-400">
              <span>
                Showing <strong className="text-white">{(currentPage - 1) * itemsPerPage + 1}</strong> to <strong className="text-white">{Math.min(currentPage * itemsPerPage, filteredSessions.length)}</strong> of <strong className="text-white">{filteredSessions.length}</strong> sessions
              </span>
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => {
                    sound.playClick();
                    setCurrentPage((prev) => Math.max(prev - 1, 1));
                  }}
                  className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] disabled:opacity-30 disabled:pointer-events-none text-white border border-white/[0.08] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-300 font-bold">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => {
                    sound.playClick();
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                  }}
                  className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] disabled:opacity-30 disabled:pointer-events-none text-white border border-white/[0.08] transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

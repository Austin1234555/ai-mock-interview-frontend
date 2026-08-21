import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  History, 
  ArrowLeft,
  Search,
  ArrowUpRight,
  Play,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { mockRecentSessions } from '../../data/mockData';
import { containerVariants } from '../../utils/motion';
import { sound } from '../../utils/sound';
import type { AppScreen, InterviewRole } from '../../types';

interface HistoryViewProps {
  onNavigate: (screen: AppScreen, role?: InterviewRole) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Completed' | 'In Progress' | 'Needs Review'>('ALL');
  const [difficultyFilter, setDifficultyFilter] = useState<'ALL' | 'Easy' | 'Medium' | 'Hard'>('ALL');
  const [activeTab, setActiveTab] = useState<'Standard' | 'Loop' | 'Behavioral' | 'Coding'>('Standard');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredSessions = useMemo(() => {
    return mockRecentSessions.filter((session) => {
      const matchesTab = session.interviewType === activeTab || (!session.interviewType && activeTab === 'Standard');
      const matchesSearch = session.role.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            session.level.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || session.status === statusFilter;
      const matchesDifficulty = difficultyFilter === 'ALL' || session.difficulty === difficultyFilter;
      return matchesTab && matchesSearch && matchesStatus && matchesDifficulty;
    });
  }, [searchQuery, statusFilter, difficultyFilter, activeTab]);

  const totalPages = Math.ceil(filteredSessions.length / itemsPerPage);
  const paginatedSessions = filteredSessions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-20 space-y-8 relative z-10"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('dashboard');
            }}
            className="flex items-center gap-2 px-3 py-1.5 mb-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-gray-400 hover:text-white font-medium text-xs border border-white/[0.08] transition-colors w-fit"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <History className="w-4 h-4" />
            <span>Interview Log</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Interview History
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Search, filter, and review all your historical simulated interviews in detail.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex bg-[#111827]/80 rounded-xl p-1 border border-white/[0.08] backdrop-blur-xl shrink-0 overflow-x-auto max-w-full w-max">
          {['Standard', 'Loop', 'Behavioral', 'Coding'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                sound.playClick();
                setActiveTab(tab as any);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-indigo-500/20 text-indigo-300 shadow-sm border border-indigo-500/30'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.05] border border-transparent'
              }`}
            >
              {tab === 'Standard' ? 'Technical' : tab}
            </button>
          ))}
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
          <div className="p-4 bg-black/20 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-gray-400">
            <div className="flex items-center gap-4">
              <span>
                Showing <strong className="text-white">{filteredSessions.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</strong> to <strong className="text-white">{Math.min(currentPage * itemsPerPage, filteredSessions.length)}</strong> of <strong className="text-white">{filteredSessions.length}</strong> sessions
              </span>
              
              <div className="flex items-center gap-2 border-l border-white/[0.08] pl-4">
                <span className="hidden sm:inline">Rows per page:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    sound.playClick();
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-2 py-1 rounded-lg bg-black/40 border border-white/[0.08] text-white text-xs font-semibold focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                  <option value={25}>25</option>
                  <option value={30}>30</option>
                </select>
              </div>
            </div>

            {totalPages > 1 && (
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
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

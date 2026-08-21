import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer
} from 'recharts';
import { TrendingUp, Award, Sparkles, Zap, ArrowLeft, Activity, Briefcase, Users, Code2, Terminal, ChevronDown } from 'lucide-react';
import { mockHistoricalScores, mockTopicMastery } from '../../data/mockData';
import { cardVariants, containerVariants } from '../../utils/motion';
import { sound } from '../../utils/sound';
import type { AppScreen } from '../../types';

interface AnalyticsViewProps {
  onNavigate: (screen: AppScreen) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'Standard' | 'Loop' | 'Behavioral' | 'Coding'>('Standard');
  const [isPracticeMenuOpen, setIsPracticeMenuOpen] = useState(false);

  const historicalScores = useMemo(() => {
    // Offset mock scores based on category to show different telemetry
    const offset = activeTab === 'Standard' ? 0 : activeTab === 'Loop' ? -5 : activeTab === 'Behavioral' ? 8 : -3;
    return mockHistoricalScores.map(score => ({
      ...score,
      score: Math.min(100, Math.max(0, score.score + offset)),
      avg: Math.min(100, Math.max(0, score.avg + offset))
    }));
  }, [activeTab]);

  const topicMastery = useMemo(() => {
    let topics = [...mockTopicMastery];
    if (activeTab === 'Behavioral') {
      topics = topics.filter(t => t.topic.includes('Behavioral') || t.topic.includes('Leadership'));
    } else if (activeTab === 'Coding') {
      topics = topics.filter(t => t.topic.includes('Algorithms') || t.topic.includes('Data Structures'));
    } else if (activeTab === 'Standard' || activeTab === 'Loop') {
      topics = topics.filter(t => !t.topic.includes('Behavioral'));
    }
    
    const offset = activeTab === 'Standard' ? 0 : activeTab === 'Loop' ? -2 : activeTab === 'Behavioral' ? 5 : -4;
    return topics.map(t => ({
      ...t,
      mastery: Math.min(100, Math.max(0, t.mastery + offset))
    }));
  }, [activeTab]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-20 space-y-12 relative z-10"
    >
      {/* Header */}
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
          
          <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>AI Telemetry & Mastery Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Historical Performance & Competency Growth
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Longitudinal analysis across 24 simulated technical interviews
          </p>
        </div>

        <div className="relative z-50">
          <button
            onClick={() => {
              sound.playClick();
              setIsPracticeMenuOpen(!isPracticeMenuOpen);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>Launch Practice</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isPracticeMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isPracticeMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-56 rounded-2xl bg-[#111827]/95 border border-white/[0.12] shadow-2xl backdrop-blur-xl overflow-hidden py-1.5"
              >
                <button
                  onClick={() => { sound.playClick(); onNavigate('setup'); }}
                  className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-white/[0.08] hover:text-white transition-colors flex items-center gap-3"
                >
                  <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400"><Terminal className="w-4 h-4" /></div>
                  <span className="font-medium">Standard Technical</span>
                </button>
                <button
                  onClick={() => { sound.playClick(); onNavigate('setup-loop'); }}
                  className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-white/[0.08] hover:text-white transition-colors flex items-center gap-3"
                >
                  <div className="p-1.5 rounded-lg bg-green-500/20 text-green-400"><Briefcase className="w-4 h-4" /></div>
                  <span className="font-medium">Full Onsite Loop</span>
                </button>
                <button
                  onClick={() => { sound.playClick(); onNavigate('setup-behavioral'); }}
                  className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-white/[0.08] hover:text-white transition-colors flex items-center gap-3"
                >
                  <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400"><Users className="w-4 h-4" /></div>
                  <span className="font-medium">Behavioral Prep</span>
                </button>
                <button
                  onClick={() => { sound.playClick(); onNavigate('setup-coding'); }}
                  className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-white/[0.08] hover:text-white transition-colors flex items-center gap-3"
                >
                  <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400"><Code2 className="w-4 h-4" /></div>
                  <span className="font-medium">Coding Interview</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex bg-[#111827]/80 rounded-xl p-1 border border-white/[0.08] backdrop-blur-xl shrink-0 overflow-x-auto max-w-full w-max mt-6">
        {['Standard', 'Loop', 'Behavioral', 'Coding'].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              sound.playClick();
              setActiveTab(tab as any);
            }}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === tab
                ? 'bg-purple-500/20 text-purple-300 shadow-sm border border-purple-500/30'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.05] border border-transparent'
            }`}
          >
            {tab === 'Standard' ? 'Technical' : tab} Analytics
          </button>
        ))}
      </div>

      {/* 1. TOP STATS OVERVIEW */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <motion.div variants={cardVariants} className="p-6 rounded-[24px] bg-[#111827]/70 border border-white/[0.08] backdrop-blur-xl">
          <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Overall Trajectory</span>
          <div className="flex items-baseline gap-3 mt-2">
            <span className="text-3xl font-extrabold text-green-400">{activeTab === 'Standard' ? '+27%' : activeTab === 'Behavioral' ? '+34%' : '+15%'}</span>
            <span className="text-xs text-gray-400">Since first session</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Consistent upward trend in technical accuracy and structural pacing.</p>
        </motion.div>

        <motion.div variants={cardVariants} className="p-6 rounded-[24px] bg-[#111827]/70 border border-white/[0.08] backdrop-blur-xl">
          <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Top Competency</span>
          <div className="flex items-baseline gap-3 mt-2">
            <span className="text-3xl font-extrabold text-blue-400">{activeTab === 'Coding' ? 'Algorithms' : 'Behavioral'}</span>
            <span className="text-xs text-green-400 font-bold">{activeTab === 'Coding' ? '91%' : '95%'} Mastery</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Exemplary use of structure with quantifiable engineering metrics.</p>
        </motion.div>

        <motion.div variants={cardVariants} className="p-6 rounded-[24px] bg-[#111827]/70 border border-white/[0.08] backdrop-blur-xl">
          <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Focus Target</span>
          <div className="flex items-baseline gap-3 mt-2">
            <span className="text-3xl font-extrabold text-purple-400">{activeTab === 'Coding' ? 'Dynamic Prog.' : 'DevOps Tooling'}</span>
            <span className="text-xs text-amber-400 font-bold">84% Mastery</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Recommend practicing focus targets before your next interview loop.</p>
        </motion.div>
      </div>

      {/* 2. RECHARTS HISTORICAL PROGRESS AREA CHART */}
      <motion.div variants={cardVariants} className="p-6 sm:p-8 rounded-[28px] bg-[#111827]/80 border border-white/[0.08] shadow-2xl backdrop-blur-xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <span>Score Trajectory Over Time</span>
            </h2>
            <p className="text-xs text-gray-400">Comparing raw session scores against your rolling moving average</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
            Last {historicalScores.length} Sessions
          </span>
        </div>

        <div className="w-full h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={historicalScores} margin={{ top: 20, right: 20, left: -20, bottom: 20 }}>
              <defs>
                <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="avgColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="session" stroke="#9ca3af" tick={{ fill: '#d1d5db', fontSize: 12, fontWeight: 600 }} />
              <YAxis domain={[60, 100]} stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <RechartsTooltip
                contentStyle={{
                  backgroundColor: '#111827',
                  borderColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '13px'
                }}
              />
              <Area type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#scoreColor)" name="Session Score" />
              <Area type="monotone" dataKey="avg" stroke="#8B5CF6" strokeWidth={2} strokeDasharray="4 4" fillOpacity={1} fill="url(#avgColor)" name="Rolling Average" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* 3. TOPIC MASTERY PROGRESS BARS */}
      <motion.div variants={cardVariants} className="p-6 sm:p-8 rounded-[28px] bg-[#111827]/80 border border-white/[0.08] shadow-2xl backdrop-blur-xl space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-400" />
            <span>Subject Domain Mastery Breakdown</span>
          </h2>
          <p className="text-xs text-gray-400">AI evaluated confidence level across major software engineering domains</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {topicMastery.map((topic, idx) => (
            <div
              key={topic.topic}
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.05] space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">{topic.topic}</span>
                <span className="text-xs font-extrabold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
                  {topic.mastery}%
                </span>
              </div>

              {/* Animated Progress Bar */}
              <div className="w-full bg-white/[0.05] h-2.5 rounded-full overflow-hidden p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${topic.mastery}%` }}
                  transition={{ duration: 1.2, delay: idx * 0.1, ease: 'easeOut' }}
                  className={`h-full rounded-full shadow-glow-blue ${
                    topic.mastery >= 90 ? 'bg-gradient-to-r from-blue-500 to-green-400' :
                    topic.mastery >= 85 ? 'bg-gradient-to-r from-indigo-500 to-blue-400' :
                    'bg-gradient-to-r from-purple-500 to-amber-400'
                  }`}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                <span>{topic.questionsAnswered} simulated questions answered</span>
                <span className="text-gray-400 font-semibold">{topic.mastery >= 90 ? 'Expert' : 'Proficient'}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

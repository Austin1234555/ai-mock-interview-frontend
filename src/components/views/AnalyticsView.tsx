import React from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer
} from 'recharts';
import { TrendingUp, Award, Sparkles, Zap } from 'lucide-react';
import { mockHistoricalScores, mockTopicMastery } from '../../data/mockData';
import { cardVariants, containerVariants } from '../../utils/motion';
import { sound } from '../../utils/sound';
import type { AppScreen } from '../../types';

interface AnalyticsViewProps {
  onNavigate: (screen: AppScreen) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ onNavigate }) => {
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

        <button
          onClick={() => {
            sound.playClick();
            onNavigate('setup');
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform"
        >
          <Zap className="w-4 h-4 fill-current" />
          <span>Launch Practice</span>
        </button>
      </div>

      {/* 1. TOP STATS OVERVIEW */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <motion.div variants={cardVariants} className="p-6 rounded-[24px] bg-[#111827]/70 border border-white/[0.08] backdrop-blur-xl">
          <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Overall Trajectory</span>
          <div className="flex items-baseline gap-3 mt-2">
            <span className="text-3xl font-extrabold text-green-400">+27%</span>
            <span className="text-xs text-gray-400">Since first session</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Consistent upward trend in technical accuracy and structural pacing.</p>
        </motion.div>

        <motion.div variants={cardVariants} className="p-6 rounded-[24px] bg-[#111827]/70 border border-white/[0.08] backdrop-blur-xl">
          <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Top Competency</span>
          <div className="flex items-baseline gap-3 mt-2">
            <span className="text-3xl font-extrabold text-blue-400">Behavioral</span>
            <span className="text-xs text-green-400 font-bold">95% Mastery</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Exemplary use of STAR structure with quantifiable engineering metrics.</p>
        </motion.div>

        <motion.div variants={cardVariants} className="p-6 rounded-[24px] bg-[#111827]/70 border border-white/[0.08] backdrop-blur-xl">
          <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Focus Target</span>
          <div className="flex items-baseline gap-3 mt-2">
            <span className="text-3xl font-extrabold text-purple-400">DevOps Tooling</span>
            <span className="text-xs text-amber-400 font-bold">84% Mastery</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Recommend practicing Kubernetes ingress and Kafka sharding questions next.</p>
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
            Last 7 Sessions
          </span>
        </div>

        <div className="w-full h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockHistoricalScores} margin={{ top: 20, right: 20, left: -20, bottom: 20 }}>
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
          {mockTopicMastery.map((topic, idx) => (
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

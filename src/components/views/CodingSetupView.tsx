import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  CheckCircle2, 
  Code2,
  Target,
  Clock,
  HelpCircle,
  FileCode2,
  ArrowLeft
} from 'lucide-react';
import { containerVariants, buttonVariants } from '../../utils/motion';
import { sound } from '../../utils/sound';
import type { 
  InterviewConfig, 
  InterviewDifficulty, 
  InterviewDuration 
} from '../../types';

interface CodingSetupViewProps {
  onStartInterview: (config: InterviewConfig) => void;
  onNavigateBack: () => void;
}

export const CodingSetupView: React.FC<CodingSetupViewProps> = ({
  onStartInterview,
  onNavigateBack,
}) => {
  const [topic, setTopic] = useState<string>('Arrays & Strings');
  const [difficulty, setDifficulty] = useState<InterviewDifficulty>('Medium');
  const [duration, setDuration] = useState<InterviewDuration>('45 Minutes');
  const [questionCount, setQuestionCount] = useState<number>(2);
  const [language, setLanguage] = useState<string>('Python');

  const topics = [
    { id: 'Arrays & Strings', label: 'Arrays & Strings', desc: 'Two Pointers, Sliding Window, Hashing' },
    { id: 'Dynamic Programming', label: 'Dynamic Programming', desc: 'Memoization, Tabulation, Knapsack' },
    { id: 'Trees & Graphs', label: 'Trees & Graphs', desc: 'BFS, DFS, Shortest Path, MST' },
    { id: 'System Level DSA', label: 'Advanced Data Structures', desc: 'Tries, Segment Trees, Heaps' }
  ];

  const languages = ['Python', 'Java', 'C++', 'JavaScript', 'Go', 'Rust'];
  const difficulties: InterviewDifficulty[] = ['Easy', 'Medium', 'Hard'];
  const durations: InterviewDuration[] = ['30 Minutes', '45 Minutes', '60 Minutes'];
  const questionCounts: number[] = [1, 2, 3];

  const handleStart = () => {
    sound.playSuccess();
    const config: InterviewConfig = {
      role: 'Full Stack Engineer', // Provide a fallback role
      level: 'Mid-Level',
      difficulty,
      duration,
      focusArea: `${topic} in ${language}`,
      questionCount,
      timePerQuestion: duration === '30 Minutes' ? 1800 : duration === '45 Minutes' ? 1350 : 1800,
      includeTechnicalCoding: true,
    };
    onStartInterview(config);
  };

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
              onNavigateBack();
            }}
            className="flex items-center gap-2 px-3 py-1.5 mb-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-gray-400 hover:text-white font-medium text-xs border border-white/[0.08] transition-colors w-fit"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>

      <div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
          <span className="p-3 sm:p-4 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Code2 className="w-8 h-8 sm:w-10 sm:h-10" />
          </span>
          Live Coding Prep Configuration
        </h1>
        <p className="text-sm sm:text-base text-gray-400 mt-4 max-w-3xl leading-relaxed">
          Sharpen your algorithmic problem solving skills. Configure your data structures focus, select your preferred language, and the AI will generate LeetCode-style challenges graded in real-time on time and space complexity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* DSA Topic Focus */}
          <motion.div variants={containerVariants} className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-400" />
              Algorithmic Focus Area
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {topics.map((t) => (
                <motion.button
                  key={t.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    sound.playClick();
                    setTopic(t.id);
                  }}
                  className={`relative p-4 rounded-2xl border text-left transition-all ${
                    topic === t.id
                      ? 'bg-purple-500/20 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.2)]'
                      : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.08]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-bold ${topic === t.id ? 'text-purple-400' : 'text-gray-300'}`}>
                      {t.label}
                    </span>
                    {topic === t.id && <CheckCircle2 className="w-4 h-4 text-purple-400" />}
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-1">{t.desc}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Target Language */}
          <motion.div variants={containerVariants} className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileCode2 className="w-5 h-5 text-blue-400" />
              Programming Language
            </h2>
            <div className="flex flex-wrap gap-3">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    sound.playClick();
                    setLanguage(lang);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                    language === lang
                      ? 'bg-blue-500/20 border-blue-500/50 text-blue-300 shadow-sm'
                      : 'bg-white/[0.03] border-white/[0.08] text-gray-400 hover:text-gray-200 hover:bg-white/[0.08]'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar: Settings & Start */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-[24px] bg-[#111827]/80 border border-white/[0.08] backdrop-blur-xl space-y-8 sticky top-28">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-gray-300 flex items-center gap-2">
                  <Target className="w-4 h-4 text-red-400" />
                  Difficulty
                </label>
                <span className="text-xs text-red-400 font-bold bg-red-500/10 px-2 py-1 rounded-md">
                  {difficulty}
                </span>
              </div>
              <div className="flex gap-2">
                {difficulties.map((diff) => (
                  <button
                    key={diff}
                    onClick={() => {
                      sound.playClick();
                      setDifficulty(diff);
                    }}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-colors ${
                      difficulty === diff 
                        ? 'bg-red-500/20 border-red-500/50 text-red-300' 
                        : 'bg-white/[0.05] border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/[0.1]'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-gray-300 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  Duration
                </label>
                <span className="text-xs text-amber-400 font-bold bg-amber-500/10 px-2 py-1 rounded-md">
                  {duration}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {durations.map((dur) => (
                  <button
                    key={dur}
                    onClick={() => {
                      sound.playClick();
                      setDuration(dur);
                    }}
                    className={`py-2 rounded-lg text-xs font-bold border transition-colors ${
                      duration === dur 
                        ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' 
                        : 'bg-white/[0.05] border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/[0.1]'
                    }`}
                  >
                    {dur.split(' ')[0]}m
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-gray-300 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-cyan-400" />
                  Problems
                </label>
                <span className="text-xs text-cyan-400 font-bold bg-cyan-500/10 px-2 py-1 rounded-md">
                  {questionCount}
                </span>
              </div>
              <div className="flex gap-2">
                {questionCounts.map((count) => (
                  <button
                    key={count}
                    onClick={() => {
                      sound.playClick();
                      setQuestionCount(count);
                    }}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-colors ${
                      questionCount === count 
                        ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300' 
                        : 'bg-white/[0.05] border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/[0.1]'
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.08]">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleStart}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-sm shadow-xl shadow-purple-500/20 hover:shadow-purple-500/40 border border-white/10 transition-all"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Start Coding Interview</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

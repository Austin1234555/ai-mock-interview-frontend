import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  CheckCircle2, 
  Users,
  Target,
  Clock,
  HelpCircle,
  Building2,
  ArrowLeft
} from 'lucide-react';
import { containerVariants, buttonVariants } from '../../utils/motion';
import { sound } from '../../utils/sound';
import type { 
  ExperienceLevel, 
  InterviewConfig, 
  InterviewDifficulty, 
  InterviewDuration 
} from '../../types';

interface BehavioralSetupViewProps {
  onStartInterview: (config: InterviewConfig) => void;
  onNavigateBack: () => void;
}

export const BehavioralSetupView: React.FC<BehavioralSetupViewProps> = ({
  onStartInterview,
  onNavigateBack,
}) => {
  const [companyFocus, setCompanyFocus] = useState<string>('Amazon Leadership Principles');
  const [level, setLevel] = useState<ExperienceLevel>('Senior');
  const [difficulty, setDifficulty] = useState<InterviewDifficulty>('Medium');
  const [duration, setDuration] = useState<InterviewDuration>('30 Minutes');
  const [questionCount, setQuestionCount] = useState<number>(4);
  const [focusArea, setFocusArea] = useState<string>('Conflict Resolution & Leadership');

  const companies = [
    { id: 'Amazon Leadership Principles', label: 'Amazon', desc: 'Customer Obsession, Ownership, Dive Deep' },
    { id: 'Meta Core Values', label: 'Meta', desc: 'Move Fast, Focus on Long-Term Impact' },
    { id: 'Google Googleyness', label: 'Google', desc: 'Thriving in Ambiguity, Value Feedback' },
    { id: 'Generic Behavioral', label: 'General / Startup', desc: 'STAR Method, Teamwork, Adaptability' }
  ];

  const focusScenarios = [
    'Conflict Resolution & Leadership',
    'Failure & Lessons Learned',
    'Time Management & Prioritization',
    'Cross-functional Collaboration'
  ];

  const levels: ExperienceLevel[] = ['1–2 Years', '3–5 Years', 'Senior', 'Staff / Principal', 'Manager', 'Director'];
  const difficulties: InterviewDifficulty[] = ['Easy', 'Medium', 'Hard'];
  const durations: InterviewDuration[] = ['15 Minutes', '30 Minutes', '45 Minutes', '60 Minutes'];
  const questionCounts: number[] = [3, 4, 5, 6];

  const handleStart = () => {
    sound.playSuccess();
    const config: InterviewConfig = {
      role: 'Behavioral', // Use our new generic Behavioral role
      level,
      difficulty,
      duration,
      focusArea,
      companyFocus,
      questionCount,
      timePerQuestion: duration === '15 Minutes' ? 240 : duration === '30 Minutes' ? 300 : 360,
      includeTechnicalCoding: false,
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
          <span className="p-3 sm:p-4 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Users className="w-8 h-8 sm:w-10 sm:h-10" />
          </span>
          Behavioral Prep Configuration
        </h1>
        <p className="text-sm sm:text-base text-gray-400 mt-4 max-w-3xl leading-relaxed">
          Configure your behavioral and cultural fit interview. The AI will evaluate your responses using the STAR method (Situation, Task, Action, Result) against specific company values and leadership principles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* Company Focus */}
          <motion.div variants={containerVariants} className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-400" />
              Company Framework
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {companies.map((company) => (
                <motion.button
                  key={company.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    sound.playClick();
                    setCompanyFocus(company.id);
                  }}
                  className={`relative p-4 rounded-2xl border text-left transition-all ${
                    companyFocus === company.id
                      ? 'bg-amber-500/20 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                      : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.08]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-bold ${companyFocus === company.id ? 'text-amber-400' : 'text-gray-300'}`}>
                      {company.label}
                    </span>
                    {companyFocus === company.id && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-1">{company.desc}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Target Scenarios */}
          <motion.div variants={containerVariants} className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-red-400" />
              Primary Scenario Focus
            </h2>
            <div className="flex flex-wrap gap-3">
              {focusScenarios.map((scenario) => (
                <button
                  key={scenario}
                  onClick={() => {
                    sound.playClick();
                    setFocusArea(scenario);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                    focusArea === scenario
                      ? 'bg-red-500/20 border-red-500/50 text-red-300 shadow-sm'
                      : 'bg-white/[0.03] border-white/[0.08] text-gray-400 hover:text-gray-200 hover:bg-white/[0.08]'
                  }`}
                >
                  {scenario}
                </button>
              ))}
            </div>
          </motion.div>
          
          {/* Level */}
          <motion.div variants={containerVariants} className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-green-400" />
              Target Role Level
            </h2>
            <div className="flex flex-wrap gap-3">
              {levels.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => {
                    sound.playClick();
                    setLevel(lvl);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                    level === lvl
                      ? 'bg-green-500/20 border-green-500/50 text-green-300 shadow-sm'
                      : 'bg-white/[0.03] border-white/[0.08] text-gray-400 hover:text-gray-200 hover:bg-white/[0.08]'
                  }`}
                >
                  {lvl}
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
                  <Target className="w-4 h-4 text-purple-400" />
                  Difficulty
                </label>
                <span className="text-xs text-purple-400 font-bold bg-purple-500/10 px-2 py-1 rounded-md">
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
                        ? 'bg-purple-500/20 border-purple-500/50 text-purple-300' 
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
                  <Clock className="w-4 h-4 text-blue-400" />
                  Duration
                </label>
                <span className="text-xs text-blue-400 font-bold bg-blue-500/10 px-2 py-1 rounded-md">
                  {duration}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {durations.map((dur) => (
                  <button
                    key={dur}
                    onClick={() => {
                      sound.playClick();
                      setDuration(dur);
                    }}
                    className={`py-2 rounded-lg text-xs font-bold border transition-colors ${
                      duration === dur 
                        ? 'bg-blue-500/20 border-blue-500/50 text-blue-300' 
                        : 'bg-white/[0.05] border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/[0.1]'
                    }`}
                  >
                    {dur}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-gray-300 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-cyan-400" />
                  Questions
                </label>
                <span className="text-xs text-cyan-400 font-bold bg-cyan-500/10 px-2 py-1 rounded-md">
                  {questionCount}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {questionCounts.map((count) => (
                  <button
                    key={count}
                    onClick={() => {
                      sound.playClick();
                      setQuestionCount(count);
                    }}
                    className={`py-2 rounded-lg text-xs font-bold border transition-colors ${
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
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-extrabold text-sm shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 border border-white/10 transition-all"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Launch Behavioral Prep</span>
              </motion.button>
              <p className="text-center text-[11px] text-gray-500 mt-3">
                Ensure your microphone and camera are connected.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

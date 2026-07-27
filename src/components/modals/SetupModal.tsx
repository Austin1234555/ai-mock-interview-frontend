import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Play, 
  Terminal, 
  Cpu, 
  Briefcase, 
  CheckCircle2, 
  Sliders, 
  Layers,
  Clock,
  HelpCircle,
  Zap,
  Code2,
  Database,
  Smartphone,
  Cloud,
  Layout
} from 'lucide-react';
import { modalVariants, buttonVariants } from '../../utils/motion';
import { sound } from '../../utils/sound';
import type { 
  InterviewRole, 
  ExperienceLevel, 
  InterviewConfig, 
  InterviewDifficulty, 
  InterviewDuration 
} from '../../types';

interface SetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartInterview: (config: InterviewConfig) => void;
}

export const SetupModal: React.FC<SetupModalProps> = ({
  isOpen,
  onClose,
  onStartInterview,
}) => {
  const [role, setRole] = useState<InterviewRole>('Java Backend');
  const [level, setLevel] = useState<ExperienceLevel>('3–5 Years');
  const [difficulty, setDifficulty] = useState<InterviewDifficulty>('Medium');
  const [duration, setDuration] = useState<InterviewDuration>('30 Minutes');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [focusArea, setFocusArea] = useState<string>('System Architecture & Scalability');
  const [includeCoding, setIncludeCoding] = useState<boolean>(true);

  if (!isOpen) return null;

  const roles: { id: InterviewRole; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'Java Backend', label: 'Java Backend', icon: <Database className="w-4 h-4 text-orange-400" />, desc: 'JVM, Spring Boot, Microservices, SAGA' },
    { id: 'Python Backend', label: 'Python Backend', icon: <Terminal className="w-4 h-4 text-blue-400" />, desc: 'FastAPI, Django, AsyncIO, SQLAlchemy' },
    { id: 'Frontend', label: 'Frontend', icon: <Layout className="w-4 h-4 text-cyan-400" />, desc: 'React, Next.js, Web Vitals, DOM' },
    { id: 'Full Stack', label: 'Full Stack', icon: <Code2 className="w-4 h-4 text-purple-400" />, desc: 'Node/Python + React/Vue, System Scale' },
    { id: 'DevOps Engineer', label: 'DevOps Engineer', icon: <Cloud className="w-4 h-4 text-green-400" />, desc: 'Kubernetes, Terraform, CI/CD, AWS' },
    { id: 'Flutter', label: 'Flutter', icon: <Smartphone className="w-4 h-4 text-sky-400" />, desc: 'Dart, State Management, Custom Paint' },
    { id: 'Android', label: 'Android', icon: <Smartphone className="w-4 h-4 text-emerald-400" />, desc: 'Kotlin, Jetpack Compose, Coroutines' },
    { id: 'Machine Learning', label: 'Machine Learning', icon: <Cpu className="w-4 h-4 text-amber-400" />, desc: 'PyTorch, Transformers, MLOps, LLMs' },
  ];

  const levels: ExperienceLevel[] = ['Fresher', '1–2 Years', '3–5 Years', '5+ Years', 'Senior', 'Staff / Principal'];
  const difficulties: InterviewDifficulty[] = ['Easy', 'Medium', 'Hard'];
  const durations: InterviewDuration[] = ['15 Minutes', '30 Minutes', '45 Minutes', '60 Minutes'];
  const questionCounts: number[] = [5, 10, 15, 20];

  const handleStart = () => {
    sound.playSuccess();
    const config: InterviewConfig = {
      role,
      level,
      difficulty,
      duration,
      focusArea,
      questionCount,
      timePerQuestion: duration === '15 Minutes' ? 120 : duration === '30 Minutes' ? 180 : 240,
      includeTechnicalCoding: includeCoding,
    };
    onStartInterview(config);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto custom-scrollbar">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* 28px Dialog Card */}
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto custom-scrollbar p-6 sm:p-8 rounded-[28px] bg-[#111827]/95 border border-white/[0.12] shadow-2xl backdrop-blur-2xl text-left space-y-6 z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-500 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Sliders className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  Configure AI Interview Session
                </h2>
                <p className="text-xs text-gray-400">
                  Select your target job role, experience tier, difficulty, and duration parameters
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 1. Job Role Selection */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-400" />
              <span>1. Target Job Role</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {roles.map((r) => {
                const isSelected = role === r.id;
                return (
                  <div
                    key={r.id}
                    onClick={() => {
                      sound.playClick();
                      setRole(r.id);
                    }}
                    className={`p-3 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-blue-500/15 border-blue-500/60 shadow-lg shadow-blue-500/10'
                        : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      {r.icon}
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">{r.label}</span>
                      <span className="text-[10px] text-gray-400 block line-clamp-1 mt-0.5">{r.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Experience Level */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" />
              <span>2. Experience Tier</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {levels.map((lvl) => {
                const isSelected = level === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setLevel(lvl);
                    }}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      isSelected
                        ? 'bg-purple-500/20 border-purple-500 text-purple-200 shadow-md shadow-purple-500/10'
                        : 'bg-white/[0.03] border-white/[0.06] text-gray-400 hover:text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    {lvl}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Difficulty & Duration Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Difficulty Level */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>3. Difficulty Level</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {difficulties.map((diff) => {
                  const isSelected = difficulty === diff;
                  return (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setDifficulty(diff);
                      }}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                        isSelected
                          ? diff === 'Hard'
                            ? 'bg-red-500/20 border-red-500 text-red-200'
                            : diff === 'Medium'
                            ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                            : 'bg-green-500/20 border-green-500 text-green-200'
                          : 'bg-white/[0.03] border-white/[0.06] text-gray-400 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      {diff}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Duration */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>4. Interview Duration</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {durations.map((dur) => {
                  const isSelected = duration === dur;
                  return (
                    <button
                      key={dur}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setDuration(dur);
                      }}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                        isSelected
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-200 shadow-md shadow-cyan-500/10'
                          : 'bg-white/[0.03] border-white/[0.06] text-gray-400 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      {dur}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 4. Number of Questions & Focus Area */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 pt-2">
            <div className="sm:col-span-5 space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-400" />
                <span>5. Number of Questions</span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {questionCounts.map((cnt) => {
                  const isSelected = questionCount === cnt;
                  return (
                    <button
                      key={cnt}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setQuestionCount(cnt);
                      }}
                      className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                        isSelected
                          ? 'bg-indigo-500/20 border-indigo-500 text-indigo-200 shadow-md shadow-indigo-500/10'
                          : 'bg-white/[0.03] border-white/[0.06] text-gray-400 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      {cnt} Qs
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="sm:col-span-7 space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center justify-between">
                <span>6. Core Domain Focus</span>
                <span className="text-[10px] text-blue-400 font-medium">Customizable</span>
              </label>
              <input
                type="text"
                value={focusArea}
                onChange={(e) => setFocusArea(e.target.value)}
                placeholder="e.g. System Architecture, Concurrency, Microservices"
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-semibold placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
              />
              <label className="flex items-center gap-2 pt-1 cursor-pointer text-xs text-gray-300 hover:text-white transition-colors">
                <input
                  type="checkbox"
                  checked={includeCoding}
                  onChange={(e) => setIncludeCoding(e.target.checked)}
                  className="rounded bg-black/50 border-white/20 text-blue-500 focus:ring-0 w-3.5 h-3.5"
                />
                <span>Include Live Algorithmic Coding Challenge (LeetCode Medium/Hard)</span>
              </label>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-4">
            <div className="text-xs text-gray-400 hidden sm:block">
              <span>Ready for <strong className="text-white">{role}</strong> ({difficulty} • {questionCount} Qs • {duration})</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-gray-300 transition-colors"
              >
                Cancel
              </button>
              <motion.button
                type="button"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleStart}
                className="flex-1 sm:flex-initial px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 border border-white/20 flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start Interview Session</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

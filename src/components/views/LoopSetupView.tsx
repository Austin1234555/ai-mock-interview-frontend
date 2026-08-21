import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  CheckCircle2, 
  Briefcase,
  Layers,
  Building2,
  ArrowLeft,
  Settings,
  Code2,
  MessageSquare,
  Network
} from 'lucide-react';
import { containerVariants, buttonVariants } from '../../utils/motion';
import { sound } from '../../utils/sound';
import type { 
  InterviewRole,
  ExperienceLevel, 
  LoopState,
  LoopRound,
  InterviewDifficulty
} from '../../types';

interface LoopSetupViewProps {
  onStartLoop: (loopState: LoopState) => void;
  onNavigateBack: () => void;
}

export const LoopSetupView: React.FC<LoopSetupViewProps> = ({
  onStartLoop,
  onNavigateBack,
}) => {
  const [role, setRole] = useState<InterviewRole>('Full Stack Engineer');
  const [level, setLevel] = useState<ExperienceLevel>('Senior');
  const [company, setCompany] = useState<string>('Google');
  const [difficulty, setDifficulty] = useState<InterviewDifficulty>('Hard');

  const companies = ['Google', 'Meta', 'Amazon', 'Apple', 'Netflix', 'Microsoft'];
  const roles: InterviewRole[] = ['Frontend Architect', 'Full Stack Engineer', 'Java Backend', 'Python Backend', 'Machine Learning'];
  const levels: ExperienceLevel[] = ['1–2 Years', '3–5 Years', 'Senior', 'Staff / Principal'];
  const difficulties: InterviewDifficulty[] = ['Medium', 'Hard'];

  const handleStart = () => {
    sound.playSuccess();
    
    // Generate the 4 rounds
    const rounds: LoopRound[] = [
      {
        title: 'Round 1: Technical Deep Dive',
        config: {
          role, level, difficulty, duration: '45 Minutes', focusArea: 'Core Concepts & Language Internals',
          questionCount: 4, timePerQuestion: 675, includeTechnicalCoding: false, companyFocus: company
        }
      },
      {
        title: 'Round 2: Live Coding & DSA',
        config: {
          role, level, difficulty, duration: '45 Minutes', focusArea: 'Data Structures & Algorithms',
          questionCount: 2, timePerQuestion: 1350, includeTechnicalCoding: true, companyFocus: company
        }
      },
      {
        title: 'Round 3: System Design',
        config: {
          role: 'System Designer', level, difficulty, duration: '60 Minutes', focusArea: 'Large Scale Architecture',
          questionCount: 1, timePerQuestion: 3600, includeTechnicalCoding: false, companyFocus: company
        }
      },
      {
        title: 'Round 4: Behavioral & Culture Fit',
        config: {
          role: 'Behavioral', level, difficulty, duration: '30 Minutes', focusArea: 'Leadership & Conflict Resolution',
          questionCount: 4, timePerQuestion: 450, includeTechnicalCoding: false, companyFocus: company
        }
      }
    ];

    const loopState: LoopState = {
      company,
      role,
      level,
      rounds,
      currentRoundIndex: 0
    };

    onStartLoop(loopState);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-20 space-y-8 relative z-10"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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

      <div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
          <span className="p-3 sm:p-4 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <Briefcase className="w-8 h-8 sm:w-10 sm:h-10" />
          </span>
          Full Onsite Loop Configuration
        </h1>
        <p className="text-sm sm:text-base text-gray-400 mt-4 max-w-3xl leading-relaxed">
          Prepare for the ultimate test. We will simulate a grueling 4-round FAANG onsite loop consisting of Technical, Live Coding, System Design, and Behavioral rounds, back-to-back.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* Target Company */}
          <motion.div variants={containerVariants} className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-400" />
              Target Company (FAANG+)
            </h2>
            <div className="flex flex-wrap gap-3">
              {companies.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    sound.playClick();
                    setCompany(c);
                  }}
                  className={`px-5 py-3 rounded-xl text-sm font-bold border transition-all ${
                    company === c
                      ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300 shadow-sm'
                      : 'bg-white/[0.03] border-white/[0.08] text-gray-400 hover:text-gray-200 hover:bg-white/[0.08]'
                  }`}
                >
                  {c}
                </button>
              ))}
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Custom Company..."
                  value={companies.includes(company) ? '' : company}
                  onChange={(e) => setCompany(e.target.value)}
                  onClick={() => {
                    sound.playClick();
                    if (companies.includes(company)) setCompany('');
                  }}
                  className={`px-5 py-3 rounded-xl text-sm font-bold border transition-all outline-none min-w-[200px] ${
                    !companies.includes(company) && company !== ''
                      ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300 shadow-sm placeholder:text-indigo-300/50'
                      : 'bg-white/[0.03] border-white/[0.08] text-gray-400 hover:bg-white/[0.08] focus:border-white/[0.2] placeholder:text-gray-500'
                  }`}
                />
              </div>
            </div>
          </motion.div>

          {/* Primary Role */}
          <motion.div variants={containerVariants} className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-emerald-400" />
              Primary Role Focus
            </h2>
            <div className="flex flex-wrap gap-3">
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    sound.playClick();
                    setRole(r);
                  }}
                  className={`px-5 py-3 rounded-xl text-sm font-bold border transition-all ${
                    role === r
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-sm'
                      : 'bg-white/[0.03] border-white/[0.08] text-gray-400 hover:text-gray-200 hover:bg-white/[0.08]'
                  }`}
                >
                  {r}
                </button>
              ))}
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Custom Role..."
                  value={roles.includes(role as any) ? '' : role}
                  onChange={(e) => setRole(e.target.value)}
                  onClick={() => {
                    sound.playClick();
                    if (roles.includes(role as any)) setRole('');
                  }}
                  className={`px-5 py-3 rounded-xl text-sm font-bold border transition-all outline-none min-w-[200px] ${
                    !roles.includes(role as any) && role !== ''
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-sm placeholder:text-emerald-300/50'
                      : 'bg-white/[0.03] border-white/[0.08] text-gray-400 hover:bg-white/[0.08] focus:border-white/[0.2] placeholder:text-gray-500'
                  }`}
                />
              </div>
            </div>
          </motion.div>
          
          {/* Level */}
          <motion.div variants={containerVariants} className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
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
                  className={`px-5 py-3 rounded-xl text-sm font-bold border transition-all ${
                    level === lvl
                      ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-sm'
                      : 'bg-white/[0.03] border-white/[0.08] text-gray-400 hover:text-gray-200 hover:bg-white/[0.08]'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar: Itinerary & Start */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-[24px] bg-[#111827]/80 border border-white/[0.08] backdrop-blur-xl space-y-6 sticky top-28">
            
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                Loop Itinerary
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-1.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-200">1. Technical Deep Dive</h4>
                    <p className="text-xs text-gray-400">45 Minutes • Conceptual & Internals</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-1.5 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-200">2. Live Coding & DSA</h4>
                    <p className="text-xs text-gray-400">45 Minutes • Algorithmic Problem Solving</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <Network className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-200">3. System Design</h4>
                    <p className="text-xs text-gray-400">60 Minutes • Architecture & Scalability</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-200">4. Behavioral</h4>
                    <p className="text-xs text-gray-400">30 Minutes • Culture Fit & Leadership</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.08]">
              <div className="flex gap-2 mb-4">
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
                    {diff} Difficulty
                  </button>
                ))}
              </div>

              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleStart}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-sm shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 border border-white/10 transition-all"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Commence Onsite Loop</span>
              </motion.button>
              <p className="text-center text-[11px] text-gray-500 mt-3">
                Total Estimated Time: 3 Hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

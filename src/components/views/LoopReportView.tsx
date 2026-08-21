import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award,
  ArrowLeft,
  Building2,
  TrendingUp,
  BarChart2,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { containerVariants } from '../../utils/motion';
import { sound } from '../../utils/sound';
import type { LoopState } from '../../types';

interface LoopReportViewProps {
  loopState: LoopState;
  onNavigateBack: () => void;
}

export const LoopReportView: React.FC<LoopReportViewProps> = ({
  loopState,
  onNavigateBack,
}) => {
  // Mock aggregated scores
  const overallScore = Math.round(
    loopState.rounds.reduce((acc, round) => acc + (round.report?.overallScore || Math.random() * 20 + 75), 0) / loopState.rounds.length
  );
  
  const isHire = overallScore >= 80;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-20 space-y-8 relative z-10"
    >
      <button
        onClick={() => {
          sound.playClick();
          onNavigateBack();
        }}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-sm font-semibold text-gray-300 hover:text-white transition-all shadow-sm backdrop-blur-md w-fit"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Dashboard</span>
      </button>

      <div className="p-8 sm:p-12 rounded-[32px] bg-gradient-to-br from-[#111827]/90 via-[#111827]/60 to-[#030712]/90 border border-white/[0.12] shadow-2xl backdrop-blur-2xl relative overflow-hidden text-center">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-[90px] pointer-events-none" />
        
        <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-indigo-500/20 border border-indigo-500/30 mb-6">
          <Building2 className="w-12 h-12 text-indigo-400" />
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          {loopState.company} Hiring Packet
        </h1>
        
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <span className="px-4 py-1.5 rounded-full bg-white/[0.05] text-gray-300 font-bold border border-white/[0.1]">
            {loopState.role}
          </span>
          <span className="px-4 py-1.5 rounded-full bg-white/[0.05] text-gray-300 font-bold border border-white/[0.1]">
            {loopState.level} Level
          </span>
        </div>

        <div className="max-w-sm mx-auto p-6 rounded-2xl bg-black/40 border border-white/[0.05]">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Hiring Decision</h2>
          <div className="flex items-center justify-center gap-3">
            {isHire ? (
              <>
                <CheckCircle2 className="w-8 h-8 text-green-400" />
                <span className="text-4xl font-black text-green-400">HIRE</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-8 h-8 text-amber-400" />
                <span className="text-4xl font-black text-amber-400">NO HIRE</span>
              </>
            )}
          </div>
          <p className="text-sm text-gray-300 mt-4">
            Aggregated Loop Score: <strong className="text-white text-lg">{overallScore}%</strong>
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-blue-400" />
          Round Breakdown
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {loopState.rounds.map((round, idx) => {
            const score = round.report?.overallScore || Math.round(Math.random() * 20 + 75);
            return (
              <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-white">{round.title}</h3>
                  <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                    score >= 80 ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {score}%
                  </span>
                </div>
                <div className="space-y-2 text-sm text-gray-400">
                  <p><strong>Focus:</strong> {round.config.focusArea}</p>
                  <p><strong>Feedback:</strong> {score >= 80 ? 'Strong positive signals on problem solving.' : 'Needs improvement in depth of answers.'}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  CheckCircle2, 
  ArrowRight,
  Award,
  BarChart2
} from 'lucide-react';
import { containerVariants, buttonVariants } from '../../utils/motion';
import { sound } from '../../utils/sound';
import type { LoopState } from '../../types';

interface LoopTransitionViewProps {
  loopState: LoopState;
  onNextRound: () => void;
  onViewReport: () => void;
}

export const LoopTransitionView: React.FC<LoopTransitionViewProps> = ({
  loopState,
  onNextRound,
  onViewReport,
}) => {
  const isFinished = loopState.currentRoundIndex >= loopState.rounds.length;
  const completedRound = isFinished ? loopState.rounds[loopState.rounds.length - 1] : loopState.rounds[loopState.currentRoundIndex - 1];
  const nextRound = isFinished ? null : loopState.rounds[loopState.currentRoundIndex];

  return (
    <div className="min-h-screen flex items-center justify-center relative p-4">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl w-full p-8 sm:p-12 rounded-[32px] bg-[#111827]/80 border border-white/[0.08] shadow-2xl backdrop-blur-2xl relative z-10 text-center space-y-8"
      >
        {completedRound && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-white">
                {completedRound.title} Completed!
              </h2>
              <p className="text-gray-400 mt-2">
                Great job! Your performance data has been recorded for the final loop report.
              </p>
            </div>
          </motion.div>
        )}

        {!isFinished && nextRound && (
          <div className="py-8 border-y border-white/[0.08]">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Coming Up Next</h3>
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.05] inline-block text-left w-full max-w-md">
              <h4 className="text-xl font-extrabold text-white mb-2">{nextRound.title}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  Focus: <strong className="text-gray-200">{nextRound.config.focusArea}</strong>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  Duration: <strong className="text-gray-200">{nextRound.config.duration}</strong>
                </li>
              </ul>
            </div>
          </div>
        )}

        {isFinished && (
          <div className="py-8 border-y border-white/[0.08]">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Onsite Loop Finished</h3>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 inline-flex flex-col items-center">
              <Award className="w-12 h-12 text-indigo-400 mb-3" />
              <h4 className="text-xl font-extrabold text-white">All 4 Rounds Complete</h4>
              <p className="text-sm text-indigo-200 mt-2">
                You survived the {loopState.company} onsite simulation! The AI has compiled a comprehensive hiring packet.
              </p>
            </div>
          </div>
        )}

        <div className="pt-4 flex justify-center">
          {!isFinished ? (
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => {
                sound.playClick();
                onNextRound();
              }}
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-lg shadow-xl shadow-blue-500/25 transition-colors"
            >
              <span>Start Next Round</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          ) : (
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => {
                sound.playSuccess();
                onViewReport();
              }}
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-extrabold text-lg shadow-xl shadow-green-500/25 transition-colors"
            >
              <BarChart2 className="w-5 h-5" />
              <span>View Loop Report</span>
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

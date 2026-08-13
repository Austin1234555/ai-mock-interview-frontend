import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal, Shield, Cpu } from 'lucide-react';
import { sound } from '../../utils/sound';
import type { InterviewRole, InterviewConfig } from '../../types';

interface LoadingOrbViewProps {
  role: InterviewRole;
  config?: InterviewConfig;
  onLoadingComplete: () => void;
}

export const LoadingOrbView: React.FC<LoadingOrbViewProps> = ({
  role,
  config,
  onLoadingComplete,
}) => {
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    'Preparing Interview Environment...',
    'Analyzing Resume & Role Rubric...',
    `Generating Personalized ${role} Questions...`,
    'Synthesizing Real-Time AI Audio Visualizer...',
    'Readying FAANG-Grade Evaluation Rubric...',
  ];

  useEffect(() => {
    sound.playChime();
    const interval = setInterval(() => {
      setStepIndex(prev => {
        if (prev < steps.length - 1) {
          sound.playHover();
          return prev + 1;
        }
        return prev;
      });
    }, 900);

    const totalTimer = setTimeout(() => {
      sound.playSuccess();
      onLoadingComplete();
    }, 4500); // 4.5s total loading experience

    return () => {
      clearInterval(interval);
      clearTimeout(totalTimer);
    };
  }, [onLoadingComplete, steps.length]);

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 relative z-10">
      {/* 1. FLOATING AI ORB CONTAINER */}
      <div className="relative flex items-center justify-center w-72 h-72 sm:w-80 sm:h-80 mb-12">
        {/* Outer ambient glow pulse */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full blur-[70px]"
        />

        {/* Ring 1: Outer dashed rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full border-2 border-dashed border-blue-500/30"
        />

        {/* Ring 2: Reverse rotating gradient ring */}
        <motion.div
          animate={{ rotate: -360, scale: [0.98, 1.03, 0.98] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-52 h-52 sm:w-60 sm:h-60 rounded-full border border-purple-500/40 shadow-lg shadow-purple-500/20"
        />

        {/* Ring 3: Tilted orbital ring */}
        <motion.div
          animate={{ rotateX: [0, 180, 360], rotateY: [0, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full border border-indigo-400/50"
        />

        {/* Floating Particles around Orb */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -25, 0],
              x: [0, (i % 2 === 0 ? 20 : -20), 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 2.5 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
            className="absolute w-2 h-2 rounded-full bg-white shadow-glow-blue"
            style={{
              top: `${20 + (i * 12)}%`,
              left: `${15 + (i * 14)}%`,
            }}
          />
        ))}

        {/* THE CORE ORB */}
        <motion.div
          animate={{
            scale: [0.95, 1.05, 0.95],
            boxShadow: [
              '0 0 40px rgba(59, 130, 246, 0.5)',
              '0 0 80px rgba(139, 92, 246, 0.8)',
              '0 0 40px rgba(59, 130, 246, 0.5)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-2xl border border-white/30 backdrop-blur-md"
        >
          <div className="w-24 h-24 rounded-full bg-[#030712]/40 backdrop-blur-xl flex items-center justify-center border border-white/20">
            <Sparkles className="w-10 h-10 text-white animate-pulse" />
          </div>
        </motion.div>
      </div>

      {/* 2. DYNAMIC TEXT & PROGRESS */}
      <div className="text-center max-w-md space-y-6">
        <div className="h-14 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h3
              key={stepIndex}
              initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
              transition={{ duration: 0.3 }}
              className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center justify-center gap-2"
            >
              <span>{steps[stepIndex]}</span>
              <span className="flex gap-1 items-center ml-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
            </motion.h3>
          </AnimatePresence>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 font-medium">
            Targeting: <span className="text-blue-400 font-semibold">{role}</span> • {config?.level || 'Senior'} Level
          </p>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full bg-white/[0.05] h-2.5 rounded-full overflow-hidden p-0.5 border border-white/[0.08] shadow-inner">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full shadow-glow-blue relative overflow-hidden"
          >
            {/* Shimmer light effect inside progress bar */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-full animate-shimmer" />
          </motion.div>
        </div>

        <div className="flex items-center justify-center gap-6 pt-4 text-xs text-gray-500 font-medium">
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-blue-400" /> Rubric Synthesized
          </span>
          <span className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-purple-400" /> Ultra-low Latency
          </span>
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-teal-400" /> AES-256 Encrypted
          </span>
        </div>
      </div>
    </div>
  );
};




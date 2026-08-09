import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Cell
} from 'recharts';
import confetti from 'canvas-confetti';
import { 
  Award,
  FileText,
  Code2, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  Download, 
  Star, 
  TrendingUp,
  Clock,
  Cpu,
  MessageSquare,
  Zap,
  BookOpen,
  Home,
  ArrowLeft
} from 'lucide-react';
import { mockEvaluationReport } from '../../data/mockData';
import { cardVariants, containerVariants, buttonVariants } from '../../utils/motion';
import { sound } from '../../utils/sound';
import type { AppScreen, InterviewRole, EvaluationReport } from '../../types';

interface FeedbackReportViewProps {
  role: InterviewRole;
  onNavigate: (screen: AppScreen, role?: InterviewRole) => void;
}

// Helper component for animated number counter
const AnimatedScoreCounter: React.FC<{ target: number }> = ({ target }) => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(start + (target - start) * easeProgress);

      setScore(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setScore(target);
      }
    };

    requestAnimationFrame(animate);
  }, [target]);

  return <span>{score}</span>;
};

export const FeedbackReportView: React.FC<FeedbackReportViewProps> = ({
  role,
  onNavigate,
}) => {
  const report: EvaluationReport = { ...mockEvaluationReport, role };
  const [expandedAnswers, setExpandedAnswers] = useState<Record<number, boolean>>({});

  const toggleAnswer = (qNum: number) => {
    setExpandedAnswers(prev => ({ ...prev, [qNum]: !prev[qNum] }));
  };

  // Fire confetti on mount!
  useEffect(() => {
    sound.playSuccess();
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#3B82F6', '#8B5CF6', '#22C55E', '#6366F1'],
      });
    } catch {
      // Ignore if canvas-confetti fails in environment
    }
  }, []);

  const barColors = ['#3B82F6', '#6366F1', '#8B5CF6', '#22C55E'];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-20 space-y-8 relative z-10"
    >
      {/* Top Back Button */}
      <button
        onClick={() => {
          sound.playClick();
          onNavigate('dashboard');
        }}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-sm font-semibold text-gray-300 hover:text-white transition-all shadow-sm backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-fit"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Dashboard</span>
      </button>

      {/* 1. TOP SCORE HERO & EXECUTIVE SUMMARY */}
      <div className="p-8 sm:p-12 rounded-[32px] bg-gradient-to-br from-[#111827]/90 via-[#111827]/60 to-[#030712]/90 border border-white/[0.12] shadow-2xl backdrop-blur-2xl relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-green-500/20 via-blue-500/20 to-purple-500/20 rounded-full blur-[90px] pointer-events-none animate-pulseGlow" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column: Overall Circular Score */}
          <div className="lg:col-span-5 flex flex-col items-center text-center border-b lg:border-b-0 lg:border-r border-white/[0.08] pb-8 lg:pb-0 lg:pr-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/15 border border-green-500/30 text-green-300 text-xs font-bold uppercase tracking-wider mb-6">
              <Award className="w-4 h-4" />
              <span>Interview Session Successfully Completed</span>
            </div>

            {/* Circular Progress Score Indicator */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center my-2">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/30 to-green-500/30 blur-[40px] animate-pulseGlow" />

              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="42%"
                  className="stroke-white/[0.06] fill-transparent"
                  strokeWidth="12"
                />
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="42%"
                  className="stroke-gradient fill-transparent stroke-blue-500"
                  strokeWidth="12"
                  strokeDasharray={600}
                  initial={{ strokeDashoffset: 600 }}
                  animate={{ strokeDashoffset: 600 - (600 * report.overallScore) / 100 }}
                  transition={{ duration: 1.8, ease: 'easeInOut' }}
                  strokeLinecap="round"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl sm:text-6xl font-black text-white tracking-tight">
                  <AnimatedScoreCounter target={report.overallScore} />
                  <span className="text-2xl text-gray-400 font-normal">/100</span>
                </span>
                <span className="text-xs uppercase font-extrabold tracking-widest text-blue-400 mt-1">
                  FAANG L6 Pass Tier
                </span>
              </div>
            </div>

            {/* Animated Stars */}
            <div className="flex items-center justify-center gap-1.5 pt-4">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.15, type: 'spring' }}
                >
                  <Star className={`w-5 h-5 ${i < 4 ? 'text-amber-400 fill-amber-400' : 'text-amber-400/50 fill-amber-400/20'}`} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: AI Executive Summary */}
          <div className="lg:col-span-7 space-y-6 lg:pl-4">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-300 font-bold text-xs">
                  {report.role}
                </span>
                <span className="text-xs font-semibold text-gray-400">
                  {report.level} Level Evaluation • {report.date}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-gray-300 text-xs font-semibold">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  Time Taken: {report.timeTaken || '28m 42s'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                AI Executive Evaluation Report
              </h1>
            </div>

            <p className="text-base sm:text-lg text-gray-300 font-normal leading-relaxed bg-white/[0.03] p-6 rounded-2xl border border-white/[0.06] shadow-inner">
              &quot;{report.summary}&quot;
            </p>

            {/* Action buttons matching exact user labels */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  sound.playSuccess();
                  alert("Simulated PDF Report export initiated! A formal executive summary PDF has been downloaded to your device.");
                }}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 border border-white/20 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Report</span>
              </button>

              <motion.button
                type="button"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => {
                  sound.playClick();
                  onNavigate('setup', report.role);
                }}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-gray-200 font-bold text-sm border border-white/[0.08] transition-colors"
              >
                <RotateCcw className="w-4 h-4 text-blue-400" />
                <span>Retake Interview</span>
              </motion.button>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onNavigate('dashboard');
                }}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-gray-300 font-bold text-sm border border-white/[0.08] transition-colors"
              >
                <Home className="w-4 h-4 text-purple-400" />
                <span>Return to Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CORE COMPETENCY BREAKDOWN BADGES (5 Pillars) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <motion.div variants={cardVariants} className="p-5 rounded-[24px] bg-[#111827]/70 border border-blue-500/20 backdrop-blur-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Technical Knowledge</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-blue-400">{report.technicalScore || 94}%</span>
          </div>
          <div className="p-3 rounded-2xl bg-blue-500/15 text-blue-400 border border-blue-500/30">
            <Cpu className="w-6 h-6" />
          </div>
        </motion.div>

        <motion.div variants={cardVariants} className="p-5 rounded-[24px] bg-[#111827]/70 border border-purple-500/20 backdrop-blur-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Communication</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-purple-400">{report.communicationScore || 91}%</span>
          </div>
          <div className="p-3 rounded-2xl bg-purple-500/15 text-purple-400 border border-purple-500/30">
            <MessageSquare className="w-6 h-6" />
          </div>
        </motion.div>

        <motion.div variants={cardVariants} className="p-5 rounded-[24px] bg-[#111827]/70 border border-green-500/20 backdrop-blur-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Confidence Score</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-green-400">{report.confidenceScore || 93}%</span>
          </div>
          <div className="p-3 rounded-2xl bg-green-500/15 text-green-400 border border-green-500/30">
            <Zap className="w-6 h-6" />
          </div>
        </motion.div>

        <motion.div variants={cardVariants} className="p-5 rounded-[24px] bg-[#111827]/70 border border-amber-500/20 backdrop-blur-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Problem Solving</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">{report.problemSolvingScore || 90}%</span>
          </div>
          <div className="p-3 rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <TrendingUp className="w-6 h-6" />
          </div>
        </motion.div>
      </div>

      {/* 3. RECHARTS RADAR & BAR CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <motion.div variants={cardVariants} className="lg:col-span-6 p-6 sm:p-8 rounded-[28px] bg-[#111827]/80 border border-white/[0.08] shadow-xl backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Radar className="w-5 h-5 text-purple-400" />
                <span>Multi-dimensional Competency Radar</span>
              </h2>
              <span className="text-xs font-semibold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-md">
                5 Dimensions
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-6">Scored against FAANG L5/L6 senior engineering rubric guidelines</p>
          </div>

          <div className="w-full h-[300px] sm:h-[340px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={report.competencyScores}>
                <PolarGrid stroke="rgba(255, 255, 255, 0.1)" />
                <PolarAngleAxis dataKey="subject" stroke="#9ca3af" tick={{ fill: '#d1d5db', fontSize: 12, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(255, 255, 255, 0.1)" tick={false} />
                <Radar name="Score" dataKey="score" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.4} strokeWidth={2.5} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#111827', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff', fontWeight: 'bold', fontSize: '13px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={cardVariants} className="lg:col-span-6 p-6 sm:p-8 rounded-[28px] bg-[#111827]/80 border border-white/[0.08] shadow-xl backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <span>Question-by-Question Accuracy</span>
              </h2>
              <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md">
                {report.questionBreakdown.length} Questions
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-6">Individual response score accuracy based on expected key points</p>
          </div>

          <div className="w-full h-[300px] sm:h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={report.questionBreakdown} margin={{ top: 20, right: 20, left: -20, bottom: 20 }}>
                <XAxis dataKey="questionNumber" tickFormatter={(val) => `Q${val}`} stroke="#9ca3af" tick={{ fill: '#d1d5db', fontSize: 13, fontWeight: 600 }} />
                <YAxis domain={[0, 100]} stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <RechartsTooltip formatter={(value) => [`${value}%`, 'Score']} labelFormatter={(val) => `Question ${val}`} contentStyle={{ backgroundColor: '#111827', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff', fontWeight: 'bold', fontSize: '13px' }} />
                <Bar dataKey="userScore" radius={[12, 12, 0, 0]} animationDuration={1500}>
                  {report.questionBreakdown.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* 4. STAGGERED FEEDBACK CARDS (Strengths, Areas for Improvement, Recommended Topics) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Strengths */}
        <motion.div variants={cardVariants} className="p-6 rounded-[24px] bg-[#111827]/70 border border-green-500/20 shadow-xl backdrop-blur-xl space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.06]">
            <div className="p-2 rounded-xl bg-green-500/20 text-green-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Demonstrated Strengths</h3>
          </div>
          <ul className="space-y-3">
            {report.strengths.map((str, idx) => (
              <motion.li key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + idx * 0.15 }} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300 leading-relaxed">
                <span className="text-green-400 font-bold mt-0.5">•</span>
                <span>{str}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Areas for Improvement */}
        <motion.div variants={cardVariants} className="p-6 rounded-[24px] bg-[#111827]/70 border border-amber-500/20 shadow-xl backdrop-blur-xl space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.06]">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Areas for Improvement</h3>
          </div>
          <ul className="space-y-3">
            {report.weaknesses.map((weak, idx) => (
              <motion.li key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + idx * 0.15 }} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300 leading-relaxed">
                <span className="text-amber-400 font-bold mt-0.5">•</span>
                <span>{weak}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Recommended Topics */}
        <motion.div variants={cardVariants} className="p-6 rounded-[24px] bg-[#111827]/70 border border-blue-500/20 shadow-xl backdrop-blur-xl space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.06]">
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Recommended Topics</h3>
          </div>
          <ul className="space-y-3">
            {(report.recommendedTopics || report.actionableSuggestions).map((top, idx) => (
              <motion.li key={idx} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + idx * 0.15 }} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300 leading-relaxed">
                <span className="text-blue-400 font-bold mt-0.5">•</span>
                <span>{top}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* 5. QUESTION-WISE FEEDBACK TRANSCRIPT */}
      <div className="space-y-4 pt-4">
        <h2 className="text-xl font-bold text-white tracking-tight">Question-wise Feedback & Transcript</h2>
        <div className="space-y-4">
          {report.questionBreakdown.map((q) => (
            <div key={q.questionNumber} className="p-6 rounded-[24px] bg-[#111827]/60 border border-white/[0.08] backdrop-blur-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                  Question {q.questionNumber}
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
                  Score: {q.userScore} / 100
                </span>
              </div>
              <p className="text-sm sm:text-base font-semibold text-white">{q.questionText}</p>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] text-xs sm:text-sm text-gray-300">
                <span className="text-purple-400 font-bold block mb-1">AI Rubric Critique:</span>
                {q.aiFeedback}
              </div>
              
              {q.userAnswer && (
                <div className="pt-3 mt-3 border-t border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => { sound.playClick(); toggleAnswer(q.questionNumber); }}
                    className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors"
                  >
                    {q.isCodeAnswer ? <Code2 className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                    <span>{expandedAnswers[q.questionNumber] ? 'Hide Your Answer' : 'View Your Answer'}</span>
                  </button>
                  
                  <AnimatePresence>
                    {expandedAnswers[q.questionNumber] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mt-3"
                      >
                        {q.isCodeAnswer ? (
                          <div className="p-4 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-blue-200 overflow-x-auto whitespace-pre-wrap">
                            {q.userAnswer}
                          </div>
                        ) : (
                          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 leading-relaxed italic">
                            "{q.userAnswer}"
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

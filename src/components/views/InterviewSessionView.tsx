import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Editor } from '@monaco-editor/react';
import { 
  Sparkles, 
  Send, 
  Mic, 
  MicOff, 
  Clock, 
  HelpCircle, 
  Cpu, 
  RotateCcw, 
  Bot,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Award,
  BookOpen,
  Code2,
  AlignLeft,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { getQuestionsForRole, generateImmediateFeedback } from '../../data/mockData';
import { cardVariants, buttonVariants } from '../../utils/motion';
import { sound } from '../../utils/sound';
import type { InterviewRole, InterviewQuestion, QuestionFeedback } from '../../types';

interface InterviewSessionViewProps {
  role: InterviewRole;
  onCompleteSession: (role: InterviewRole) => void;
  onCancelSession: () => void;
}

export const InterviewSessionView: React.FC<InterviewSessionViewProps> = ({
  role,
  onCompleteSession,
  onCancelSession,
}) => {
  const questions: InterviewQuestion[] = getQuestionsForRole(role);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answerText, setAnswerText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [inputMode, setInputMode] = useState<'text' | 'code'>('text');
  const [codeLanguage, setCodeLanguage] = useState('javascript');
  const [timeLeft, setTimeLeft] = useState(questions[0]?.timeLimitSeconds || 180);
  
  // States: 'answering' | 'evaluating' | 'feedback'
  const [sessionState, setSessionState] = useState<'answering' | 'evaluating' | 'feedback'>('answering');
  const [currentFeedback, setCurrentFeedback] = useState<QuestionFeedback | null>(null);
  const [showModelAnswer, setShowModelAnswer] = useState(false);

  const currentQ = questions[currentQIndex] || questions[0];

  // Timer countdown
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (sessionState === 'answering' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && sessionState === 'answering') {
      sound.playError();
      handleSubmitAnswer();
    }
    return () => clearInterval(timer);
  }, [sessionState, timeLeft]);

  // Reset timer on question change
  useEffect(() => {
    setTimeLeft(currentQ?.timeLimitSeconds || 180);
    setAnswerText('');
    setSessionState('answering');
    setCurrentFeedback(null);
    setShowModelAnswer(false);
    setInputMode(currentQ?.isCodingQuestion ? 'code' : 'text');
  }, [currentQIndex, currentQ]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const toggleRecording = () => {
    sound.playClick();
    if (!isRecording) {
      setIsRecording(true);
      // Simulate real-time speech to text recognition
      setTimeout(() => {
        setAnswerText((prev) => 
          prev ? `${prev} Furthermore, our architecture incorporates stateless microservices scalable via Kubernetes horizontal pod autoscalers.` : 
          `To address this in a high-concurrency production environment for ${role}, I would implement an asynchronous message broker like Apache Kafka to decouple ingestion from database persistence, ensuring sub-millisecond tail latency and fault tolerance.`
        );
        setIsRecording(false);
        sound.playSuccess();
      }, 3500);
    } else {
      setIsRecording(false);
    }
  };

  const handleSimulateAnswer = () => {
    sound.playClick();
    setAnswerText(
      currentQ.modelAnswer || 
      `For ${role}, we architecture the solution around high availability and fault tolerance. By leveraging distributed caching with Redis cluster and asynchronous outbox event processing, we eliminate database lock contention while maintaining strict eventual consistency guarantees across microservices.`
    );
  };

  const handleSubmitAnswer = () => {
    if (!answerText.trim() && sessionState === 'answering') {
      alert("Please enter or record your answer before submitting!");
      return;
    }
    sound.playClick();
    setSessionState('evaluating');

    // Simulate 2.2s AI evaluation
    setTimeout(() => {
      const feedback = generateImmediateFeedback(currentQ, answerText);
      setCurrentFeedback(feedback);
      setSessionState('feedback');
      sound.playSuccess();
    }, 2200);
  };

  const handleNextQuestion = () => {
    sound.playClick();
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      onCompleteSession(role);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-24 relative z-10 space-y-8">
      {/* 1. TOP HEADER & TIMER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-[24px] bg-[#111827]/80 border border-white/[0.08] backdrop-blur-xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">{role}</span>
              <span className="text-gray-500">•</span>
              <span className="text-xs font-semibold text-gray-300">Question {currentQIndex + 1} of {questions.length}</span>
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
              {currentQ.category}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-4 self-end sm:self-center">
          {/* Timer badge */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold text-sm border ${
            timeLeft < 30 ? 'bg-red-500/20 text-red-300 border-red-500/40 animate-pulse' : 'bg-black/40 text-gray-200 border-white/10'
          }`}>
            <Clock className="w-4 h-4 text-blue-400" />
            <span>{formatTime(timeLeft)}</span>
          </div>

          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to cancel the session? Progress will be discarded.")) {
                sound.playClick();
                onCancelSession();
              }
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold border border-red-500/20 hover:border-red-500/40 transition-all shadow-sm focus:outline-none"
            title="Cancel Session"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Cancel Session</span>
          </button>
        </div>
      </div>

      {/* 2. QUESTION BOX & ROBOT AVATAR */}
      <motion.div
        key={currentQ.id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 sm:p-8 rounded-[28px] bg-gradient-to-br from-[#111827]/90 via-[#111827]/70 to-[#030712]/90 border border-white/[0.12] shadow-2xl backdrop-blur-2xl relative overflow-hidden space-y-6"
      >
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/15 rounded-full blur-[80px] pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10">
          {/* Animated AI Interviewer Avatar */}
          <div className="flex flex-col items-center shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-blue-500/30">
              <div className="w-full h-full bg-[#111827] rounded-[14px] flex items-center justify-center relative overflow-hidden">
                <Bot className="w-8 h-8 text-blue-400 animate-bounce" />
                <div className="absolute inset-0 bg-blue-500/10 animate-pulse" />
              </div>
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400 mt-2">AI Interviewer</span>
          </div>

          {/* Question text */}
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-blue-500/20 text-blue-300 text-xs font-bold">
                {currentQ.difficulty} Tier
              </span>
              <span className="text-xs text-gray-400">FAANG System Architecture Rubric</span>
            </div>
            <h1 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
              &quot;{currentQ.text}&quot;
            </h1>
            {currentQ.aiHint && (
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 shrink-0" />
                <span><strong className="font-bold">AI Probe Hint:</strong> {currentQ.aiHint}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* 3. CONDITIONAL RENDER: ANSWERING vs EVALUATING vs FEEDBACK */}
      <AnimatePresence mode="wait">
        {sessionState === 'answering' && (
          <motion.div
            key="answering"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Answer Input Area */}
            <div className="p-6 sm:p-8 rounded-[28px] bg-[#111827]/70 border border-white/[0.08] shadow-2xl backdrop-blur-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
                    <span>Your Answer</span>
                    {isRecording && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        Listening to microphone...
                      </span>
                    )}
                  </label>
                  
                  {/* Toggle Switch */}
                  <div className="flex items-center p-1 rounded-lg bg-black/40 border border-white/10">
                    <button
                      type="button"
                      onClick={() => { sound.playClick(); setInputMode('text'); }}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                        inputMode === 'text' 
                          ? 'bg-blue-500 text-white shadow-md' 
                          : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                      }`}
                    >
                      <AlignLeft className="w-3.5 h-3.5" />
                      Text / Voice
                    </button>
                    <button
                      type="button"
                      onClick={() => { sound.playClick(); setInputMode('code'); }}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                        inputMode === 'code' 
                          ? 'bg-blue-500 text-white shadow-md' 
                          : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                      } ${currentQ?.isCodingQuestion && inputMode !== 'code' ? 'animate-pulse ring-1 ring-blue-500/50' : ''}`}
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      Code Compiler
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {inputMode === 'code' && (
                    <select
                      value={codeLanguage}
                      onChange={(e) => { sound.playClick(); setCodeLanguage(e.target.value); }}
                      className="bg-black/40 border border-white/10 text-gray-300 text-xs font-bold rounded-lg px-2 sm:px-3 py-1.5 outline-none focus:border-blue-500 cursor-pointer"
                    >
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python</option>
                      <option value="java">Java</option>
                      <option value="cpp">C++</option>
                      <option value="go">Go</option>
                      <option value="rust">Rust</option>
                    </select>
                  )}
                  <button
                    type="button"
                    onClick={handleSimulateAnswer}
                    className="text-xs font-bold text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors hidden sm:block"
                  >
                    ⚡ Simulate High-Scoring Answer
                  </button>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-inner">
                {inputMode === 'text' ? (
                  <>
                    <textarea
                      value={answerText}
                      onChange={(e) => setAnswerText(e.target.value)}
                      placeholder="Type your response or use the microphone button below to record your voice answer in real-time..."
                      rows={7}
                      className="w-full p-4 sm:p-5 bg-black/50 text-white placeholder-gray-500 focus:outline-none focus:bg-black/70 transition-all text-sm font-normal leading-relaxed custom-scrollbar resize-none"
                    />
                    {/* Microphone trigger inside box */}
                    <button
                      type="button"
                      onClick={toggleRecording}
                      className={`absolute bottom-4 right-4 p-3 rounded-xl transition-all shadow-lg flex items-center gap-2 text-xs font-bold ${
                        isRecording 
                          ? 'bg-red-500 text-white animate-pulse shadow-red-500/30' 
                          : 'bg-white/[0.08] hover:bg-white/[0.15] text-gray-200 border border-white/10'
                      }`}
                      title={isRecording ? 'Stop Recording' : 'Record Voice Answer'}
                    >
                      {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-blue-400" />}
                      <span className="hidden sm:inline">{isRecording ? 'Stop Mic' : 'Voice Input'}</span>
                    </button>
                  </>
                ) : (
                  <div className="h-[350px] w-full bg-[#1e1e1e] p-1">
                    <Editor
                      height="100%"
                      language={codeLanguage}
                      theme="vs-dark"
                      value={answerText}
                      onChange={(val) => setAnswerText(val || '')}
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                        scrollBeyondLastLine: false,
                        smoothScrolling: true,
                        cursorBlinking: "smooth",
                        wordWrap: "on",
                        padding: { top: 16 }
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Action bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="text-xs text-gray-400">
                  Expected rubric points: <strong className="text-gray-200">{currentQ.expectedKeyPoints.join(' • ')}</strong>
                </div>

                <motion.button
                  type="button"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleSubmitAnswer}
                  disabled={!answerText.trim()}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center justify-center gap-2"
                >
                  <span>Submit for AI Evaluation</span>
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {sessionState === 'evaluating' && (
          <motion.div
            key="evaluating"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="p-12 sm:p-16 rounded-[28px] bg-[#111827]/90 border border-purple-500/30 shadow-2xl backdrop-blur-2xl text-center space-y-6 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 via-blue-600/10 to-transparent animate-pulseGlow pointer-events-none" />

            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-purple-500/40"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-2 rounded-full border-2 border-blue-500/30"
              />
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/40">
                <Sparkles className="w-7 h-7 text-white animate-spin" />
              </div>
            </div>

            <div className="space-y-2 relative z-10">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                AI Evaluating Your Answer...
              </h3>
              <p className="text-sm text-gray-300 max-w-md mx-auto">
                Comparing speech vocabulary, system architecture depth, and L5/L6 rubric key points against FAANG standards.
              </p>
            </div>
          </motion.div>
        )}

        {sessionState === 'feedback' && currentFeedback && (
          <motion.div
            key="feedback"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="p-6 sm:p-8 rounded-[28px] bg-gradient-to-br from-[#111827]/95 via-[#111827]/80 to-[#030712]/95 border border-blue-500/30 shadow-2xl backdrop-blur-2xl space-y-6 relative overflow-hidden"
          >
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-green-500/15 rounded-full blur-[90px] pointer-events-none" />

            {/* Feedback Header: Score Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08] relative z-10">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg border ${
                  currentFeedback.score >= 90 ? 'bg-green-500/20 text-green-300 border-green-500/40 shadow-lg shadow-green-500/20' :
                  currentFeedback.score >= 80 ? 'bg-blue-500/20 text-blue-300 border-blue-500/40 shadow-lg shadow-blue-500/20' :
                  'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-lg shadow-amber-500/20'
                }`}>
                  {currentFeedback.score}%
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-extrabold text-white">
                      {currentFeedback.score >= 90 ? 'Exemplary FAANG Pass' : currentFeedback.score >= 80 ? 'Strong Proficient Answer' : 'Solid Attempt'}
                    </span>
                    <Award className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-xs text-gray-400">Immediate Question Evaluation Report</span>
                </div>
              </div>

              <div className="text-xs font-bold text-gray-400 bg-white/[0.05] px-3.5 py-1.5 rounded-xl border border-white/[0.08]">
                Matched {currentFeedback.keyPointsMatched.length} of {currentQ.expectedKeyPoints.length} rubric metrics
              </div>
            </div>

            {/* AI Feedback Text */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] relative z-10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-300">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>AI Rubric Critique</span>
              </div>
              <p className="text-sm sm:text-base text-gray-200 font-normal leading-relaxed">
                &quot;{currentFeedback.feedback}&quot;
              </p>
            </div>

            {/* Strengths vs Growth area */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20 space-y-2">
                <span className="text-xs font-bold text-green-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Demonstrated Strengths</span>
                </span>
                <ul className="space-y-1.5 text-xs text-gray-200 font-medium">
                  {currentFeedback.strengths.map((str, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Growth Opportunity</span>
                </span>
                <p className="text-xs text-gray-200 font-medium leading-relaxed">
                  {currentFeedback.improvement}
                </p>
              </div>
            </div>

            {/* Expandable Model Answer */}
            <div className="pt-2 relative z-10">
              <button
                type="button"
                onClick={() => setShowModelAnswer(!showModelAnswer)}
                className="w-full py-3 px-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-bold text-blue-300 flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  <span>View L6 FAANG Model Answer & Key Points</span>
                </span>
                {showModelAnswer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              <AnimatePresence>
                {showModelAnswer && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 mt-2 rounded-2xl bg-black/40 border border-blue-500/20 text-xs sm:text-sm text-gray-300 space-y-3 leading-relaxed">
                      <p className="font-medium text-white">
                        {currentQ.modelAnswer || 'We architect the solution using decoupled stateless microservices with Redis cluster caching and asynchronous Kafka outbox event processing to eliminate lock contention.'}
                      </p>
                      <div className="pt-2 border-t border-white/[0.08]">
                        <span className="text-[11px] font-extrabold uppercase tracking-widest text-blue-400 block mb-1">
                          Mandatory Rubric Checklist:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {currentQ.expectedKeyPoints.map((kp, idx) => (
                            <span key={idx} className="px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-200 text-xs font-semibold border border-blue-500/30">
                              ✓ {kp}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Next Question CTA */}
            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-end">
              <motion.button
                type="button"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleNextQuestion}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2"
              >
                <span>{currentQIndex < questions.length - 1 ? 'Continue to Next Question' : 'Finish & Generate Report'}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

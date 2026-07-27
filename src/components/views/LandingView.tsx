import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Play, 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  Cpu, 
  Terminal, 
  ShieldCheck, 
  TrendingUp, 
  Clock, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  HelpCircle, 
  Code2, 
  Layout,
  Layers,
  Zap,
  Lock,
  Globe,
  Mail
} from 'lucide-react';
import { buttonVariants, cardVariants } from '../../utils/motion';
import { sound } from '../../utils/sound';

interface LandingViewProps {
  onNavigateAuth: (isSignUp: boolean) => void;
}

// Helper for animated counter
const CounterDisplay: React.FC<{ target: number; suffix?: string; prefix?: string }> = ({ target, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (target - start) * ease);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [target]);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
};

export const LandingView: React.FC<LandingViewProps> = ({ onNavigateAuth }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'session' | 'feedback' | 'report'>('dashboard');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 4);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const testimonials = [
    {
      name: 'Sarah Jenkins',
      role: 'Senior Frontend Engineer @ Google',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      review: 'The AI feedback helped me improve my interview skills dramatically. The L6 scorecard benchmarking gave me exact clarity on what I was missing. I felt much more confident during my real technical loops and landed my offer!'
    },
    {
      name: 'Michael Chen',
      role: 'Backend Architect @ Meta',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      review: 'Incredible system architecture simulations. The way the AI probes on distributed caching and concurrency trade-offs is indistinguishable from a real Staff Engineer interviewer at Facebook.'
    },
    {
      name: 'Elena Rostova',
      role: 'Machine Learning Engineer @ Netflix',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      review: 'I practiced 15 sessions before my onsite interviews. The real-time speech cadence analysis and instant technical critiques saved me dozens of hours of traditional mock prep.'
    },
    {
      name: 'David Kim',
      role: 'DevOps Specialist @ Amazon',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      review: 'The STAR behavioral formatting evaluation and live Kubernetes troubleshooting scenarios are 10/10. Easily the best investment for software engineers aiming for top tier tech firms.'
    }
  ];

  const faqs = [
    {
      q: 'How does the AI evaluate technical answers?',
      a: 'Our AI engine uses customized large language models benchmarked directly against FAANG (Google, Meta, Amazon) L4-L7 engineering hiring scorecards. It evaluates technical accuracy, architectural trade-offs, terminology depth, structure, and communication pace in real-time.'
    },
    {
      q: 'Can I practice unlimited interviews?',
      a: 'Yes! Once you create an account, you can configure and simulate unlimited technical, behavioral, system design, and algorithmic coding interviews across any job role or experience tier.'
    },
    {
      q: 'Which job roles and domains are supported?',
      a: 'We support specialized question banks and live evaluation for Java Backend, Python Backend, Frontend (React/Next.js), Full Stack, DevOps & Cloud, Android, Flutter, Machine Learning, and System Architecture.'
    },
    {
      q: 'Is my interview history and audio transcript saved?',
      a: 'Yes, your entire telemetry history, score trajectories, topic mastery breakdowns, and per-question AI critique reports are securely persisted in your dashboard for longitudinal review.'
    },
    {
      q: 'Can I download or share my evaluation reports?',
      a: 'Absolutely. After every completed session, you generate a full executive evaluation report that can be exported as PDF, shared with mentors, or used to benchmark your readiness before real loops.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-gray-100 font-sans selection:bg-blue-500/30 selection:text-blue-200 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-gradient-to-br from-blue-600/15 via-indigo-600/10 to-transparent rounded-full blur-[140px] pointer-events-none animate-pulseGlow" />
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-gradient-to-tl from-purple-600/15 via-pink-600/10 to-transparent rounded-full blur-[160px] pointer-events-none animate-pulseGlow" />

      {/* 1. PREMIUM FLOATING NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 pt-4 transition-all duration-300">
        <motion.div
          animate={{
            height: isScrolled ? '64px' : '76px',
            scale: isScrolled ? 0.99 : 1,
          }}
          className={`max-w-7xl mx-auto flex items-center justify-between px-6 rounded-[22px] transition-all duration-300 ${
            isScrolled
              ? 'bg-[#111827]/85 backdrop-blur-2xl border border-white/[0.14] shadow-2xl shadow-blue-500/10'
              : 'bg-[#111827]/40 backdrop-blur-md border border-white/[0.08]'
          }`}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Sparkles className="w-4.5 h-4.5 text-white animate-pulse" />
            </div>
            <span className="font-black text-white text-lg tracking-tight">AI Interview</span>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold text-gray-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#preview" className="hover:text-white transition-colors">Preview</a>
            <a href="#reviews" className="hover:text-white transition-colors">Reviews</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          {/* Right Authentication CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                onNavigateAuth(false);
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold text-gray-300 hover:text-white hover:bg-white/[0.06] transition-all"
            >
              Login
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onNavigateAuth(true);
              }}
              className="hidden sm:inline-flex px-4 py-2 rounded-xl text-xs font-bold text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] transition-all"
            >
              Sign Up
            </button>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => {
                sound.playClick();
                onNavigateAuth(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white font-extrabold text-xs shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 border border-white/20 flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </motion.div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-36 sm:pt-44 pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-extrabold uppercase tracking-wider shadow-inner">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Next-Gen SaaS • L5 / L6 FAANG Scorecards</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08]">
              Ace Your Technical <br className="hidden sm:inline" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
                Interviews with AI
              </span>
            </h1>

            <p className="text-base sm:text-xl text-gray-300 font-normal max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Practice realistic technical interviews, receive instant AI-powered feedback, improve your architectural confidence, and land your dream engineering job.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => {
                  sound.playSuccess();
                  onNavigateAuth(true);
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white font-extrabold text-base shadow-2xl shadow-blue-500/35 hover:shadow-blue-500/50 border border-white/20 flex items-center justify-center gap-3 group"
              >
                <span>Start Free Practice</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <button
                onClick={() => {
                  sound.playClick();
                  document.getElementById('preview')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-white font-bold text-base transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-white text-white" />
                <span>Watch Interactive Demo</span>
              </button>
            </div>

            <div className="pt-6 flex items-center justify-center lg:justify-start gap-6 text-xs font-semibold text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>Instant L6 scorecards</span>
              </div>
            </div>
          </motion.div>

          {/* Right Illustration Column with Floating Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            <div className="relative w-full aspect-square max-w-lg flex items-center justify-center">
              {/* Rotating orbital rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-4 rounded-full border border-dashed border-blue-500/30"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-16 rounded-full border border-purple-500/20"
              />

              {/* Core Glowing Sphere */}
              <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 shadow-2xl shadow-blue-500/60 flex flex-col items-center justify-center relative group">
                <Cpu className="w-20 h-20 text-white drop-shadow-lg transform group-hover:scale-110 transition-transform duration-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/90 mt-2">AI Core Studio</span>
              </div>

              {/* Floating Parallax Card 1: Score */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-6 p-4 rounded-2xl bg-[#111827]/95 border border-white/[0.14] shadow-2xl backdrop-blur-xl flex items-center gap-3 w-56"
              >
                <div className="w-10 h-10 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center font-black text-sm border border-green-500/40">
                  94%
                </div>
                <div>
                  <span className="text-xs font-extrabold text-white block">System Architecture</span>
                  <span className="text-[10px] text-green-400 font-semibold">Exemplary L6 Pass</span>
                </div>
              </motion.div>

              {/* Floating Parallax Card 2: Feedback */}
              <motion.div
                animate={{ y: [8, -8, 8] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-6 -right-6 p-4 rounded-2xl bg-[#111827]/95 border border-white/[0.14] shadow-2xl backdrop-blur-xl space-y-2 w-64"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-blue-400" />
                    <span>Real-time Audio Eval</span>
                  </span>
                  <span className="text-[10px] text-blue-400 font-mono">60 FPS</span>
                </div>
                <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden">
                  <div className="w-4/5 h-full bg-gradient-to-r from-blue-500 to-green-400 rounded-full" />
                </div>
                <p className="text-[10px] text-gray-400 line-clamp-1">
                  &quot;Flawless STAR formatting with quantifiable latency SLA trade-offs.&quot;
                </p>
              </motion.div>

              {/* Floating Parallax Card 3: Security */}
              <motion.div
                animate={{ x: [-6, 6, -6] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute top-1/2 -left-12 px-3 py-2 rounded-xl bg-black/80 border border-purple-500/30 backdrop-blur-md flex items-center gap-2 shadow-xl"
              >
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-bold text-gray-200">FAANG L5/L6 Ready</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. TRUSTED BY SECTION */}
      <section className="py-12 border-y border-white/[0.06] bg-black/40 relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
          <p className="text-xs font-extrabold uppercase tracking-widest text-gray-500">
            Engineers using our AI platform have prepared for and landed offers at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 opacity-70">
            {['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Adobe'].map((company) => (
              <span
                key={company}
                className="text-xl sm:text-2xl font-black tracking-tighter text-gray-400 hover:text-white hover:scale-110 transition-all cursor-pointer drop-shadow-md"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE OUR PLATFORM (6 Feature Grid) */}
      <section id="features" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            <span>Why Choose Our Platform</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Designed to Make You Unstoppable in Technical Loops
          </h2>
          <p className="text-base sm:text-lg text-gray-400 font-normal">
            Every feature is built to simulate real-world stress, architectural scrutiny, and communication benchmarking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'AI-Powered Interviews',
              desc: 'Practice with intelligent, dynamic interview probe questions tailored specifically to your target job role and tier.',
              icon: <Cpu className="w-6 h-6 text-blue-400" />,
              gradient: 'from-blue-500/20 via-indigo-500/10 to-transparent',
              border: 'border-blue-500/30'
            },
            {
              title: 'Instant Feedback',
              desc: 'Receive detailed L5/L6 scorecards, matched rubric checklists, and speech cadence critiques after every answer.',
              icon: <Award className="w-6 h-6 text-purple-400" />,
              gradient: 'from-purple-500/20 via-pink-500/10 to-transparent',
              border: 'border-purple-500/30'
            },
            {
              title: 'Real Interview Experience',
              desc: 'Experience realistic voice architecture, live countdown timers, and algorithmic LeetCode medium/hard simulations.',
              icon: <Terminal className="w-6 h-6 text-green-400" />,
              gradient: 'from-green-500/20 via-emerald-500/10 to-transparent',
              border: 'border-green-500/30'
            },
            {
              title: 'Performance Analytics',
              desc: 'Track your longitudinal progress with detailed Recharts telemetry, rolling moving averages, and topic mastery bars.',
              icon: <TrendingUp className="w-6 h-6 text-amber-400" />,
              gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
              border: 'border-amber-500/30'
            },
            {
              title: 'Personalized Learning',
              desc: 'Get automated AI recommendations on specific backend or frontend domains to study before your next onsite loop.',
              icon: <Layers className="w-6 h-6 text-cyan-400" />,
              gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
              border: 'border-cyan-500/30'
            },
            {
              title: 'Unlimited Practice',
              desc: 'Take simulated interviews anytime, anywhere, with zero scheduling friction or awkward human mock constraints.',
              icon: <Clock className="w-6 h-6 text-indigo-400" />,
              gradient: 'from-indigo-500/20 via-purple-500/10 to-transparent',
              border: 'border-indigo-500/30'
            }
          ].map((feat) => (
            <motion.div
              key={feat.title}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`p-8 rounded-[30px] bg-[#111827]/70 border ${feat.border} shadow-2xl backdrop-blur-xl relative overflow-hidden group flex flex-col justify-between transition-all`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feat.gradient} opacity-20 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10 space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/[0.12] flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  {feat.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{feat.title}</h3>
                  <p className="text-sm text-gray-400 mt-2 font-normal leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. HOW IT WORKS (6-Step Visual Timeline) */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-16 border-t border-white/[0.06]">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>How It Works</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Your Streamlined Path to Interview Mastery
          </h2>
          <p className="text-base sm:text-lg text-gray-400 font-normal">
            A systematic, 6-step workflow designed to transform interview anxiety into effortless engineering confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative">
          {/* Connecting Line background on large screens */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/40 to-green-500/20 -translate-y-6 z-0" />

          {[
            { step: '01', title: 'Create Account', desc: 'Sign up in seconds with email, Google, or GitHub.' },
            { step: '02', title: 'Choose Role', desc: 'Select Java, Python, Frontend, or System Design.' },
            { step: '03', title: 'Set Tier & Level', desc: 'Pick Fresher up to L6 Staff/Principal tier.' },
            { step: '04', title: 'Answer AI Qs', desc: 'Speak or type solutions to dynamic probe questions.' },
            { step: '05', title: 'Instant Feedback', desc: 'Receive immediate L6 rubric scorecards and hints.' },
            { step: '06', title: 'Review Report', desc: 'Analyze longitudinal mastery charts and export report.' }
          ].map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-[24px] bg-[#111827]/80 border border-white/[0.08] backdrop-blur-xl relative z-10 flex flex-col justify-between space-y-4 hover:border-white/20 transition-all group shadow-xl"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-600 text-white font-black text-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                {item.step}
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">{item.title}</h3>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. PLATFORM PREVIEW MOCKUPS */}
      <section id="preview" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-green-400 text-xs font-bold uppercase tracking-wider">
            <Layout className="w-4 h-4" />
            <span>Interactive Platform Preview</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Experience the Interface Before You Sign In
          </h2>
          <p className="text-base sm:text-lg text-gray-400 font-normal">
            Toggle between our core studio views: Dashboard telemetry, active AI interview rooms, instant scorecards, and final executive reports.
          </p>

          {/* Tab buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: 'dashboard', label: 'Dashboard Telemetry' },
              { id: 'session', label: 'Active Interview Room' },
              { id: 'feedback', label: 'Instant AI Scorecard' },
              { id: 'report', label: 'Final Executive Report' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playClick();
                  setActiveTab(tab.id as any);
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25 border border-white/20 scale-105'
                    : 'bg-white/[0.05] text-gray-400 hover:text-white border border-white/[0.08]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Floating Device Frame Mockup */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="p-4 sm:p-8 rounded-[36px] bg-gradient-to-br from-blue-500/20 via-[#111827]/80 to-purple-500/20 border border-white/[0.16] shadow-2xl backdrop-blur-2xl overflow-hidden"
        >
          <div className="w-full rounded-[24px] bg-[#030712] border border-white/[0.1] overflow-hidden shadow-inner p-6 sm:p-10 min-h-[420px] flex flex-col justify-center text-left space-y-6">
            {activeTab === 'dashboard' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-xs font-mono text-gray-400 ml-2">studio.nexusai.dev/dashboard</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">L6 Staff Engineer Rubric</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                    <span className="text-xs text-gray-400 font-bold uppercase">Completed Interviews</span>
                    <span className="text-3xl font-black text-white block mt-1">24</span>
                    <span className="text-xs text-green-400 font-semibold mt-1 block">85.7% finish rate</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                    <span className="text-xs text-gray-400 font-bold uppercase">Average Score</span>
                    <span className="text-3xl font-black text-purple-400 block mt-1">88%</span>
                    <span className="text-xs text-green-400 font-semibold mt-1 block">+5% vs last month</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                    <span className="text-xs text-gray-400 font-bold uppercase">Peak Mastery</span>
                    <span className="text-3xl font-black text-blue-400 block mt-1">98%</span>
                    <span className="text-xs text-gray-400 font-semibold mt-1 block">System Architecture</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">JB</div>
                    <div>
                      <span className="text-sm font-bold text-white block">Java Backend • System Architecture</span>
                      <span className="text-xs text-gray-400 block">Senior Tier • 45 Minutes • Hard Difficulty</span>
                    </div>
                  </div>
                  <span className="px-3 py-1.5 rounded-xl bg-green-500/15 text-green-400 font-bold text-xs">Completed 94%</span>
                </div>
              </div>
            )}

            {activeTab === 'session' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">Q2</div>
                    <div>
                      <span className="text-xs font-bold text-blue-400 uppercase">Distributed Systems • Hard</span>
                      <h4 className="text-base font-extrabold text-white">&quot;How do you design a distributed transaction across microservices using the SAGA pattern?&quot;</h4>
                    </div>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-red-500/20 text-red-300 font-mono font-bold text-sm border border-red-500/40 animate-pulse">
                    ⏱ 02:45
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-black/60 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Microphone Active • 60 FPS Speech Cadence</span>
                    <span className="text-green-400 font-bold">Listening...</span>
                  </div>
                  <p className="text-sm text-gray-200 leading-relaxed font-mono bg-white/[0.03] p-4 rounded-xl border border-white/[0.05]">
                    &quot;We implement the Orchestration SAGA pattern using a central state machine. Each service performs local transactions and publishes domain events. If a step fails, the orchestrator triggers compensating transactions...&quot;
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'feedback' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="p-6 rounded-2xl bg-gradient-to-r from-green-900/40 to-blue-900/40 border border-green-500/40 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-green-500/20 text-green-300 font-black text-2xl flex items-center justify-center border border-green-500/40 shadow-lg">
                      94%
                    </div>
                    <div>
                      <span className="text-lg font-black text-white block">Exemplary FAANG Pass</span>
                      <span className="text-xs text-gray-300">Immediate Question Evaluation Report • L6 Staff Tier</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs font-bold">Matched 4/4 Rubric Points</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                    <span className="text-xs font-bold text-green-400 uppercase block mb-1">✓ Demonstrated Strengths</span>
                    <p className="text-xs text-gray-300 leading-relaxed">Accurately identified Choreography vs Orchestration trade-offs and outbox pattern atomic delivery.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                    <span className="text-xs font-bold text-blue-400 uppercase block mb-1">⚡ L6 Model Answer Checklist</span>
                    <p className="text-xs text-gray-300 leading-relaxed">✓ Outbox Pattern • ✓ Idempotency • ✓ Compensating Transactions • ✓ Sub-millisecond Tail Latency</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'report' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <h3 className="text-xl font-black text-white">Frontend Architect • Executive Evaluation</h3>
                    <span className="text-xs text-gray-400">Overall Benchmark Score: 92/100 (Top 5% of active users today)</span>
                  </div>
                  <button className="px-4 py-2 rounded-xl bg-blue-500 text-white font-bold text-xs shadow-lg">Export PDF Report</button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                    <span className="text-2xl font-black text-blue-400 block">94%</span>
                    <span className="text-[10px] text-gray-400 uppercase font-bold">Technical Accuracy</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                    <span className="text-2xl font-black text-green-400 block">95%</span>
                    <span className="text-[10px] text-gray-400 uppercase font-bold">System Structure</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                    <span className="text-2xl font-black text-purple-400 block">91%</span>
                    <span className="text-[10px] text-gray-400 uppercase font-bold">Communication Pace</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                    <span className="text-2xl font-black text-amber-400 block">90%</span>
                    <span className="text-[10px] text-gray-400 uppercase font-bold">Problem Solving</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* 7. SAMPLE AI FEEDBACK GLASS CARD */}
      <section className="py-24 px-4 sm:px-6 max-w-5xl mx-auto space-y-12 border-t border-white/[0.06]">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Sample AI Rubric Evaluation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Granular Feedback Built for Senior Engineers
          </h2>
        </div>

        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.01 }}
          className="p-8 sm:p-10 rounded-[32px] bg-gradient-to-br from-[#111827]/90 via-[#111827]/70 to-[#030712]/90 border border-blue-500/40 shadow-2xl backdrop-blur-2xl space-y-8 relative overflow-hidden"
        >
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-blue-500/15 rounded-full blur-[90px] pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/[0.08] relative z-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Simulated Question • Java Backend</span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">&quot;Explain the JVM Memory Model and Garbage Collection.&quot;</h3>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-300 font-black text-2xl flex items-center justify-center border border-blue-500/40 shadow-lg">
                8.5 <span className="text-xs font-normal ml-0.5">/10</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
            <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/25 space-y-3">
              <span className="text-xs font-bold text-green-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Demonstrated Strengths</span>
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-200 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span>Good clear explanation of Young vs Old generation heap partitioning.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span>Correct terminology regarding stop-the-world evacuation pauses.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                <span>Areas to Improve</span>
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-200 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">•</span>
                  <span>Mention specific JVM internal architecture (Metaspace, Thread stacks).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">•</span>
                  <span>Explain JIT bytecode compilation and ZGC colored pointer load barriers.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-blue-500/15 border border-blue-500/30 text-xs sm:text-sm text-blue-200 font-semibold flex items-center gap-3 relative z-10">
            <Sparkles className="w-5 h-5 text-blue-400 shrink-0" />
            <span><strong className="text-white font-bold">AI Actionable Recommendation:</strong> Review JVM Memory Model and ZGC concurrent marking before your next technical loop.</span>
          </div>
        </motion.div>
      </section>

      {/* 8. TESTIMONIALS CAROUSEL */}
      <section id="reviews" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-16 border-t border-white/[0.06]">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>Verified User Testimonials</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Loved by Engineers at Top Tech Firms
            </h2>
          </div>

          {/* Manual Carousel Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
              }}
              className="p-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/[0.08] transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
              }}
              className="p-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/[0.08] transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Card */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="p-8 sm:p-12 rounded-[36px] bg-[#111827]/80 border border-white/[0.12] shadow-2xl backdrop-blur-2xl flex flex-col md:flex-row items-center gap-8 justify-between"
            >
              <div className="space-y-6 max-w-3xl">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-lg sm:text-2xl font-medium text-gray-200 leading-relaxed italic">
                  &quot;{testimonials[currentTestimonial].review}&quot;
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-blue-500/40 shadow-lg"
                  />
                  <div>
                    <h4 className="text-lg font-bold text-white">{testimonials[currentTestimonial].name}</h4>
                    <span className="text-xs font-semibold text-blue-400">{testimonials[currentTestimonial].role}</span>
                  </div>
                </div>
              </div>

              {/* Indicator dots */}
              <div className="flex md:flex-col gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      sound.playClick();
                      setCurrentTestimonial(i);
                    }}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentTestimonial === i ? 'bg-blue-500 scale-125 shadow-glow-blue' : 'bg-white/[0.2] hover:bg-white/[0.4]'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 9. STATISTICS SECTION */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/[0.06]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="p-6 rounded-[28px] bg-[#111827]/50 border border-white/[0.06]">
            <span className="text-3xl sm:text-5xl font-black text-white tracking-tight block">
              <CounterDisplay target={50000} suffix="+" />
            </span>
            <span className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wider mt-2 block">Interviews Conducted</span>
          </div>
          <div className="p-6 rounded-[28px] bg-[#111827]/50 border border-white/[0.06]">
            <span className="text-3xl sm:text-5xl font-black text-blue-400 tracking-tight block">
              <CounterDisplay target={10000} suffix="+" />
            </span>
            <span className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wider mt-2 block">Active Engineers</span>
          </div>
          <div className="p-6 rounded-[28px] bg-[#111827]/50 border border-white/[0.06]">
            <span className="text-3xl sm:text-5xl font-black text-green-400 tracking-tight block">
              <CounterDisplay target={95} suffix="%" />
            </span>
            <span className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wider mt-2 block">User Satisfaction</span>
          </div>
          <div className="p-6 rounded-[28px] bg-[#111827]/50 border border-white/[0.06]">
            <span className="text-3xl sm:text-5xl font-black text-purple-400 tracking-tight block">
              4.9★
            </span>
            <span className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wider mt-2 block">Average Platform Rating</span>
          </div>
        </div>
      </section>

      {/* 10. FAQ ACCORDION SECTION */}
      <section id="faq" className="py-24 px-4 sm:px-6 max-w-4xl mx-auto space-y-12 border-t border-white/[0.06]">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Everything You Need to Know
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl bg-[#111827]/70 border border-white/[0.08] overflow-hidden transition-all"
              >
                <button
                  onClick={() => {
                    sound.playClick();
                    setOpenFaq(isOpen ? null : idx);
                  }}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 text-base sm:text-lg font-bold text-white hover:text-blue-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <div className={`p-2 rounded-xl bg-white/[0.05] transition-transform ${isOpen ? 'rotate-180 bg-blue-500/20 text-blue-400' : 'text-gray-400'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="p-6 pt-0 text-sm sm:text-base text-gray-400 leading-relaxed font-normal border-t border-white/[0.04]">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 11. CALL TO ACTION BANNER */}
      <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="p-12 sm:p-20 rounded-[40px] bg-gradient-to-r from-blue-900/60 via-[#111827]/90 to-purple-900/60 border border-white/[0.16] shadow-2xl backdrop-blur-2xl text-center space-y-8 relative overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none animate-pulseGlow" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none animate-pulseGlow" />

          <div className="space-y-4 relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Start Your Interview Journey Today
            </h2>
            <p className="text-base sm:text-xl text-gray-300 font-normal">
              Join thousands of learners and senior engineers improving their interview skills and landing FAANG offers with AI.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 pt-4">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => {
                sound.playSuccess();
                onNavigateAuth(true);
              }}
              className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white font-black text-base shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 border border-white/20 flex items-center justify-center gap-3 group"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <button
              onClick={() => {
                sound.playClick();
                onNavigateAuth(false);
              }}
              className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.14] text-white font-bold text-base transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Login to Account</span>
            </button>
          </div>
        </div>
      </section>

      {/* 12. FOOTER */}
      <footer className="py-16 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/[0.08] text-xs text-gray-500 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-black text-white text-base">AI Interview Studio</span>
            </div>
            <p className="text-gray-400 max-w-sm leading-relaxed">
              World-class FAANG technical interview simulation platform. Built with Apple, Linear, and Vercel design aesthetics.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Platform</h4>
            <ul className="space-y-2 font-medium">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#preview" className="hover:text-white transition-colors">Live Preview</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Testimonials</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Legal & Privacy</h4>
            <ul className="space-y-2 font-medium">
              <li><span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Security & Compliance</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Cookie Preferences</span></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Contact & Social</h4>
            <ul className="space-y-2 font-medium">
              <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-blue-400" /> <span className="hover:text-white cursor-pointer">support@nexusai.dev</span></li>
              <li className="flex items-center gap-2"><Globe className="w-3.5 h-3.5 text-purple-400" /> <span className="hover:text-white cursor-pointer">Twitter / X</span></li>
              <li className="flex items-center gap-2"><Code2 className="w-3.5 h-3.5 text-green-400" /> <span className="hover:text-white cursor-pointer">GitHub Community</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Nexus AI Studio Inc. All rights reserved. L5/L6 FAANG benchmarked.</p>
          <div className="flex items-center gap-6 font-semibold text-gray-400">
            <span onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="cursor-pointer hover:text-white transition-colors">Back to Top ↑</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Mail, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Cpu, 
  Terminal, 
  Eye, 
  EyeOff,
  Loader2
} from 'lucide-react';
import { sound } from '../../utils/sound';
import { buttonVariants } from '../../utils/motion';
import type { User } from '../../types';
import { mockUser } from '../../data/mockData';

interface LoginViewProps {
  onLoginSuccess: (user: User) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('akhil@nexusai.dev');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('Akhil');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  // Auth state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    setErrorMsg(null);

    // Basic Validation
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid work or personal email address.');
      sound.playError();
      return;
    }
    if (!password || password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      sound.playError();
      return;
    }
    if (isSignUp && !name.trim()) {
      setErrorMsg('Please enter your full name.');
      sound.playError();
      return;
    }

    // Start loading animation
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      sound.playSuccess();

      setTimeout(() => {
        const userToReturn: User = {
          ...mockUser,
          name: isSignUp ? name : mockUser.name,
          email: email
        };
        onLoginSuccess(userToReturn);
      }, 800);
    }, 1500);
  };

  const handleSocialAuth = (provider: string) => {
    sound.playClick();
    setIsLoading(true);
    setErrorMsg(null);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      sound.playSuccess();
      setTimeout(() => {
        onLoginSuccess({
          ...mockUser,
          name: `${provider} Engineer`
        });
      }, 700);
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full bg-[#030712] text-gray-100 flex items-center justify-center relative overflow-hidden p-4 sm:p-6 lg:p-8 selection:bg-blue-500/30 selection:text-blue-200 z-10">
      {/* Background ambient lighting */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-blue-600/20 via-indigo-600/10 to-transparent rounded-full blur-[120px] pointer-events-none animate-pulseGlow" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-gradient-to-tl from-purple-600/20 via-blue-600/10 to-transparent rounded-full blur-[140px] pointer-events-none animate-pulseGlow" />

      {/* Main 2-Column Container */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 rounded-[32px] bg-[#111827]/70 border border-white/[0.1] shadow-2xl backdrop-blur-2xl overflow-hidden relative z-20"
      >
        {/* Left Column: AI Illustration & Branding (Hidden on small screens) */}
        <div className="hidden lg:col-span-6 p-12 bg-gradient-to-br from-blue-900/40 via-[#111827]/80 to-purple-900/40 border-r border-white/[0.08] relative overflow-hidden flex flex-col justify-between">
          {/* Decorative grid pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

          {/* Top branding */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 border border-white/20">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white block">AI Interview</span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400">FAANG-Grade Rubric</span>
            </div>
          </div>

          {/* Center Visualizer Illustration */}
          <div className="relative z-10 my-12 flex flex-col items-center justify-center text-center">
            <div className="relative w-64 h-64 flex items-center justify-center mb-8">
              {/* Outer rotating rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed border-blue-500/30"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-4 rounded-full border border-purple-500/20"
              />

              {/* Glowing core sphere */}
              <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 shadow-2xl shadow-blue-500/50 flex items-center justify-center relative group">
                <Cpu className="w-16 h-16 text-white drop-shadow-md transform group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 rounded-full bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Floating feature badges */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-2 left-0 px-3 py-1.5 rounded-xl bg-black/60 border border-blue-500/30 backdrop-blur-md flex items-center gap-2 shadow-lg"
              >
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-xs font-bold text-gray-200">Real-time Eval</span>
              </motion.div>

              <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-2 right-0 px-3 py-1.5 rounded-xl bg-black/60 border border-green-500/30 backdrop-blur-md flex items-center gap-2 shadow-lg"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                <span className="text-xs font-bold text-gray-200">60 FPS Waveform</span>
              </motion.div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Master Technical & Behavioral Interviews
            </h2>
            <p className="text-sm text-gray-300 mt-3 max-w-sm font-normal leading-relaxed">
              &quot;Practice real interviews with AI and get instant feedback.&quot; Experience realistic voice architecture, live coding grading, and actionable FAANG scorecards.
            </p>
          </div>

          {/* Bottom social proof */}
          <div className="relative z-10 pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="User" className="w-6 h-6 rounded-full border border-gray-900" />
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="User" className="w-6 h-6 rounded-full border border-gray-900" />
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="User" className="w-6 h-6 rounded-full border border-gray-900" />
              </div>
              <span className="font-semibold text-gray-300">50,000+ engineers practice here</span>
            </div>
            <span className="text-blue-400 font-bold">L5/L6 Ready</span>
          </div>
        </div>

        {/* Right Column: Interactive Login Form */}
        <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center relative z-10">
          <div className="max-w-md mx-auto w-full space-y-8">
            {/* Mobile Header Logo */}
            <div className="flex lg:hidden items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold text-white">AI Interview</span>
            </div>

            {/* Form Title & Subtitle */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {isSignUp ? 'Create Your Account' : 'Welcome Back'}
              </h1>
              <p className="text-sm text-gray-400 mt-1.5">
                {isSignUp 
                  ? 'Start practicing real interviews with AI and get instant feedback.'
                  : 'Practice real interviews with AI and get instant feedback.'}
              </p>
            </div>

            {/* Social Authentication Options */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                type="button"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => handleSocialAuth('Google')}
                disabled={isLoading}
                className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-sm font-semibold text-gray-200 transition-colors disabled:opacity-50"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Google</span>
              </motion.button>

              <motion.button
                type="button"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => handleSocialAuth('GitHub')}
                disabled={isLoading}
                className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-sm font-semibold text-gray-200 transition-colors disabled:opacity-50"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </motion.button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-4">
              <div className="w-full border-t border-white/[0.08]" />
              <span className="absolute px-3 bg-[#111827] text-[11px] font-bold uppercase tracking-wider text-gray-500">
                OR
              </span>
            </div>

            {/* Error Message Display */}
            <AnimatePresence>
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center gap-3 text-xs font-semibold text-red-300"
                >
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Akhil Sharma"
                      disabled={isLoading}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm font-medium"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    disabled={isLoading}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    disabled={isLoading}
                    className="w-full pl-11 pr-11 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white transition-colors">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-black/50 border-white/20 text-blue-500 focus:ring-blue-500/30 w-4 h-4"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    alert("A password reset link has been dispatched to your email address!");
                  }}
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Submit Button */}
              <motion.button
                type="submit"
                variants={buttonVariants}
                whileHover={isLoading ? undefined : "hover"}
                whileTap={isLoading ? undefined : "tap"}
                disabled={isLoading || isSuccess}
                className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all mt-6 ${
                  isSuccess
                    ? 'bg-green-500 text-white shadow-green-500/30'
                    : 'bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white shadow-blue-500/25 hover:shadow-blue-500/40'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 animate-bounce" />
                    <span>Authentication Success!</span>
                  </>
                ) : (
                  <>
                    <span>{isSignUp ? 'Create Account & Start' : 'Login to Dashboard'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Bottom Section Toggle */}
            <div className="text-center pt-4 border-t border-white/[0.08]">
              <p className="text-xs text-gray-400">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setIsSignUp(!isSignUp);
                    setErrorMsg(null);
                  }}
                  className="text-blue-400 hover:text-blue-300 font-extrabold ml-1 transition-colors underline underline-offset-4"
                >
                  {isSignUp ? 'Sign In' : 'Create Account'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Terminal,
  Eye,
  EyeOff,
  Loader2,
  Phone,
  User as UserIcon,
  RefreshCw
} from 'lucide-react';
import { sound } from '../../utils/sound';
import { buttonVariants } from '../../utils/motion';
import type { User } from '../../types';
import { mockUser } from '../../data/mockData';
import { OrbitOtp } from '../common/OrbitOtp';

interface SignupViewProps {
  onSignupSuccess: (user: User) => void;
  onNavigateBack?: () => void;
  onNavigateToLogin?: () => void;
}

export const SignupView: React.FC<SignupViewProps> = ({ onSignupSuccess, onNavigateBack, onNavigateToLogin }) => {
  const isSignUp = true; // Hardcoded for SignupView to keep rendering logic intact

  // Common states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Sign up specific states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Validation states
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auth state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // OTP state
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [otpCountdown, setOtpCountdown] = useState(30);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isOtpMode && otpCountdown > 0) {
      timer = setTimeout(() => setOtpCountdown(c => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [isOtpMode, otpCountdown]);

  const validateName = (name: string, fieldName: string) => {
    const trimmed = name.trim();
    if (!trimmed) return `${fieldName} is required.`;
    if (trimmed.length < 2) return `${fieldName} must contain at least 2 characters.`;
    if (trimmed.length > 50) return `${fieldName} must not exceed 50 characters.`;
    if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) return "Only letters are allowed.";
    return null;
  };

  const validateEmail = (emailStr: string) => {
    const trimmed = emailStr.trim();
    if (!trimmed) return "Email is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) return "Please enter a valid email address.";
    return null;
  };

  const validateMobile = (mob: string) => {
    if (!mob) return "Mobile number is required.";
    if (!/^\d+$/.test(mob)) return "Mobile number must contain only digits.";
    if (mob.length !== 10) return "Enter a valid 10-digit mobile number.";
    if (!/^[6-9]/.test(mob)) return "Mobile number must start with 6, 7, 8, or 9.";
    return null;
  };

  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score < 3) return 'Weak';
    if (score < 4) return 'Medium';
    return 'Strong';
  };

  const validatePassword = (pass: string) => {
    if (!pass) return "Password is required.";
    if (pass.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(pass)) return "Must contain one uppercase letter.";
    if (!/[a-z]/.test(pass)) return "Must contain one lowercase letter.";
    if (!/[0-9]/.test(pass)) return "Must contain one number.";
    if (!/[^A-Za-z0-9]/.test(pass)) return "Must contain one special character.";
    return null;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\s/g, '').toLowerCase();
    setEmail(val);
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setMobile(val);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    setErrorMsg(null);
    setErrors({});

    if (isSignUp) {
      const newErrors: Record<string, string> = {};
      const fNameErr = validateName(firstName, "First name");
      if (fNameErr) newErrors.firstName = fNameErr;

      const lNameErr = validateName(lastName, "Last name");
      if (lNameErr) newErrors.lastName = lNameErr;

      const emailErr = validateEmail(email);
      if (emailErr) newErrors.email = emailErr;

      const mobErr = validateMobile(mobile);
      if (mobErr) newErrors.mobile = mobErr;

      const passErr = validatePassword(password);
      if (passErr) newErrors.password = passErr;

      if (!confirmPassword) {
        newErrors.confirmPassword = "Confirm password is required.";
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match.";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        sound.playError();
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
        sound.playSuccess();
        setTimeout(() => {
          setIsSuccess(false);
          setIsOtpMode(true);
          setOtpCountdown(30);
        }, 1000);
      }, 1500);

    } else {
      // Login validation
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

      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
        sound.playSuccess();
        setTimeout(() => {
          onSignupSuccess({
            ...mockUser,
            email: email
          });
        }, 800);
      }, 1500);
    }
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
        onSignupSuccess({
          ...mockUser,
          name: `${provider} Engineer`
        });
      }, 700);
    }, 1200);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).replace(/\D/g, '');
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
    if (pastedData.length > 0) {
      otpInputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    }
  };

  const handleVerifyOtp = () => {
    if (otp.some(v => !v)) {
      setErrorMsg("Please enter the complete 6-digit verification code.");
      sound.playError();
      return;
    }

    setErrorMsg(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      const enteredOtp = otp.join('');
      if (enteredOtp !== '123456') {
        setErrorMsg("Invalid verification code. Hint: Use 123456");
        sound.playError();
        return;
      }

      setIsSuccess(true);
      sound.playSuccess();

      setTimeout(() => {
        onSignupSuccess({
          ...mockUser,
          name: `${firstName} ${lastName}`.trim() || mockUser.name,
          email: email
        });
      }, 1000);
    }, 1500);
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
        {/* Right Column: Interactive Login Form / OTP */}
        <div className="lg:col-span-6 p-8 pt-4 sm:p-12 sm:pt-6 flex flex-col relative z-10 overflow-y-auto max-h-[90vh] custom-scrollbar">
          <AnimatePresence mode="wait">
            {!isOtpMode ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-md mx-auto w-full space-y-8"
              >

          {onNavigateBack && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              onClick={() => {
                sound.playClick();
                onNavigateBack();
              }}
              aria-label="Go back to Landing Page"
              className="mb-8 w-fit flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-sm font-semibold text-gray-300 hover:text-white transition-all shadow-sm backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </motion.button>
          )}
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
                      ? 'Start practicing real interviews with AI and receive personalized feedback to improve your skills.'
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
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">First Name</label>
                        <div className="relative">
                          <UserIcon className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="text"
                            value={firstName}
                            onChange={(e) => {
                              setFirstName(e.target.value);
                              if (errors.firstName) setErrors(prev => ({ ...prev, firstName: validateName(e.target.value, "First name") || '' }));
                            }}
                            placeholder="Akhil"
                            disabled={isLoading}
                            className={`w-full pl-11 pr-4 py-3 rounded-xl bg-black/40 border ${errors.firstName ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-blue-500 focus:ring-blue-500/20'} text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all text-sm font-medium`}
                          />
                        </div>
                        {errors.firstName && <p className="text-red-400 text-xs mt-1 font-medium">{errors.firstName}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Last Name</label>
                        <div className="relative">
                          <UserIcon className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="text"
                            value={lastName}
                            onChange={(e) => {
                              setLastName(e.target.value);
                              if (errors.lastName) setErrors(prev => ({ ...prev, lastName: validateName(e.target.value, "Last name") || '' }));
                            }}
                            placeholder="Sharma"
                            disabled={isLoading}
                            className={`w-full pl-11 pr-4 py-3 rounded-xl bg-black/40 border ${errors.lastName ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-blue-500 focus:ring-blue-500/20'} text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all text-sm font-medium`}
                          />
                        </div>
                        {errors.lastName && <p className="text-red-400 text-xs mt-1 font-medium">{errors.lastName}</p>}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          handleEmailChange(e);
                          if (isSignUp && errors.email) setErrors(prev => ({ ...prev, email: validateEmail(e.target.value) || '' }));
                        }}
                        placeholder="name@company.com"
                        disabled={isLoading}
                        className={`w-full pl-11 pr-4 py-3 rounded-xl bg-black/40 border ${errors.email ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-blue-500 focus:ring-blue-500/20'} text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all text-sm font-medium`}
                      />
                    </div>
                    {errors.email && <p className="text-red-400 text-xs mt-1 font-medium">{errors.email}</p>}
                  </div>

                  {isSignUp && (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Mobile Number</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          value={mobile}
                          onChange={(e) => {
                            handleMobileChange(e);
                            if (errors.mobile) setErrors(prev => ({ ...prev, mobile: validateMobile(e.target.value.replace(/\D/g, '').slice(0, 10)) || '' }));
                          }}
                          placeholder="9876543210"
                          disabled={isLoading}
                          className={`w-full pl-11 pr-4 py-3 rounded-xl bg-black/40 border ${errors.mobile ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-blue-500 focus:ring-blue-500/20'} text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all text-sm font-medium`}
                        />
                      </div>
                      {errors.mobile && <p className="text-red-400 text-xs mt-1 font-medium">{errors.mobile}</p>}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (isSignUp && errors.password) setErrors(prev => ({ ...prev, password: validatePassword(e.target.value) || '' }));
                        }}
                        placeholder="••••••••••••"
                        disabled={isLoading}
                        className={`w-full pl-11 pr-11 py-3 rounded-xl bg-black/40 border ${errors.password ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-blue-500 focus:ring-blue-500/20'} text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all text-sm font-medium`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-gray-400 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {isSignUp && password && (
                      <div className="mt-2 flex items-center justify-between text-xs px-1">
                        <div className="flex items-center gap-1.5 w-1/2">
                          <div className={`h-1 flex-1 rounded-full ${getPasswordStrength(password) === 'Weak' ? 'bg-red-500' : getPasswordStrength(password) === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`} />
                          <div className={`h-1 flex-1 rounded-full ${getPasswordStrength(password) === 'Medium' || getPasswordStrength(password) === 'Strong' ? 'bg-yellow-500' : 'bg-white/10'}`} />
                          <div className={`h-1 flex-1 rounded-full ${getPasswordStrength(password) === 'Strong' ? 'bg-green-500' : 'bg-white/10'}`} />
                        </div>
                        <span className={`font-medium ${getPasswordStrength(password) === 'Weak' ? 'text-red-400' : getPasswordStrength(password) === 'Medium' ? 'text-yellow-400' : 'text-green-400'}`}>
                          {getPasswordStrength(password)}
                        </span>
                      </div>
                    )}
                    {errors.password && <p className="text-red-400 text-xs mt-1 font-medium">{errors.password}</p>}
                  </div>

                  {isSignUp && (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Confirm Password</label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            if (errors.confirmPassword) {
                              setErrors(prev => ({ ...prev, confirmPassword: e.target.value !== password ? "Passwords do not match." : '' }));
                            }
                          }}
                          placeholder="••••••••••••"
                          disabled={isLoading}
                          className={`w-full pl-11 pr-11 py-3 rounded-xl bg-black/40 border ${errors.confirmPassword ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-blue-500 focus:ring-blue-500/20'} text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all text-sm font-medium`}
                        />
                      </div>
                      {errors.confirmPassword && <p className="text-red-400 text-xs mt-1 font-medium">{errors.confirmPassword}</p>}
                    </div>
                  )}

                  {/* Remember Me & Forgot Password (Only on Login) */}
                  {!isSignUp && (
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
                  )}

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    variants={buttonVariants}
                    whileHover={isLoading ? undefined : "hover"}
                    whileTap={isLoading ? undefined : "tap"}
                    disabled={isLoading || isSuccess}
                    className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all mt-6 ${
                      isSuccess && !isSignUp
                        ? 'bg-green-500 text-white shadow-green-500/30'
                        : 'bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white shadow-blue-500/25 hover:shadow-blue-500/40'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{isSignUp ? 'Creating Account...' : 'Authenticating...'}</span>
                      </>
                    ) : isSuccess && !isSignUp ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 animate-bounce" />
                        <span>Authentication Success!</span>
                      </>
                    ) : (
                      <>
                        <span>{isSignUp ? 'Create & Verify' : 'Login to Dashboard'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Bottom Section Toggle */}
                <div className="text-center pt-4 border-t border-white/[0.08]">
                  <p className="text-xs text-gray-400">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        if (onNavigateToLogin) onNavigateToLogin();
                      }}
                      className="text-blue-400 hover:text-blue-300 font-extrabold ml-1 transition-colors underline underline-offset-4"
                    >
                      Sign In
                    </button>
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-md mx-auto w-full space-y-8"
              >

          {onNavigateBack && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              onClick={() => {
                sound.playClick();
                onNavigateBack();
              }}
              aria-label="Go back to Landing Page"
              className="mb-8 w-fit flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-sm font-semibold text-gray-300 hover:text-white transition-all shadow-sm backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </motion.button>
          )}
                {/* Mobile Header Logo */}
                <div className="flex lg:hidden items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-extrabold text-white">AI Interview</span>
                </div>

                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Verify Your Account
                  </h1>
                  <p className="text-sm text-gray-400 mt-1.5">
                    Enter the 6-digit verification code sent to your {mobile ? 'mobile number' : 'email address'}.
                  </p>
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

                <OrbitOtp
                  otp={otp}
                  onChange={handleOtpChange}
                  onKeyDown={handleOtpKeyDown}
                  onPaste={handleOtpPaste}
                  isLoading={isLoading}
                  isSuccess={isSuccess}
                  errorMsg={errorMsg}
                  otpInputRefs={otpInputRefs}
                />

                <div className="text-center pt-2">
                  <p className="text-xs text-gray-400 mb-2">Didn't receive the code?</p>
                  <button
                    type="button"
                    disabled={otpCountdown > 0 || isLoading}
                    onClick={() => {
                      sound.playClick();
                      setOtpCountdown(30);
                      // Simulate resend
                    }}
                    className={`text-sm font-bold flex items-center justify-center gap-1.5 mx-auto ${otpCountdown > 0 ? 'text-gray-500 cursor-not-allowed' : 'text-blue-400 hover:text-blue-300 transition-colors'}`}
                  >
                    {otpCountdown > 0 ? (
                       `Resend OTP (after ${otpCountdown} seconds)`
                    ) : (
                       <>
                         <RefreshCw className="w-3.5 h-3.5" />
                         Resend OTP
                       </>
                    )}
                  </button>
                </div>

                <motion.button
                  type="button"
                  onClick={handleVerifyOtp}
                  variants={buttonVariants}
                  whileHover={isLoading ? undefined : "hover"}
                  whileTap={isLoading ? undefined : "tap"}
                  disabled={isLoading || isSuccess}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all mt-8 ${
                    isSuccess
                      ? 'bg-green-500 text-white shadow-green-500/30'
                      : 'bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white shadow-blue-500/25 hover:shadow-blue-500/40'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 animate-bounce" />
                      <span>Account verified successfully!</span>
                    </>
                  ) : (
                    <>
                      <span>Verify Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Left Column: AI Illustration & Branding (Hidden on small screens) */}
        <div className="hidden lg:col-span-6 p-12 bg-gradient-to-br from-blue-900/40 via-[#111827]/80 to-purple-900/40 border-l border-white/[0.08] relative overflow-hidden flex flex-col justify-between">
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

          {/* Enhanced Center Visualizer for Product Showcase */}
          <div className="relative z-10 my-8 flex flex-col items-center justify-center text-center w-full">
            {/* Dashboard Preview / Floating Elements */}
            <div className="relative w-full max-w-md h-72 flex items-center justify-center mb-6">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-transparent blur-2xl rounded-full" />

              {/* Main Analytics Card (Mock) */}
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute z-20 w-64 p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl shadow-2xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Cpu className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-gray-400">FAANG Score</div>
                      <div className="text-sm font-bold text-white">Strong Hire</div>
                    </div>
                  </div>
                  <div className="text-green-400 text-xs font-bold bg-green-400/10 px-2 py-1 rounded-md">+15%</div>
                </div>
                {/* Mini chart lines */}
                <div className="flex items-end gap-1.5 h-12 mt-2">
                  {[40, 70, 45, 90, 65, 100].map((h, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-blue-600 to-purple-500 rounded-t-sm" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </motion.div>

              {/* Floating Feedback Card 1 */}
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -right-4 top-4 z-30 w-48 p-3 rounded-xl bg-[#111827]/80 border border-white/10 backdrop-blur-xl shadow-xl flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Communication</div>
                  <div className="text-xs font-semibold text-white">Clear & Concise</div>
                </div>
              </motion.div>

              {/* Floating Feedback Card 2 */}
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute -left-8 bottom-8 z-30 w-52 p-3 rounded-xl bg-[#111827]/80 border border-white/10 backdrop-blur-xl shadow-xl flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                  <Terminal className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Code Quality</div>
                  <div className="text-xs font-semibold text-white leading-tight">Optimal Time Complexity</div>
                </div>
              </motion.div>

              {/* Floating Orbs & Particles */}
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="absolute inset-0">
                <div className="absolute top-10 left-10 w-2 h-2 rounded-full bg-blue-400 blur-[1px]" />
                <div className="absolute bottom-20 right-10 w-3 h-3 rounded-full bg-purple-400 blur-[2px]" />
                <div className="absolute top-1/2 right-4 w-1.5 h-1.5 rounded-full bg-cyan-400" />
              </motion.div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mt-4">
              Master Technical & Behavioral Interviews
            </h2>
            <p className="text-sm text-gray-300 mt-3 max-w-sm font-normal leading-relaxed">
              Experience realistic voice architecture, live coding grading, and actionable FAANG scorecards.
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

         </motion.div>
    </div>
  );
};





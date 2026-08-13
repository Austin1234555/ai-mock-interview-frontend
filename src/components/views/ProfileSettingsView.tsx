import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User as UserIcon, 
  Mail, 
  Award, 
  Bell, 
  Sliders, 
  CheckCircle2, 
  Save, 
  Sparkles,
  Volume2,
  Phone,
  Edit3,
  X,
  ShieldCheck,
  ArrowLeft,
  Camera
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cardVariants, containerVariants, buttonVariants } from '../../utils/motion';
import { sound } from '../../utils/sound';
import type { User } from '../../types';
import { OrbitOtp } from '../common/OrbitOtp';

interface ProfileSettingsViewProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

export const ProfileSettingsView: React.FC<ProfileSettingsViewProps> = ({
  user,
  onUpdateUser,
}) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Editable fields (Sensitive)
  const [editName, setEditName] = useState(user.name);
  const [editMobile, setEditMobile] = useState(user.mobile || '');
  const [editEmail, setEditEmail] = useState(user.email);
  const [editAvatar, setEditAvatar] = useState(user.avatar);

  // Editable fields (Preferences)
  const [targetRubric, setTargetRubric] = useState('L6 Senior Engineer');
  const [voiceCadence, setVoiceCadence] = useState('1.0x Normal');
  const [notifications, setNotifications] = useState(true);

  // OTP State
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [isOtpSuccess, setIsOtpSuccess] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Validation
  const hasSensitiveChanges = editName !== user.name || editMobile !== (user.mobile || '') || editEmail !== user.email;
  const showNameError = isEditing && editName === user.name;
  const showMobileError = isEditing && editMobile === (user.mobile || '');
  const showEmailError = isEditing && editEmail === user.email;
  
  // If editing, and they typed something, but it's identical to current, it's an error.
  const hasValidationErrors = showNameError || showMobileError || showEmailError;

  const handleCancelEdit = () => {
    sound.playClick();
    setIsEditing(false);
    setEditName(user.name);
    setEditMobile(user.mobile || '');
    setEditEmail(user.email);
    setEditAvatar(user.avatar);
  };

  const handleInitiateSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditing) {
      sound.playClick();
      setIsEditing(true);
      return;
    }

    if (hasValidationErrors) {
      sound.playError();
      return;
    }

    sound.playClick();
    if (hasSensitiveChanges) {
      // Show OTP flow for sensitive changes
      setShowOtp(true);
      setOtp(Array(6).fill(''));
      setOtpError(null);
      setIsOtpSuccess(false);
      setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 100);
    } else {
      // Only preferences changed, save immediately
      finalizeSave();
    }
  };

  const finalizeSave = () => {
    sound.playSuccess();
    onUpdateUser({
      ...user,
      name: editName,
      email: editEmail,
      mobile: editMobile,
      avatar: editAvatar,
    });
    setIsEditing(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      sound.playClick();
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // --- OTP Handlers ---
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpError(null);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }

    if (newOtp.every(d => d !== '')) {
      verifyOtp(newOtp);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pastedData) {
      const newOtp = [...otp];
      pastedData.split('').forEach((char, i) => {
        if (i < 6) newOtp[i] = char;
      });
      setOtp(newOtp);
      
      const nextFocus = Math.min(pastedData.length, 5);
      otpRefs.current[nextFocus]?.focus();

      if (newOtp.every(d => d !== '')) {
        verifyOtp(newOtp);
      }
    }
  };

  const verifyOtp = (currentOtp: string[]) => {
    const code = currentOtp.join('');
    if (code.length === 6) {
      setIsOtpLoading(true);
      setOtpError(null);
      sound.playClick();
      
      setTimeout(() => {
        if (code === '123456') {
          sound.playSuccess();
          setIsOtpLoading(false);
          setIsOtpSuccess(true);
          setTimeout(() => {
            setShowOtp(false);
            finalizeSave();
          }, 1500);
        } else {
          sound.playError();
          setIsOtpLoading(false);
          setOtpError('Invalid verification code');
          setOtp(Array(6).fill(''));
          otpRefs.current[0]?.focus();
        }
      }, 1500);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-20 space-y-8 relative z-10"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => {
              sound.playClick();
              navigate('/dashboard');
            }}
            className="flex items-center gap-2 px-3 py-1.5 mb-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-gray-400 hover:text-white font-medium text-xs border border-white/[0.08] transition-colors w-fit"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Profile & Account Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineer Profile & AI Preferences
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage your FAANG target rubric, voice synthesis cadence, and personal identification
          </p>
        </div>

        <AnimatePresence>
          {isSaved && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/20 border border-green-500/40 text-green-300 text-xs font-bold shadow-lg"
            >
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span>Settings Saved Successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <form onSubmit={handleInitiateSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Avatar & Summary Card */}
        <motion.div
          variants={cardVariants}
          className="lg:col-span-4 p-6 sm:p-8 rounded-[28px] bg-[#111827]/80 border border-white/[0.08] shadow-2xl backdrop-blur-xl flex flex-col items-center text-center space-y-6 self-start"
        >
          <div className="relative group">
            <img
              src={editAvatar}
              alt={user.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500/30 shadow-2xl group-hover:scale-105 transition-transform"
            />
            <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity border-4 border-transparent">
               <Camera className="w-8 h-8 text-white mb-1" />
               <span className="text-[10px] font-bold text-white uppercase tracking-wider">Change</span>
               <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </label>
            <div className="absolute bottom-2 right-2 p-2 rounded-full bg-blue-500 text-white shadow-md border border-black/40">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">{user.name}</h2>
            <p className="text-xs text-blue-400 font-semibold mt-0.5">{user.title}</p>
            <span className="inline-block mt-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-[11px] text-gray-400">
              {user.email}
            </span>
          </div>

          <div className="w-full pt-4 border-t border-white/[0.08] grid grid-cols-2 gap-3 text-center">
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
              <span className="text-xl font-extrabold text-white block">{user.completedInterviews}</span>
              <span className="text-[10px] uppercase font-bold text-gray-400">Interviews</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
              <span className="text-xl font-extrabold text-green-400 block">{user.highestScore}%</span>
              <span className="text-[10px] uppercase font-bold text-gray-400">Peak Score</span>
            </div>
          </div>

          <div className="w-full p-4 rounded-2xl bg-gradient-to-br from-blue-900/30 to-purple-900/20 border border-blue-500/20 text-left space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-300">
              <Award className="w-4 h-4" />
              <span>Target Level Rubric</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed font-medium">
              Your responses are benchmarked against Google & Meta L6 Staff Engineer hiring scorecards.
            </p>
          </div>
        </motion.div>

        {/* Right Column: Editable Form Fields */}
        <motion.div
          variants={cardVariants}
          className="lg:col-span-8 p-6 sm:p-8 rounded-[28px] bg-[#111827]/80 border border-white/[0.08] shadow-2xl backdrop-blur-xl space-y-8"
        >
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
            <h3 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
              <Sliders className="w-5 h-5 text-blue-400" />
              <span>Account Configuration & Rubric Preferences</span>
            </h3>
          </div>

          {/* Sensitive Info Section */}
          <div className="space-y-6">
            {/* NAME FIELD */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                <UserIcon className="w-3.5 h-3.5 text-blue-400" />
                <span>Full Name</span>
              </label>
              {!isEditing ? (
                <div className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 text-gray-300 font-medium text-sm">
                  {user.name}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-gray-500 font-bold uppercase mb-1 block">Current</span>
                    <div className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 text-gray-400 font-medium text-sm opacity-60">
                      {user.name}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-blue-400 font-bold uppercase mb-1 block">New Name</span>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-white font-medium text-sm focus:outline-none transition-all ${
                        showNameError ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-blue-500'
                      }`}
                      placeholder="Enter new name"
                    />
                    {showNameError && (
                      <p className="text-[10px] text-red-400 mt-1 font-bold">New name cannot match current name.</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* MOBILE FIELD */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-purple-400" />
                <span>Mobile Number</span>
              </label>
              {!isEditing ? (
                <div className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 text-gray-300 font-medium text-sm">
                  {user.mobile || 'Not provided'}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-gray-500 font-bold uppercase mb-1 block">Current</span>
                    <div className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 text-gray-400 font-medium text-sm opacity-60">
                      {user.mobile || 'Not provided'}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-blue-400 font-bold uppercase mb-1 block">New Mobile</span>
                    <input
                      type="text"
                      value={editMobile}
                      onChange={(e) => setEditMobile(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-white font-medium text-sm focus:outline-none transition-all ${
                        showMobileError ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-blue-500'
                      }`}
                      placeholder="+1 (555) 000-0000"
                    />
                    {showMobileError && (
                      <p className="text-[10px] text-red-400 mt-1 font-bold">New mobile matches current mobile.</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* EMAIL FIELD */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-green-400" />
                <span>Work / Personal Email</span>
              </label>
              {!isEditing ? (
                <div className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 text-gray-300 font-medium text-sm">
                  {user.email}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-gray-500 font-bold uppercase mb-1 block">Current</span>
                    <div className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 text-gray-400 font-medium text-sm opacity-60">
                      {user.email}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-blue-400 font-bold uppercase mb-1 block">New Email</span>
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-white font-medium text-sm focus:outline-none transition-all ${
                        showEmailError ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-blue-500'
                      }`}
                      placeholder="Enter new email"
                    />
                    {showEmailError && (
                      <p className="text-[10px] text-red-400 mt-1 font-bold">New email matches current email.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Preferences Section */}
          <div className="pt-6 border-t border-white/[0.08]">
            <h4 className="text-sm font-bold text-white mb-4">Interview Preferences</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>FAANG Rubric Target</span>
                </label>
                <select
                  disabled={!isEditing}
                  value={targetRubric}
                  onChange={(e) => setTargetRubric(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-gray-200 font-medium text-sm focus:outline-none focus:border-blue-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="L4 Mid-Level Engineer">L4 Mid-Level Engineer</option>
                  <option value="L5 Senior Engineer">L5 Senior Engineer</option>
                  <option value="L6 Senior / Staff Engineer">L6 Senior / Staff Engineer</option>
                  <option value="L7 Principal Architect">L7 Principal Architect</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-2">
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>AI Speech Cadence</span>
                </label>
                <select
                  disabled={!isEditing}
                  value={voiceCadence}
                  onChange={(e) => setVoiceCadence(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-gray-200 font-medium text-sm focus:outline-none focus:border-blue-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="0.9x Measured & Analytical">0.9x Measured & Analytical</option>
                  <option value="1.0x Normal">1.0x Normal (Standard FAANG Pace)</option>
                  <option value="1.15x Rapid & Conversational">1.15x Rapid & Conversational</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className={`flex items-center justify-between p-4 rounded-2xl border transition-colors ${isEditing ? 'bg-white/[0.03] border-white/[0.05] hover:bg-white/[0.05] cursor-pointer' : 'bg-transparent border-transparent opacity-60'}`}>
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-blue-400" />
                  <div>
                    <span className="text-sm font-bold text-white block">Email Telemetry Digest</span>
                    <span className="text-xs text-gray-400 block">Receive weekly AI scorecards and topic recommendation reminders</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  disabled={!isEditing}
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="w-5 h-5 rounded bg-black/50 border-white/20 text-blue-500 focus:ring-0 disabled:cursor-not-allowed"
                />
              </label>
            </div>
          </div>

          <div className="pt-6 border-t border-white/[0.08] flex items-center justify-end">
            {!isEditing ? (
              <motion.button
                type="submit"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-extrabold text-sm border border-white/20 flex items-center gap-2 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </motion.button>
            ) : (
              <div className="flex items-center gap-4">
                <motion.button
                  type="button"
                  onClick={handleCancelEdit}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="px-6 py-3.5 rounded-xl bg-transparent hover:bg-white/5 text-gray-400 hover:text-white font-bold text-sm border border-transparent hover:border-white/10 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  disabled={hasValidationErrors}
                  variants={buttonVariants}
                  whileHover={hasValidationErrors ? "rest" : "hover"}
                  whileTap={hasValidationErrors ? "rest" : "tap"}
                  className={`px-8 py-3.5 rounded-xl text-white font-extrabold text-sm border flex items-center gap-2 transition-all ${
                    hasValidationErrors 
                      ? 'bg-gray-600/50 border-gray-500/30 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 shadow-xl shadow-blue-500/25 border-white/20'
                  }`}
                >
                  <Save className="w-4 h-4" />
                  <span>Save Updates</span>
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      </form>

      {/* OTP Verification Modal */}
      <AnimatePresence>
        {showOtp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030712]/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-md p-8 rounded-[32px] bg-[#0b1120] border border-white/[0.1] shadow-2xl relative overflow-hidden text-center"
            >
              {/* Background Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-blue-500/20 blur-[60px] pointer-events-none" />

              <button
                type="button"
                onClick={() => setShowOtp(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-gray-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25 mb-6">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-2xl font-extrabold text-white mb-2 tracking-tight">Security Verification</h2>
              <p className="text-sm text-gray-400 mb-2">
                To apply sensitive profile changes, please enter the verification code sent to your email.
              </p>
              <p className="text-xs text-blue-400 font-bold mb-8">
                (Mock code: 123456)
              </p>

              <OrbitOtp
                otp={otp}
                onChange={handleOtpChange}
                onKeyDown={handleOtpKeyDown}
                onPaste={handleOtpPaste}
                isLoading={isOtpLoading}
                isSuccess={isOtpSuccess}
                errorMsg={otpError}
                otpInputRefs={otpRefs}
              />

              {otpError && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm font-bold mt-4"
                >
                  {otpError}
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

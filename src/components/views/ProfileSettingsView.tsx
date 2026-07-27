import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User as UserIcon, 
  Mail, 
  Briefcase, 
  Award, 
  Bell, 
  Sliders, 
  CheckCircle2, 
  Save, 
  Sparkles,
  Volume2
} from 'lucide-react';
import { cardVariants, containerVariants, buttonVariants } from '../../utils/motion';
import { sound } from '../../utils/sound';
import type { User } from '../../types';

interface ProfileSettingsViewProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

export const ProfileSettingsView: React.FC<ProfileSettingsViewProps> = ({
  user,
  onUpdateUser,
}) => {
  const [name, setName] = useState(user.name);
  const [title, setTitle] = useState(user.title);
  const [email, setEmail] = useState(user.email);
  const [targetRubric, setTargetRubric] = useState('L6 Senior Engineer');
  const [voiceCadence, setVoiceCadence] = useState('1.0x Normal');
  const [notifications, setNotifications] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSuccess();
    onUpdateUser({
      ...user,
      name,
      title,
      email,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
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

        {isSaved && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/20 border border-green-500/40 text-green-300 text-xs font-bold shadow-lg"
          >
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span>Settings Saved Successfully!</span>
          </motion.div>
        )}
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Avatar & Summary Card */}
        <motion.div
          variants={cardVariants}
          className="lg:col-span-4 p-6 sm:p-8 rounded-[28px] bg-[#111827]/80 border border-white/[0.08] shadow-2xl backdrop-blur-xl flex flex-col items-center text-center space-y-6 self-start"
        >
          <div className="relative group">
            <img
              src={user.avatar}
              alt={name}
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500/30 shadow-2xl group-hover:scale-105 transition-transform"
            />
            <div className="absolute bottom-2 right-2 p-2 rounded-full bg-blue-500 text-white shadow-md border border-black/40">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">{name}</h2>
            <p className="text-xs text-blue-400 font-semibold mt-0.5">{title}</p>
            <span className="inline-block mt-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-[11px] text-gray-400">
              {email}
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
          className="lg:col-span-8 p-6 sm:p-8 rounded-[28px] bg-[#111827]/80 border border-white/[0.08] shadow-2xl backdrop-blur-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
            <h3 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
              <Sliders className="w-5 h-5 text-blue-400" />
              <span>Account Configuration & Rubric Preferences</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-2">
                <UserIcon className="w-3.5 h-3.5 text-blue-400" />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white font-medium text-sm focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                <span>Job Title / Role</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white font-medium text-sm focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-green-400" />
                <span>Work / Personal Email</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white font-medium text-sm focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>FAANG Rubric Target</span>
              </label>
              <select
                value={targetRubric}
                onChange={(e) => setTargetRubric(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-gray-200 font-medium text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
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
                value={voiceCadence}
                onChange={(e) => setVoiceCadence(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-gray-200 font-medium text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="0.9x Measured & Analytical">0.9x Measured & Analytical</option>
                <option value="1.0x Normal">1.0x Normal (Standard FAANG Pace)</option>
                <option value="1.15x Rapid & Conversational">1.15x Rapid & Conversational</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.08] space-y-4">
            <label className="flex items-center justify-between cursor-pointer p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.05] transition-colors">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-blue-400" />
                <div>
                  <span className="text-sm font-bold text-white block">Email Telemetry Digest</span>
                  <span className="text-xs text-gray-400 block">Receive weekly AI scorecards and topic recommendation reminders</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="w-5 h-5 rounded bg-black/50 border-white/20 text-blue-500 focus:ring-0"
              />
            </label>
          </div>

          <div className="pt-4 flex items-center justify-end">
            <motion.button
              type="submit"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 border border-white/20 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Preferences</span>
            </motion.button>
          </div>
        </motion.div>
      </form>
    </motion.div>
  );
};

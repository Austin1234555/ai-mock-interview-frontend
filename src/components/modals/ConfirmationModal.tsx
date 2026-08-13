import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { modalVariants, buttonVariants } from '../../utils/motion';
import { sound } from '../../utils/sound';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDestructive = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            sound.playClick();
            onCancel();
          }}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Dialog Card */}
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full max-w-md p-6 sm:p-8 rounded-[28px] bg-[#111827]/90 border border-white/[0.12] shadow-2xl backdrop-blur-2xl text-center space-y-6 z-10"
        >
          {/* Close button */}
          <button
            onClick={() => {
              sound.playClick();
              onCancel();
            }}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Icon */}
          <div className={`w-16 h-16 mx-auto rounded-2xl border flex items-center justify-center shadow-lg ${
            isDestructive 
              ? 'bg-red-500/15 border-red-500/30 text-red-400 shadow-red-500/10' 
              : 'bg-blue-500/15 border-blue-500/30 text-blue-400 shadow-blue-500/10'
          }`}>
            {isDestructive ? <AlertTriangle className="w-8 h-8" /> : <CheckCircle2 className="w-8 h-8" />}
          </div>

          {/* Title & Description */}
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {title}
            </h3>
            <p className="text-sm text-gray-400 mt-2 font-normal leading-relaxed">
              {description}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <motion.button
              type="button"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => {
                sound.playClick();
                onCancel();
              }}
              className="flex-1 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-sm font-semibold text-gray-300 transition-colors"
            >
              {cancelText}
            </motion.button>

            <motion.button
              type="button"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => {
                if (isDestructive) {
                  sound.playError();
                } else {
                  sound.playSuccess();
                }
                onConfirm();
              }}
              className={`flex-1 py-3 rounded-xl text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 ${
                isDestructive
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 shadow-red-600/25 hover:shadow-red-600/40'
                  : 'bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 shadow-blue-500/25 hover:shadow-blue-500/40'
              }`}
            >
              <span>{confirmText}</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

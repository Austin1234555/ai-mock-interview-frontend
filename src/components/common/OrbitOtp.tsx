import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OrbitOtpProps {
  otp: string[];
  onChange: (index: number, value: string) => void;
  onKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  isSuccess: boolean;
  errorMsg: string | null;
  otpInputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
}

export const OrbitOtp: React.FC<OrbitOtpProps> = ({
  otp,
  onChange,
  onKeyDown,
  onPaste,
  isLoading,
  isSuccess,
  errorMsg,
  otpInputRefs
}) => {
  const [dimensions, setDimensions] = useState({ cellW: 40, gapW: 8 });
  const orbitalRadius = 26; // The radius of the loading orbit
  const N = otp.length;
  const centerIdx = (N - 1) / 2;

  // Track exact screen size for precise orbital collapse math
  useEffect(() => {
    const updateDims = () => {
      if (window.innerWidth >= 640) {
        setDimensions({ cellW: 48, gapW: 12 });
      } else {
        setDimensions({ cellW: 40, gapW: 8 });
      }
    };
    updateDims();
    window.addEventListener('resize', updateDims);
    return () => window.removeEventListener('resize', updateDims);
  }, []);

  // Shake animation for error state
  const shakeAnimation = {
    x: [0, -10, 10, -8, 8, -4, 4, 0],
    rotate: 0,
    transition: { duration: 0.5 }
  };

  const parentAnimate = isLoading 
    ? { rotate: 360 } 
    : errorMsg 
      ? shakeAnimation 
      : { rotate: 0, x: 0 };

  const parentTransition = isLoading
    ? { rotate: { repeat: Infinity, duration: 2, ease: "linear" } }
    : { type: "spring" as const, stiffness: 300, damping: 25 };

  return (
    <div className="flex justify-center my-6">
      <motion.div 
        className="relative inline-flex gap-2 sm:gap-3 items-center justify-center"
        animate={parentAnimate}
        transition={parentTransition}
      >
        {/* Orbital Track and Hub (Fades in during load) */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center z-0"
            >
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle 
                  cx="50" cy="50" r={orbitalRadius} 
                  stroke="rgba(255, 255, 255, 0.15)"
                  strokeWidth="2"
                  strokeDasharray="4 6"
                  fill="none" 
                />
              </svg>
              {/* Central glowing hub */}
              <div className="absolute w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_12px_rgba(96,165,250,0.9)]" />
            </motion.div>
          )}
        </AnimatePresence>

        {otp.map((digit, index) => {
          const isFilled = digit.length > 0;
          let borderColor = 'border-white/10';
          let ringColor = 'focus-within:ring-blue-500/20 focus-within:border-blue-500/50';
          let glowColor = 'from-blue-500/0 to-purple-500/0'; // Hidden by default

          if (errorMsg) {
            borderColor = 'border-red-500/50';
            ringColor = 'focus-within:ring-red-500/20';
            glowColor = 'from-red-500/20 to-orange-500/20';
          } else if (isSuccess) {
            borderColor = 'border-green-500/50';
            ringColor = 'focus-within:ring-green-500/20';
            glowColor = 'from-green-500/20 to-emerald-500/20';
          } else if (isFilled) {
            borderColor = 'border-white/30';
            glowColor = 'from-blue-500/10 to-purple-500/10';
          }

          // Orbital math for this specific cell
          const theta = (index / N) * Math.PI * 2;
          const dx = Math.cos(theta) * orbitalRadius;
          const dy = Math.sin(theta) * orbitalRadius;
          const naturalX = (index - centerIdx) * (dimensions.cellW + dimensions.gapW);
          const targetX = dx - naturalX;
          const targetY = dy;

          const childAnimate = isLoading
            ? { 
                x: targetX, 
                y: targetY, 
                scale: 0.35, 
                borderRadius: '50%', 
                rotate: -360, // Counter-rotate to stay upright!
              }
            : { 
                x: 0, 
                y: 0, 
                scale: 1, 
                borderRadius: '12px', 
                rotate: 0,
              };

          const childTransition = isLoading
            ? { 
                rotate: { repeat: Infinity, duration: 2, ease: "linear" },
                x: { type: "spring" as const, stiffness: 200, damping: 25 },
                y: { type: "spring" as const, stiffness: 200, damping: 25 },
                scale: { duration: 0.4 },
                borderRadius: { duration: 0.4 }
              }
            : { type: "spring" as const, stiffness: 300, damping: 25 };

          return (
            <motion.div
              key={index}
              initial={false}
              animate={childAnimate}
              transition={childTransition}
              className={`
                relative w-10 h-12 sm:w-12 sm:h-14 
                border ${borderColor} bg-white/5
                transition-colors duration-300 z-10
                ${ringColor} focus-within:bg-white/10 focus-within:ring-2
                overflow-hidden
              `}
            >
              {/* Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-tr ${glowColor} opacity-0 transition-opacity duration-300 ${isFilled || errorMsg || isSuccess ? 'opacity-100' : 'group-focus-within:opacity-100'}`} />
              
              {/* Preserved Rotating Digit Animation */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <AnimatePresence mode="popLayout">
                  {digit && !isLoading && (
                    <motion.span
                      key={digit}
                      initial={{ y: 20, opacity: 0, filter: 'blur(4px)', scale: 0.8 }}
                      animate={{ y: 0, opacity: 1, filter: 'blur(0px)', scale: 1 }}
                      exit={{ y: -20, opacity: 0, filter: 'blur(4px)', scale: 0.8 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25, mass: 0.8 }}
                      className={`
                        text-xl sm:text-2xl font-bold absolute
                        ${errorMsg ? 'text-red-400' : isSuccess ? 'text-green-400' : 'text-white'}
                      `}
                    >
                      {digit}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* The Actual Input */}
              <input
                ref={(el) => { otpInputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => onChange(index, e.target.value)}
                onKeyDown={(e) => onKeyDown(index, e)}
                onPaste={index === 0 ? onPaste : undefined}
                disabled={isLoading || isSuccess}
                className={`
                  absolute inset-0 w-full h-full text-center
                  text-transparent caret-blue-500
                  bg-transparent outline-none
                  disabled:cursor-not-allowed
                `}
                style={{
                  caretColor: errorMsg ? '#ef4444' : isSuccess ? '#22c55e' : '#3b82f6'
                }}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

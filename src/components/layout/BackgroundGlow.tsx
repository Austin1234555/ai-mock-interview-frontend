import React, { useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

export const BackgroundGlow: React.FC = () => {
  // Spring animation for smooth mouse following glow
  const springConfig = { damping: 30, stiffness: 150, mass: 0.5 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 250);
      mouseY.set(e.clientY - 250);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#030712]">
      {/* Layer 1: Deep ambient base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#080d1a] to-[#030712]" />

      {/* Layer 2: Subtle CSS Grid noise / dot texture */}
      <div 
        className="absolute inset-0 opacity-[0.15]" 
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Layer 3: Soft Glowing Radial Gradients (Floating 30s animation) */}
      
      {/* Top Left: Blue Glow (#3B82F6) */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, 50, -30, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full bg-blue-600/20 blur-[130px]"
      />

      {/* Bottom Right: Purple Glow (#8B5CF6) */}
      <motion.div
        animate={{
          x: [0, -70, 40, 0],
          y: [0, -60, 30, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full bg-purple-600/20 blur-[140px]"
      />

      {/* Center / Secondary: Indigo Accent (#6366F1) */}
      <motion.div
        animate={{
          x: [0, 60, -50, 0],
          y: [0, -40, 60, 0],
          scale: [0.8, 1.1, 0.85, 0.8],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5,
        }}
        className="absolute top-1/3 left-1/4 w-[550px] h-[550px] rounded-full bg-indigo-500/15 blur-[120px]"
      />

      {/* Center Dark Transparent Blur overlay for readability */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#030712]/40 to-[#030712]/80 backdrop-blur-[2px]" />

      {/* Mouse Follower Glow (Spring animated) */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
        }}
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-[100px] opacity-70 transition-opacity duration-300"
      />
    </div>
  );
};

import type { Variants, Transition } from 'framer-motion';

// Page Transition:
// Current page -> Fade Out -> Scale to 98% -> Blur -> Slide Left
// Next page -> Fade In -> Slide Up -> Scale to 100%
// Duration: 600ms (0.6s), Ease: easeInOut
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 24,
    scale: 0.98,
    filter: 'blur(6px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.4, 0.0, 0.2, 1], // easeInOut
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    x: -30,
    scale: 0.98,
    filter: 'blur(6px)',
    transition: {
      duration: 0.4,
      ease: [0.4, 0.0, 0.2, 1],
    },
  },
};

// Container stagger animation (Stagger children 100ms)
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// Card Animation on load:
// Opacity: 0 -> 100, Y: 30px -> 0, Scale: 0.96 -> 1, Duration: 700ms (0.7s)
export const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1], // Apple spring-like cubic bezier
    },
  },
};

// Button Micro-interaction:
// Hover: Scale 1 -> 1.04, shadow glow, Click: Scale 1 -> 0.96 bounce back
export const buttonTapScale = 0.96;
export const buttonHoverScale = 1.04;

export const buttonVariants: Variants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.04,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    },
  },
  tap: {
    scale: 0.96,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 30,
    },
  },
};

// Dashboard Card Hover:
// Lift upward (-6px), Rotate 1°, shadow increases, gradient border appears
export const dashboardCardHover: Variants = {
  rest: {
    y: 0,
    rotate: 0,
    scale: 1,
  },
  hover: {
    y: -6,
    rotate: 1,
    scale: 1.01,
    transition: {
      type: 'spring',
      stiffness: 350,
      damping: 25,
    },
  },
};

// Modal scale transition (from 95% with blur)
export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 15,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 380,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    filter: 'blur(4px)',
    transition: {
      duration: 0.2,
    },
  },
};

// Floating background animation (subtle infinite loop over 30s)
export const floatingBlobTransition: Transition = {
  duration: 25,
  repeat: Infinity,
  repeatType: 'reverse',
  ease: 'easeInOut',
};

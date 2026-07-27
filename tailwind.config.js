/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3B82F6',
          600: '#2563eb',
        },
        secondary: '#6366F1',
        accent: '#8B5CF6',
        success: '#22C55E',
        warning: '#FACC15',
        danger: '#EF4444',
        background: '#030712',
        surface: '#111827',
        card: 'rgba(255, 255, 255, 0.05)',
        borderToken: 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'Geist', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'card': '24px',
        'button': '16px',
        'input': '16px',
        'dialog': '28px',
      },
      boxShadow: {
        'glow-blue': '0 0 35px -5px rgba(59, 130, 246, 0.3)',
        'glow-purple': '0 0 35px -5px rgba(139, 92, 246, 0.3)',
        'glow-success': '0 0 35px -5px rgba(34, 197, 94, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.4, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2.5s infinite linear',
        pulseGlow: 'pulseGlow 3s infinite ease-in-out',
        float: 'float 6s infinite ease-in-out',
      },
    },
  },
  plugins: [],
};

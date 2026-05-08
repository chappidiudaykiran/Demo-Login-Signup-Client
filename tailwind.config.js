/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0a0e17',
          panel: '#12182b',
        },
        accent: {
          violet: '#8b5cf6',
          cyan: '#06b6d4',
          rose: '#f43f5e',
        },
      },
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', filter: 'blur(40px)' },
          '50%': { opacity: '0.7', filter: 'blur(60px)' },
        },
        'slide-down': {
          from: { opacity: '0', transform: 'translateY(-16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 8s infinite alternate',
        'pulse-glow-slow': 'pulse-glow 12s infinite alternate-reverse',
        'slide-down': 'slide-down 0.6s cubic-bezier(0.16,1,0.3,1)',
        'fade-in': 'fade-in 0.3s ease',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        geo: {
          black: '#07111f',
          dark: '#0B1F3A',
          navy: '#102D4A',
          copper: '#b87333',
          'copper-light': '#d4956a',
          emerald: '#10b981',
          'emerald-dark': '#065f46',
          cyan: '#00B7C7',
          'cyan-dark': '#008C98',
          slate: '#64748b',
          sandstone: '#c4a882',
          'sandstone-light': '#e8d5b7',
          charcoal: '#1e293b',
          panel: '#0f2945',
          border: '#1f4663',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      backgroundImage: {
        'geo-grid': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2306b6d4' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'topography': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cpath d='M0 100 Q100 50 200 100 Q300 150 400 100' stroke='%2306b6d4' stroke-opacity='0.1' stroke-width='1' fill='none'/%3E%3Cpath d='M0 150 Q100 100 200 150 Q300 200 400 150' stroke='%2306b6d4' stroke-opacity='0.08' stroke-width='1' fill='none'/%3E%3Cpath d='M0 200 Q100 150 200 200 Q300 250 400 200' stroke='%2306b6d4' stroke-opacity='0.06' stroke-width='1' fill='none'/%3E%3Cpath d='M0 250 Q100 200 200 250 Q300 300 400 250' stroke='%2310b981' stroke-opacity='0.06' stroke-width='1' fill='none'/%3E%3Cpath d='M0 300 Q100 250 200 300 Q300 350 400 300' stroke='%2310b981' stroke-opacity='0.04' stroke-width='1' fill='none'/%3E%3C/svg%3E\")",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 3s linear infinite',
        'orbit': 'orbit 20s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'gradient': 'gradient 8s ease infinite',
        'fadeInUp': 'fadeInUp 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'geo': '0 0 40px rgba(6, 182, 212, 0.15)',
        'copper': '0 0 40px rgba(184, 115, 51, 0.2)',
        'emerald': '0 0 40px rgba(16, 185, 129, 0.15)',
        'panel': '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.3)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.4)',
        'glow-copper': '0 0 20px rgba(184, 115, 51, 0.4)',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#0e7c5a',
          800: '#065f46',
          900: '#064e3b',
        },
        earth: {
          50: '#fbf7f1',
          100: '#f3eadd',
          200: '#e6d0b1',
          300: '#d3b08c',
          400: '#b8895e',
          500: '#9a6c3b',
          600: '#7d562c',
          700: '#5e4220',
          800: '#3f2c15',
          900: '#241710',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['Manrope', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

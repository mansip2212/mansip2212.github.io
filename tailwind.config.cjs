const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'cta-cyan': '#40CAFF',
        'cta-violet': '#7C7ACF',
        'cta-coral': '#FF8C69',
      },
      backgroundImage: {
        'cta-gradient': 'linear-gradient(90deg,#7C7ACF 0%,#A98FE6 40%,#FF8C69 100%)',
        'landing-hero': "radial-gradient(1200px 800px at 20% 20%, rgba(60, 59, 99, 0.14), transparent 55%), radial-gradient(1000px 700px at 80% 30%, rgba(255, 100, 65, 0.12), transparent 55%), radial-gradient(900px 700px at 50% 90%, rgba(30, 150, 185, 0.10), transparent 55%), linear-gradient(180deg, #000000 0%, #02020a 50%, #000000 100%)",
      },
      keyframes: {
        popIn: {
          '0%': { opacity: '0', transform: 'translateY(14px) scale(.98)', filter: 'blur(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)', filter: 'blur(0)' },
        },
        drift: {
          '0%': { transform: 'translate3d(-2%, -2%, 0) rotate(0deg) scale(1)' },
          '50%': { transform: 'translate3d(2%, 2%, 0) rotate(14deg) scale(1.05)' },
          '100%': { transform: 'translate3d(-2%, -2%, 0) rotate(0deg) scale(1)' },
        },
        gradientShift: {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
      },
      animation: {
        popIn: 'popIn 520ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
        drift: 'drift 10s ease-in-out infinite',
        gradientShift: 'gradientShift 6s linear infinite',
      },
      fontFamily: {
        apple: ['-apple-system', 'system-ui', 'SF Pro Text', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial'],
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.saturate-115': { 'filter': 'saturate(115%)' },
        '.opacity-98': { 'opacity': '0.98' },
      })
    })
  ]
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      keyframes: {
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        twinkle: { '0%,100%': { opacity: '0.8' }, '50%': { opacity: '0.1' } },
        moonGlow: { '0%,100%': { boxShadow: '0 0 20px rgba(240,216,112,0.4)' }, '50%': { boxShadow: '0 0 30px rgba(240,216,112,0.6)' } },
      },
      animation: {
        'fade-up': 'fadeUp 0.9s ease both',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'moon-glow': 'moonGlow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

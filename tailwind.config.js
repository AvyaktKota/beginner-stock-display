/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eef9f4',
          100: '#d6f1e4',
          500: '#16a34a',
          600: '#15803d',
          700: '#166534',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
  safelist: [
    'border-white/5', 'border-white/6', 'border-white/8', 'border-white/10', 'border-white/15',
    'bg-white/4', 'bg-white/5', 'bg-white/10',
    'bg-green-500/8', 'bg-green-500/12',
    'bg-red-500/12',
    'bg-[#0a0a0a]', 'bg-[#080808]', 'bg-[#0f0f0f]',
  ]
}

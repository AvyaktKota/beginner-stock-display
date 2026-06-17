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
      }
    },
  },
  plugins: [],
}

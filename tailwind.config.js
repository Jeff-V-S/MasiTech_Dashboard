/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        masiNavy: '#0F2A4A',
        masiTeal: '#1F8394'
      }
    }
  },
  plugins: []
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Check if your files are .jsx or .js
  ],
  theme: {
    extend: {
      colors: {
        'smuc-emerald': '#064e3b',
        'smuc-gold': '#d4af37',
      },
    },
  },
  plugins: [],
}
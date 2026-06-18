/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: ['class', '.theme-dark'],
  theme: {
    extend: {
      colors: {
        'oled-green': '#00e676',
        'oled-dark': '#00c853',
        'oled-light': '#69f0ae',
        'darkBg': '#f8fafc', // Reusing old class names but mapping to light colors to fix old dark components automatically
        'cardBg': '#ffffff',
        'emeraldAccent': '#00e676',
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3B82F6',
          dark: '#1E40AF'
        }
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
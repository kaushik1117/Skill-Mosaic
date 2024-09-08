/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        typing: {
          '0%': { width: '0%', visibility: 'visible' },
          '100%': { width: '100%', visibility: 'visible' },
        },
      },
      animation: {
        typing: 'typing 4s steps(32) infinite',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}

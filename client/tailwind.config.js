/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      dark: vars({
        '--bg': '#2B2936',
        '--dark-orange': '#FF8052',
        '--light-orange': '#F4A662',
        '--yellow': '#F0E68F',
        '--green': '#91EE91',
        '--blue': '#4682B4',
      }),
      light: vars({
        '--bg': '#FFFFFF',
        '--dark-orange': '#FF8052',
        '--light-orange': '#F4A662',
        '--yellow': '#F0E68F',
        '--green': '#91EE91',
        '--blue': '#4682B4',
      }),
    },
  },
  plugins: [],
};

require ('./app/')
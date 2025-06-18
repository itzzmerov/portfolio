/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ["Montserrat", "sans-serif"],
        'league': ["League Spartan", "sans-serif"],
        'titillium': ["Titillium Web", "sans-serif"],
      },
      colors: {
        'white': '#EFFAFD',
        'black': '#1E2122',
        'dark-blue': '#1A6DD7',
        'light-blue': '#7FAFED',
        'blue': '#4A8BDF',
        'darkish-blue': '#001D42',
        'pink': '#A0006D',
        'dark-pink': '#70004C',
      }
    },
  },
  plugins: [],
}


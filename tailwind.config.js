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
        'custom-white': '#EFFAFD',
        'custom-black': '#1E2122',
        'custom-dark-blue': '#1A6DD7',
        'custom-light-blue': '#7FAFED',
        'custom-blue': '#4A8BDF',
        'custom-darkish-blue': '#001D42',
        'custom-pink': '#A0006D',
        'custom-dark-pink': '#70004C',
      }
    },
  },
  plugins: [],
}


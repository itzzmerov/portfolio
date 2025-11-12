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
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shadowFloat: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.7' },
          '50%': { transform: 'scale(0.9)', opacity: '0.9' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'shadow-float': 'shadowFloat 4s ease-in-out infinite',
      },
      screens: {
        'mobile': '320px',
        'tablet': '768px',
        'laptop': '1024px',
        'laptop-large': '1440px',
        'desktop': '1920px',
        'desktop-4k': '2560px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}


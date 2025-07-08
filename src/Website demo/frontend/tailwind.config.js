/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0071BC',
        secondary: '#C3DBED',
        gray: {
          100: '#F7F7F7',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#D9D9D9',
          500: '#828282',
        },
        fontFamily: {
          inter: ['Inter', 'sans-serif'],
        },
      },
    },
  },
  plugins: [],
};


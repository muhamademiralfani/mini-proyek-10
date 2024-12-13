/** @type {import('tailwindcss').Config} */
import tailwindScrollbarHide from 'tailwind-scrollbar-hide';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        saira: ['Saira', 'sans-serif'],
      },
      colors: {
        tealDark: '#286F6C',
      },
    },
  },
  plugins: [
    tailwindScrollbarHide,
  ],
};

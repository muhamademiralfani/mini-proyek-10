/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        saira: ['Saira', 'sans-serif'], //  font Saira
      },
      colors: {
        tealDark: '#286F6C', // Indikasi warna teal gelap
      },
    },
  },
  plugins: [],
};

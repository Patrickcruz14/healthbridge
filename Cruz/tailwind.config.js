/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#EEEDFE',
          DEFAULT: '#534AB7',
          dark: '#3C3489',
        },
        mint: {
          light: '#E1F5EE',
          DEFAULT: '#1D9E75',
        },
        charcoal: '#2C2C2A',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        xl: '16px',
        '2xl': '20px',
      },
    },
  },
  plugins: [],
}
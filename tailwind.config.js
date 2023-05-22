/** @type {import('tailwindcss').Config} */
export default {
  darkMode : 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js"
  ],
  theme: {
    extend: {
      transitionProperty: {
        'margin-top': 'margin-top, visibility'
      },
      transitionDelay: {
        'margin-top': 'margin-top 1s'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}
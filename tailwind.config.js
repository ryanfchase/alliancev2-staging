/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./_site/**/*.{html,md,js}"],
  theme: {
    extend: {
      backdropBlur: {
        md: '0px',
      }
    },
  },
  plugins: [],
}


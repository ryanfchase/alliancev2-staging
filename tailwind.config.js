/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./_site/**/*.{html,md,js}"],
  theme: {
    fontFamily: {
      sans: ['"Inter var"', 'sans-serif'],
      roboto: ['"Roboto"', 'sans-serif'],
    },
    extend: {
      colors: {
        'alliance-gold': '#c7aa8b',
      },
      backdropBlur: {
        md: '0px',
      }
    },
  },
  plugins: [],
}


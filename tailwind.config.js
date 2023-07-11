/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./_site/**/*.{html,md,js}"],
  theme: {
    container: {
      padding: '4rem',
    },
    fontFamily: {
      sans: ['Roboto Condensed', 'sans-serif'],
      bitter: ['Bitter', 'serif'],
      volkorn: ['Volkorn', 'serif'],
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


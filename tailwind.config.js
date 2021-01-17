module.exports = {
  purge: [
    './pages/**/*.tsx',
    './components/**/*.tsx',
    './features/**/*.tsx',
    './hooks/**/*.tsx',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}

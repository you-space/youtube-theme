const mode = process.env.APP_MODE

module.exports = {
  important: mode === 'admin' ? '#youtube-theme' : undefined,
  purge: false,
  darkMode: 'class',
  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

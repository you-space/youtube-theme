const mode = process.env.APP_MODE

module.exports = {
  important: '#youtube-theme',
  purge:
    mode === 'admin'
      ? ['./src/admin/*.{vue,js,ts,jsx,tsx}']
      : ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
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

module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        blood: '#67000c'
      },
      height: {
        content: 'calc(100vh - 52px)'
      },
      inset: {
        header: '52px'
      }
    }
  },
  mode: 'jit'
}

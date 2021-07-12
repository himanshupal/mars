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
      height: {
        content: 'calc(100vh - 80px)'
      },
      boxShadow: {
        'b-2': '0 2px white'
      },
      backgroundImage: (theme) => ({
        contact: 'url("/background/contact.jpg")'
      })
    }
  },
  mode: 'jit'
}

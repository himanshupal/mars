module.exports = {
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
  }
}

export default {
  methods: {
    numericOnly(e: KeyboardEvent) {
      if (/[\d]/.test(e.key)) return true
      e.preventDefault()
    },

    alphaOnly(e: KeyboardEvent) {
      if (/[a-z\sA-Z]+/.test(e.key)) return true
      e.preventDefault()
    },

    charsOnly(e: KeyboardEvent) {
      if (/^[a-z\sA-Z\d,./]+$/.test(e.key)) return true
      e.preventDefault()
    },

    emailCharsOnly(e: KeyboardEvent) {
      if (/^[a-zA-Z0-9@._\-]+$/.test(e.key)) return true
      e.preventDefault()
    }
  }
}

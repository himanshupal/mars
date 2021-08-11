export default {
  computed: {
    today() {
      const date: Date = new Date()
      const year: number = date.getFullYear()
      const month: number = date.getMonth() + 1
      const today: number = date.getDate()

      return `${year}-${month.toString().length === 1 ? `0${month}` : month}-${
        today.toString().length === 1 ? `0${today}` : today
      }`
    }
  }
}

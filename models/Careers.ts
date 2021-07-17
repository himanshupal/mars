interface Form {
  name: string
  email: string
  contact: string
  location: string
  position: string
  experience: number
  message: string
}

export interface Careers {
  jobSelected: boolean
  form: Form

  jobs: Array<{
    designation: string
    location?: string
    vacancies?: number
    description: string
    applyBy?: string
  }>
}

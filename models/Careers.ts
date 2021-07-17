import { ContactData } from './Contact'

export interface Form extends ContactData {
  position?: string
  experience?: number | string
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

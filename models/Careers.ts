import { FormModel } from './FormModel'

export interface Job {
  designation: string
  description: string
  vacancies?: number
  location?: string
  applyBy?: string
}

interface CareerForm extends FormModel {
  position: string
  experience: number
}

export interface Careers {
  form: CareerForm
  mobileError: string
  jobSelected: boolean
  jobs: Array<Job>
}

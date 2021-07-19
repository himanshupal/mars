import { Form } from './Careers'

export interface TrainingForm extends Form {
  course: string
  semester: string
  college: string
  enquiryFor: string
}

export interface Training {
  slides: Array<{
    title: string
    image: string
  }>
  trainings: Array<{
    title: string
    duration?: string
    description: string
    cost?: number
  }>
  form: TrainingForm
  trainingSelected: boolean
}

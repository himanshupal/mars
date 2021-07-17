import { Form } from './Careers'

interface Courses {
  title: string
  duration?: string
  description: string
  cost?: number
}

export interface TrainingForm extends Form {
  course: string
  semester: string
  college: string
  enquiryAbout: string
}

export interface Training {
  slides: Array<{
    title: string
    image: string
  }>
  trainings: {
    IT: Array<Courses>
    'NON-IT'?: Array<Courses>
  }
  form: TrainingForm
}

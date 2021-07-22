import { FormModel } from './FormModel'
import { PropsModel } from './PropsModel'

export interface TrainingForm extends FormModel {
  course: string
  medium: string
  college: string
  enquiryFor: string
}

export interface Training {
  title: string
  duration?: string
  description: string
  cost?: number
}
export interface TrainingModel {
  slides: Array<PropsModel>
  testimonials: Array<PropsModel>
  trainings: Array<Training>
  form: TrainingForm
  trainingSelected: boolean
  mobileError: string
  mediumError: string
}

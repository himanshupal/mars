import { FormModel } from './FormModel'
import { FirebaseApp } from '@firebase/app'

export interface Contact {
  name: string
  mobile: string
  email: string
  location: string
  message: string

  mobileError: string
  app: FirebaseApp
}

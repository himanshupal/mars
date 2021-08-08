import Vue from 'vue'
import { FirebaseApp } from '@firebase/app'

export interface Admin extends Vue {
  app: FirebaseApp
}

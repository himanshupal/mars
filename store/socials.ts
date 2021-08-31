import { NuxtState } from '@nuxt/types/app'

export const state = () => ({
  email: '',
  facebook: '',
  instagram: '',
  linkedIn: '',
  whatsApp: ''
})

export const mutations = {
  setSocials(state: NuxtState, socials: Record<string, string>) {
    state.email = socials.email
    state.facebook = socials.facebook
    state.instagram = socials.instagram
    state.linkedIn = socials.linkedIn
    state.whatsApp = socials.whatsApp
  }
}

export const actions = {
  saveSocials(state: NuxtState, socials: Record<string, string>) {
    state.commit('setSocials', socials)
  }
}

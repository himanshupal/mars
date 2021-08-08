import { NuxtState } from '@nuxt/types/app'

export const state = () => ({})

export const mutations = {
  setUser(state: NuxtState, user: any) {
    state.user = user
  }
}

export const actions = {
  saveUser(state: NuxtState, user: any) {
    state.commit('setUser', user)
  }
}

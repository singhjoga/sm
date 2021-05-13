import { User, authApi } from '../../api/auth'
import { createStore } from 'vuex'
/*
const state = {
  loggedUser: null
}
*/

const allGetters = {
  loggedUser: (state: any) => {
    return state.loggedUser;
  }
}
const actions = {
  async login(context: any, credentials: any) {
    const user = await authApi.loginUserKeycloak()
    context.commit('setLoggedUser', user)
    return user
  },
  async loginChanged(context: any) {
    const user = await authApi.getUser()
    context.commit('setLoggedUser', user)
    return user
  },

  async logout(context: any) {
    const user = await authApi.logoutUser()
    context.commit('setLoggedUser', null)
  }

}
const mutations = {
  setLoggedUser(state: any, user: any) {
    state.loggedUser = user
  }
}
export const authModule = {
  namespaced: true,
  state: () => ({
    loggedUser: authApi.getUser() // {email:'joga.singh@gmail.com'}
  }),
  mutations: mutations,
  getters: allGetters,
  actions: actions
}
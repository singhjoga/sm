import { User, api } from '../../api/auth'
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
  login(context: any, user: any) {
    context.commit('setLoggedUser', user)
  },
  logout(context: any) {
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
    loggedUser: api.getUser() // {email:'joga.singh@gmail.com'}
  }),
  mutations: mutations,
  getters:allGetters,
  actions: actions
}
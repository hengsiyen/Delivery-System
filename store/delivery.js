import Vue from 'vue'

export const state = () => ({
  select_driver: null
})

export const getters = {
  select_driver: state => state.select_driver
}

export const mutations = {
  setDriver (state, data) {
    Vue.set(state, 'select_driver', data)
  }
}

export const actions = {
  setDriver ({ commit, state }, data) {
    commit('setDriver', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

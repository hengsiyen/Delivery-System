import Vue from 'vue'

export const state = () => ({
  shop: null
})

export const getters = {
  shop: state => state.shop
}

export const mutations = {
  setShop (state, data) {
    Vue.set(state, 'shop', data)
  }
}

export const actions = {
  setShop ({ commit, state }, data) {
    commit('setShop', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

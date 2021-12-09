import Vue from 'vue'

export const state = () => ({
  shop: null,
  third_party: null
})

export const getters = {
  shop: state => state.shop,
  third_party: state => state.third_party
}

export const mutations = {
  setShop (state, data) {
    Vue.set(state, 'shop', data)
  },
  setThirdParty (state, data) {
    Vue.set(state, 'third_party', data)
  }
}

export const actions = {
  setShop ({ commit, state }, data) {
    commit('setShop', data)
  },
  setThirdParty ({ commit, state }, data) {
    commit('setThirdParty', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

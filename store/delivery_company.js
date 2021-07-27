import Vue from 'vue'

export const state = () => ({
  delivery_company: null,
  exchange: null,
  number_per_page: 30,
  num_format_km: '0,0',
  num_format_en: '0,0.00',
  currencies: []
})

export const getters = {
  dc_exchange_rate: state => state.exchange,
  delivery_company: state => state.delivery_company,
  dcid: (state) => {
    if (state.delivery_company) {
      return state.delivery_company._id
    }
    return null
  },
  number_per_page: state => state.number_per_page,
  num_format_km: state => state.num_format_km,
  num_format_en: state => state.num_format_en,
  currencies: state => state.currencies
}

export const mutations = {
  setDeliveryCompany (state, data) {
    Vue.set(state, 'delivery_company', data)
  },
  setExchangeRate (state, data) {
    Vue.set(state, 'exchange', data)
  },
  setCurrency (state, data) {
    Vue.set(state, 'currencies', data)
  }
}

export const actions = {
  setDeliveryCompany ({ commit, state }, data) {
    commit('setDeliveryCompany', data)
  },
  setExchangeRate ({ commit, state }, data) {
    commit('setExchangeRate', data)
  },
  setCurrency ({ commit, state }, data) {
    commit('setCurrency', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

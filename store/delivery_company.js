import Vue from 'vue'

export const state = () => ({
  delivery_company: {
    _id: null
  },
  exchange: {
    value: 4100
  },
  number_per_page: 30,
  currencies: [
    {
      _id: '60e5635aeafdaf46ed79b957',
      name_en: 'Riel',
      name_km: 'រៀល',
      code: 'KHR',
      symbol: '៛'
    },
    {
      _id: '60e5635aeafdaf46ed79b958',
      name_en: 'Dollar',
      name_km: 'ដុល្លា',
      code: 'USD',
      symbol: '$'
    }
  ]
})

export const getters = {
  dc_exchange_rate: state => state.exchange,
  delivery_company: state => state.delivery_company,
  dcid: state => state.delivery_company._id,
  number_per_page: state => state.number_per_page,
  currencies: state => state.currencies
}

export const mutations = {
  setDeliveryCompany (state, data) {
    Vue.set(state, 'delivery_company', data)
  }
}

export const actions = {
  setDeliveryCompany ({ commit, state }, data) {
    commit('setDeliveryCompany', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

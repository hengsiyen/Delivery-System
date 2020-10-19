import Vue from 'vue'

// eslint-disable-next-line no-console

export const state = () => ({
  data: null,
  administrators: [
    process.env.VUE_APP_ROLE_ADMIN,
    'admin'
  ]
})

export const getters = {
  getUser: (state, getters, rootState) => {
    return state.data
  },
  isAdmin: (state) => {
    if (state.data) {
      return state.data.roles.some(role => state.administrators.includes(role))
    } else {
      return false
    }
  }
}

export const mutations = {
  setUser (state, data) {
    if (!state.data) {
      Vue.set(state, 'data', {})
    }
    for (const attribute of Object.keys(data.user)) {
      if (!['roles', 'permissions'].includes(attribute)) {
        Vue.set(state.data, attribute, data.user[attribute])
      }
    }
  },
  setRoles (state, roles) {
    if (state.data) {
      state.data.roles = roles
    } else {
      console.log('[Roles]: User data not yet defined')
    }
  },
  setPermissions (state, permissions) {
    if (state.data) {
      state.data.permissions = permissions
    } else {
      console.log('[Permissions]: User data not yet defined')
    }
  },

  clearUser (state) {
    state.data = null
  }
}

export const actions = {
  setUser ({ commit, state }, data) {
    commit('setUser', data)
  },
  setRoles ({ commit, state }, data) {
    commit('setRoles', data)
  },
  setPermissions ({ commit, state }, data) {
    commit('setPermissions', data)
  },
  clearUser ({ commit, state }) {
    commit('clearUser')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

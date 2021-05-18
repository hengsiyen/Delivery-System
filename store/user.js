import Vue from 'vue'

// eslint-disable-next-line no-console
export const state = () => ({
  data: null,
  administrators: [
    'administrator',
    'admin'
  ]
})

export const getters = {
  getUser: (state) => {
    return state.data
  },

  isAdmin: (state) => {
    if (state.data && state.data.roles && Array.isArray(state.data.roles)) {
      return state.data.roles.some(role => state.administrators.includes(role))
    } else {
      return false
    }
  },

  getAvatar: (state) => {
    if (state.data && state.data.avatar) {
      return `${process.env.VUE_APP_API}/${state.data.avatar}`
    }
    return '/img/svgs/avatar.svg'
  },

  getRoles: (state) => {
    if (state.data && state.data.roles) {
      return state.data.roles
    }
    return []
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
  },

  setUserRolesPermissions (state, data) {
    const user = data.user
    Vue.set(data.user, 'permissions', data.permissions)
    Vue.set(data.user, 'roles', data.roles)

    state.data = user
  },

  setAvatar (state, avatar) {
    if (state.data && state.data.avatar) {
      state.data.avatar = avatar
    }
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
  },

  setUserRolesPermissions ({ commit }, data) {
    commit('setUserRolesPermissions', data)
  },

  setAvatar ({ commit }, avatar) {
    commit('setAvatar', avatar)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

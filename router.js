import Vue from 'vue'
import Router from 'vue-router'
import { authRouters } from '@/routes/auth'
import { defaultRouters } from '@/routes/default'
import store from '@/store'
import axios from 'axios'

Vue.use(Router)

export function createRouter () {
  const router = new Router({
    mode: 'history',
    routes: [
      authRouters,
      defaultRouters
    ]
  })

  const handleUserData = (to, from, next, callback) => {
    /**
     * If no user data, we need to fetch it first
     */
    console.log('BEFORE ENTER')
    console.log(store().state.user)
    if (process.client && store().state.user.data === null) {
      const _token = localStorage.getItem(process.env.VUE_APP_TOKEN)

      /**
       * Token must be defined in localstorage in order to fetch user data,
       * Otherwise, it will redirect to login page
       */
      if (_token) {
        axios.post(process.env.VUE_APP_API + '/api/backend/user/get-roles-and-permissions', null, {
          headers: {
            Authorization: 'Bearer ' + _token,
            Accept: 'application/json'
          }
        }).then((response) => {
          const result = response.data.data
          try {
            store().dispatch('user/setUser', { user: result.user })
            // store roles
            store().dispatch('user/setRoles', result.roles)
            // store permission
            store().dispatch('user/setPermissions', result.permissions)
            console.log('AFTER ENTER')
            console.log(store().state.user)
            callback()
          } catch (e) {
            console.log(e)
          }
        }).catch((error) => {
          if (error.response && error.response.status === 401) {
            localStorage.clear()
            store().dispatch('user/clearUser')
            next({ name: 'login' })
          } else {
            next()
          }
        })
      } else {
        localStorage.clear()
        store().dispatch('user/clearUser')
        next({ name: 'login' })
      }
    } else {
      callback()
    }
  }

  router.beforeEach((to, from, next) => {
    if (process.client && document.querySelector('.wrapper')) {
      document.querySelector('.wrapper').scrollTo(0, 0)
    }
    /**
     * User should go to login page when already login
     */
    if (to.name === 'login' && process.client && localStorage.getItem(process.env.VUE_APP_TOKEN)) {
      next({ name: 'admin', replace: true })
      return
    }

    /**
     * Need to defined noAuth meta on unprotected route
     * Any unprotected route, no need to check, just proceed
     */
    if (to.meta.noAuth) {
      next()
      return
    }

    handleUserData(to, from, next, () => {
      let userRoles = []
      if (store().state.user.data && store().state.user.data.roles.roles) {
        userRoles = store().state.user.data.roles
      }
      let rolesQualified = true
      if (!store().getters['user/isAdmin']) {
        for (const route of to.matched) {
          const qualifiedAtRoute = route.meta.roles ? userRoles.some(role => route.meta.roles.includes(role)) : true
          if (!qualifiedAtRoute) {
            rolesQualified = false
            break
          }
        }
      }

      let permissionsQualified = true
      if (rolesQualified) {
        let userPermissions = []
        if (store().state.user.data && store().state.user.data.permissions) {
          userPermissions = store().state.user.data.permissions
        }
        if (!store().getters['user/isAdmin']) {
          for (const route of to.matched) {
            const qualifiedAtRoute = route.meta.permissions ? userPermissions.some(permission => route.meta.permissions.includes(permission)) : true
            if (!qualifiedAtRoute) {
              permissionsQualified = false
              break
            }
          }
        }
      }

      if (rolesQualified && permissionsQualified) {
        next()
      } else {
        next({ name: 'login' })
      }
    })
  })

  return router
}

export default function ({ route, store, redirect, $axios, $storage, $cookies }) {
  const _token = $cookies.get(process.env.VUE_APP_TOKEN)

  const redirectLoginPage = () => {
    $cookies.remove(process.env.VUE_APP_TOKEN)
    $cookies.remove(process.env.VUE_APP_REFRESH_TOKEN)
    return redirect('/login')
  }

  const handleUserData = (route, callback) => {
    /**
     * Token must be defined in localstorage in order to fetch user data,
     * Otherwise, it will redirect to login page
     */
    if (_token) {
      $axios.setHeader('Authorization', 'Bearer ' + _token)
      $axios.setHeader('Accept', 'application/json')

      // if (!(store.state && store.state.user && store.state.user.data)) {
      if (!_token) {
        $axios.post(process.env.VUE_APP_API + '/api/backend/user/get-roles-and-permissions')
          .then(({ data }) => {
            if (data.data) {
              const result = data.data
              // store user, roles and permissions
              store.dispatch('user/setUser', { user: result.user })
              store.dispatch('user/setRoles', result.roles)
              store.dispatch('user/setPermissions', result.permissions)
              callback()
            }
          }).catch((error) => {
            if (error.response && error.response.status === 422) {
              redirectLoginPage()
            } else {
              return redirect()
            }
          })
      }
    } else {
      redirectLoginPage()
    }
  }

  handleUserData(route, () => {
    let userRoles = []
    let rolesQualified = true
    let permissionsQualified = true

    if (process.client) {
      if (store.state.user.data && store.state.user.data.roles) {
        userRoles = store.state.user.data.roles
      }
      if (!store.getters['user/isAdmin'] && route.matched) {
        // eslint-disable-next-line no-use-before-define
        for (const route of route.matched) {
          const qualifiedAtRoute = route.meta.roles ? userRoles.some(role => route.meta.roles.includes(role)) : true
          if (!qualifiedAtRoute) {
            rolesQualified = false
            break
          }
        }
      }

      if (rolesQualified) {
        let userPermissions = []
        if (store.state.user.data && store.state.user.data.permissions) {
          userPermissions = store.state.user.data.permissions
        }
        if (!store.getters['user/isAdmin'] && route.matched) {
          // eslint-disable-next-line no-use-before-define
          for (const route of route.matched) {
            const qualifiedAtRoute = route.meta.permissions ? userPermissions.some(permission => route.meta.permissions.includes(permission)) : true
            if (!qualifiedAtRoute) {
              permissionsQualified = false
              break
            }
          }
        }
      }
    }

    if (rolesQualified && permissionsQualified) {
      return redirect()
    } else {
      return redirect('/apps/unauthorized')
    }
  })
}

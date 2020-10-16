<template>
  <div class="wrapper">
    <Header />
    <Sidebar />
    <div class="content-wrapper">
      <Breadcrumb />
      <section class="content container-fluid">
        <Nuxt />
      </section>
    </div>
    <Footer />
    <ControlSidebar />
    <ControlSidebarBg />
  </div>
</template>

<script>
import Vue from 'vue'
import helpers from '../plugins/helpers'
import Permissions from '../permissions'
import Sidebar from '~/partials/Sidebar'
import Header from '~/partials/Header'
import Footer from '~/partials/Footer'
import ControlSidebar from '~/partials/ControlSidebar'
import ControlSidebarBg from '~/partials/ControlSidebarBg'
import Breadcrumb from '~/partials/Breadcrumb'

Vue.use(helpers)

Vue.prototype.$base_api = process.env.VUE_APP_API
Vue.prototype.$token = process.env.VUE_APP_TOKEN
Vue.prototype.$Permissions = Permissions
Vue.prototype.$env = process.env

export default {
  components: {
    Breadcrumb,
    ControlSidebarBg,
    ControlSidebar,
    Footer,
    Sidebar,
    Header
  },
  head () {
    return {
      bodyAttrs: {
        class: 'hold-transition skin-blue sidebar-mini'
      }
    }
  },
  middleware ({ store, redirect, $storage }) {
    function clearUser () {
      localStorage.clear()
      store.dispatch('user/clearUser')
      redirect('/')
    }

    if (process.client && !store.state.user.data) {
      console.log('test')
      const _token = $storage.getLocalStorage(process.env.VUE_APP_TOKEN)

      if (_token) {
        this.$axios.post(process.env.VUE_APP_API + '/api/backend/user/get-roles-and-permissions')
          .then((response) => {
            const result = response.data.data
            store.dispatch('user/setUser', { user: result.user })
            // store roles
            store.dispatch('user/setRoles', result.roles)
            // store permission
            store.dispatch('user/setPermissions', result.permissions)
          })
          .catch((error) => {
            if (error.response && error.response.status === 401) {
              clearUser()
            }
          })
      } else {
        clearUser()
      }
    }
  }
}
</script>

<style>
.wrapper {
  height: 100vh !important;
}
</style>

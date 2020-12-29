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
import helpers from '~/plugins/helpers'
import Permissions from '~/permissions'
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
  name: 'Admin',
  components: {
    Breadcrumb,
    ControlSidebarBg,
    ControlSidebar,
    Footer,
    Sidebar,
    Header
  },
  mounted () {
    this.showSwalSuccess()
    this.showToastr()
  }
}
</script>

<style>
.wrapper {
  height: 100vh !important;
}
</style>

<template>
  <div class="wrapper">
    <Header />
    <Sidebar />
    <div class="content-wrapper">
      <Breadcrumb />
      <div class="content">
        <div class="container-fluid">
          <Nuxt />
        </div>
      </div>
    </div>
    <Footer />
    <ControlSidebar />
    <ControlSidebarBg />
  </div>
</template>

<script>
import Vue from 'vue'
import Sidebar from '@/components/Layouts/Sidebar'
import Header from '@/components/Layouts/Header'
import Footer from '@/components/Layouts/Footer'
import ControlSidebar from '@/components/Layouts/ControlSidebar'
import ControlSidebarBg from '@/components/Layouts/ControlSidebarBg'
import Breadcrumb from '@/components/Layouts/Breadcrumb'
import Permissions from '~/permissions'
import helpers from '~/plugins/helpers'

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
    // this.showSwalSuccess()
    // this.showToastr()
  }
}
</script>

<style>

</style>

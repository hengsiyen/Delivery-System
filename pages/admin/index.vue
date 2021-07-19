<template>
  <div class="wrapper">
    <Header />
    <Sidebar />
    <div class="content-wrapper">
      <div class="content">
        <div class="container-fluid">
          <Nuxt />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Vue from 'vue'
import Sidebar from '@/components/Layouts/Sidebar'
import Header from '@/components/Layouts/Header'
import Footer from '@/components/Layouts/Footer'
import { mapGetters } from 'vuex'
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
    Footer,
    Sidebar,
    Header
  },
  computed: {
    ...mapGetters({
      delivery_company: 'delivery_company/delivery_company'
    })
  },
  mounted () {
    if (!this.delivery_company._id) {
      const deliveryCompany = this.$cookies.get('dc')
      this.$store.dispatch('delivery_company/setDeliveryCompany', deliveryCompany)
    }
  }
}
</script>

<style>

</style>

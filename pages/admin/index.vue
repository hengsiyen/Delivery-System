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
import helpers from '~/plugins/helpers'

Vue.use(helpers)

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

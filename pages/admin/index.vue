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
  </div>
</template>

<script>
import Vue from 'vue'
import Sidebar from '@/components/Layouts/Sidebar'
import Header from '@/components/Layouts/Header'
import Footer from '@/components/Layouts/Footer'
import { mapGetters } from 'vuex'
import helpers from '@/plugins/helpers'
import Breadcrumb from '@/components/Layouts/Breadcrumb'

Vue.use(helpers)

export default {
  name: 'Admin',
  components: {
    Breadcrumb,
    Footer,
    Sidebar,
    Header
  },
  computed: {
    ...mapGetters({
      delivery_company: 'delivery_company/delivery_company',
      exchange: 'delivery_company/dc_exchange_rate',
      currencies: 'delivery_company/currencies',
      package_types: 'delivery_company/package_types',
      payment_types: 'delivery_company/payment_types',
      currency: 'delivery_company/currency',
      display_roles: 'user/getDisplayRoles',
      user: 'user/getUser'
    })
  },
  beforeMount () {
    if (!this.delivery_company) {
      const deliveryCompany = localStorage.getItem('dc')
      this.$store.dispatch('delivery_company/setDeliveryCompany', JSON.parse(deliveryCompany))
    }
    if (!this.currency) {
      if (localStorage.hasOwnProperty('dc_currency') && localStorage.getItem('dc_currency')) {
        const currency = localStorage.getItem('dc_currency')
        this.$store.dispatch('delivery_company/setCurrency', JSON.parse(currency))
      }
    }
    if (!this.exchange) {
      const exchange = this.$cookies.get('dc_exchange')
      this.$store.dispatch('delivery_company/setExchangeRate', exchange)
    }
    if (!(this.currencies && this.currencies.length)) {
      if (localStorage.hasOwnProperty('currencies') && localStorage.getItem('currencies')) {
        const currencies = localStorage.getItem('currencies')
        this.$store.dispatch('delivery_company/setCurrencies', JSON.parse(currencies))
      }
    }
    if (!(this.package_types && this.package_types.length)) {
      if (localStorage.hasOwnProperty('package_types') && localStorage.getItem('package_types')) {
        const packageTypes = localStorage.getItem('package_types')
        this.$store.dispatch('delivery_company/setPackageTypes', JSON.parse(packageTypes))
      }
    }
    if (!(this.payment_types && this.payment_types.length)) {
      if (localStorage.hasOwnProperty('payment_types') && localStorage.getItem('payment_types')) {
        const paymentTypes = localStorage.getItem('payment_types')
        this.$store.dispatch('delivery_company/setPaymentTypes', JSON.parse(paymentTypes))
      }
    }
    if (this.display_roles && this.display_roles.length === 0) {
      const displayRoles = this.$cookies.get('roles')
      this.$store.dispatch('user/setDisplayRoles', displayRoles)
    }
  }
  // mounted () {
  //   $('[data-widget="treeview"]').Treeview('init')
  // }
}
</script>

<style>

</style>

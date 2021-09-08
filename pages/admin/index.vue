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
      delivery_company: 'delivery_company/delivery_company',
      exchange: 'delivery_company/dc_exchange_rate',
      currencies: 'delivery_company/currencies',
      currency: 'delivery_company/currency'
    })
  },
  beforeMount () {
    if (!this.delivery_company) {
      const deliveryCompany = localStorage.getItem('dc')
      this.$store.dispatch('delivery_company/setDeliveryCompany', JSON.parse(deliveryCompany))
    }
    if (!this.currency) {
      const currency = this.$cookies.get('dc_currency')
      this.$store.dispatch('delivery_company/setCurrency', currency)
    }
    if (!this.exchange) {
      const exchange = this.$cookies.get('dc_exchange')
      this.$store.dispatch('delivery_company/setExchangeRate', exchange)
    }
    if (!(this.currencies && this.currencies.length)) {
      const currencies = this.$cookies.get('currencies')
      this.$store.dispatch('delivery_company/setCurrencies', currencies)
    }
  },
  mounted () {
    $('[data-widget="treeview"]').Treeview('init')
  }
}
</script>

<style>

</style>

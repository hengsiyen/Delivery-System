<template>
  <div>
    <HeaderMobile />
    <div class="mobile-content-h">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import HeaderMobile from '@/components/Layouts/HeaderMobile'
import { mapGetters } from 'vuex'
export default {
  name: 'MobileIndex',
  components: { HeaderMobile },
  computed: {
    ...mapGetters({
      delivery_company: 'delivery_company/delivery_company',
      exchange: 'delivery_company/dc_exchange_rate',
      currencies: 'delivery_company/currencies',
      currency: 'delivery_company/currency',
      display_roles: 'user/getDisplayRoles'
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
    if (!(this.currencies && this.currencies.length === 0)) {
      const currencies = this.$cookies.get('currencies')
      this.$store.dispatch('delivery_company/setCurrencies', currencies)
    }
    if (this.display_roles && this.display_roles.length === 0) {
      const displayRoles = this.$cookies.get('roles')
      this.$store.dispatch('user/setDisplayRoles', displayRoles)
    }
  }
}
</script>

<style scoped>
.mobile-content-h {
  height: calc(100vh - 75px);
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
}
</style>

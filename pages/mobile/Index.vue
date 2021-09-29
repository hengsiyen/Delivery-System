<template>
  <Nuxt />
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MobileIndex',
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
    if (!this.user) {
      const getUser = localStorage.getItem('user')
      const user = JSON.parse(getUser)
      this.$store.dispatch('user/setUserRolesPermissions', {
        user,
        permission: user.permission,
        roles: user.roles
      })
    }
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
}
</script>

<style scoped>

</style>

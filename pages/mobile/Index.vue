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
    if (!(this.package_types && this.package_types.length)) {
      const packageTypes = this.$cookies.get('package_types')
      this.$store.dispatch('delivery_company/setPackageTypes', packageTypes)
    }
    if (!(this.payment_types && this.payment_types.length)) {
      const paymentTypes = this.$cookies.get('payment_types')
      this.$store.dispatch('delivery_company/setPaymentTypes', paymentTypes)
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

<template>
  <PaymentTypeForm />
</template>

<script>
import PaymentTypeForm from '@/pages/admin/settings/paymentType/Form'
export default {
  name: 'PaymentTypeCreate',
  components: { PaymentTypeForm },
  head () {
    return {
      title: this.$t('title.addNewPaymentType'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <PaymentTypeForm is-edit="true" :old-data="oldDataPaymentType" />
</template>

<script>
import PaymentTypeForm from '@/pages/admin/settings/paymentType/Form'
export default {
  name: 'PaymentTypeEdit',
  components: { PaymentTypeForm },
  asyncData (ctx) {
    if (ctx.route.params.id) {
      return ctx.$axios
        .post(ctx.env.VUE_APP_API + '/api/backend/payment-type/show', {
          id: ctx.route.params.id
        })
        .then((res) => {
          const result = res.data.data
          return {
            oldDataPaymentType: result
          }
        }).catch(() => {
          return {
            oldDataPaymentType: null
          }
        })
    } else {
      return {
        oldDataPaymentType: null
      }
    }
  }
}
</script>

<style scoped>

</style>

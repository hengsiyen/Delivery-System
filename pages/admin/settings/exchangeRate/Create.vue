<template>
  <ExchangeRateForm />
</template>

<script>
import ExchangeRateForm from '@/pages/admin/settings/exchangeRate/Form'
export default {
  name: 'Create',
  components: { ExchangeRateForm },
  head () {
    return {
      title: this.$t('title.addNewExchangeRate'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  }
}
</script>

<style scoped>

</style>

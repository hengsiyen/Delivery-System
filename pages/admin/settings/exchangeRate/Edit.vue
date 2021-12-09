<template>
  <ExchangeRateForm is-edit title="label.edit" />
</template>

<script>
import ExchangeRateForm from '@/pages/admin/settings/exchangeRate/Form'
export default {
  name: 'Edit',
  components: { ExchangeRateForm },
  head () {
    return {
      title: this.$t('title.editExchangeRate'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  }
}
</script>

<style scoped>

</style>

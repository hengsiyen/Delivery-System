<template>
  <CurrencyForm />
</template>

<script>
import CurrencyForm from '@/pages/admin/settings/currency/Form'
export default {
  name: 'Create',
  components: { CurrencyForm },
  head () {
    return {
      title: this.$t('title.addNewCurrency'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  }
}
</script>

<style scoped>

</style>

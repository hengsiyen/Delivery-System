<template>
  <CurrencyForm is-edit title="label.edit" />
</template>

<script>
import CurrencyForm from '@/pages/admin/settings/currency/Form'
export default {
  name: 'Edit',
  components: { CurrencyForm },
  head () {
    return {
      title: this.$t('title.editCurrency'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  }
}
</script>

<style scoped>

</style>

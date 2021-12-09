<template>
  <Nuxt />
</template>

<script>
export default {
  name: 'InvoiceIndex',
  head () {
    return {
      title: this.$t('menu.invoice'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  }
}
</script>

<style scoped>

</style>

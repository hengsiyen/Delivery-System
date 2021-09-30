<template>
  <Nuxt />
</template>

<script>
export default {
  name: 'DeliveryIndex',
  head () {
    return {
      title: this.$t('menu.delivery'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  }
}
</script>

<style scoped>

</style>

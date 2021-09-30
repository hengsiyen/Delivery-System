<template>
  <Nuxt />
</template>

<script>
export default {
  name: 'TrackingIndex',
  components: { },
  head () {
    return {
      title: this.$t('menu.tracking'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  }
}
</script>

<style scoped>

</style>

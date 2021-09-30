<template>
  <Nuxt />
</template>

<script>
export default {
  name: 'PackageIndex',
  head () {
    return {
      title: this.$t('menu.package'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  }
}
</script>

<style scoped>

</style>

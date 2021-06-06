<template>
  <Nuxt />
</template>

<script>
export default {
  name: 'App',
  middleware: 'auth',
  head () {
    return {
      bodyAttrs: {
        class: 'hold-transition sidebar-mini'
      }
    }
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>

<style scoped>

</style>

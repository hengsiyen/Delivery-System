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
        class: 'hold-transition skin-blue sidebar-mini'
      }
    }
  }
}
</script>

<style scoped>

</style>

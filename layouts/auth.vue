<template>
  <Nuxt />
</template>

<script>
export default {
  name: 'Auth',
  layout: 'auth',
  middleware: 'guest',
  head () {
    return {
      bodyAttrs: {
        class: 'hold-transition login-page'
      }
    }
  }
}
</script>

<style scoped>

</style>

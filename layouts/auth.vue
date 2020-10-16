<template>
  <Nuxt />
</template>

<script>
export default {
  name: 'Auth',
  layout: 'auth',
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

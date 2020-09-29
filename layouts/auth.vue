<template>
  <Nuxt />
</template>

<script>
export default {
  name: 'Auth',
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

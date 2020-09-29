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
      },
      script: [
        { src: 'js/adminlte/icheck.min.js' },
        { src: 'js/login.js' }
      ]
    }
  }
}
</script>

<style scoped>

</style>

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
  },
  mounted () {
    this.getUserInfo()
    $(document).ready(function () {
      $(document.body).tooltip({ selector: '[title]' })
    })
  }
}
</script>

<style scoped>

</style>

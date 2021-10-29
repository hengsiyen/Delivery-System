<template>
  <Nuxt />
</template>

<script>
export default {
  name: 'App',
  middleware: 'auth',
  head () {
    return {
      bodyAttrs: this.bodyAttrs
    }
  },
  computed: {
    bodyAttrs () {
      if (this.window_width && this.window_width <= 991) {
        return {
          class: 'sidebar-mini layout-fixed sidebar-closed sidebar-collapse'
        }
      } else {
        return {
          class: 'hold-transition sidebar-mini'
        }
      }
    }
  },
  beforeMount () {
    // eslint-disable-next-line nuxt/no-env-in-hooks
    if (process.browser && process.client) {
      window.addEventListener('resize', this.resizeWindow)
    }
  },
  methods: {
    resizeWindow (e) {
      this.window_width = document.documentElement.clientWidth
    }
  },
  mounted () {
    this.getUserInfo()
  },
  destroyed () {
    window.removeEventListener('resize', this.resizeWindow)
  }
}
</script>

<style scoped>

</style>

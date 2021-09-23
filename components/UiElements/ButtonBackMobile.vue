<template>
  <li class="nav-item">
    <a
      class="nav-link text-dark"
      @click="hasHistory ? $router.back(-1) : $router.push('/')"
    >
      <i class="fas fa-arrow-left" />
    </a>
  </li>
</template>

<script>
export default {
  name: 'ButtonBackMobile',
  methods: {
    hasHistory () {
      this.$emit('cancel-action')
      return window.history.length > 2
    }
  }
}
</script>

<style scoped>

</style>

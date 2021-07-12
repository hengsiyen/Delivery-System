<template>
  <button
    class="btn btn-light btn-sm"
    @click="hasHistory ? $router.back(-1) : $router.push('/')"
  >
    <i class="fas fa-arrow-left mr-2" />
    <strong>{{ $t('button.back') }}</strong>
  </button>
</template>

<script>
export default {
  name: 'ButtonBack',
  methods: {
    hasHistory () { return window.history.length > 2 }
  }
}
</script>

<style scoped>

</style>

<template>
  <button
    class="btn btn-default btn-sm"
    @click="hasHistory()
      ? $router.go(-1)
      : $router.push('/')"
  >
    {{ $t('button.back') }}
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

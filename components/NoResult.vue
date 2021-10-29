<template>
  <div
    class="d-flex align-items-center justify-content-center rounded no-found text-capitalize"
    :class="customClass"
  >
    {{ $t(message) }}
  </div>
</template>

<script>
export default {
  name: 'NoResult',
  props: {
    message: {
      type: String,
      default: 'label.no_result_found'
    },
    customClass: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.no-found {
  height: 56px;
}
</style>

<template>
  <div class="d-flex align-items-center justify-content-center bg-light rounded no-found text-capitalize">
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
    }
  }
}
</script>

<style scoped>
.no-found {
  height: 56px;
}
</style>

<template>
  <div class="d-flex align-items-center justify-content-center bg-light rounded no-found text-capitalize">
    {{ $t('label.no_result_found') }}
  </div>
</template>

<script>
export default {
  name: 'NoResult'
}
</script>

<style scoped>
.no-found {
  height: 56px;
}
</style>

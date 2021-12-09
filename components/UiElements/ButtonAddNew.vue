<template>
  <NuxtLink :to="{name: linkTo}" :class="customClass">
    <i class="fas fa-plus mr-1" />
    <strong>{{ $t('btn.add_new') }}</strong>
  </NuxtLink>
</template>

<script>
export default {
  name: 'ButtonAddNew',
  props: {
    linkTo: {
      type: String,
      default: '/'
    },
    customClass: {
      type: String,
      default: 'btn btn-success btn-sm text-capitalize'
    }
  }
}
</script>

<style scoped>

</style>

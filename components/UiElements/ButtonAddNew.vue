<template>
  <NuxtLink :to="{name: linkTo}" class="btn btn-success btn-sm text-capitalize">
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
    }
  }
}
</script>

<style scoped>

</style>

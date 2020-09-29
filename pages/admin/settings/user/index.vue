<template>
  <div class="box box-primary">
    <div class="box-header with-border">
      <h3 class="box-title">
        {{ $t('menu.user') }}
      </h3>
    </div>
    <div class="box-body">
      <h3>Content</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  mounted () { },
  head () {
    return {
      title: this.$t('menu.user'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  }
}
</script>

<style scoped>

</style>

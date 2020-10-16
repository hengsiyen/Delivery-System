<template>
  <div class="row">
    <div class="col-md-12">
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">
            {{ $t('menu.dashboard') }}
          </h3>
        </div>
        <div v-if="appName" class="box-body">
          <h3>{{ $t('string.welcomeTo') }} {{ appName }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  head () {
    return {
      title: this.$t('menu.dashboard'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  },
  data () {
    return {
      appName: process.env.VUE_APP_NAME
    }
  }
}
</script>

<style scoped>

</style>

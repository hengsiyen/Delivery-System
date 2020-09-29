<template>
  <div class="row">
    <div class="col-md-12">
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">
            {{ $t('menu.dashboard') }}
          </h3>
        </div>
        <div class="box-body">
          <h3>{{ $t('string.welcomeTo') }} {{ config }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Dashboard',
  data () {
    return {
      config: process.env
    }
  },
  computed: {
    ...mapState({
      administrators: state => state.user.administrators
    })
  },
  head () {
    return {
      title: this.$t('menu.dashboard'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  }
}
</script>

<style scoped>

</style>

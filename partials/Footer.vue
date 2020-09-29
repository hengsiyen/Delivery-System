<template>
  <footer class="main-footer">
    <div class="pull-right hidden-xs">
      {{ $t('string.developedBy') }} <a href="http://asorasoft.com" target="_blank">Asorasoft.com</a>
    </div>
    &copy; 2019 {{ $t('string.allRightsReserved') }} <a :href="appUrl"><strong>{{ appName }}</strong></a>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      appName: process.env.VUE_APP_COMPANY_NAME,
      appUrl: process.env.VUE_APP_COMPANY_URL
    }
  }
}
</script>

<style scoped>

</style>

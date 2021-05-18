<template>
  <div class="row">
    <div class="col-md-12">
      <XBoxInfo
        img="/img/svgs/unauthorized.svg"
        :title="$t('string.unauthorized')"
      />
    </div>
  </div>
</template>

<script>
import XBoxInfo from '@/components/XBoxInfo'
export default {
  name: 'Unauthorized',
  head () {
    return {
      title: this.$t('string.unauthorized'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  },
  components: { XBoxInfo }
}
</script>

<style scoped>

</style>

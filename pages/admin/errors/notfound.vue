<template>
  <div class="row">
    <div class="col-md-12">
      <XBoxInfo
        img="/img/svgs/notfound.svg"
        :title="$t('string.pageNotFound')"
      />
    </div>
  </div>
</template>

<script>
import XBoxInfo from '@/components/XBoxInfo'

export default {
  name: 'Notfound',
  head () {
    return {
      title: this.$t('string.pageNotFound'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  },
  components: { XBoxInfo }
}
</script>

<style scoped>

</style>

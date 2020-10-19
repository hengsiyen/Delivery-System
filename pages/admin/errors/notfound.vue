<template>
  <div class="row">
    <div class="col-md-12">
      <box-information
        img="/img/svgs/notfound.svg"
        :title="$t('string.pageNotFound')"
      />
    </div>
  </div>
</template>

<script>
import BoxInformation from '~/components/BoxInformation'
export default {
  name: 'Notfound',
  head () {
    return {
      title: this.$t('string.pageNotFound'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  },
  components: { BoxInformation }
}
</script>

<style scoped>

</style>

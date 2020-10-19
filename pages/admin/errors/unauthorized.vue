<template>
  <div class="row">
    <div class="col-md-12">
      <box-information
        img="/img/svgs/unauthorized.svg"
        :title="$t('string.unauthorized')"
      />
    </div>
  </div>
</template>

<script>
import BoxInformation from '~/components/BoxInformation'
export default {
  name: 'Unauthorized',
  head () {
    return {
      title: this.$t('string.unauthorized'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  },
  components: { BoxInformation }
}
</script>

<style scoped>

</style>

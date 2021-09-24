<template>
  <PackageMobileForm is-edit title="label.edit_package" />
</template>

<script>
import PackageMobileForm from '@/pages/mobile/package/Form'
export default {
  name: 'PackageMobileEdit',
  components: { PackageMobileForm },
  head () {
    return {
      title: this.$t('label.edit_package'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  }
}
</script>

<style scoped>

</style>

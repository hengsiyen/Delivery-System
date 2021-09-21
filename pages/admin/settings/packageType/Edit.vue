<template>
  <PackageTypeForm is-edit title="label.edit" />
</template>

<script>
import PackageTypeForm from '@/pages/admin/settings/packageType/Form'
export default {
  name: 'PackageTypeEdit',
  components: { PackageTypeForm },
  head () {
    return {
      title: this.$t('title.editPackageType'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  }
}
</script>

<style scoped>

</style>

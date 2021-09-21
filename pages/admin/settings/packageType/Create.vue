<template>
  <PackageTypeForm />
</template>

<script>
import PackageTypeForm from '@/pages/admin/settings/packageType/Form'
export default {
  name: 'PackageTypeCreate',
  components: { PackageTypeForm },
  head () {
    return {
      title: this.$t('title.addNewPackageType'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  }
}
</script>

<style scoped>

</style>

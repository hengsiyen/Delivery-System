<template>
  <PackageMobileForm />
</template>

<script>
import PackageMobileForm from '@/pages/mobile/package/Form'
export default {
  name: 'PackageMobileCreate',
  components: { PackageMobileForm },
  head () {
    return {
      title: this.$t('label.create_package'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  }
}
</script>

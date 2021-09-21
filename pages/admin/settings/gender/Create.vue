<template>
  <GenderForm />
</template>

<script>
import GenderForm from '@/pages/admin/settings/gender/Form'
export default {
  name: 'Create',
  components: { GenderForm },
  head () {
    return {
      title: this.$t('title.addNewGender'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  }
}
</script>

<style scoped>

</style>

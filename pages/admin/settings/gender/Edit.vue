<template>
  <GenderForm is-edit title="label.edit" />
</template>

<script>
import GenderForm from '@/pages/admin/settings/gender/Form'
export default {
  name: 'Edit',
  components: { GenderForm },
  head () {
    return {
      title: this.$t('title.editGender'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  }
}
</script>

<style scoped>

</style>

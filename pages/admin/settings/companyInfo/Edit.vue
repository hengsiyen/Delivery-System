<template>
  <CompanyInfoForm is-edit title="label.edit" />
</template>

<script>
import CompanyInfoForm from '@/pages/admin/settings/companyInfo/Form'
export default {
  name: 'Edit',
  components: { CompanyInfoForm },
  head () {
    return {
      title: this.$t('title.editCompanyInfo'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  }
}
</script>

<style scoped>

</style>

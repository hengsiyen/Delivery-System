<template>
  <PartnerCompanyForm is-edit title="label.edit" />
</template>

<script>
import PartnerCompanyForm from '@/pages/admin/partner-company/Form'
export default {
  name: 'Edit',
  components: { PartnerCompanyForm },
  head () {
    return {
      title: this.$t('title.editPartnerCompany'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  }
}
</script>

<style scoped>

</style>

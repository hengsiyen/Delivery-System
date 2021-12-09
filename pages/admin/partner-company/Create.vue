<template>
  <PartnerCompanyForm />
</template>

<script>
import PartnerCompanyForm from '@/pages/admin/partner-company/Form'
export default {
  name: 'PartnerCompanyCreate',
  components: { PartnerCompanyForm },
  head () {
    return {
      title: this.$t('title.addNewPartnerCompany'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  }
}
</script>

<style scoped>

</style>

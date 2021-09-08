<template>
  <div class="row mt-3">
    <div class="col-md-3">
      <UserProfileSidebar />
    </div>
    <div class="col-md-9">
      <UserProfileContent />
    </div>
  </div>
</template>

<script>

import UserProfileSidebar from '@/pages/admin/account/_components/UserProfileSidebar'
import UserProfileContent from '@/pages/admin/account/_components/UserProfileContent'

export default {
  name: 'Index',
  components: {
    UserProfileContent,
    UserProfileSidebar
  },
  head () {
    return {
      title: this.$t('menu.account'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  }
}
</script>

<style scoped>

</style>

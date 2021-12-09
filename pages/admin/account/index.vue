<template>
  <div class="row">
    <div class="col-lg-6">
      <section class="content-header">
        <div class="row mb-2">
          <div class="col-12">
            <h1 class="m-0">
              {{ $t('menu.account') }}
            </h1>
          </div>
        </div>
      </section>
    </div>
    <div class="col-lg-6 d-flex align-items-center">
      <Breadcrumb />
    </div>
    <div class="col-lg-12">
      <div class="row">
        <div class="col-3">
          <UserProfileSidebar />
        </div>
        <div class="col-9">
          <UserProfileContent />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import UserProfileSidebar from '@/pages/admin/account/_components/UserProfileSidebar'
import UserProfileContent from '@/pages/admin/account/_components/UserProfileContent'
import Breadcrumb from '@/components/Layouts/Breadcrumb'

export default {
  name: 'Index',
  components: {
    Breadcrumb,
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

<template>
  <div class="row">
    <template v-if="can([$Permissions.backend.dashboard.show])">
      <div class="col-md-3">
        <XSmallBox
          bg="info"
          :number="box.domain"
          title="Houses"
          icon="fa fa-university"
        />
      </div>
      <div class="col-md-3">
        <XSmallBox
          :number="box.article"
          bg="yellow"
          title="Article"
          icon="fa fa-paperclip"
        />
      </div>
      <div class="col-md-3">
        <XSmallBox
          :number="box.user"
          bg="green"
          title="Users"
          icon="fa fa-users"
        />
      </div>
      <div class="col-md-3">
        <XSmallBox
          bg="red"
          :number="box.inbox"
          title="Inbox"
          icon="fa fa-inbox"
        />
      </div>
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-7">
            <XBox title="Monthly Report">
              <x-chart-line />
            </XBox>
          </div>
          <div class="col-md-5">
            <XBox title="Users and Collaborations">
              <x-chart-doughnut />
            </XBox>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <XBox title="Analytic">
          <x-chart-bar />
        </XBox>
      </div>
    </template>
  </div>
</template>

<script>

import XSmallBox from '@/components/Widgets/XSmallBox'
import XBox from '@/components/Widgets/XBox'

export default {
  name: 'Dashboard',
  components: { XBox, XSmallBox },
  head () {
    return {
      title: this.$t('menu.dashboard'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  },
  data () {
    return {
      box: {
        domain: '0',
        article: '0',
        user: '0',
        inbox: '0'
      }
    }
  }
}
</script>

<style scoped>

</style>

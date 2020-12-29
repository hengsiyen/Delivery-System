<template>
  <div class="row">
    <div class="col-md-12">
      <x-alert />
    </div>
    <template v-if="can([$Permissions.backend.dashboard.show])">
      <div class="col-md-3">
        <x-small-box
          :number="box.domain"
          title="Houses"
          icon="fa fa-university"
        />
      </div>
      <div class="col-md-3">
        <x-small-box
          :number="box.article"
          bg="yellow"
          title="Article"
          icon="fa fa-paperclip"
        />
      </div>
      <div class="col-md-3">
        <x-small-box
          :number="box.user"
          bg="green"
          title="Users"
          icon="fa fa-users"
        />
      </div>
      <div class="col-md-3">
        <x-small-box
          bg="red"
          :number="box.inbox"
          title="Inbox"
          icon="fa fa-inbox"
        />
      </div>
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-7">
            <x-box title="Monthly Report">
              <x-chart-line />
            </x-box>
          </div>
          <div class="col-md-5">
            <x-box title="Users and Collaborations">
              <x-chart-doughnut />
            </x-box>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <x-box title="Analytic">
          <x-chart-bar />
        </x-box>
      </div>
    </template>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
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

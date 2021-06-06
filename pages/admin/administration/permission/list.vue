<template>
  <div class="permission">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">
          {{ $t('label.permissions') }}
        </h3>
      </div>
      <div class="card-body">
        <div>
          <permission-tree :read-only="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PermissionTree from './_components/PermissionTree'

export default {
  name: 'List',
  head () {
    return {
      title: this.$t('string.permissionList'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  },
  components: { PermissionTree }
}
</script>

<style scoped>

</style>

<template>
  <div class="permission">
    <div class="box box-primary">
      <div class="box-header with-border">
        <h3 class="box-title">
          {{ $t('label.permissions') }}
        </h3>
      </div>
      <div class="box-body">
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

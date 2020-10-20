<template>
  <role-form
    :role="role"
    :validations="validations"
    :title="$t('label.newRole')"
    @submit="onSubmit"
  />
</template>

<script>
import RoleForm from './form'

export default {
  name: 'CreateRole',
  head () {
    return {
      title: this.$t('string.createNewRole'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  },
  components: {
    RoleForm
  },
  data () {
    return {
      validations: null,
      role: undefined
    }
  },
  methods: {
    onSubmit (role) {
      const self = this
      this.$isLoading(true)
      this.$axios.post(process.env.VUE_APP_API + '/api/backend/role/store', {
        name: role.name,
        guard_name: 'web',
        permissions: role.permissions.map(permission => (
          {
            id: permission.id,
            name: permission.name
          }
        )),
        display_name_en: role.display_name_en,
        display_name_km: role.display_name_km
      }).then(() => {
        self.$swal({
          title: self.$t('label.swal.success'),
          text: self.$t('label.roleCreated'),
          icon: 'success',
          confirmButtonText: self.$t('label.swal.yes')
        }).then(() => {
          this.$router.back()
        })
      }).catch((error) => {
        if (error.response.status === 422) {
          this.validations = error.response.data.errors
        } else {
          this.onResponseError(error)
        }
      }).finally(() => {
        this.$isLoading(false)
      })
    }
  }
}
</script>

<style scoped>

</style>

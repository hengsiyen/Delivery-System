<template>
  <role-form
    :role="role"
    :validations="validations"
    :title="$t('label.editRole')"
    @submit="onSubmit"
  />
</template>

<script>
import RoleForm from './form'

export default {
  name: 'EditRole',
  head () {
    return {
      title: this.$t('string.editNewRole'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  },
  components: {
    RoleForm
  },
  data () {
    return {
      role: undefined,
      validations: null
    }
  },
  methods: {
    onSubmit (role) {
      const self = this
      this.$axios.post(process.env.VUE_APP_API + '/api/backend/role/edit', {
        name: role.name,
        guard_name: 'web',
        permissions: role.permissions.map(permission => (
          {
            id: permission.id,
            name: permission.name
          }
        )),
        display_name_en: role.display_name_en,
        display_name_km: role.display_name_km,
        id: this.$route.params.id
      }).then(() => {
        self.$swal({
          title: self.$t('label.swal.success'),
          text: self.$t('label.roleCreated'),
          type: 'success',
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
      })
    },
    getRole (id) {
      this.$axios.post(process.env.VUE_APP_API + '/api/backend/role/get-role', {
        id
      }).then((response) => {
        this.role = response.data.data
      }).catch((error) => {
        this.onResponseError(error)
      })
    }
  },
  mounted () {
    this.getRole(this.$route.params.id)
  }
}
</script>

<style scoped>

</style>

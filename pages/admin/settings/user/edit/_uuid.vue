<template>
  <user-form
    ref="editForm"
    :user="user"
    :validations="validations"
    :title="$t('label.editUser')"
    @submit="onSubmit"
  />
</template>

<script>
import UserForm from './../form'

export default {
  name: 'Edit',
  head () {
    return {
      title: this.$t('label.editUser'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  },
  components: {
    UserForm
  },
  data () {
    return {
      validations: null,
      user: undefined
    }
  },
  methods: {
    onSubmit (user) {
      this.$isLoading(true)
      const permissions = user.permissions.map(permission => ({
        id: permission.id,
        name: permission.name
      }))
      this.$axios.post(process.env.VUE_APP_API + '/api/backend/user/update', {
        ...{ ...user, permissions }
      }).then(() => {
        this.$toastr('success', this.$t('string.theRequestHaveBeenProcessed'), this.$t('string.success'))
        this.$router.back()
      }).catch((error) => {
        if (error.response.status === 422) {
          this.validations = error.response.data.errors
        } else {
          this.onResponseError(error)
        }
      }).finally(() => {
        this.$isLoading(false)
      })
    },
    fetchUserByUuid () {
      this.$axios.post(process.env.VUE_APP_API + '/api/backend/user/get-user-by-uuid', {
        uuid: this.$route.params.uuid
      }).then((response) => {
        this.user = response.data.data
        this.user.roles = this.$refs.editForm.rolesOption.filter(role => this.user.roles.map(r => r.id).includes(role.id))
      }).catch((error) => {
        this.onResponseError(error)
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.fetchUserByUuid()
    })
  }
}
</script>

<style scoped>

</style>

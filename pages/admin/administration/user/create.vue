<template>
  <user-form
    :validations="validations"
    :title="$t('label.newUser')"
    @submit="onSubmit"
  />
</template>

<script>
import UserForm from './form'

export default {
  name: 'Create',
  head () {
    return {
      title: this.$t('label.newUser'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  },
  components: {
    UserForm
  },
  data () {
    return {
      validations: null
    }
  },
  methods: {
    onSubmit (user) {
      this.$isLoading(true)
      const permissions = user.permissions.map(permission => ({
        id: permission.id,
        name: permission.name
      }))
      this.$axios.post(process.env.VUE_APP_API + '/api/backend/user/store', {
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
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="user">
    <div class="box box-primary">
      <div class="box-header with-border">
        <h3 class="box-title">
          {{ $t('label.resetPassword') }}
        </h3>
      </div>
      <div class="box-body">
        <div class="form-horizontal">
          <div
            :class="'form-group ' + (validations !== null && validations.hasOwnProperty('password') ? 'has-error' : '')"
          >
            <label class="required col-sm-3 control-label">{{ $t('label.password') }}</label>
            <div class="col-sm-9">
              <input
                v-model="user.password"
                type="password"
                :placeholder="$t('label.password')"
                class="form-control"
              >
              <span
                v-if="validations !== null && validations.hasOwnProperty('password')"
                class="label-error"
              >
                {{ validations['password'][0] }}
              </span>
            </div>
          </div>

          <div
            :class="'form-group ' + (validations !== null && validations.hasOwnProperty('password_confirmation') ? 'has-error' : '')"
          >
            <label class="required col-sm-3 control-label">{{ $t('label.passwordConfirmation') }}</label>
            <div class="col-sm-9">
              <input
                v-model="user.password_confirmation"
                type="password"
                :placeholder="$t('label.passwordConfirmation')"
                class="form-control"
              >
              <span
                v-if="validations !== null && validations.hasOwnProperty('password_confirmation')"
                class="label-error"
              >
                {{ validations['password_confirmation'][0] }}
              </span>
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-offset-3 col-sm-9">
              <button
                class="btn btn-info btn-sm margin-r-5"
                @click="resetPassword"
              >
                <i class="fa fa-check-circle" /> {{ $t('button.update') }}
              </button>
              <a
                class="btn btn-default btn-sm"
                @click="$router.back()"
              >
                <i class="fa fa-arrow-circle-left" /> {{ $t('button.back') }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ResetPassword',
  head () {
    return {
      title: this.$t('label.resetPassword'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  },
  data () {
    return {
      validations: null,
      user: {
        uuid: null,
        password: null,
        password_confirmation: null
      }
    }
  },
  methods: {
    resetPassword () {
      this.$isLoading(true)
      this.$axios.post(process.env.VUE_APP_API + '/api/backend/user/reset-password', {
        ...this.user
      }).then((response) => {
        this.showToastr()
        this.$router.push({ name: 'list-user' })
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
  },
  mounted () {
    this.user.uuid = this.$route.params.uuid
  }
}
</script>

<style scoped>

</style>

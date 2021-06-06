<template>
  <div v-if="user" class="table-responsive">
    <div class="mb-20 float-right">
      <template v-if="isUpdating">
        <button
          class="btn btn-default"
          @click="switchUpdateMode(false)"
        >
          {{ $t('button.cancel') }}
        </button>
        <button
          class="btn btn-info"
          @click="updateProfile"
        >
          {{ $t('button.save') }}
        </button>
      </template>
      <template v-else>
        <button
          class="btn btn-primary"
          @click="switchUpdateMode(true)"
        >
          <i class="fa fa-edit" /> {{ $t('button.edit') }}
        </button>
      </template>
    </div>
    <table class="table table-bordered table-striped">
      <tbody>
        <tr>
          <th>{{ $t('fields.firstName') }}</th>
          <template v-if="isUpdating">
            <td>
              <div
                class="form-group no-margin"
              >
                <input
                  v-model="userForm.first_name"
                  type="text"
                  :class="{'is-invalid': validations.first_name}"
                  class="form-control"
                  :placeholder="$t('placeholder.firstName')"
                >
                <template v-if="validations.first_name">
                  <FiledIsRequired />
                </template>
              </div>
            </td>
          </template>
          <template v-else>
            <td>{{ user.first_name }}</td>
          </template>
        </tr>
        <tr>
          <th>{{ $t('fields.lastName') }}</th>
          <template v-if="isUpdating">
            <td>
              <div
                class="form-group no-margin"
              >
                <input
                  v-model="userForm.last_name"
                  :class="{'is-invalid': validations.last_name}"
                  type="text"
                  class="form-control"
                  :placeholder="$t('placeholder.lastName')"
                >
                <template v-if="validations.last_name">
                  <FiledIsRequired />
                </template>
              </div>
            </td>
          </template>
          <template v-else>
            <td>{{ user.last_name }}</td>
          </template>
        </tr>
        <tr>
          <th>{{ $t('fields.email') }}</th>
          <template v-if="isUpdating">
            <td>
              <div
                class="form-group no-margin"
              >
                <input
                  v-model="userForm.email"
                  type="email"
                  readonly
                  class="form-control"
                  :placeholder="$t('placeholder.email')"
                >
              </div>
            </td>
          </template>
          <template v-else>
            <td>{{ user.email }}</td>
          </template>
        </tr>
        <tr>
          <th>{{ $t('fields.gender') }}</th>
          <template v-if="isUpdating">
            <td>
              <div
                class="form-group no-margin"
              >
                <select
                  v-model="userForm.gender_id"
                  :class="{'is-invalid': validations.gender_id}"
                  class="form-control"
                >
                  <option selected disabled :value="null">
                    {{ $t('string.selectGender') }}
                  </option>
                  <option :value="1">
                    {{ $t('label.male') }}
                  </option>
                  <option :value="2">
                    {{ $t('label.female') }}
                  </option>
                </select>
                <template v-if="validations.gender_id">
                  <FiledIsRequired />
                </template>
              </div>
            </td>
          </template>
          <template v-else>
            <td>
              {{ user.gender ? user.gender['name_' + $i18n.locale] : 'N/A' }}
            </td>
          </template>
        </tr>
        <template v-if="!isUpdating">
          <tr>
            <th>{{ $t('fields.createdAt') }}</th>
            <td>{{ user.created_at }}</td>
          </tr>
          <tr>
            <th>{{ $t('fields.updatedAt') }}</th>
            <td>{{ user.updated_at }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FiledIsRequired from '@/components/FiledIsRequired'

export default {
  name: 'UserProfile',
  components: { FiledIsRequired },
  data () {
    return {
      isUpdating: false,
      userForm: null,
      validations: {}
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.data
    })
  },
  methods: {
    switchUpdateMode (isUpdating) {
      if (isUpdating) {
        this.userForm = {
          first_name: this.user.first_name,
          last_name: this.user.last_name,
          email: this.user.email,
          gender_id: this.user.gender_id
        }
        this.validations = {}
      }
      this.isUpdating = isUpdating
    },
    updateProfile () {
      this.$isLoading(true)
      this.validations = {}
      this.$axios.post(process.env.VUE_APP_API + '/api/auth/backend/update-information', this.userForm)
        .then((response) => {
          if (response.data && response.data.data) {
            this.$store.dispatch('user/setUser', { user: response.data.data })
            this.switchUpdateMode(false)
            this.$toastr('success', this.$t('string.profileUpdate'), this.$t('string.success'))
          }
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.validations = error.response.data.errors
          } else {
            this.onResponseError(error)
          }
        })
        .finally(() => {
          this.$isLoading(false)
        })
    }
  }
}
</script>

<style scoped>
.mb-20 {
  margin-bottom: 20px;
}

.mr-5 {
  margin-right: 5px;
}

.no-margin {
  margin-bottom: 0 !important;
}
</style>

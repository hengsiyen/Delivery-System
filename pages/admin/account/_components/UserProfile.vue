<template>
  <div v-if="user" class="table-responsive">
    <div class="mb-20 text-right">
      <template v-if="!isUpdating">
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
          <th class="required">
            {{ $t('fields.firstName') }}
          </th>
          <template v-if="isUpdating">
            <td>
              <div class="form-group no-margin">
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
          <th class="required">
            {{ $t('fields.lastName') }}
          </th>
          <template v-if="isUpdating">
            <td>
              <div class="form-group no-margin">
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
          <th class="required">
            {{ $t('fields.email') }}
          </th>
          <template v-if="isUpdating">
            <td>
              <div class="form-group no-margin">
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
              <div class="form-group no-margin">
                <select
                  v-model="userForm.gender_id"
                  :class="{'is-invalid': validations.gender_id}"
                  class="form-control"
                >
                  <option selected disabled :value="null">
                    {{ $t('string.selectGender') }}
                  </option>
                  <template v-if="genders && genders.length > 0">
                    <template v-for="item in genders">
                      <option :key="item._id" :value="item._id">
                        {{ item['name_' + $i18n.locale] }}
                      </option>
                    </template>
                  </template>
                </select>
                <template v-if="validations.gender_id">
                  <FiledIsRequired />
                </template>
              </div>
            </td>
          </template>
          <template v-else>
            <td>
              {{ user.gender ? user.gender['name_' + $i18n.locale] : '-' }}
            </td>
          </template>
        </tr>
        <tr>
          <th>{{ $t('menu.role') }}</th>
          <td>
            <ul v-if="display_roles && display_roles.length > 0" class="mb-0 pl-3">
              <li v-for="(item, key) in display_roles" :key="key">
                {{ item['display_name_' + $i18n.locale] }}
              </li>
            </ul>
          </td>
        </tr>
        <template v-if="!isUpdating">
          <tr>
            <th class="text-capitalize">{{ $t('fields.createdAt') }}</th>
            <td>{{ getDateFormat(user.created_at) }}</td>
          </tr>
          <tr>
            <th class="text-capitalize">{{ $t('fields.updatedAt') }}</th>
            <td>{{ getDateFormat(user.updated_at) }}</td>
          </tr>
        </template>
      </tbody>
    </table>
    <div class="text-right">
      <template v-if="isUpdating">
        <button
          class="btn btn-default"
          @click="switchUpdateMode(false)"
        >
          <i class="far fa-times-circle mr-2" />
          <strong>{{ $t('button.cancel') }}</strong>
        </button>
        <button class="btn btn-success" @click="updateProfile">
          <i class="fas fa-save mr-2" />
          <strong>{{ $t('button.save') }}</strong>
        </button>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import FiledIsRequired from '@/components/FiledIsRequired'

export default {
  name: 'UserProfile',
  components: { FiledIsRequired },
  data () {
    return {
      isUpdating: false,
      userForm: null,
      validations: {},
      genders: []
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.data
    }),
    ...mapGetters({
      display_roles: 'user/getDisplayRoles'
    })
  },
  mounted () {
    this.getGenders()
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
    },
    getGenders () {
      this.$axios.get(this.$base_api + '/api/backend/gender/get-options')
        .then((res) => {
          this.genders = res.data.data
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

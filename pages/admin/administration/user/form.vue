<template>
  <div class="user">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">
          {{ title }}
        </h3>
        <div class="card-tools">
          <ButtonBack />
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-12">
            <div v-if="isEdit" class="form-group text-center margin-50">
              <div class="change-avatar">
                <div style="display: inline-grid">
                  <img
                    :src="imgDataUrl || avatar"
                    alt="User Avatar"
                    class="container-avatar"
                  >
                  <a class="btn btn-primary" @click="toggleShow">
                    {{ $t('label.uploadYourAvatar') }}
                  </a>
                </div>
                <vue-crop-avatar
                  v-model="show"
                  field="avatar"
                  :width="200"
                  lang-type="en"
                  :height="200"
                  :url="`${apiUrl}/api/backend/user/change-avatar`"
                  :params="params"
                  :headers="headers"
                  img-format="png"
                  @crop-success="cropSuccess"
                  @crop-upload-success="cropUploadSuccess"
                  @crop-upload-fail="cropUploadFail"
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="required col-sm-3 col-form-label text-right">{{ $t('label.firstName') }}</label>
              <div class="col-sm-9">
                <input
                  v-model="user.first_name"
                  type="text"
                  :class="{'is-invalid' : validations !== null && validations.hasOwnProperty('first_name')}"
                  autofocus
                  class="form-control"
                  :placeholder="$t('label.firstName')"
                >
                <div
                  v-if="validations !== null && validations.hasOwnProperty('first_name')"
                  class="invalid-feedback"
                >
                  {{ validations['first_name'][0] }}
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label
                class="required col-sm-3 col-form-label text-right"
              >{{ $t('label.lastName') }}</label>
              <div class="col-sm-9">
                <input
                  v-model="user.last_name"
                  type="text"
                  :class="{'is-invalid' : validations !== null && validations.hasOwnProperty('last_name')}"
                  autofocus
                  class="form-control"
                  :placeholder="$t('label.lastName')"
                >
                <div
                  v-if="validations !== null && validations.hasOwnProperty('last_name')"
                  class="invalid-feedback"
                >
                  {{ validations['last_name'][0] }}
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label class="required col-sm-3 col-form-label text-right">{{ $t('label.email') }}</label>
              <div class="col-sm-9">
                <input
                  v-model="user.email"
                  type="email"
                  :class="{'is-invalid' : validations !== null && validations.hasOwnProperty('email')}"
                  autofocus
                  class="form-control"
                  :placeholder="$t('label.email')"
                >
                <div
                  v-if="validations !== null && validations.hasOwnProperty('email')"
                  class="invalid-feedback"
                >
                  {{ validations['email'][0] }}
                </div>
              </div>
            </div>
            <template v-if="!isEdit">
              <div class="form-group row">
                <label class="required col-sm-3 col-form-label text-right">{{ $t('label.password') }}</label>
                <div class="col-sm-9">
                  <input
                    v-model="user.password"
                    type="password"
                    autofocus
                    :class="{'is-invalid' : validations !== null && validations.hasOwnProperty('password')}"
                    class="form-control"
                    :placeholder="$t('label.password')"
                  >
                  <div
                    v-if="validations !== null && validations.hasOwnProperty('password')"
                    class="invalid-feedback"
                  >
                    {{ validations['password'][0] }}
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label class="required col-sm-3 col-form-label text-right">{{ $t('label.passwordConfirmation') }}</label>
                <div class="col-sm-9">
                  <input
                    v-model="user.password_confirmation"
                    type="password"
                    autofocus
                    :class="{'is-invalid' : validations !== null && validations.hasOwnProperty('password_confirmation')}"
                    class="form-control"
                    :placeholder="$t('label.passwordConfirmation')"
                  >
                  <div
                    v-if="validations !== null && validations.hasOwnProperty('password_confirmation')"
                    class="invalid-feedback"
                  >
                    {{ validations['password_confirmation'][0] }}
                  </div>
                </div>
              </div>
            </template>
            <div class="form-group row">
              <label class="required col-sm-3 col-form-label text-right">
                {{ $t('label.gender') }}
              </label>
              <div class="col-sm-9">
                <select
                  v-model="user.gender_id"
                  :class="{'is-invalid': validations !== null && validations.hasOwnProperty('gender_id')}"
                  class="form-control"
                >
                  <option selected disabled value="0">
                    {{ $t('string.selectGender') }}
                  </option>
                  <template v-if="genders && genders.length">
                    <option v-for="(item, key) in genders" :key="key" :value="item._id">
                      {{ item['name_' + $i18n.locale] }}
                    </option>
                  </template>
                </select>
                <div
                  v-if="validations !== null && validations.hasOwnProperty('gender_id')"
                  class="invalid-feedback"
                >
                  {{ validations['gender_id'][0] }}
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label class="required col-sm-3 col-form-label text-right">
                {{ $t('label.active') }}
              </label>
              <div class="col-sm-9">
                <label>
                  <input
                    v-model="user.active"
                    type="checkbox"
                    :value="true"
                  > {{ $t('label.active?') }}
                </label>
              </div>
            </div>
            <div class="form-group row">
              <label class="required col-sm-3 col-form-label text-right">
                {{ $t('label.role') }}
              </label>
              <div class="col-sm-9">
                <div class="row">
                  <template v-if="rolesOption.length > 0">
                    <div v-for="(role, key) in rolesOption" :key="key" class="col-md-12">
                      <label :key="key" style="color: #333333">
                        <input
                          v-model="user.roles"
                          type="checkbox"
                          :value="role"
                          :class="{'is-invalid': validations !== null && validations.hasOwnProperty('roles')}"
                        > {{ role['display_name_' + $i18n.locale] || role.name }}
                      </label>
                    </div>
                  </template>
                  <div
                    v-if="validations !== null && validations.hasOwnProperty('roles')"
                    class="text-red"
                  >
                    {{ validations['roles'][0] }}
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-3 col-form-label text-right">{{ $t('label.additionalPermissions') }}</label>
              <div class="col-sm-9">
                <div
                  class="permission-tree-wrapper"
                  :class="{'red-border': validations !== null && validations.hasOwnProperty('permissions')}"
                >
                  <permission-tree
                    v-model="user.permissions"
                    :disabled-permissions="disabledPermissions"
                    :disable-all="disableAll"
                    :selected="selected"
                  />
                </div>
              </div>
            </div>
            <div class="form-group row" />
          </div>
        </div>
      </div>
      <div class="card-footer text-right">
        <button class="btn btn-default" @click="$router.back()">
          <i class="far fa-times-circle mr-2" />
          <strong>{{ $t('button.cancel') }}</strong>
        </button>
        <button class="btn btn-primary" @click="onSubmit">
          <i class="fas fa-save mr-2" />
          <strong>{{ $t('button.save') }}</strong>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonBack from '@/components/UiElements/ButtonBack'
import PermissionTree from '~/pages/admin/administration/permission/_components/PermissionTree'

export default {
  name: 'UserForm',
  components: { ButtonBack, PermissionTree },
  props: {
    title: {
      type: String,
      required: true
    },
    validations: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Object | null,
      required: true
    },
    user: {
      type: Object,
      required: false,
      default: () => ({
        email: null,
        password: null,
        password_confirmation: null,
        first_name: null,
        last_name: null,
        gender_id: 0,
        active: true,
        roles: [],
        permissions: []
      })
    }
  },
  data () {
    return {
      rolesOption: [],
      selected: null,
      apiUrl: process.env.VUE_APP_API,
      show: false,
      params: {
        uuid: this.$route.params.uuid,
        name: 'avatar'
      },
      headers: null,
      imgDataUrl: '',
      genders: []
    }
  },
  computed: {
    isEdit () {
      return this.$route.name === 'edit-user'
    },
    disabledPermissions () {
      if (this.user.roles.length === 0) { return [] }
      return this.user.roles
        .map(role => role.permissions)
        .reduce((p1, p2) => p1.concat(p2))
        .map(permission => permission.id)
    },
    disableAll () {
      return this.user.roles.some(role => role.name === process.env.VUE_APP_ROLE_ADMIN)
    }
  },
  watch: {
    user () {
      this.selected = this.user.permissions
      this.imgDataUrl = this.user.avatar ? this.apiUrl + '/' + this.user.avatar : this.user.avatar
    }
  },
  mounted () {
    this.fetchRoles()
    this.getGenders()
    this.headers = {
      Authorization: 'Bearer ' + localStorage.getItem(this.$token),
      Accept: 'application/json'
    }
  },
  methods: {
    onSubmit () {
      this.$emit('submit', this.user)
    },
    fetchRoles () {
      this.$axios.post(process.env.VUE_APP_API + '/api/backend/role/get-roles')
        .then((response) => {
          this.rolesOption = response.data.data
          this.user.roles = this.rolesOption.filter(role => this.user.roles.map(r => r.id).includes(role.id))
        }).catch((error) => {
          this.onResponseError(error)
        })
    },
    toggleShow () {
      this.show = !this.show
    },
    cropSuccess (imgDataUrl, field) {
    },
    cropUploadSuccess (jsonData, field) {
      this.imgDataUrl = this.apiUrl + '/' + jsonData.data.avatar
    },
    cropUploadFail (status, field) {
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
.red-border {
  border-radius: 8px;
  border: 1px solid red;
}

.margin-50 {
  margin-bottom: 50px;
}

.permission-tree-wrapper {
  padding-bottom: 20px;
  overflow: auto;
}
.change-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
}
.container-avatar {
  width: 300px;
  height: 300px;
  border: 1px solid #f1f1f1;
  border-radius: 4px;
  margin-bottom: 20px;
}
</style>

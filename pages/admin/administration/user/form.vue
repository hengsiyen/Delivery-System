<template>
  <div class="user">
    <div class="box box-primary">
      <div class="box-header with-border">
        <h3 class="box-title">
          {{ title }}
        </h3>
      </div>
      <div class="box-body">
        <div class="row">
          <div class="col-md-12">
            <div class="form-horizontal">
              <div v-if="isEdit" class="form-group text-center margin-50">
                <div class="change-avatar">
                  <div style="display: inline-grid">
                    <img
                      :src="imgDataUrl || avatar"
                      alt="User Avatar"
                      class="container-avatar"
                    >
                    <a
                      class="btn btn-primary"
                      @click="toggleShow"
                    >{{ $t('label.uploadYourAvatar') }}</a>
                  </div>
                  <my-upload
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
              <div
                :class="'form-group ' + (validations !== null && validations.hasOwnProperty('first_name') ? 'has-error' : '')"
              >
                <label class="required col-sm-3 control-label">{{ $t('label.firstName') }}</label>
                <div class="col-sm-9">
                  <input
                    v-model="user.first_name"
                    type="text"
                    autofocus
                    class="form-control"
                    :placeholder="$t('label.firstName')"
                  >
                  <span
                    v-if="validations !== null && validations.hasOwnProperty('first_name')"
                    class="label-error"
                  >
                    {{ validations['first_name'][0] }}
                  </span>
                </div>
              </div>
              <div
                :class="'form-group ' + (validations !== null && validations.hasOwnProperty('last_name') ? 'has-error' : '')"
              >
                <label class="required col-sm-3 control-label">{{ $t('label.lastName') }}</label>
                <div class="col-sm-9">
                  <input
                    v-model="user.last_name"
                    type="text"
                    autofocus
                    class="form-control"
                    :placeholder="$t('label.lastName')"
                  >
                  <span
                    v-if="validations !== null && validations.hasOwnProperty('last_name')"
                    class="label-error"
                  >
                    {{ validations['last_name'][0] }}
                  </span>
                </div>
              </div>
              <div
                :class="'form-group ' + (validations !== null && validations.hasOwnProperty('email') ? 'has-error' : '')"
              >
                <label class="required col-sm-3 control-label">{{ $t('label.email') }}</label>
                <div class="col-sm-9">
                  <input
                    v-model="user.email"
                    type="email"
                    autofocus
                    class="form-control"
                    :placeholder="$t('label.email')"
                  >
                  <span
                    v-if="validations !== null && validations.hasOwnProperty('email')"
                    class="label-error"
                  >
                    {{ validations['email'][0] }}
                  </span>
                </div>
              </div>
              <template v-if="!isEdit">
                <div
                  :class="'form-group ' + (validations !== null && validations.hasOwnProperty('password') ? 'has-error' : '')"
                >
                  <label class="required col-sm-3 control-label">{{ $t('label.password') }}</label>
                  <div class="col-sm-9">
                    <input
                      v-model="user.password"
                      type="password"
                      autofocus
                      class="form-control"
                      :placeholder="$t('label.password')"
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
                      autofocus
                      class="form-control"
                      :placeholder="$t('label.passwordConfirmation')"
                    >
                    <span
                      v-if="validations !== null && validations.hasOwnProperty('password_confirmation')"
                      class="label-error"
                    >
                      {{ validations['password_confirmation'][0] }}
                    </span>
                  </div>
                </div>
              </template>
              <div
                class="form-group"
                :class="{'has-error': validations !== null && validations.hasOwnProperty('gender_id')}"
              >
                <label class="required col-sm-3 control-label">{{ $t('label.gender') }}</label>
                <div class="col-sm-9">
                  <select v-model="user.gender_id" class="form-control">
                    <option selected disabled value="0">
                      {{ $t('string.selectGender') }}
                    </option>
                    <option value="1">
                      {{ $t('label.male') }}
                    </option>
                    <option value="2">
                      {{ $t('label.female') }}
                    </option>
                  </select>
                  <span
                    v-if="validations !== null && validations.hasOwnProperty('gender_id')"
                    class="label-error"
                  >
                    {{ validations['gender_id'][0] }}
                  </span>
                </div>
              </div>
              <div class="form-group">
                <label class="required col-sm-3 control-label">{{ $t('label.active') }}</label>
                <div class="col-sm-9">
                  <label>
                    <input v-model="user.active" type="checkbox" :value="true"> {{ $t('label.active?') }}
                  </label>
                </div>
              </div>
              <div
                class="form-group"
                :class="{'has-error': validations !== null && validations.hasOwnProperty('role')}"
              >
                <label class="required col-sm-3 control-label">{{ $t('label.role') }}</label>
                <div class="col-sm-9">
                  <div class="row">
                    <template v-if="rolesOption.length > 0">
                      <div v-for="(role, key) in rolesOption" :key="key" class="col-md-12">
                        <label :key="key" style="color: #333333">
                          <input
                            v-model="user.roles"
                            type="checkbox"
                            :value="role"
                          > {{ role['display_name_' + $i18n.locale] || role.name }}
                        </label>
                      </div>
                    </template>
                    <span
                      v-if="validations !== null && validations.hasOwnProperty('role')"
                      class="label-error"
                    >
                      {{ validations['role'][0] }}
                    </span>
                  </div>
                </div>
              </div>
              <div
                class="form-group"
                :class="{'has-error': validations !== null && validations.hasOwnProperty('permissions')}"
              >
                <label class="col-sm-3 control-label">{{ $t('label.additionalPermissions') }}</label>
                <div class="col-sm-9">
                  <div class="permission-tree-wrapper" :class="{'red-border': validations !== null && validations.hasOwnProperty('permissions')}">
                    <permission-tree
                      v-model="user.permissions"
                      :disabled-permissions="disabledPermissions"
                      :disable-all="disableAll"
                      :selected="selected"
                    />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-9 col-sm-offset-3">
                  <button
                    class="btn btn-primary btn-sm margin-r-5"
                    @click="onSubmit"
                  >
                    <i class="fa fa-check-circle" /> {{ $t('button.save') }}
                  </button>
                  <a class="btn btn-default btn-sm" @click="$router.back()">
                    <i class="fa fa-arrow-circle-left" /> {{ $t('button.back') }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'babel-polyfill'
import myUpload from 'vue-image-crop-upload'
import PermissionTree from '~/pages/admin/administration/permission/_components/PermissionTree'

export default {
  name: 'UserForm',
  components: {
    PermissionTree,
    myUpload
  },
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
      imgDataUrl: ''
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
    }
  },
  mounted () {
    this.fetchRoles()
    this.headers = {
      Authorization: 'Bearer ' + localStorage.getItem(this.$token),
      Accept: 'application/json'
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
  padding-top: 10vh;
  padding-bottom: 10vh;
}
.container-avatar {
  width: 300px;
  height: 300px;
  border: 1px solid #f1f1f1;
  border-radius: 4px;
  margin-bottom: 20px;
}
</style>

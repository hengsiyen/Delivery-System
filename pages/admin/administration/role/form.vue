<template>
  <div class="role">
    <div class="card card-default color-palette-box">
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
            <div class="form-horizontal">
              <div class="form-group row">
                <label class="required col-sm-3 col-form-label text-right">{{ $t('label.roleName') }}</label>
                <div class="col-sm-9">
                  <input
                    v-model="role.name"
                    type="text"
                    :class="{'is-invalid' : validations !== null && validations.hasOwnProperty('name')}"
                    class="form-control"
                    :placeholder="$t('placeholder.roleName')"
                  >
                  <div
                    v-if="validations !== null && validations.hasOwnProperty('name')"
                    class="invalid-feedback"
                  >
                    {{ validations['name'][0] }}
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label class="required col-sm-3 col-form-label text-right">{{ $t('label.nameEn') }}</label>
                <div class="col-sm-9">
                  <input
                    v-model="role.display_name_en"
                    type="text"
                    class="form-control"
                    :class="{'is-invalid' : validations !== null && validations.hasOwnProperty('display_name_en')}"
                    :placeholder="$t('placeholder.role.nameEn')"
                  >
                  <div
                    v-if="validations !== null && validations.hasOwnProperty('display_name_en')"
                    class="invalid-feedback"
                  >
                    {{ validations['display_name_en'][0] }}
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label class="required col-sm-3 col-form-label text-right">{{ $t('label.nameKm') }}</label>
                <div class="col-sm-9">
                  <input
                    v-model="role.display_name_km"
                    type="text"
                    :class="{'is-invalid' : validations !== null && validations.hasOwnProperty('display_name_km')}"
                    class="form-control"
                    :placeholder="$t('placeholder.role.nameKm')"
                  >
                  <div
                    v-if="validations !== null && validations.hasOwnProperty('display_name_km')"
                    class="invalid-feedback"
                  >
                    {{ validations['display_name_km'][0] }}
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label class="required col-sm-3 col-form-label text-right">{{ $t('label.permissions') }}</label>
                <div class="col-sm-9">
                  <div
                    class="permission-tree-wrapper"
                    :class="{'red-border': validations !== null && validations.hasOwnProperty('permissions')}"
                  >
                    <permission-tree
                      v-model="role.permissions"
                      :selected="selected"
                    />
                  </div>
                  <div
                    v-if="validations !== null && validations.hasOwnProperty('permissions')"
                    class="invalid-feedback"
                  >
                    {{ validations['permissions'][0] }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer text-right">
        <button class="btn btn-default" @click="$router.back()">
          <i class="far fa-times-circle mr-2" />
          <strong>{{ $t('button.cancel') }}</strong>
        </button>
        <button class="btn btn-primary btn-sm" @click="onSubmit">
          <i class="fas fa-save mr-2"></i>
          <strong> {{ $t('button.save') }}</strong>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonBack from '@/components/UiElements/ButtonBack'
import PermissionTree from '~/pages/admin/administration/permission/_components/PermissionTree'

export default {
  name: 'Form',
  components: {
    ButtonBack,
    PermissionTree
  },
  props: {
    title: {
      type: String,
      required: true
    },
    role: {
      type: Object,
      required: false,
      default: () => ({
        name: null,
        display_name_en: null,
        display_name_km: null,
        permissions: []
      })
    },
    validations: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Object | null,
      required: true
    }
  },
  computed: {
    isEdit () {
      return this.$route.name === 'edit-role'
    }
  },
  watch: {
    role () {
      this.selected = this.role.permissions
    }
  },
  data () {
    return {
      permissionOptions: null,
      selected: null
    }
  },
  methods: {
    onSubmit () {
      this.$emit('submit', this.role)
    }
  }
}
</script>

<style scoped>
.red-border {
  border-radius: 8px;
  border: 1px solid red;
}

.permission-tree-wrapper {
  padding-bottom: 20px;
  overflow: auto;
}
</style>

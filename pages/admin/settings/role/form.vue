<template>
  <div class="role">
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
              <div
                class="form-group"
                :class="{
                  'has-error': validations !== null && validations.hasOwnProperty('name')
                }"
              >
                <label class="required col-sm-3 control-label">{{ $t('label.roleName') }}</label>
                <div class="col-sm-9">
                  <input
                    v-model="role.name"
                    type="text"
                    class="form-control"
                    :placeholder="$t('placeholder.roleName')"
                  >
                  <span
                    v-if="validations !== null && validations.hasOwnProperty('name')"
                    class="label-error"
                  >
                    {{ validations['name'][0] }}
                  </span>
                </div>
              </div>
              <div
                class="form-group"
                :class="{
                  'has-error': validations !== null && validations.hasOwnProperty('display_name_en')
                }"
              >
                <label class="required col-sm-3 control-label">{{ $t('label.nameEn') }}</label>
                <div class="col-sm-9">
                  <input
                    v-model="role.display_name_en"
                    type="text"
                    class="form-control"
                    :placeholder="$t('placeholder.role.nameEn')"
                  >
                  <span
                    v-if="validations !== null && validations.hasOwnProperty('display_name_en')"
                    class="label-error"
                  >
                    {{ validations['display_name_en'][0] }}
                  </span>
                </div>
              </div>
              <div
                class="form-group"
                :class="{
                  'has-error': validations !== null && validations.hasOwnProperty('display_name_km')
                }"
              >
                <label class="required col-sm-3 control-label">{{ $t('label.nameKm') }}</label>
                <div class="col-sm-9">
                  <input
                    v-model="role.display_name_km"
                    type="text"
                    class="form-control"
                    :placeholder="$t('placeholder.role.nameKm')"
                  >
                  <span
                    v-if="validations !== null && validations.hasOwnProperty('display_name_km')"
                    class="label-error"
                  >
                    {{ validations['display_name_km'][0] }}
                  </span>
                </div>
              </div>
              <div
                class="form-group"
                :class="{'has-error': validations !== null && validations.hasOwnProperty('permissions')}"
              >
                <label class="required col-sm-3 control-label">{{ $t('label.permissions') }}</label>
                <div
                  class="col-sm-9"
                >
                  <div class="permission-tree-wrapper" :class="{'red-border': validations !== null && validations.hasOwnProperty('permissions')}">
                    <permission-tree
                      v-model="role.permissions"
                      :selected="selected"
                    />
                  </div>
                  <span
                    v-if="validations !== null && validations.hasOwnProperty('permissions')"
                    class="label-error"
                  >
                    {{ validations['permissions'][0] }}
                  </span>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-9 col-sm-offset-3">
                  <button
                    class="btn btn-primary btn-sm margin-r-5"
                    @click="onSubmit"
                  >
                    <i class="fa fa-save" /> {{ $t('button.save') }}
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
import PermissionTree from '~/pages/admin/settings/permission/_components/PermissionTree'

export default {
  name: 'Form',
  components: {
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

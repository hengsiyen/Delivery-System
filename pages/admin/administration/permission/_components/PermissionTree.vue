<template>
  <v-jstree
    v-if="permissionOptions"
    :data="permissionOptions"
    :text-field-name="'display_name_' + $i18n.locale"
    :show-checkbox="!readOnly"
    multiple
    allow-batch
    whole-row
    draggable
    @item-click="clicked"
  />
</template>

<script>
import VJstree from 'vue-jstree'

export default {
  name: 'PermissionTree',
  components: {
    VJstree
  },
  model: {
    prop: 'selected',
    event: 'clicked'
  },
  props: {
    readOnly: {
      type: Boolean,
      default: false
    },
    selected: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Array | null,
      default: () => []
    },
    disabledPermissions: {
      type: Array,
      default: () => []
    },
    disableAll: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    selected (previous, now) {
      this.checkOldPermissions()
    },
    permissionOptions () {
      this.recursePermission(this.permissionOptions, (permission) => {
        permission.selected = false
        if (this.selected.map(p => p.id).includes(permission.id)) {
          permission.selected = true
        }
      })
    },
    disabledPermissions () {
      this.recursePermission(this.permissionOptions, (permission) => {
        this.disablePermission(permission)
      })
    }
  },
  data () {
    return {
      permissionOptions: null
    }
  },
  computed: {
    selectedPermissions () {
      if (!this.permissionOptions) {
        return []
      } else {
        const selected = []
        this.recursePermission(this.permissionOptions, (permission) => {
          if (permission.selected && !permission.disabled) {
            selected.push(permission)
          }
        })
        return selected
      }
    }
  },
  methods: {
    findParent (permission) {
      let parent
      this.recursePermission(this.permissionOptions, (maybeParent, stop) => {
        if (maybeParent.children.includes(permission)) {
          parent = maybeParent
          stop()
        }
      })
      return parent
    },
    checkOldPermissions () {
      this.recursePermission(this.permissionOptions, (permission) => {
        if (this.selected.map(p => p.id).includes(permission.id)) {
          permission.selected = true
        }
      })
    },
    disablePermission (permission) {
      if (this.disableAll || this.disabledPermissions.includes(permission.id)) {
        this.$set(permission, 'disabled', true)
        permission.previousSelected = !!permission.selected
        this.$set(permission, 'selected', true)
      } else {
        this.$set(permission, 'disabled', false)
        if (permission.previousSelected !== undefined) {
          this.$set(permission, 'selected', permission.previousSelected)
        }
      }
    },
    getPermissionById (id) {
      let result
      this.recursePermission(this.permissionOptions, (permission, stop) => {
        if (permission.id === id) {
          result = permission
          stop()
        }
      })
      return result
    },
    recursePermission (data, callback, key = 'children', mapper) {
      if (!data) { return }
      let stop = false
      const internalRecurse = (permissions) => {
        if (permissions) {
          for (const permission of (mapper ? mapper(permissions) : permissions)) {
            callback(permission, () => { stop = true })
            if (!stop) {
              internalRecurse(permission[key])
            }
          }
        }
      }
      internalRecurse(data)
    },
    selectAllAncestor (permission, selected = true) {
      let parent = this.findParent(permission)
      while (parent !== undefined) {
        parent.selected = selected
        parent.previousSelected = selected
        parent = this.findParent(parent)
      }
    },
    checkDeselectParent (permission) {
      const parent = this.findParent(permission)
      if (parent) {
        if (parent.children.every(child => !child.selected)) {
          parent.selected = false
          this.checkDeselectParent(parent)
        }
      }
    },
    clicked (node) {
      if (this.readOnly) { return }
      node.model.previousSelected = node.model.selected
      if (node.model.selected) {
        this.selectAllAncestor(node.model)
        this.recursePermission(
          node.model.dependencies,
          (permission, stop) => {
            if (permission.selected) {
              stop()
            } else {
              permission.selected = true
              permission.previousSelected = true
            }
          },
          'dependencies',
          (data) => {
            return data.map(d => this.getPermissionById(d.dependency_id))
          }
        )
      } else {
        this.checkDeselectParent(node.model)
      }

      this.$emit('clicked', this.selectedPermissions)
    },
    getPermissions () {
      this.$axios.post(process.env.VUE_APP_API + '/api/backend/permission/get-permissions')
        .then((response) => {
          this.recursePermission(response.data.data, (permission) => {
            this.$set(permission, 'opened', true)
            this.$set(permission, 'dragDisabled', true)
            this.$set(permission, 'dropDisabled', true)

            this.disablePermission(permission)

            if (permission.children.length === 0) {
              this.$set(permission, 'isLeaf', true)
            }
          })
          this.permissionOptions = response.data.data
        }).catch((error) => {
          this.onResponseError(error)
        })
    }
  },
  mounted () {
    this.getPermissions()
  }
}
</script>

<style scoped>

</style>

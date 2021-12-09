<template>
  <div class="role">
    <div class="card card-default color-palette-box">
      <div class="card-header">
        <h3 class="card-title">
          {{ $t('label.list.role') }}
        </h3>
        <div class="box-tools pull-right">
          <nuxt-link
            v-if="can([$Permissions.backend.administration.role.store])"
            to="/admin/administration/role/create"
            type="button"
            class="btn btn-primary btn-sm"
          >
            <i class="fa fa-plus-circle" /> {{ $t('label.newRole') }}
          </nuxt-link>
        </div>
      </div>
      <div class="card-body">
        <Datatable
          ref="oTable"
          :columns="columns"
          table-id="user-role"
          url="api/backend/role/datatable"
          :params="{
            edit: $t('label.edit'),
            delete: $t('label.delete'),
            language: $i18n.locale || 'en',
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>

import Datatable from '@/components/Datatable'
export default {
  name: 'List',
  components: { Datatable },
  head () {
    return {
      title: this.$t('string.roleList'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  },
  computed: {
    columns () {
      const self = this
      return [
        {
          data: 'name',
          name: 'name',
          title: self.$t('table.name')
        },
        {
          data: 'display_name_en',
          name: 'display_name_en',
          title: self.$t('table.nameInEnglish'),
          render: (data, type, row) => {
            if (data !== null) {
              return data
            }
            return this.$t('string.na')
          }
        },
        {
          data: 'display_name_km',
          name: 'display_name_km',
          title: self.$t('table.nameInKhmer'),
          render: (data, type, row) => {
            if (data !== null) {
              return data
            }
            return this.$t('string.na')
          }
        },
        {
          data: 'number_of_users',
          name: 'number_of_users',
          searchable: false,
          orderable: false,
          title: self.$t('table.numberOfUsers')
        },
        {
          data: 'created_at',
          name: 'created_at',
          width: '180px',
          searchable: false,
          title: self.$t('table.createdAt'),
          render: (data, type, row) => {
            return this.getDateFormat(data)
          }
        },
        {
          data: 'action',
          name: 'action',
          searchable: false,
          orderable: false,
          width: '70px',
          title: self.$t('table.action')
        }
      ]
    }
  },
  methods: {
    deleteRole (id) {
      this.onConfirm({})
        .then((accept) => {
          if (accept) {
            this.$axios.post(process.env.VUE_APP_API + '/api/backend/role/delete', {
              id
            }).then(() => {
              this.showToastr()
              this.$refs.oTable.draw()
            }).catch((error) => {
              this.onResponseError(error)
            })
          }
        })
    },
    loadAction () {
      const self = this
      this.clearEventHandler([
        '.btn-edit',
        '.btn-delete'
      ])
      $(function () {
        $(document).on('click', '.btn-edit', function (e) {
          e.preventDefault()
          self.$router.push({
            path: `/admin/administration/role/edit/${$(this).attr('data-id')}`
          })
        })
        $(document).on('click', '.btn-delete', function (e) {
          e.preventDefault()
          self.deleteRole($(this).attr('data-id'))
        })
      })
    }
  },
  mounted () {
    this.loadAction()
  }
}
</script>

<style scoped>

</style>

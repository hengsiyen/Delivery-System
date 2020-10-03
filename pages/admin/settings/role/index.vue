<template>
  <div class="role">
    <div class="box box-primary">
      <div class="box-header with-border">
        <h3 class="box-title">
          {{ $t('label.list.role') }}
        </h3>
        <div class="box-tools pull-right">
          <nuxt-link
            v-if="can([$Permissions.backend.setting.role.store])"
            to="/admin/settings/role/create"
            type="button"
            class="btn btn-primary btn-sm"
          >
            <i class="fa fa-plus-circle" /> {{ $t('label.newRole') }}
          </nuxt-link>
        </div>
      </div>
      <div class="box-body">
        <div>
          <table id="role-table" class="table table-full-width table-hover table-striped table-bordered">
            <thead>
              <tr>
                <th>{{ $t('table.name') }}</th>
                <th>{{ $t('table.nameInEnglish') }}</th>
                <th>{{ $t('table.nameInKhmer') }}</th>
                <th>{{ $t('table.numberOfUsers') }}</th>
                <th>{{ $t('table.createdAt') }}</th>
                <th>{{ $t('table.action') }}</th>
              </tr>
            </thead>
            <tbody />
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Index',
  head () {
    return {
      title: this.$t('string.roleList'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  },
  data () {
    return {
      oTable: null
    }
  },
  watch: {
    '$i18n.locale' () {
      this.oTable.clear()
      this.oTable.destroy()
      this.oTable = this.refreshTable()
      this.oTable.draw(true)
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
          width: '150px',
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
      const self = this
      this.$swal({
        title: self.i18nSwalTitle,
        text: self.i18nSwalDesc,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: self.i18nSwalNo,
        confirmButtonText: self.i18nSwalYes
      }).then((result) => {
        if (result.value) {
          this.$axios.post(process.env.VUE_APP_API + '/api/backend/role/delete', {
            id
          }).then(() => {
            self.$swal({
              title: self.i18nSwalDeleteLabel,
              text: self.i18nSwalSuccess,
              type: 'success',
              confirmButtonText: self.i18nSwalYes
            })
            self.oTable.draw(true)
          }).catch((error) => {
            this.onResponseError(error)
          })
        }
      })
    },
    refreshTable () {
      const self = this
      return $('#role-table').DataTable({
        stateSave: true,
        processing: true,
        serverSide: true,
        scrollX: true,
        pageLength: 100,
        ajax: {
          method: 'POST',
          url: process.env.VUE_APP_API + '/api/backend/role/datatable',
          data: (d) => {
            d.edit = self.i18nEdit
            d.delete = self.i18nDelete
            d.language = self.$i18n.locale || 'en'
          },
          error: (xhr, error, thrown) => {
            self.onResponseError(xhr)
          }
        },
        columns: self.columns,
        language: {
          url: `/locale/${self.$i18n.locale}.json`
        },
        fixedColumns: true,
        order: [
          [4, 'desc']
        ]
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
            path: `/admin/settings/role/edit/${$(this).attr('data-id')}`
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
    this.oTable = this.refreshTable()
    this.loadAction()
  },
  beforeDestroy () {
    this.oTable.clear()
    this.oTable.destroy()
  }
}
</script>

<style scoped>

</style>

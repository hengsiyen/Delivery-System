<template>
  <div class="user">
    <div class="box box-primary">
      <div class="box-header with-border">
        <h3 class="box-title">
          {{ $t('label.list.user') }}
        </h3>
        <div class="pull-right box-tools">
          <nuxt-link
            v-if="can([$Permissions.backend.administration.user.store])"
            to="/admin/administration/user/create"
            class="btn btn-primary btn-sm"
          >
            <i class="fa fa-plus-circle" /> {{ $t('button.newUser') }}
          </nuxt-link>
        </div>
      </div>
      <div class="box-body">
        <div>
          <table id="user-table" class="table table-hover table-full-width table-striped table-bordered">
            <thead>
              <tr>
                <th>{{ $t('table.name') }}</th>
                <th>{{ $t('table.email') }}</th>
                <th>{{ $t('table.gender') }}</th>
                <th>{{ $t('table.confirmed') }}</th>
                <th>{{ $t('table.role') }}</th>
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
      title: this.$t('string.userList'),
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
      return [
        { data: 'name', name: 'name', title: this.$t('table.name') },
        { data: 'email', name: 'email', title: this.$t('table.email') },
        { data: 'gender', name: 'gender', title: this.$t('table.gender') },
        { data: 'confirmed', name: 'confirmed', title: this.$t('table.confirmed'), searchable: false },
        { data: 'role', name: 'role', title: this.$t('table.role'), searchable: true, orderable: false },
        {
          data: 'created_at',
          name: 'created_at',
          width: '150px',
          searchable: false,
          title: this.$t('table.createdAt'),
          render: (data, type, row) => {
            return this.getDateFormat(data)
          }
        },
        {
          data: 'action',
          name: 'action',
          width: '140px',
          orderable: false,
          searchable: false,
          title: this.$t('table.action')
        }
      ]
    }
  },
  methods: {
    refreshTable () {
      const self = this
      return $('#user-table').DataTable({
        stateSave: true,
        processing: true,
        serverSide: true,
        scrollX: true,
        pageLength: 100,
        ajax: {
          method: 'POST',
          url: process.env.VUE_APP_API + '/api/backend/user/datatable',
          data: (d) => {
            d.active = self.$t('label.active')
            d.edit = self.$t('label.edit')
            d.show = self.$t('label.show')
            d.delete = self.$t('label.delete')
            d.deactive = self.$t('label.deactive')
            d.changePassword = self.$t('label.changePassword')
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
          [5, 'desc']
        ]
      })
    },
    deleteUser (uuid) {
      const self = this
      this.$swal({
        title: self.$t('label.swal.title'),
        text: self.$t('label.swal.desc'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: self.$t('label.swal.no'),
        confirmButtonText: self.$t('label.swal.yes')
      }).then((result) => {
        if (result.value) {
          this.$axios.post(process.env.VUE_APP_API + '/api/backend/user/delete', {
            uuid
          }).then(() => {
            this.showSwalSuccess()
            this.oTable.draw(true)
          }).then((error) => {
            this.onResponseError(error)
          })
        }
      })
    },
    toggleUserAccess (uuid) {
      this.$swal({
        title: this.$t('string.areYouSure?'),
        text: this.$t('string.theActionWillToggleUserAccess'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: this.$t('button.cancel'),
        confirmButtonText: this.$t('string.yesIWish!')
      }).then((result) => {
        if (result.value) {
          this.$axios.post(process.env.VUE_APP_API + '/api/backend/user/toggle', {
            uuid
          }).then(() => {
            this.showToastr()
            this.oTable.draw(true)
          }).catch((error) => {
            this.onResponseError(error)
          })
        }
      })
    },
    loadAction () {
      const self = this
      this.clearEventHandler([
        '.btn-delete-user',
        '.btn-toggle-user',
        '.btn-show-user',
        '.btn-edit-user',
        '.btn-reset-password-user'
      ])
      $(function () {
        $(document).on('click', '.btn-delete-user', function (e) {
          e.preventDefault()
          self.deleteUser($(this).attr('data-uuid'))
        })
        $(document).on('click', '.btn-toggle-user', function (e) {
          e.preventDefault()
          self.toggleUserAccess($(this).attr('data-uuid'))
        })
        $(document).on('click', '.btn-show-user', function (e) {
          e.preventDefault()
          self.$router.push({
            path: `/admin/administration/user/show/${$(this).attr('data-uuid')}`
          })
        })
        $(document).on('click', '.btn-edit-user', function (e) {
          e.preventDefault()
          self.$router.push({
            path: `/admin/administration/user/edit/${$(this).attr('data-uuid')}`
          })
        })
        $(document).on('click', '.btn-reset-password-user', function (e) {
          e.preventDefault()
          self.$router.push({
            path: `/admin/administration/user/reset-password/${$(this).attr('data-uuid')}`
          })
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

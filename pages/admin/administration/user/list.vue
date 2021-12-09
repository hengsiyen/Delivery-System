<template>
  <div class="user">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">
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
      <div class="card-body">
        <Datatable
          ref="oTable"
          :columns="columns"
          table-id="user-table"
          url="api/backend/user/datatable"
          :params="{
            active: $t('label.active'),
            edit: $t('label.edit'),
            show: $t('label.show'),
            delete: $t('label.delete'),
            deactive: $t('label.deactive'),
            changePassword: $t('label.changePassword'),
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
      title: this.$t('string.userList'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
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
          width: '180px',
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
    deleteUser (uuid) {
      this.onConfirm({})
        .then((accept) => {
          if (accept) {
            this.$axios.post(process.env.VUE_APP_API + '/api/backend/user/delete', {
              uuid
            }).then(() => {
              this.showSwalSuccess()
              this.$refs.oTable.draw()
            }).then((error) => {
              this.onResponseError(error)
            })
          }
        })
    },
    toggleUserAccess (uuid) {
      this.onConfirm({
        title: this.$t('string.areYouSure?'),
        text: this.$t('string.theActionWillToggleUserAccess'),
        cancelButtonText: this.$t('button.cancel'),
        confirmButtonText: this.$t('string.yesIWish!')
      }).then((accept) => {
        if (accept) {
          this.$axios.post(process.env.VUE_APP_API + '/api/backend/user/toggle', {
            uuid
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
    this.loadAction()
  }
}
</script>

<style scoped>

</style>

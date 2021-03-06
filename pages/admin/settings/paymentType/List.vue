<template>
  <div class="card">
    <div class="card-header with-border">
      <h3 class="card-title">
        {{ $t('text.list') }}
      </h3>
      <div class="card-tools">
        <ButtonAddNew link-to="create-payment-type" />
      </div>
    </div>
    <div class="card-body">
      <Datatable
        ref="oTable"
        :columns="columns"
        :params="params"
        table-id="payment-type-table"
        url="api/backend/payment-type/datatable"
      />
    </div>
  </div>
</template>
<script>
import Datatable from '@/components/Datatable'
import ButtonAddNew from '@/components/UiElements/ButtonAddNew'
import { mapGetters } from 'vuex'
export default {
  name: 'PaymentTypeList',
  head () {
    return {
      title: this.$t('menu.payment_type'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  },
  components: { ButtonAddNew, Datatable },
  computed: {
    ...mapGetters({
      dcid: 'delivery_company/dcid'
    }),
    params () {
      return {
        dcid: this.dcid,
        lang: this.$i18n.locale,
        toggle_on: this.$t('label.enable'),
        toggle_off: this.$t('label.disable'),
        show: this.$t('label.show'),
        edit: this.$t('label.edit'),
        delete: this.$t('label.delete')
      }
    },
    columns () {
      return [
        { data: 'name_km', name: 'name_km', title: this.$t('table.nameInKhmer') },
        { data: 'name_en', name: 'name_en', title: this.$t('table.nameInEnglish') },
        { data: 'enabled', name: 'enabled', title: this.$t('label.enabled') },
        {
          data: 'created_at',
          name: 'created_at',
          searchable: false,
          title: this.$t('table.createdAt'),
          render: (data, type, row) => {
            return this.getDateFormat(data)
          }
        },
        {
          data: 'actions',
          name: 'actions',
          searchable: false,
          orderable: false,
          title: this.$t('label.action')
        }
      ]
    }
  },
  mounted () {
    this.loadAction()
  },
  methods: {
    loadAction () {
      const self = this
      this.clearEventHandler([
        '.btn-show',
        '.btn-edit',
        '.btn-toggle',
        '.btn-delete'
      ])
      $(function () {
        $(document).on('click', '.btn-show', function () {
          self.routerPush({
            name: 'show-payment-type',
            params: {
              id: $(this).attr('data-id')
            }
          })
        })
        $(document).on('click', '.btn-edit', function () {
          self.routerPush({
            name: 'edit-payment-type',
            params: {
              id: $(this).attr('data-id')
            }
          })
        })
        $(document).on('click', '.btn-toggle', function () {
          self.toggleRecode($(this).attr('data-id'))
        })
        $(document).on('click', '.btn-delete', function () {
          self.deleteRecord($(this).attr('data-id'))
        })
      })
    },
    toggleRecode (id) {
      this.$isLoading(true)
      this.$axios.post(this.$base_api + '/api/backend/payment-type/toggle', { id })
        .then((res) => {
          if (this.$refs.oTable) {
            this.$refs.oTable.reinitialise()
          }
        }).catch((error) => {
          this.onResponseError(error)
        }).finally(() => {
          this.$isLoading(false)
        })
    },
    deleteRecord (id) {
      this.$swal({
        html: `<label class="mb-3 font-s-20">${this.$t('swal.delete_payment_type')}</label>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        confirmButtonText: this.$t('swal.yes_delete_it'),
        cancelButtonText: this.$t('swal.no_cancel')
      }).then((result) => {
        if (result.value) {
          this.$axios.post(this.$base_api + '/api/backend/payment-type/delete', { id })
            .then((res) => {
              if (this.$refs.oTable) {
                this.$refs.oTable.reinitialise()
              }
              this.$swal({
                position: 'center',
                html: `<label class="mb-3 font-s-20">${this.$t('swal.payment_type_deleted')}</label>`,
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
              })
            }).catch((error) => {
              this.onResponseError(error)
            }).finally(() => {
              this.$isLoading(false)
            })
        }
      }, (dismiss) => {
        if (!(dismiss === 'cancel')) {
          throw dismiss
        }
      }).catch(function (err) {
        console.error(err)
        throw err
      })
    }
  }
}
</script>

<style scoped>

</style>

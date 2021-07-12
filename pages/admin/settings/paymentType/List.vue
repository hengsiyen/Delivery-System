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
    params () {
      return {
        lang: this.$i18n.locale
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
        '.btn-edit'
      ])
      $(function () {
        $(document).on('click', '.btn-show', function () {
          self.routerPush({
            name: 'show-payment-type',
            params: {
              uuid: $(this).attr('data-id')
            }
          })
        })
      })
    }
  }
}
</script>

<style scoped>

</style>

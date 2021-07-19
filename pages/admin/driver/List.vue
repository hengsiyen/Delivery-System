<template>
  <div class="card">
    <div class="card-header with-border">
      <h3 class="card-title">
        {{ $t('text.list') }}
      </h3>
      <div class="card-tools">
        <ButtonAddNew link-to="create-package" />
      </div>
    </div>
    <div class="card-body">
      <Datatable
        ref="oTable"
        :columns="columns"
        :params="params"
        table-id="drivertable"
        url="api/backend/driver/datatable"
      />
    </div>
  </div>
</template>

<script>
import ButtonAddNew from '@/components/UiElements/ButtonAddNew'
import Datatable from '@/components/Datatable'
import { mapGetters } from 'vuex'
export default {
  name: 'DriverList',
  components: { Datatable, ButtonAddNew },
  computed: {
    ...mapGetters({
      dcid: 'delivery_company/dcid'
    }),
    params () {
      return {
        lang: this.$i18n.locale,
        dcid: this.dcid
      }
    },
    columns () {
      return [
        {
          data: 'avatar',
          name: 'avatar',
          title: this.$t('label.avatar')
        },
        {
          data: 'name',
          name: 'name',
          title: this.$t('label.name')
        },
        {
          data: 'info',
          name: 'info',
          title: this.$t('menu.delivery')
        },
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
        '.btn-show'
      ])
      $(function () {
        $(document).on('click', '.btn-show', function () {
          self.routerPush({
            name: 'show-driver',
            params: {
              id: $(this).attr('data-id')
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

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
        table-id="package-table"
        url="api/backend/package/datatable"
      />
    </div>
  </div>
</template>
<script>
import Datatable from '@/components/Datatable'
import ButtonAddNew from '@/components/UiElements/ButtonAddNew'
export default {
  name: 'PackageList',
  components: { ButtonAddNew, Datatable },
  computed: {
    params () {
      return {
        lang: this.$i18n.locale
      }
    },
    columns () {
      return [
        {
          data: 'shop',
          name: 'shop',
          title: this.$t('label.shop'),
          render: (data, type, row) => {
            if (data) {
              return data.name_en
            } else {
              return '-'
            }
          }
        },
        { data: 'package', name: 'package', title: this.$t('menu.package'), width: '35%' },
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
            name: 'show-package',
            params: {
              id: $(this).attr('data-id')
            }
          })
        })
        $(document).on('click', '.btn-edit', function () {
          self.routerPush({
            name: 'edit-package',
            params: {
              id: $(this).attr('data-id')
            }
          })
        })
        $(document).on('click', '.btn-delete', function () {
          self.deleteRecord(
            $(this).attr('data-id'),
            self.$t('label.package'),
            '/api/backend/package/delete'
          )
        })
      })
    },
    deleteRecord (id, title, api) {
      console.log(id)
      const self = this
      this.onConfirm({
        title,
        text: self.$t('label.swal.desc'),
        confirmButtonText: self.$t('label.swal.yes'),
        confirmButtonColor: '#ed524f',
        cancelButtonColor: '#a0a0a0'
      }).then(() => {
        self.$isLoading(true)
        this.$axios.post(this.$base_api + api, {
          id
        }).then(() => {
          self.$refs.oTable.draw()
        }).finally(() => {
          self.$isLoading(false)
        })
      })
    }
  }
}
</script>

<style scoped>

</style>

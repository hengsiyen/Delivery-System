<template>
  <div class="card">
    <div class="card-header with-border">
      <h3 class="card-title">
        {{ $t('text.list') }}
      </h3>
    </div>
    <div class="card-body">
      <Datatable
        ref="oTable"
        :columns="columns"
        table-id="village-table"
        url="api/backend/location/village/datatable"
      />
    </div>
  </div>
</template>
<script>
import Datatable from '@/components/Datatable'
export default {
  name: 'VillageList',
  head () {
    return {
      title: this.$t('menu.village'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  },
  components: { Datatable },
  computed: {
    columns () {
      return [
        { data: 'name_km', name: 'name_km', title: this.$t('table.nameInKhmer') },
        { data: 'name_en', name: 'name_en', title: this.$t('table.nameInEnglish') },
        {
          data: 'created_at',
          name: 'created_at',
          searchable: false,
          title: this.$t('table.createdAt'),
          render: (data, type, row) => {
            return this.getDateFormat(data)
          }
        }
        // {
        //   data: 'actions',
        //   name: 'actions',
        //   searchable: false,
        //   orderable: false,
        //   title: this.$t('label.action')
        // }
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
            name: 'show-village',
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

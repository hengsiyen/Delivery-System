<template>
  <div class="box box-primary">
    <div class="box-header with-border">
      <h3 class="box-title">
        {{ $t('menu.gender') }}
      </h3>
    </div>
    <div class="box-body">
      <table id="gender-table" class="table table-hover table-full-width table-striped table-bordered">
        <thead>
          <tr>
            <th>{{ $t('table.nameInKhmer') }}</th>
            <th>{{ $t('table.nameInEnglish') }}</th>
            <th>{{ $t('table.createdAt') }}</th>
          </tr>
        </thead>
        <tbody />
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Index',
  data () {
    return {
      oTable: null
    }
  },
  mounted () {
    this.oTable = this.datatable()
  },
  watch: {
    '$i18n.locale' () {
      this.oTable.clear()
      this.oTable.destroy()
      this.oTable = this.datatable()
      this.oTable.draw(true)
    }
  },
  methods: {
    datatable () {
      const self = this
      return $('#gender-table').DataTable({
        stateSave: true,
        processing: true,
        serverSide: true,
        scrollX: true,
        pageLength: 100,
        ajax: {
          method: 'POST',
          url: process.env.VUE_APP_API + '/api/backend/gender/datatable',
          error: (xhr, error, thrown) => {
            self.onResponseError(xhr)
          }
        },
        columns: [
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
        ],
        language: {
          url: `/locale/${self.$i18n.locale}.json`
        },
        fixedColumns: true,
        order: [
          [2, 'desc']
        ]
      })
    }
  },
  head () {
    return {
      title: this.$t('menu.gender'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  },
  beforeDestroy () {
    this.oTable.clear()
    this.oTable.destroy()
  }
}
</script>

<style scoped>

</style>

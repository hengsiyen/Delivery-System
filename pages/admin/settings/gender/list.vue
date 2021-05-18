<template>
  <div class="box box-primary">
    <div class="box-header with-border">
      <h3 class="box-title">
        {{ $t('menu.gender') }}
      </h3>
    </div>
    <div class="box-body">
      <Datatable
        :columns="columns"
        table-id="gender-table"
        url="api/backend/gender/datatable"
      />
    </div>
  </div>
</template>
<script>
import Datatable from '@/components/Datatable'
export default {
  name: 'Index',
  head () {
    return {
      title: this.$t('menu.gender'),
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
      ]
    }
  }
}
</script>

<style scoped>

</style>

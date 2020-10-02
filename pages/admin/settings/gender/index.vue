<template>
  <div class="box box-primary">
    <div class="box-header with-border">
      <h3 class="box-title">
        {{ $t('menu.gender') }}
      </h3>
    </div>
    <div class="box-body">
      <table class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Laravel</td>
            <td>Laravel</td>
          </tr>
        </tbody>
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
  methods: {
    datatable () {
      return $('#gender-table').datatable()
    }
  },
  head () {
    return {
      title: this.$t('menu.gender'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="row">
    <div class="col-md-12">
      <table
        :id="tableId"
        style="width: 100%;"
        class="table table-striped table-bordered"
      >
        <thead>
          <tr>
            <th
              v-for="(header, key) in columns"
              :key="key"
            >
              {{ header.title }}
            </th>
          </tr>
        </thead>
        <tbody />
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Datatable',
  data () {
    return {
      oTable: null
    }
  },
  props: {
    tableId: {
      type: String,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    params: {
      type: Object,
      default: () => ({})
    },
    order: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      default: () => ({})
    },
    isWatchParams: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    '$i18n.locale' () {
      this.reinitialise()
    },
    params () {
      if (this.isWatchParams) {
        this.oTable.draw()
      }
    }
  },
  computed: {
    cols () {
      if (this.oTable) {
        const header = []
        this.oTable.columns().every(function () {
          header.push({
            name: this.header().innerHTML,
            visible: this.visible()
          })
        })
        return header
      }
      return []
    },
    createdAtIndex () {
      return this.columns.findIndex(column => column.data === 'created_at')
    }
  },
  methods: {
    reinitialise () {
      try {
        this.oTable.destroy()
        // this.oTable = null
        this.oTable = this.datatable()
        this.draw()
        // eslint-disable-next-line no-empty
      } catch (error) {}
    },
    draw () {
      this.oTable.draw()
    },
    datatable () {
      let order = this.order
      if (!(this.order && this.order.length > 0)) {
        order = [[this.createdAtIndex, 'desc']]
      }
      const options = Object.assign({
        stateSave: true,
        processing: true,
        serverSide: true,
        scrollX: true,
        pageLength: 100,
        language: {
          url: `/locale/${this.$i18n.locale}.json`,
          buttons: {
            colvis: this.$t('string.show_hide_columns')
          }
        },
        ajax: {
          method: 'POST',
          url: `${process.env.VUE_APP_API}/${this.url}`,
          data: (t) => {
            const params = Object.assign({
              show: this.$t('string.show'),
              edit: this.$t('string.edit'),
              delete: this.$t('string.delete'),
              ...this.params
            }, this.params)

            for (const key in params) {
              t[key] = params[key]
            }
          },
          error: (xhr, error, thrown) => {
            this.onResponseError(xhr)
          }
        },
        order,
        columns: this.columns
      }, this.options)
      return $(`#${this.tableId}`).DataTable(options)
    }
  },
  mounted () {
    this.oTable = this.datatable()
  }
}
</script>

<style scoped>

</style>

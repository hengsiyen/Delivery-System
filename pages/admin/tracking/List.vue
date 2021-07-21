<template>
  <div class="col-lg-12">
    <div class="form-inline mb-4">
      <div class="form-group row w-100">
        <div class="input-group col-lg-3">
          <div class="input-group-prepend">
            <span class="input-group-text bg-white border-right-0">
              <i class="fas fa-search" />
            </span>
          </div>
          <input
            v-model="search_query"
            :placeholder="$t('label.search') + '...'"
            class="form-control mr-2"
            type="search"
            @change="refreshDatatable"
          >
        </div>
        <button
          class="btn btn-primary"
          type="button"
          data-toggle="collapse"
          data-target="#advancedFilter"
          aria-expanded="false"
          aria-controls="advancedFilter"
        >
          <strong><i class="fas fa-filter mr-2" /> {{ $t('btn.advanced_filters') }}</strong>
        </button>
      </div>
    </div>
    <div id="advancedFilter" class="collapse">
      <div class="card card-body">
        <div class="row">
          <div class="col-xl-3">
            <div class="form-group">
              <label>
                {{ $t('label.status') }}
              </label>
              <select
                id="status"
                v-model="status"
                name="status"
                class="custom-select"
                @change="refreshDatatable"
              >
                <option :value="null">
                  {{ $t('label.all') }}
                </option>
                <template v-if="package_statuses && package_statuses.length">
                  <option v-for="(item, key) in package_statuses" :key="key" :value="item">
                    {{ item['name_' + $i18n.locale] }}
                  </option>
                </template>
              </select>
            </div>
          </div>
          <div class="col-xl-3">
            <div class="form-group">
              <label>
                {{ $t('label.shop') }}
              </label>
              <select
                id="shop"
                v-model="shop"
                name="shop"
                class="custom-select"
                @change="refreshDatatable"
              >
                <option :value="null">
                  {{ $t('label.all') }}
                </option>
                <template v-if="shops && shops.length">
                  <option v-for="(item, key) in shops" :key="key" :value="item">
                    {{ item['name_en'] }}
                  </option>
                </template>
              </select>
            </div>
          </div>
          <div class="col-xl-3">
            <div class="form-group">
              <label>
                {{ $t('menu.driver') }}
              </label>
              <select
                id="driver"
                v-model="driver"
                name="driver"
                class="custom-select"
                @change="refreshDatatable"
              >
                <option :value="null">
                  {{ $t('label.all') }}
                </option>
                <template v-if="drivers && drivers.length">
                  <option v-for="(item, key) in drivers" :key="key" :value="item">
                    {{ item['full_name'] }}
                  </option>
                </template>
              </select>
            </div>
          </div>
          <div class="col-xl-3">
            <div class="form-group">
              <label>
                {{ $t('label.payment_status') }}
              </label>
              <select
                id="payment_status"
                v-model="is_paid"
                name="payment_status"
                class="custom-select"
                @change="refreshDatatable"
              >
                <option :value="null">
                  {{ $t('label.all') }}
                </option>
                <template v-if="payment_statuses && payment_statuses.length">
                  <option v-for="(item, key) in payment_statuses" :key="key" :value="item">
                    {{ item['name_' + $i18n.locale] }}
                  </option>
                </template>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-3">
            <div class="form-group">
              <label>
                {{ $t('label.third_party_company') }}
              </label>
              <select
                id="partner_company"
                v-model="partner_company"
                name="partner_company"
                class="custom-select"
                @change="refreshDatatable"
              >
                <option :value="null">
                  {{ $t('label.all') }}
                </option>
                <template v-if="partner_companies && partner_companies.length">
                  <option v-for="(item, key) in partner_companies" :key="key" :value="item">
                    {{ item['name_en'] }}
                  </option>
                </template>
              </select>
            </div>
          </div>
          <div class="col-xl-3">
            <div class="form-group">
              <label>{{ $t('table.createdAt') }}</label>
              <date-picker
                v-model="created_at"
                :placeholder="$t('string.select_range_date')"
                :lang="datePickerLang"
                :format="date_format"
                input-class="form-control"
                @input="refreshDatatable"
                @clear="refreshDatatable"
              />
            </div>
          </div>
          <div class="col-xl-3">
            <div class="form-group">
              <label>{{ $t('table.assignedAt') }}</label>
              <date-picker
                v-model="assigned_at"
                :placeholder="$t('string.select_range_date')"
                :lang="datePickerLang"
                :format="date_format"
                input-class="form-control"
                @input="refreshDatatable"
                @clear="refreshDatatable"
              />
            </div>
          </div>
          <div class="col-xl-3">
            <div class="form-group">
              <label>{{ $t('table.finishedAt') }}</label>
              <date-picker
                v-model="finished_at"
                :placeholder="$t('string.select_range_date')"
                :lang="datePickerLang"
                :format="date_format"
                input-class="form-control"
                @input="refreshDatatable"
                @clear="refreshDatatable"
              />
            </div>
          </div>
        </div>
        <div class="w-100 text-right">
          <button class="btn btn-default">
            <strong>
              <i class="fas fa-eraser mr-2" />
              {{ $t('btn.reset') }}
            </strong>
          </button>
        </div>
      </div>
    </div>
    <div class="w-100 d-flex align-items-center filter-items">
      <div v-if="search_query" class="mb-3 rounded py-1 px-2 text-white bg-white shadow-item">
        {{ $t('label.search') }}: {{ search_query }}
        <button class="btn btn-default btn-xs" @click="search_query= null">
          <i class="fa fa-times" />
        </button>
      </div>
      <div v-if="status" class="mb-3 rounded py-1 px-2 text-white bg-white shadow-item">
        {{ $t('label.status') }}: {{ status['name_' +$i18n.locale] }}
        <button class="btn btn-default btn-xs" @click="status = null">
          <i class="fa fa-times" />
        </button>
      </div>
      <div v-if="shop" class="mb-3 rounded py-1 px-2 text-white bg-white shadow-item">
        {{ $t('label.shop') }}: {{ shop.name_en }}
        <button class="btn btn-default btn-xs" @click="shop = null">
          <i class="fa fa-times" />
        </button>
      </div>
      <div v-if="driver" class="mb-3 rounded py-1 px-2 text-white bg-white shadow-item">
        {{ $t('menu.driver') }}: {{ driver.full_name }}
        <button class="btn btn-default btn-xs" @click="driver = null">
          <i class="fa fa-times" />
        </button>
      </div>
      <div v-if="is_paid" class="mb-3 rounded py-1 px-2 text-white bg-white shadow-item">
        {{ $t('label.payment_status') }}: {{ is_paid['name_' + $i18n.locale] }}
        <button class="btn btn-default btn-xs" @click="is_paid = true">
          <i class="fa fa-times" />
        </button>
      </div>
      <div v-if="partner_company" class="mb-3 rounded py-1 px-2 text-white bg-white shadow-item">
        {{ $t('label.third_party_company') }}: {{ partner_company.name_en }}
        <button class="btn btn-default btn-xs" @click="partner_company = null">
          <i class="fa fa-times" />
        </button>
      </div>
      <div v-if="created_at" class="mb-3 rounded py-1 px-2 text-white bg-white shadow-item">
        {{ $t('table.createdAt') }}: {{ $moment(created_at).format(date_format) }}
        <button class="btn btn-default btn-xs" @click="created_at = null">
          <i class="fa fa-times" />
        </button>
      </div>
      <div v-if="assigned_at" class="mb-3 rounded py-1 px-2 text-white bg-white shadow-item">
        {{ $t('table.assignedAt') }}: {{ $moment(assigned_at).format(date_format) }}
        <button class="btn btn-default btn-xs" @click="assigned_at = null">
          <i class="fa fa-times ml-2" />
        </button>
      </div>
      <div v-if="finished_at" class="mb-3 rounded py-1 px-2 text-white bg-white shadow-item">
        {{ $t('table.finishedAt') }}: {{ $moment(finished_at).format(date_format) }}
        <button class="btn btn-default btn-xs">
          <i class="fa fa-times ml-2" @click="finished_at = null" />
        </button>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <Datatable
          ref="oTable"
          :columns="columns"
          :is-watch-params="true"
          :params="params"
          table-id="package-table"
          url="api/backend/package/datatable"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Datatable from '@/components/Datatable'

export default {
  name: 'TrackingList',
  components: { Datatable },
  computed: {
    params () {
      // eslint-disable-next-line camelcase
      let createdAt = null
      let assignedAt = null
      let finishedAt = null
      if (this.created_at) {
        createdAt = this.$moment(this.created_at).format('YYYY-MM-DD')
      }
      if (this.assigned_at) {
        assignedAt = this.$moment(this.assigned_at).format('YYYY-MM-DD')
      }
      if (this.finished_at) {
        finishedAt = this.$moment(this.finished_at).format('YYYY-MM-DD')
      }
      return {
        lang: this.$i18n.locale,
        status: this.status ? this.status.value : null,
        shop_id: this.shop ? this.shop._id : null,
        driver_id: this.driver ? this.driver._id : null,
        is_paid: this.is_paid ? this.is_paid.value : null,
        partner_company_id: this.partner_company ? this.partner_company._id : null,
        created_at: createdAt,
        assigned_at: assignedAt,
        finished_at: finishedAt,
        search_query: this.search_query
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
        { data: 'status', name: 'status', title: this.$t('label.status') },
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
    },
    datePickerLang () {
      return this.$datepickerLocale[this.$i18n.locale].lang
    }
  },
  data () {
    return {
      package_statuses: [],
      shops: [],
      drivers: [],
      payment_statuses: [],
      partner_companies: [],

      date_format: 'DD/MM/YYYY',
      search_query: null,
      status: null,
      shop: null,
      driver: null,
      is_paid: null,
      partner_company: null,
      created_at: new Date(),
      assigned_at: null,
      finished_at: null
    }
  },
  mounted () {
    this.getFetchData()
    this.loadAction()
  },
  methods: {
    refreshDatatable () {
      this.$refs.oTable.draw(true)
    },
    clearFilter () {
      this.status = null
      this.shop_id = null
      this.driver_id = null
      this.is_paid = null
      this.partner_company_id = null
      this.created_at = new Date()
      this.assigned_at = null
      this.finished_at = null
    },
    getFetchData () {
      this.$axios.get(this.$base_api + '/api/backend/fetch-data/data-for-tracking')
        .then((res) => {
          const r = res.data.data
          this.package_statuses = r.package_statuses
          this.shops = r.shops
          this.drivers = r.drivers
          this.payment_statuses = r.payment_statuses
          this.partner_companies = r.partner_companies
        }).catch((error) => {
          this.onResponseError(error)
        })
    },
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

<style scoped lang="scss">
.search {
  width: 25%;
}
.filter-items {
  & .shadow-item {
    display: flex;
    align-items: center;
    margin-right: 8px;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.13), 0 1px 3px rgba(0, 0, 0, 0.20);
    &:last-child{
      margin-right: 0;
    }

    & .btn {
      background-color: white;
      margin-left: 8px;
      border: 0;
      &:hover {
        background-color: #e9ecef;
      }
    }
  }
}

</style>

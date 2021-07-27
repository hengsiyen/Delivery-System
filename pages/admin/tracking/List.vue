<template>
  <div class="col-lg-12">
    <div class="form-group row mb-3">
      <div class="input-group input-group-lg col-lg-10">
        <input
          v-model="search_query"
          :placeholder="$t('label.search') + '...'"
          class="form-control"
          type="search"
        >
        <div class="input-group-append">
          <span class="input-group-text bg-white border-left-0">
            <i class="fas fa-search" />
          </span>
        </div>
      </div>
      <div class="col-lg-2">
        <button
          class="btn btn-primary btn-lg btn-block"
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
          <button class="btn btn-default" @click="clearFilter">
            <strong>
              <i class="fas fa-eraser mr-2" />
              {{ $t('btn.reset') }}
            </strong>
          </button>
        </div>
      </div>
    </div>
    <div class="w-100 d-flex align-items-center filter-items flex-wrap">
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
    <template v-if="onloading">
      <div class="onloading">
        <i class="fas fa-circle-notch fa-spin" />
      </div>
    </template>
    <template v-else>
      <div class="row">
        <div class="package_items col-12">
          <template v-if="list_packages && list_packages.length">
            <template v-for="(item, key) in list_packages">
              <div :key="key" class="package_item">
                <div class="col-lg-4">
                  <div class="package_item-block">
                    <div class="package_item-block-icon">
                      <i class="fas fa-user mr-2" />
                    </div>
                    <div class="package_item-label text-truncate">
                      {{ item.customer_name }}
                    </div>
                  </div>
                  <div class="package_item-block">
                    <div class="package_item-block-icon">
                      <i class="fas fa-phone mr-2" />
                    </div>
                    <div class="package_item-label text-truncate">
                      {{ item.customer_phone }}
                    </div>
                  </div>
                  <div class="package_item-block">
                    <div class="package_item-block-icon">
                      <i class="fas fa-sticky-note mr-2" />
                    </div>
                    <div class="package_item-label text-truncate">
                      {{ checkStatus(item.final_status) }}
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="package_item-block">
                    <div class="package_item-block-icon">
                      <i class="fas fa-store mr-2" />
                    </div>
                    <div class="package_item-label text-truncate">
                      {{ item.shop ? item.shop.name_en : '' }}
                    </div>
                  </div>
                  <div class="package_item-block">
                    <div class="package_item-block-icon">
                      <i class="fas fa-map-marker-alt mr-2" />
                    </div>
                    <div class="package_item-label text-truncate">
                      {{ item.customer_address }}
                    </div>
                  </div>
                  <div class="package_item-block">
                    <div class="package_item-block-icon">
                      <i class="fas fa-calendar-alt mr-2" />
                    </div>
                    <div v-if="item.request_delivery_at" class="package_item-label text-truncate">
                      {{ $moment(item.request_delivery_at).format('lll') }}
                    </div>
                    <div v-else class="package_item-label text-truncate">
                      {{ $moment(item.created_at).format('lll') }}
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 package_item-block-action text-right">
                  <div class="package_item-block-btn">
                    <NuxtLink
                      class="btn btn-default btn-sm btn-block"
                      :to="{name: 'show-package', params:{id: item._id}}"
                    >
                      <i class="fas fa-eye mr-2" />
                      <strong>{{ $t('label.view') }}</strong>
                    </NuxtLink>
                  </div>
                  <div class="package_item-block-btn">
                    <button class="btn btn-default btn-sm btn-block">
                      <i class="fas fa-edit mr-2" />
                      <strong>{{ $t('btn.edit') }}</strong>
                    </button>
                  </div>
                  <div class="package_item-block-btn">
                    <div class="dropdown">
                      <button
                        id="dropdownMenuButton"
                        class="btn btn-default btn-sm btn-block dropdown-toggle dropdown-no-icon"
                        type="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i class="fas fa-ellipsis-v mr-2" />
                        <strong>Other</strong>
                      </button>
                      <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </template>
          <template v-else>
            <div class="package_item align-items-center w-100 justify-content-center">
              {{ $t('label.no_result_found') }}
            </div>
          </template>
        </div>
      </div>
      <div v-if="list_packages && list_packages.length > 1" class="row">
        <div class="col-12">
          <paginate
            v-model="page"
            :page-count="total_pages"
            :page-range="3"
            :margin-pages="2"
            :click-handler="getTrackingPackageList"
            :prev-text="`<span class='d-none d-sm-inline-block text-bold'>${$t('btn.prev')}</span>`"
            :next-text="`<span class='d-none d-sm-inline-block text-bold'>${$t('btn.next')}</span>`"
            :container-class="'pagination justify-content-end mt-3'"
            :page-class="'page-item outline-none ml-0 mr-1 mx-sm-1 text-bold'"
            :prev-class="'page-item outline-none ml-0 mr-1 mx-sm-1'"
            :next-class="'page-item outline-none ml-0 mr-1 mx-sm-1'"
            :page-link-class="'page-link font-bold box-shadow-none rounded border-2'"
            :prev-link-class="'page-link font-bold box-shadow-none rounded border-2'"
            :next-link-class="'page-link font-bold box-shadow-none rounded border-2'"
          />
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { debounce } from 'debounce'

export default {
  name: 'TrackingList',
  computed: {
    ...mapGetters({
      number_per_page: 'delivery_company/number_per_page'
    }),
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
    datePickerLang () {
      return this.$datepickerLocale[this.$i18n.locale].lang
    }
  },
  watch: {
    params () {
      this.refreshDatatable()
    },
    search_query (val) {
      this.onloading = true
      if (!this.awaitingSearch) {
        if (this.time_out) {
          clearTimeout(this.time_out)
        }
        this.time_out = setTimeout(() => {
          this.getTrackingPackageList(1)
          this.awaitingSearch = false
        }, 1000)
      }
      this.awaitingSearch = true
    }
  },
  data () {
    return {
      onloading: true,
      package_statuses: [],
      shops: [],
      drivers: [],
      payment_statuses: [],
      partner_companies: [],
      list_packages: [],

      page: 1,
      total_pages: 0,
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
    this.getTrackingPackageList(1)
  },
  methods: {
    refreshDatatable () {
      this.onloading = true
      setTimeout(() => {
        this.getTrackingPackageList(1)
      }, 500)
    },
    clearFilter () {
      this.search_query = null
      this.status = null
      this.is_paid = null
      this.shop_id = null
      this.shop = null
      this.driver_id = null
      this.driver = null
      this.partner_company_id = null
      this.partner_company = null
      this.created_at = new Date()
      this.assigned_at = null
      this.finished_at = null
      this.refreshDatatable()
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
    getTrackingPackageList: debounce(function (page = null) {
      if (page) {
        this.page = page
      }
      this.$axios.post(this.$base_api + '/api/backend/tracking/list',
        Object.assign({
          page: this.page,
          number_per_page: this.number_per_page,
          ...this.params
        }, this.params))
        .then((res) => {
          this.total_pages = res.data.total_pages
          this.list_packages = res.data.data
        }).catch((error) => {
          this.onResponseError(error)
        }).finally(() => {
          this.onloading = false
        })
    }, 500)
  }
}
</script>

<style scoped lang="scss">
.package_item {
  background-color: white;
  border-radius: 0.25rem;
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #ced4da;
  display: flex;
  &-block {
    display: flex;
    align-items: center;
    margin: 8px;
    padding: 2px;
    &-icon {
      width: 25px;
      margin-right: 8px;
      text-align: center;
    }
    &-action {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      flex-direction: column;
    }
    &-btn {
      width: 120px;
      margin-bottom: 8px;
      &:last-child{
        margin-bottom: 0;
      }
    }
  }
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

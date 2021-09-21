<template>
  <div class="col-lg-12">
    <div class="form-group row mb-3">
      <div class="input-group input-group-lg col-lg-8">
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
      <div class="col-lg-2">
        <ButtonAddNew
          :link-to="'create-package'"
          :custom-class="'btn btn-success btn-lg btn-block text-capitalize'"
        />
      </div>
    </div>
    <div id="advancedFilter" class="collapse">
      <div class="card card-body">
        <div class="row">
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
          <div class="col-xl-2">
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
          <div class="col-xl-2">
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
          <div class="col-xl-2">
            <div class="form-group">
              <label>{{ $t('table.createdAt') }}</label>
              <date-picker
                v-model="created_at"
                :placeholder="$t('string.select_date')"
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
                <div class="col-md-2 col-lg-2 col-xl-1">
                  <template v-if="item.media">
                    <img :src="getSrc(item.media.src)" alt="" class="img-thumbnail">
                  </template>
                  <template v-else>
                    <img :src="package_img" alt="" class="img-thumbnail">
                  </template>
                </div>
                <div class="col-md-4 col-lg-4 col-xl-5">
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
                      <label class="mb-0">{{ item.customer_phone }}</label>
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
                  <div v-if="item.delivery_charge" class="package_item-block">
                    <div class="package_item-block-icon">
                      <i class="fas fa-donate mr-2" />
                    </div>
                    <div class="package_item-label text-truncate">
                      {{ item.delivery_charge | numFormat(checkFormatCurrency(item.delivery_charge_currency)) }}
                      {{ item.delivery_charge_currency ? item.delivery_charge_currency.code : '' }}
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-lg-4 col-xl-4">
                  <div v-if="item.code" class="package_item-block">
                    <div class="package_item-block-icon">
                      <i class="fas fa-qrcode mr-2" />
                    </div>
                    <div class="package_item-label text-truncate">
                      <label class="mb-0">{{ item.code }}</label>
                    </div>
                  </div>
                  <div class="package_item-block">
                    <div class="package_item-block-icon">
                      <i class="fas fa-store mr-2" />
                    </div>
                    <div class="package_item-label text-truncate">
                      {{ item.shop ? item.shop.name_en : '' }}
                    </div>
                  </div>
                  <div v-if="item.driver" class="package_item-block">
                    <div class="package_item-block-icon">
                      <i class="fas fa-motorcycle mr-2" />
                    </div>
                    <div class="package_item-label text-truncate">
                      {{ item.driver.full_name }}
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
                    <div class="package_item-status text-truncate ml-3" :class="colorStatus(item.final_status)">
                      {{ checkStatus(item.final_status) }}
                    </div>
                  </div>
                </div>
                <div class="col-md-2 col-lg-2 col-xl-2 package_item-block-action text-right">
                  <div class="package_item-block-btn">
                    <NuxtLink
                      class="btn btn-default btn-sm btn-block"
                      :to="{name: 'show-package', params:{id: item._id}}"
                    >
                      <i class="fas fa-eye mr-2" />
                      <strong>{{ $t('label.view') }}</strong>
                    </NuxtLink>
                    <template v-if="showBtnAssign(item)">
                      <button
                        type="button"
                        class="btn btn-default btn-sm btn-block"
                        data-toggle="modal"
                        :data-target="'#driverModal' + item._id"
                        @click="openDriverModal(item)"
                      >
                        <i class="fas fa-user-plus mr-2" />
                        <strong>{{ item.driver_id ? $t('btn.change_driver') : $t('btn.assign') }}</strong>
                      </button>
                    </template>
                    <div
                      :id="'driverModal' + item._id"
                      class="modal fade"
                      tabindex="-1"
                      data-backdrop="static"
                    >
                      <AssignDriverModal
                        :ref="'driverModal' + item._id"
                        :package-data="item"
                        :currencies="currencies"
                        @onSubmit="refreshDatatable"
                      />
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
      <div v-if="list_packages && total_pages > 1" class="row">
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
import ButtonAddNew from '@/components/UiElements/ButtonAddNew'
import AssignDriverModal from '@/pages/admin/package/_components/AssignDriverModal'

export default {
  name: 'TrackingList',
  components: { AssignDriverModal, ButtonAddNew },
  computed: {
    ...mapGetters({
      number_per_page: 'delivery_company/number_per_page',
      currencies: 'delivery_company/currencies'
    }),
    params () {
      // eslint-disable-next-line camelcase
      let createdAt = null
      if (this.created_at) {
        createdAt = this.$moment(this.created_at).format('YYYY-MM-DD')
      }
      return {
        lang: this.$i18n.locale,
        status: this.status ? this.status.value : null,
        shop_id: this.shop ? this.shop._id : null,
        is_paid: this.is_paid ? this.is_paid.value : null,
        partner_company_id: this.partner_company ? this.partner_company._id : null,
        created_at: createdAt,
        search_query: this.search_query
      }
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
      is_paid: null,
      partner_company: null,
      created_at: null
    }
  },
  mounted () {
    this.getFetchData()
    this.getTrackingPackageList(1)
  },
  methods: {
    openDriverModal (item = null) {
      if (this.$refs['driverModal' + item._id]) {
        if (item && item.driver_id && item.delivery_charge) {
          this.$set(item, 'edit_deliver_charge', false)
          this.$set(item, 'edit_extra_charge', false)
          this.$refs['driverModal' + item._id][0].setDataDeliveryCharge(item)
        } else {
          this.$refs['driverModal' + item._id][0].setDefaultCurrency(this.currencies)
        }
        this.$refs['driverModal' + item._id][0].searchDriver(1, true, true)
        if (item.driver) {
          this.$store.dispatch('delivery/setDriver', item.driver)
        }
      }
    },
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
      this.partner_company_id = null
      this.partner_company = null
      this.created_at = new Date()
      this.refreshDatatable()
    },
    getFetchData () {
      this.$axios.get(this.$base_api + '/api/backend/fetch-data/data-for-tracking')
        .then((res) => {
          const r = res.data.data
          this.package_statuses = r.package_statuses
          this.shops = r.shops
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
@import "../../../assets/scss/components/list_item";
.search {
  width: 25%;
}
</style>

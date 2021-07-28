<template>
  <div class="card position-relative">
    <div class="card-body">
      <div class="row h-100">
        <div class="col-xl-6 h-100 border-right">
          <div class="form-group">
            <div class="input-group">
              <input
                v-model="search_package"
                type="search"
                class="form-control form-control-lg w-65"
                :placeholder="$t('label.search') + '...'"
              >
              <select
                id="search_type"
                v-model="search_type"
                name="search_type"
                class="custom-select custom-select-lg w-35 search__type"
              >
                <option value="shop">
                  Shop
                </option>
                <option value="address">
                  Address
                </option>
                <option value="code">
                  Code
                </option>
              </select>
            </div>
          </div>
          <div class="p-2 mb-2 bg-light rounded">
            {{ $t('label.total_package') }}: {{ list_packages.length }}
          </div>
          <template v-if="onloading">
            <div class="onloading">
              <i class="fas fa-circle-notch fa-spin" />
            </div>
          </template>
          <template v-else>
            <div class="package__items">
              <template v-if="list_packages && list_packages.length">
                <div
                  v-for="(item, key) in list_packages"
                  :key="key"
                  class="package__item"
                  @click="selectPackage(item)"
                >
                  <div :key="key" class="list_item">
                    <div class="col-md-2 col-lg-2">
                      <template v-if="item.media">
                        <div>sdfsf</div>
                      </template>
                      <template v-else>
                        <div class="package__item-image">
                          <img src="/img/package.png" alt="" width="100%">
                        </div>
                      </template>
                    </div>
                    <div class="col-md-5 col-lg-5">
                      <div class="list_item-block">
                        <div class="list_item-block-icon">
                          <i class="fas fa-user mr-2" />
                        </div>
                        <div class="list_item-label text-truncate">
                          {{ item.customer_name }}
                        </div>
                      </div>
                      <div class="list_item-block">
                        <div class="list_item-block-icon">
                          <i class="fas fa-phone mr-2" />
                        </div>
                        <div class="list_item-label text-truncate">
                          {{ item.customer_phone }}
                        </div>
                      </div>
                      <div class="list_item-block">
                        <div class="list_item-block-icon">
                          <i class="fas fa-dollar-sign mr-2" />
                        </div>
                        <div class="list_item-label text-truncate">
                          {{ item.price | numFormat(item.currency && item.currency.code === 'KHR' ? num_format_km : num_format_en ) }}
                          {{ item.currency ? item.currency.code : null }}
                        </div>
                      </div>
                      <div class="list_item-block">
                        <div class="list_item-block-icon">
                          <i class="fas fa-sticky-note mr-2" />
                        </div>
                        <div class="list_item-status text-truncate" :class="colorStatus(item.final_status)">
                          {{ checkStatus(item.final_status) }}
                        </div>
                      </div>
                    </div>
                    <div class="col-md-5 col-lg-5">
                      <div class="list_item-block">
                        <div class="list_item-block-icon">
                          <i class="fas fa-store mr-2" />
                        </div>
                        <div class="list_item-label text-truncate">
                          {{ item.shop ? item.shop.name_en : '' }}
                        </div>
                      </div>
                      <div class="list_item-block">
                        <div class="list_item-block-icon">
                          <i class="fas fa-map-marker-alt mr-2" />
                        </div>
                        <div class="list_item-label text-truncate">
                          {{ item.customer_address }}
                        </div>
                      </div>
                      <div v-if="item.partner_company" class="list_item-block">
                        <div class="list_item-block-icon">
                          <i class="fas fa-truck mr-2" />
                        </div>
                        <div class="list_item-label text-truncate">
                          {{ item.partner_company.name_en }}
                        </div>
                      </div>
                      <div class="list_item-block">
                        <div class="list_item-block-icon">
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
                  </div>
                </div>
              </template>
              <template v-else>
                <NoResult />
              </template>
              <infinite-loading spinner="spiral" :identifier="packageInfiniteId" @infinite="getPackages">
                <div slot="no-more" />
                <div slot="no-results" />
              </infinite-loading>
            </div>
          </template>
        </div>
        <div class="col-xl-6 h-100">
          <template v-if="selected_packages && selected_packages.length">
            <div class="form-group d-flex align-items-center justify-content-between text-right">
              <template v-if="selected_driver">
                <div class="d-flex align-items-center justify-content-between bg-light rounded pl-3 w-100">
                  <div>
                    <label class="mb-0">
                      {{ selected_driver.full_name }}
                    </label>
                  </div>
                  <div>
                    <button class="btn btn-lg btn-light" @click="setDriver(null)">
                      <i class="fas fa-times" />
                    </button>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="w-100">
                  <button
                    type="button"
                    class="btn btn-primary btn-lg"
                    data-toggle="modal"
                    data-target="#driverModal"
                    @click="openDriverModal"
                  >
                    {{ $t('label.selectDriver') }}
                  </button>
                </div>
              </template>
            </div>
            <div class="p-2 mb-2 bg-light rounded">
              Assign Package to Driver: {{ selected_packages.length }}
            </div>
            <div class="package__items-select">
              <div
                v-for="(item, key) in selected_packages"
                :key="key"
                class="list_item position-relative"
                style="padding: 35px 8px 8px 8px;"
              >
                <div class="col-md-2 col-lg-2">
                  <template v-if="item.media">
                    <div>sdfsf</div>
                  </template>
                  <template v-else>
                    <div class="package__item-image">
                      <img src="/img/package.png" alt="" width="100%">
                    </div>
                  </template>
                </div>
                <div class="col-md-5 col-lg-5">
                  <div class="list_item-block">
                    <div class="list_item-block-icon">
                      <i class="fas fa-store mr-2" />
                    </div>
                    <div class="list_item-label text-truncate">
                      {{ item.shop ? item.shop.name_en : '' }}
                    </div>
                  </div>
                  <div class="list_item-block">
                    <div class="list_item-block-icon">
                      <i class="fas fa-map-marker-alt mr-2" />
                    </div>
                    <div class="list_item-label text-truncate">
                      {{ item.customer_address }}
                    </div>
                  </div>
                  <div v-if="item.partner_company" class="list_item-block">
                    <div class="list_item-block-icon">
                      <i class="fas fa-truck mr-2" />
                    </div>
                    <div class="list_item-label text-truncate">
                      {{ item.partner_company.name_en }}
                    </div>
                  </div>
                  <div class="list_item-block">
                    <div class="list_item-block-icon">
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
                <div class="col-md-5 col-lg-5">
                  <div class="form-group">
                    <label class="mb-0 font-s-14"> {{ $t('label.delivery_charge') }}</label>
                    <div class="input-group">
                      <input
                        id="price"
                        v-model="item.delivery_charge"
                        name="price"
                        type="number"
                        class="form-control"
                        :placeholder="$t('label.delivery_charge')"
                      >
                      <div v-if="currencies && currencies.length" id="button-price" class="input-group-append">
                        <button
                          v-for="(currency, sub_key) in currencies"
                          :key="sub_key"
                          class="btn"
                          type="button"
                          :class="item.delivery_charge_currency && item.delivery_charge_currency._id === currency._id ? 'btn-primary' : 'input-group-text'"
                          @click="item.delivery_charge_currency = currency"
                        >
                          {{ currency.code }}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div v-if="item.partner_company" class="form-group">
                    <label class="mb-0 font-s-14"> {{ $t('label.extra_charge') }}</label>
                    <div class="input-group">
                      <input
                        id="extra_charge"
                        v-model="item.extra_charge"
                        name="price"
                        type="number"
                        class="form-control"
                        :placeholder="$t('label.extra_charge')"
                      >
                      <div v-if="currencies && currencies.length" class="input-group-append">
                        <button
                          v-for="(currency, sub_key) in currencies"
                          :key="sub_key"
                          class="btn"
                          type="button"
                          :class="item.extra_charge_currency && item.extra_charge_currency._id === currency._id ? 'btn-primary' : 'input-group-text'"
                          @click="item.extra_charge_currency = currency"
                        >
                          {{ currency.code }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="position-absolute btn-remove">
                  <button class="btn btn-light btn-sm" @click="removePackage(item)">
                    <i class="fas fa-times" />
                  </button>
                </div>
              </div>
            </div>
            <div v-if="selected_driver && selected_packages.length" class="py-2 text-right">
              <button class="btn btn-lg btn-success" @click="assignPackageToDriver">
                {{ $t('label.assign_to_driver') }}
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div
      id="driverModal"
      class="modal fade"
      tabindex="-1"
      data-backdrop="static"
    >
      <DriverModal ref="driverModal" />
    </div>
  </div>
</template>

<script>
import { debounce } from 'debounce'
import DriverModal from '@/pages/admin/delivery/_components/DriverModal'
import { mapGetters } from 'vuex'
import NoResult from '@/components/NoResult'

export default {
  name: 'AssignPackage',
  components: { NoResult, DriverModal },
  data () {
    return {
      onloading: false,
      list_packages: [],
      selected_packages: [],
      sp_ids: [],
      search_package: null,
      page: 1,
      packageInfiniteId: +new Date(),
      search_type: 'shop',
      show_message: null
    }
  },
  computed: {
    ...mapGetters({
      selected_driver: 'delivery/select_driver',
      number_per_page: 'delivery_company/number_per_page',
      currencies: 'delivery_company/currencies',
      dcid: 'delivery_company/dcid',
      user: 'user/getUser',
      num_format_en: 'delivery_company/num_format_en',
      num_format_km: 'delivery_company/num_format_km'
    })
  },
  watch: {
    search_package (val) {
      this.onloading = true
      if (!this.awaitingSearchPackage) {
        if (this.time_out_package) {
          clearTimeout(this.time_out_package)
        }
        this.time_out_package = setTimeout(() => {
          this.searchPackage(1)
          this.awaitingSearchPackage = false
        }, 1000)
      }
      this.awaitingSearchPackage = true
    }
  },
  mounted () {
    this.searchPackage(1)
  },
  methods: {
    searchPackage (page = null) {
      this.page = 1
      if (page) {
        this.page = page
      }
      this.list_packages = []
      this.pacakgeInfiniteId += 1
      this.getPackages()
    },
    getPackages: debounce(function ($state) {
      this.$axios.post(this.$base_api + '/api/backend/package/list', {
        search: this.search_package,
        page: this.page,
        sp_ids: this.sp_ids,
        dcid: this.dcid,
        search_type: this.search_type,
        number_per_page: this.number_per_page
      }).then(({ data }) => {
        if (!(this.page > data.total_pages)) {
          this.page += 1
          this.list_packages.push(...data.data)
          $state.loaded()
        } else {
          $state.complete()
        }
      }).catch((error) => {
        this.onResponseError(error)
      }).finally(() => {
        this.onloading = false
      })
    }, 500),

    setDriver (driver) {
      this.$store.dispatch('delivery/setDriver', driver)
    },
    selectPackage (item) {
      this.$set(item, 'assigned_id', this.user._id)
      this.$set(item, 'assigned_at', this.$moment().format('YYYY-MM-DD hh:mm:ss'))
      this.$set(item, 'delivery_charge', 0)
      this.$set(item, 'extra_charge', 0)
      if (this.currencies && this.currencies.length) {
        this.$set(item, 'delivery_charge_currency', this.currencies[0])
        this.$set(item, 'extra_charge_currency', this.currencies[0])
      }
      this.selected_packages.push(item)
      this.sp_ids.push(item._id)
      this.list_packages.splice(this.list_packages.indexOf(item), 1)
    },
    openDriverModal () {
      if (this.$refs.driverModal) {
        this.$refs.driverModal.searchDriver(1, true)
      }
    },
    assignPackageToDriver () {
      this.$axios.post(this.$base_api + '/api/backend/delivery/assign-package', {
        driver_id: this.selected_driver._id,
        packeges: this.selected_packages
      }).then((res) => {
        this.show_message = res.data.message
        if (this.show_message) {
          this.$toastr('success', this.show_message['message_' + this.$i18n.locale], this.$t('label.assign_package'))
        }
        this.$store.dispatch('delivery/setDriver', null)
        this.selected_packages = []
        this.sp_ids = []
      }).catch((error) => {
        this.onResponseError(error)
      })
    },
    removePackage (item) {
      this.selected_packages.splice(this.selected_packages.indexOf(item), 1)
      this.sp_ids.splice(this.sp_ids.indexOf(item._id), 1)
      this.list_packages.push(item)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../assets/scss/components/list_item";
.btn-remove {
  top: 8px;
  right: 8px;
}

.card-body {
  min-height: calc(100vh - 210px);
  height: calc(100vh - 210px);
}

.package__items-select {
  height: calc(100% - 175px);
}

.package__items {
  height: calc(100% - 115px);
}

.package__items-select,
.package__items {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>

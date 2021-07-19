<template>
  <div class="card">
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
                  <template v-if="item.media">
                    <div>sdfsf</div>
                  </template>
                  <template v-else>
                    <div class="package__item-image">
                      <img src="/img/package.png" alt="" width="100%">
                    </div>
                  </template>
                  <div class="package__item-content">
                    <p><strong>{{ item.code }}</strong></p>
                    <p v-if="item.shop">
                      <i class="fas fa-store mr-2" /> {{ item.shop.name_en }}
                    </p>
                    <p><i class="fas fa-user mr-2" /> {{ item.customer_name }}</p>
                    <p><i class="fas fa-phone fa-rotate-90 mr-2" /> {{ item.customer_phone }}</p>
                    <p><i class="fas fa-map-marker-alt mr-2" /> {{ item.customer_address }}</p>
                    <p v-if="item.partner_company">
                      <i class="fas fa-truck mr-2" />{{ item.partner_company.name_en }}
                    </p>
                    <div class="package__item-badge">
                      <label v-if=" item.payment_type" class="badge badge-success">
                        {{ item.payment_type['name_' + $i18n.locale] }}
                      </label>
                      <label class="badge badge-primary">
                        {{ item.price }} {{ item.currency ? item.currency.symbol : '$' }}
                      </label>
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
                    data-target="#driverModalList"
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
                class="package__item"
                style="padding-top: 35px"
              >
                <template v-if="item.media">
                  <div>sdfsf</div>
                </template>
                <template v-else>
                  <div class="package__item-image d-flex align-items-center">
                    <img src="/img/package.png" alt="" width="100%">
                  </div>
                </template>
                <div class="package__item-content package__selected d-flex justify-content-center flex-column">
                  <p><strong>{{ item.code }}</strong></p>
                  <p><i class="fas fa-map-marker-alt mr-2" /> {{ item.customer_address }}</p>
                  <p v-if="item.partner_company">
                    <i class="fas fa-truck mr-2" />{{ item.partner_company.name_en }}
                  </p>
                  <div class="package__item-badge position-relative pt-1">
                    <label v-if=" item.payment_type" class="mb-0 badge badge-success">
                      {{ item.payment_type['name_' + $i18n.locale] }}
                    </label>
                    <label class="mb-0 badge badge-primary">
                      {{ item.price }} {{ item.currency ? item.currency.symbol : '$' }}
                    </label>
                  </div>
                </div>
                <div class="package__item-form d-flex justify-content-center flex-column">
                  <div class="form-group">
                    <label class="mb-0 font-s-14"> {{ $t('label.delivery_charge') }}</label>
                    <div class="input-group input-group-sm">
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
                    <div class="input-group input-group-sm">
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
                  <button class="btn" @click="removePackage(item)">
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
    <DriverModal ref="driverModal" />
  </div>
</template>

<script>
import { debounce } from 'debounce'
import DriverModal from '@/pages/admin/Delivery/_components/DriverModal'
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
      search_type: 'shop'
    }
  },
  computed: {
    ...mapGetters({
      selected_driver: 'delivery/select_driver',
      number_per_page: 'delivery_company/number_per_page',
      currencies: 'delivery_company/currencies',
      dcid: 'delivery_company/dcid',
      user: 'user/getUser'
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
        console.log(res)
        this.selected_packages = []
        this.sp_ids = []
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
.btn-remove {
  top: 8px;
  right: 15px;
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

.package__item {
  user-select: none;
  width: 100%;
  padding: 15px;
  background-color: var(--light);
  border-radius: 0.2rem;
  margin-bottom: 15px;
  display: flex;
  position: relative;

  &:hover {
    cursor: pointer;
    background-color: darken(#F8F9FAFF, 3%);
  }

  &-image {
    width: 95px;
  }

  &-content {
    width: calc(100% - 95px);
    padding-left: 25px;
    padding-right: 15px;
    position: relative;

    &.package__selected {
      width: calc(60% - 95px);
    }

    & p {
      margin-bottom: 0;
      font-size: 14px;
      line-height: 1.7;
    }

    & .package__item-badge {
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      align-items: center;

      & label {
        border-radius: 0;
        padding: 4px 8px;

        &:first-child {
          border-bottom-left-radius: 0.25rem;
          border-top-left-radius: 0.25rem;
        }

        &:last-child {
          border-bottom-right-radius: 0.25rem;
          border-top-right-radius: 0.25rem;
        }
      }
    }
  }

  &-form {
    width: 35%;
    margin-left: auto;

    & .form-group:last-child {
      margin-bottom: 0;
    }
  }
}
</style>

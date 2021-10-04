<template>
  <div class="modal-dialog modal-dialog-scrollable modal-min-height modal-lg modal-dialog-centered">
    <div v-if="packageData" class="modal-content">
      <div class="modal-header">
        <h5 id="staticBackdropLabel" class="modal-title text-capitalize">
          <i class="fas fa-user-plus mr-2" />
          <template v-if="packageData.driver_id">
            {{ $t('btn.change_driver') }}
          </template>
          <template v-else>
            {{ $t('label.assign_driver') }}
          </template>
        </h5>
        <button
          ref="close"
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
          @click="cancelAssignDriver"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label class="w-100 text-left required text-capitalize"> {{ $t('label.delivery_charge') }}</label>
          <template v-if="!(packageData.delivery_charge && packageData.driver_id) || packageData.edit_deliver_charge">
            <div class="input-group" :class="{'is-invalid': checkValidate('delivery_charge') || checkValidate('delivery_charge_currency')}">
              <input
                id="price"
                v-model="delivery_charge"
                name="price"
                type="number"
                class="form-control z-2"
                :placeholder="$t('label.delivery_charge')"
                :class="{'is-invalid ': checkValidate('delivery_charge') || checkValidate('delivery_charge_currency'), 'w-75': currencies.length > 2}"
              >
              <template v-if="currencies && currencies.length">
                <template v-if="currencies.length < 3">
                  <div class="input-group-append">
                    <button
                      v-for="(item, key) in currencies"
                      :key="key"
                      class="btn"
                      type="button"
                      :class="delivery_charge_currency && item._id === delivery_charge_currency._id ? 'btn-primary' : 'input-group-text'"
                      @click="delivery_charge_currency = item"
                    >
                      {{ item.code }}
                    </button>
                  </div>
                </template>
                <template v-else>
                  <select
                    v-model="delivery_charge_currency"
                    class="custom-select w-25"
                    :class="{'is-invalid': checkValidate('delivery_charge_currency')}"
                  >
                    <option :value="null" hidden disabled>
                      {{ $t('label.select_one_option') }}
                    </option>
                    <template v-for="(item, key) in currencies">
                      <option :key="key" :value="item">
                        {{ item.code }}
                      </option>
                    </template>
                  </select>
                </template>
              </template>
            </div>
            <div v-if="checkValidate('delivery_charge') || checkValidate('delivery_charge_currency')" class="invalid-feedback text-left">
              <ul type="none" class="pl-1">
                <li v-if="checkValidate('delivery_charge')">
                  {{ validate.delivery_charge[0] }}
                </li>
                <li v-if="checkValidate('delivery_charge_currency')">
                  {{ validate.delivery_charge_currency[0] }}
                </li>
              </ul>
            </div>
          </template>
          <template v-else>
            <div class="d-flex align-items-center justify-content-between">
              <p class="mb-0">
                {{ packageData.delivery_charge | numFormat(checkFormatCurrency(packageData.delivery_charge_currency)) }}
                {{ packageData.delivery_charge_currency ? packageData.delivery_charge_currency.code : '' }}
              </p>
              <button class="btn btn-default btn-sm" @click="packageData.edit_deliver_charge = true">
                <i class="fas fa-edit" />
              </button>
            </div>
          </template>
        </div>
        <template v-if="packageData && packageData.third_party_company_id">
          <div class="form-group">
            <label class="w-100 text-left text-capitalize"> {{ $t('label.extra_charge') }}</label>
            <template v-if="!(packageData.extra_charge && packageData.driver_id) || packageData.edit_extra_charge">
              <div class="input-group">
                <input
                  id="extra_charge"
                  v-model="extra_charge"
                  name="price"
                  type="number"
                  class="form-control"
                  :placeholder="$t('label.extra_charge')"
                  :class="{'w-75': currencies.length > 2}"
                >
                <template v-if="currencies && currencies.length">
                  <template v-if="currencies.length < 3">
                    <div class="input-group-append">
                      <button
                        v-for="(item, key) in currencies"
                        :key="key"
                        class="btn"
                        type="button"
                        :class="extra_charge_currency && item._id === extra_charge_currency._id ? 'btn-primary' : 'input-group-text'"
                        @click="extra_charge_currency = item"
                      >
                        {{ item.code }}
                      </button>
                    </div>
                  </template>
                  <template v-else>
                    <select v-model="extra_charge_currency" class="custom-select w-25">
                      <option :value="null" hidden disabled>
                        {{ $t('label.select_one_option') }}
                      </option>
                      <template v-for="(item, key) in currencies">
                        <option :key="key" :value="item">
                          {{ item.code }}
                        </option>
                      </template>
                    </select>
                  </template>
                </template>
              </div>
            </template>
            <template v-else>
              <div class="d-flex align-items-center justify-content-between">
                <p class="mb-0">
                  {{ packageData.extra_charge | numFormat(checkFormatCurrency(packageData.extra_charge_currency)) }}
                  {{ packageData.extra_charge_currency ? packageData.extra_charge_currency.code : '' }}
                </p>
                <button class="btn btn-default btn-sm" @click="packageData.edit_extra_charge = true">
                  <i class="fas fa-edit" />
                </button>
              </div>
            </template>
          </div>
        </template>
        <div class="form-group shop__search">
          <label class="w-100 text-left text-capitalize required">{{ $t('label.selectDriver') }}</label>
          <input
            v-model="search"
            type="search"
            class="form-control"
            :placeholder="$t('label.search')"
          >
        </div>
        <div v-if="checkValidate('driver_id')" class="form-group">
          <small class="d-flex align-items-center justify-content-start py-1 rounded text-danger">
            {{ $t('message.select_driver') }}
          </small>
        </div>
        <template v-if="onloading">
          <div class="shop__onloading">
            <i class="fas fa-circle-notch fa-spin" />
          </div>
        </template>
        <template v-else>
          <div class="driver__items">
            <template v-if="list_drivers && list_drivers.length">
              <div class="row">
                <div
                  v-for="(item, key) in list_drivers"
                  :key="key"
                  class="col-lg-6"
                  @click="selectDriver(item)"
                >
                  <div
                    class="driver__item text-left"
                    :class="{'bg-primary text-white': selected_driver && selected_driver._id === item._id}"
                  >
                    <div class="driver__image">
                      <template v-if="item.avatar">
                        <img
                          :src="`${baseUrl}/${item.avatar}`"
                          class="img-thumbnail rounded-circle"
                          alt="User Image"
                        >
                      </template>
                      <template v-else>
                        <img
                          :src="avatar"
                          class="img-thumbnail rounded-circle"
                          alt="User Image"
                        >
                      </template>
                    </div>
                    <div class="driver__info">
                      <label class="d-block mb-0"><strong>{{ item.full_name }}</strong></label>
                      <label class="d-block mb-0"><strong>{{ item.phone }}</strong></label>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="row">
                <div class="col-12">
                  <NoResult />
                </div>
              </div>
            </template>
            <infinite-loading spinner="spiral" :identifier="driverInfiniteId" @infinite="getDrivers">
              <div slot="no-more" />
              <div slot="no-results" />
            </infinite-loading>
          </div>
        </template>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-light"
          data-dismiss="modal"
          @click="cancelAssignDriver"
        >
          <i class="fas fa-times-circle mr-2" />
          <strong>{{ $t('btn.cancel') }}</strong>
        </button>
        <template v-if="packageData.driver_id">
          <button
            type="button"
            class="btn btn-primary"
            @click="assignDriver('change_driver')"
          >
            <i class="fas fa-check-circle mr-2" />
            <strong>{{ $t('btn.update') }}</strong>
          </button>
        </template>
        <template v-else>
          <button type="button" class="btn btn-primary" @click="assignDriver">
            <i class="fas fa-check-circle mr-2" />
            <strong>{{ $t('btn.assign') }}</strong>
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'debounce'
import { mapGetters } from 'vuex'
import NoResult from '@/components/NoResult'

export default {
  name: 'AssignDriverModal',
  components: { NoResult },
  props: {
    packageData: {
      type: Object,
      default: () => {
        return null
      }
    },
    currencies: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      list_drivers: [],
      search: null,
      page: 1,
      driverInfiniteId: +new Date(),
      onloading: false,
      validate: null,
      delivery_charge: null,
      delivery_charge_currency: null,
      extra_charge: null,
      extra_charge_currency: null
    }
  },
  computed: {
    ...mapGetters({
      selected_driver: 'delivery/select_driver',
      dcid: 'delivery_company/dcid',
      number_per_page: 'delivery_company/number_per_page',
      num_format_km: 'delivery_company/num_format_km',
      num_format_en: 'delivery_company/num_format_en',
      base_currency: 'delivery_company/currency'
    }),
    confirmMessage () {
      return {
        en: '<div style="line-height: 1.5">Do you want to assign this package to driver</div> <div><b>"' + this.selected_driver.full_name + '"</b> ?</div>',
        km: '<div style="line-height: 2">តើអ្នកចង់ផ្តល់កញ្ចប់អីវ៉ាន់នេះដល់អ្នកបើកបរ</div> <div><b>"' + this.selected_driver.full_name + '"</b> ?</div>'
      }
    }
  },
  watch: {
    search (val) {
      this.onloading = true
      if (!this.awaitingSearch) {
        if (this.time_out) {
          clearTimeout(this.time_out)
        }
        this.time_out = setTimeout(() => {
          this.searchDriver(1)
          this.awaitingSearch = false
        }, 1000)
      }
      this.awaitingSearch = true
    }
  },
  methods: {
    checkValidate (key) {
      if (key) {
        return this.validate && this.validate.hasOwnProperty(key)
      }
      return false
    },
    setDataDeliveryCharge (pac = null) {
      if (pac) {
        this.delivery_charge = pac.delivery_charge
        this.delivery_charge_currency = pac.delivery_charge_currency
        if (pac.third_party_company_id) {
          this.extra_charge = pac.extra_charge
          this.extra_charge_currency = pac.extra_charge_currency
        }
      }
    },
    searchDriver (page = null, onloading = false, keepDriver = false) {
      if (!keepDriver) {
        this.$store.dispatch('delivery/setDriver', null)
      }
      if (onloading) { this.onloading = true }
      this.page = 1
      if (page) {
        this.page = page
      }
      this.list_drivers = []
      this.driverInfiniteId += 1
      this.getDrivers()
    },
    setDefaultCurrency (currencies = []) {
      if (currencies && currencies.length) {
        // this.delivery_charge_currency = currencies[0]
        if (this.packageData && this.packageData.third_party_company_id) {
          this.extra_charge_currency = currencies[0]
        }
      }
    },
    getDrivers: debounce(function ($state) {
      this.$axios.post(this.$base_api + '/api/backend/user/list-driver', {
        dcid: this.dcid,
        search_query: this.search,
        page: this.page,
        number_per_page: this.number_per_page,
        on_delivery: false
      }).then(({ data }) => {
        if (!(this.page > data.total_pages)) {
          this.page += 1
          this.list_drivers.push(...data.data)
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
    selectDriver (driver) {
      this.$store.dispatch('delivery/setDriver', driver)
    },
    assignDriver (editFormType = 'edit') {
      if (this.selected_driver) {
        this.onConfirm({
          icon: 'warning',
          title: this.$t('label.assign_driver'),
          html: this.confirmMessage[this.$i18n.locale],
          confirmButtonText: this.$t('string.ok'),
          cancelButtonText: this.$t('string.cancel')
        }).then((accept) => {
          if (accept) {
            const data = {
              edit_form: 'assign',
              edit_form_type: editFormType
            }
            if (this.packageData) {
              data.id = this.packageData._id
            }
            if (this.selected_driver) {
              data.driver_id = this.selected_driver._id
            }
            data.delivery_charge = this.delivery_charge
            data.delivery_charge_currency = this.delivery_charge_currency
            data.extra_charge = this.extra_charge
            data.extra_charge_currency = this.extra_charge_currency
            this.$axios.post(this.$base_api + '/api/backend/package/edit', data)
              .then((res) => {
                this.$toastr('success', this.$t('message.package_assign'), this.$t('label.assign_driver'))
                this.cancelAssignDriver()
                this.$emit('onSubmit', res.data.data)
                this.$refs.close.click()
              }).catch((error) => {
                if (error.response.status === 422) {
                  this.validate = error.response.data.errors
                } else {
                  this.onResponseError(error)
                }
              })
          }
        })
      } else {
        this.validate = {
          driver_id: ['the driver id field is required']
        }
      }
    },
    cancelAssignDriver () {
      this.validate = null
      this.search = null
      this.delivery_charge = null
      this.delivery_charge_currency = null
      this.extra_charge = null
      this.extra_charge_currency = null
      this.$store.dispatch('delivery/setDriver', null)
    }
  }
}
</script>

<style scoped lang="scss">
.shop__search {
  & .form-control {
    width: 100%;
  }
  & .btn {
    width: 19%;
    margin-left: auto;
  }
}

.driver__items {
  height: auto;
  overflow-y: auto;
  padding: 0 7.5px;
}

.driver__item {
  user-select: none;
  background-color: #f8f8f8;
  border-radius: 0.25rem;
  display: flex;
  position: relative;
  margin: 8px 0;
  padding: 15px;
  color: var(--dark);
  width: 100%;
  cursor: pointer;

  &:hover,
  &:focus,
  &:active {
    background-color: #e6e6e6;
  }

  & .driver__image {
    width: 75px;
  }

  & .driver__info {
    width: calc(100% - 75px);
    padding: 8px 16px;
    & label {
      cursor: pointer;
    }
  }

  & i.icon-left {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 11px;
  }

  & span.icon-right,
  & i.icon-right {
    right: 10px;
    top: 50%;
    transform: translate(0, -50%);
  }

  & i.icon-right {
    font-size: 16px;
  }

  & span.icon-right {
    font-size: 8px;
    color: var(--primary)
  }
}

.shop__onloading {
  width: 100%;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;

  & i {
    font-size: 35px;
    color: var(--primary);
  }
}
</style>

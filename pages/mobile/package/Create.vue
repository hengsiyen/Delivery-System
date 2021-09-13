<template>
  <div>
    <div class="row">
      <div class="col-lg-8">
        <div class="form-row">
          <div class="form-group col-md-6">
            <template v-if="shop">
              <div class="shop__selected">
                <div>
                  <i class="fas fa-store mr-2" />
                  <label>{{ shop.name_en }}</label>
                </div>
                <button class="btn" @click="setShop(null)">
                  <i class="fas fa-times" />
                </button>
              </div>
            </template>
            <template v-else>
              <div :class="{'is-invalid': checkValidate('shop_id')}">
                <button
                  type="button"
                  class="btn btn-default btn-block"
                  data-toggle="modal"
                  data-target="#shopModal"
                  @click="openShopModal"
                >
                  <strong>{{ $t('label.select_shop') }}</strong>
                </button>
              </div>
              <div v-if="checkValidate('shop_id')" class="invalid-feedback">
                {{ validate.shop_id[0] }}
              </div>
            </template>
          </div>
          <div class="form-group col-md-6">
            <div
              class="input-group"
              :class="{'has-validation': checkValidate('customer_name')}"
            >
              <div class="input-group-prepend">
                <span id="inputGroup-sizing-lg" class="input-group-text">
                  <i class="fas fa-user" />
                </span>
              </div>
              <input
                id="customer_name"
                v-model="customer_name"
                name="customer_name"
                class="form-control"
                :placeholder="$t('pla.customer_name')"
                :class="{'is-invalid': checkValidate('customer_name')}"
              >
              <div v-if="checkValidate('customer_name')" class="invalid-feedback">
                {{ validate.customer_name[0] }}
              </div>
            </div>
          </div>
          <div class="form-group col-md-6">
            <div class="input-group" :class="{'has-validation': checkValidate('customer_phone')}">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fas fa-phone" /></span>
              </div>
              <input
                id="customer_phone"
                v-model="customer_phone"
                v-mask="'### ### ####'"
                name="customer_phone"
                class="form-control"
                :placeholder="$t('pla.customer_phone')"
                :class="{'is-invalid': checkValidate('customer_phone')}"
              >
              <div v-if="checkValidate('customer_phone')" class="invalid-feedback">
                {{ validate.customer_phone[0] }}
              </div>
            </div>
          </div>
          <div class="form-group col-md-6">
            <div class="input-group" :class="{'has-validation': checkValidate('customer_address')}">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fas fa-map-marker-alt" /></span>
              </div>
              <input
                id="customer_address"
                v-model="customer_address"
                name="customer_address"
                class="form-control"
                :placeholder="$t('pla.customer_address')"
                :class="{'is-invalid': checkValidate('customer_address')}"
              >

              <div v-if="checkValidate('customer_address')" class="invalid-feedback">
                {{ validate.customer_address[0] }}
              </div>
            </div>
          </div>
          <div class="form-group col-md-6">
            <div class="input-group" :class="{'has-validation': checkValidate('price')}">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fas fa-dollar-sign" />
                </span>
              </div>
              <input
                id="price"
                v-model="price"
                name="price"
                type="number"
                class="form-control price-width z-2"
                :class="{'is-invalid': checkValidate('price')}"
                :placeholder="$t('pla.package_price')"
                aria-describedby="button-price"
              >
              <template v-if="currencies && currencies.length">
                <select v-model="currency" name="currency" class="form-control currency-width">
                  <option v-for="(item, key) in currencies" :key="key" :value="item">
                    {{ item.code }}
                  </option>
                </select>
              </template>
              <div v-if="checkValidate('price')" class="invalid-feedback">
                {{ validate.price[0] }}
              </div>
            </div>
          </div>
          <div class="form-group col-md-6">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fas fa-cube" />
                </span>
              </div>
              <select
                v-if="package_types"
                id="package_type"
                v-model="package_type"
                name="package_type"
                class="custom-select w-35"
              >
                <option :value="null" selected hidden>
                  {{ $t('label.select_one_option') }} ...
                </option>
                <template v-for="(item, key) in package_types">
                  <option :key="key" :value="item">
                    {{ item['name_' + $i18n.locale] }}
                  </option>
                </template>
              </select>
            </div>
          </div>
          <div class="form-group col-md-6">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fas fa-motorcycle" />
                </span>
              </div>
              <date-picker
                v-model="request_delivery_at"
                type="datetime"
                :time-picker-options="{start: '06:00', step:'00:30' , end: '23:00', format: 'hh:mm A' }"
                :show-second="false"
                :placeholder="$t('string.select_date')"
                :lang="datePickerLang"
                :format="'DD/MM/YYYY hh:mm:ss A'"
                input-class="form-control"
                :disabled-date="notBeforeToday"
              />
            </div>
          </div>
          <div class="form-group col-md-12">
            <textarea
              id="note"
              v-model="note"
              class="form-control overflow-auto"
              rows="3"
              :placeholder="$t('pla.note') + ' ...'"
              style="max-height: 120px"
            />
          </div>
          <div class="form-group col-md-6">
            <div class="d-flex align-items-center justify-content-between">
              <div>
                <label class="mb-0">{{ $t('label.is_paid') }}</label>
              </div>
              <div class="btn-group  btn-group-sm">
                <button
                  class="btn"
                  :class="!is_paid ? 'btn-primary' : 'input-group-text'"
                  @click="is_paid = false"
                >
                  {{ $t('btn.is_paid_no') }}
                </button>
                <button
                  class="btn"
                  :class="is_paid ? 'btn-primary' : 'input-group-text'"
                  @click="is_paid = true"
                >
                  {{ $t('btn.is_paid_yes') }}
                </button>
              </div>
            </div>
            <div class="input-group">
              <select
                v-if="payment_types && is_paid"
                id="payment_type"
                v-model="payment_type"
                name="package_type"
                class="custom-select mt-3"
              >
                <option :value="null" selected hidden>
                  {{ $t('label.select_one_option') }} ...
                </option>
                <template v-for="(item, key) in payment_types">
                  <option :key="key" :value="item">
                    {{ item['name_' + $i18n.locale] }}
                  </option>
                </template>
              </select>
            </div>
          </div>
          <div class="form-group col-md-6">
            <!-- Button trigger modal -->
            <template v-if="third_party">
              <div class="shop__selected">
                <div>
                  <i class="fas fa-store mr-2" />
                  <label>{{ third_party.name_en }}</label>
                </div>
                <button class="btn" @click="setThirdParty(null)">
                  <i class="fas fa-times" />
                </button>
              </div>
            </template>
            <template v-else>
              <div>
                <button
                  type="button"
                  class="btn btn-default btn-block"
                  data-toggle="modal"
                  data-target="#thirdPartyCompanyModal"
                  @click="openThirdPartyModal"
                >
                  <strong>{{ $t('label.delivery_with_other_company') }}</strong>
                </button>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="form-group">
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <label class="mb-0">Package Image</label>
            </div>
            <div>
              <button class="btn btn-primary btn-sm">
                Insert Image
              </button>
            </div>
          </div>
        </div>
        <div class="form-group mx-auto w-75">
          <img src="/img/package.png" alt="" class="img-thumbnail">
        </div>
      </div>
    </div>
    <div class="d-flex align-items-center text-right py-4">
      <div class="w-50 pr-1">
        <button class="btn btn-light btn-block" @click="$router.back()">
          <i class="fas fa-times mr-2" />
          <strong>{{ $t('btn.cancel') }}</strong>
        </button>
      </div>
      <div class="w-50 pl-1">
        <button
          class="btn btn-block"
          :class="isEdit ? 'btn-primary' : 'btn-success'"
          @click="storeOrEdit"
        >
          <i class="fas fa-save mr-2" />
          <strong>{{ isEdit ? $t('btn.update') : $t('btn.save') }}</strong>
        </button>
      </div>
    </div>
    <div
      id="thirdPartyCompanyModal"
      class="modal fade"
      data-backdrop="static"
      tabindex="-1"
    >
      <ThirdPartyCompanyModal ref="thirdPartyCompanyModal" />
    </div>
    <div
      id="shopModal"
      class="modal fade"
      tabindex="-1"
      data-backdrop="static"
    >
      <ShopModal ref="shopModal" />
    </div>
  </div>
</template>

<script>

import ThirdPartyCompanyModal from '@/pages/admin/package/_components/ThirdPartyCompanyModal'
import ShopModal from '@/pages/admin/package/_components/ShopModal'
import { mapGetters } from 'vuex'

export default {
  name: 'PackageMobileCreate',
  components: { ThirdPartyCompanyModal, ShopModal },
  props: {
    title: {
      type: String,
      default: 'label.add_new'
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    oldData: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  data () {
    return {
      base_api: process.env.VUE_APP_API,
      validate: null,
      id: null,

      currencies: [],
      package_types: [],
      payment_types: [],

      customer_name: null,
      customer_phone: null,
      customer_address: null,
      price: null,
      currency: null,
      package_type: null,
      is_paid: false,
      payment_type: null,
      note: null,
      request_delivery_at: new Date()
    }
  },
  computed: {
    ...mapGetters('package', {
      shop: 'shop',
      third_party: 'third_party'
    })
  },
  created () {
    if (this.oldData) {
      this.id = this.oldData._id
      this.customer_name = this.oldData.customer_name
      this.customer_phone = this.oldData.customer_phone
      this.customer_address = this.oldData.customer_address
      this.price = this.oldData.price
      this.currency = this.oldData.currency
      this.package_type = this.oldData.package_type
      this.payment_type = this.oldData.payment_type
      this.is_paid = this.oldData.is_paid
      this.note = this.oldData.note
      if (this.oldData.request_delivery_at) {
        this.request_delivery_at = this.$moment(this.oldData.request_delivery_at)
      }
    }
  },
  mounted () {
    this.getFetchData()
  },
  methods: {
    checkValidate (key) {
      if (key) {
        return this.validate && this.validate.hasOwnProperty(key)
      }
      return false
    },
    getFetchData () {
      this.$axios
        .get(process.env.VUE_APP_API + '/api/backend/fetch-data/data-for-package')
        .then((res) => {
          const result = res.data.data
          this.currencies = result.currencies
          this.package_types = result.package_types
          this.payment_types = result.payment_types
          if (this.currencies.length) {
            this.currency = this.currencies.find((item) => {
              if (item.code === 'USD') {
                return item
              }
              return null
            })
          }
          if (this.package_types.length) {
            this.package_type = this.package_types[0]
          }
        }).catch((error) => {
          this.onResponseError(error)
        })
    },
    openShopModal () {
      if (this.$refs.shopModal) {
        this.$refs.shopModal.searchShop(1, true)
      }
    },
    openThirdPartyModal () {
      if (this.$refs.thirdPartyCompanyModal) {
        this.$refs.thirdPartyCompanyModal.searchThirdParty(1, true)
      }
    },
    storeOrEdit () {
      this.validate = null
      const formData = new FormData()
      if (this.id) {
        formData.append('id', this.id)
      }
      if (this.shop) {
        formData.append('shop_id', this.shop._id)
      }
      if (this.customer_name) {
        formData.append('customer_name', this.customer_name)
      }
      if (this.customer_phone) {
        formData.append('customer_phone', this.customer_phone)
      }
      if (this.customer_address) {
        formData.append('customer_address', this.customer_address)
      }
      if (this.price) {
        formData.append('price', this.price)
      }
      if (this.currency) {
        formData.append('currency_id', this.currency._id)
      }
      if (this.package_type) {
        formData.append('package_type_id', this.package_type._id)
      }
      if (this.payment_type) {
        formData.append('payment_type_id', this.payment_type._id)
      }
      if (this.request_delivery_at) {
        formData.append('request_delivery_at', this.$moment(this.request_delivery_at).format('YYYY-MM-DD hh:mm:ss'))
      }
      if (this.third_party) {
        formData.append('third_party_company_id', this.third_party._id)
      }
      if (this.note) {
        formData.append('note', this.note)
      }
      formData.append('is_paid', this.is_paid)
      this.$axios
        .post(this.$base_api + '/api/backend/package/store-or-edit', formData)
        .then((res) => {
          this.$swal({
            icon: 'info',
            title: this.$t('string.createPackage'),
            text: this.$t('string.createOtherPackage'),
            showCancelButton: true,
            confirmButtonText: this.$t('string.yes'),
            cancelButtonText: this.$t('string.cancel')
          }).then(() => {
            this.customer_name = null
            this.customer_phone = null
            this.customer_address = null
            this.price = null
            this.package_type = null
            this.is_paid = false
            this.payment_type = null
            this.note = null
            this.request_delivery_at = new Date()
          }, (dismiss) => {
            if (!(dismiss === 'cancel')) {
              throw dismiss
            } else {
              this.$router.push({ name: 'mobile-shop-list' })
            }
          }).catch(function (err) {
            console.error(err)
            throw err
          })
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.validate = error.response.data.errors
          } else {
            this.onResponseError(error)
          }
        })
      window.scrollTo(0, 0)
    },
    setShop (shop) {
      this.$store.dispatch('package/setShop', shop)
    },
    setThirdParty (item) {
      this.$store.dispatch('package/setThirdParty', item)
    }
  }
}
</script>

<style scoped lang="scss">
.price-width {
  width: calc(100% - 200px) !important;
}

.currency-width {
  width: 200px
}

.z-2 {
  z-index: 2;
}

.input-group-text i {
  width: 15px;
}

.input-group .mx-datepicker {
  position: relative;
  flex: 1 1 auto;
  width: 1%;
  min-width: 0;
  margin-bottom: 0;
}

.shop__selected {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--light);
  padding-left: 15px;
  border-radius: 0.25rem;

  & label {
    margin-bottom: 0;
  }
}
</style>

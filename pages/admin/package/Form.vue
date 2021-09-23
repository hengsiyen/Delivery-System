<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header with-border">
          <h3 class="card-title text-capitalize">
            {{ $t(title) }}
          </h3>
          <div class="card-tools">
            <ButtonBack />
          </div>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-lg-8">
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label
                    class="required"
                    :class="{'text-red': checkValidate('shop_id')}"
                  >
                    {{ $t('label.shop') }}
                  </label>
                  <!-- Button trigger modal -->
                  <template v-if="shop">
                    <div class="shop__selected">
                      <label>{{ shop.name_en }}</label>
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
                  <label
                    for="customer_name"
                    :class="{'text-red': checkValidate('customer_name')}"
                  >
                    {{ $t('label.customer_name') }}
                  </label>
                  <input
                    id="customer_name"
                    v-model="customer_name"
                    name="customer_name"
                    class="form-control"
                    :placeholder="$t('pla.customer_name')"
                    :class="{'is-invalid': checkValidate('customer_name')}"
                  >

                  <div v-if="checkValidate('customer_name')" class="invalid-feedback">
                    {{ validate.shop_id[0] }}
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label
                    for="customer_phone"
                    class="required"
                    :class="{'text-red': checkValidate('customer_phone')}"
                  >
                    {{ $t('label.customer_phone') }}
                  </label>
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
                <div class="form-group col-md-6">
                  <label
                    for="customer_address"
                    class="required"
                    :class="{'text-red': checkValidate('customer_address')}"
                  >
                    {{ $t('label.customer_address') }}
                  </label>
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
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label
                    for="price"
                    class="required"
                    :class="{'text-red': checkValidate('price')}"
                  >
                    {{ $t('label.price') }}
                  </label>
                  <div
                    class="input-group"
                    :class="{'is-invalid': checkValidate('price')}"
                  >
                    <template v-if="currencies && currencies.length">
                      <template v-if="currencies.length < 3">
                        <div id="button-price" class="input-group-prepend">
                          <button
                            v-for="(item, key) in currencies"
                            :key="key"
                            class="btn"
                            type="button"
                            :class="currency && item._id === currency._id ? 'btn-primary' : 'input-group-text'"
                            @click="currency = item"
                          >
                            {{ item.code }}
                          </button>
                        </div>
                      </template>
                      <template v-else>
                        <select v-model="currency" class="custom-select w-25">
                          <template v-for="(item, key) in currencies">
                            <option :key="key" :value="item">
                              {{ item.code }}
                            </option>
                          </template>
                        </select>
                      </template>
                    </template>
                    <input
                      id="price"
                      v-model="price"
                      name="price"
                      type="number"
                      class="form-control"
                      :class="{'is-invalid': checkValidate('price'), 'w-75': currencies.length > 2}"
                      :placeholder="$t('pla.package_price')"
                      aria-describedby="button-price"
                    >
                  </div>
                  <div v-if="checkValidate('price')" class="invalid-feedback">
                    {{ validate.price[0] }}
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <label
                    :class="{'text-red': checkValidate('amount')}"
                  >
                    {{ $t('menu.package_type') }}
                  </label>
                  <div class="input-group" :class="{'is-invalid': checkValidate('amount')}">
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
                  <div v-if="checkValidate('amount')" class="invalid-feedback">
                    {{ validate.amount[0] }}
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label :class="{'text-red': checkValidate('payment_type')}">
                    {{ $t('label.is_paid') }}
                  </label>
                  <div class="input-group">
                    <div :class="is_paid ? 'input-group-prepend' : 'btn-group' ">
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
                    <select
                      v-if="payment_types && is_paid"
                      id="payment_type"
                      v-model="payment_type"
                      name="package_type"
                      class="custom-select"
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
                    <div v-if="checkValidate('price')" class="invalid-feedback">
                      {{ validate.price[0] }}
                    </div>
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <label>
                    {{ $t('label.delivery_at') }}
                  </label>
                  <div class="w-100">
                    <date-picker
                      v-model="request_delivery_at"
                      type="datetime"
                      value-type="format"
                      :time-picker-options="{start: '06:00', step:'00:30' , end: '23:00', format: 'hh:mm A' }"
                      :show-second="false"
                      :placeholder="$t('string.select_date')"
                      :lang="datePickerLang"
                      :format="date_format"
                      input-class="form-control"
                      :disabled-date="notBeforeToday"
                    />
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label>{{ $t('label.delivery_with_other_company') }}</label>
                  <!-- Button trigger modal -->
                  <template v-if="third_party">
                    <div class="shop__selected">
                      <label>{{ third_party.name_en }}</label>
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
                        <strong>{{ $t('label.select_third_party_company') }}</strong>
                      </button>
                    </div>
                  </template>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-12">
                  <label for="note">
                    {{ $t('label.note') }}
                  </label>
                  <textarea
                    id="note"
                    v-model="note"
                    class="form-control overflow-auto"
                    rows="10"
                    :placeholder="$t('pla.note') + ' ...'"
                    style="max-height: 120px"
                  />
                </div>
              </div>
            </div>
            <div class="offset-lg-1 col-lg-3">
              <div class="form-group text-center">
                <label>{{ $t('label.package_image') }}</label>
                <template v-if="selected_image">
                  <div :style="`width: ${croppie_size}px`">
                    <vue-croppie
                      ref="croppieRef"
                      :enable-orientation="true"
                      :boundary="{ width: croppie_size, height: croppie_size}"
                      :enable-resize="false"
                      :viewport="{ width: 295, height: 295, type: 'square' }"
                      @result="result"
                    />
                    <button class="btn btn-primary btn-upload-image">
                      <i class="fas fa-link" />
                      <input
                        ref="getPackageImg"
                        type="file"
                        name="file"
                        accept="image/*"
                        @change="getPackageImg"
                      >
                    </button>
                    <!-- Rotate angle is Number -->
                    <button class="btn btn-light" @click="rotate(-90)">
                      <i class="fas fa-undo-alt" />
                    </button>
                    <button class="btn btn-light" @click="rotate(90)">
                      <i class="fas fa-redo-alt" />
                    </button>
                    <button class="btn btn-light" @click="removePackageImg">
                      <i class="fas fa-times" />
                    </button>
                  </div>
                </template>
                <template v-else>
                  <div
                    :style="`width: ${croppie_size}px; height: ${croppie_size}px`"
                    class="mx-auto bg-whitesmoke d-flex align-items-center justify-content-center rounded btn-upload-image border cursor-pointer"
                  >
                    <template v-if="isEdit && oldData && oldData.media">
                      <img :src="`${base_api}/${oldData.media.src}`" class="img-thumbnail">
                    </template>
                    <template v-else>
                      <div class="text-gray">
                        <i class="fas fa-upload fa-2x" />
                        <p class="mt-2">
                          {{ $t('label.click_here_to_browse_image') }}
                        </p>
                      </div>
                    </template>
                    <input
                      ref="getPackageImg"
                      type="file"
                      name="file"
                      accept="image/*"
                      class="cursor-pointer"
                      @change="getPackageImg"
                    >
                  </div>
                </template>
                <template v-if="isEdit && oldData && oldData.media && !selected_image">
                  <p class="mt-2">
                    {{ $t('label.tap_on_image_to_edit') }}
                  </p>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer text-right">
          <button class="btn btn-light" @click="$router.back()">
            <i class="fas fa-times mr-2" />
            <strong>{{ $t('btn.cancel') }}</strong>
          </button>
          <button
            class="btn"
            :class="isEdit ? 'btn-primary' : 'btn-success'"
            @click="storeOrEdit"
          >
            <i class="fas fa-save mr-2" />
            <strong>{{ isEdit ? $t('btn.update') : $t('btn.save') }}</strong>
          </button>
        </div>
      </div>
    </div>
    <!-- Modal -->
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
import { mapGetters } from 'vuex'
import ButtonBack from '@/components/UiElements/ButtonBack'
import ShopModal from '@/pages/admin/package/_components/ShopModal'
import ThirdPartyCompanyModal from '@/pages/admin/package/_components/ThirdPartyCompanyModal'

export default {
  name: 'PackageForm',
  components: { ThirdPartyCompanyModal, ShopModal, ButtonBack },
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
      date_format: 'DD/MM/YYYY hh:mm A',
      request_delivery_at: this.$moment().format('DD/MM/YYYY hh:mm A'),

      croppie_size: 300,
      cropped: null,
      selected_image: null
    }
  },
  computed: {
    ...mapGetters('package', {
      shop: 'shop',
      third_party: 'third_party'
    }),
    langType () {
      return this.$i18n.locale
    }
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
        this.request_delivery_at = this.$moment(this.oldData.request_delivery_at).format(this.date_format)
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
          if (this.package_type === null && this.package_types.length) {
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
      if (this.selected_image) {
        this.crop()
      }
      setTimeout(() => {
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
          formData.append('request_delivery_at', this.$moment(this.request_delivery_at, this.date_format).format('YYYY-MM-DD hh:mm:ss'))
        }
        if (this.third_party) {
          formData.append('third_party_company_id', this.third_party._id)
        }
        if (this.note) {
          formData.append('note', this.note)
        }
        if (this.cropped) {
          formData.append('image', this.cropped)
        }
        formData.append('is_paid', this.is_paid)
        this.$axios
          .post(this.$base_api + '/api/backend/package/store-or-edit', formData)
          .then((res) => {
            this.$router.push({ name: 'list-package' })
          }).catch((error) => {
            if (error.response.status === 422) {
              this.validate = error.response.data.errors
            } else {
              this.onResponseError(error)
            }
          })
      }, 1000)
    },
    setShop (shop) {
      this.$store.dispatch('package/setShop', shop)
    },
    setThirdParty (item) {
      this.$store.dispatch('package/setThirdParty', item)
    },
    getPackageImg (event) {
      const self = this
      const file = event.target.files[0]
      const reader = new FileReader()
      this.selected_image = file
      reader.onload = function (e) {
        if (self.$refs.croppieRef) {
          self.$refs.croppieRef.bind({
            url: e.target.result
          })
        }
      }
      reader.readAsDataURL(file)
    },
    crop () {
      const options = {
        format: 'png',
        circle: false
      }
      this.$refs.croppieRef.result(options, (output) => {
        this.cropped = output
      })
    },
    result (output) {
      this.cropped = output
    },
    rotate (rotationAngle) {
      this.$refs.croppieRef.rotate(rotationAngle)
    },
    removePackageImg () {
      this.cropped = null
      this.selected_image = null
      this.$refs.croppieRef.refresh()
    }
  }
}
</script>

<style scoped lang="scss">
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

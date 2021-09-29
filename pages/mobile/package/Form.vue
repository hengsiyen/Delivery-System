<template>
  <div>
    <HeaderMobile hide-button-logout hide-button-home show-navbar-text :navbar-text="$t(title)">
      <template v-slot:btn-back>
        <ButtonBackMobile />
      </template>
    </HeaderMobile>
    <div class="mobile-content-h col-12 pt-3">
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
                  {{ $t('string.theFieldIsRequired') }}
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
                  {{ $t('string.theFieldIsRequired') }}
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
                  {{ $t('string.theFieldIsRequired') }}
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
                  {{ $t('string.theFieldIsRequired') }}
                </div>
              </div>
            </div>
            <div class="form-group col-md-6">
              <div class="input-group" :class="{'has-validation': checkValidate('price')}">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-money-bill" />
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
                  {{ $t('string.theFieldIsRequired') }}
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
                <div class="btn-group">
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
        <template v-if="selected_image || preview_image">
          <div class="col-lg-4">
            <div class="form-group">
              <div class="d-flex align-items-center justify-content-between">
                <div>
                  <label class="mb-0">{{ $t('label.package_image') }}</label>
                </div>
                <div />
              </div>
            </div>

            <div class="form-group mx-auto croppie-w">
              <template v-if="selected_image">
                <div :style="`width: ${croppie_size}px`" class="text-center mx-auto">
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
                  <template v-if="isEdit && preview_image">
                    <img :src="preview_image" class="img-thumbnail">
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
              <template v-if="isEdit && preview_image && !selected_image">
                <p class="mt-2 text-center">
                  {{ $t('label.tap_on_image_to_edit') }}
                </p>
              </template>
            </div>
          </div>
        </template>
      </div>
      <div class="btn-action border-top">
        <div class="w-50">
          <div class="btn btn-default btn-upload-image">
            <i class="fas fa-image" />
            <input
              ref="getPackageImg"
              type="file"
              name="file"
              accept="image/*"
              class="cursor-pointer"
              @change="getPackageImg"
            >
          </div>
        </div>
        <div class="w-100 text-right">
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
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import ThirdPartyCompanyModal from '@/pages/admin/package/_components/ThirdPartyCompanyModal'
import ShopModal from '@/pages/admin/package/_components/ShopModal'
import HeaderMobile from '@/components/Layouts/HeaderMobile'
import ButtonBackMobile from '@/components/UiElements/ButtonBackMobile'

export default {
  name: 'PackageMobileForm',
  components: { ButtonBackMobile, HeaderMobile, ThirdPartyCompanyModal, ShopModal },
  props: {
    title: {
      type: String,
      default: 'label.create_package'
    },
    isEdit: {
      type: Boolean,
      default: false
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
      request_delivery_at: new Date(),

      croppie_size: 300,
      cropped: null,
      selected_image: null,
      preview_image: null
    }
  },
  computed: {
    ...mapGetters({
      shop: 'package/shop',
      third_party: 'package/third_party',
      dc: 'delivery_company/delivery_company'
    })
  },
  mounted () {
    this.getFetchData()
    if (this.isEdit && this.$route.params.id) {
      this.getPackageData()
    }
  },
  methods: {
    getPackageData () {
      this.$axios
        .post(this.$base_api + '/api/backend/package/show', {
          id: this.$route.params.id
        }).then((res) => {
          const result = res.data.data
          if (result) {
            if (result.partner_company) {
              this.$store.dispatch('package/setThirdParty', {
                _id: result.partner_company._id,
                name_en: result.partner_company.name_en
              })
            }
            if (result.shop) {
              this.$store.dispatch('package/setShop', {
                _id: result.shop._id,
                name_en: result.shop.name_en,
                name_km: result.shop.name_km
              })
            }
            this.id = result._id
            this.customer_name = result.customer_name
            this.customer_phone = result.customer_phone
            this.customer_address = result.customer_address
            this.price = result.price
            this.currency = result.currency
            this.package_type = result.package_type
            this.payment_type = result.payment_type
            this.is_paid = result.is_paid
            this.note = result.note
            if (result.request_delivery_at) {
              this.request_delivery_at = this.$moment(result.request_delivery_at)
            }
            if (result.media) {
              this.preview_image = this.getSrc(result.media.src)
            }
          }
        }).catch((error) => {
          this.onResponseError(error)
        })
    },
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
          if (this.currencies.length && this.dc && this.dc.currency) {
            this.currency = this.currencies.find((item) => {
              if (item.code === this.dc.currency.code) {
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
          formData.append('request_delivery_at', this.$moment(this.request_delivery_at).format('YYYY-MM-DD hh:mm:ss'))
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
        this.$axios.post(this.$base_api + '/api/backend/package/store-or-edit', formData)
          .then((res) => {
            this.$router.push({ name: 'mobile-shop-show', params: { id: this.shop._id } })
          }).catch((error) => {
            if (error.response.status === 422) {
              this.validate = error.response.data.errors
              this.$toastr('error', this.$t('string.checkRequiredFields'), this.$t('string.error'))
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
@import "assets/scss/pages/mobile";
.mobile-content-h {
  height: calc(100vh - 113px);
}

.price-width {
  width: calc(100% - 200px) !important;
}

.currency-width {
  width: 25.5px
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

.btn-action {
  width: 100%;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 8px;
  background-color: white;
  z-index: 1000;
}

.croppie-w {
  width: 75%;
}

@media screen and (max-width: 400px){
  .croppie-w {
    width: 100%;
  }
}
</style>

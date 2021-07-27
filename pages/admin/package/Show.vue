<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header with-border">
          <h3 class="card-title text-capitalize">
            {{ $t('label.show') }}
          </h3>
          <div class="card-tools">
            <NuxtLink
              class="btn btn-primary btn-sm"
              :to="{name: 'edit-package', params: {id: this.$route.params.id}}"
            >
              <i class="fas fa-edit mr-1" />
              <strong>{{ $t('button.edit') }}</strong>
            </NuxtLink>
            <ButtonBack />
          </div>
        </div>
        <div class="card-body">
          <template v-if="package_data">
            <div class="row">
              <div class="col-xl-12 d-flex">
                <div class="package__content">
                  <template v-if="package_data.package_transitions && package_data.package_transitions.length">
                    <div class="package_transition mb-4">
                      <div class="timeline" :class="toggle_timline ? 'show-timeline' : 'hide-timeline'">
                        <template v-for="(item, key) in package_data.package_transitions">
                          <div :key="key">
                            <i class="fas" :class="statusIcon(item)" />
                            <div class="timeline-item shadow-none">
                              <div class="text-dark">
                                <strong>{{ checkStatus(item.status) }}</strong>
                              </div>
                              <div><small>{{ item.description['message_' + $i18n.locale] }}</small></div>
                              <div><small>{{ $moment(item.created_at).format('llll') }}</small></div>
                            </div>
                          </div>
                        </template>
                        <div>
                          <i class="fas fa-clock bg-gray" />
                        </div>
                      </div>
                      <div>
                        <button class="btn btn-default" @click="toggle_timline = !toggle_timline">
                          <i class="mr-2 fas" :class="toggle_timline ? 'fa-chevron-up' : 'fa-chevron-down'" />
                          <strong v-if="toggle_timline">{{ $t('label.view_package_transitions') }}</strong>
                          <strong v-else>{{ $t('label.hide_package_transitions') }}</strong>
                        </button>
                      </div>
                    </div>
                  </template>
                  <div class="row">
                    <div class="col-lg-8 pr-4">
                      <template>
                        <div v-if="edit_cn" class="row">
                          <div class="col-lg-6">
                            <div class="form-group">
                              <label>{{ $t('label.customer_name') }}</label>
                              <input
                                id="customer_name"
                                v-model="customer_name"
                                name="customer_name"
                                class="form-control"
                                :placeholder="$t('pla.customer_name')"
                              >
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <div class="form-group">
                              <label class="required">{{ $t('label.customer_phone') }}</label>
                              <input
                                id="customer_phone"
                                v-model="customer_phone"
                                v-mask="'### ### ####'"
                                name="customer_phone"
                                class="form-control mb-3"
                                :placeholder="$t('pla.customer_phone')"
                                :class="{'is-invalid': checkValidate('customer_phone')}"
                              >
                              <div v-if="checkValidate('customer_phone')" class="invalid-feedback">
                                {{ validate.customer_phone[0] }}
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-12">
                            <div class="form-group">
                              <label class="required">{{ $t('label.customer_address') }}</label>
                              <input
                                id="customer_address"
                                v-model="customer_address"
                                name="customer_address"
                                class="form-control mb-3"
                                :placeholder="$t('pla.customer_address')"
                                :class="{'is-invalid': checkValidate('customer_address')}"
                              >
                              <div v-if="checkValidate('customer_address')" class="invalid-feedback">
                                {{ validate.customer_address[0] }}
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-12">
                            <PackageFormItemButton
                              :disabled-button="checkDataChange(customer_name, old_cn) && checkDataChange(customer_phone, old_cp) && checkDataChange(customer_address, old_ca)"
                              @onClickCancel="cancelCn"
                              @onClickSave="editPackage('customer_info')"
                            />
                          </div>
                        </div>
                        <div v-else>
                          <div class="form-group show-with-border">
                            <label>{{ $t('label.customer_info') }}</label>
                            <div class="d-flex align-items-center justify-content-between">
                              <div class="d-flex align-items-center">
                                <div class="package_form-customer-img">
                                  <img :src="avatar" class="img-thumbnail">
                                </div>
                                <div class="package_form-item-content">
                                  <div class="package_form-item-content-label w-100 text-truncate">
                                    <label class="mb-0">{{ customer_name }}</label>
                                  </div>
                                  <div>
                                    <small class="text-muted">
                                      <span class="d-block">{{ customer_phone }}</span>
                                      <span class="d-block">{{ customer_address }}</span>
                                    </small>
                                  </div>
                                </div>
                              </div>
                              <div
                                v-if="!(edit_price && edit_cn && edit_cn && edit_cp)"
                                class="package_form-item-edit text-right"
                              >
                                <button class="btn btn-light pr-0" @click="edit_cn = true">
                                  <i class="fas fa-edit mr-2" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </template>

                      <template>
                        <div v-if="edit_price" class="row">
                          <div class="col-lg-6">
                            <div class="form-group">
                              <label>{{ $t('label.price') }}</label>
                              <div class="input-group">
                                <div
                                  v-if="currencies && currencies.length"
                                  id="button-price"
                                  class="input-group-prepend"
                                >
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
                                <input
                                  id="price"
                                  v-model="price"
                                  name="price"
                                  type="number"
                                  class="form-control"
                                  :placeholder="$t('pla.price')"
                                  aria-describedby="button-price"
                                  :class="{'is-invalid': checkValidate('price')}"
                                >
                                <div v-if="checkValidate('price')" class="invalid-feedback">
                                  {{ validate.price[0] }}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <div class="form-group">
                              <label>{{ $t('menu.payment_type') }}</label>
                              <div class="input-group">
                                <div :class="is_paid ? 'input-group-prepend' : 'btn-group' ">
                                  <button
                                    class="btn"
                                    :class="!is_paid ? 'btn-primary' : 'input-group-text'"
                                    @click="paymentOnDelivery"
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
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-12">
                            <PackageFormItemButton
                              :disabled-button="checkDataChange(price, old_price) && checkDataChange(currency._id, old_currency._id) && checkIsPaidUpdate"
                              @onClickCancel="cancelPrice"
                              @onClickSave="editPackage('payment')"
                            />
                          </div>
                        </div>
                        <div v-else>
                          <div class="form-group show-with-border">
                            <label class="customer-mb-12">{{ $t('label.payment') }}</label>
                            <div class="d-flex align-items-center justify-content-between">
                              <div class="d-flex align-items-center">
                                <div class="package_form-item-content">
                                  <div class="package_form-item-content-label w-100 text-truncate">
                                    <i class="fas fa-money mr-2" />
                                    <label>{{ currency ? price + ' ' + currency.code : price }}</label>
                                  </div>
                                  <div class="package_form-item-content-label w-100 text-truncate">
                                    <i class="fas fa-cash-register mr-2" />
                                    <label>{{ displayIsPaidLabel }}</label>
                                  </div>
                                </div>
                              </div>
                              <div class="package_form-item-edit text-right">
                                <button class="btn btn-light pr-0" @click="edit_price = true">
                                  <i class="fas fa-edit mr-2" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </template>

                      <template>
                        <div v-if="edit_note" class="row">
                          <div class="col-lg-6">
                            <div class="form-group">
                              <label>{{ $t('menu.package_type') }}</label>
                              <select
                                v-if="payment_types"
                                id="package_type"
                                v-model="package_type"
                                name="package_type"
                                class="custom-select"
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
                          <div class="col-lg-6">
                            <div class="form-group">
                              <label class="text-capitalize">{{ $t('label.delivery_date') }}</label>
                              <date-picker
                                v-model="request_delivery_at"
                                type="datetime"
                                :time-picker-options="{start: '06:00', step:'00:30' , end: '23:00', format: 'hh:mm A' }"
                                :show-second="false"
                                :placeholder="$t('string.select_range_date')"
                                :lang="datePickerLang"
                                :format="'DD/MM/YYYY hh:mm:ss A'"
                                input-class="form-control"
                              />
                            </div>
                          </div>
                          <div class="col-lg-12">
                            <div class="form-group">
                              <label>{{ $t('label.note') }}</label>
                              <textarea
                                id="note"
                                v-model="note"
                                rows="3"
                                name="note"
                                class="form-control"
                                :placeholder="$t('pla.note')"
                              />
                            </div>
                          </div>
                          <div class="col-lg-12">
                            <PackageFormItemButton
                              :disabled-button="checkDataChange(note, old_note) && checkDataChange(request_delivery_at, old_rda) && checkDataChange(package_type ? package_type._id : null, old_pt ? old_pt._id : null)"
                              @onClickCancel="cancelNote"
                              @onClickSave="editPackage('remark')"
                            />
                          </div>
                        </div>
                        <div v-else>
                          <div class="form-group show-with-border">
                            <label class="customer-mb-12">{{ $t('label.payment') }}</label>
                            <div class="d-flex align-items-center justify-content-between">
                              <div class="d-flex align-items-center">
                                <div class="package_form-item-content">
                                  <div v-if="package_type" class="package_form-item-content-label w-100 text-truncate">
                                    <i class="fas fa-cube mr-2" />
                                    <label>{{ package_type['name_' + $i18n.locale] }}</label>
                                  </div>
                                  <div
                                    v-if="request_delivery_at"
                                    class="package_form-item-content-label w-100 text-truncate"
                                  >
                                    <i class="fas fa-sticky-note mr-2" />
                                    <label>{{ $moment(request_delivery_at).format('DD/MM/YYYY hh:mm:ss A') }}</label>
                                  </div>
                                  <div v-if="note" class="package_form-item-content-label w-100 text-truncate">
                                    <i class="fas fa-sticky-note mr-2" />
                                    <label>{{ note }}</label>
                                  </div>
                                </div>
                              </div>
                              <div class="package_form-item-edit text-right">
                                <button class="btn btn-light pr-0" @click="edit_note = true">
                                  <i class="fas fa-edit mr-2" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </template>

                      <div class="form-group show-with-border">
                        <label>{{ $t('label.shop') }}</label>
                        <div v-if="shop" class="d-flex align-items-center justify-content-between">
                          <div class="d-flex align-items-center">
                            <div class="package_form-customer-img">
                              <template v-if="shop.logo">
                                <img :src="getSrc(shop.logo)" class="img-thumbnail">
                              </template>
                              <template v-else>
                                <img :src="shop_img" class="img-thumbnail">
                              </template>
                            </div>
                            <div class="package_form-item-content">
                              <div class="package_form-item-content-label w-100 text-truncate">
                                <NuxtLink :to="{name: 'show-shop', params: {id: shop._id}}" class="mb-0 text-bold">
                                  {{ shop.name_en }}
                                </NuxtLink>
                              </div>
                              <div>
                                <small class="text-muted">
                                  <span class="d-block">{{ shop.phone }}</span>
                                </small>
                              </div>
                            </div>
                          </div>
                          <div class="package_form-item-edit text-right">
                            <button class="btn btn-light pr-0" @click="openShopModal">
                              <i class="fas fa-edit mr-2" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div class="form-group show-with-border">
                        <label>{{ $t('label.delivery_with_other_company') }}</label>
                        <div v-if="third_party" class="d-flex align-items-center justify-content-between">
                          <div class="d-flex align-items-center">
                            <div class="package_form-customer-img">
                              <img :src="shop_img" class="img-thumbnail">
                            </div>
                            <div class="package_form-item-content">
                              <div class="package_form-item-content-label w-100 text-truncate">
                                <label class="mb-0">
                                  {{ third_party.name_en }}
                                </label>
                              </div>
                              <div>
                                <small class="text-muted">
                                  <span class="d-block">{{ third_party.phone }}</span>
                                </small>
                              </div>
                            </div>
                          </div>
                          <div class="package_form-item-edit text-right">
                            <button class="btn btn-light pr-0" @click="openThirdPartyModal">
                              <i class="fas fa-edit mr-2" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 pl-4">
                      <div class="form-group">
                        <label>Package Image</label>
                        <div class="mx-auto" style="width: 100%">
                          <img src="/img/package.png" alt="" class="img-thumbnail">
                          <button class="btn btn-primary btn-block mt-3">
                            Upload Package Image
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="package__active">
                  <button
                    type="button"
                    class="btn btn-default btn-block"
                    data-toggle="modal"
                    data-target="#packageHistoryModal"
                  >
                    <i class="fas fa-history mr-2" />
                    <strong>{{ $t('label.package_history') }}</strong>
                  </button>
                  <button
                    type="button"
                    class="btn btn-default btn-block text-green"
                    data-toggle="modal"
                    data-target="#completePackageModal"
                  >
                    <i class="fas fa-map-marker-alt mr-2" />
                    <strong>{{ $t('btn.complete') }}</strong>
                  </button>
                  <button
                    type="button"
                    class="btn btn-default btn-block"
                    data-toggle="modal"
                    data-target="#driverModal"
                    @click="openDriverModal"
                  >
                    <i class="fas fa-user-plus mr-2" />
                    <strong>{{ $t('btn.assign') }}</strong>
                  </button>
                  <button
                    type="button"
                    class="btn btn-default btn-block"
                    data-toggle="modal"
                    data-target="#delayModal"
                  >
                    <i class="fas fa-truck mr-2" />
                    <strong>{{ $t('btn.delay') }}</strong>
                  </button>
                  <button
                    type="button"
                    class="btn btn-default btn-block text-red"
                    data-toggle="modal"
                    data-target="#cancelModal"
                  >
                    <i class="far fa-times-circle mr-2" />
                    <strong>{{ $t('btn.cancel') }}</strong>
                  </button>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <PackageHistoryModal :package-history="package_data.package_histories" />
    <div
      id="shopModal"
      class="modal fade"
      tabindex="-1"
      data-backdrop="static"
    >
      <ShopModal
        ref="shopModal"
        :close-with-emit="true"
        @closeModel="cancelShop"
        @confirmModel="editPackage('shop')"
      />
    </div>
    <div
      id="thirdPartyCompanyModal"
      class="modal fade"
      data-backdrop="static"
      tabindex="-1"
    >
      <ThirdPartyCompanyModal
        ref="thirdPartyCompanyModal"
        :close-with-emit="true"
        @closeModel="cancelThirdParty"
      />
    </div>
    <div
      id="completePackageModal"
      class="modal fade"
      tabindex="-1"
      data-backdrop="static"
    >
      <CompletePackageModel :payment-types="payment_types" :package-id="$route.params.id" />
    </div>
    <div
      id="driverModal"
      class="modal fade"
      tabindex="-1"
      data-backdrop="static"
    >
      <AssignDriverModal ref="driverModal" :package-data="package_data" :currencies="currencies" />
    </div>
    <div
      id="delayModal"
      class="modal fade"
      tabindex="-1"
      data-backdrop="static"
    >
      <DelayPackageModal ref="delayPackageModal" :package-data="package_data" />
    </div>
    <div
      id="cancelModal"
      class="modal fade"
      tabindex="-1"
      data-backdrop="static"
    >
      <CancelPackageModal ref="cancelPackageModal" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ButtonBack from '@/components/UiElements/ButtonBack'
import PackageHistoryModal from '@/pages/admin/package/_components/PackageHistoryModal'
import PackageFormItemButton from '@/pages/admin/package/_components/PackageFormItemButton'
import ShopModal from '@/pages/admin/package/_components/ShopModal'
import ThirdPartyCompanyModal from '@/pages/admin/package/_components/ThirdPartyCompanyModal'
import CompletePackageModel from '@/pages/admin/package/_components/CompletePackageModel'
import AssignDriverModal from '@/pages/admin/package/_components/AssignDriverModal'
import DelayPackageModal from '@/pages/admin/package/_components/DelayPackageModal'
import CancelPackageModal from '@/pages/admin/package/_components/CancelPackageModal'

export default {
  name: 'PackageShow',
  components: {
    CancelPackageModal,
    DelayPackageModal,
    AssignDriverModal,
    CompletePackageModel,
    ThirdPartyCompanyModal,
    ShopModal,
    PackageFormItemButton,
    PackageHistoryModal,
    ButtonBack
  },
  asyncData (ctx) {
    if (ctx.route.params.id) {
      return ctx.$axios
        .post(ctx.env.VUE_APP_API + '/api/backend/package/show', {
          id: ctx.route.params.id
        })
        .then((res) => {
          const result = res.data.data
          return {
            package_data: result
          }
        })
    } else {
      return {
        package_data: null
      }
    }
  },
  created () {
    this.setDataPackage()
  },
  computed: {
    ...mapGetters({
      shop: 'package/shop',
      third_party: 'package/third_party'
    }),
    datePickerLang () {
      return this.$datepickerLocale[this.$i18n.locale].lang
    },
    checkIsPaidUpdate () {
      let pyid = null
      let oldpyid = null
      if (this.payment_type) {
        pyid = this.payment_type._id
      }
      if (this.old_pyt) {
        oldpyid = this.old_pyt._id
      }
      return this.checkDataChange(pyid, oldpyid) && this.checkDataChange(this.is_paid, this.old_ip)
    },
    displayIsPaidLabel () {
      let a = null
      let b = null
      this.is_paid ? a = this.$t('label.payment_with_order') : a = this.$t('label.payment_on_delivery')
      this.payment_type ? b = this.payment_type['name_' + this.$i18n.locale] : b = null
      if (b) {
        return a + ' ( ' + b + ')'
      }
      return a
    }
  },
  mounted () {
    this.getFetchData()
  },
  data () {
    return {
      validate: null,
      currencies: [],
      package_types: [],
      payment_types: [],

      toggle_timline: false,
      edit_cn: false,
      edit_cp: false,
      edit_price: false,
      edit_note: false,

      old_cn: null,
      old_cp: null,
      old_ca: null,
      old_note: null,
      old_shop: null,
      old_price: null,
      old_currency: null,
      old_pt: null,
      old_rda: null,
      old_pyt: null,
      old_ip: false,
      old_third_party: null,

      customer_name: null,
      customer_phone: null,
      customer_address: null,
      note: null,
      price: null,
      currency: null,
      package_type: null,
      request_delivery_at: null,
      payment_type: null,
      is_paid: false
    }
  },
  methods: {
    checkValidate (key) {
      if (key) {
        return this.validate && this.validate.hasOwnProperty(key)
      }
      return false
    },
    paymentOnDelivery () {
      this.is_paid = false
      this.payment_type = null
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
        $('#shopModal').modal('show')
      }
    },
    openThirdPartyModal () {
      if (this.$refs.thirdPartyCompanyModal) {
        this.$refs.thirdPartyCompanyModal.searchThirdParty(1, true)
        $('#thirdPartyCompanyModal').modal('show')
      }
    },
    openDriverModal () {
      if (this.$refs.driverModal) {
        if (this.package_data) {
          if (!this.package_data.delivery_charge_currency) {
            const c = this.currencies.find((item) => {
              if (item.code === 'USD') {
                return item
              } else {
                return null
              }
            })
            this.$set(this.package_data, 'delivery_charge_currency', c)
          }
        }
        this.$refs.driverModal.searchDriver(1, true)
      }
    },
    checkDataChange (newData, oldData) {
      return newData === oldData
    },
    cancelCn () {
      this.customer_name = this.old_cn
      this.customer_phone = this.old_cp
      this.customer_address = this.old_ca
      this.edit_cn = false
    },
    cancelShop () {
      this.$store.dispatch('package/setShop', this.old_shop)
    },
    cancelPrice () {
      this.price = this.old_price
      this.currency = this.old_currency
      this.is_paid = this.old_ip
      this.payment_type = this.old_pyt
      this.edit_price = false
    },
    cancelNote () {
      this.package_type = this.old_pt
      this.request_delivery_at = this.old_rda
      this.note = this.old_note
      this.edit_note = false
    },
    cancelThirdParty () {
      this.$store.dispatch('package/setThirdParty', this.old_third_party)
    },

    editPackage (editForm = null, editFormType = 'edit') {
      this.validate = null
      const data = {
        id: this.$route.params.id,
        edit_form: editForm,
        edit_form_type: editFormType
      }
      switch (editForm) {
        case 'customer_info':
          data.customer_name = this.customer_name
          data.customer_phone = this.customer_phone
          data.customer_address = this.customer_address
          break
        case 'payment':
          data.price = this.price
          data.is_paid = this.is_paid
          if (this.payment_type) { data.payment_type_id = this.payment_type._id }
          if (this.currency) { data.currency_id = this.currency._id }
          break
        case 'remark':
          data.note = this.note
          if (this.package_type) { data.package_type_id = this.package_type._id }
          if (this.request_delivery_at) {
            data.request_delivery_at = this.$moment(this.request_delivery_at).format('YYYY-MM-DD HH:mm:ss')
          }
          break
        case 'shop':
          if (this.shop) { data.shop_id = this.shop._id }
          break
      }
      this.$axios.post(this.$base_api + '/api/backend/package/edit', data)
        .then((res) => {
          this.package_data = res.data.data
          this.resetValue()
          this.setDataPackage()
        }).catch((error) => {
          if (error.response.status === 422) {
            this.validate = error.response.data.errors
            console.log(this.validate = error.response.data.errors)
          }
        })
    },
    resetValue () {
      this.edit_cn = false
      this.edit_cp = false
      this.edit_price = false
      this.edit_note = false
    },
    setDataPackage () {
      if (this.package_data) {
        this.customer_name = this.package_data.customer_name
        this.old_cn = this.customer_name
        this.customer_phone = this.package_data.customer_phone
        this.old_cp = this.customer_phone
        this.customer_address = this.package_data.customer_address
        this.old_ca = this.customer_address
        this.note = this.package_data.note
        this.old_note = this.note
        this.$store.dispatch('package/setShop', this.package_data.shop)
        this.old_shop = this.package_data.shop
        this.price = this.package_data.price
        this.old_price = this.price
        this.currency = this.package_data.currency
        this.old_currency = this.currency
        this.package_type = this.package_data.package_type
        this.old_pt = this.package_type
        if (this.package_data.request_delivery_at) {
          this.request_delivery_at.startDate = this.$moment(this.package_data.request_delivery_at).format('DD/MM/YYYY')
          this.old_rda = this.request_delivery_at
        }
        this.is_paid = this.package_data.is_paid
        this.old_ip = this.is_paid
        this.payment_type = this.package_data.payment_type
        this.old_pyt = this.payment_type
        this.$store.dispatch('package/setThirdParty', this.package_data.partner_company)
        this.old_third_party = this.package_data.partner_company
      }
    }
  }
}
</script>

<style scoped lang="scss">
.hide-timeline {
  max-height: 80px;
  overflow-y: hidden;
  margin-bottom: 10px;
}

.show-timeline {
  max-height: 100%;
  overflow-y: unset;
}

.package__content {
  width: 75%;
}

.package__active {
  width: 12%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: auto;

  & button {
    margin-bottom: 8px;
  }
}

.package_form-customer-img {
  width: 65px;
  margin-right: 15px;
}

.show-with-border {
  border-bottom: 2px solid lightgray;
  padding-bottom: 8px;
}

.customer-mb-12 {
  margin-bottom: 12px;
}

</style>

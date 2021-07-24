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
                    <div class="col-lg-6 pr-4">
                      <div class="form-group">
                        <label>{{ $t('label.customer_name') }}</label>
                        <template v-if="edit_cn">
                          <input
                            id="customer_name"
                            v-model="customer_name"
                            name="customer_name"
                            class="form-control"
                            :placeholder="$t('pla.customer_name')"
                          >
                          <PackageFormItemButton
                            :disabled-button="checkDataChange(customer_name, old_cn)"
                            @onClickCancel="cancelCn"
                            @onClickSave="edit_cn = false"
                          />
                        </template>
                        <template v-else>
                          <PackageFormItem
                            :data-label="customer_name"
                            icon="fas fa-user"
                            @onClickEdit="edit_cn = true"
                          />
                        </template>
                      </div>
                      <div class="form-group">
                        <label>{{ $t('label.customer_phone') }}</label>
                        <template v-if="edit_cp">
                          <input
                            id="customer_phone"
                            v-model="customer_phone"
                            v-mask="'### ### ####'"
                            name="customer_phone"
                            class="form-control"
                            :placeholder="$t('pla.customer_phone')"
                          >
                          <PackageFormItemButton
                            :disabled-button="checkDataChange(customer_phone, old_cp)"
                            @onClickCancel="cancelCp"
                            @onClickSave="edit_cp = false"
                          />
                        </template>
                        <template v-else>
                          <PackageFormItem
                            :data-label="customer_phone"
                            icon="fas fa-phone"
                            @onClickEdit="edit_cp = true"
                          />
                        </template>
                      </div>
                      <div class="form-group">
                        <label>{{ $t('label.customer_address') }}</label>
                        <template v-if="edit_ca">
                          <input
                            id="customer_address"
                            v-model="customer_address"
                            name="customer_address"
                            class="form-control"
                            :placeholder="$t('pla.customer_address')"
                          >
                          <PackageFormItemButton
                            :disabled-button="checkDataChange(customer_address, old_ca)"
                            @onClickCancel="cancelCa"
                            @onClickSave="edit_ca = false"
                          />
                        </template>
                        <template v-else>
                          <PackageFormItem
                            :data-label="customer_address"
                            icon="fas fa-map-marker-alt"
                            @onClickEdit="edit_ca = true"
                          />
                        </template>
                      </div>
                      <div class="form-group">
                        <label>{{ $t('label.price') }}</label>
                        <template v-if="edit_price">
                          <div class="input-group">
                            <input
                              id="price"
                              v-model="price"
                              name="price"
                              type="number"
                              class="form-control"
                              :placeholder="$t('pla.price')"
                              aria-describedby="button-price"
                            >
                            <div v-if="currencies && currencies.length" id="button-price" class="input-group-append">
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
                          </div>
                          <PackageFormItemButton
                            :disabled-button="checkDataChange(price, old_price) && checkDataChange(currency._id, old_currency._id)"
                            @onClickCancel="cancelPrice"
                            @onClickSave="edit_price = false"
                          />
                        </template>
                        <template v-else>
                          <PackageFormItem
                            :data-label="currency ? price + ' ' + currency.code : price"
                            icon="fas fa-money"
                            @onClickEdit="edit_price = true"
                          />
                        </template>
                      </div>
                      <div class="form-group">
                        <label>{{ $t('label.note') }}</label>
                        <template v-if="edit_note">
                          <textarea
                            id="note"
                            v-model="note"
                            rows="3"
                            name="note"
                            class="form-control"
                            :placeholder="$t('pla.note')"
                          />
                          <PackageFormItemButton
                            :disabled-button="checkDataChange(note, old_note)"
                            @onClickCancel="cancelNote"
                            @onClickSave="edit_note = false"
                          />
                        </template>
                        <template v-else>
                          <PackageFormItem
                            :data-label="note"
                            icon="fas fa-map-marker-alt"
                            @onClickEdit="edit_note = true"
                          />
                        </template>
                      </div>
                    </div>
                    <div class="col-lg-6 pl-4">
                      <div class="form-group">
                        <label>{{ $t('label.shop') }}</label>
                        <PackageFormItem
                          :data-label-link="{name: 'show-shop', params: {id: shop ? shop._id : null}}"
                          :is-link="true"
                          :data-label="shop ? shop.name_en : ''"
                          icon="fas fa-store"
                          @onClickEdit="openShopModal"
                        />
                      </div>
                      <div class="form-group">
                        <label>{{ $t('menu.package_type') }}</label>
                        <template v-if="edit_pt">
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
                          <PackageFormItemButton
                            :disabled-button="checkDataChange(package_type ? package_type._id : null, old_pt ? old_pt._id : null)"
                            @onClickCancel="cancelPt"
                            @onClickSave="edit_pt = false"
                          />
                        </template>
                        <template v-else>
                          <PackageFormItem
                            :data-label="package_type ? package_type['name_' + $i18n.locale] : ''"
                            icon="fas fa-user"
                            @onClickEdit="edit_pt = true"
                          />
                        </template>
                      </div>
                      <div class="form-group">
                        <label>{{ $t('label.delivery_at') }}</label>
                        <template v-if="edit_dd">
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
                          <PackageFormItemButton
                            :disabled-button="checkDataChange(request_delivery_at, old_rda)"
                            @onClickCancel="cancelDD"
                            @onClickSave="edit_dd = false"
                          />
                        </template>
                        <template v-else>
                          <PackageFormItem
                            :data-label="request_delivery_at ? $moment(request_delivery_at).format('DD/MM/YYYY hh:mm:ss A') : null"
                            icon="fas fa-calendar"
                            @onClickEdit="edit_dd = true"
                          />
                        </template>
                      </div>
                      <div class="form-group">
                        <label>{{ $t('menu.payment_type') }}</label>
                        <template v-if="edit_pyt">
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
                          <PackageFormItemButton
                            :disabled-button="checkIsPaidUpdate"
                            @onClickCancel="cancelPyt"
                            @onClickSave="edit_pyt = false"
                          />
                        </template>
                        <template v-else>
                          <PackageFormItem
                            :data-label="displayIsPaidLabel"
                            icon="fas fa-cash-register"
                            @onClickEdit="edit_pyt = true"
                          />
                        </template>
                      </div>
                      <div class="form-group">
                        <label>{{ $t('label.delivery_with_other_company') }}</label>
                        <PackageFormItem
                          :data-label="third_party ? third_party.name_en : ''"
                          icon="fas fa-truck"
                          @onClickEdit="openThirdPartyModal"
                        />
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
      id="shopModal"
      class="modal fade"
      tabindex="-1"
      data-backdrop="static"
    >
      <ShopModal ref="shopModal" :close-with-emit="true" @closeModel="cancelShop" />
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
import PackageFormItem from '@/pages/admin/package/_components/PackageFormItem'
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
    PackageFormItem,
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
      if (this.payment_type) { pyid = this.payment_type._id }
      if (this.old_pyt) { oldpyid = this.old_pyt._id }
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
      currencies: [],
      package_types: [],
      payment_types: [],

      toggle_timline: false,
      edit_cn: false,
      edit_cp: false,
      edit_ca: false,
      edit_price: false,
      edit_note: false,

      edit_pt: false,
      edit_pyt: false,
      edit_dd: false,

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
              if (item.code === 'USD') { return item } else { return null }
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
      this.edit_cn = false
    },
    cancelCp () {
      this.customer_phone = this.old_cp
      this.edit_cp = false
    },
    cancelCa () {
      this.customer_address = this.old_ca
      this.edit_ca = false
    },
    cancelNote () {
      this.note = this.old_note
      this.edit_note = false
    },
    cancelShop () {
      this.$store.dispatch('package/setShop', this.old_shop)
    },
    cancelPrice () {
      this.price = this.old_price
      this.currency = this.old_currency
      this.edit_price = false
    },
    cancelPt () {
      this.package_type = this.old_pt
      this.edit_pt = false
    },
    cancelDD () {
      this.request_delivery_at.startDate = this.old_rda
      this.edit_dd = false
    },
    cancelPyt () {
      this.is_paid = this.old_ip
      this.payment_type = this.old_pyt
      this.edit_pyt = false
    },
    cancelThirdParty () {
      this.$store.dispatch('package/setThirdParty', this.old_third_party)
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

</style>

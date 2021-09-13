<template>
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 id="staticBackdropLabel" class="modal-title text-capitalize">
          <i class="fas fa-user-plus mr-2" />
          {{ $t('label.edit_delivery_charge') }}
        </h5>
        <button
          ref="close"
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
          @click="cancelEditDeliveryCharge"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-lg-12">
            <div class="form-group show-with-border">
              <label>{{ $t('label.customer_info') }}</label>
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                  <div class="package_form-customer-img">
                    <img :src="avatar" class="img-thumbnail">
                  </div>
                  <div class="package_form-item-content">
                    <div class="package_form-item-content-label w-100 text-truncate">
                      <label class="mb-0">{{ packageData.customer_name }}</label>
                    </div>
                    <div>
                      <small class="text-muted">
                        <span class="d-block">{{ packageData.customer_phone }}</span>
                        <span class="d-block">{{ packageData.customer_address }}</span>
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-12">
            <div class="form-group show-with-border">
              <label class="customer-mb-12">{{ $t('label.payment') }}</label>
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                  <div class="package_form-item-content">
                    <div class="package_form-item-content-label w-100 text-truncate">
                      <i class="fas fa-money-bill mr-2" />
                      <label>{{ packageData.currency ? packageData.price + ' ' + packageData.currency.code : packageData.price }}</label>
                    </div>
                    <div class="package_form-item-content-label w-100 text-truncate">
                      <i class="fas fa-cash-register mr-2" />
                      <label>{{ displayIsPaidLabel(packageData) }}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-12">
            <div v-if="packageData.partner_company" class="form-group show-with-border">
              <label>{{ $t('label.delivery_with_other_company') }}</label>
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                  <div class="package_form-customer-img">
                    <img :src="shop_img" class="img-thumbnail">
                  </div>
                  <div class="package_form-item-content">
                    <div class="package_form-item-content-label w-100 text-truncate">
                      <label class="mb-0">
                        {{ packageData.partner_company.name_en }}
                      </label>
                    </div>
                    <div>
                      <small class="text-muted">
                        <span class="d-block">{{ packageData.partner_company.phone }}</span>
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-12">
            <div v-if="packageData.driver" class="form-group show-with-border">
              <label>{{ $t('label.delivery_info') }}</label>
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                  <div class="package_form-customer-img">
                    <template v-if="packageData.driver.avatar">
                      <img :src="getSrc(packageData.driver.avatar)" class="img-thumbnail">
                    </template>
                    <template v-else>
                      <img :src="avatar" class="img-thumbnail">
                    </template>
                  </div>
                  <div class="package_form-item-content">
                    <div class="package_form-item-content-label w-100 text-truncate">
                      <label>
                        {{ packageData.driver.full_name }}
                        <span class="ml-2 badge" :class="colorStatus(packageData.final_status)">{{ checkStatus(packageData.final_status) }}</span>
                      </label>
                    </div>
                    <div>
                      <label>
                        {{ $moment(packageData.finished_at).format('DD/MM/YYYY hh:mm:ss A') }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-12">
            <div class="form-group">
              <label class="w-100 text-left"> {{ $t('label.delivery_charge') }}</label>
              <div class="input-group" :class="{'is-invalid': checkValidate('delivery_charge') || checkValidate('delivery_charge_currency')}">
                <input
                  id="price"
                  v-model="delivery_charge"
                  name="price"
                  type="number"
                  class="form-control"
                  :placeholder="$t('label.delivery_charge')"
                  :class="{'is-invalid': checkValidate('delivery_charge') || checkValidate('delivery_charge_currency')}"
                >
                <div v-if="currencies && currencies.length" id="button-price" class="input-group-append">
                  <button
                    v-for="(currency, sub_key) in currencies"
                    :key="sub_key"
                    class="btn"
                    type="button"
                    :class="delivery_charge_currency && delivery_charge_currency._id === currency._id ? 'btn-primary' : 'input-group-text'"
                    @click="delivery_charge_currency = currency"
                  >
                    {{ currency.code }}
                  </button>
                </div>
              </div>
              <div v-if="checkValidate('delivery_charge') || checkValidate('delivery_charge_currency')" class="invalid-feedback">
                <template v-if="checkValidate('delivery_charge') ">
                  {{ validate.delivery_charge[0] }}
                </template>
                <template v-if="checkValidate('delivery_charge_currency') ">
                  {{ validate.delivery_charge_currency[0] }}
                </template>
              </div>
            </div>
          </div>
          <div class="col-lg-12">
            <template v-if="packageData && packageData.partner_company">
              <div class="form-group">
                <label class="w-100 text-left"> {{ $t('label.extra_charge') }}</label>
                <div class="input-group">
                  <input
                    id="extra_charge"
                    v-model="extra_charge"
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
                      :class="extra_charge_currency && extra_charge_currency._id === currency._id ? 'btn-primary' : 'input-group-text'"
                      @click="extra_charge_currency = currency"
                    >
                      {{ currency.code }}
                    </button>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-light"
          data-dismiss="modal"
          @click="cancelEditDeliveryCharge"
        >
          <i class="fas fa-times-circle mr-2" />
          <strong>{{ $t('btn.cancel') }}</strong>
        </button>
        <button
          type="button"
          class="btn btn-primary"
          @click="submitEditDeliveryCharge"
        >
          <i class="fas fa-check-circle mr-2" />
          <strong>{{ $t('btn.update') }}</strong>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'EditDeliveryChargeModal',
  props: {
    packageData: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  computed: {
    ...mapGetters({
      currencies: 'delivery_company/currencies'
    })
  },
  data () {
    return {
      delivery_charge: null,
      delivery_charge_currency: null,
      extra_charge: null,
      extra_charge_currency: null
    }
  },
  methods: {
    displayIsPaidLabel (item) {
      let a = null
      let b = null
      item.is_paid ? a = this.$t('label.payment_with_order') : a = this.$t('label.payment_on_delivery')
      item.payment_type ? b = item.payment_type['name_' + this.$i18n.locale] : b = null
      if (b) {
        return a + ' ( ' + b + ')'
      }
      return a
    },
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
        if (pac.partner_company) {
          this.extra_charge = pac.extra_charge
          this.extra_charge_currency = pac.extra_charge_currency
        }
      }
    },
    cancelEditDeliveryCharge () {
      console.log('hello')
    },
    submitEditDeliveryCharge () {
      this.onConfirm({
        icon: 'warning',
        title: this.$t('label.edit_delivery_charge'),
        text: this.$t('label.edit_delivery_charge_sub'),
        cancelButtonColor: '#3a7afe',
        confirmButtonColor: '#ed524f',
        confirmButtonText: this.$t('string.ok'),
        cancelButtonText: this.$t('string.cancel')
      }).then((accept) => {
        if (accept) {
          const data = {
            edit_form: 'delivery_charge',
            edit_form_type: 'edit'
          }
          if (this.packageData) {
            data.id = this.packageData._id
          }
          data.delivery_charge = this.delivery_charge
          data.delivery_charge_currency = this.delivery_charge_currency
          data.extra_charge = this.extra_charge
          data.extra_charge_currency = this.extra_charge_currency
          this.$axios.post(this.$base_api + '/api/backend/package/edit', data)
            .then((res) => {
              this.$toastr('success', this.$t('message.edit_delivery_charge'), this.$t('label.edit_delivery_charge'))
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
  & label {
    width: 100%;
    text-align: left !important;
  }
}

.customer-mb-12 {
  margin-bottom: 12px;
}

.package_form-item-content-label i {
  width: 25px;
  padding-left: 2px;
}
</style>

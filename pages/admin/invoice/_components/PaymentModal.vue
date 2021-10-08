<template>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 id="staticBackdropLabel" class="modal-title">
          {{ $t('label.invoice_payment') }} ( {{ $t('label.number') }}: {{ invoice ? invoice.code : null }})
        </h5>
        <button ref="close" type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div v-if="shop" class="row mb-2">
          <div class="col-lg-6">
            <div>
              <div class="text-truncate">
                {{ $t('label.shop_name') }} : <label class="mb-0">{{ shop.name_en }}</label>
              </div>
              <div class="text-truncate">
                {{ $t('label.phone') }} : <label class="mb-0">{{ shop.phone }}</label>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div>
              <div class="text-truncate">
                {{ $t('label.owner_name') }} : <label class="mb-0">{{ shop.owner_name }}</label>
              </div>
              <div class="text-truncate">
                {{ $t('label.address') }} : <label class="mb-0">{{ shop['address_' + $i18n.locale] }}</label>
              </div>
            </div>
          </div>
        </div>
        <div v-if="invoice" class="row">
          <table class="table table-striped">
            <tbody>
              <tr class="border-top border-dark border-2">
                <td>
                  <p class="mb-0 text-uppercase text-bold">
                    {{ $t('label.sub_total') }}
                  </p>
                  <p class="mb-0 text-bold text-sm">
                    <em>(1) + (2)</em>
                  </p>
                </td>
                <td class="text-right">
                  <p class="mb-0 text-bold">
                    <span v-if="invoice">
                      {{ invoice.sub_total_riel | numFormat(checkFormatCurrency({code: 'KHR'})) }}
                    </span>
                    <span v-else>{{ '0' }}</span> KHR
                  </p>
                  <p class="mb-0 text-bold">
                    <span v-if="invoice">
                      {{ invoice.sub_total_dollar | numFormat(checkFormatCurrency({code: 'USD'})) }}
                    </span>
                    <span v-else>{{ '0' }}</span> USD
                  </p>
                </td>
              </tr>
              <tr v-if="invoice.discount">
                <td>
                  <p class="mb-0 text-uppercase text-bold">
                    {{ $t('label.discount') }}
                  </p>
                  <p v-if="invoice.discount_by" class="mb-0 text-bold">
                    ( {{ invoice.discount_by }} )
                  </p>
                </td>
                <td class="text-right">
                  <p class="mb-0 text-bold">
                    {{ invoice.discount | numFormat(numFormatEn) }}
                    <template v-if="invoice.is_percentage">
                      %
                    </template>
                    <template v-else>
                      {{ invoice.discount_currency ? invoice.discount_currency.code : 'KHR' }}
                    </template>
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p class="mb-0 text-uppercase text-lg text-bold">
                    {{ $t('label.total') }}
                  </p>
                </td>
                <td class="text-right">
                  <template v-if="invoice.discount > 0">
                    <p class="mb-0 text-bold">
                      <span class="mb-0 text-md text-red">
                        <del>{{
                          invoice ? invoice.sub_total_riel : '0' | numFormat(checkFormatCurrency({code: 'KHR'}))
                        }} KHR</del>
                      </span>
                      <span class="text-lg">{{
                        invoice ? invoice.total_price_riel : '0' | numFormat(checkFormatCurrency({code: 'KHR'}))
                      }} KHR</span>
                    </p>
                    <p class="mb-0 text-bold">
                      <span class="mb-0 text-sm text-red">
                        <del>{{
                          invoice ? invoice.sub_total_dollar : '0' | numFormat(checkFormatCurrency({code: 'KHR'}))
                        }} KHR</del>
                      </span>
                      {{ invoice ? invoice.total_price_dollar : '0' | numFormat(checkFormatCurrency({code: 'USD'})) }} USD
                    </p>
                  </template>
                  <template v-else>
                    <p class="mb-0 text-lg text-bold">
                      {{ invoice ? invoice.total_price_riel : '0' | numFormat(checkFormatCurrency({code: 'KHR'})) }} KHR
                    </p>
                    <p class="mb-0 text-bold">
                      {{ invoice ? invoice.total_price_dollar : '0' | numFormat(checkFormatCurrency({code: 'USD'})) }} USD
                    </p>
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">KHR</span>
                </div>
                <input
                  v-model="paid_riel"
                  type="number"
                  min="0"
                  class="form-control"
                  placeholder="Pay as riel"
                  aria-label="Pay as riel"
                  aria-describedby="basic-addon1"
                >
                <div class="input-group-append">
                  <button class="btn btn-default" type="button" @click="autoCompletePayment('KHR')">
                    <i class="far fa-credit-card" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">USD</span>
                </div>
                <input
                  v-model="paid_dollar"
                  type="number"
                  min="0"
                  class="form-control"
                  placeholder="Pay as dollar"
                  aria-label="Pay as dollar"
                  aria-describedby="basic-addon1"
                >
                <div class="input-group-append">
                  <button class="btn btn-default" type="button" @click="autoCompletePayment('USD')">
                    <i class="far fa-credit-card" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="form-group">
              <label>{{ $t('menu.payment_type') }}</label>
              <div>
                <div
                  v-if="payment_types && payment_types.length"
                  class="d-flex align-items-center"
                >
                  <div
                    v-for="(item, key) in payment_types"
                    :key="key"
                    class="payment_type_item"
                    :class="{'active': selected_payment_type && selected_payment_type._id === item._id}"
                    @click="selected_payment_type = item"
                  >
                    <div>
                      {{ item['name_' + $i18n.locale] }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--        <div v-if="amountOwe > 0" class="row">-->
        <!--          <div class="col-lg-6">-->
        <!--            <div class="form-group">-->
        <!--              <label>Amount Own</label>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--          <div class="col-lg-6 text-right">-->
        <!--            <div class="form-group">-->
        <!--              <label class="d-block">-->
        <!--                {{ amountOwe | numFormat(checkFormatCurrency(currency)) }}-->
        <!--                {{ currency ? currency.code : 'USD' }}-->
        <!--              </label>-->
        <!--              <small class="d-block text-bold">-->
        <!--                ( {{-->
        <!--                  moneyEquivalent(currency ? currency.code : 'USD', amountOwe) | numFormat(oppositeCurrency(currency) === 'KHR' ? numFormatKm : numFormatEn )-->
        <!--                }}-->
        <!--                {{ oppositeCurrency(currency) }} )-->
        <!--              </small>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
        <div v-if="amountDue > 0" class="row">
          <div class="col-lg-6">
            <div class="form-group">
              <label>{{ $t('label.balance') }}</label>
            </div>
          </div>
          <div class="col-lg-6 text-right">
            <div class="form-group">
              <label class="d-block">
                {{ amountDue | numFormat(checkFormatCurrency(currency)) }}
                {{ currency ? currency.code : 'USD' }}
              </label>
              <small class="d-block text-bold">
                ( {{
                  moneyEquivalent(currency ? currency.code : 'USD', amountDue) | numFormat(oppositeCurrency(currency) === 'KHR' ? numFormatKm : numFormatEn )
                }}
                {{ oppositeCurrency(currency) }} )
              </small>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <small>{{ $t('label.exchange_rate') }} 1USD = {{ dc_exchange_rate ? dc_exchange_rate.value : '4,100' }}KHR</small>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">
          <i class="fas fa-times-circle" />
          <strong>{{ $t('btn.cancel') }}</strong>
        </button>
        <template>
          <button type="button" class="btn btn-success" @click="confirmPayment">
            <i class="fas fa-check-circle" />
            <strong>
              {{ $t('btn.complete_payment') }}
            </strong>
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PaymentModal',
  props: {
    invoice: {
      type: Object,
      default: () => {
        return null
      }
    },
    shop: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  data () {
    return {
      selected_payment_type: null,
      payment_types: [],
      paid_riel: 0,
      paid_dollar: 0
    }
  },
  computed: {
    ...mapGetters({
      dcid: 'delivery_company/dcid',
      currency: 'delivery_company/currency'
    }),
    hasAmountPaid () {
      return !!((this.paid_dollar || this.paid_riel) && (this.paid_dollar > 0 || this.paid_riel > 0))
    },
    paidCompareWithTotal () {
      try {
        if (this.invoice) {
          let amountTotal = 0
          if (this.currency && this.currency.code === 'KHR') {
            amountTotal = this.invoice.total_price_riel
          } else {
            amountTotal = this.invoice.total_price_dollar
          }
          const paidRiel = Math.ceil(this.exchangeMoney('KHR', this.currency.code, this.paid_riel))
          const paidDollar = Math.ceil(this.exchangeMoney('USD', this.currency.code, this.paid_dollar))
          return this.precise((paidRiel + paidDollar) - amountTotal)
        }
        return 0
      } catch (e) {
        return 0
      }
    },
    amountDue () {
      return this.paidCompareWithTotal < 0 ? 0 : Math.abs(this.paidCompareWithTotal)
    },
    amountOwe () {
      return this.paidCompareWithTotal >= 0 ? 0 : Math.abs(this.paidCompareWithTotal)
    }
  },
  mounted () {
    this.getFetchData()
  },
  methods: {
    getFetchData () {
      this.$axios
        .get(process.env.VUE_APP_API + '/api/backend/fetch-data/data-for-package')
        .then((res) => {
          const result = res.data.data
          this.payment_types = result.payment_types
          if (this.payment_types.length > 0) {
            this.payment_types.forEach((item) => {
              if (item.name_en.toLowerCase() === 'cash') {
                this.selected_payment_type = item
              }
            })
          }
        }).catch((error) => {
          this.onResponseError(error)
        })
    },
    autoCompletePayment (codeCurrency) {
      if (this.invoice) {
        if (codeCurrency === 'KHR') {
          this.paid_riel = this.invoice.total_price_riel
          this.paid_dollar = 0
        } else {
          this.paid_riel = 0
          this.paid_dollar = this.invoice.total_price_dollar.toFixed(2)
        }
      } else {
        this.paid_riel = 0
        this.paid_dollar = 0
      }
    },
    confirmPayment () {
      if (!this.hasAmountPaid && this.amountOwe > 0) {
        this.onConfirm({
          title: this.$t('string.paymentIsZero'),
          html: `<p class="text-bold">${this.$t('string.paymentIsZero_sub')}</p>`,
          cancelButtonColor: '#3a7afe',
          confirmButtonColor: '#ed524f',
          cancelButtonText: this.$t('button.cancel'),
          confirmButtonText: this.$t('string.yesIWish!')
        }).then((accept) => {
          if (accept) {
            this.completePayment()
          }
        })
      } else {
        this.completePayment()
      }
    },
    completePayment () {
      const data = {
        id: this.invoice._id,
        amount_paid_riel: this.paid_riel,
        amount_paid_dollar: this.paid_dollar,
        payment_type: this.selected_payment_type
      }
      this.$axios.post(this.$base_api + '/api/backend/invoice/payment', data)
        .then((res) => {
          this.invoice = res.data.data
          this.$refs.close.click()
          this.$emit('PaymentSuccess')
        }).catch((error) => {
          this.onResponseError(error)
        })
    }
  }
}
</script>

<style scoped lang="scss">
.payment_type_item {
  min-width: 100px;
  padding: 15px;
  color: black;
  font-weight: 700;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  margin-right: 8px;
  margin-bottom: 8px;
  text-align: center;
  cursor: pointer;
  user-select: none;

  &.active,
  &.active:hover,
  &.active:focus {
    background-color: var(--primary);
    color: white;
  }

  &:last-child {
    margin-right: 0;
  }

  &:hover,
  &:focus {
    background-color: rgba(0, 0, 0, .05);
  }
}
</style>

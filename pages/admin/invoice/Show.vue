<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header with-border">
          <h3 class="card-title text-capitalize">
            {{ $t('label.show') }}
          </h3>
          <div class="card-tools">
            <button
              class="btn btn-dark btn-sm"
              @click="printInvoice"
            >
              <i class="fas fa-print mr-1" />
              <strong>{{ $t('btn.print') }}</strong>
            </button>
            <ButtonBack />
          </div>
        </div>
        <div class="card-body shop-card_body">
          <div>
            <div class="row">
              <div v-if="dc" class="col-lg-6">
                <h4 class="text-bold text-uppercase">
                  {{ dc.name_en }}
                </h4>
                <div>
                  <label class="mb-0 text-normal">{{ $t('label.phone') }} : {{ dc.phone }}</label>
                </div>
                <div class="w-75">
                  <label class="mb-0 text-normal">{{ dc.address_en }}</label>
                </div>
              </div>
              <div v-if="invoice" class="col-lg-6 text-right">
                <h4 class="text-bold text-uppercase">
                  Invoice
                </h4>
                <div>Date : {{ $moment(invoice.created_at).format('DD/MM/YYYY') }}</div>
                <div><label class="mb-0 text-normal">No : <strong>{{ invoice.code }}</strong></label></div>
                <div>
                  <label class="mb-0 text-normal">
                    Delivery Fee ( Date ) :
                    <template
                      v-if="$moment(invoice.from_date).format('DD/MM/YYYY') === $moment(invoice.to_date).format('DD/MM/YYYY')"
                    >
                      <strong>{{ $moment(invoice.from_date).format('DD/MM/YYYY') }}</strong>
                    </template>
                    <template v-else>
                      <strong>{{ $moment(invoice.from_date).format('DD/MM/YYYY') }} ~
                        {{ $moment(invoice.to_date).format('DD/MM/YYYY') }}</strong>
                    </template>
                  </label>
                </div>
              </div>
            </div>
            <div v-if="shop" class="row mt-4">
              <div class="col-lg-6">
                <div class="border border-2 border-dark">
                  <label class="text-uppercase py-2 px-3 bg-dark text-white w-100">
                    Bill To :
                  </label>
                  <div class="pl-3 pb-2">
                    <div>{{ $t('label.shop_name') }} : <label class="mb-0">{{ shop.name_en }}</label></div>
                    <div>{{ $t('label.owner_name') }} : <label class="mb-0">{{ shop.owner_name }}</label></div>
                    <div>{{ $t('label.phone') }} : <label class="mb-0">{{ shop.phone }}</label></div>
                    <div class="w-75">
                      <label class="mb-0">{{ shop['address_' + $i18n.locale] }}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-4 border border-2 border-dark">
              <label class="text-uppercase py-2 px-3 bg-dark text-white w-100">
                Remaining Packages :
              </label>
              <div class="row px-3">
                <div class="col-lg-4">
                  <div>
                    <label>
                      {{ $t('label.new_packages') }} : {{ pck_info.count_new_packages }}
                    </label>
                  </div>
                  <div>
                    <label>
                      {{ $t('label.assigned_packages') }} : {{ pck_info.count_assigned_packages }}
                    </label>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div>
                    <label>
                      {{ $t('label.delivery_package') }} : {{ pck_info.count_delivery_packages }}
                    </label>
                  </div>
                  <div>
                    <label>
                      {{ $t('label.delay_package') }} : {{ pck_info.count_delay_packages }}
                    </label>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div>
                    <label>
                      {{ $t('label.cancel_package') }} : {{ pck_info.count_cancel_packages }}
                    </label>
                  </div>
                  <div>
                    <label>
                      {{ $t('label.reject_packages') }} : {{ pck_info.count_reject_packages }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-lg-12">
                <table class="table table-striped table-borderless border border-2 border-dark">
                  <thead class="thead-dark">
                    <tr class="thead-dark">
                      <th width="200px">
                        {{ $t('label.package_code') }}
                      </th>
                      <th>{{ $t('label.customer_info') }}</th>
                      <th>{{ $t('label.delivery_info') }}</th>
                      <th class="text-center" width="175px">
                        {{ $t('label.delivery_charge') }} (1)
                      </th>
                      <th class="text-center" width="175px">
                        {{ $t('label.extra_charge') }} (2)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="packages && packages.length > 0">
                      <template v-for="(item, key) in packages">
                        <tr :key="key">
                          <td>{{ item.code }}</td>
                          <td>
                            <label class="d-block mb-0">{{ item.customer_name }}</label>
                            <small class="d-block mb-0">{{ item.customer_phone }}</small>
                            <small class="d-block mb-0">{{ item.customer_address }}</small>
                          </td>
                          <td>
                            <label class="d-block mb-0">
                              <template v-if="item.driver">
                                {{ item.driver.full_name }}
                              </template>
                              <template v-else>
                                -
                              </template>
                            </label>
                            <small class="d-block mb-0">
                              <strong>{{ checkStatus(item.final_status) }}</strong>
                            </small>
                            <small class="d-block mb-0">{{
                              $moment(item.finished_at).format('DD/MM/YYYY hh:mm:ss A')
                            }}</small>
                          </td>
                          <td class="text-center">
                            <label v-if="item.delivery_charge" class="d-block mb-0">
                              {{ item.delivery_charge | numFormat(checkFormatCurrency(item.delivery_charge_currency)) }}
                              <template v-if="item.delivery_charge_currency">
                                {{ item.delivery_charge_currency.code }}
                              </template>
                            </label>
                            <label v-else class="d-block mb-0">
                              -
                            </label>
                          </td>
                          <td class="text-center">
                            <label v-if="item.extra_charge" class="d-block mb-0">
                              {{ item.extra_charge | numFormat(checkFormatCurrency(item.delivery_charge_currency)) }}
                              <template v-if="item.extra_charge_currency">
                                {{ item.extra_charge_currency.code }}
                              </template>
                            </label>
                            <label v-else class="d-block mb-0">
                              -
                            </label>
                          </td>
                        </tr>
                      </template>
                      <tr class="border-top border-dark border-2">
                        <td colspan="2" />
                        <td>
                          <p class="mb-0 text-uppercase text-bold">
                            Sub Total
                          </p>
                          <p class="mb-0 text-bold text-sm">
                            <em>(1) + (2)</em>
                          </p>
                        </td>
                        <td colspan="3" class="text-right">
                          <p class="mb-0 text-bold">
                            <span v-if="invoice">
                              {{ invoice.sub_total_dollar | numFormat(checkFormatCurrency({code: 'KHR'})) }}
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
                        <td colspan="2" />
                        <td>
                          <p class="mb-0 text-uppercase text-bold">
                            {{ $t('label.discount') }}
                          </p>
                        </td>
                        <td colspan="3" class="text-right">
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
                      <tr v-if="invoice.discount_by">
                        <td colspan="2" />
                        <td>
                          <p class="mb-0 text-uppercase text-bold">
                            {{ $t('label.discount_by') }}
                          </p>
                        </td>
                        <td colspan="3" class="text-right">
                          <p class="mb-0 text-bold">
                            {{ invoice.discount_by }}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" />
                        <td>
                          <p class="mb-0 text-uppercase text-lg text-bold">
                            Total
                          </p>
                        </td>
                        <td colspan="3" class="text-right">
                          <template v-if="invoice.discount > 0">
                            <p class="mb-0 text-lg text-bold">
                              <template v-if="invoice">
                                {{ invoice.total_price_riel | numFormat(checkFormatCurrency({code: 'KHR'})) }}
                              </template>
                              <template v-else>
                                0
                              </template>KHR
                            </p>
                            <p class="mb-0 text-md text-bold text-red">
                              <del>{{
                                invoice ? invoice.sub_total_riel : '0' | numFormat(checkFormatCurrency({code: 'KHR'}))
                              }} KHR
                              </del>
                            </p>
                            <p class="mb-0 text-bold">
                              {{
                                invoice ? invoice.total_price_dollar : '0' | numFormat(checkFormatCurrency({code: 'USD'}))
                              }} USD
                            </p>
                            <p class="mb-0 text-sm text-bold text-red">
                              <del>{{
                                invoice ? invoice.sub_total_dollar : '0' | numFormat(checkFormatCurrency({code: 'KHR'}))
                              }} KHR
                              </del>
                            </p>
                          </template>
                          <template v-else>
                            <p class="mb-0 text-lg text-bold">
                              {{
                                invoice ? invoice.total_price_riel : '0' | numFormat(checkFormatCurrency({code: 'KHR'}))
                              }} KHR
                            </p>
                            <p class="mb-0 text-bold">
                              {{
                                invoice ? invoice.total_price_dollar : '0' | numFormat(checkFormatCurrency({code: 'USD'}))
                              }} USD
                            </p>
                          </template>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" />
                        <td>
                          <p class="mb-0 text-uppercase text-lg text-bold">
                            Amount Paid
                          </p>
                        </td>
                        <td colspan="3" class="text-right">
                          <template v-if="invoice.discount > 0">
                            <p class="mb-0 text-lg text-bold">
                              {{
                                invoice ? invoice.total_price_riel : '0' | numFormat(checkFormatCurrency({code: 'KHR'}))
                              }} KHR
                            </p>
                            <p class="mb-0 text-md text-bold text-red">
                              <del>{{
                                invoice ? invoice.sub_total_riel : '0' | numFormat(checkFormatCurrency({code: 'KHR'}))
                              }} KHR
                              </del>
                            </p>
                            <p class="mb-0 text-bold">
                              {{
                                invoice ? invoice.total_price_dollar : '0' | numFormat(checkFormatCurrency({code: 'USD'}))
                              }} USD
                            </p>
                            <p class="mb-0 text-sm text-bold text-red">
                              <del>{{
                                invoice ? invoice.sub_total_dollar : '0' | numFormat(checkFormatCurrency({code: 'KHR'}))
                              }} KHR
                              </del>
                            </p>
                          </template>
                          <template v-else>
                            <p class="mb-0 text-lg text-bold">
                              {{
                                invoice ? invoice.total_price_riel : '0' | numFormat(checkFormatCurrency({code: 'KHR'}))
                              }} KHR
                            </p>
                            <p class="mb-0 text-bold">
                              {{
                                invoice ? invoice.total_price_dollar : '0' | numFormat(checkFormatCurrency({code: 'USD'}))
                              }} USD
                            </p>
                          </template>
                        </td>
                      </tr>
                    </template>
                    <template v-else>
                      <tr>
                        <td colspan="6">
                          <NoResult />
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-12 text-right">
                <template v-if="invoice && !invoice.is_paid">
                  <button type="button" class="btn btn-success" data-toggle="modal" data-target="#payment">
                    Payment
                  </button>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      id="payment"
      class="modal fade"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <PaymentModal
        :invoice="invoice"
        :shop="shop"
        @PaymentSuccess="getInvoice()"
      />
    </div>
  </div>
</template>

<script>
import ButtonBack from '@/components/UiElements/ButtonBack'
import NoResult from '@/components/NoResult'
import { mapGetters } from 'vuex'
import PaymentModal from '@/pages/admin/invoice/_components/PaymentModal'

export default {
  name: 'Show',
  components: { PaymentModal, NoResult, ButtonBack },
  computed: {
    ...mapGetters({
      dcid: 'delivery_company/dcid',
      currency: 'delivery_company/currency'
    })
  },
  data () {
    return {
      onloading: false,
      invoice: null,
      dc: null,
      shop: null,
      pck_info: {
        count_new_packages: 0,
        count_assigned_packages: 0,
        count_reject_packages: 0,
        count_delivery_packages: 0,
        count_delay_packages: 0,
        count_complete_packages: 0,
        count_cancel_packages: 0,
        count_return_packages: 0
      },
      packages: []
    }
  },
  mounted () {
    this.getInvoice()
  },
  methods: {
    getInvoice () {
      this.$axios.post(this.$base_api + '/api/backend/invoice/show', {
        id: this.$route.params.id,
        dcid: this.dcid
      }).then((res) => {
        this.invoice = res.data.data
        if (this.invoice.delivery_company) {
          this.dc = this.invoice.delivery_company
        }
        if (this.invoice.shop) {
          this.shop = this.invoice.shop
        }
        this.pck_info = this.invoice.packages_info
        this.packages = this.invoice.packages
      }).catch((error) => {
        this.onResponseError(error)
      })
    },
    printInvoice () {
      const url = `${this.$base_api}/invoice/dc=`
      const invoiceCode = this.invoice ? this.invoice.code : null
      window.open(url + this.dcid + '&id=' + this.$route.params.id + '&c=' + invoiceCode)
    }
  }
}
</script>
<style scoped>

</style>

<template>
  <div class="card">
    <div class="card-header">
      <div class="card-title">
        {{ $t('label.add_new') }}
      </div>
      <div class="card-tools">
        <ButtonBack />
      </div>
    </div>
    <div class="card-body">
      <div v-if="dc">
        <div class="row">
          <div class="col-lg-6">
            <v-select
              v-model="shop"
              :class="checkValidate('currency') ? 'custom-v-select is-invalid' : 'custom-v-select'"
              class="style-chooser"
              :placeholder="$t('label.select_one_option')"
              :options="shops"
              :get-option-key="option => option._id"
              :label="'name_' + $i18n.locale"
              @option:selected="getShopReport"
            />
          </div>
          <div v-if="shop" class="col-lg-6">
            <div class="date_invoice d-flex align-items-center">
              <div class="select_date_invoice">
                <date-picker
                  v-model="filter_date"
                  type="date"
                  :range="true"
                  :placeholder="$t('string.select_date')"
                  :lang="datePickerLang"
                  :format="'DD/MM/YYYY'"
                  input-class="form-control w-100"
                  :disabled-date="notAfterToday"
                  :clearable="false"
                  @input="setDate('other')"
                />
              </div>
              <div class="button_date_invoice">
                <div class="btn-group" role="group" aria-label="Basic example">
                  <button
                    type="button"
                    class="btn"
                    :class="filter_status === 'day' ? 'btn-primary' : 'btn-default'"
                    @click="setDate('day')"
                  >
                    <strong>{{ $t('date.today') }}</strong>
                  </button>
                  <button
                    type="button"
                    class="btn"
                    :class="filter_status === 'week' ? 'btn-primary' : 'btn-default'"
                    @click="setDate('week')"
                  >
                    <strong>{{ $t('date.this_week') }}</strong>
                  </button>
                  <button
                    type="button"
                    class="btn"
                    :class="filter_status === 'month' ? 'btn-primary' : 'btn-default'"
                    @click="setDate('month')"
                  >
                    <strong>{{ $t('date.this_month') }}</strong>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-12">
            <div class="row">
              <div class="col-lg-6">
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
              <div class="col-lg-6 text-right">
                <h4 class="text-bold text-uppercase">
                  {{ $t('menu.invoice') }}
                </h4>
                <div>
                  <label class="mb-0 text-normal">
                    {{ $t('label.date') }} :
                    <template v-if="$moment(filter_date[0]).format('DD/MM/YYYY') === $moment(filter_date[1]).format('DD/MM/YYYY')">
                      <strong>{{ $moment(filter_date[0]).format('DD/MM/YYYY') }}</strong>
                    </template>
                    <template v-else>
                      <strong>{{ $moment(filter_date[0]).format('DD/MM/YYYY') }} ~ {{ $moment(filter_date[1]).format('DD/MM/YYYY') }}</strong>
                    </template>
                  </label>
                </div>
              </div>
            </div>
            <template v-if="shop">
              <div class="row mt-4">
                <div class="col-lg-6">
                  <div class="border border-2 border-dark">
                    <label class="text-uppercase py-2 px-3 bg-dark text-white w-100">
                      {{ $t('label.billTo') }} :
                    </label>
                    <div class="pl-3 pb-2">
                      <div> <label class="mb-0">{{ $t('label.shop_name') }} : {{ shop.name_en }}</label></div>
                      <div> <label class="mb-0">{{ $t('label.owner_name') }} : {{ shop.owner_name }}</label></div>
                      <div><label class="mb-0 text-normal">{{ $t('label.phone') }}: {{ shop.phone }}</label></div>
                      <div class="w-75">
                        <label class="mb-0 text-normal">{{ shop.address_en }}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <template v-if="packages && packages.length">
                <div class="mt-4 border border-2 border-dark">
                  <label class="text-uppercase py-2 px-3 bg-dark text-white w-100">
                    {{ $t('label.remainingPackages') }} :
                  </label>
                  <div class="row px-3">
                    <div class="col-lg-4">
                      <div>
                        <label>
                          {{ $t('label.new_packages') }} : {{ count_new_packages }}
                        </label>
                      </div>
                      <div>
                        <label>
                          {{ $t('label.assigned_packages') }} : {{ count_assigned_packages }}
                        </label>
                      </div>
                    </div>
                    <div class="col-lg-4">
                      <div>
                        <label>
                          {{ $t('label.delivery_package') }} : {{ count_delivery_packages }}
                        </label>
                      </div>
                      <div>
                        <label>
                          {{ $t('label.delay_package') }} : {{ count_delay_packages }}
                        </label>
                      </div>
                    </div>
                    <div class="col-lg-4">
                      <div>
                        <label>
                          {{ $t('label.cancel_package') }} : {{ count_cancel_packages }}
                        </label>
                      </div>
                      <div>
                        <label>
                          {{ $t('label.reject_packages') }} : {{ count_reject_packages }}
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
                          <th width="125px">
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
                          <th width="95px" class="text-center">
                            {{ $t('label.action') }}
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
                                <small class="d-block mb-0">{{ $moment(item.finished_at).format('DD/MM/YYYY hh:mm:ss A') }}</small>
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
                              <td>
                                <div class="w-100 text-center">
                                  <button
                                    class="btn btn-default btn-sm"
                                    data-toggle="modal"
                                    :data-target="'#editDeliveryCharge' + item._id"
                                    @click="openModalEdit(item)"
                                  >
                                    <i class="fas fa-edit" />
                                  </button>
                                </div>
                                <div
                                  :id="'editDeliveryCharge' + item._id"
                                  class="modal fade"
                                  tabindex="-1"
                                  data-backdrop="static"
                                >
                                  <EditDeliveryChargeModal
                                    :ref="'editDeliveryCharge' + item._id"
                                    :package-data="item"
                                    @onSubmit="updatePackageItem"
                                  />
                                </div>
                              </td>
                            </tr>
                          </template>
                          <tr class="border-top border-dark border-2">
                            <td colspan="2" />
                            <td>
                              <p class="mb-0 text-uppercase text-bold">
                                {{ $t('label.sub_total') }}
                              </p>
                              <p class="mb-0 text-bold text-sm">
                                <em>(1) + (2)</em>
                              </p>
                            </td>
                            <td colspan="3" class="text-right">
                              <p class="mb-0 text-bold">
                                {{ subTotal | numFormat(checkFormatCurrency({code: 'KHR'})) }} KHR
                              </p>
                              <p class="mb-0 text-bold">
                                {{ exchangeMoney('KHR', 'USD', subTotal) | numFormat(checkFormatCurrency({code: 'USD'})) }} USD
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td colspan="2" />
                            <td>
                              <p class="mb-0 text-uppercase text-bold">
                                {{ $t('label.discount') }}
                              </p>
                            </td>
                            <td />
                            <td colspan="2">
                              <div class="input-group">
                                <input
                                  v-model="discount"
                                  min="0"
                                  type="number"
                                  class="form-control"
                                  :placeholder="$t('label.discount')"
                                  aria-describedby="discount"
                                >
                                <div id="button-addon4" class="input-group-append">
                                  <button
                                    class="btn"
                                    type="button"
                                    :class="is_percentage ? 'btn-primary' : 'btn-default'"
                                    @click="is_percentage = true"
                                  >
                                    <i class="fas fa-percent" />
                                  </button>
                                  <button
                                    class="btn"
                                    type="button"
                                    :class="!is_percentage ? 'btn-primary' : 'btn-default'"
                                    @click="is_percentage = false"
                                  >
                                    {{ currency ? currency.code : 'USD' }}
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr v-if="discount > 0">
                            <td colspan="2" />
                            <td>
                              <p class="mb-0 text-uppercase text-bold">
                                {{ $t('label.discount_by') }}
                              </p>
                            </td>
                            <td />
                            <td colspan="2">
                              <input
                                v-model="discount_by"
                                type="text"
                                class="form-control"
                                :placeholder="$t('pla.discount_by')"
                              >
                            </td>
                          </tr>
                          <tr>
                            <td colspan="2" />
                            <td>
                              <p class="mb-0 text-uppercase text-lg text-bold">
                                {{ $t('label.total') }}
                              </p>
                            </td>
                            <td colspan="3" class="text-right">
                              <template v-if="discount > 0">
                                <p class="mb-0 text-lg text-bold">
                                  {{ calcTotal | numFormat(checkFormatCurrency({code: 'KHR'})) }} KHR
                                </p>
                                <p class="mb-0 text-md text-bold text-red">
                                  <del>{{ subTotal | numFormat(checkFormatCurrency({code: 'KHR'})) }} KHR</del>
                                </p>
                                <p class="mb-0 text-bold">
                                  {{ exchangeMoney('KHR', 'USD', calcTotal) | numFormat(checkFormatCurrency({code: 'USD'})) }} USD
                                </p>
                                <p class="mb-0 text-sm text-bold text-red">
                                  <del>{{ exchangeMoney('KHR', 'USD', subTotal) | numFormat(checkFormatCurrency({code: 'KHR'})) }} KHR</del>
                                </p>
                              </template>
                              <template v-else>
                                <p class="mb-0 text-lg text-bold">
                                  {{ calcTotal | numFormat(checkFormatCurrency({code: 'KHR'})) }} KHR
                                </p>
                                <p class="mb-0 text-bold">
                                  {{ exchangeMoney('KHR', 'USD', calcTotal) | numFormat(checkFormatCurrency({code: 'USD'})) }} USD
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
              </template>
              <template v-else>
                <div class="row mt-4">
                  <div class="col-12">
                    <NoResult />
                  </div>
                </div>
              </template>
            </template>
            <template v-else>
              <div class="row mt-4">
                <div class="col-12">
                  <NoResult :message="'message.no_shop_select'" />
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div v-if="packages && packages.length" class="card-footer text-right">
      <button class="btn btn-light" @click="$router.back()">
        <i class="fas fa-times-circle mr-2" />
        <strong>{{ $t('btn.cancel') }}</strong>
      </button>
      <button class="btn btn-success" @click="confirmToCreateInvoice">
        <i class="fas fa-save mr-2" />
        <strong>{{ $t('btn.save') }}</strong>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EditDeliveryChargeModal from '@/pages/admin/shop/_components/EditDeliveryChargeModal'
import NoResult from '@/components/NoResult'
import ButtonBack from '@/components/UiElements/ButtonBack'

export default {
  name: 'InvoiceCreate',
  components: { ButtonBack, NoResult, EditDeliveryChargeModal },
  computed: {
    ...mapGetters({
      dc: 'delivery_company/delivery_company',
      dcid: 'delivery_company/dcid',
      currency: 'delivery_company/currency'
    }),
    subTotal () {
      let subTotal = 0
      if (this.packages && this.packages.length) {
        this.packages.forEach((item) => {
          const deliveryCurrency = item.delivery_charge_currency
          subTotal += this.exchangeMoney(deliveryCurrency.code, 'KHR', item.delivery_charge)
          if (item.extra_charge && item.extra_charge_currency) {
            const extraCurrency = item.extra_charge_currency
            subTotal += this.exchangeMoney(extraCurrency.code, 'KHR', item.extra_charge)
          }
        })
      }
      return subTotal
    },
    calcTotal () {
      let amount = 0
      if (this.discount > 0) {
        if (this.is_percentage) {
          amount = parseFloat(this.precise(((100 - this.discount) / 100) * this.subTotal))
        } else {
          const valDiscount = this.exchangeMoney(this.currency.code, 'KHR', this.discount)
          amount = parseFloat(this.precise(this.subTotal - valDiscount))
        }
      } else {
        amount = parseFloat(this.subTotal)
      }
      return amount
    },
    messageWarning () {
      return {
        warning_date_en: `You already created the invoice on date: <span class="text-danger">${this.getDateFormat(this.filter_date[0], 'DD/MM/YYYY')} ~ ${this.getDateFormat(this.filter_date[1], 'DD/MM/YYYY')}</span>`,
        warning_date_km: `You already created the invoice on date: <span class="text-danger">${this.getDateFormat(this.filter_date[0], 'DD/MM/YYYY')} ~ ${this.getDateFormat(this.filter_date[1], 'DD/MM/YYYY')}</span>`,
        ask_en: 'Do you really want to create new invoices on this date?',
        ask_km: 'តើអ្នកពិតជាចង់បង្កើតវិក្កយបត្រថ្មីនៅកាលបរិច្ឆេទនេះមែនទេ?'
      }
    }
  },
  data () {
    return {
      filter_status: 'day',
      filter_date: [
        this.$moment()._d,
        this.$moment()._d
      ],
      shop: null,
      shops: [],
      discount: 0,
      discount_by: null,
      discount_currency: null,
      is_percentage: true,
      onloading: false,
      page: 1,
      number_per_page: 5000,
      total_pages: 0,
      packages: [],
      count_new_packages: 0,
      count_assigned_packages: 0,
      count_reject_packages: 0,
      count_delivery_packages: 0,
      count_delay_packages: 0,
      count_complete_packages: 0,
      count_cancel_packages: 0,
      count_return_packages: 0,
      has_invoice_created: false
    }
  },
  mounted () {
    this.getShops()
  },
  methods: {
    checkValidate (key) {
      return this.validate && this.validate.hasOwnProperty(key)
    },
    setDate (status) {
      this.filter_status = status
      switch (status) {
        case 'day':
          this.filter_date = [
            this.$moment()._d,
            this.$moment()._d
          ]
          this.getShopReport()
          break
        case 'week':
          this.filter_date = [
            this.$moment().startOf('week')._d,
            this.$moment()._d
          ]
          this.getShopReport()
          break
        case 'month':
          this.filter_date = [
            this.$moment().startOf('month')._d,
            this.$moment()._d
          ]
          this.getShopReport()
          break
        default:
          this.getShopReport()
          break
      }
    },
    getShops () {
      this.$axios.post(this.$base_api + '/api/backend/shop/list', {
        number_per_page: this.number_per_page,
        dcid: this.dcid
      }).then((res) => {
        this.shops = res.data.data
      }).catch((error) => {
        this.onResponseError(error)
      }).finally(() => {
        this.sonloading = false
      })
    },
    openModalEdit (item) {
      if (this.$refs['editDeliveryCharge' + item._id]) {
        this.$refs['editDeliveryCharge' + item._id][0].setDataDeliveryCharge(item)
      }
    },
    updatePackageItem (pck) {
      if (pck) {
        this.packages.forEach((item) => {
          if (item._id === pck._id) {
            this.$set(this.packages, this.packages.indexOf(item), pck)
          }
        })
      }
    },
    getShopReport () {
      this.onloading = true
      let date = []
      if (this.filter_date.length) {
        date = [
          this.$moment(this.filter_date[0]).format('YYYY-MM-DD'),
          this.$moment(this.filter_date[1]).format('YYYY-MM-DD')
        ]
      }
      const data = {
        dcid: this.dc ? this.dc._id : null,
        sid: this.shop ? this.shop._id : null,
        filter_date: date
      }
      this.$axios.post(this.$base_api + '/api/backend/invoice/list-packages-by-shop', data)
        .then((res) => {
          this.has_invoice_created = res.data.data.invoice > 0
          this.packages = res.data.data.packages
          const remainingPackages = res.data.data.remaining_packages
          if (remainingPackages) {
            this.count_new_packages = this.countPackageByStatus(remainingPackages).new_p.length
            this.count_assigned_packages = this.countPackageByStatus(remainingPackages).assigned_p.length
            this.count_reject_packages = this.countPackageByStatus(remainingPackages).reject_p.length
            this.count_delivery_packages = this.countPackageByStatus(remainingPackages).delivery_p.length
            this.count_delay_packages = this.countPackageByStatus(remainingPackages).delay_p.length
            this.count_cancel_packages = this.countPackageByStatus(remainingPackages).cancel_p.length
          }
        }).finally(() => {
          this.onloading = false
        })
    },
    countPackageByStatus (packages) {
      const result = {
        new_p: [],
        assigned_p: [],
        reject_p: [],
        delivery_p: [],
        delay_p: [],
        cancel_p: [],
        return_p: []
      }
      if (packages) {
        packages.forEach((item) => {
          switch (item.final_status) {
            case 'new_package':
              result.new_p.push(item)
              break
            case 'assigned':
              result.assigned_p.push(item)
              break
            case 'reject':
              result.reject_p.push(item)
              break
            case 'delivery':
              result.delivery_p.push(item)
              break
            case 'delay':
              result.delay_p.push(item)
              break
            case 'cancel':
              result.cancel_p.push(item)
              break
            case 'return':
              result.return_p.push(item)
              break
          }
        })
      }
      return result
    },
    confirmToCreateInvoice () {
      if (this.has_invoice_created) {
        this.$swal({
          html: `<label class="mb-3 font-s-20 d-block">${this.$t(this.messageWarning['warning_date_' + this.$i18n.locale])}</label>
                  <label class="mb-3 d-block">${this.$t(this.messageWarning['ask_' + this.$i18n.locale])}</label>`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#dc3545',
          confirmButtonText: this.$t('swal.yes_create_it'),
          cancelButtonText: this.$t('swal.no_cancel')
        }).then((result) => {
          if (result.value) {
            this.store()
          }
        }, (dismiss) => {
          if (!(dismiss === 'cancel')) {
            throw dismiss
          }
        }).catch(function (err) {
          throw err
        })
      } else {
        this.store()
      }
    },
    store () {
      let date = []
      if (this.filter_date.length) {
        date = [
          this.$moment(this.filter_date[0]).format('YYYY-MM-DD'),
          this.$moment(this.filter_date[1]).format('YYYY-MM-DD')
        ]
      }
      const data = {
        dcid: this.dcid,
        sid: this.shop ? this.shop._id : null,
        sub_total_riel: this.subTotal,
        sub_total_dollar: this.exchangeMoney('KHR', 'USD', this.subTotal),
        total_price_riel: this.calcTotal,
        total_price_dollar: this.exchangeMoney('KHR', 'USD', this.calcTotal),
        packages: this.packages,
        packages_info: {
          count_new_packages: this.count_new_packages,
          count_assigned_packages: this.count_assigned_packages,
          count_reject_packages: this.count_reject_packages,
          count_delivery_packages: this.count_delivery_packages,
          count_delay_packages: this.count_delay_packages,
          count_complete_packages: this.count_complete_packages,
          count_cancel_packages: this.count_cancel_packages,
          count_return_packages: this.count_return_packages
        },
        discount_by: this.discount_by,
        discount: this.discount,
        discount_currency: this.currency,
        is_percentage: this.is_percentage,
        delivery_date: date
      }
      this.$axios.post(this.$base_api + '/api/backend/invoice/store', data)
        .then((res) => {
          this.$toastr('success', this.$t('message.create_invoice'), this.$t('label.invoice'))
          this.$router.push({ name: 'list-invoice' })
          this.close()
        }).catch((error) => {
          this.onResponseError(error)
        })
    }
  }
}
</script>

<style scoped lang="scss">
.select_date_invoice {
  width: calc(100% - 270px);
}
.button_date_invoice {
  margin-left: auto;
}
</style>

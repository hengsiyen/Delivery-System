<template>
  <div v-if="dc && shop" class="px-3">
    <div class="row">
      <div class="col-lg-12 d-flex align-items-center justify-content-between">
        <div class="form-inline w-75">
          <div class="form-group w-50 mr-3">
            <date-picker
              v-model="filter_date"
              type="date"
              :range="true"
              :placeholder="$t('string.select_range_date')"
              :lang="datePickerLang"
              :format="'DD/MM/YYYY'"
              input-class="form-control w-100"
              :disabled-date="notAfterToday"
              :clearable="false"
              @input="setDate('other')"
            />
          </div>
          <div class="form-group mr-3">
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
        <div>
          <button class="btn btn-light" @click="close">
            <i class="fas fa-times" />
          </button>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-12">
        <template v-if="onloading">
          <div class="onloading">
            <i class="fas fa-circle-notch fa-spin" />
          </div>
        </template>
        <template v-else>
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
                Invoice
              </h4>
              <div>
                <label class="mb-0 text-normal">
                  Date :
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
          <div class="row mt-4">
            <div class="col-lg-6">
              <div class="border border-2 border-dark">
                <label class="text-uppercase py-2 px-3 bg-dark text-white w-100">
                  Bill To :
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
          <div class="mt-4 border border-2 border-dark">
            <label class="text-uppercase py-2 px-3 bg-dark text-white w-100">
              Remaining Packages :
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
                  <template v-if="packages && countPackageByStatus(packages).complete_p.length > 0">
                    <template v-for="(item, key) in countPackageByStatus(packages).complete_p">
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
          <div class="row mt-2 mb-4">
            <div class="col-12 text-right">
              <button class="btn btn-success" @click="store">
                <i class="fas fa-save mr-2" />
                <strong>{{ $t('btn.save') }}</strong>
              </button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { debounce } from 'debounce'
import EditDeliveryChargeModal from '@/pages/admin/shop/_components/EditDeliveryChargeModal'
import NoResult from '@/components/NoResult'

export default {
  name: 'ShopInvoiceForm',
  components: { NoResult, EditDeliveryChargeModal },
  props: {
    shop: {
      type: Object,
      default: () => {
        return null
      }
    },
    currency: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  computed: {
    ...mapGetters({
      dc: 'delivery_company/delivery_company',
      dcid: 'delivery_company/dcid'
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
    }
  },
  data () {
    return {
      filter_status: 'day',
      filter_date: [
        this.$moment()._d,
        this.$moment()._d
      ],
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
      count_return_packages: 0
    }
  },
  mounted () {
    this.refreshData()
    console.log(this.currency)
  },
  methods: {
    setDate (status) {
      this.filter_status = status
      switch (status) {
        case 'day':
          this.filter_date = [
            this.$moment()._d,
            this.$moment()._d
          ]
          this.refreshData()
          break
        case 'week':
          this.filter_date = [
            this.$moment().startOf('week')._d,
            this.$moment()._d
          ]
          this.refreshData()
          break
        case 'month':
          this.filter_date = [
            this.$moment().startOf('month')._d,
            this.$moment()._d
          ]
          this.refreshData()
          break
        default:
          this.refreshData()
          break
      }
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
    refreshData () {
      this.onloading = true
      setTimeout(() => {
        this.getShopReport(1)
      }, 500)
    },
    getShopReport: debounce(function (page = null) {
      if (page) {
        this.page = page
      }
      let date = []
      if (this.filter_date.length) {
        date = [
          this.$moment(this.filter_date[0]).format('YYYY-MM-DD'),
          this.$moment(this.filter_date[1]).format('YYYY-MM-DD')
        ]
      }
      const data = {
        dcid: this.dc ? this.dc._id : null,
        filter_date: date,
        number_per_page: this.number_per_page,
        page: this.page,
        filter_column: 'finished_at'
      }
      if (this.shop) {
        data.sid = this.shop._id
      }
      this.$axios.post(this.$base_api + '/api/backend/shop/shop-report', data)
        .then((res) => {
          this.packages = res.data.data
          this.gerRemainingPackages()
        }).finally(() => {
          this.onloading = false
        })
    }, 500),
    gerRemainingPackages () {
      this.$axios.post(this.$base_api + '/api/backend/shop/remaining-packages', {
        dcid: this.dcid,
        sid: this.shop._id
      }).then((res) => {
        const packages = res.data.data
        if (packages) {
          this.count_new_packages = this.countPackageByStatus(packages).new_p.length
          this.count_assigned_packages = this.countPackageByStatus(packages).assigned_p.length
          this.count_reject_packages = this.countPackageByStatus(packages).reject_p.length
          this.count_delivery_packages = this.countPackageByStatus(packages).delivery_p.length
          this.count_delay_packages = this.countPackageByStatus(packages).delay_p.length
          this.count_cancel_packages = this.countPackageByStatus(packages).cancel_p.length
        }
      })
    },
    countPackageByStatus (packages) {
      const result = {
        new_p: [],
        assigned_p: [],
        reject_p: [],
        delivery_p: [],
        delay_p: [],
        complete_p: [],
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
            case 'success':
              result.complete_p.push(item)
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
    close () {
      this.$emit('onClickClose')
    },
    store () {
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
        is_percentage: this.is_percentage
      }
      this.$axios.post(this.$base_api + '/api/backend/invoice/store', data)
        .then((res) => {
          this.$toastr('success', this.$t('message.create_invoice'), this.$t('label.invoice'))
          this.close()
        }).catch((error) => {
          this.onResponseError(error)
        })
    }
  }
}
</script>

<style scoped lang="scss">

</style>

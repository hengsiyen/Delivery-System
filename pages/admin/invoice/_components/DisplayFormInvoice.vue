<template>
  <div>
    <div class="row">
      <div class="col-lg-6">
        <template v-if="dc">
          <h4 class="text-bold text-uppercase">
            {{ dc.name_en }}
          </h4>
          <div>
            <label class="mb-0 text-normal">{{ $t('label.phone') }} : {{ dc.phone }}</label>
          </div>
          <div class="w-75">
            <label class="mb-0 text-normal">{{ dc.address_en }}</label>
          </div>
        </template>
      </div>
      <div class="col-lg-6 text-right">
        <template v-if="invoice">
          <h4 class="text-bold text-uppercase">
            {{ $t('menu.invoice') }}
          </h4>
          <div>
            {{ $t('label.date') }} : {{ $moment(invoice.created_at).format('DD/MM/YYYY') }}
          </div>
          <div><label class="mb-0 text-normal">No : <strong>{{ invoice.code }}</strong></label></div>
          <div>
            <label class="mb-0 text-normal">
              {{ $t('label.deliveryFee') }} ( {{ $t('label.date') }} ) :
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
        </template>
      </div>
    </div>
    <div v-if="shop" class="row mt-4">
      <div class="col-lg-6">
        <div class="border border-2 border-dark">
          <label class="text-uppercase py-2 px-3 bg-dark text-white w-100">
            {{ $t('label.billTo') }} :
          </label>
          <div class="pl-3 pb-2">
            <div>{{ $t('label.shop_name') }} : <label class="mb-0">{{ shop.name_en }}</label></div>
            <div>{{ $t('label.owner_name') }} : <label class="mb-0">{{ shop.owner_name }}</label></div>
            <div>{{ $t('label.phone') }} : <label class="mb-0">{{ shop.phone }}</label></div>
            <div class="w-75">
              {{ $t('label.address') }} :
              <label class="mb-0">{{ shop['address_' + $i18n.locale] }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="packageInfo" class="mt-4 border border-2 border-dark">
      <label class="text-uppercase py-2 px-3 bg-dark text-white w-100">
        {{ $t('label.remainingPackages') }} :
      </label>
      <div class="row px-3">
        <div class="col-lg-4">
          <div>
            <label>
              {{ $t('label.new_packages') }} : {{ packageInfo.count_new_packages }}
            </label>
          </div>
          <div>
            <label>
              {{ $t('label.assigned_packages') }} : {{ packageInfo.count_assigned_packages }}
            </label>
          </div>
        </div>
        <div class="col-lg-4">
          <div>
            <label>
              {{ $t('label.delivery_package') }} : {{ packageInfo.count_delivery_packages }}
            </label>
          </div>
          <div>
            <label>
              {{ $t('label.delay_package') }} : {{ packageInfo.count_delay_packages }}
            </label>
          </div>
        </div>
        <div class="col-lg-4">
          <div>
            <label>
              {{ $t('label.cancel_package') }} : {{ packageInfo.count_cancel_packages }}
            </label>
          </div>
          <div>
            <label>
              {{ $t('label.reject_packages') }} : {{ packageInfo.count_reject_packages }}
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
                      <template v-else>-</template>
                    </label>
                    <small class="d-block mb-0">
                      <strong>{{ checkStatus(item.final_status) }}</strong>
                    </small>
                    <small class="d-block mb-0">
                      {{ $moment(item.finished_at).format('DD/MM/YYYY hh:mm:ss A') }}
                    </small>
                  </td>
                  <td class="text-center">
                    <label v-if="item.delivery_charge" class="d-block mb-0">
                      {{ item.delivery_charge | numFormat(checkFormatCurrency(item.delivery_charge_currency)) }}
                      <template v-if="item.delivery_charge_currency">
                        {{ item.delivery_charge_currency.code }}
                      </template>
                    </label>
                    <label v-else class="d-block mb-0">-</label>
                  </td>
                  <td class="text-center">
                    <label v-if="item.extra_charge" class="d-block mb-0">
                      {{ item.extra_charge | numFormat(checkFormatCurrency(item.delivery_charge_currency)) }}
                      <template v-if="item.extra_charge_currency">
                        {{ item.extra_charge_currency.code }}
                      </template>
                    </label>
                    <label v-else class="d-block mb-0">-</label>
                  </td>
                </tr>
              </template>
              <template v-if="invoice">
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
                      <span v-if="invoice.sub_total_riel">
                        {{ invoice.sub_total_riel | numFormat(checkFormatCurrency({code: 'KHR'})) }}
                      </span>
                      <span v-else>{{ '0' }}</span> KHR
                    </p>
                    <p class="mb-0 text-bold">
                      <span v-if="invoice.sub_total_dollar">
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
                      {{ $t('label.total') }}
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
                <tr v-if="invoice.is_paid">
                  <td colspan="2" />
                  <td>
                    <p class="mb-0 text-uppercase text-lg text-bold">
                      {{ $t('label.amountPay') }}
                    </p>
                  </td>
                  <td colspan="3" class="text-right">
                    <p class="mb-0 text-lg text-bold">
                      {{ invoice ? invoice.amount_paid_riel : '0' | numFormat('0,0') }} KHR
                    </p>
                    <p class="mb-0 text-bold">
                      {{ invoice ? invoice.amount_paid_dollar : '0' | numFormat('0,0.00') }} USD
                    </p>
                  </td>
                </tr>
              </template>
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
    <slot />
  </div>
</template>

<script>
import NoResult from '@/components/NoResult'
export default {
  name: 'DisplayFormInvoice',
  components: { NoResult },
  props: {
    dc: {
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
    },
    invoice: {
      type: Object,
      default: () => {
        return null
      }
    },
    packages: {
      type: Array,
      default: () => {
        return []
      }
    },
    packageInfo: {
      type: Object,
      default: () => {
        return null
      }
    }
  }
}
</script>

<style scoped>

</style>

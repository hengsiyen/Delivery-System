<template>
  <div>
    <div class="row mb-3">
      <div class="col-lg-12">
        <div class="shop_package-report-title">
          <i class="fa fa-cube mr-2" />
          {{ $t('label.total_package') }} : {{ total_packages }}
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-xl-3">
        <ShopCard
          :title="$t('label.new_packages')"
          :card-value="count_new_packages"
          icon-class="bg-teal"
        />
      </div>
      <div class="col-lg-6 col-xl-3">
        <ShopCard
          :title="$t('label.assigned_packages')"
          :card-value="count_assigned_packages"
          icon="fas fa-user-check"
          icon-class="bg-info"
        />
      </div>
      <div class="col-lg-6 col-xl-3">
        <ShopCard
          :title="$t('label.reject_packages')"
          :card-value="count_reject_packages"
          icon="fas fa-user-times"
          icon-class="bg-orange"
        />
      </div>
      <div class="col-lg-6 col-xl-3">
        <ShopCard
          :title="$t('label.delivery_package')"
          :card-value="count_delivery_packages"
          icon-class="bg-primary"
          icon="fas fa-motorcycle"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-xl-3">
        <ShopCard
          :title="$t('label.delay_package')"
          :card-value="count_delay_packages"
          icon-class="bg-yellow"
          icon="fas fa-hourglass-half"
        />
      </div>
      <div class="col-lg-6 col-xl-3">
        <ShopCard
          :title="$t('label.complete_package')"
          :card-value="count_complete_packages"
          icon-class="bg-success"
          icon="fas fa-check"
        />
      </div>
      <div class="col-lg-6 col-xl-3">
        <ShopCard
          :title="$t('label.cancel_package')"
          :card-value="count_cancel_packages"
          icon-class="bg-red"
          icon="fas fa-times"
        />
      </div>
      <div class="col-lg-6 col-xl-3">
        <ShopCard
          :title="$t('label.return_package')"
          :card-value="count_return_packages"
          icon="fas fa-undo-alt fa-flip-horizontal"
        />
      </div>
    </div>
    <div class="row mt-4 mb-4">
      <div class="col-lg-12">
        <div class="form-inline justify-content-center">
          <div class="form-group w-35 mr-3">
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
          <div class="form-group mr-3">
            <select
              id="status"
              v-model="status"
              name="status"
              class="custom-select"
              @change="refreshData"
            >
              <option :value="null">
                {{ $t('label.all') }}
              </option>
              <template v-if="package_statuses && package_statuses.length">
                <option v-for="(item, key) in package_statuses" :key="key" :value="item">
                  {{ item['name_' + $i18n.locale] }}
                </option>
              </template>
            </select>
          </div>
          <div />
        </div>
      </div>
    </div>
    <div class="row mt-3 mb-3">
      <div class="col-lg-12">
        <div class="shop_package-report-title">
          <i class="fa fa-cube mr-2" />
          {{ $t('label.list_package') }}
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <template v-if="onloading">
          <div class="onloading">
            <i class="fas fa-circle-notch fa-spin" />
          </div>
        </template>
        <template v-else>
          <ShopPackageList :list-packages="packages" />
          <div v-if="packages && total_pages > 1" class="row">
            <div class="col-12">
              <paginate
                v-model="page"
                :page-count="total_pages"
                :page-range="3"
                :margin-pages="2"
                :click-handler="getShopReport"
                :prev-text="`<span class='d-none d-sm-inline-block text-bold'>${$t('btn.prev')}</span>`"
                :next-text="`<span class='d-none d-sm-inline-block text-bold'>${$t('btn.next')}</span>`"
                :container-class="'pagination justify-content-end mt-3'"
                :page-class="'page-item outline-none ml-0 mr-1 mx-sm-1 text-bold'"
                :prev-class="'page-item outline-none ml-0 mr-1 mx-sm-1'"
                :next-class="'page-item outline-none ml-0 mr-1 mx-sm-1'"
                :page-link-class="'page-link font-bold box-shadow-none rounded border-2'"
                :prev-link-class="'page-link font-bold box-shadow-none rounded border-2'"
                :next-link-class="'page-link font-bold box-shadow-none rounded border-2'"
              />
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import ShopCard from '@/pages/admin/shop/_components/ShopCard'
import ShopPackageList from '@/pages/admin/shop/_components/ShopPackageList'
import { mapGetters } from 'vuex'
import { debounce } from 'debounce'
export default {
  name: 'ShopPackageDetail',
  components: { ShopPackageList, ShopCard },
  props: {
    shop: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  computed: {
    ...mapGetters({
      dcid: 'delivery_company/dcid',
      number_per_page: 'delivery_company/number_per_page'
    })
  },
  data () {
    return {
      filter_status: 'month',
      filter_date: [
        this.$moment().startOf('month')._d,
        this.$moment()._d
      ],
      onloading: false,
      status: null,
      package_statuses: [],
      page: 1,
      total_pages: 0,
      packages: [],
      total_packages: 0,
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
    this.getFetchData()
    this.refreshData()
  },
  methods: {
    getFetchData () {
      this.$axios.get(this.$base_api + '/api/backend/fetch-data/data-for-tracking')
        .then((res) => {
          const r = res.data.data
          this.package_statuses = r.package_statuses
          this.drivers = r.drivers
          this.payment_statuses = r.payment_statuses
          this.partner_companies = r.partner_companies
        }).catch((error) => {
          this.onResponseError(error)
        })
    },
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
        dcid: this.dcid,
        filter_date: date,
        number_per_page: this.number_per_page,
        page: this.page,
        status: this.status ? this.status.value : null
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
        this.total_packages = res.data.data.length
        if (packages) {
          this.count_new_packages = this.countPackageByStatus(packages).new_p.length
          this.count_assigned_packages = this.countPackageByStatus(packages).assigned_p.length
          this.count_reject_packages = this.countPackageByStatus(packages).reject_p.length
          this.count_delivery_packages = this.countPackageByStatus(packages).delivery_p.length
          this.count_delay_packages = this.countPackageByStatus(packages).delay_p.length
          this.count_complete_packages = this.countPackageByStatus(packages).complete_p.length
          this.count_cancel_packages = this.countPackageByStatus(packages).cancel_p.length
          this.count_return_packages = this.countPackageByStatus(packages).return_p.length
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
    }
  }
}
</script>

<style scoped lang="scss">

.shop_package-report-title {
  font-size: 20px;
  font-weight: 700;
}
</style>

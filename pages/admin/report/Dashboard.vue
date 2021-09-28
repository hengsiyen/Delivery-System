<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="report-dash-block-filter">
          <div class="block-view-by">
            <div class="form-group">
              <div>
                <label>{{ $t('label.viewBy') }}</label>
              </div>
              <div class="btn-group" role="group">
                <button
                  type="button"
                  class="btn"
                  :class="activeBtnStatus === keyword_today ? 'btn-primary' : 'btn-default'"
                  @click="clickToday"
                >
                  <i class="far fa-calendar-alt mr-2" />
                  <strong>{{ $t('report.label.today') }}</strong>
                </button>
                <button
                  type="button"
                  class="btn"
                  :class="activeBtnStatus === keyword_this_week ? 'btn-primary' : 'btn-default'"
                  @click="clickThisWeek"
                >
                  <i class="far fa-calendar-alt mr-2" />
                  <strong>{{ $t('report.label.thisWeek') }}</strong>
                </button>
                <button
                  type="button"
                  class="btn"
                  :class="activeBtnStatus === keyword_this_month ? 'btn-primary' : 'btn-default'"
                  @click="clickThisMonth"
                >
                  <i class="far fa-calendar-alt mr-2" />
                  <strong>{{ $t('report.label.thisMonth') }}</strong>
                </button>
              </div>
            </div>
          </div>
          <div class="block-date-range">
            <div class="form-group">
              <div><label>{{ $t('label.date') }}</label></div>
              <date-picker
                v-model="date_range"
                :not-after="new Date()"
                :placeholder="$t('label.chooseDateRange')"
                format="YYYY-MM-DD"
                lang="en"
                range
                class="date-picker-lg"
                style="width:100%;"
                type="date"
                :disabled-date="notAfterToday"
                @change="changeDateDuration('dateRange')"
                @clear="clickToday"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-lg-4 col-xl-3">
        <CardReportDashboard
          :title="$t('label.revenue')"
          :has-format="true"
          :has-currency="true"
          :main-value="revenue"
          :color-label-compare="status_revenue"
          :class-icon="chartStatus(status_revenue)"
          :label-compare="status_revenue ? 'label.' + status_revenue : null"
          :calc-comp-value-as-percent="calcCompValueAsPercent(revenue, last_revenue)"
          :last-data="last_revenue"
        />
      </div>
      <div class="col-md-6 col-lg-4 col-xl-3">
        <CardReportDashboard
          :title="$t('menu.shop')"
          :has-format="true"
          :main-value="shop"
          :color-label-compare="status_shop"
          :class-icon="chartStatus(status_shop)"
          :label-compare="status_revenue ? 'label.' + status_shop : null"
          :calc-comp-value-as-percent="calcCompValueAsPercent(shop, last_shop)"
          :last-data="last_shop"
        />
      </div>
      <div class="col-md-6 col-lg-4 col-xl-3">
        <CardReportDashboard
          :title="$t('menu.partner_company')"
          :has-format="true"
          :main-value="partner_company"
          :color-label-compare="status_partner_company"
          :class-icon="chartStatus(status_partner_company)"
          :label-compare="status_partner_company ? 'label.' + status_partner_company : null"
          :calc-comp-value-as-percent="calcCompValueAsPercent(partner_company, last_partner_company)"
          :last-data="last_partner_company"
        />
      </div>
      <div class="col-md-6 col-lg-4 col-xl-3">
        <CardReportDashboard
          :title="$t('label.packageReceived')"
          :has-format="true"
          :main-value="package_total"
          :color-label-compare="status_package"
          :class-icon="chartStatus(status_package)"
          :label-compare="status_package ? 'label.' + status_package : null"
          :calc-comp-value-as-percent="calcCompValueAsPercent(package_total, last_package_total)"
          :last-data="last_package_total"
        />
      </div>
      <div class="col-md-6 col-lg-4 col-xl-3">
        <CardReportDashboard
          :title="$t('label.packageSuccess')"
          :has-format="true"
          :main-value="package_success_total"
          :color-label-compare="status_package_success"
          :class-icon="chartStatus(status_package_success)"
          :label-compare="status_package_success ? 'label.' + status_package_success : null"
          :calc-comp-value-as-percent="calcCompValueAsPercent(package_success_total, last_package_success_total)"
          :last-data="last_package_success_total"
        />
      </div>
      <div class="col-md-6 col-lg-4 col-xl-3">
        <CardReportDashboard
          :title="$t('label.packageCancel')"
          :has-format="true"
          :main-value="package_cancel_total"
          :color-label-compare="status_package_cancel"
          :class-icon="chartStatus(status_package_cancel)"
          :label-compare="status_package_cancel ? 'label.' + status_package_cancel : null"
          :calc-comp-value-as-percent="calcCompValueAsPercent(package_cancel_total, last_package_cancel_total)"
          :last-data="last_package_cancel_total"
        />
      </div>
      <div class="col-md-6 col-lg-4 col-xl-3">
        <CardReportDashboard
          :title="$t('label.packageDelivery')"
          :has-format="true"
          :main-value="package_delivery_total"
          :color-label-compare="status_package_delivery"
          :class-icon="chartStatus(status_package_delivery)"
          :label-compare="status_package_delivery ? 'label.' + status_package_delivery : null"
          :calc-comp-value-as-percent="calcCompValueAsPercent(package_delivery_total, last_package_delivery_total)"
          :last-data="last_package_delivery_total"
        />
      </div>
      <div class="col-md-6 col-lg-4 col-xl-3">
        <CardReportDashboard
          :title="$t('label.packageDelay')"
          :has-format="true"
          :main-value="package_delay_total"
          :color-label-compare="status_package_delay"
          :class-icon="chartStatus(status_package_delay)"
          :label-compare="status_package_delay ? 'label.' + status_package_delay : null"
          :calc-comp-value-as-percent="calcCompValueAsPercent(package_delay_total, last_package_delay_total)"
          :last-data="last_package_delay_total"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">
              {{ $t('label.revenue') }} <span v-if="dc && dc.currency">( {{ dc.currency.code }} )</span>
            </h3>
          </div>
          <div class="card-body">
            <XChartLine
              :chart-data="revenue_chart"
              :options="chartLineOption"
            />
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              {{ $t('menu.package') }}
            </div>
          </div>
          <div class="card-body">
            <XChartLine
              :chart-data="package_chart"
              :options="chartLineOption"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              {{ $t('menu.shop') }}
            </div>
          </div>
          <div class="card-body">
            <XChartLine
              :chart-data="shop_chart"
              :options="chartLineOption"
            />
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              {{ $t('menu.partner_company') }}
            </div>
          </div>
          <div class="card-body">
            <XChartLine
              :chart-data="partner_company_chart"
              :options="chartLineOption"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              {{ $t('label.packageByType') }}
            </div>
          </div>
          <div class="card-body">
            <template v-if="package_by_type_chart">
              <XChartBar
                :chart-data="package_by_type_chart"
                :options="chartLineOption"
              />
            </template>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              {{ $t('label.topShop') }}
            </div>
          </div>
          <div class="card-body">
            <template v-if="package_by_shop_chart">
              <XChartBar
                :chart-data="package_by_shop_chart"
                :options="chartLineOption"
              />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardReportDashboard from '@/pages/admin/report/_components/CardReportDashboard'
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  components: { CardReportDashboard },
  head () {
    return {
      title: this.$t('title.reportDashboard'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  },
  data () {
    return {
      chart_green: {
        bg: '#00a65a63',
        border: '#00a65a'
      },
      chart_blue: {
        bg: '#97c9ff94',
        border: '#007bff'
      },
      chartLineOption: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        }
      },
      keyword_today: 'today',
      keyword_this_week: 'thisWeek',
      keyword_this_month: 'thisMonth',
      activeBtnStatus: 'thisWeek',
      compare_result: 'null',
      today: new Date(),
      date_range: [],
      timeout: 500,

      revenue: 0,
      status_revenue: 'no_change',
      last_revenue: 0,

      shop: 0,
      status_shop: 'no_change',
      last_shop: 0,

      partner_company: 0,
      status_partner_company: 'no_change',
      last_partner_company: 0,

      package_total: 0,
      status_package: 'no_change',
      last_package_total: 0,

      package_success_total: 0,
      status_package_success: 'no_change',
      last_package_success_total: 0,

      package_cancel_total: 0,
      status_package_cancel: 'no_change',
      last_package_cancel_total: 0,

      package_delivery_total: 0,
      status_package_delivery: 'no_change',
      last_package_delivery_total: 0,

      package_delay_total: 0,
      status_package_delay: 'no_change',
      last_package_delay_total: 0,

      revenue_chart: {},
      shop_chart: {},
      partner_company_chart: {},
      package_chart: {},
      package_by_type_chart: null,
      package_by_shop_chart: null
    }
  },
  computed: {
    ...mapGetters({
      dcid: 'delivery_company/dcid',
      dc: 'delivery_company/delivery_company'
    })
  },
  mounted () {
    this.clickThisMonth()
    this.getChartMonths()
  },
  methods: {
    clickToday () {
      this.$isLoading(true)
      if (this.activeBtnStatus === this.keyword_today) { return }
      this.activeBtnStatus = this.keyword_today
      this.date_range = [this.today, this.today]
      this.compare_result = 'day'
      setTimeout(() => {
        this.getReportDashboard()
        this.$isLoading(false)
      }, this.timeout)
    },
    clickThisWeek () {
      this.$isLoading(true)
      if (this.activeBtnStatus === this.keyword_this_week) { return }
      this.activeBtnStatus = this.keyword_this_week
      this.date_range = [this.getMonday(this.today), this.today]
      this.compare_result = 'week'
      setTimeout(() => {
        this.getReportDashboard()
        this.$isLoading(false)
      }, this.timeout)
    },
    clickThisMonth () {
      this.$isLoading(true)
      if (this.activeBtnStatus === this.keyword_this_month) { return }
      this.activeBtnStatus = this.keyword_this_month
      this.date_range = [new Date(this.today.getFullYear(), this.today.getMonth(), 1), this.today]
      this.compare_result = 'month'
      setTimeout(() => {
        this.getReportDashboard()
        this.$isLoading(false)
      }, this.timeout)
    },
    getMonday (d) {
      d = new Date(d)
      const day = d.getDay()
      const diff = d.getDate() - day + (day === 0 ? -6 : 1) // adjust when day is sunday
      return new Date(d.setDate(diff))
    },
    changeDateDuration () {
      this.$isLoading(true)
      this.activeBtnStatus = 'chooseDateRange'
      this.compare_result = null
      setTimeout(() => {
        this.getReportDashboard()
        this.$isLoading(false)
      }, this.timeout)
    },
    chartStatus (status) {
      switch (status) {
        case 'up':
          return 'fa-caret-up text-green'
        case 'down':
          return 'fa-caret-down text-red'
        default:
          return 'fa-sort text-muted'
      }
    },
    calcCompValueAsPercent ($currentVal, $lastVal) {
      $currentVal = parseFloat($currentVal)
      $lastVal = parseFloat($lastVal)
      let $result = 0
      if ($currentVal > $lastVal) {
        $result = $currentVal - $lastVal
        return ($result / $currentVal) * 100
      } else if ($currentVal < $lastVal) {
        $result = $lastVal - $currentVal
        $result = ($result / $lastVal) * 100
        return '-' + $result
      }
      return null
    },
    getReportDashboard () {
      let filterDate = []
      if (this.date_range && this.date_range.length) {
        filterDate = [
          this.$moment(this.date_range[0]).format('YYYY-MM-DD'),
          this.$moment(this.date_range[1]).format('YYYY-MM-DD')
        ]
      }
      this.$axios.post(this.$base_api + '/api/backend/report/report-dashboard', {
        dcid: this.dcid,
        filter_date: filterDate,
        compare_result: this.compare_result
      }).then((res) => {
        const result = res.data.data
        this.revenue = result.total_income
        this.shop = result.total_shop
        this.partner_company = result.total_partner_company
        this.package_total = result.total_package
        this.package_success_total = result.total_package_success
        this.package_cancel_total = result.total_package_cancel
        this.package_delivery_total = result.total_package_delivery
        this.package_delay_total = result.total_package_delay

        this.last_revenue = result.last_total_income
        this.last_shop = result.last_total_shop
        this.last_partner_company = result.last_total_partner_company
        this.last_package_total = result.last_total_package
        this.last_package_success_total = result.last_total_package_success
        this.last_package_cancel_total = result.last_total_package_cancel
        this.last_package_delivery_total = result.last_total_package_delivery
        this.last_package_delay_total = result.last_total_package_delay

        this.status_revenue = result.status_income
        this.status_shop = result.status_shop
        this.status_partner_company = result.status_partner_company
        this.status_package = result.status_package
        this.status_package_success = result.status_package_success
        this.status_package_cancel = result.status_package_cancel
        this.status_package_delivery = result.status_package_delivery
        this.status_package_delay = result.status_package_delay
      }).catch((error) => {
        this.onResponseError(error)
      })
    },

    getChartMonths () {
      this.$axios.post(this.$base_api + '/api/backend/report/chart-months', {
        dcid: this.dcid
      }).then((res) => {
        const result = res.data.data
        this.revenue_chart = {
          labels: result.label,
          datasets: [
            {
              barPercentage: 0.5,
              barThickness: 50,
              label: 'Revenue',
              backgroundColor: this.chart_green.bg,
              borderColor: this.chart_green.border,
              data: result.chart_revenue_last_12.data
            }
          ]
        }
        this.shop_chart = {
          labels: result.label,
          datasets: [
            {
              barPercentage: 0.5,
              barThickness: 50,
              label: this.$t('menu.shop'),
              backgroundColor: this.chart_blue.bg,
              borderColor: this.chart_blue.border,
              data: result.chart_shop_last_12.data
            }
          ]
        }
        this.partner_company_chart = {
          labels: result.label,
          datasets: [
            {
              barPercentage: 0.5,
              barThickness: 50,
              label: this.$t('menu.partner_company'),
              backgroundColor: this.chart_blue.bg,
              borderColor: this.chart_blue.border,
              data: result.chart_partner_company_last_12.data
            }
          ]
        }
        this.package_chart = {
          labels: result.label,
          datasets: [
            {
              barPercentage: 0.5,
              barThickness: 50,
              label: this.$t('menu.package'),
              backgroundColor: this.chart_green.bg,
              borderColor: this.chart_green.border,
              data: result.chart_package_last_12.data
            }
          ]
        }
        const packageTypeBg = []
        result.package_by_type.data.forEach((item) => {
          packageTypeBg.push(this.chart_green.bg)
        })
        this.package_by_type_chart = {
          labels: result.package_by_type['label_' + this.$i18n.locale],
          datasets: [
            {
              barPercentage: 0.5,
              barThickness: 50,
              label: this.$t('label.packageByType'),
              backgroundColor: packageTypeBg,
              borderColor: this.chart_green.border,
              borderWidth: 2,
              data: result.package_by_type.data
            }
          ]
        }
        const packageShopBg = []
        result.package_by_shop.data.forEach((item) => {
          packageShopBg.push(this.chart_green.bg)
        })
        this.package_by_shop_chart = {
          labels: result.package_by_shop.label_en,
          datasets: [
            {
              barPercentage: 0.5,
              barThickness: 50,
              label: this.$t('label.topShop'),
              backgroundColor: packageShopBg,
              borderColor: this.chart_green.border,
              borderWidth: 2,
              data: result.package_by_shop.data
            }
          ]
        }
      }).catch((error) => {
        this.onResponseError(error)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.report-dash-block-filter {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
}

.report-dash-block-filter .block-view-by,
.report-dash-block-filter .block-date-range {
  margin-right: 15px;
}

.block-date-range,
.block-outlets {
  width: 20%;
}

.card-review-report,
.report-dash-block-content {
  padding: 15px;
}

.report-dash-block-content .row .col-md-6 {
  margin-bottom: 15px;
}

.text-up {
  color: #00a65a !important;
}

.text-down {
  color: #dd4b39 !important;
}

.text-no_change {
  color: #777;
}

@media screen and (min-width: 768px) and (max-width: 1200px) {
  .block-date-range,
  .block-outlets {
    width: 24.5%;
  }
}

@media screen and (max-width: 768px) {
  .report-dash-block-filter {
    display: block;
  }

  .block-date-range,
  .block-view-by {
    margin-right: 0;
  }

  .block-view-by,
  .block-date-range,
  .block-outlets {
    width: 100%;
  }
}
</style>

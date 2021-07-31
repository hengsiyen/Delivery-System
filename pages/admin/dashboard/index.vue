<template>
  <div style="padding-top: 1rem">
    <template v-if="can([$Permissions.backend.dashboard.show])">
      <div class="row">
        <div class="col-md-12 col-xl-12">
          <div class="report-title">
            <i class="fa fa-cube mr-2" />
            {{ $t('label.total_package') }}
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-6 col-xl-3">
          <ShopCard
            :title="$t('label.total_package')"
            :card-value="total_package"
            icon-class="bg-teal"
          />
        </div>
        <div class="col-md-6 col-xl-3">
          <ShopCard
            :title="$t('label.delivery_package')"
            :card-value="total_delivery_package"
            icon-class="bg-primary"
            icon="fas fa-motorcycle"
          />
        </div>
        <div class="col-md-6 col-xl-3">
          <ShopCard
            :title="$t('label.complete_package')"
            :card-value="total_complete_package"
            icon-class="bg-success"
            icon="fas fa-check"
          />
        </div>
        <div class="col-md-6 col-xl-3">
          <ShopCard
            :title="$t('label.cancel_package')"
            :card-value="total_cancel_package"
            icon-class="bg-red"
            icon="fas fa-times"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 col-xl-12">
          <div class="report-title">
            <i class="fa fa-motorcycle mr-2" />
            {{ $t('menu.driver') }}
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-xl-3">
          <ShopCard
            :title="$t('label.total_driver')"
            :card-value="total_driver"
            icon-class="bg-primary"
            icon="fas fa-user-alt"
          />
        </div>
        <div class="col-md-6 col-xl-3">
          <ShopCard
            :title="$t('label.available_driver')"
            :card-value="free_driver"
            icon-class="bg-green"
            icon="fas fa-truck"
          />
        </div>
        <div class="col-md-6 col-xl-3">
          <ShopCard
            :title="$t('label.delivering')"
            :card-value="delivering_driver"
            icon-class="bg-red"
            icon="fas fa-shipping-fast"
          />
        </div>
        <div class="col-md-6 col-xl-3">
          <ShopCard
            :title="$t('label.total_shops')"
            :card-value="total_shop"
            icon-class="bg-orange"
            icon="fas fa-store"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-7">
              <XBox title="Monthly Report">
                <x-chart-line />
              </XBox>
            </div>
            <div class="col-md-5">
              <XBox title="Users and Collaborations">
                <x-chart-doughnut />
              </XBox>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <XBox title="Analytic">
            <x-chart-bar />
          </XBox>
        </div>
      </div>
    </template>
  </div>
</template>

<script>

import XBox from '@/components/Widgets/XBox'
import { mapGetters } from 'vuex'
import ShopCard from '@/pages/admin/shop/_components/ShopCard'

export default {
  name: 'Dashboard',
  components: { ShopCard, XBox },
  head () {
    return {
      title: this.$t('menu.dashboard'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  },
  data () {
    return {
      total_package: 0,
      total_delivery_package: 0,
      total_complete_package: 0,
      total_cancel_package: 0,
      total_driver: 0,
      free_driver: 0,
      delivering_driver: 0,
      total_shop: 0,
      filter_status: 'month',
      filter_date: [
        this.$moment().startOf('month')._d,
        this.$moment()._d
      ]
    }
  },
  computed: {
    ...mapGetters({
      dcid: 'delivery_company/dcid'
    })
  },
  mounted () {
    this.getSummaryDashboard()
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
          this.getSummaryDashboard()
          break
        case 'week':
          this.filter_date = [
            this.$moment().startOf('week')._d,
            this.$moment()._d
          ]
          this.getSummaryDashboard()
          break
        case 'month':
          this.filter_date = [
            this.$moment().startOf('month')._d,
            this.$moment()._d
          ]
          this.getSummaryDashboard()
          break
        default:
          this.getSummaryDashboard()
          break
      }
    },
    getSummaryDashboard () {
      const data = {
        dcid: this.dcid,
        filter_date: this.filter_date
      }
      this.$axios.post(this.$base_api + '/api/backend/report/summary-dashboard', data)
        .then((res) => {
          const r = res.data.data
          this.total_package = r.total_package
          this.total_delivery_package = r.total_delivery_package
          this.total_complete_package = r.total_complete_package
          this.total_cancel_package = r.total_cancel_package
          this.total_driver = r.total_driver
          this.free_driver = r.free_driver
          this.delivering_driver = r.delivering_driver
          this.total_shop = r.total_shop
        }).catch((error) => {
          this.onResponseError(error)
        })
    }
  }
}
</script>

<style scoped>
.report-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 1rem;
  margin-left: 7.5px;
}
</style>

<template>
  <div class="wrapper">
    <HeaderMobile hide-button-home hide-button-logout show-navbar-text :navbar-text="$t('label.deliveryHistoryForToday')" />
    <div class="mobile-content-h">
      <div v-if="activity" class="col-12 pt-3">
        <div class="form-group">
          <label>{{ $t('label.totalRecords') }} : {{ activity.packages.length }}</label>
        </div>
        <div v-if="activity.packages" class="row">
          <div class="list_items col-12">
            <template v-for="(item, key) in activity.packages">
              <div :key="key" class="list_item list_item-hover">
                <div class="d-flex px-0 w-100" @click="showPackage(item)">
                  <div class="col-3">
                    <template v-if="item.media">
                      <img :src="getSrc(item.media.src)" alt="" class="img-thumbnail">
                    </template>
                    <template v-else>
                      <img :src="package_img" alt="" class="img-thumbnail">
                    </template>
                  </div>
                  <div class="col-9">
                    <div class="list_item-block m-0 font-s-14">
                      <div class="list_item-label text-truncate">
                        <strong>{{ item.customer_phone }} - {{ item.customer_name }}</strong>
                      </div>
                    </div>
                    <div class="list_item-block m-0 font-s-13">
                      <div class="list_item-block-icon">
                        <i class="fas fa-qrcode mr-1" />
                      </div>
                      <div class="list_item-label text-truncate">
                        {{ item.code }}
                      </div>
                    </div>
                    <div class="list_item-block m-0 font-s-13">
                      <div class="list_item-block-icon">
                        <i class="fas fa-map-marker-alt mr-1" />
                      </div>
                      <div class="list_item-label">
                        {{ item.customer_address }}
                      </div>
                    </div>
                    <div class="list_item-block m-0 font-s-13">
                      <div class="list_item-block-icon">
                        <i class="fas fa-flag mr-1" />
                      </div>
                      <div class="list_item-label text-truncate">
                        <span class="badge font-s-10 w-100" :class="colorStatus(item.final_status)">
                          {{ checkStatus(item.final_status) }}
                        </span>
                      </div>
                    </div>
                    <div v-if="item.assigned_at" class="list_item-block m-0 font-s-13">
                      <div class="list_item-block-icon">
                        <i class="fas fa-user-check mr-1" />
                      </div>
                      <div class="list_item-label text-truncate">
                        {{ getDateFormat(item.assigned_at) }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 mt-2">
                  <template v-if="item.final_status === 'cancel'">
                    <button class="btn btn-primary btn-block btn-sm" data-toggle="modal" data-target="#completePackageModal" @click="selectPackage(item)">
                      <i class="fas fa-map-marker-alt mr-2" />
                      {{ $t('btn.changeToAccept') }}
                    </button>
                  </template>
                  <template v-if="item.final_status === 'success'">
                    <button class="btn btn-danger btn-block btn-sm" data-toggle="modal" data-target="#cancelModal" @click="selectPackage(item)">
                      <i class="far fa-times-circle mr-2" />
                      {{ $t('btn.changeToCancel') }}
                    </button>
                  </template>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div v-else>
          <div class="list_item align-items-center w-100 justify-content-center">
            {{ $t('label.no_result_found') }}
          </div>
        </div>
      </div>
    </div>
    <FooterMobile />
    <div id="completePackageModal" class="modal fade" tabindex="-1" data-backdrop="static">
      <CompletePackageModel :payment-types="payment_types" :package-id="select_package ? select_package._id : null" @onSubmit="getDriverActivity" />
    </div>
    <div id="cancelModal" class="modal fade" tabindex="-1" data-backdrop="static">
      <CancelPackageModal ref="cancelPackageModal" :package-id="select_package ? select_package._id : null" @onSubmit="getDriverActivity" />
    </div>
  </div>
</template>

<script>
import FooterMobile from '@/pages/mobile/_components/Footer'
import HeaderMobile from '@/components/Layouts/HeaderMobile'
import { mapGetters } from 'vuex'
import CancelPackageModal from '@/pages/admin/package/_components/CancelPackageModal'
import CompletePackageModel from '@/pages/admin/package/_components/CompletePackageModel'
export default {
  name: 'DeliveryHistoryShow',
  head () {
    return {
      title: this.$t('label.deliveryHistoryForToday'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  },
  components: { CompletePackageModel, CancelPackageModal, HeaderMobile, FooterMobile },
  data () {
    return {
      activity: null,
      select_package: null
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser',
      payment_types: 'delivery_company/payment_types'
    })
  },
  mounted () {
    this.getDriverActivity()
  },
  methods: {
    showPackage (item) {
      this.$router.push({ name: 'mobile-package-show', params: { id: item._id } })
    },
    selectPackage (item) {
      this.select_package = item
    },
    getDriverActivity () {
      let userId = null
      if (this.user) {
        userId = this.user._id
      }
      this.$axios.post(this.$base_api + '/api/backend/delivery/delivery-history', {
        id: userId,
        date: this.$moment().format('YYYY-MM-DD')
      }).then((res) => {
        this.activity = res.data.data
      }).catch((error) => {
        this.onResponseError(error)
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "assets/scss/pages/mobile";
@import "assets/scss/components/list_item";
.activity-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
}
</style>

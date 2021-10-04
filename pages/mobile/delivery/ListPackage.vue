<template>
  <div class="wrapper">
    <HeaderMobile hide-button-home hide-button-logout show-navbar-text :navbar-text="$t('menu.delivery')" />
    <div class="mobile-content-h">
      <div class="col-lg-12" style="padding-top: 1rem">
        <div class="form-group row mb-3">
          <div class="input-group col-12">
            <input
              v-model="search_query"
              :placeholder="$t('label.search')"
              class="form-control"
              type="text"
              @keyup="search"
            >
            <div class="input-group-append">
              <span class="input-group-text bg-white border-left-0">
                <i class="fas fa-search" />
              </span>
            </div>
          </div>
        </div>
        <div class="w-100 d-flex align-items-center filter-items flex-wrap">
          <div v-if="search_query" class="mb-3 rounded py-1 px-2 text-white bg-white shadow-item">
            {{ $t('label.search') }}: {{ search_query }}
            <button class="btn btn-default btn-xs" @click="removeSearch">
              <i class="fa fa-times" />
            </button>
          </div>
        </div>
        <template v-if="onloading">
          <div class="onloading pt-5">
            <i class="fas fa-circle-notch fa-spin" />
          </div>
        </template>
        <template v-else>
          <div class="row">
            <div class="list_items col-12">
              <template v-for="(item, key) in list_packages">
                <div :key="key" class="list_item list_item-hover d-flex px-0">
                  <div class="d-flex px-0 w-100" @click="showPackage(item)">
                    <div class="col-3 col-md-2 col-lg-2 col-xl-1">
                      <template v-if="item.media">
                        <img :src="getSrc(item.media.src)" alt="" class="img-thumbnail">
                      </template>
                      <template v-else>
                        <img :src="package_img" alt="" class="img-thumbnail">
                      </template>
                    </div>
                    <div class="col-9 col-md-4 col-lg-4 col-xl-5">
                      <div class="list_item-block m-0 font-s-14">
                        <div class="list_item-label text-truncate">
                          <strong>{{ item.customer_phone }} - {{ item.customer_name }}</strong>
                        </div>
                      </div>
                      <div class="list_item-block m-0 font-s-13">
                        <div class="list_item-block-icon">
                          <i class="fas fa-qrcode mr-2" />
                        </div>
                        <div class="list_item-label text-truncate">
                          {{ item.code }}
                        </div>
                      </div>
                      <div class="list_item-block m-0 font-s-13">
                        <div class="list_item-block-icon">
                          <i class="fas fa-map-marker-alt mr-2" />
                        </div>
                        <div class="list_item-label">
                          <strong>{{ item.customer_address }}</strong>
                        </div>
                      </div>
                      <div v-if="item.note" class="list_item-block m-0 font-s-13">
                        <div class="list_item-block-icon">
                          <i class="fas fa-sticky-note mr-2" />
                        </div>
                        <div class="list_item-label">
                          {{ item.note }}
                        </div>
                      </div>
                      <div v-if="item.assigned_at" class="list_item-block m-0 font-s-13">
                        <div class="list_item-block-icon">
                          <i class="fas fa-user-check mr-2" />
                        </div>
                        <div class="list_item-label text-truncate">
                          {{ getDateFormat(item.assigned_at) }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="pr-2">
                    <a
                      id="navbarDropdown"
                      class="btn btn-light dropdown-toggle no-icon font-s-11"
                      href="#"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i class="fas fa-ellipsis-v" />
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                      <template v-if="isPackageOnDelivery(item)">
                        <a class="dropdown-item text-success py-2" data-toggle="modal" data-target="#completePackageModal" @click="selectPackage(item)">
                          <i class="fas fa-map-marker-alt mr-2" />
                          {{ $t('btn.complete') }}
                        </a>
                      </template>
                      <a class="dropdown-item py-2" data-toggle="modal" data-target="#delayModal" @click="selectPackage(item)">
                        <i class="fas fa-hourglass-half mr-2" />
                        {{ $t('btn.delay') }}
                      </a>
                      <template v-if="isPackageOnDelivery(item)">
                        <a class="dropdown-item text-danger py-2" data-toggle="modal" data-target="#cancelModal" @click="selectPackage(item)">
                          <i class="far fa-times-circle mr-2" />
                          {{ $t('btn.cancel') }}
                        </a>
                      </template>
                    </div>
                  </div>
                </div>
              </template>
              <infinite-loading ref="infinite" spinner="spiral" @infinite="getPackageList">
                <div slot="spinner">
                  <i class="fas fa-circle-notch fa-spin" />
                </div>
                <div slot="no-more" />
                <div slot="no-results">
                  <div class="list_item align-items-center w-100 justify-content-center">
                    {{ $t('label.no_result_found') }}
                  </div>
                </div>
              </infinite-loading>
            </div>
          </div>
        </template>
      </div>
    </div>
    <FooterMobile />
    <div id="completePackageModal" class="modal fade" tabindex="-1" data-backdrop="static">
      <CompletePackageModel :payment-types="payment_types" :package-id="select_package ? select_package._id : null" @onSubmit="search" />
    </div>
    <div id="delayModal" class="modal fade" tabindex="-1" data-backdrop="static">
      <DelayPackageModal ref="delayPackageModal" :package-data="select_package" @onSubmit="search" />
    </div>
    <div id="cancelModal" class="modal fade" tabindex="-1" data-backdrop="static">
      <CancelPackageModal ref="cancelPackageModal" :package-id="select_package ? select_package._id : null" @onSubmit="search" />
    </div>
  </div>
</template>

<script>
import HeaderMobile from '@/components/Layouts/HeaderMobile'
import { mapGetters } from 'vuex'
import { debounce } from 'debounce'
import FooterMobile from '@/pages/mobile/_components/Footer'
import CompletePackageModel from '@/pages/admin/package/_components/CompletePackageModel'
import DelayPackageModal from '@/pages/admin/package/_components/DelayPackageModal'
import CancelPackageModal from '@/pages/admin/package/_components/CancelPackageModal'
export default {
  name: 'DeliveryListPackage',
  head () {
    return {
      title: this.$t('menu.delivery'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  },
  components: { CancelPackageModal, DelayPackageModal, CompletePackageModel, FooterMobile, HeaderMobile },
  computed: {
    ...mapGetters({
      dcid: 'delivery_company/dcid',
      user: 'user/getUser',
      payment_types: 'delivery_company/payment_types'
    })
  },
  data () {
    return {
      onloading: true,
      list_packages: [],
      page: 1,
      total_pages: 0,
      date_format: 'DD/MM/YYYY',
      search_query: null,
      is_enable: null,
      created_at: null,
      select_package: null
    }
  },
  mounted () {
    this.search()
  },
  methods: {
    showPackage (item) {
      this.$router.push({ name: 'mobile-package-show', params: { id: item._id } })
    },
    isPackageOnDelivery (item) {
      return item && item.final_status === 'delivery'
    },
    selectPackage (item) {
      this.select_package = item
    },
    removeSearch () {
      this.search_query = null
      this.search()
    },
    resetStateChanger () {
      if (this.$refs.infinite && this.$refs.infinite.stateChanger) {
        this.$refs.infinite.stateChanger.reset()
      }
    },
    search: debounce(function () {
      if (this.$refs.infinite) {
        this.page = 1
        this.list_packages = []
        this.resetStateChanger()
      } else {
        this.getPackageList()
      }
    }, 500),
    getPackageList ($state) {
      let userId = null
      if (this.user) {
        userId = this.user._id
      }
      this.$axios.post(this.$base_api + '/api/backend/package/list-package-by-driver', {
        page: this.page,
        number_per_page: this.number_per_page,
        dcid: this.dcid,
        driver_id: userId,
        status: ['delivery'],
        search_query: this.search_query
      })
        .then(({ data }) => {
          if (data.data && data.data.length) {
            this.page++
            this.list_packages.push(...data.data)
            $state.loaded()
          } else {
            $state.complete()
          }
        }).catch((error) => {
          this.onResponseError(error)
        }).finally(() => {
          this.onloading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
@import "assets/scss/pages/mobile";
@import "assets/scss/components/list_item";
.mobile-content-h {
  height: calc(100vh - 117px);
}
.list_item-hover:hover {
  background-color: rgb(245, 245, 245);
}
</style>

<template>
  <div>
    <HeaderMobile hide-button-home hide-button-logout show-navbar-text :navbar-text="$t('label.packageInfo')">
      <template v-slot:btn-back>
        <ButtonBackMobile />
      </template>
      <template v-slot:btn-action-right>
        <li v-if="packageData" class="nav-item dropdown">
          <a
            id="navbarDropdown"
            class="nav-link dropdown-toggle no-icon"
            href="#"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fas fa-ellipsis-v" />
          </a>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
            <template v-if="isPackageOnAssigned(packageData)">
              <a class="dropdown-item text-primary py-3" @click="acceptByEachPackage(packageData)">
                <i class="fas fa-check-circle mr-2" />
                {{ $t('btn.accept') }}
              </a>
              <a class="dropdown-item text-danger py-3" @click="rejectByEachPackage(packageData)">
                <i class="fas fa-times-circle mr-2" />
                {{ $t('btn.reject') }}
              </a>
              <div class="dropdown-divider" />
            </template>
            <template v-if="isPackageOnDelivery(packageData)">
              <a class="dropdown-item text-success py-3" data-toggle="modal" data-target="#completePackageModal">
                <i class="fas fa-map-marker-alt mr-2" />
                {{ $t('btn.complete') }}
              </a>
              <a class="dropdown-item py-3" data-toggle="modal" data-target="#delayModal">
                <i class="fas fa-hourglass-half mr-2" />
                {{ $t('btn.delay') }}
              </a>
              <a class="dropdown-item text-danger py-3" data-toggle="modal" data-target="#cancelModal">
                <i class="far fa-times-circle mr-2" />
                {{ $t('btn.cancel') }}
              </a>
              <div class="dropdown-divider" />
            </template>
            <a class="dropdown-item py-3" data-toggle="modal" data-target="#packageHistoryModal">
              <i class="fas fa-history mr-2" />
              {{ $t('label.package_history') }}
            </a>
            <NuxtLink :to="{name: 'mobile-package-edit', params: {id: packageData._id}}" class="dropdown-item py-3">
              <i class="fas fa-edit mr-2" />
              {{ $t('label.edit_package') }}
            </NuxtLink>
            <a class="dropdown-item text-danger py-3" @click="deletePackage(packageData._id)">
              <i class="fas fa-trash-alt mr-2" />
              {{ $t('label.deleteThisPackage') }}
            </a>
          </div>
        </li>
      </template>
    </HeaderMobile>
    <div class="mobile-content-h pt-3 col-12">
      <div v-if="packageData" class="row">
        <div class="col-12">
          <div style="width: 150px" class="mx-auto mb-3">
            <template v-if="packageData.media">
              <img :src="getSrc(packageData.media.src)" alt="" class="img-thumbnail">
            </template>
            <template v-else>
              <img :src="package_img" alt="" class="img-thumbnail">
            </template>
          </div>
        </div>
        <div class="col-12">
          <table class="table custom-padding border-bottom">
            <tr>
              <th>{{ $t('label.code') }}</th>
              <td>{{ packageData.code }}</td>
            </tr>
            <tr>
              <th>{{ $t('label.status') }}</th>
              <td>
                <label class="mb-0 badge" :class="colorStatus(packageData.final_status)">
                  {{ checkStatus(packageData.final_status) }}
                </label>
              </td>
            </tr>
            <tr>
              <th>{{ $t('label.customer_name') }}</th>
              <td>{{ packageData.customer_name }}</td>
            </tr>
            <tr>
              <th>{{ $t('label.customer_phone') }}</th>
              <td>{{ packageData.customer_phone }}</td>
            </tr>
            <tr>
              <th>{{ $t('label.customer_address') }}</th>
              <td>{{ packageData.customer_address }}</td>
            </tr>
            <tr>
              <th>{{ $t('label.price') }}</th>
              <td>
                {{ packageData.price | numFormat(packageData.currency && packageData.currency.code === 'KHR' ? num_format_km : num_format_en) }}
                {{ packageData.currency ? packageData.currency.code : '' }}
              </td>
            </tr>
            <tr>
              <th>{{ $t('menu.package_type') }}</th>
              <td>{{ packageData.package_type ? packageData.package_type['name_' + $i18n.locale] : '-' }}</td>
            </tr>
            <tr>
              <th>{{ $t('label.payment') }}</th>
              <td>
                <p class="mb-0">
                  {{ packageData.is_paid ? $t('label.payment_with_order') : $t('label.payment_on_delivery') }}
                </p>
                <template v-if="packageData.is_paid && packageData.payment_type">
                  <small>( {{ packageData.payment_type['name_' + $i18n.locale ] }} )</small>
                </template>
              </td>
            </tr>
            <tr>
              <th>{{ $t('label.note') }}</th>
              <td>{{ packageData.note ? packageData.note : '-' }}</td>
            </tr>
            <tr v-if="packageData.partner_company">
              <th class="text-capitalize">
                {{ $t('label.partner_company') }}
              </th>
              <td>
                <p class="mb-0">
                  {{ packageData.partner_company.name_en }}
                </p>
                <small>{{ packageData.partner_company.phone }}</small>
              </td>
            </tr>
            <tr>
              <th class="text-capitalize">
                {{ $t('label.createdAt') }}
              </th>
              <td>{{ getDateFormat(packageData.created_at) }}</td>
            </tr>
          </table>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label class="font-s-18">{{ $t('label.packageTransitionInfo') }}</label>
          </div>
          <template v-if="packageData.package_transitions && packageData.package_transitions.length">
            <div class="package_transition mb-4">
              <div class="timeline">
                <template v-for="(item, key) in packageData.package_transitions">
                  <div :key="key">
                    <i class="fas" :class="statusIcon(item)" />
                    <div class="timeline-item shadow-none">
                      <div class="text-dark">
                        <strong>{{ checkStatus(item.status) }}</strong>
                      </div>
                      <div><small>{{ item.description[$i18n.locale] }}</small></div>
                      <div><small>{{ $moment(item.created_at).format('llll') }}</small></div>
                    </div>
                  </div>
                </template>
                <div>
                  <i class="fas fa-clock bg-gray" />
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <PackageHistoryModal :package-history="packageData ? packageData.package_histories : []" />
    <div id="completePackageModal" class="modal fade" tabindex="-1" data-backdrop="static">
      <CompletePackageModel :payment-types="payment_types" :package-id="$route.params.id" @onSubmit="getDataFromChild" />
    </div>
    <div id="delayModal" class="modal fade" tabindex="-1" data-backdrop="static">
      <DelayPackageModal ref="delayPackageModal" :package-data="packageData" @onSubmit="getDataFromChild" />
    </div>
    <div id="cancelModal" class="modal fade" tabindex="-1" data-backdrop="static">
      <CancelPackageModal ref="cancelPackageModal" :package-id="$route.params.id" @onSubmit="getDataFromChild" />
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import HeaderMobile from '@/components/Layouts/HeaderMobile'
import ButtonBackMobile from '@/components/UiElements/ButtonBackMobile'
import CompletePackageModel from '@/pages/admin/package/_components/CompletePackageModel'
import DelayPackageModal from '@/pages/admin/package/_components/DelayPackageModal'
import CancelPackageModal from '@/pages/admin/package/_components/CancelPackageModal'
import PackageHistoryModal from '@/pages/admin/package/_components/PackageHistoryModal'
export default {
  name: 'PackageMobileShow',
  head () {
    return {
      title: this.$t('label.packageInfo'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  },
  components: { PackageHistoryModal, CancelPackageModal, DelayPackageModal, CompletePackageModel, ButtonBackMobile, HeaderMobile },
  computed: {
    ...mapGetters({
      num_format_km: 'delivery_company/num_format_km',
      num_format_en: 'delivery_company/num_format_en',
      user: 'user/getUser',
      currencies: 'delivery_company/currencies',
      package_types: 'delivery_company/package_types',
      payment_types: 'delivery_company/payment_types'
    })
  },
  data () {
    return {
      packageData: null
    }
  },
  mounted () {
    this.getPackageData()
  },
  methods: {
    getDataFromChild (value) {
      if (value) {
        this.packageData = value
      }
    },
    getPackageData () {
      this.$axios
        .post(this.$base_api + '/api/backend/package/show', {
          id: this.$route.params.id
        }).then((res) => {
          this.packageData = res.data.data
        }).catch((error) => {
          this.onResponseError(error)
        })
    },
    deletePackage (id) {
      this.$swal({
        html: `<p>
          <label class="mb-0 font-s-24 text-danger">${this.$t('label.deleteThisPackage')}</label>
        </p>
        <p>
          <label class="mb-0">${this.$t('swal.delete_package')}</label>
        </p>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        confirmButtonText: this.$t('swal.yes'),
        cancelButtonText: this.$t('swal.cancel')
      }).then((result) => {
        if (result.value) {
          this.$axios.post(this.$base_api + '/api/backend/currency/delete', { id })
            .then((res) => {
              if (this.$refs.oTable) {
                this.$refs.oTable.reinitialise()
              }
              this.$swal({
                position: 'center',
                html: `<label class="mb-3 font-s-20">${this.$t('swal.currency_deleted')}</label>`,
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
              })
            }).catch((error) => {
              this.onResponseError(error)
            }).finally(() => {
              this.$isLoading(false)
            })
        }
      }, (dismiss) => {
        if (!(dismiss === 'cancel')) {
          throw dismiss
        }
      }).catch(function (err) {
        console.error(err)
        throw err
      })
    },
    isPackageOnAssigned (item) {
      return item && item.final_status === 'assigned'
    },
    isPackageOnDelivery (item) {
      return item && item.final_status === 'delivery'
    },

    acceptByEachPackage (item) {
      if (item) {
        this.acceptDelivery(event, item._id)
      }
    },
    acceptDelivery (event, packageId = null) {
      this.onConfirm({
        icon: 'warning',
        title: this.$t('menu.delivery'),
        text: packageId ? this.$t('label.start_delivery') : this.$t('label.accept_all_packages'),
        confirmButtonText: this.$t('string.ok'),
        cancelButtonText: this.$t('string.cancel')
      }).then((accept) => {
        if (accept) {
          let userId = null
          if (this.user) {
            userId = this.user._id
          }
          this.$axios.post(this.$base_api + '/api/backend/driver/accept-delivery', {
            id: userId,
            package_id: packageId
          }).then((res) => {
            this.getPackageData()
          }).catch((error) => {
            this.onResponseError(error)
          })
        }
      })
    },
    rejectByEachPackage (item) {
      if (item) {
        this.rejectDelivery(event, item._id)
      }
    },
    rejectDelivery (event, packageId = null) {
      this.onConfirm({
        icon: 'warning',
        title: this.$t('menu.delivery'),
        text: packageId ? this.$t('label.reject_package') : this.$t('label.reject_all_packages'),
        cancelButtonColor: '#3a7afe',
        confirmButtonColor: '#ed524f',
        confirmButtonText: this.$t('string.ok'),
        cancelButtonText: this.$t('string.cancel')
      }).then((accept) => {
        if (accept) {
          let userId = null
          if (this.user) {
            userId = this.user._id
          }
          this.$axios.post(this.$base_api + '/api/backend/driver/reject-delivery', {
            id: userId,
            package_id: packageId
          }).then((res) => {
            this.getPackageData()
          }).catch((error) => {
            this.onResponseError(error)
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "assets/scss/pages/mobile";
.mobile-content-h {
  height: calc(100vh - 60px);
}
.table.custom-padding td,
.table.custom-padding th {
  padding: 0.35rem !important;
}

</style>

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
                <tempate v-if="packageData.is_paid && packageData.payment_type">
                  <small>( {{ packageData.payment_type['name_' + $i18n.locale ] }} )</small>
                </tempate>
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
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import HeaderMobile from '@/components/Layouts/HeaderMobile'
import ButtonBackMobile from '@/components/UiElements/ButtonBackMobile'
export default {
  name: 'PackageMobileShow',
  components: { ButtonBackMobile, HeaderMobile },
  computed: {
    ...mapGetters({
      num_format_km: 'delivery_company/num_format_km',
      num_format_en: 'delivery_company/num_format_en'
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

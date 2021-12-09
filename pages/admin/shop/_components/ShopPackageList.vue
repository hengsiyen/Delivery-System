<template>
  <div>
    <template v-if="listPackages && listPackages.length">
      <template v-for="(item, key) in listPackages">
        <div :key="key" class="list_item">
          <div class="col-md-2 col-lg-2">
            <template v-if="item.media">
              <div class="package__item-image">
                <img :src="getSrc(item.media.src)" alt="" width="100%">
              </div>
            </template>
            <template v-else>
              <div class="package__item-image">
                <img :src="package_img" alt="" width="100%">
              </div>
            </template>
          </div>
          <div class="col-md-4 col-lg-4">
            <div class="list_item-block">
              <div class="list_item-block-icon">
                <i class="fas fa-user mr-2" />
              </div>
              <div class="list_item-label text-truncate">
                {{ item.customer_name }}
              </div>
            </div>
            <div class="list_item-block">
              <div class="list_item-block-icon">
                <i class="fas fa-phone mr-2" />
              </div>
              <div class="list_item-label text-truncate">
                {{ item.customer_phone }}
              </div>
            </div>
            <div class="list_item-block">
              <div class="list_item-block-icon">
                <i class="fas fa-money-bill mr-2" />
              </div>
              <div class="list_item-label text-truncate">
                {{ item.price | numFormat(checkFormatCurrency(item.currency)) }}
                {{ item.currency ? item.currency.code : null }}
              </div>
            </div>
            <div class="list_item-block">
              <div class="list_item-block-icon">
                <i class="fas fa-sticky-note mr-2" />
              </div>
              <div class="list_item-status text-truncate" :class="colorStatus(item.final_status)">
                {{ checkStatus(item.final_status) }}
              </div>
            </div>
            <div v-if="item.note" class="list_item-block">
              <div class="list_item-block-icon">
                <i class="fas fa-clipboard mr-2" />
              </div>
              <div class="list_item-label text-truncate">
                {{ item.note }}
              </div>
            </div>
          </div>
          <div class="col-md-4 col-lg-4">
            <div class="list_item-block">
              <div class="list_item-block-icon">
                <i class="fas fa-store mr-2" />
              </div>
              <div class="list_item-label text-truncate">
                {{ item.shop ? item.shop.name_en : '' }}
              </div>
            </div>
            <div class="list_item-block">
              <div class="list_item-block-icon">
                <i class="fas fa-map-marker-alt mr-2" />
              </div>
              <div class="list_item-label text-truncate">
                {{ item.customer_address }}
              </div>
            </div>
            <div class="list_item-block">
              <div class="list_item-block-icon">
                <i class="fas fa-calendar-alt mr-2" />
              </div>
              <div v-if="item.request_delivery_at" class="package_item-label text-truncate">
                {{ $moment(item.request_delivery_at).format('lll') }}
              </div>
              <div v-else class="package_item-label text-truncate">
                {{ $moment(item.created_at).format('lll') }}
              </div>
            </div>
            <div v-if="item.delivery_charge" class="package_item-block">
              <div class="package_item-block-icon">
                <i class="fas fa-donate mr-2" />
              </div>
              <div class="package_item-label text-truncate">
                {{ item.delivery_charge | numFormat(checkFormatCurrency(item.delivery_charge_currency)) }}
                {{ item.delivery_charge_currency ? item.delivery_charge_currency.code : '' }}
              </div>
            </div>
            <div v-if="item.partner_company" class="list_item-block">
              <div class="list_item-block-icon">
                <i class="fas fa-truck mr-2" />
              </div>
              <div class="list_item-label text-truncate">
                {{ item.partner_company.name_en }}
              </div>
            </div>
          </div>
          <div class="col-md-2 col-lg-2 list_item-block-action">
            <div class="list_item-block-btn">
              <NuxtLink
                class="btn btn-default btn-sm btn-block"
                :to="{name: 'show-package', params:{id: item._id}}"
              >
                <i class="fas fa-eye mr-2" />
                <strong>{{ $t('label.view') }}</strong>
              </NuxtLink>
            </div>
          </div>
        </div>
      </template>
    </template>
    <template v-else>
      <div class="list_item align-items-center w-100 justify-content-center">
        {{ $t('label.no_result_found') }}
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ShopPackageList',
  props: {
    listPackages: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    ...mapGetters({
      num_format_en: 'delivery_company/num_format_en',
      num_format_km: 'delivery_company/num_format_km'
    })
  }
}
</script>

<style scoped lang="scss">
@import "../../../../assets/scss/components/_list_item.scss";
.package__item-image {
  width: 80%;
}
</style>

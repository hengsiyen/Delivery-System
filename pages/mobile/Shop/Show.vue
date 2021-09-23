<template>
  <div>
    <HeaderMobile hide-button-logout hide-button-home show-navbar-text :navbar-text="$t('label.shopInfo')">
      <template v-slot:btn-back>
        <ButtonBackMobile />
      </template>
    </HeaderMobile>
    <div class="mobile-content-h">
      <div class="h-100 position-relative">
        <div class="mobile-container mobile-container-h">
          <template v-if="onLoading">
            <div class="onloading" style="height: 150px">
              <i class="fas fa-circle-notch fa-spin" />
            </div>
          </template>
          <template v-else>
            <template v-if="shop">
              <div class="shop-info-block">
                <div class="row">
                  <div class="col-12">
                    <div class="d-flex align-items-center w-100 pb-2">
                      <div class="shop-image-logo">
                        <template v-if="shop.logo">
                          <img :src="base_api + '/' + shop.logo" alt="" class="img-thumbnail rounded-circle">
                        </template>
                        <template v-else>
                          <div
                            class="img-thumbnail rounded-circle shop-no-img"
                            :style="`background-image: url('${require('../../../static/img/shop.png')}')`"
                          />
                        </template>
                      </div>
                      <div class="shop-info text-truncate">
                        <div class="shop_name">
                          <label class="text-bold mb-0">{{ shop.name_en }}</label>
                        </div>
                        <div class="shop_code">
                          <small class="text-bold text-muted">{{ shop.code }}</small>
                          <small class="ml-3 badge" :class="shop.enabled ? 'badge-success' : 'badge-danger'">
                            {{ shop.enabled ? $t('label.enable') : $t('label.disable') }}
                          </small>
                        </div>
                      </div>
                    </div>
                    <div class="shop_owner pt-2">
                      <div class="shop_owner-image">
                        <template v-if="shop.avatar">
                          <img :src="base_api + '/' + shop.avatar" alt="" class="img-thumbnail rounded-circle">
                        </template>
                        <template v-else>
                          <img :src="avatar" alt="" class="img-thumbnail rounded-circle">
                        </template>
                      </div>
                      <div class="shop_owner-info">
                        <div class="text-bold ">
                          {{ shop.owner_name }}
                        </div>
                        <small class="d-block">{{ shop.phone }}</small>
                        <small class="d-block">{{ shop.email }}</small>
                        <small class="d-block">{{ shop['address_' + $i18n.locale] }}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-12">
                  <label>{{ $t('menu.package') }}</label>
                </div>
                <div class="list_items col-12">
                  <template v-if="shop.packages && shop.packages.length">
                    <template v-for="(item, key) in shop.packages">
                      <div :key="key" class="list_item list_item-hover d-flex px-0 position-relative">
                        <div class="d-flex px-0" @click="selectPackage(item)">
                          <div class="col-3 col-md-2 col-lg-2 col-xl-1">
                            <template v-if="item.media">
                              <img :src="getSrc(item.media.src)" alt="" class="img-thumbnail">
                            </template>
                            <template v-else>
                              <img :src="package_img" alt="" class="img-thumbnail">
                            </template>
                            <template v-if="$moment(item.created_at).format('YYYY-MM-DD') === $moment().format('YYYY-MM-DD')">
                              <span class="badge badge-success w-100">{{ $t('label.new') }}</span>
                            </template>
                          </div>
                          <div class="col-9 col-md-4 col-lg-4 col-xl-5">
                            <div class="list_item-block m-0 font-s-13">
                              <div class="list_item-block-icon">
                                <i class="fas fa-qrcode mr-2" />
                              </div>
                              <div class="list_item-label text-truncate w-100">
                                <div class="d-flex align-items-center w-100 justify-content-between">
                                  {{ item.code }}
                                </div>
                              </div>
                            </div>
                            <div class="list_item-block m-0 font-s-14">
                              <div class="list_item-block-icon">
                                <i class="fas fa-user mr-2" />
                              </div>
                              <div class="list_item-label text-truncate">
                                {{ item.customer_name }}
                              </div>
                            </div>
                            <div class="list_item-block m-0 font-s-14">
                              <div class="list_item-block-icon">
                                <i class="fas fa-phone mr-2" />
                              </div>
                              <div class="list_item-label text-truncate">
                                <strong>{{ item.customer_phone }}</strong>
                              </div>
                            </div>
                            <div class="list_item-block m-0 font-s-14">
                              <div class="list_item-block-icon">
                                <i class="fas fa-map-marker-alt mr-2" />
                              </div>
                              <div class="list_item-label text-truncate">
                                <strong>{{ item.customer_address }}</strong>
                              </div>
                            </div>
                            <div class="list_item-block m-0 font-s-14">
                              <div class="list_item-block-icon">
                                <i class="fas fa-calendar mr-2" />
                              </div>
                              <div class="list_item-label text-truncate">
                                {{ getDateFormat(item.created_at) }}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="btn-edit-package">
                          <NuxtLink
                            :to="{name: 'mobile-package-edit', params: {id: item._id}}"
                            class="btn btn-default btn-sm rounded-circle"
                          >
                            <i class="fas fa-edit" />
                          </NuxtLink>
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
              </div>
            </template>
          </template>
        </div>
        <template v-if="!onLoading">
          <div class="btn-create-package">
            <button class="btn btn-success btn-lg rounded-circle" @click="createPackage">
              <i class="fas fa-plus" />
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HeaderMobile from '@/components/Layouts/HeaderMobile'
import ButtonBackMobile from '@/components/UiElements/ButtonBackMobile'

export default {
  name: 'MobileShopShow',
  components: { ButtonBackMobile, HeaderMobile },
  head () {
    return {
      title: this.metadata.title,
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  },
  computed: {
    ...mapGetters({
      currency: 'delivery_company/currency'
    }),
    metadata () {
      const data = {
        title: this.$t('menu.shop')
      }

      if (this.shop) {
        data.title = this.shop.name_en
      }
      return data
    }
  },
  data () {
    return {
      base_api: this.$base_api,
      shop: null,
      onLoading: true
    }
  },
  mounted () {
    this.getShop()
  },
  methods: {
    createPackage () {
      this.$store.dispatch('package/setShop', this.shop)
      this.$router.push({ name: 'mobile-package-create' })
    },
    selectPackage (item) {
      this.$router.push({ name: 'mobile-package-show', params: { id: item._id } })
    },
    getShop () {
      this.$axios.post(this.$base_api + '/api/backend/shop/show', {
        id: this.$route.params.id
      }).then((res) => {
        this.shop = res.data.data
      }).catch((err) => {
        this.onResponseError(err)
      }).finally(() => {
        this.onLoading = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../assets/scss/pages/mobile";
@import "../../../assets/scss/components/_list_item.scss";

.list_item-block-icon {
  margin-right: 0 !important;
}

.list_item-hover:hover {
  background-color: rgb(245, 245, 245);
}

.shop-card_body {
  padding: 0 8px;
}

.shop_package-report {
  padding: 15px;
}

.shop-info-block {
  width: 100%;
  padding: 7.5px;
  background-color: #f9f9f99c;

  & .shop_code {
    & small {
      font-size: 75%;
    }
  }
}

.shop-image-logo {
  width: 75px;
  height: 75px;
  margin-right: 12px;

  & .img-thumbnail {
    width: 100%;
    height: 100%;

    &.shop-no-img {
      background-repeat: no-repeat;
      background-size: 68%;
      background-position: center;
    }
  }
}

.shop_owner {
  display: flex;
  border-top: 1px solid #dfdfdf;
  width: 100%;

  & .shop_owner-image {
    width: 75px;
    height: 75px;
    margin-right: 12px;

    & .img-thumbnail {
      width: 100%;
      height: 100%;
    }
  }
}

.shop-info,
.shop_owner-info {
  width: calc(100% - 75px);
}

.btn-create-package {
  position: fixed;
  bottom: 12px;
  right: 12px;
  z-index: 1000;
}

.btn-edit-package {
  position: absolute;
  top: 8px;
  right: 8px;
}
</style>

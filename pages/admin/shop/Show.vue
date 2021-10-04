<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header with-border">
          <h3 class="card-title text-capitalize">
            {{ $t('label.show') }}
          </h3>
          <div class="card-tools">
            <NuxtLink
              class="btn btn-primary btn-sm"
              :to="{name: 'edit-shop', params: {id: this.$route.params.id}}"
            >
              <i class="fas fa-edit mr-1" />
              <strong>{{ $t('button.edit') }}</strong>
            </NuxtLink>
            <ButtonBack />
          </div>
        </div>
        <div class="card-body shop-card_body">
          <div v-if="shop" class="row">
            <div class="col-lg-8 col-xl-9 shop_package-report">
              <template v-if="show_form === 'create_invoice'">
                <ShopInvoiceForm
                  ref="package_detail"
                  :shop="shop"
                  :currency="currency"
                  @onClickClose="changeShowForm('detail')"
                />
              </template>
              <template v-else>
                <ShopPackageDetail ref="package_detail" :shop="shop" />
              </template>
            </div>
            <div class="col-lg-4 col-xl-3 shop-info-block">
              <div class="row">
                <div class="col-lg-12">
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
                  <div class="col-12">
                    <div class="shop_name text-center">
                      <h4 class="text-bold">
                        {{ shop.name_en }}
                      </h4>
                    </div>
                    <div class="shop_code">
                      <small class="text-bold text-muted">
                        {{ shop.code }}
                      </small>
                      <small class="ml-3 badge" :class="shop.enabled ? 'badge-success' : 'badge-danger'">
                        {{ shop.enabled ? $t('label.enable') : $t('label.disable') }}
                      </small>
                    </div>
                    <small class="d-block text-center">{{ shop['address_' + $i18n.locale] }}</small>
                  </div>
                  <div class="col-12">
                    <div class="shop_owner">
                      <div class="shop_owner-image">
                        <template v-if="shop.avatar">
                          <img :src="base_api + '/' + shop.avatar" alt="" class="img-thumbnail rounded-circle">
                        </template>
                        <template v-else>
                          <img :src="avatar" alt="" class="img-thumbnail rounded-circle">
                        </template>
                      </div>
                      <div class="shop_owner-info d-flex flex-column justify-content-center">
                        <div class="text-bold ">
                          {{ shop.owner_name }}
                        </div>
                        <small class="d-block">{{ shop.phone }}</small>
                        <small class="d-block">{{ shop.email }}</small>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 mb-3">
                    <template v-if=" show_form === 'detail'">
                      <button
                        class="btn btn-block btn-primary"
                        @click="changeShowForm('create_invoice')"
                      >
                        <i class="fas fa-clipboard-list mr-2" />
                        <strong>{{ $t('btn.create_invoice') }}</strong>
                      </button>
                    </template>
                    <button
                      class="btn btn-block btn-default"
                      data-toggle="modal"
                      data-target="#shopListInvoice"
                      @click="openInvoiceListModal"
                    >
                      <i class="fas fa-clipboard-list mr-2" />
                      <strong>{{ $t('label.invoices') }}</strong>
                    </button>
                  </div>
                  <div class="col-12">
                    <div>
                      <div class="text-bold mb-2">
                        {{ $t('label.description') }}
                      </div>
                      <div>
                        {{ shop.description }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ShopInvoiceListModal ref="shopListInvoices"/>
  </div>
</template>

<script>
import ButtonBack from '@/components/UiElements/ButtonBack'
import ShopInvoiceForm from '@/pages/admin/shop/_components/ShopInvoiceForm'
import ShopPackageDetail from '@/pages/admin/shop/_components/ShopPackageDetail'
import { mapGetters } from 'vuex'
import ShopInvoiceListModal from '@/pages/admin/shop/_components/ShopInvoiceListModal'

export default {
  name: 'ShopShow',
  components: { ShopInvoiceListModal, ShopPackageDetail, ShopInvoiceForm, ButtonBack },
  asyncData (ctx) {
    if (ctx.route.params.id) {
      return ctx.$axios
        .post(ctx.env.VUE_APP_API + '/api/backend/shop/show', {
          id: ctx.route.params.id
        })
        .then((res) => {
          const result = res.data.data
          return {
            shop: result
          }
        })
    } else {
      return {
        shop: null
      }
    }
  },
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
      show_form: 'detail'
    }
  },
  methods: {
    openInvoiceListModal () {
      if (this.$refs.shopListInvoices) {
        this.$refs.shopListInvoices.search()
      }
    },
    changeShowForm (type) {
      this.show_form = type
    }
  }
}
</script>

<style scoped lang="scss">
.shop-card_body {
  padding: 0 8px;
}

.shop_package-report {
  padding: 15px;
}

.shop-info-block {
  padding: 15px;
  background-color: #f9f9f99c;

  & .shop_name {
    margin: 12px 0 0;
  }

  & .shop_code {
    display: flex;
    align-items: center;
    justify-content: center;

    & small {
      font-size: 75%;
    }
  }
}

.shop-image-logo {
  width: 150px;
  height: 150px;
  margin: 0 auto;

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
  border: 1px solid #dfdfdf;
  border-radius: 0.2rem;
  width: 100%;
  padding: 15px;
  margin: 3rem 0 1rem;
  background-color: white;

  & .shop_owner-image {
    width: 90px;
    height: 90px;

    & .img-thumbnail {
      width: 100%;
      height: 100%;
    }
  }

  & .shop_owner-info {
    padding-left: 20px;
    width: calc(100% - 75px);
  }
}
</style>

<template>
  <div class="modal-dialog modal-lg modal-dialog-scrollable modal-min-height">
    <div class="modal-content">
      <div class="modal-header">
        <h5 id="staticBackdropLabel" class="modal-title text-capitalize">
          <i class="fas fa-store mr-2" />
          {{ create_shop ? $t('label.create_new_shop') : $t('label.select_shop') }}
        </h5>
        <button
          ref="close"
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
          @click="closeModel"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <template v-if="create_shop">
          <div class="form-row">
            <div class="form-group col-lg-6">
              <label
                for="shop_name"
                class="required"
                :class="{'text-red': checkValidate('shop_name')}"
              >
                {{ $t('label.shop_name') }}
              </label>
              <input
                id="shop_name"
                v-model="shop_name"
                type="text"
                class="form-control"
                :placeholder="$t('pla.shop_name')"
                :class="{'is-invalid': checkValidate('shop_name')}"
              >
              <div v-if="checkValidate('shop_name')" class="invalid-feedback">
                {{ validate.shop_name[0] }}
              </div>
            </div>
            <div class="form-group col-lg-6">
              <label
                for="owner_name"
                class="required"
                :class="{'text-red': checkValidate('owner_name')}"
              >
                {{ $t('label.owner_name') }}
              </label>
              <input
                id="owner_name"
                v-model="owner_name"
                type="text"
                class="form-control"
                :placeholder="$t('pla.owner_name')"
                :class="{'is-invalid': checkValidate('owner_name')}"
              >
              <div v-if="checkValidate('owner_name')" class="invalid-feedback">
                {{ validate.owner_name[0] }}
              </div>
            </div>
            <div class="form-group col-lg-6">
              <label
                for="phone"
                class="required"
                :class="{'text-red': checkValidate('phone')}"
              >
                {{ $t('label.phone') }}
              </label>
              <input
                id="phone"
                v-model="shop_phone"
                v-mask="'### ### ####'"
                type="text"
                class="form-control"
                :placeholder="$t('pla.phone_number')"
                :class="{'is-invalid': checkValidate('phone')}"
              >
              <div v-if="checkValidate('phone')" class="invalid-feedback">
                {{ validate.phone[0] }}
              </div>
            </div>
            <div class="form-group col-lg-6">
              <label
                for="email"
                class="required"
                :class="{'text-red': checkValidate('email')}"
              >
                {{ $t('label.email') }}
              </label>
              <input
                id="email"
                v-model="shop_email"
                type="email"
                class="form-control"
                :placeholder="$t('pla.email')"
                :class="{'is-invalid': checkValidate('email')}"
              >
              <div v-if="checkValidate('email')" class="invalid-feedback">
                {{ validate.email[0] }}
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="form-group shop__search">
            <input
              v-model="search_shop"
              type="search"
              class="form-control"
              :placeholder="$t('label.search') + '...'"
            >
            <button class="btn btn-success" @click="create_shop = true">
              <i class="fas fa-plus mr-1" />
              <strong>{{ $t('label.add_new') }}</strong>
            </button>
          </div>
          <template v-if="sonloading">
            <div class="shop__onloading">
              <i class="fas fa-circle-notch fa-spin" />
            </div>
          </template>
          <template v-else>
            <div class="shop__items">
              <template v-if="shops && shops.length">
                <div class="row">
                  <div
                    v-for="(item, key) in shops"
                    :key="key"
                    class="col-lg-6"
                    @click="selectShop(item)"
                  >
                    <div
                      class="modal__item d-flex"
                      :class="{'active': shop && shop._id === item._id}"
                    >
                      <div class="modal__image" style="width: 75px;">
                        <template v-if="item.logo">
                          <img
                            :src="`${baseUrl}/${item.logo}`"
                            class="img-thumbnail"
                            alt="User Image"
                          >
                        </template>
                        <template v-else>
                          <img
                            :src="shop_img"
                            class="img-thumbnail"
                            alt="User Image"
                          >
                        </template>
                      </div>
                      <div class="modal__info">
                        <label class="d-block mb-0"><strong>{{ item.name_en }}</strong></label>
                        <label class="d-block mb-0"><strong>{{ item.phone }}</strong></label>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="row">
                  <div class="col-12">
                    <NoResult />
                  </div>
                </div>
              </template>
              <infinite-loading spinner="spiral" :identifier="shopInfiniteId" @infinite="getShops">
                <div slot="no-more" />
                <div slot="no-results" />
              </infinite-loading>
            </div>
          </template>
        </template>
      </div>
      <div class="modal-footer">
        <template v-if="create_shop">
          <a type="button" class="btn btn-light" @click="create_shop = false">
            <i class="fas fa-times-circle mr-2" />
            <strong>{{ $t('btn.cancel') }}</strong>
          </a>
          <button
            class="btn btn-success"
            data-dismiss="modal"
            @click="storeShop"
          >
            <i class="fas fa-save mr-2" />
            <strong>{{ $t('btn.save') }}</strong>
          </button>
        </template>
        <template v-else>
          <button type="button" class="btn btn-light" data-dismiss="modal" @click="closeModel">
            <i class="fas fa-times-circle mr-2" />
            <strong>{{ $t('btn.cancel') }}</strong>
          </button>
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="confirmModel">
            <i class="fas fa-check-circle mr-2" />
            <strong> {{ $t('btn.ok') }}</strong>
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'debounce'
import { mapGetters } from 'vuex'
import NoResult from '@/components/NoResult'

export default {
  name: 'ShopModal',
  components: { NoResult },
  props: {
    closeWithEmit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      validate: null,
      shops: [],
      sonloading: false,
      search_shop: null,
      create_shop: false,
      shop_name: null,
      owner_name: null,
      shop_phone: null,
      shop_email: null,
      page: 1,
      shopInfiniteId: +new Date()
    }
  },
  computed: {
    ...mapGetters({
      shop: 'package/shop',
      dcid: 'delivery_company/dcid',
      number_per_page: 'delivery_company/number_per_page'
    })
  },
  watch: {
    search_shop (val) {
      this.sonloading = true
      if (!this.awaitingSearchShop) {
        if (this.time_out_shop) {
          clearTimeout(this.time_out_shop)
        }
        this.time_out_shop = setTimeout(() => {
          this.searchShop(1)
          this.awaitingSearchShop = false
        }, 1000)
      }
      this.awaitingSearchShop = true
    }
  },
  methods: {
    checkValidate (key) {
      if (key) {
        return this.validate && this.validate.hasOwnProperty(key)
      }
      return false
    },
    searchShop (page = null, loading = false) {
      if (loading) { this.sonloading = loading }
      this.page = 1
      if (page) {
        this.page = page
      }
      this.shops = []
      this.shopInfiniteId += 1
      this.getShops()
    },
    getShops: debounce(function ($state) {
      this.$axios.post(this.$base_api + '/api/backend/shop/list', {
        search: this.search_shop,
        number_per_page: this.number_per_page,
        dcid: this.dcid,
        page: this.page
      }).then(({ data }) => {
        if (!(this.page > data.total_pages)) {
          this.page += 1
          this.shops.push(...data.data)
          $state.loaded()
        } else {
          $state.complete()
        }
      }).catch((error) => {
        this.onResponseError(error)
      }).finally(() => {
        this.sonloading = false
      })
    }, 500),
    storeShop () {
      this.validate = null
      const formData = new FormData()
      if (this.id) {
        formData.append('id', this.id)
      }
      if (this.shop_name) {
        formData.append('shop_name', this.shop_name)
      }
      if (this.owner_name) {
        formData.append('owner_name', this.owner_name)
      }
      if (this.shop_phone) {
        formData.append('phone', this.shop_phone)
      }
      if (this.shop_email) {
        formData.append('email', this.shop_email)
      }
      formData.append('enabled', true)
      this.$axios
        .post(this.$base_api + '/api/backend/shop/store-or-edit', formData)
        .then((res) => {
          this.$store.dispatch('package/setShop', {
            _id: res.data.data._id,
            name_en: res.data.data.name_en
          })
          this.cancelCreateShop()
        }).catch((error) => {
          if (error.response.status === 422) {
            this.validate = error.response.data.errors
          } else {
            this.onResponseError(error)
          }
        })
    },
    closeModel () {
      if (this.closeWithEmit) {
        this.$emit('closeModel')
      } else {
        this.$store.dispatch('package/setShop', null)
      }
      this.cancelCreateShop()
    },
    confirmModel () {
      this.$emit('confirmModel')
    },
    cancelCreateShop () {
      this.create_shop = false
      this.shop_name = null
      this.owner_name = null
      this.shop_phone = null
      this.shop_email = null
      this.search_shop = null
    },
    selectShop (shop) {
      this.$store.dispatch('package/setShop', shop)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../../assets/scss/components/modal_item";

</style>

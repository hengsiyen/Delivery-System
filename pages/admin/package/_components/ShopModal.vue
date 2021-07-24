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
          <div class="form-group d-flex shop__search">
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
                  >
                    <div class="driver__item d-flex">
                      <div class="driver__image" style="width: 75px;">
                        <template v-if="item.avatar">
                          <img
                            :src="`${baseUrl}/${item.avatar}`"
                            class="img-thumbnail"
                            alt="User Image"
                          >
                        </template>
                        <template v-else>
                          <img
                            :src="avatar"
                            class="img-thumbnail"
                            alt="User Image"
                          >
                        </template>
                      </div>
                      <div class="driver__info">
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
            <!--            <div class="shop__items">-->
            <!--&lt;!&ndash;              <template v-if="shops && shops.length">&ndash;&gt;-->
            <!--&lt;!&ndash;                <div&ndash;&gt;-->
            <!--&lt;!&ndash;                  v-for="(item, key) in shops"&ndash;&gt;-->
            <!--&lt;!&ndash;                  :key="key"&ndash;&gt;-->
            <!--&lt;!&ndash;                  class="shop__item"&ndash;&gt;-->
            <!--&lt;!&ndash;                  @click="selectShop(item)"&ndash;&gt;-->
            <!--&lt;!&ndash;                >&ndash;&gt;-->
            <!--&lt;!&ndash;                  <i class="fas fa-chevron-right icon-left" />&ndash;&gt;-->
            <!--&lt;!&ndash;                  <div>&ndash;&gt;-->
            <!--&lt;!&ndash;                    {{ item.name_en }}&ndash;&gt;-->
            <!--&lt;!&ndash;                  </div>&ndash;&gt;-->
            <!--&lt;!&ndash;                  <template v-if="shop && (shop._id === item._id)">&ndash;&gt;-->
            <!--&lt;!&ndash;                    <span class="fa-stack position-absolute icon-right" style="vertical-align: top;">&ndash;&gt;-->
            <!--&lt;!&ndash;                      <i class="far fa-circle fa-stack-2x" />&ndash;&gt;-->
            <!--&lt;!&ndash;                      <i class="fas fa-circle fa-stack-1x" />&ndash;&gt;-->
            <!--&lt;!&ndash;                    </span>&ndash;&gt;-->
            <!--&lt;!&ndash;                  </template>&ndash;&gt;-->
            <!--&lt;!&ndash;                  <template v-else>&ndash;&gt;-->
            <!--&lt;!&ndash;                    <i class="far fa-circle position-absolute icon-right" />&ndash;&gt;-->
            <!--&lt;!&ndash;                  </template>&ndash;&gt;-->
            <!--&lt;!&ndash;                </div>&ndash;&gt;-->
            <!--&lt;!&ndash;              </template>&ndash;&gt;-->
            <!--&lt;!&ndash;              <template v-else>&ndash;&gt;-->
            <!--&lt;!&ndash;                <NoResult />&ndash;&gt;-->
            <!--&lt;!&ndash;              </template>&ndash;&gt;-->
            <!--              <infinite-loading spinner="spiral" :identifier="shopInfiniteId" @infinite="getShops">-->
            <!--                <div slot="no-more" />-->
            <!--                <div slot="no-results" />-->
            <!--              </infinite-loading>-->
            <!--            </div>-->
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
          <button type="button" class="btn btn-primary" data-dismiss="modal">
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
        search_query: this.search_shop,
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
    cancelCreateShop () {
      this.create_shop = false
      // this.shop_name = null
      // this.owner_name = null
      // this.shop_phone = null
      // this.shop_email = null
      // this.search_shop = null
    },
    selectShop (shop) {
      this.$store.dispatch('package/setShop', shop)
    }
  }
}
</script>

<style scoped lang="scss">
.shop__items {
  height: calc(100% - 3.5rem);
  overflow-y: auto;
}

.shop__search {
  & .form-control {
    width: 80%;
  }

  & .btn {
    width: 19%;
    margin-left: auto;
  }
}

.shop__item {
  padding: 15px 30px 15px 40px;
  border-top: 1px solid #e9ecef;
  border-bottom: 1px solid #e9ecef;
  position: relative;

  &:hover,
  &:focus,
  &:active {
    cursor: pointer;
    background-color: #f8f8f8;
  }

  & i.icon-left {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 11px;
  }

  & span.icon-right,
  & i.icon-right {
    right: 10px;
    top: 50%;
    transform: translate(0, -50%);
  }

  & i.icon-right {
    font-size: 16px;
  }

  & span.icon-right {
    font-size: 8px;
    color: var(--primary)
  }
}

.shop__onloading {
  width: 100%;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;

  & i {
    font-size: 35px;
    color: var(--primary);
  }
}
</style>

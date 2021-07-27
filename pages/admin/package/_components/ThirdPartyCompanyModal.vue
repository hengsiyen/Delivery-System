<template>
  <div class="modal-dialog modal-lg modal-dialog-scrollable modal-min-height">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title text-capitalize">
          {{ create_form ? $t('label.create_new_third_party_company') : $t('label.select_third_party_company') }}
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
        <template v-if="create_form">
          <div class="form-row">
            <div class="form-group col-lg-12">
              <label
                for="third_party_company_name"
                class="required"
                :class="{'text-red': checkValidate('name')}"
              >
                {{ $t('label.name') }}
              </label>
              <input
                id="third_party_company_name"
                v-model="name"
                type="text"
                class="form-control"
                :placeholder="$t('pla.name')"
                :class="{'is-invalid': checkValidate('name')}"
              >
              <div v-if="checkValidate('name')" class="invalid-feedback">
                {{ validate.name[0] }}
              </div>
            </div>
            <div class="form-group col-lg-12">
              <label
                for="third_party_company_phone"
                :class="{'text-red': checkValidate('phone')}"
              >
                {{ $t('label.phone') }}
              </label>
              <input
                id="third_party_company_phone"
                v-model="phone"
                type="text"
                class="form-control"
                :placeholder="$t('pla.phone')"
                :class="{'is-invalid': checkValidate('phone')}"
              >
              <div v-if="checkValidate('phone')" class="invalid-feedback">
                {{ validate.phone[0] }}
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="form-group d-flex third_party_company__search">
            <input
              v-model="t_search_query"
              type="search"
              class="form-control"
              :placeholder="$t('label.search') + '...'"
            >
            <button class="btn btn-success" @click="create_form = true">
              <i class="fas fa-plus mr-1" />
              <strong>{{ $t('label.add_new') }}</strong>
            </button>
          </div>
          <template v-if="pcOnloading">
            <div class="third_party_company__onloading">
              <i class="fas fa-circle-notch fa-spin" />
            </div>
          </template>
          <template v-else>
            <div class="third_party_company__items">
              <template v-if="third_parties && third_parties.length">
                <div class="row">
                  <div
                    v-for="(item, key) in third_parties"
                    :key="key"
                    class="col-lg-6"
                    @click="selectThirdParty(item)"
                  >
                    <div
                      class="modal__item d-flex"
                      :class="{'active': third_party && third_party._id === item._id}"
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
              <infinite-loading spinner="spiral" :identifier="pcInfiniteId" @infinite="getThirdParties">
                <div slot="no-more" />
                <div slot="no-results" />
              </infinite-loading>
            </div>
          </template>
        </template>
      </div>
      <div class="modal-footer">
        <template v-if="create_form">
          <a type="button" class="btn btn-light" @click="cancelCreateThirdParty">
            <i class="fas fa-times-circle mr-2" />
            <strong>{{ $t('btn.cancel') }}</strong>
          </a>
          <button
            class="btn btn-success"
            data-dismiss="modal"
            @click="storeThirdParty"
          >
            <i class="fas fa-save mr-2" />
            <strong>{{ $t('btn.save') }}</strong>
          </button>
        </template>
        <template v-else>
          <button
            type="button"
            class="btn btn-light"
            data-dismiss="modal"
            @click="closeModel"
          >
            <i class="fas fa-times-circle mr-2" />
            <strong>{{ $t('btn.cancel') }}</strong>
          </button>
          <button type="button" class="btn btn-primary" data-dismiss="modal">
            <i class="fas fa-check-circle mr-2" />
            <strong>{{ $t('btn.ok') }}</strong>
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
  name: 'ThirdPartyCompanyModal',
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
      third_parties: [],
      pcOnloading: false,
      t_search_query: null,
      create_form: false,
      name: null,
      phone: null,

      pcInfiniteId: +new Date(),
      page: 1

    }
  },
  computed: {
    ...mapGetters({
      third_party: 'package/third_party',
      number_per_page: 'delivery_company/number_per_page',
      dcid: 'delivery_company/dcid'
    })
  },
  watch: {
    t_search_query (val) {
      this.pcOnloading = true
      if (!this.awaitingSearchPartnerCompany) {
        if (this.time_out_pc) {
          clearTimeout(this.time_out_pc)
        }
        this.time_out_pc = setTimeout(() => {
          this.searchThirdParty(1)
          this.awaitingSearchPartnerCompany = false
        }, 1000)
      }
      this.awaitingSearchPartnerCompany = true
    }
  },
  methods: {
    checkValidate (key) {
      if (key) {
        return this.validate && this.validate.hasOwnProperty(key)
      }
      return false
    },
    searchThirdParty (page = null, loading = false) {
      if (loading) { this.pcOnloading = loading }
      this.page = 1
      if (page) {
        this.page = page
      }
      this.third_parties = []
      this.pcInfiniteId += 1
      this.getThirdParties()
    },
    getThirdParties: debounce(function ($state) {
      this.$axios.post(this.$base_api + '/api/backend/third-party-company/list', {
        search: this.t_search_query,
        page: this.page,
        number_per_page: this.number_per_page,
        dcid: this.dcid
      }).then(({ data }) => {
        if (!(this.page > data.total_pages)) {
          this.page += 1
          this.third_parties.push(...data.data)
          $state.loaded()
        } else {
          $state.complete()
        }
      }).catch((error) => {
        this.onResponseError(error)
      }).finally(() => {
        this.pcOnloading = false
      })
    }, 500),
    storeThirdParty () {
      this.validate = null
      this.$axios
        .post(this.$base_api + '/api/backend/third-party-company/store-or-edit', {
          name: this.name,
          phone: this.phone
        })
        .then((res) => {
          console.log(res.data.data)
          this.$store.dispatch('package/setThirdParty', {
            _id: res.data.data._id,
            name_en: res.data.data.name_en
          })
          this.cancelCreateThirdParty()
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
        this.$store.dispatch('package/setThirdParty', null)
      }
      this.cancelCreateThirdParty()
    },
    cancelCreateThirdParty () {
      this.create_form = false
      this.name = null
      this.phone = null
      this.t_search_query = null
    },
    selectThirdParty (thirdParty) {
      this.$store.dispatch('package/setThirdParty', thirdParty)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../../assets/scss/components/modal_item";
</style>

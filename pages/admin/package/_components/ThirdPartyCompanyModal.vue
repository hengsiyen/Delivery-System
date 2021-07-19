<template>
  <div
    id="thirdPartyCompanyModal"
    class="modal fade"
    data-backdrop="static"
    tabindex="-1"
    aria-hidden="true"
  >
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
                  <div
                    v-for="(item, key) in third_parties"
                    :key="key"
                    class="third_party_company__item"
                    @click="selectThirdParty(item)"
                  >
                    <i class="fas fa-chevron-right icon-left" />
                    <div>
                      {{ item.name_en }}
                    </div>
                    <template v-if="third_party && third_party._id === item._id">
                      <span class="fa-stack position-absolute icon-right" style="vertical-align: top;">
                        <i class="far fa-circle fa-stack-2x" />
                        <i class="fas fa-circle fa-stack-1x" />
                      </span>
                    </template>
                    <template v-else>
                      <i class="far fa-circle position-absolute icon-right" />
                    </template>
                  </div>
                </template>
                <template v-else>
                  <NoResult />
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
            <button
              type="button"
              class="btn btn-light"
              @click="cancelCreateThirdParty"
            >
              <i class="fas fa-times mr-1" />
              <strong>{{ $t('btn.cancel') }}</strong>
            </button>
            <button
              class="btn btn-success"
              data-dismiss="modal"
              @click="storeThirdParty"
            >
              <i class="fas fa-save mr-1" />
              <strong>{{ $t('btn.save') }}</strong>
            </button>
          </template>
          <template v-else>
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeModel">
              <i class="fas fa-time mr-1" />
              <strong>{{ $t('btn.cancel') }}</strong>
            </button>
            <button type="button" class="btn btn-primary" data-dismiss="modal">
              <i class="fas fa-check-circle mr-1" />
              <strong>{{ $t('btn.ok') }}</strong>
            </button>
          </template>
        </div>
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
      this.$store.dispatch('package/setThirdParty', null)
      this.cancelCreateThirdParty()
    },
    cancelCreateThirdParty () {
      this.create_form = false
      this.name = null
      this.phone = null
    },
    selectThirdParty (thirdParty) {
      this.$store.dispatch('package/setThirdParty', thirdParty)
    }
  }
}
</script>

<style scoped lang="scss">
.third_party_company__items {
  height: calc(100% - 3.5rem);
  overflow-y: auto;
}
.third_party_company__search {
  & .form-control {
    width: 80%;
  }

  & .btn {
    width: 19%;
    margin-left: auto;
  }
}

.third_party_company__item {
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

.third_party_company__onloading {
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

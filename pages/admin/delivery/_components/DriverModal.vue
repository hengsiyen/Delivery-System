<template>
  <div class="modal-dialog modal-dialog-scrollable modal-min-height modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 id="staticBackdropLabel" class="modal-title text-capitalize">
          <i class="fas fa-user-plus mr-2" />
          {{ $t('label.selectDriver') }}
        </h5>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
          @click="selectDriver(null)"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group d-flex shop__search">
          <input
            v-model="search"
            type="search"
            class="form-control"
            :placeholder="$t('label.search') + '...'"
          >
        </div>
        <template v-if="onloading">
          <div class="shop__onloading">
            <i class="fas fa-circle-notch fa-spin" />
          </div>
        </template>
        <template v-else>
          <div class="driver__items">
            <template v-if="list_drivers && list_drivers.length">
              <div class="row">
                <div
                  v-for="(item, key) in list_drivers"
                  :key="key"
                  class="col-lg-6"
                  @click="selectDriver(item)"
                >
                  <div class="driver__item">
                    <div class="driver__image">
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
                      <label class="d-block mb-0"><strong>{{ item.full_name }}</strong></label>
                      <label class="d-block mb-0"><strong>{{ item.phone }}</strong></label>
                    </div>
                    <template v-if="selected_driver && selected_driver._id === item._id">
                      <span
                        class="fa-stack position-absolute icon-right"
                        style="vertical-align: top;"
                      >
                        <i class="far fa-circle fa-stack-2x" />
                        <i class="fas fa-circle fa-stack-1x" />
                      </span>
                    </template>
                    <template v-else>
                      <i class="far fa-circle position-absolute icon-right" />
                    </template>
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
            <infinite-loading spinner="spiral" :identifier="driverInfiniteId" @infinite="getDrivers">
              <div slot="no-more" />
              <div slot="no-results" />
            </infinite-loading>
          </div>
        </template>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-light"
          data-dismiss="modal"
          @click="selectDriver(null)"
        >
          <i class="fas fa-times-circle mr-2" />
          <strong>{{ $t('btn.cancel') }}</strong>
        </button>
        <button
          type="button"
          class="btn btn-primary"
          data-dismiss="modal"
        >
          <i class="fas fa-check-circle mr-2" />
          <strong>{{ $t('btn.assign') }}</strong>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'debounce'
import { mapGetters } from 'vuex'
import NoResult from '@/components/NoResult'

export default {
  name: 'DriverModal',
  components: { NoResult },
  data () {
    return {
      list_drivers: [],
      search: null,
      page: 1,
      driverInfiniteId: +new Date(),
      onloading: false
    }
  },
  computed: {
    ...mapGetters({
      selected_driver: 'delivery/select_driver',
      dcid: 'delivery_company/dcid',
      number_per_page: 'delivery_company/number_per_page'
    })
  },
  watch: {
    search (val) {
      this.onloading = true
      if (!this.awaitingSearch) {
        if (this.time_out) {
          clearTimeout(this.time_out)
        }
        this.time_out = setTimeout(() => {
          this.searchDriver(1)
          this.awaitingSearch = false
        }, 1000)
      }
      this.awaitingSearch = true
    }
  },
  methods: {
    searchDriver (page = null, onloading = false) {
      if (onloading) { this.onloading = true }
      this.page = 1
      if (page) {
        this.page = page
      }
      this.list_drivers = []
      this.driverInfiniteId += 1
      this.getDrivers()
    },
    getDrivers: debounce(function ($state) {
      this.$axios.post(this.$base_api + '/api/backend/user/list-driver', {
        dcid: this.dcid,
        search_query: this.search,
        page: this.page,
        number_per_page: this.number_per_page,
        on_delivery: false
      }).then(({ data }) => {
        if (!(this.page > data.total_pages)) {
          this.page += 1
          this.list_drivers.push(...data.data)
          $state.loaded()
        } else {
          $state.complete()
        }
      }).catch((error) => {
        this.onResponseError(error)
      }).finally(() => {
        this.onloading = false
      })
    }, 500),
    selectDriver (driver) {
      this.$store.dispatch('delivery/setDriver', driver)
    }
  }
}
</script>

<style scoped lang="scss">
.shop__search {
  & .form-control {
    width: 100%;
  }
  & .btn {
    width: 19%;
    margin-left: auto;
  }
}

.driver__items {
  height: calc(100% - 3.5rem);
  overflow-y: auto;
  padding: 0 7.5px;
}

.driver__item {
  background-color: #f8f8f8;
  border-radius: 0.25rem;
  display: flex;
  position: relative;
  margin: 8px 0;
  padding: 15px;
  color: var(--dark);
  width: 100%;
  cursor: pointer;

  &:hover,
  &:focus,
  &:active {
    background-color: #e6e6e6;
  }

  & .driver__image {
    width: 75px;
  }

  & .driver__info {
    width: calc(100% - 75px);
    padding: 8px 16px;
    & label {
      cursor: pointer;
    }
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

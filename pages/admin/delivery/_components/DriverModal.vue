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
        <div class="form-group d-flex driver__search">
          <input
            v-model="search"
            type="search"
            class="form-control"
            :placeholder="$t('label.search') + '...'"
          >
        </div>
        <template v-if="onloading">
          <div class="driver__onloading">
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
                  <div
                    class="modal__item"
                    :class="{'active': selected_driver && selected_driver._id === item._id}"
                  >
                    <div class="modal__image">
                      <template v-if="item.avatar">
                        <img
                          :src="`${baseUrl}/${item.avatar}`"
                          class="img-thumbnail rounded-circle"
                          alt="User Image"
                        >
                      </template>
                      <template v-else>
                        <img
                          :src="avatar"
                          class="img-thumbnail rounded-circle"
                          alt="User Image"
                        >
                      </template>
                    </div>
                    <div class="modal__info">
                      <label class="d-block mb-0"><strong>{{ item.full_name }}</strong></label>
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
@import "../../../../assets/scss/components/modal_item";

</style>

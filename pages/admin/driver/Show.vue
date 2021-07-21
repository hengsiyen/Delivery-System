<template>
  <div class="row">
    <div class="col-lg-4 col-xl-3">
      <div class="card">
        <div class="card-header with-border">
          <h3 class="card-title text-capitalize">
            {{ $t('label.show') }}
          </h3>
        </div>
        <div class="card-body">
          <template v-if="driver_data">
            <div class="row mb-4">
              <div class="col-12">
                <div class="form-group mb-0">
                  <div style="width: 70%;" class="mx-auto mb-4">
                    <template v-if="driver_data.avatar">
                      <img :src="baseUrl + '/' + driver_data.avatar" alt="" class="img-thumbnail">
                    </template>
                    <template v-else>
                      <img src="/img/avatar.png" alt="" class="img-thumbnail">
                    </template>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <dl v-if="driver_data.full_name" class="row">
                  <dt class="col-sm-5 text-capitalize text-truncate">
                    {{ $t('label.name') }}
                  </dt>
                  <dd class="col-sm-7">
                    {{ driver_data.full_name }}
                  </dd>
                </dl>
                <dl v-if="driver_data.phone" class="row">
                  <dt class="col-sm-5 text-capitalize text-truncate">
                    {{ $t('label.phone') }}
                  </dt>
                  <dd class="col-sm-7">
                    {{ driver_data.phone }}
                  </dd>
                </dl>
                <dl v-if="driver_data.gender" class="row">
                  <dt class="col-sm-5 text-capitalize text-truncate">
                    {{ $t('label.gender') }}
                  </dt>
                  <dd class="col-sm-7">
                    {{ driver_data.gender['name_' + $i18n.locale] }}
                  </dd>
                </dl>
                <dl v-if="driver_data.roles" class="row">
                  <dt class="col-sm-5 text-capitalize text-truncate">
                    {{ $t('label.role') }}
                  </dt>
                  <dd class="col-sm-7 user_role">
                    <span v-for="(item, key) in driver_data.roles" :key="key" class="d-block">
                      <i class="fas fa-flag" />
                      {{ item['display_name_' + $i18n.locale] }}
                    </span>
                  </dd>
                </dl>
              </div>
              <div class="col-12">
                <dl v-if="driver_data.packages" class="row">
                  <dt class="col-sm-5 text-capitalize text-truncate">
                    {{ $t('label.delivery_packages') }}
                  </dt>
                  <dd class="col-sm-7">
                    {{ driver_data.packages.length }}
                  </dd>
                </dl>
                <dl class="row">
                  <dt class="col-sm-5 text-capitalize text-truncate">
                    {{ $t('label.total_price') }}
                  </dt>
                  <dd class="col-sm-7">
                    <span class="d-block">{{ total_riel }} KHR</span>
                    <span class="d-block"><small>( {{ parseFloat(total_dollar).toFixed(2) }} USD )</small></span>
                  </dd>
                </dl>
                <dl class="row">
                  <dt class="col-sm-5 text-capitalize text-truncate">
                    {{ $t('label.collect_money_total') }}
                  </dt>
                  <dd class="col-sm-7">
                    <span class="d-block">{{ collect_money_riel }} KHR</span>
                    <span class="d-block"><small>( {{
                      parseFloat(collect_money_dollar).toFixed(2)
                    }} USD )</small></span>
                  </dd>
                </dl>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="col-lg-8 col-xl-9">
      <div class="card">
        <div class="card-header with-border">
          <h3 class="card-title text-capitalize">
            {{ $t('label.package_for_deliver') }}
          </h3>
          <div class="card-tools">
            <ButtonBack />
          </div>
        </div>
        <div class="card-body package__delivery">
          <div v-if="driver_data && driver_data.packages.length" class="row package__delivery-content">
            <div class="col-lg-12 col-xl-6 border-right">
              <div>
                <template v-if="driver_data.packages && driver_data.packages.length">
                  <div
                    v-for="(item, key) in driver_data.packages"
                    :key="key"
                    class="package__item"
                    @click="selectPackage(item)"
                  >
                    <template v-if="item.media">
                      <div>sdfsf</div>
                    </template>
                    <template v-else>
                      <div class="package__item-image">
                        <img src="/img/package.png" alt="" width="100%">
                      </div>
                    </template>
                    <div class="package__item-content">
                      <p><strong>{{ item.code }}</strong></p>
                      <p v-if="item.shop">
                        <i class="fas fa-store mr-2" /> {{ item.shop.name_en }}
                      </p>
                      <p><i class="fas fa-user mr-2" /> {{ item.customer_name }}</p>
                      <p><i class="fas fa-phone fa-rotate-90 mr-2" /> {{ item.customer_phone }}</p>
                      <p><i class="fas fa-map-marker-alt mr-2" /> {{ item.customer_address }}</p>
                      <p v-if="item.partner_company">
                        <i class="fas fa-truck mr-2" />{{ item.partner_company.name_en }}
                      </p>
                      <div class="package__item-badge">
                        <label v-if=" item.payment_type" class="badge badge-success">
                          {{ item.payment_type['name_' + $i18n.locale] }}
                        </label>
                        <label class="badge badge-primary">
                          {{ item.price }} {{ item.currency ? item.currency.symbol : '$' }}
                        </label>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
            <div class="col-lg-12 col-xl-6 h-100">
              <template v-if="pLoading">
                <div class="onloading">
                  <i class="fas fa-circle-notch fa-spin" />
                </div>
              </template>
              <template v-else>
                <template v-if="package_data">
                  <div class="h-100 overflow-auto pl-5 pr-4">
                    <div class="mb-3">
                      <div class="form-group">
                        <h5>Package Info</h5>
                      </div>
                      <dl v-if="package_data.shop" class="row">
                        <dt class="col-lg-4 text-capitalize text-truncate">
                          {{ $t('menu.shop') }}
                        </dt>
                        <dd class="col-lg-8">
                          <NuxtLink :to="{name: 'show-shop', params: {id: package_data.shop._id}}">
                            {{ package_data.shop.name_en }}
                          </NuxtLink>
                        </dd>
                      </dl>
                      <dl class="row">
                        <dt class="col-lg-4 text-capitalize text-truncate">
                          {{ $t('label.code') }}
                        </dt>
                        <dd class="col-lg-8">
                          {{ package_data.code }}
                        </dd>
                      </dl>
                      <dl class="row">
                        <dt class="col-lg-4 text-capitalize text-truncate">
                          {{ $t('label.customer_name') }}
                        </dt>
                        <dd class="col-lg-8">
                          {{ package_data.customer_name }}
                        </dd>
                      </dl>
                      <dl class="row">
                        <dt class="col-lg-4 text-capitalize text-truncate">
                          {{ $t('label.customer_phone') }}
                        </dt>
                        <dd class="col-lg-8">
                          {{ package_data.customer_phone }}
                        </dd>
                      </dl>
                      <dl class="row">
                        <dt class="col-lg-4 text-capitalize text-truncate">
                          {{ $t('label.customer_address') }}
                        </dt>
                        <dd class="col-lg-8">
                          {{ package_data.customer_address }}
                        </dd>
                      </dl>
                      <dl class="row">
                        <dt class="col-lg-4 text-capitalize text-truncate">
                          {{ $t('label.price') }}
                        </dt>
                        <dd class="col-lg-8">
                          {{ package_data.price }}
                          {{ package_data.currency ? package_data.currency.code : 'USD' }}
                        </dd>
                      </dl>
                      <dl class="row">
                        <dt class="col-lg-4 text-capitalize text-truncate">
                          {{ $t('label.status') }}
                        </dt>
                        <dd class="col-lg-8">
                          <span
                            class="badge text-capitalize"
                            :class="package_data.is_paid ? 'badge-success' : 'badge-danger'"
                            style="padding: 6px 10px; font-size: 13px;"
                          >
                            {{ package_data.is_paid ? $t('label.payment_with_order') : $t('label.payment_on_delivery') }}
                          </span>
                        </dd>
                      </dl>
                      <dl v-if="package_data.payment_type" class="row">
                        <dt class="col-lg-4 text-capitalize text-truncate">
                          {{ $t('menu.payment_type') }}
                        </dt>
                        <dd class="col-lg-8">
                          {{ package_data.payment_type['name_' + $i18n.locale] }}
                        </dd>
                      </dl>
                      <dl class="row">
                        <dt class="col-lg-4 text-capitalize text-truncate">
                          {{ $t('menu.package_type') }}
                        </dt>
                        <dd class="col-lg-8">
                          {{
                            package_data.package_type ? package_data.package_type['name_' + $i18n.locale] : 'Package'
                          }}
                        </dd>
                      </dl>
                      <dl v-if="package_data.partner_company" class="row">
                        <dt class="col-lg-4 text-capitalize text-truncate">
                          {{ $t('label.third_party_company') }}
                        </dt>
                        <dd class="col-lg-8">
                          <div>
                            {{ package_data.partner_company.name_en }}
                          </div>
                          <small class="text-muted">{{ package_data.partner_company.phone }}</small>
                        </dd>
                      </dl>
                      <dl class="row">
                        <dt class="col-lg-4 text-capitalize text-truncate">
                          {{ $t('label.note') }}
                        </dt>
                        <dd class="col-lg-8">
                          {{ package_data.note }}
                        </dd>
                      </dl>
                    </div>
                    <template v-if="package_data.package_transitions && package_data.package_transitions.length">
                      <div class="mb-3">
                        <div class="form-group">
                          <h5>Package History</h5>
                        </div>
                        <div class="package_transition">
                          <div class="timeline">
                            <template v-for="(item, key) in package_data.package_transitions">
                              <div :key="key">
                                <i class="fas" :class="statusIcon(item)" />
                                <div class="timeline-item">
                                  <span class="time text-muted"><i class="fas fa-clock" /> {{
                                    $moment(item.created_at).format('llll')
                                  }}</span>
                                  <h3 class="timeline-header border-bottom-0">
                                    <strong>{{ checkStatus(item.status) }}</strong>
                                  </h3>
                                  <div class="timeline-body">
                                    <p v-if="item.user" class="mb-1">
                                      <i class="fas fa-user mr-2" />{{ item.user.full_name }}
                                    </p>
                                    {{ item.description['message_' + $i18n.locale] }}
                                  </div>
                                </div>
                              </div>
                            </template>
                            <div>
                              <i class="fas fa-clock bg-gray" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </template>
                <template v-else>
                  <NoResult />
                </template>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonBack from '@/components/UiElements/ButtonBack'
import NoResult from '@/components/NoResult'

export default {
  name: 'DriverShow',
  components: { NoResult, ButtonBack },
  asyncData (ctx) {
    if (ctx.route.params.id) {
      return ctx.$axios
        .post(ctx.env.VUE_APP_API + '/api/backend/driver/show', {
          id: ctx.route.params.id
        })
        .then((res) => {
          const result = res.data.data
          return {
            driver_data: result
          }
        })
    } else {
      return {
        driver_data: null
      }
    }
  },
  data () {
    return {
      total_riel: 0,
      total_dollar: 0,
      collect_money_riel: 0,
      collect_money_dollar: 0,
      package_data: null,
      pLoading: false
    }
  },
  mounted () {
    this.calculatePrice()
  },
  methods: {
    selectPackage (item) {
      this.pLoading = true
      setTimeout(() => {
        this.package_data = item
        this.pLoading = false
      }, 1500)
    },
    calculatePrice () {
      if (this.driver_data.packages && this.driver_data.packages.length > 0) {
        const packages = this.driver_data.packages
        packages.forEach((item) => {
          let currency = null
          if (item.currency) {
            currency = item.currency
            this.total_riel += this.exchangeMoney(currency.code, 'KHR', item.price)
            this.total_dollar += this.exchangeMoney(currency.code, 'USD', item.price)
            if (!item.is_paid) {
              this.collect_money_riel += this.exchangeMoney(currency.code, 'KHR', item.price)
              this.collect_money_dollar += this.exchangeMoney(currency.code, 'USD', item.price)
            }
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
dl.row {
  border-bottom: 1px solid #dee2e6;
}

.user_role span {
  & i {
    margin-right: 8px;
  }

  &:last-child {
    margin-right: 0;
  }
}

.package__item {
  user-select: none;
  width: 100%;
  padding: 15px;
  background-color: var(--light);
  border-radius: 0.2rem;
  margin-bottom: 15px;
  display: flex;
  position: relative;

  &:hover {
    cursor: pointer;
    background-color: darken(#F8F9FAFF, 3%);
  }

  &-image {
    width: 95px;
  }

  &-content {
    width: calc(100% - 95px);
    padding-left: 25px;
    padding-right: 15px;
    position: relative;

    &.package__selected {
      width: calc(60% - 95px);
    }

    & p {
      margin-bottom: 0;
      font-size: 14px;
      line-height: 1.7;
    }

    & .package__item-badge {
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      align-items: center;

      & label {
        border-radius: 0;
        padding: 4px 8px;

        &:first-child {
          border-bottom-left-radius: 0.25rem;
          border-top-left-radius: 0.25rem;
        }

        &:last-child {
          border-bottom-right-radius: 0.25rem;
          border-top-right-radius: 0.25rem;
        }
      }
    }
  }

  &-form {
    width: 35%;
    margin-left: auto;

    & .form-group:last-child {
      margin-bottom: 0;
    }
  }
}

.package__delivery {
  height: calc(100vh - 260px);

  &-content {
    height: 100%;
  }
}
</style>

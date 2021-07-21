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
              :to="{name: 'edit-package', params: {id: this.$route.params.id}}"
            >
              <i class="fas fa-edit mr-1" />
              <strong>{{ $t('button.edit') }}</strong>
            </NuxtLink>
            <ButtonBack />
          </div>
        </div>
        <div class="card-body">
          <div v-if="package_data" class="row">
            <div class="col-lg-7">
              <dl v-if="package_data.shop" class="row">
                <dt class="col-sm-3 text-capitalize text-truncate">
                  {{ $t('menu.shop') }}
                </dt>
                <dd class="col-sm-9">
                  <NuxtLink :to="{name: 'shop-shop', params: {id: package_data.shop._id}}">
                    {{ package_data.shop.name_en }}
                  </NuxtLink>
                </dd>
              </dl>
              <dl class="row">
                <dt class="col-sm-3 text-capitalize text-truncate">
                  {{ $t('label.code') }}
                </dt>
                <dd class="col-sm-9">
                  {{ package_data.code }}
                </dd>
              </dl>
              <dl class="row">
                <dt class="col-sm-3 text-capitalize text-truncate">
                  {{ $t('label.customer_name') }}
                </dt>
                <dd class="col-sm-9">
                  {{ package_data.customer_name }}
                </dd>
              </dl>
              <dl class="row">
                <dt class="col-sm-3 text-capitalize text-truncate">
                  {{ $t('label.customer_phone') }}
                </dt>
                <dd class="col-sm-9">
                  {{ package_data.customer_phone }}
                </dd>
              </dl>
              <dl class="row">
                <dt class="col-sm-3 text-capitalize text-truncate">
                  {{ $t('label.customer_address') }}
                </dt>
                <dd class="col-sm-9">
                  {{ package_data.customer_address }}
                </dd>
              </dl>
              <dl class="row">
                <dt class="col-sm-3 text-capitalize text-truncate">
                  {{ $t('label.price') }}
                </dt>
                <dd class="col-sm-9">
                  {{ package_data.price }}
                  {{ package_data.currency ? package_data.currency.code : 'USD' }}
                </dd>
              </dl>
              <dl class="row">
                <dt class="col-sm-3 text-capitalize text-truncate">
                  {{ $t('label.status') }}
                </dt>
                <dd class="col-sm-9">
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
                <dt class="col-sm-3 text-capitalize text-truncate">
                  {{ $t('menu.payment_type') }}
                </dt>
                <dd class="col-sm-9">
                  {{ package_data.payment_type['name_' + $i18n.locale] }}
                </dd>
              </dl>
              <dl class="row">
                <dt class="col-sm-3 text-capitalize text-truncate">
                  {{ $t('menu.package_type') }}
                </dt>
                <dd class="col-sm-9">
                  {{ package_data.package_type ? package_data.package_type['name_' + $i18n.locale] : 'Package' }}
                </dd>
              </dl>
              <dl v-if="package_data.partner_company" class="row">
                <dt class="col-sm-3 text-capitalize text-truncate">
                  {{ $t('label.third_party_company') }}
                </dt>
                <dd class="col-sm-9">
                  {{ package_data.partner_company.name_en }} ( {{ package_data.partner_company.phone }} )
                </dd>
              </dl>
              <dl class="row">
                <dt class="col-sm-3 text-capitalize text-truncate">
                  {{ $t('label.note') }}
                </dt>
                <dd class="col-sm-9">
                  {{ package_data.note }}
                </dd>
              </dl>
            </div>
            <div class="col-lg-5 position-relative">
              <template v-if="show_package_history">
                <div class="package_history" :class="{'active': show_package_history}">
                  <template v-if="package_data.package_histories && package_data.package_histories.length">
                    <div class="mb-4 d-flex align-items-center justify-content-between">
                      <div><h5>Package History</h5></div>
                      <div>
                        <button class="btn btn-link text-dark" @click="show_package_history = false">
                          <i class="fas fa-times" />
                        </button>
                      </div>
                    </div>
                    <div class="timeline">
                      <template v-for="(item, key) in package_data.package_histories">
                        <div :key="key">
                          <i class="fas" :class="historyIcon(item)" />
                          <div class="timeline-item">
                            <span class="time text-muted"><i class="fas fa-clock" /> {{
                              $moment(item.created_at).format('llll')
                            }}</span>
                            <h3 v-if="item.user" class="timeline-header border-bottom-0">
                              <strong>{{ item.user.full_name }}</strong>
                            </h3>
                            <div class="timeline-body">
                              <div>
                                <p class="mb-1">
                                  {{ $t('label.customer_name') }}: {{ item.data.customer_name }}
                                </p>
                                <p class="mb-1">
                                  {{ $t('label.customer_phone') }}: {{ item.data.customer_phone }}
                                </p>
                                <p class="mb-1">
                                  {{ $t('label.customer_address') }}: {{ item.data.customer_address }}
                                </p>
                                <p class="mb-1">
                                  {{ $t('label.price') }}: {{ item.data.price }}
                                </p>
                                <hr class="my-2">
                                <div v-html="handleNewLine(item.description[$i18n.locale])">
                                  {{ }}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </template>
                      <div>
                        <i class="fas fa-clock bg-gray" />
                      </div>
                    </div>
                  </template>
                </div>
              </template>
              <template v-else>
                <template v-if="package_data.package_transitions && package_data.package_transitions.length">
                  <div class="package_transition">
                    <div class="mb-4 d-flex align-items-center justify-content-between">
                      <div><h5>Package Transition</h5></div>
                      <div>
                        <button class="btn btn-default" @click="show_package_history = !show_package_history">
                          <i class="fas fa-history mr-1" />
                          <strong>Package History</strong>
                        </button>
                      </div>
                    </div>
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
                                <i class="fas fa-user mr-2"></i>{{ item.user.full_name }}
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

export default {
  name: 'PackageShow',
  components: { ButtonBack },
  asyncData (ctx) {
    if (ctx.route.params.id) {
      return ctx.$axios
        .post(ctx.env.VUE_APP_API + '/api/backend/package/show', {
          id: ctx.route.params.id
        })
        .then((res) => {
          const result = res.data.data
          return {
            package_data: result
          }
        })
    } else {
      return {
        package_data: null
      }
    }
  },
  data () {
    return {
      show_package_history: false
    }
  }
}
</script>

<style scoped>
.package_transition,
.package_history {
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 0.25rem;
}

.package_history {
  opacity: 0;
}

.package_history.active {
  opacity: 1;
}
</style>

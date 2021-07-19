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
            <div class="col-lg-8">
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
          console.log(result)
          return {
            package_data: result
          }
        })
    } else {
      return {
        package_data: null
      }
    }
  }
}
</script>

<style scoped>

</style>

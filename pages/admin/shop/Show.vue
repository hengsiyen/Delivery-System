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
        <div class="card-body">
          <div v-if="shop" class="row">
            <div class="col-lg-8">
              <dl class="row">
                <dt class="col-sm-3 text-capitalize text-truncate">
                  {{ $t('label.shop_name') }}
                </dt>
                <dd class="col-sm-9">
                  {{ shop.name_en }}
                  <span class="ml-3 badge" :class="shop.enabled ? 'badge-success' : 'badge-danger'">
                    {{ shop.enabled ? $t('label.enable') : $t('label.disable') }}
                  </span>
                </dd>
              </dl>
              <dl class="row">
                <dt class="col-sm-3 text-capitalize text-truncate">
                  {{ $t('label.owner_name') }}
                </dt>
                <dd class="col-sm-9">
                  {{ shop.owner_name }}
                </dd>
              </dl>
              <dl class="row">
                <dt class="col-sm-3 text-capitalize text-truncate">
                  {{ $t('label.code') }}
                </dt>
                <dd class="col-sm-9">
                  {{ shop.code }}
                </dd>
              </dl>
              <dl class="row">
                <dt class="col-sm-3 text-capitalize text-truncate">
                  {{ $t('label.phone') }}
                </dt>
                <dd class="col-sm-9">
                  {{ shop.phone }}
                </dd>
              </dl>
              <dl class="row">
                <dt class="col-sm-3 text-capitalize text-truncate">
                  {{ $t('label.email') }}
                </dt>
                <dd class="col-sm-9">
                  {{ shop.email }}
                </dd>
              </dl>
              <dl class="row">
                <dt class="col-sm-3 text-capitalize text-truncate">
                  {{ $t('label.address') }}
                </dt>
                <dd class="col-sm-9">
                  {{ shop['address_' + $i18n.locale] }}
                </dd>
              </dl>
              <dl class="row">
                <dt class="col-sm-3 text-capitalize text-truncate">
                  {{ $t('label.description') }}
                </dt>
                <dd class="col-sm-9">
                  {{ shop.description }}
                </dd>
              </dl>
            </div>
            <div class="col-lg-4">
              <div v-if="shop.logo" class="w-100 text-center form-group mb-5">
                <label class="d-block text-capitalize">{{ $t('label.shop_logo') }}</label>
                <div>
                  <img :src="base_api + '/' + shop.logo" alt="" class="img-thumbnail">
                </div>
              </div>
              <div v-if="shop.avatar" class="w-100 text-center form-group">
                <label class="d-block text-capitalize">{{ $t('label.shop_owner') }}</label>
                <div>
                  <img :src="base_api + '/' + shop.avatar" alt="" class="img-thumbnail">
                </div>
              </div>
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
  name: 'ShopShow',
  components: { ButtonBack },
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
      base_api: this.$base_api
    }
  }
}
</script>

<style scoped>

</style>

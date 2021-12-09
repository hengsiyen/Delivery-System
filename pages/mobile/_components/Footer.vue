<template>
  <div class="mobile-footer border-top">
    <ul class="nav nav-pills justify-content-between w-100 mx-auto">
      <li v-for="(item, key) in menu" :key="key" class="nav-item d-flex flex-column align-items-center justify-content-center">
        <NuxtLink
          class="nav-link text-center py-0 line-1-2"
          :to="item.route"
          :class="{'text-primary': $route.meta.groups === item.route.groups}"
        >
          <p class="mb-0">
            <i :class="item.icon" />
          </p>
          <small class="mb-0" :class="$route.meta.groups === item.route.groups ? 'd-block' : 'd-none'">
            {{ item.label }}
          </small>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'FooterMobile',
  data () {
    return {
      menu: [
        {
          label: this.$t('menu.shop'),
          route: { name: 'mobile-shop-list', groups: 'mobile-shop' },
          icon: 'fas fa-store'
        },
        {
          label: this.$t('label.assigned'),
          route: { name: 'mobile-assigned-list-package', groups: 'mobile-assigned' },
          icon: 'fas fa-user-check'
        },
        {
          label: this.$t('menu.delivery'),
          route: { name: 'mobile-delivery-list-package', groups: 'mobile-delivery' },
          icon: 'fas fa-motorcycle'
        },
        {
          label: this.$t('menu.history'),
          route: { name: 'mobile-delivery-history-show', groups: 'mobile-delivery-history' },
          icon: 'fas fa-history'
        }
      ]
    }
  }
}
</script>

<style scoped>
.mobile-footer {
  height: 57px;
  position: fixed;
  background: white;
  width: 100%;
  z-index: 1000;
  display: block;
  bottom: 0;
  left: 0;
  padding: 8px;
}

.line-1-2 {
  line-height: 1.2;
}
</style>

<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <NuxtLink
      :to="{name: 'admin'}"
      class="brand-link"
    >
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="44" height="44" fill="white" />
        <path d="M26.1738 25.9277V20.8828C26.1738 20.1914 26.0391 19.541 25.7695 18.9316C25.5117 18.3105 25.1543 17.7715 24.6973 17.3145C24.2402 16.8574 23.7012 16.5 23.0801 16.2422C22.4707 15.9727 21.8203 15.8379 21.1289 15.8379C20.4375 15.8379 19.7812 15.9727 19.1602 16.2422C18.5508 16.5 18.0176 16.8574 17.5605 17.3145C17.1035 17.7715 16.7402 18.3105 16.4707 18.9316C16.2129 19.541 16.084 20.1914 16.084 20.8828V25.9277H26.1738ZM31.2188 36H26.1738V30.9551H16.084V36H11.0566V20.8828C11.0566 19.4883 11.3203 18.1816 11.8477 16.9629C12.375 15.7324 13.0898 14.6602 13.9922 13.7461C14.9062 12.832 15.9727 12.1113 17.1914 11.584C18.4219 11.0566 19.7344 10.793 21.1289 10.793C22.5234 10.793 23.8301 11.0566 25.0488 11.584C26.2793 12.1113 27.3516 12.832 28.2656 13.7461C29.1797 14.6602 29.9004 15.7324 30.4277 16.9629C30.9551 18.1816 31.2188 19.4883 31.2188 20.8828V36Z" fill="black" />
      </svg>
      <span class="brand-text font-weight-light">{{ appName }}</span>
    </NuxtLink>

    <div class="sidebar">
      <sidebar-user />
      <nav
        class="mt-2"
        data-widget="treeview"
        role="menu"
        data-accordion="false"
      >
        <ul class="nav nav-pills nav-sidebar flex-column">
          <template v-for="(menu, key) in menus">
            <template v-if="menu.route === null && menu.children === null">
              <template v-if="can(menu.permissions) && hasRoles(menu.roles)">
                <li :key="key" class="nav-header">
                  {{ menu.label }}
                </li>
              </template>
            </template>
            <template v-else-if="menu.route !== null && menu.children === null">
              <template v-if="can(menu.permissions) && hasRoles(menu.roles)">
                <li
                  :key="key"
                  class="nav-item"
                >
                  <nuxt-link
                    class="nav-link"
                    :class="{active: $route.meta.groups === menu.route.groups}"
                    :to="menu.route"
                  >
                    <i class="nav-icon" :class="menu.icon" />
                    <p>{{ menu.label }}</p>
                  </nuxt-link>
                </li>
              </template>
            </template>
            <template v-else>
              <template v-if="can(menu.permissions) && hasRoles(menu.roles)">
                <sidebar-tree :key="key" :menu="menu" />
              </template>
            </template>
          </template>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script>
import SidebarUser from '@/components/Layouts/SidebarUser'
import SidebarTree from '@/components/Layouts/SidebarTree'

export default {
  name: 'Sidebar',
  components: {
    SidebarTree,
    SidebarUser
  },
  computed: {
    menus () {
      return [
        {
          label: this.$t('menu.dashboard'),
          route: null,
          icon: null,
          children: null,
          permissions: [this.$Permissions.backend.manage]
        },
        {
          label: this.$t('menu.dashboard'),
          route: { name: 'admin', groups: 'dashboard' },
          icon: 'nav-icon fas fa-tachometer-alt',
          children: null,
          permissions: [this.$Permissions.backend.manage]
        },
        {
          label: this.$t('menu.package'),
          route: { name: 'list-package', groups: 'package' },
          icon: 'nav-icon fa fa-cube',
          children: null,
          permissions: [this.$Permissions.backend.package.manage]
        },
        {
          label: this.$t('menu.delivery'),
          route: { name: 'assign-package', groups: 'delivery' },
          icon: 'nav-icon fas fa-truck',
          children: null,
          permissions: [this.$Permissions.backend.delivery.manage]
        },
        {
          label: this.$t('menu.driver'),
          route: { name: 'list-driver', groups: 'driver' },
          icon: 'nav-icon fas fa-motorcycle',
          children: null,
          permissions: [this.$Permissions.backend.driver.manage]
        },
        {
          label: this.$t('menu.shop'),
          route: { name: 'list-shop', groups: 'shop' },
          icon: 'nav-icon fas fa-building',
          children: null,
          permissions: [this.$Permissions.backend.shop.manage]
        },
        {
          label: this.$t('menu.system'),
          route: null,
          icon: null,
          children: null,
          permissions: [this.$Permissions.backend.setting.manage]
        },
        {
          label: this.$t('menu.settings'),
          route: null,
          icon: 'nav-icon fas fa-cog',
          permissions: [this.$Permissions.backend.setting.manage],
          children: [
            {
              label: this.$t('menu.package_type'),
              route: { name: 'list-package-type', groups: 'package-type' },
              permissions: [this.$Permissions.backend.setting.packageType.list]
            },
            {
              label: this.$t('menu.payment_type'),
              route: { name: 'list-payment-type', groups: 'payment-type' },
              permissions: [this.$Permissions.backend.setting.paymentType.list]
            },
            {
              label: this.$t('menu.exchange_rate'),
              route: { name: 'list-exchange-rate', groups: 'exchange-rate' },
              permissions: [this.$Permissions.backend.setting.exchangeRate.list]
            },
            {
              label: this.$t('menu.currency'),
              route: { name: 'list-currency', groups: 'currency' },
              permissions: [this.$Permissions.backend.setting.currency.list]
            },
            {
              label: this.$t('menu.gender'),
              route: { name: 'list-gender', groups: 'gender' },
              permissions: [this.$Permissions.backend.setting.gender.list]
            },
            {
              label: this.$t('menu.province'),
              route: { name: 'list-province', groups: 'province' },
              permissions: [this.$Permissions.backend.setting.province.list]
            },
            {
              label: this.$t('menu.district'),
              route: { name: 'list-district', groups: 'district' },
              permissions: [this.$Permissions.backend.setting.district.list]
            },
            {
              label: this.$t('menu.commune'),
              route: { name: 'list-commune', groups: 'commune' },
              permissions: [this.$Permissions.backend.setting.commune.list]
            },
            {
              label: this.$t('menu.village'),
              route: { name: 'list-village', groups: 'village' },
              permissions: [this.$Permissions.backend.setting.village.list]
            }
          ]
        },
        {
          label: this.$t('menu.administration'),
          route: null,
          icon: 'nav-icon fa fa-code',
          permissions: [this.$Permissions.backend.administration.manage],
          children: [
            {
              label: this.$t('menu.user'),
              route: { name: 'list-user', groups: 'user' },
              permissions: [this.$Permissions.backend.administration.user.list]
            },
            {
              label: this.$t('menu.role'),
              route: { name: 'list-role', groups: 'role' },
              permissions: [this.$Permissions.backend.administration.role.list]
            },
            {
              label: this.$t('menu.permission'),
              route: { name: 'list-permission', groups: 'permission' },
              permissions: [this.$Permissions.backend.administration.permission.list]
            }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>

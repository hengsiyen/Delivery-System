<template>
  <aside class="main-sidebar">
    <section class="sidebar">
      <sidebar-user />
      <ul class="sidebar-menu">
        <template v-for="(menu, key) in menus">
          <template v-if="menu.route === null && menu.children === null">
            <template v-if="can(menu.permissions) && hasRoles(menu.roles)">
              <li :key="key" class="header">
                {{ menu.label }}
              </li>
            </template>
          </template>
          <template v-else-if="menu.route !== null && menu.children === null">
            <template v-if="can(menu.permissions) && hasRoles(menu.roles)">
              <li :key="key" :class="{active: $route.meta.groups === menu.route.groups}">
                <nuxt-link :to="menu.route">
                  <i :class="menu.icon" /> <span>{{ menu.label }}</span>
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
    </section>
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
          icon: 'fa fa-home',
          children: null,
          permissions: [this.$Permissions.backend.manage]
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
          icon: 'fa fa-cogs',
          permissions: [this.$Permissions.backend.setting.manage],
          children: [
            {
              label: this.$t('menu.gender'),
              route: { name: 'list-gender', groups: 'gender' },
              permissions: [this.$Permissions.backend.setting.gender.list]
            }
          ]
        },
        {
          label: this.$t('menu.administration'),
          route: null,
          icon: 'fa fa-code',
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

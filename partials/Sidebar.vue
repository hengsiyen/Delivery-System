<template>
  <aside class="main-sidebar">
    <section class="sidebar">
      <sidebar-user />
      <sidebar-search />
      <ul class="sidebar-menu" data-widget="tree">
        <template v-for="(menu, key) in menus">
          <template v-if="menu.route === null && menu.children === null">
            <li :key="key" class="header">
              {{ menu.label }}
            </li>
          </template>
          <template v-else-if="menu.route !== null && menu.children === null">
            <li :key="key">
              <nuxt-link :to="menu.route">
                <i :class="menu.icon" /> <span>{{ menu.label }}</span>
              </nuxt-link>
            </li>
          </template>
          <template v-else>
            <sidebar-tree :key="key" :menu="menu" />
          </template>
        </template>
      </ul>
    </section>
  </aside>
</template>

<script>
import SidebarUser from '@/components/SidebarUser'
import SidebarSearch from '@/components/SidebarSearch'
import SidebarTree from '@/components/SidebarTree'
export default {
  name: 'Sidebar',
  components: {
    SidebarTree,
    SidebarSearch,
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
          permissions: []
        },
        {
          label: this.$t('menu.dashboard'),
          route: { name: 'admin' },
          icon: 'fa fa-home',
          children: null,
          permissions: []
        },
        {
          label: this.$t('menu.system'),
          route: null,
          icon: null,
          children: null,
          permissions: []
        },
        {
          label: this.$t('menu.settings'),
          route: null,
          icon: 'fa fa-cogs',
          permissions: [],
          children: [
            {
              label: this.$t('menu.user'),
              route: { name: 'admin-settings-user' },
              permissions: []
            },
            {
              label: this.$t('menu.role'),
              route: { name: 'admin-settings-role' },
              permissions: []
            },
            {
              label: this.$t('menu.permission'),
              route: { name: 'admin-settings-permission' },
              permissions: []
            },
            {
              label: this.$t('menu.gender'),
              route: { name: 'admin-settings-gender' },
              permissions: []
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

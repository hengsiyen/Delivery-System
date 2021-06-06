<template>
  <li
    v-if="menu"
    class="nav-item"
    :class="{ 'menu-open menu-is-opening': opened }"
  >
    <a
      href="#"
      class="nav-link"
      :class="{'active': allGroups.includes($route.meta.groups)}"
    >
      <i :class="menu.icon" />
      <p>
        {{ menu.label }}
        <i class="right fas fa-angle-left" />
      </p>
    </a>
    <ul class="nav nav-treeview" :style="opened ? 'display: block' : 'display: none'">
      <template v-if="menu.children">
        <template v-for="(child, key) in menu.children">
          <template v-if="can(child.permissions) && hasRoles(child.roles)">
            <template v-if="child.route.hasOwnProperty('groups') && $route.meta.hasOwnProperty('groups')">
              <li
                :key="key"
                class="nav-item"
              >
                <nuxt-link
                  :class="{active: $route.meta.groups === child.route.groups}"
                  class="nav-link"
                  :to="child.route"
                >
                  <i class="nav-icon far fa-circle nav-icon" />
                  <p>{{ child.label }}</p>
                </nuxt-link>
              </li>
            </template>
            <template v-else>
              <li
                :key="key"
                class="nav-item"
                :class="{active: $route.name === child.route.name}"
              >
                <nuxt-link
                  class="nav-link"
                  :to="child.route"
                >
                  <i class="nav-icon far fa-circle nav-icon" />
                  <p>{{ child.label }}</p>
                </nuxt-link>
              </li>
            </template>
          </template>
        </template>
      </template>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'SidebarTree',
  props: {
    menu: {
      type: Object,
      required: true
    }
  },
  computed: {
    opened () {
      try {
        return this.menu.children.some(child => child.route.groups === this.$route.meta.groups)
      } catch (e) {
        return this.menu.children.some(child => child.route.name === this.$route.name)
      }
    },
    allGroups () {
      if (this.menu && this.menu.children && Array.isArray(this.menu.children)) {
        return this.menu.children.map(m => m.route && m.route.groups ? m.route.groups : null).filter(Boolean)
      }
      return []
    }
  }
}
</script>

<style scoped>

</style>

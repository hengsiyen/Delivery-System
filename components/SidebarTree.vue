<template>
  <li v-if="menu" class="treeview" :class="{'menu-open': opened}">
    <a><i :class="menu.icon" /> <span>{{ menu.label }}</span>
      <span class="pull-right-container">
        <i class="fa fa-angle-left pull-right" />
      </span>
    </a>
    <ul class="treeview-menu" :style="opened ? 'display: block' : 'display: none'">
      <template v-if="menu.children">
        <template v-for="(child, key) in menu.children">
          <li :key="key">
            <nuxt-link :to="child.route">
              {{ child.label }}
            </nuxt-link>
          </li>
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
      return this.menu.children.some(child => child.route.name === this.$route.name)
    }
  }
}
</script>

<style scoped>

</style>

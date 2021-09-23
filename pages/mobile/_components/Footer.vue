<template>
  <div class="mobile-footer border-top">
    <ul class="nav nav-pills justify-content-between w-75 mx-auto">
      <li class="nav-item">
        <NuxtLink class="nav-link text-center py-0 line-1-2" :to="{name: 'mobile-shop-list'}">
          <p class="mb-0"><i class="fas fa-store" /></p>
          <small class="mb-0">{{ $t('menu.shop') }}</small>
        </NuxtLink>
      </li>
      <li class="nav-item">
        <NuxtLink class="nav-link text-center py-0 line-1-2" :to="{name: 'mobile-assigned-list-package'}">
          <p class="mb-0"><i class="fas fa-user-check" /></p>
          <small class="mb-0">{{ $t('label.assigned') }}</small>
        </NuxtLink>
      </li>
      <li class="nav-item">
        <NuxtLink class="nav-link text-center py-0 line-1-2" :to="{name: 'mobile-delivery-list-package'}">
          <p class="mb-0"><i class="fas fa-motorcycle" /></p>
          <small class="mb-0">{{ $t('menu.delivery') }}</small>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FooterMobile'
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
  width: 96px;
}
</style>

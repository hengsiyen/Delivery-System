<template>
  <div class="shop_card">
    <div class="shop-card-header">
      <div class="shop_card-icon" :class="iconClass">
        <i :class="icon" />
      </div>
      <div class="shop_card-title">
        {{ title }}
      </div>
    </div>
    <div class="shop_card-content">
      <div class="shop_card-value">
        {{ cardValue }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'fa fa-cube'
    },
    iconClass: {
      type: String,
      default: null
    },
    cardValue: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | Number,
      default: null
    }
  }
}
</script>

<style scoped lang="scss">
.shop_card {
  width: 100%;
  height: 145px;
  border-radius: 0.25rem;
  box-shadow: 0 4px 6px 1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 20px;
  & .shop-card-header {
    display: flex;
    width: 100%;
    align-items: center;
    & .shop_card-icon {
      width: 40px;
      height: 40px;
      border-radius: 0.5rem;
      background-color: #6c757d;
      display: flex;
      align-items: center;
      justify-content: center;
      & i {
        color: white;
      }
    }
    & .shop_card-title {
      width: calc(100% - 40px);
      padding-left: 20px;
      font-size: 15pxpx;
      font-weight: 700;
      height: 56px;
      display: flex;
      align-items: center;
    }
  }
  & .shop_card-content {
    margin-top: 15px;
    & .shop_card-value {
      font-size: 2.5rem;
      line-height: 1;
    }
  }
}
</style>

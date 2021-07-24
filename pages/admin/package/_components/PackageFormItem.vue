<template>
  <div class="package_form-item">
    <div class="package_form-item-content">
      <div class="package_form-item-content-icon">
        <i :class="icon" />
      </div>
      <div class="package_form-item-content-label w-100 text-truncate">
        <template v-if="isLink">
          <NuxtLink :to="dataLabelLink">
            <strong>{{ dataLabel }}</strong>
          </NuxtLink>
        </template>
        <template v-else>
          <strong>{{ dataLabel }}</strong>
        </template>
      </div>
    </div>
    <div class="package_form-item-edit text-right">
      <button class="btn btn-link btn-sm pr-0" @click="edit">
        <i class="fas fa-edit mr-2" />
        {{ $t('btn.edit') }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PackageFormItem',
  props: {
    dataLabel: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    isLink: {
      type: Boolean,
      default: false
    },
    dataLabelLink: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  methods: {
    edit () {
      this.$emit('onClickEdit')
    }
  }
}
</script>

<style scoped lang="scss">
.package_form-item {
  display: flex;
  align-items: center;
  border-bottom: 2px solid lightgray;
  width: 100%;
  padding: 0 0 8px;

  &-content {
    display: flex;
    align-items: center;
    width: calc(100% - 100px);

    &-icon {
      width: 25px;
      text-align: center;
      margin-right: 8px;
    }
  }
}

.package_form-item-edit {
  width: 95px;
  margin-left: auto;
}
</style>

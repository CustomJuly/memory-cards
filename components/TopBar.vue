<template>
  <header class="topbar">
    <div class="topbar__left">
      <template v-if="!hideBackBtn">
        <slot name="left">
          <NavBarBack />
        </slot>
      </template>
    </div>
    <div class="topbar__center">
      <span class="truncate">
        <slot />
      </span>
    </div>
    <div class="topbar__right">
      <slot name="right" />
    </div>
  </header>
</template>

<script>
export default {
  name: 'TopBar',
  props: {
    hideBackBtn: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/vars';

.topbar {
  flex: none;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  border-bottom: 1px solid $color-gray-light;
  user-select: none;
  gap: 10px;

  &__left,
  &__center,
  &__right {
    display: flex;
    align-items: center;
    flex: 1;
  }

  &__left,
  &__right {
    color: $color-primary;
    overflow: hidden;

    &:hover {
      color: $color-primary-darker;
    }
  }

  &__left {
    justify-content: flex-start;
  }

  &__center {
    justify-content: center;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    white-space: nowrap;
  }

  &__right {
    justify-content: flex-end;
  }
}
</style>

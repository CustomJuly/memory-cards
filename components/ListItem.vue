<template>
  <div
    class="li"
    @click="editing ? $emit('input', !value) : $emit('click')"
  >
    <Checkbox
      v-if="editing"
      :value="value"
      class="mr-16"
    />
    <div class="li__content">
      <span class="li__text">
        <slot />
      </span>
      <span v-if="typeof badge !== 'undefined'" class="li__badge">
        {{ badge }}
      </span>
    </div>
    <svg-icon name="arrow-down-s-line" class="li__icon" />
  </div>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    editing: {
      type: Boolean,
      required: false,
      default: false
    },
    value: {
      type: Boolean,
      required: false,
      default: false
    },
    badge: {
      type: [String, Number],
      required: false,
      default: undefined
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/vars';

.li {
  height: 48px;
  display: flex;
  align-items: center;
  color: $color-black;
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
  padding: 0 12px;
  border-bottom: 1px solid $color-sky-lighter;
  user-select: none;
  cursor: pointer;

  &:active {
    background: $color-sky-lighter;
  }

  &:last-child {
    border-bottom: none;
  }

  &__content {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 18px;
    overflow: hidden;
  }

  &__text {
    width: 100%;
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &__badge {
    flex: none;
    display: flex;
    justify-content: center;
    align-items: center;
    background: $color-pink;
    min-width: 22px;
    line-height: 14px;
    color: white;
    font-size: 12px;
    font-weight: 500;
    border-radius: 11px;
    margin-left: 12px;
    padding: 4px 8px;
  }

  &__line {
    background-color: $color-pink;
    height: 100%;
    width: 2px;
  }

  &__icon {
    width: 24px;
    height: 24px;
    transform: rotate(-90deg);
  }
}
</style>

<template>
  <div
    class="checkbox"
    :class="{ 'checkbox--checked': value }"
    @click="$emit('input', !value)"
  />
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    value: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/vars';

.checkbox {
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border: 1px solid $color-sky-dark;

  &--checked {
    border-color: $color-primary;
    background: $color-primary;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 2px;
      left: 7px;
      width: 6px;
      height: 12px;
      border-bottom: 2px solid white;
      border-right: 2px solid white;
      transform: rotate(45deg);
    }
  }
}
</style>

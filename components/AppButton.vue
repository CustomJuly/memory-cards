<template>
  <button
    :class="['btn', `btn--${type}`, { 'btn--wide': wide }]"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    type: {
      type: String,
      required: false,
      default: 'primary',
      validator (type) {
        return ['primary', 'secondary'].includes(type)
      }
    },
    wide: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/vars';

.btn {
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;


  &--primary {
    color: white;
    background: $color-primary;

    &:hover {
      background: $color-primary-dark;
    }
  }

  &--secondary {
    color: $color-primary;
    background: white;

    &:hover {
      background: $color-primary-lightest;
    }
  }

  &--wide {
    width: 100%;
  }
}
</style>

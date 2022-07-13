<template>
  <div class="label" @click="$emit('click')">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AppLabel'
}
</script>

<style lang="scss" scoped>
@import '~assets/vars';

.label {
  padding: 6px 8px;
  border-radius: 6px;
  color: $color-primary;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;

  &:hover {
    color: $color-primary;
    background: $color-primary-lightest;
  }
}
</style>

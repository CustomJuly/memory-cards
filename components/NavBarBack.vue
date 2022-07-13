<template>
  <div class="back" @click="$router.back()">
    <svg-icon name="arrow-down-s-line" class="back__icon rotate-90" />
    <span class="truncate">
      {{ $t('back') }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'NavBarBack'
}
</script>

<style lang="scss" scoped>
@import '~assets/vars';

.back {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  color: $color-primary;
  overflow: hidden;

  &:hover {
    color: $color-primary-darker;
  }

  &__icon {
    width: 24px;
    height: 24px;
  }
}
</style>

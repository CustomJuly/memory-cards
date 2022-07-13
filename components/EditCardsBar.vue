<template>
  <div class="bar">
    <div class="bar__content">
      <div
        class="bar__item"
        @click="$emit('move-to', $event)"
      >
        {{ $t('Move To...') }}
      </div>
      <div
        class="bar__item"
        @click="$emit('delete', $event)"
      >
        {{ $t('Delete...') }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditCardsBar"
}
</script>

<style lang="scss" scoped>
@import '~assets/vars';

.bar {
  color: $color-primary;
  width: 100%;

  &__content {
    display: flex;
    justify-content: space-between;
    min-width: 320px;
    max-width: 512px;
    margin: 0 auto;
    padding: 0 18px;
    background: white;
  }

    &__item {
      height: 56px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &:hover {
        color: $color-primary-darker;
      }
    }
  }

</style>

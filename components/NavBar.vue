<template>
  <div class="bar">
    <div class="bar__content">
      <NuxtLink :to="localePath('/decks')" class="bar__item">
        <svg-icon name="stack" class="bar__icon" />
      </NuxtLink>
      <NuxtLink :to="localePath('/')" class="bar__item">
        <svg-icon name="dice" class="bar__icon" />
      </NuxtLink>
      <NuxtLink :to="localePath('/profile')" class="bar__item">
        <svg-icon name="user-line" class="bar__icon" />
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style lang="scss" scoped>
@import '~assets/vars';

.bar {
  //position: fixed;
  //bottom: 0;
  //left: 0;
  width: 100%;
  z-index: 7;

  &__content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    min-width: 320px;
    max-width: 512px;
    margin: 0 auto;
    padding: 0 18px;
    box-shadow: 0px -1px 1px rgba(20, 20, 20, 0.02), 0px -2px 8px rgba(20, 20, 20, 0.04);
    background: white;
  }

  &__item {
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;

    &.nuxt-link-exact-active .bar__icon {
      color: $color-primary;
    }
  }

  &__icon {
    width: 24px;
    height: 24px;
    color: $color-sky-dark;

    &:hover {
      color: $color-primary;
    }
  }
}
</style>

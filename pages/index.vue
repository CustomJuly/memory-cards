<template>
  <div class="index"
       @click="$emit('click')"
  >
    <div class="index__background">
      <img
        class="index__background--img"
        src="/Image.png"
        alt="img-background"
      >
    </div>
    <div class="index__foreground">
      <div class="index__heading">
        <div class="index__heading--name">
          YourMemoryCards
        </div>
        <div class="index__heading--moto">
          Learn the words you need from flashcards
        </div>
      </div>
      <AppButton
        class="index__button"
        @click="goToLogIn"
      >
        Get started
      </AppButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  methods: {
    goToLogIn () {
      this.$router.push('/logIn')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/vars';

.index {
  margin: 0 auto;
  min-height: 100vh;
  min-width: 320px;
  max-width: 512px;
  position: relative;

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;

    &--img {
      width: 100%;
    }
  }

  &__foreground {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    padding: 60px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__heading {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    &--name {
      font-size: 24px;
      margin-bottom: 50px;
      color: $color-gray;
    }

    &--moto {
      font-size: 28px;
      color: white;
      text-align: center;
    }
  }

  &__button {
    width: 100%;
    font-size: 16px;
    padding: 15px 32px;
    background-color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
  }
}
</style>

<template>
  <div
    class="index"
    @click="$emit('click')"
  >
    <div class="index__background">
<!--      <img-->
<!--        class="index__img"-->
<!--        src="/Image.png"-->
<!--        alt="img-background"-->
<!--      >-->
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
        type="secondary"
        @click="goToLogIn"
      >
        Get started
      </AppButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WelcomePage',
  methods: {
    goToLogIn () {
      this.$router.push(this.localePath('/login'))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/vars';

.index {
  margin: 0 auto;
  height: 100vh;
  min-width: 320px;
  max-width: 512px;
  position: relative;
  padding: 0 24px;

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__foreground {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    padding: 76px 20px 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: rgb(0 0 0 / 50%);
  }

  &__heading {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    &--name {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 50px;
      color: $color-gray;
    }

    &--moto {
      font-size: 28px;
      font-weight: 700;
      color: white;
      text-align: center;
    }
  }
}
</style>

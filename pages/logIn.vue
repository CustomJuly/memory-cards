<template>
  <div class="login">
    <div class="login__nav-bar">
      <img
        class="login__nav-bar--img"
        @click="goToIndex"
        src="/arrow-back.svg"
        alt="arrow-back"
      >
      <span class="login__nav-bar--heading">
    Log in
  </span>
    </div>
    <div class="login__auth">
      <AppInput
        :value="inputValue"
        :placeholder="inputPlaceholderEmail"
      />
      <AppInput
        :value="inputValue"
        :placeholder="inputPlaceholderPassword"
      />
      <span class="login__forgot">
      Forgot password?
    </span>
    </div>
    <div class="login__footer"></div>
  </div>
</template>

<script>
export default {
  name: 'logIn',
  data () {
    return {
      inputPlaceholderEmail: 'Email',
      inputPlaceholderPassword: 'Password',
      inputValue: ''
    }
  },
  methods: {
    goToIndex () {
      this.$router.push('/IndexPage')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/vars';

.login {
  margin: 0 auto;
  max-width: 512px;

  &__nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding: 15px;

    &--img {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }

    &--heading {
      font-size: 18px;
      line-height: 18px;
      margin-right: calc(100%/2 - 9px);
    }
  }

  &__auth {
    display: grid;
    grid-gap: 15px;
    padding: 0 15px;
  }

  &__forgot {
    font-size: 16px;
    line-height: 16px;
    color: $color-pink;
    cursor: pointer;
  }
}
</style>

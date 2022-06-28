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
    <div class="login__footer">
      <div class="login__footer--agreeing">
        By continuing, you agree to our
        <a href="/">Terms of Service </a> and <a href="/"> Privacy Policy</a>.
      </div>
      <AppButton
        @click="goToAuthorize"
      >
        Log in
      </AppButton>
    </div>
  </div>
</template>

<script>
import AppButton from '../components/AppButton'

export default {
  name: 'logIn',
  components: { AppButton },
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
    },
    goToAuthorize () {
      this.$router.push('/authorization')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/vars';

.login {
  margin: 0 auto;
  height: 100%;
  max-width: 512px;
  padding: 15px;

  &__nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    &--img {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }

    &--heading {
      font-size: 18px;
      line-height: 18px;
      margin-right: calc(100% / 2 - 9px);
    }
  }

  &__auth {
    display: grid;
    grid-gap: 15px;
  }

  &__forgot {
    font-size: 16px;
    line-height: 16px;
    color: $color-pink;
    cursor: pointer;
  }

  &__footer {
    &--agreeing {
      font-size: 16px;
      line-height: 16px;
      margin-bottom: 20px;
    }
  }
}
</style>

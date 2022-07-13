<template>
  <div class="log-mob">
    <div>
      <NavBarBack class="mb-16" />
      <div class="log-mob__title">
        <div class="log-mob__title-big">
          Welcome back.
        </div>
        <div class="log-mob__title-small">
          Log in to your account
        </div>
      </div>
      <div class="log-mob__controls">
<!--        <div class="log-mob__country">-->
<!--          <div class="log-mob__flag">-->
<!--            <img-->
<!--              class="log-mob__flag-img"-->
<!--              src="/flag.png"-->
<!--              alt="flag"-->
<!--            >-->
<!--          </div>-->
<!--          <div class="log-mob__code">+62</div>-->
<!--          <div class="log-mob__code-choice">-->
<!--            <img-->
<!--              class="log-mob__code-choice-img"-->
<!--              src="/arrow-down.png"-->
<!--              alt="arrow-down"-->
<!--            >-->
<!--          </div>-->
<!--        </div>-->
        <AppInput
          v-model="phone"
          class="log-mob__mobile"
          placeholder="Mobile number"
        >
          <template #prefix>
            <div
              class="relative flex items-center cursor-pointer select-none"
              @click.stop="countryCodesVisible = !countryCodesVisible"
            >
              <svg-icon :name="country.icon" class="log-mob__flag" />
              <p class="log-mob__code">
                {{ country.code }}
              </p>
              <svg-icon
                name="arrow-down-s-line"
                class="log-mob__dropdown-icon transition-simple"
                :class="{ 'rotate-upside': countryCodesVisible }"
              />
              <Transition name="slide-down-fade">
                <CountryCodesDropdown
                  v-if="countryCodesVisible"
                  @input="selectCountry"
                />
              </Transition>
            </div>
          </template>
        </AppInput>
        <div class="log-mob__text mb-12">
          You will receive an SMS verification that may apply message and data rates.
        </div>
      </div>
    </div>
    <div class="log-mob__buttons">
      <AppButton @click="next">
        Next
      </AppButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      country: { icon: 'ru', code: '+7' },
      phone: '',
      countryCodesVisible: false
    }
  },
  methods: {
    next () {
      this.$router.push(this.localePath('/verification'))
    },
    selectCountry (country) {
      this.country = country
      this.countryCodesVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/vars';

.log-mob {
  margin: 0 auto;
  min-height: 100vh;
  min-width: 320px;
  max-width: 512px;
  padding: 20px 20px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__title {
    margin-bottom: 12px;
  }

  &__title-big {
    font-weight: 700;
    font-size: 32px;
    line-height: 36px;
  }

  &__title-small {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }

  &__controls {
    color: $color-gray-darker;
    //position: relative;
  }

  &__country {
    display: flex;
    position: absolute;
    top: 16px;
    left: 16px;
  }

  &__flag {
    width: 21px;
    height: 16px;
    margin-right: 4px;
    box-shadow: 0 0 2px rgba(black, 0.08);
  }

  &__code {
    color: $color-black;
    font-size: 16px;
    line-height: 16px;
    margin-right: 4px;
  }

  &__dropdown-icon {
    width: 16px;
    height: 16px;
    color: $color-black;
  }

  &__code-choice {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  &__code-choice-img {
    width: 8px;
    height: 4px;
    margin: 0;
  }

  &__mobile {
    margin-bottom: 16px;

    &--displaced {
      margin-left: 16px;
    }
  }

  &__text {
    font-size: 12px;
    line-height: 16px;
  }

  &__buttons {

  }
}

</style>

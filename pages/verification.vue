<template>
  <div
    class="verification"
    @click="$emit('click')"
  >
    <div>
      <div class="verification__nav-bar">
        <NavBarBack />
        <NuxtLink :to="localePath('/login')">
          Change number
        </NuxtLink>
      </div>
      <div class="verification__heading">
        Enter authentication code
      </div>
      <div class="verification__text">
        Enter the 4-digit that we have sent via the
        phone number +62 813-8172-5977
      </div>

      <AppInputCircle
        v-model="inputValue"
        class="verification__digit-code"
        @completed="checkVerification"
      />
    </div>
    <div>
      <AppButton type="secondary" @click="resend">
        Resend code
      </AppButton>
    </div>
  </div>
</template>

<script>
import { BUS_EVENTS } from '@/utils/bus.ts'

export default {
  name: 'VerificationPage',
  data () {
    return {
      inputValue: ['', '', '', '']
    }
  },
  methods: {
    checkVerification (code) {
      if (code === '5555') {
        this.$router.push('')
      } else {
        this.$nuxt.$emit(BUS_EVENTS.NOTIFY, {
          title: 'Ошибка',
          description: 'Неправильный код',
          type: 'warning'
        })
      }
    },
    resend () {
      console.log('resend')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/vars';

.verification {
  padding: 20px 20px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  &__nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  &__nav-bar-img {
    width: 18px;
    height: 18px;
    cursor: pointer;
    margin: 18px 0;
  }

  &__heading {
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    text-align: center;
    margin-bottom: 12px;
  }

  &__text {
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    margin-bottom: 32px;
  }

  &__digit-code {
    display: flex;
    margin-bottom: 15px;
  }
}
</style>

<template>
  <div class="index">
    <TopBar hide-back-btn>
      {{ $t('hi') }}{{ username ? `, ${username}!` : '!' }}
    </TopBar>
    <div class="index__modes">
      <div
        class="index__mode"
        @click="$router.push(localePath('/learn'))"
      >
        {{ $t('training') }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {appStore} from "~/utils/store-accessor";

export default Vue.extend({
  name: 'IndexPage',
  computed: {
    username() {
      return appStore.profile.name
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~assets/vars';

.index {
  &__modes {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    padding: 12px;
  }

  &__mode {
    padding: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    min-height: 200px;
    border-radius: 16px;
    font-size: 18px;
    line-height: 22px;
    color: $color-sky-lighter;
    font-weight: 500;
    background-image: linear-gradient(125deg, rgba(150, 130, 255, 1) 0%, rgba(132, 109, 255, 1) 30%, rgba(119, 93, 255, 1) 30%, rgba(121, 95, 255, 1) 70%, rgba(112, 84, 255, 1) 70%, rgba(107, 78, 255, 1) 100%);
    background-repeat: no-repeat, no-repeat;
    background-size: cover, cover;
    box-shadow: 0 2px 36px rgba(black, 0.1);
    cursor: pointer;
  }
}
</style>

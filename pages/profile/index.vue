<template>
  <div class="profile">
    <TopBar hide-back-btn>
      {{ username || $t('Settings') }}
    </TopBar>
    <main class="flex-1">
      <ListItem @click="$router.push(localePath('/profile/preferences'))">
        {{ $t('preferences') }} 😼
      </ListItem>
      <ListItem @click="$router.push(localePath('/profile/language'))">
        {{ $t('language') }} 🌎
      </ListItem>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {appStore} from "~/utils/store-accessor";

export default Vue.extend({
  name: "ProfilePage",
  computed: {
    username() {
      return appStore.profile.name
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~assets/vars';

.profile {
  display: flex;
  flex-direction: column;
}
</style>

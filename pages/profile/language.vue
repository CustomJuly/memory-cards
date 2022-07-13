<template>
  <div class="language">
    <TopBar>
      {{ $t('selectTheLanguage') }}
    </TopBar>
    <main class="language__content">
      <ListItem
        v-for="{ code, title } in locales"
        :key="code"
        @click="changeLocale(code)"
      >
        {{ title }}
      </ListItem>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "LanguagePage",
  data() {
    return {
      locales: [
        { code: 'en', title: 'English 🇬🇧' },
        { code: 'ru', title: 'Русский 🇷🇺' },
        { code: 'fr', title: 'Français 🇫🇷' },
      ]
    }
  },
  methods: {
    changeLocale(code: string) {
      this.$router.push(this.localePath('/profile', code))
    }
  }
})
</script>

<style lang="scss" scoped>
.language {
  &__content {
    flex: 1;
  }
}
</style>

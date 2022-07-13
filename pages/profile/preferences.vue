<template>
  <div class="preferences">
    <TopBar>
      {{ $t('preferences') }}
      <template #right>
        <span
          class="truncate"
          @click="save"
        >
          {{ $t('save') }}
        </span>
      </template>
    </TopBar>
    <main class="preferences__content">
      <AppInput
        v-model="name"
        :placeholder="$t('Your name')"
      />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {appStore} from "~/utils/store-accessor";
import {BUS_EVENTS} from "~/utils/bus";

export default Vue.extend({
  name: "PreferencesPage",
  data() {
    return {
      name: ""
    }
  },
  computed: {
    savedName() {
      return appStore.profile.name
    }
  },
  created() {
    this.name = this.savedName
  },
  methods: {
    save() {
      appStore.setName(this.name)
      this.$nuxt.$emit(BUS_EVENTS.NOTIFY, {
        description: this.$t('Your name has been updated'),
        type: 'success'
      })
      this.$router.back()
    }
  }
})
</script>

<style lang="scss" scoped>
.preferences {
  &__content {
    flex: 1;
    padding: 20px;
  }
}
</style>

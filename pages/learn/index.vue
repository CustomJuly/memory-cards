<template>
  <div>
    <TopBar>
      {{ $t('Select a deck') }}
    </TopBar>
    <ListItem
      v-for="(deck, index) in decks"
      :key="index"
      :badge="$tc('cards', deck.cards.length)"
      @click="onDeckClick(deck)"
    >
      {{ deck.name }}
    </ListItem>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { appStore } from '~/utils/store-accessor'
import { IDeck } from '~/types/deck'

export default Vue.extend({
  name: 'LearnPage',
  computed: {
    decks() {
      return appStore.decks
    }
  },
  methods: {
    onDeckClick(deck: IDeck) {
      this.$router.push(this.localePath(`/learn/${deck.id}`))
    }
  }
})
</script>

<style lang="scss" scoped>

</style>

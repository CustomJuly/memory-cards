<template>
  <Modal
    class="mm"
    no-paddings
    width="100%"
    @closed="$emit('close')"
  >
   <template #default="{ close }">
     <div class="mm__content">
       <p class="mm__title">
         {{ $tc('Move cards to...', count) }}
       </p>
       <ListItem
         v-for="deck in filteredDecks"
         :key="deck.id"
         @click="$emit('confirm', deck) && close()"
       >
         {{ deck.name }}
       </ListItem>
       <div class="mm__actions">
         <AppButton
           wide
           type="secondary"
           @click="close"
         >
           {{ $t('Close') }}
         </AppButton>
       </div>
     </div>
   </template>
  </Modal>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { IDeck } from '~/types/deck'
import { appStore } from '~/utils/store-accessor'

export default Vue.extend({
  name: 'CardsToMoveToModal',
  props: {
    count: {
      type: Number,
      required: true
    },
    activeDeck: {
      type: Object as PropType<IDeck>,
      required: true
    }
  },
  computed: {
    filteredDecks(): IDeck[] {
      return appStore.decks.filter(deck => deck.id !== this.activeDeck.id)
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~assets/vars';

.mm {
  &__content {
  }

  &__title {
    font-size: 18px;
    line-height: 24px;
    font-weight: bold;
    color: $color-black;
    padding: 20px;
  }

  &__actions {
    padding: 16px;
  }
}
</style>

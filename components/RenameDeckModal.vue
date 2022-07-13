<template>
  <Modal class="rdm" @closed="$emit('close')">
   <template #default="{ close }">
     <p class="rdm__title">
       {{ $t('Rename deck') }}
     </p>
     <AppInput
       v-model="name"
       autofocus
       :placeholder="$t('New deck name')"
       class="mb-16"
       @enter="rename"
     />
     <div class="flex">
       <AppButton
         type="secondary"
         wide
         class="mr-8" @click="close"
       >
         {{ $t('cancel') }}
       </AppButton>
       <AppButton
         wide
         @click="rename() && close()"
       >
         {{ $t('Rename') }}
       </AppButton>
     </div>
   </template>
  </Modal>
</template>

<script>
import { BUS_EVENTS } from '@/utils/bus.ts'

export default {
  name: 'RenameDeckModal',
  props: {
    currentName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      name: ''
    }
  },
  created () {
    this.name = this.currentName
  },
  methods: {
    rename() {
      if (!this.name) {
        this.$nuxt.$emit(BUS_EVENTS.NOTIFY, {
          description: this.$t('Please fill the deck name'),
          type: 'warning'
        })
        return false
      }
      this.$emit('done', this.name)
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/vars';

.rdm {
  &__title {
    font-size: 18px;
    line-height: 24px;
    font-weight: bold;
    color: $color-black;
    margin-bottom: 16px;
  }
}
</style>

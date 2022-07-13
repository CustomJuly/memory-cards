<template>
  <div
    v-click-outside="() => $emit('close')"
    class="fm"
  >
    <div
      v-for="line in lines"
      :key="line.id"
      class="fm__line"
      @click="select(line)"
    >
      <Icon :name="line.icon" size="20" class="fm__icon" />
      <p class="fm__label">
        {{ line.label }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { IMenuLine } from '~/types/floating-menu'

export default Vue.extend({
  name: 'FloatingMenu',
  props: {
    lines: {
      type: Array as PropType<IMenuLine[]>,
      required: true
    },
    closeOnSelect: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  methods: {
    select(line: IMenuLine) {
      this.$emit('select', line)

      if (this.closeOnSelect) {
        this.$emit('close')
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~assets/vars';

.fm {
  border-radius: 12px;
  box-shadow: 0 0 16px rgba(black, 0.1);
  max-width: 300px;
  overflow: hidden;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(black, 0.7);
    -webkit-backdrop-filter: blur(3px);
    backdrop-filter: blur(3px);
    z-index: -1;
  }

  &__line {
    z-index: 2;
    display: flex;
    align-items: center;
    color: white;
    cursor: pointer;
    padding: 14px 16px;

    &:hover {
      background: rgba(black, 0.1);
    }
  }

  &__icon {
    margin-right: 8px;
    flex: none;
  }

  &__label {
    font-size: 14px;
    line-height: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>

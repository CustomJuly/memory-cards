<template>
  <section
    class="notification"
    :class="`notification--${type}`"
  >
    <svg-icon :name="icon" class="notification__icon" />
    <div>
      <p v-if="title" class="notification__title">
        {{ title }}
      </p>
      <p class="notification__description">
        {{ description }}
      </p>
    </div>
    <svg-icon
      name="close-fill"
      class="notification__icon-close"
      @click="$emit('close')"
    />
  </section>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    description: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: false,
      default: 'info',
      validator(type) {
        return ['info', 'warning', 'success'].includes(type)
      }
    }
  },
  computed: {
    icon() {
      const iconMap = {
        info: 'information-line',
        warning: 'warning',
        success: 'check'
      }
      return iconMap[this.type]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/vars';

.notification {
  position: relative;
  display: flex;
  align-items: center;
  color: white;
  font-size: 14px;
  padding: 12px;
  backdrop-filter: blur(3px);
  border-radius: 12px;
  border: 1px solid rgba(white, 0.1);
  box-shadow: 0 0 20px rgba(black, 0.1);

  &--info {
    background: rgba(black, 0.4);
  }

  &--warning {
    background: rgba($color-red, 0.8);
  }

  &--success {
    background: rgba(green, 0.7);
  }

  &__icon {
    width: 32px;
    height: 32px;
    margin-right: 12px;
  }

  &__title {
    font-weight: 600;
  }

  &__icon-close {
    position: absolute;
    top: -16px;
    right: -16px;
    width: 32px;
    height: 32px;
    padding: 8px;
    color: $color-gray-darker;
    box-shadow: 0 2px 8px rgba(black, 0.12);
    background-color: white;
    border-radius: 16px;
    cursor: pointer;
  }
}
</style>

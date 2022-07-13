<template>
  <div class="notifications">
    <TransitionGroup name="slide-right-fade">
      <Notification
        v-for="(notification, index) in notifications"
        :key="index"
        :title="notification.title"
        :description="notification.description"
        :type="notification.type"
        class="notifications__notification"
        @close="close(notification)"
      />
    </TransitionGroup>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { INotification } from '~/types/notification'

export default Vue.extend({
  name: 'Notifications',
  data () {
    return {
      notifications: [] as INotification[]
    }
  },
  mounted () {
    this.$nuxt.$on('notify', this.addNotification)
  },
  beforeDestroy () {
    this.$nuxt.$off('notify', this.addNotification)
  },
  methods: {
    close(notification: INotification) {
      const index = this.notifications.findIndex(n => n === notification)
      this.notifications.splice(index, 1)
    },
    addNotification (notification: INotification) {
      this.notifications.push(notification)
      setTimeout(() => {
        this.close(notification)
      }, 3000)
    }
  }
})
</script>

<style lang="scss" scoped>
.notifications {
  position: fixed;
  top: 20px;
  left: 50%;
  width: 100%;
  max-width: 512px;
  transform: translateX(-50%);
  padding: 0 40px;
  z-index: 9;

  &__notification {
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>

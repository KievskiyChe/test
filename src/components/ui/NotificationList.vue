<script setup lang="ts">
const { notifications } = storeToRefs(useNotificationStore());
</script>

<template>
  <div class="notifications" v-if="notifications.length">
    <Suspense>
      <template #default>
        <NotificationListItem
          v-for="(notification, index) in notifications"
          :key="index"
          :notification="notification"
        >
          <span>{{ notification.description }}</span>
        </NotificationListItem>
      </template>
      <template #fallback> loading... </template>
    </Suspense>
  </div>
</template>

<style scoped lang="scss">
.notifications {
  position: fixed;
  top: var(--header-height);
  right: 0;
  width: 100%;
  max-width: 520px;
  overflow-y: auto;
  overflow-x: hidden;

  display: flex;
  flex-direction: column;
  gap: 20px;

  padding-left: 30px;
}

@media screen and (max-width: 768px) {
  .notifications {
    padding-left: 20px;
  }
}
</style>

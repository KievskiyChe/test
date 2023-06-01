<script setup lang="ts">
import { blurryRight } from '@/common/animations';

const { removeNotification } = useNotificationStore();

interface Props {
  notification: INotification;
}

const props = defineProps<Props>();

watchEffect(() => {
  if (props.notification.closeTimeout) {
    setTimeout(() => {
      removeNotification(props.notification);
    }, props.notification.closeTimeout);
  }
});
</script>

<template>
  <div
    class="notification"
    :class="`notification-${props.notification.status}`"
  >
    <Motion class="icon" :class="`icon-${props.notification.status}`" :from="blurryRight.from"
    :to="blurryRight.to">
      <div class="icon-circle">
        <img
          :src="getImage(`notifications/icon-${props.notification.status}.svg`)"
        />
      </div>
    </Motion>

    <Motion class="content" :from="blurryRight.from"
    :to="blurryRight.to">
      <div class="layer"></div>
      <div class="body" :class="`body-${props.notification.status}`">
        <div class="title">{{ notification.title }}</div>
        <slot></slot>
        <div class="close" @click="removeNotification(notification)"></div>
      </div>
    </Motion>
  </div>
</template>

<style scoped lang="scss">
.notification {
  display: grid;
  position: relative;
  align-items: center;
  grid-template-columns: 92px 1fr;
  width: 100%;
  height: 94px;
}

.icon {
  position: relative;
  overflow: hidden;
  width: 92px;
  height: 92px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 50%;
  z-index: 1;
  margin-left: 18px;
  padding: 6px;

  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: calc(100% - 12px);
    height: calc(100% - 12px);
    border: 6px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
  }

  &-circle {
    width: 58px;
    height: 58px;
    border-radius: 50%;
    border: 1px solid var(--white-500);

    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.icon-info,
.body-info {
  background: var(--notification-info-bg) !important;
}

.icon-submitted,
.body-submitted {
  background: var(--notification-submitted-bg) !important;
}

.icon-error,
.body-error {
  background: var(--notification-error-bg) !important;
}

.icon-pending,
.body-pending {
  background: var(--notification-pending-bg) !important;
}

.icon-expired,
.body-expired {
  background: var(--notification-expired-bg) !important;
}

.content {
  position: relative;
  width: 100%;
  height: 90px;
}

.layer {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.body {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.015);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  border-left: 0;

  margin-left: -18px;

  padding: 20px 50px;
  overflow: hidden;

  /* &::after {
    content: '';
    position: absolute;
    left: -81px;
    top: -9px;
    width: 104px;
    height: 104px;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
  } */
}

.close {
  width: 12px;
  height: 12px;

  position: absolute;
  right: 15px;
  top: 15px;

  display: grid;
  place-items: center;

  cursor: pointer;

  &::before,
  &::after {
    content: "";
    width: 100%;
    height: 1px;
    background: rgba(255, 255, 255, 1);
    position: absolute;
  }

  &::before {
    rotate: 45deg;
  }

  &::after {
    rotate: -45deg;
  }
}

.title {
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 600;
}

.description {
  font-size: 14px;
  margin-top: 10px;
}

.time-to-close {
  position: absolute;
  height: 3px;
  width: calc(100%);
  bottom: 0;
  left: -1px;
  background: var(--white-200);
  border-radius: 0 0 4px 0;
  overflow: hidden;

  span {
    width: 0%;
    height: calc(100% + 1px);
    background: var(--white-300);
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 0 2px 2px 0;
    transition: all 0.15s ease;
    animation: loader var(--c) ease forwards;
  }
}

@keyframes loader {
  from {
    width: 0%;
  }

  to {
    width: 100%;
  }
}

@media screen and (max-width: 768px) {
  .title {
    font-size: 16px;
  }
}
</style>

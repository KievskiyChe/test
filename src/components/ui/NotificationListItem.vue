<script setup lang="ts">
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
})
</script>

<template>
  <Motion
    :from="{ x: 100, opacity: 1 }"
    :to="{ x: 0 }"
    :transition="{ mass: 0.3, shiffness: 1000, damping: 6 }"
  >
    <div class="notification" :class="`notification-${props.notification.status}`">
      <div class="icon">
        <img :src="getImage(`notifications/${props.notification.status}.svg`)" />
      </div>

      <div class="content" :class="`content-${props.notification.status}`">
        <div class="body">
          <div class="close" @click="removeNotification(props.notification)"></div>

          <div class="title">{{ props.notification.title }}</div>

          <div class="description"><slot></slot></div>

          <!-- <div class="time-to-close" :style="`--c: ${props.notification.closeTimeout}ms`">
            <span></span>
          </div> -->
        </div>
      </div>
    </div>
  </Motion>
</template>

<style scoped lang="scss">
.notification {
  display: flex;
  position: relative;
  width: 100%;
  height: 90px;
}

.icon {
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 106px;
    height: 90px;
    z-index: -1;

    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);

    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  }
}

.content {
  width: calc(100% - 110px);

  &-info {
    background: var(--notification-info-bg);
  }

  &-submitted {
    background: var(--notification-submitted-bg);
  }

  &-error {
    background: var(--notification-error-bg);
  }

  &-pending {
    background: var(--notification-pending-bg);
  }

  &-expired {
    background: var(--notification-expired-bg);
  }

  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  clip-path: polygon(0 0, 100% 0, 100% 50%, 100% 100%, 0 100%, 25px 50%);

  position: absolute;
  height: 100%;
  left: 90px;

  border-radius: 0 8px 8px 0;

  &::before {
    content: "";
    position: absolute;
    clip-path: polygon(0 0, 1px 0, 25px 50%, 1px 100%, 0 100%, 24px 50%);
    width: 40px;
    height: 88px;
    background: rgba(255, 255, 255, 0.2);
    left: 0;
    top: 0;
  }
}

.body {
  width: 100%;
  height: 100%;
  padding: 15px 45px;
  position: relative;
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

<script setup lang="ts">
import { INotificationStatus } from "@/common/interfaces";
import { useSwitchNetwork } from "vagmi";

const { pushNotification } = useNotificationStore();

const { isLoading, switchNetwork } =
  useSwitchNetwork({
    chainId: 137,
    onSuccess: () => {
      pushNotification({
        status: INotificationStatus.SUBMITTED,
        title: "Success",
        description: 'Network switched successfully'
      })
    },
  });

const animation = {
  content: {
    from: {
      y: -30,
      "backdrop-filter": "blur(20px)",
      "-webkit-backdrop-filter": "blur(20px)",
    },
    to: { y: 0 },
  },
};
</script>

<template>
  <div class="invalid-network-popup">
    <div class="popup-overlay"></div>

    <Motion v-bind="animation.content" class="content">
      <div class="popup-content">
        <div class="title">Invalid Network</div>

        <div class="body">
          <img src="@/assets/img/icons/yoda.svg" alt="" />
        </div>

        <div class="foo">
          <p>switch to</p>
          <TheButton @click.stop="switchNetwork()" :disabled="isLoading">
            <span>{{ isLoading ? "switching..." : "Polygon" }}</span>
          </TheButton>
        </div>
      </div>
    </Motion>
  </div>
</template>

<style scoped lang="scss">
.invalid-network-popup {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;

  display: grid;
  place-items: center;
}

.popup-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: var(--black-600);
  backdrop-filter: blur(20px);
}

.content {
  width: 660px;
  height: 530px;
  border-radius: 12px;
  background-image: url("@/assets/img/claim-history-bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  background-color: #111111;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.6);
}

.popup-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  text-align: center;
}

.title {
  font-size: 24px;
  font-weight: 500;
  color: var(--white);
  margin-bottom: 10px;
}

.foo {
  width: 100%;
  margin: 10px 0;

  display: grid;
  place-items: center;
  gap: 5px;

  p {
    font-size: 14px;
    font-weight: 500;
  }
}

@keyframes animate {
  0% {
    background-size: 150% 150%;
  }
  80% {
    background-size: 200% 200%;
  }
  100% {
    background-size: 150% 150%;
  }
}

@media screen and (max-width: 768px) {
  .content {
    width: 340px;
  }

  .popup-content {
    max-height: 440px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 0;
    }
  }
}
</style>

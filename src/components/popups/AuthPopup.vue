<script setup lang="ts">
import { connectors } from "@/common/auth.config";
import { useAccount, useConnect } from "vagmi";
import { onClickOutside } from "@vueuse/core";

const outside = ref<HTMLElement | null>(null);

const { hideAllPopups } = usePopupsStore();
const { pushNotification } = useNotificationStore();

const { address, isConnected } = useAccount()
const { connect, isConnecting, pendingConnector } = useConnect({
  connector: connectors[0].connector,
});

watch(isConnected, (value) => {
  if (value) {
    updateGlobalsAddress(address.value ? address.value : '');
  } else {
    pushNotification({
      status: INotificationStatus.INFO,
      title: "Disconnected",
      description: "You've been disconnected from the app."
    })
  }
  hideAllPopups();
});

onClickOutside(outside, () => {
  hideAllPopups();
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
  <div class="auth-popup" >
    <div class="popup-overlay"></div>

    <Motion v-bind="animation.content" class="content" ref="outside">
      <div class="popup-content">
        <div class="title">Connect wallet</div>

        <div class="body">
          <div class="connectors">
            <div
              class="connector"
              v-for="connector in connectors"
              :class="{
                connecting:
                  isConnecting &&
                  pendingConnector?.id === connector.connector.id,
              }"
              @click.stop="connect(connector.connector)"
            >
              <div class="icon">
                <img
                  :src="getImage(`connectors/${connector.tag}.svg`)"
                  alt="icon"
                />
              </div>
              <div class="name">{{ connector.name }}</div>
              <div
                class="spinner"
                v-if="
                  isConnecting &&
                  pendingConnector?.id === connector.connector.id
                "
              ></div>
            </div>
          </div>
        </div>

        <div class="foo">
          Need help connecting a wallet?
          <a href="#">Read our FAQ</a>
        </div>

        <div class="close" @click.stop="hideAllPopups()">
          <span></span>
          <span></span>
        </div>
      </div>
    </Motion>
  </div>
</template>

<style scoped lang="scss">
.auth-popup {
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
  width: 365px;
  height: 400px;
  border-radius: 8px;

  background: linear-gradient(
    109.29deg,
    rgba(69, 73, 83, 0.5) 0%,
    rgba(12, 12, 14, 0.5) 49.21%,
    rgba(69, 73, 83, 0.5) 100%
  );

  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(20px);
}

.popup-content {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 10px;
  padding: 20px;
  position: relative;
}

.title {
  padding: 20px 0;
  text-align: center;
  font-size: 24px;
}

.connectors {
  display: grid;
  gap: 20px;
}

.connector {
  display: flex;
  align-items: center;
  gap: 15px;
  height: 60px;
  border: 1px solid var(--white-100);
  border-radius: 4px;
  padding: 0 15px;
  background: var(--black-200);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;

  &:hover,
  &.connecting,
  &.active {
    background: rgba(249, 214, 103, 0.1);
    border: 1px solid var(--white-400);
    box-shadow: 0px 0px 10px rgba(249, 214, 103, 0.3);
  }

  &.connecting {
    scale: 0.98;
    user-select: none;
    pointer-events: none;
    opacity: 0.5;
  }
}

.spinner {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid var(--white-100);
  border-top: 2px solid var(--white-400);
  animation: spin 1s linear infinite;
  position: absolute;
  right: 15px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}

.icon {
  height: 40px;

  img {
    width: 100%;
    height: 100%;
  }
}

.foo {
  font-size: 14px;
  text-align: center;

  a {
    text-decoration: underline;
  }
}

.close {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  width: 20px;
  height: 20px;

  top: 20px;
  right: 20px;
  cursor: pointer;

  span {
    width: 100%;
    height: 2px;
    background: #fff;
    border-radius: 2px;
    transition: all 0.3s ease;
    position: absolute;

    &:first-child {
      transform: rotate(45deg);
    }

    &:last-child {
      transform: rotate(-45deg);
    }
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

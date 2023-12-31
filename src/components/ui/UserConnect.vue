<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { useAccount, useDisconnect, useProvider } from "vagmi";
import { Popup } from "@/common/interfaces";
import { blurry } from "@/common/animations";

const { showPopup } = usePopupsStore();
const { address, isConnected } = useAccount();
const { disconnect } = useDisconnect();
const { usdcBalance } = storeToRefs(useUserStore());
const chainId = ref(0);

const { getNetwork } = useProvider().value;
getNetwork().then((res) => {
  chainId.value = res.chainId;
});

const externalLink = import.meta.env.VITE_APP_EXTERNAL_LINK || "";
const showUserInfo = ref(false);
const outside = ref<HTMLElement | null>(null);

const shortAddress = computed(() => {
  if (address.value) {
    return address.value.slice(0, 6) + "..." + address.value.slice(-4);
  }
});

onClickOutside(outside, () => {
  showUserInfo.value = false;
});
</script>

<template>
  <div class="user" ref="outside">
    <template v-if="!isConnected">
      <Motion>
        <div class="content" @click="showPopup(Popup.AUTH)">
          <div class="icon">
            <img src="@/assets/img/icons/arbitrum.svg" alt="Arbitrum One" />
          </div>

          <span class="connect">Connect</span>
        </div>
      </Motion>
    </template>

    <template v-if="isConnected">
      <Motion>
        <div class="content" @click.stop="showUserInfo = !showUserInfo">
          <div class="icon">
            <img src="@/assets/img/icons/arbitrum.svg" alt="Arbitrum One" />
          </div>
          <span class="user-address">{{ shortAddress }}</span>
        </div>
      </Motion>
    </template>

    <!-- show popup -->
    <template v-if="showUserInfo">
      <div class="popup-wrapper">
        <Motion :from="blurry.from" :to="blurry.to">
          <ThePopup>
            <b>Your wallet</b>

            <div class="body">
              <div class="user-yoda">
                <img src="@/assets/img/icons/yoda.svg" alt="Yoda" />
              </div>

              <div class="usdt-value" v-if="isConnected">
                USDC {{ usdcBalance }}
              </div>

              <div class="external-link">
                <a :href="externalLink" target="_blank">
                  <span>Polygon App</span>
                </a>
              </div>
            </div>

            <TheButton @click="disconnect(), (showUserInfo = false)">
              <span>Disconnect</span>
            </TheButton>
          </ThePopup>
        </Motion>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.user {
  display: flex;
  justify-content: flex-end;
  position: relative;
  font-weight: 600;
}

.external-link {
  margin-top: 20px;
  border: 2px solid var(--accent);
  width: 156px;
  height: 34px;
  border-radius: 8px;

  display: grid;
  place-items: center;
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
    background: var(--accent);
  }
}

.content {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  span {
    padding-bottom: 3px;
  }

  .icon {
    width: 20px;

    img {
      width: 100%;
    }
  }
}

.multicall {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 5px;
  margin: 10px 0;

  span {
    text-align: center;
  }

  .toggle {
    justify-self: center;
    width: 60px;
    height: 20px;
    border: 1px solid var(--white-200);
    border-radius: 6px;

    display: flex;
    align-items: center;
    padding: 2px;
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease;

    &.active {
      border-color: var(--shadow-yellow-300);
      background: var(--shadow-yellow-300);
      .circle {
        translate: 34px 0;
        background: var(--shadow-yellow);
      }
    }
  }

  .toggle .circle {
    width: 20px;
    height: 100%;
    border-radius: 4px;
    background: var(--white-300);
    transition: all 0.3s ease;
  }
}

.popup-wrapper {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 10px;
  z-index: 1;

  font-weight: bold;
  overflow: hidden;
  border-radius: 12px;

  .body {
    display: grid;
    place-items: center;
    gap: 3px;
  }

  .usdt-value,
  .dollar-value {
    font-size: 14px;
  }

  .user-yoda {
    width: 70px;
    height: 45px;
    border-radius: 50%;
    display: grid;
    place-items: center;

    img {
      width: 100%;
    }
  }

  .disconnect {
    cursor: pointer;
    background: #454953;
    width: 140px;
    height: 30px;
    border-radius: 8px;

    display: grid;
    place-items: center;

    &:hover {
      background: #5a5f6e;
    }
  }
}

@media screen and (max-width: 768px) {
  .user-address {
    display: none;
  }

  .connect {
    display: none;
  }
}
</style>

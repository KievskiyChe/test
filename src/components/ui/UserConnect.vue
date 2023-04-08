<script setup lang="ts">
import type { Connector } from "vue-dapp-connector";
import { onClickOutside } from "@vueuse/core";

const connector = inject<Connector>("Connector")!;

const { connect, disconnect } = connector;
const { getShortAddress } = useUserStore();
const { user } = storeToRefs(useUserStore());

const handleConnect = () => {
  connect().then((data) => {
    window.location.reload();
  });
};

const handleDisconnect = () => {
  disconnect().then(() => {
    localStorage.clear();
  });
};

const showUserInfo = ref(false);
const outside = ref<HTMLElement | null>(null);

onClickOutside(outside, () => {
  showUserInfo.value = false;
});
</script>

<template>
  <div class="user" ref="outside">
    <template v-if="!user">
      <Motion>
        <div class="content" @click="handleConnect()">
          <div class="icon">
            <img src="@/assets/img/icons/polygon.svg" alt="Ethereum" />
          </div>

          <span class="connect">Connect</span>
        </div>
      </Motion>
    </template>

    <template v-if="user">
      <Motion>
        <div class="content" @click.stop="showUserInfo = !showUserInfo">
          <div class="icon">
            <img src="@/assets/img/icons/polygon.svg" alt="Ethereum" />
          </div>

          <span class="user-address">{{ getShortAddress() }}</span>
        </div>
      </Motion>
    </template>

    <!-- show popup -->
    <template v-if="showUserInfo">
      <div class="popup-wrapper">
        <Motion :from="{ y: -20 }" :to="{ y: 0 }">
          <ThePopup>
            <b>Your wallet</b>

            <div class="body">
              <div class="user-yoda">
                <img src="@/assets/img/icons/yoda.svg" alt="Yoda" />
              </div>

              <!-- <div class="usdt-value">USDT 00.00</div> -->
              <!-- <div class="dollar-value">$ 00.00</div> -->
            </div>

            <div class="disconnect" @click="handleDisconnect()">
              <span>Disconnect</span>
            </div>
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

.popup-wrapper {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 10px;
  z-index: 1;

  font-weight: bold;

  .body {
    display: grid;
    place-items: center;
    margin: 15px 0;
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

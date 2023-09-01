<script setup lang="ts">
import { useAccount } from "vagmi";
const { showPopup } = usePopupsStore();
const { pushNotification } = useNotificationStore();
const { rewards } = storeToRefs(useRewardsStore());
const { process, isActive } = storeToRefs(useTournamentStore());
const { isConnected } = useAccount();

const animation = {
  from: {
    y: -30,
    "backdrop-filter": "blur(0px)",
    "-webkit-backdrop-filter": "blur(0px)",
  },
  to: {
    y: 0,
    "backdrop-filter": "blur(20px)",
    "-webkit-backdrop-filter": "blur(20px)",
  },
};

onMounted(() => {
  const t = getTournament();
  t.updateSilent();
});
</script>
<template>
  <div class="view history">
    <div class="overlay">
      <img src="@/assets/img/claim-history-bg.jpeg" alt="" v-lazyload />
    </div>

    <main class="content container">
      <div class="circles">
        <img src="@/assets/img/circles.svg" alt="" />
      </div>

      <div class="rewards" v-if="!process">
        <div class="title">
          <h1>Battle History</h1>
          <p>prizes information</p>
        </div>

        <template v-if="rewards && rewards.length && isConnected">
          <div class="list">
            <div class="list-content">
              <Motion
                v-bind="animation"
                v-for="(claim, i) in rewards"
                :key="i"
                :delay="i * 0.1"
                style="border-radius: 12px"
              >
                <ClaimCard
                  :claim="claim"
                />
              </Motion>
            </div>
          </div>
        </template>

        <template v-if="(!rewards || !rewards.length) && isConnected">
          <Motion>
            <div class="wrapper">
              <p>No rewards yet</p>
            </div>
          </Motion>
        </template>

        <template v-if="!isConnected">
          <Motion>
            <div class="wrapper not-connected">
              <img src="@/assets/img/claim-history-not-connected.svg" alt="" />

              <p>
                To see your awards and <br />be able to claim them,<br />please connect your wallet.
              </p>

              <TheButton @click.stop="showPopup(Popup.AUTH)">
                <span>Connect wallet</span>
              </TheButton>
            </div>
          </Motion>
        </template>
      </div>

      <div class="process" v-if="process">
        <TheLoader />
      </div>

      <div class="actions" v-if="isActive">
        <router-link to="/tournament">
          <TheButton>
            <span>Back to tournament</span>
          </TheButton>
        </router-link>
      </div>
    </main>

    <TheFooter />
  </div>
</template>

<style scoped lang="scss">
.history {
  position: relative;
  display: grid;
  grid-template-rows: 1fr 80px;
  overflow: hidden;
  gap: 30px;
}

.rewards {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  height: 100%;
}

.circles {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.not-connected {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.process {
  height: 100%;
  display: grid;
  place-items: center;
}

.actions {
  margin-top: 100px;
}

.process .wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 140px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.015);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 50px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: radial-gradient(
      30.58% 50% at 50% 50%,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.35) 100%
    );
  }
}

.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  text-align: center;
}

.title {
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-transform: uppercase;

  h1 {
    font-size: 32px;
  }

  p {
    font-size: 20px;
  }
}

.list {
  height: 100%;
}

.list-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
}

@media screen and (max-width: 768px) {
  .list-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
</style>

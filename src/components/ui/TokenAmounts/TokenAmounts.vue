<script setup lang="ts">
import { updateGlobalsAddress } from '@/common/helpers';
import { useAccount } from 'vagmi'

const { isConnected, address } = useAccount()
const { process } = storeToRefs(useTournamentStore());
const { totalAmountsUSD } = useTournamentStore();

const showChart = ref(false);

const toggle = () => {
  showChart.value = !showChart.value;
};

watch(isConnected, (value) => {
  if (value) {
    updateGlobalsAddress(address.value ? address.value : '');
    const tournament = getTournament()
    tournament.update()
  }
});
</script>

<template>
  <div class="token-amounts">
    <TheCard :swapEdges="true">
      <div class="wrapper">
        <Motion class="title" v-if="isConnected && !process">
          <!-- <span>You've got</span>
          <div class="balance">
            <sup>$</sup>
            <span>{{ totalAmountsUSD() }}</span>
          </div> -->
        </Motion>

        <template v-if="showChart && isConnected && !process">
          <TokenAmountsChart />
        </template>

        <template v-if="!showChart && isConnected && !process">
          <TokenAmountsList />
        </template>

        <div class="toggle" v-if="isConnected && !process">
          <div
            class="toggle-point"
            :class="{ active: showChart }"
            @click.stop="toggle"
          >
            <span></span>
          </div>
          <div
            class="toggle-point"
            :class="{ active: !showChart }"
            @click.stop="toggle"
          >
            <span></span>
          </div>
        </div>

        <!-- loader -->
        <div class="load" v-if="isConnected && process">
          <TheLoader />
        </div>

        <!-- user not connected -->
        <template v-if="!isConnected">
          <Motion :delay="0.4" class="no-connected">
            <UserNotConnected />
          </Motion>
        </template>
      </div>
    </TheCard>
  </div>
</template>

<style scoped lang="scss">
.token-amounts {
  height: var(--board-height);
  min-width: 320px;
  max-width: 340px;
  display: flex;
}

.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
}

.title {
  text-align: left;
  span {
    font-size: 20px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
}

.balance {
  display: flex;
  align-items: center;
  margin-top: 10px;
  
  sup {
    font-size: 14px;
  }
  
  span {
    /* font-family: "Aurebesh"; */
    font-size: 30px;
    font-weight: bold;
    padding: 0;
    margin-top: -14px;
  }
}

.content {
  height: 100%;
}

.load {
  position: absolute;

  top: 50%;
  left: 50%;
  translate: -50% -50%;
}

.toggle {
  width: 100%;
  height: 12px;
  position: absolute;
  left: 0;
  bottom: -10px;

  display: flex;
  justify-content: center;
}

.toggle .toggle-point {
  display: flex;
  padding: 10px 2.5px;

  span {
    border-radius: 30px;
    background: var(--shadow-yellow);

    width: 6px;
    height: 6px;
    opacity: 0.5;
    transition: all 0.3s ease;
  }

  cursor: pointer;

  &.active {
    cursor: unset;
    span {
      width: 30px;
      opacity: 1;
    }
  }
}

.no-connected {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 768px) {
  .token-amounts {
    height: 460px;
    min-width: 100%;
  }
  .wrapper {
    height: 100%;
    max-height: 100%;
  }
}
</style>

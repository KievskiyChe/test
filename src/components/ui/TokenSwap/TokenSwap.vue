<script setup lang="ts">
import { useAccount } from "vagmi";

const { isConnected, address } = useAccount();
const { round, game, usdc } = storeToRefs(useTournamentStore());
const { process, from, to, amountFrom, isValidFrom, slippage } = storeToRefs(
  useSwapStore()
);

const { startProcess, successProcess, errorProcess, setProcess, resetForm } =
  useSwapStore();

const canBuy = (token: IToken) => {
  if (!game.value) return false;
  if (round.value === 0) return true;
  if (token.address === usdc.value?.address) return true;

  const currentRound = game.value.rounds
    .get(round.value - 1)
    ?.pairs.map((pair) => pair.winner);
  if (!currentRound) return false;

  const tokens = Array.from(currentRound);
  const arr = tokens.filter((item) => item);

  return arr.find((item) => item?.symbol === token.symbol) ? true : false;
};

const swapTokens = async () => {
  const tournament = getTournament() as any;
  startProcess();

  try {
    const receipt = await tournament.swap(getSwapOptions());

    if (receipt && receipt.status) {
      // await tournament.updateSilent();
      successProcess();
    }
  } catch (error) {
    console.log(error);
    errorProcess();
  }

  resetForm();
};

const getSwapOptions = (): SwapOptions | undefined => {
  if (!from.value || !to.value || !isConnected.value) return;

  return {
    amount: parseUnits(amountFrom.value, from.value.decimals),
    slippage: calculateSlippage(
      amountFrom.value,
      slippage.value,
      from.value.decimals
    ),
    path: [from.value.address, to.value.address],
    to: address.value!,
    deadline: Date.now() + 200000,
  };
};

const handleApprove = async (token: IToken | undefined) => {
  if (!token) return;
  setProcess(true);

  try {
    const tournament = getTournament();
    const receipt = await token.approve(token.routerAddress);

    if (receipt && receipt.status) {
      await tournament.updateSilent();
    }
  } catch (error) {
    console.log(error);
  } finally {
    setProcess(false);
  }
};

const needMoreApprove = computed(() => {
  if (!from.value) return false;
  return +amountFrom.value - +from.value.allowance > 0;
});
</script>

<template>
  <div class="swap-wrapper">
    <TheCard v-if="round !== 3">
      <Motion>
        <TokenSwapTitle />
      </Motion>

      <!-- user connected and process take while -->
      <Motion class="swap-load" v-if="isConnected && process">
        <TheLoader />
      </Motion>

      <!-- user not connected -->
      <Motion class="swap-load" v-if="!isConnected">
        <Motion>
          <p>Please connect wallet</p>
        </Motion>
      </Motion>

      <Motion v-if="isConnected && !process">
        <TokenSwapForm />
      </Motion>

      <Motion :class="{ blurred: process }">
        <TokenSwapTolerance />
      </Motion>

      <Motion class="fee" :class="{ blurred: process }">
        <span>Swap fee</span>
        <span>%1</span>
      </Motion>

      <Motion class="foo" v-if="from && to && from.address && to.address">
        <TheButton
          v-if="isConnected && (!from.approved || needMoreApprove)"
          :disabled="!isConnected || process || process || !isValidFrom"
          @click.prevent="handleApprove(from)"
        >
          <template v-if="!process">
            <span>Approve</span>
            <small>{{ from.symbol }}</small>
          </template>
          <template v-if="process">
            <span>Approving...</span>
          </template>
        </TheButton>

        <TheButton
          v-if="isConnected && from.approved && !needMoreApprove"
          :disabled="!isConnected || process || !isValidFrom || !canBuy(to)"
          @click.stop="swapTokens"
        >
          <template #icon>
            <img src="@/assets/img/icons/chart.svg" alt="" />
          </template>
          <span>swap</span>
        </TheButton>

        <TheButton v-if="!isConnected" :disabled="true">
          <template #icon>
            <img src="@/assets/img/icons/chart.svg" alt="" />
          </template>
          <span>swap</span>
        </TheButton>
      </Motion>

      <Motion class="foo" v-else>
        <TheButton :disabled="true">
          <template #icon>
            <img src="@/assets/img/icons/chart.svg" alt="" />
          </template>
          <span>select tokens</span>
        </TheButton>
      </Motion>

      <div class="extra" v-if="from">
        <p v-if="needMoreApprove">
          You need more {{ from.symbol }} allowance to swap. Your got
          {{ nFormatter(+from.allowance) }} . Need more
          {{ nFormatter(+amountFrom - +from.allowance) }}
        </p>
      </div>
    </TheCard>

    <TheCard v-else>
      <Motion>
        <TokenSwapTitle text="champion" />
      </Motion>

      <TokenChampion />
    </TheCard>
  </div>
</template>

<style scoped lang="scss">
.blurred {
  filter: blur(3px);
  pointer-events: none;
}

.swap-wrapper {
  width: 100%;
  display: flex;
  position: relative;
}

.extra {
  font-size: 10px;
  color: var(--white-400);
  text-align: center;
}


.disclaimer {
  width: 260px;
  font-size: 12px;
  text-align: right;
  color: var(--white-600);
}

.swap-load {
  height: 115px;
  display: grid;
  place-items: center;
  border: 1px solid var(--white-200);
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
}

.fee {
  height: 35px;
  padding: 0 10px;
  border: 1px solid var(--white-100);

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.foo {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  small {
    font-size: 12px;
    text-align: right;
    line-height: 150%;
    letter-spacing: 0.02em;
    opacity: 0.6;
  }
}

.frozen {
  pointer-events: none;
}

@media screen and (max-width: 1250px) {
  .foo {
    justify-content: center;
    small {
      display: none;
    }
  }
}

@media screen and (max-width: 768px) {
  .foo {
    flex-direction: column;

    small {
      display: block;
    }
  }

  .disclaimer {
    text-align: center;
  }

  .swap-wrapper {
    min-height: 400px;
  }
}
</style>

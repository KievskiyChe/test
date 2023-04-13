<script setup lang="ts">
import { useAccount } from "vagmi";

const { isConnected, address } = useAccount();
const { round, game } = storeToRefs(useTournamentStore());
const { process, from, to, amountFrom, isValidFrom, slippage } = storeToRefs(
  useSwapStore()
);

const { startProcess, successProcess, errorProcess, setProcess, resetForm } =
  useSwapStore();

const canBuy = (token: IToken) => {
  if (!game.value) return false;
  if (round.value === 0) return true;

  const currentRound = game.value.rounds
    .get(round.value - 1)
    ?.pairs.map((pair) => pair.winner);
  if (!currentRound) return false;

  const tokens = Array.from(currentRound);
  const arr = tokens.filter((item) => item);

  return arr.find((item) => item?.symbol === token.symbol) ? true : false;
};

const swapTokens = async () => {
  const tournament = getTournament();
  startProcess();

  try {
    const receipt = await tournament.swap(getSwapOptions());

    if (receipt && receipt.status) {
      await tournament.updateBalances();
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
    const receipt = await token.approve();
    const tournament = getTournament();

    if (receipt && receipt.status) {
      await tournament.update();
      setProcess(false);
    }
  } catch (error) {
    console.log(error);
    setProcess(false);
  }
};
</script>

<template>
  <div class="swap-wrapper" v-if="!process">
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

      <Motion class="fee">
        <span>Swap fee</span>
        <!-- <span>%{{ fee ? fee / 1000 : 0 }}</span> -->
        <span>%1</span>
      </Motion>

      <Motion class="foo" v-if="from && to">
        <TheButton
          v-if="isConnected && !from.approved"
          :disabled="!isConnected || process || process"
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
          v-if="isConnected && from.approved"
          :disabled="
            !isConnected || process || process || !isValidFrom || !canBuy(to)
          "
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

        <div class="disclaimer">
          <!-- <p>
            Disclaimer: Please be advised that if liquidity pools doesn't have
            enough liquidity you will receive a reduced amount when swapping
          </p> -->
        </div>
      </Motion>
    </TheCard>

    <TheCard v-else>
      <Motion>
        <TokenSwapTitle text="champion" />
      </Motion>

      <TokenChampion />
    </TheCard>
  </div>

  <div class="swap-wrapper" v-if="process">
    <TheCard>
      <div class="process">
        <TheLoader />
      </div>
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

.process {
  display: grid;
  place-items: center;
}

.disclaimer {
  max-width: 300px;
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
  justify-content: space-between;
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

  .swap-wrapper {
    min-height: 400px;
  }
}
</style>

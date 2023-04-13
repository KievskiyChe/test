<script setup lang="ts">
const store = useSwapStore();
const tournament = getTournament()

const {
  from,
  to,
  amountFrom,
  amountTo,
  amountFromUSD,
  amountToUSD,
  isValidFrom,
  isValidTo,
} = storeToRefs(store);
const { swapPositions, setAmountFrom, setAmountTo } = store;

const handleInput = (e: Event, type: "from" | "to") => {
  if (!type) return;

  const target = e.target as HTMLInputElement;
  const value = target.value.toString();

  if (type === "from" && (!value || !isValidFrom)) {
    return setAmountTo("");
  }

  if (type === "to" && (!value || !isValidTo)) {
    return setAmountFrom("");
  }

  if (type === "from") {
    setAmountFrom(value);
  } else {
    setAmountTo(value);
  }

  if (Number(value) > Number(from.value?.amount)) {
    setAmountFrom(from.value!.amount);
  }

  typewatch(async () => {
    const result = await getAmountsOut(type);
    if (!result) return;

    type === "from" ? setAmountTo(result) : setAmountFrom(result);
  }, 500);
};

const getAmountsOut = async (type: string): Promise<string | undefined> => {
  if (
    !tournament ||
    !from.value ||
    !to.value ||
    !amountFrom.value ||
    parseFloat(amountFrom.value) <= 0
  )
    return "0.00";

  const options = getAmountsOutOptions(type);

  return await tournament.router.getAmountsOut(options);
};

const getAmountsOutOptions = (type: string) => {
  return {
    amount: type === "from" ? amountFrom.value : amountTo.value,
    from: type === "from" ? from.value : to.value,
    to: type === "from" ? to.value : from.value,
  };
};
</script>

<template>
  <div class="swap">
    <!-- from -->
    <div class="input-form">
      <div class="input" :class="{ invalid: !isValidFrom }">
        <input
          type="number"
          placeholder="0.0"
          v-model.trim="amountFrom"
          @input="handleInput($event, 'from')"
        />
        <!-- <small class="usd">$ {{ amountFromUSD }}</small> -->
      </div>
      <div class="input-select" v-if="from">
        <TokenSelect :token="from" emitted="from" />
      </div>
    </div>

    <!-- separator -->
    <div class="separator"></div>

    <!-- to -->
    <div class="input-form">
      <div class="input" :class="{ invalid: !isValidFrom }">
        <input
          type="number"
          placeholder="0.0"
          v-model.trim="amountTo"
          disabled
        />
        <!-- <small class="usd">$ {{ amountToUSD }}</small> -->
      </div>
      <div class="input-select" v-if="to">
        <TokenSelect :token="to" emitted="to" />
      </div>
    </div>

    <!-- centered swap icon -->
    <div class="swap-icon" @click.stop="swapPositions">
      <img src="@/assets/img/icons/swap.svg" alt="" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.swap {
  height: 115px;
  border: 1px solid var(--white-200);
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  position: relative;

  &-icon {
    min-width: 30px;
    min-height: 30px;
    position: absolute;
    top: calc(50% - 15px);
    left: calc(50% - 15px);
    cursor: pointer;
    z-index: 1;
    transition: all 0.3s ease;

    img {
      width: 100%;
    }
  }

  &-icon:active {
    transform: scale(0.9);
  }
}

.separator {
  height: 1px;
  background: var(--white-200);
}

.input-form {
  display: flex;
  align-items: center;
  height: 100%;
}

.input-form .input {
  flex: 1;
  height: 100%;
  position: relative;
  display: flex;

  input {
    width: 100%;
    height: 100%;
    background: transparent;
    color: #fff;
    /* padding: 0 10px 10px 10px; */
    padding: 10px;
    font-size: 20px;
    font-weight: 600;
    border: none;
    outline: none;
    letter-spacing: 0.05em;
    
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &::placeholder {
      color: var(--white);
    }
  }

  &.invalid {
    input {
      color: var(--shadow-yellow);
    }
  }

  small {
    position: absolute;
    bottom: 7px;
    left: 12.5px;
    font-size: 12px;
    color: var(--white-600);
  }
}

.input-select {
  width: 200px;
}

@media screen and (max-width: 768px) {
  .swap {
    .input-form .input input {
      width: 100%;
    }
  }

  .swap-icon {
    min-width: 24px;
    max-width: 24px;
    min-height: 24px;
    max-height: 24px;
    margin-top: 2px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

<script setup lang="ts">
const store = useSwapStore();
const tournament = getTournament();

const {
  from,
  to,
  amountFrom,
  amountTo,
  isValidFrom,
  isValidTo,
} = storeToRefs(store);
const { swapPositions, setAmountFrom, setAmountTo, resetForm } = store;

const handleSwapPositions = () => {
  swapPositions();
  handleInput({ target: { value: amountFrom.value } } as any, "from");
};

const useMax = () => {
  if (!from.value) return;
  handleInput({ target: { value: from.value.amount } } as any, "from");
};

const handleInput = (e: Event, type: "from" | "to") => {
  if (!type) return;

  const target = e.target as HTMLInputElement;
  const value = target.value.toString();

  if (!from.value) {
    return resetForm();
  }

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

  if (Number(value) > Number(from.value?.allowance)) {
    from.value.needMoreApprove = true;
  } else {
    from.value.needMoreApprove = false;
  }

  typewatch(async () => {
    const result = await getAmountsOut(type);
    if (!result) return;

    type === "from" ? setAmountTo(result) : setAmountFrom(result);
  }, 300);
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
  return await tournament.getAmountsOut(options as AmountsOutOptions);
};

const getAmountsOutOptions = (type: string) => {
  return {
    amount: type === "from" ? amountFrom.value : amountTo.value,
    from: type === "from" ? from.value : to.value,
    to: type === "from" ? to.value : from.value,
  };
};

watch(to, () => {
  if (!to.value) return;
  handleInput({ target: { value: amountFrom.value } } as any, "from");
});

watch(from, () => {
  if (!from.value) return;
  handleInput({ target: { value: amountFrom.value } } as any, "from");
});
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
      </div>
      <div class="input-select" v-if="from">
        <div class="use-max" @click.stop="useMax">Use max</div>
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
      </div>
      <div class="input-select" v-if="to">
        <TokenSelect :token="to" emitted="to" />
      </div>
    </div>

    <!-- centered swap icon -->
    <div class="swap-icon" @click.stop="handleSwapPositions">
      <img src="@/assets/img/icons/swap.svg" alt="" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.swap {
  height: 115px;
  border: 1px solid var(--white-200);
  background: var(--white-100);
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  position: relative;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;

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
    color: var(--white-900);
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
      color: var(--accent);
    }
  }
}

.input-select {
  width: 200px;
  position: relative;
}

.use-max {
  font-size: 8px;
  color: var(--white-500);
  background: var(--white-100);
  border: 1px solid var(--white-100);
  border-radius: 30px;
  width: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 1;
  padding: 2px 0;

  top: 10px;
  right: 26px;

  &:hover {
    border: 1px solid var(--accent);
    color: var(--accent);
    cursor: pointer;
  }
}

@media screen and (max-width: 768px) {
  .swap {
    .input-form .input input {
      width: 100%;
    }

    height: 100%;
  }

  .input-form {
    flex-direction: column;
    align-items: flex-start;
    padding: 15px 5px;

    .input {
      flex: 1;
      width: 100%;
      order: 1;
    }

    .input-select {
      width: 100%;
    }
  }

  .use-max {
    top: 19px;
    right: 40px;
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

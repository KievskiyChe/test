<script setup lang="ts">
const { setSlippage } = useSwapStore();

const selected = ref(1);

const options = reactive([
  {
    value: 0.5,
    label: "0.5%",
  },
  {
    value: 1,
    label: "1%",
  },
  {
    label: "Custom %",
    value: null,
  },
]);

watch(
  () => options[2].value,
  (value) => {
    if (value) {
      setSlippage(value);
    }
  }
);
</script>

<template>
  <div class="tolerance">
    <span>Slippage tolerance</span>
    <div class="options">
      <div
        class="option"
        v-for="(option, index) in options"
        :key="index"
        :class="{ selected: index === selected }"
        @click.stop="(selected = index), setSlippage(option.value)"
      >
        <template v-if="index !== 2">
          {{ option.label }}
        </template>
        <template v-else>
          <input type="number" v-model="option.value" :placeholder="option.label" />
        </template>
      </div>
      <!-- <div class="option">
        <input type="number" placeholder="Custom %">
      </div> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.tolerance {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .options {
    display: flex;
    gap: 8px;
  }

  .option {
    background: var(--white-100);
    border: 1px solid var(--white-400);
    padding: 5px 8px;
    border-radius: 4px;
    cursor: pointer;

    &.selected {
      border-color: var(--shadow-yellow);
      background: var(--shadow-yellow);
      color: #000;

      input {
        color: #000;
      }
    }

    input {
      background: transparent;
      width: 80px;
      height: 100%;
      border: none;
      outline: none;
      color: #fff;
    }

    input::placeholder {
      color: #fff;
    }
  }
}

@media screen and (max-width: 1250px) {
  .tolerance {
    flex-direction: column;
    gap: 5px;
  }

  .tolerance {
    height: 60px;
    flex-direction: column;
  }
}
</style>

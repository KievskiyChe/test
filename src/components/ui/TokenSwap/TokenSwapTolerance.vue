<script setup lang="ts">
const { setSlippage } = useSwapStore();

const selected = ref(1);

const options = [
  {
    value: 0.5,
    label: "0.5%",
  },
  {
    value: 1,
    label: "1%",
  },
  {
    value: 1,
    label: "Custom %",
  },
];
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
        {{ option.label }}
      </div>
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

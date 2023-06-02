<script setup lang="ts">
import { cutString } from "@/common/helpers";
import TokenIcon from "@/components/ui/TokenIcon.vue";
const { game } = storeToRefs(useTournamentStore());

const props = defineProps<{
  id: number;
  token: IToken;
  field: string;
}>();

const data = computed(() => {
  const t = props.token as any;
  return t[props.field];
});
</script>

<template>
  <div class="token-price" v-if="game" :class="{ inactive: token.inactive }">
    <div class="token-id">{{ id }}.</div>

    <div class="icon">
      <TokenIcon :name="token.symbol" />
    </div>

    <div class="token-content">
      <span>{{ token.symbol }}</span>
      <span v-if="props.field === 'price'"
        >${{ cutString(parseString(data, 6), 10) }}</span
      >
      <span v-if="props.field === 'liquidityPool'"
        >${{ cutString(parseString(data, 4), 10) }}</span
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
.token-price {
  display: grid;
  grid-template-columns: 15px auto 1fr;
  align-items: center;
  position: relative;
  height: 38px;

  &.inactive {
    opacity: 0.5;
    user-select: none;
    pointer-events: none;
  }
}

.icon {
  position: relative;
  user-select: none;
  z-index: 1;
  transition: all 0.3s ease;
}

.token-content {
  position: absolute;
  width: calc(100% - 30px);
  height: 20px;
  left: 30px;
  border-radius: 0 30px 30px 0;

  background: linear-gradient(
    95.41deg,
    rgba(255, 255, 255, 0.114) 0%,
    rgba(255, 255, 255, 0.066) 50.4%,
    rgba(255, 255, 255, 0.294) 100%
  );

  font-size: 14px;
  padding-right: 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 30px;

  span:first-child {
    text-transform: uppercase;
  }
}
</style>

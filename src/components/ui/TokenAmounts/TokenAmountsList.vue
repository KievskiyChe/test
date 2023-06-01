<script setup lang="ts">
const store = useTournamentStore();
const { tokens } = storeToRefs(store);
const { availableAssets } = store;

const sortedTokens = computed(() => {
  return tokens.value.sort((a, b) => {
    if (a.amount > b.amount) return -1;
    if (a.amount < b.amount) return 1;
    return 0;
  });
});
</script>

<template>
  <Motion class="list">
    <div class="list-head">
      <!-- <span>balance</span> -->
      <span></span>
      <small>{{ availableAssets() }} assets</small>
    </div>

    <div class="list" v-if="tokens">
      <div v-for="(token, index) in sortedTokens" :key="index" class="token-item">
        <div class="token">
          <TokenIcon :name="token.symbol" :hexagon="false" />
          <div class="name">{{ token.name }}</div>
        </div>
        <span>{{ parseString(token.amount, 2) }}</span>
      </div>
    </div>
  </Motion>
</template>

<style scoped lang="scss">
.list {
  display: grid;
}

.list-head {
  margin-top: -10px;
  padding-bottom: 10px;
}

.list-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.list-head {
  text-transform: uppercase;
}

.list-head span {
  font-weight: 600;
}

.list-head small {
  font-size: 12px;
  font-weight: 100;
}

.list .token-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}

.list .token-item .token {
  display: flex;
  align-items: center;
  text-transform: uppercase;
  margin-left: -10px;
}

@media screen and (max-width: 768px) {
  .list {
    height: 90%;
  }
}
</style>

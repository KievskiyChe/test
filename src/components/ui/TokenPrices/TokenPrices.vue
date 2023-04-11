<script setup lang="ts">
const { tokens, process, game} = storeToRefs(useTournamentStore());

const formatedTokens = computed(() => {
  if (!game) return []
  return tokens.value.map((token) => {
    if (game.value?.loosers.includes(token.address)) {
      token.price = '0.00'
      token.inactive = true
    }
    return token
  })
})

const sortedTokens = computed(() => {
  return formatedTokens.value.sort((a, b) => {
    if (a.price > b.price) return -1
    if (a.price < b.price) return 1
    return 0
  })
})
</script>

<template>
  <div class="token-prices">
    <TheCard :swapEdges="true">
      <div class="wrapper">
        <div class="title">
          <span>token prices</span>
        </div>

        <Motion class="list" v-if="tokens && tokens.length && !process">
          <TokenPricesItem
            v-for="(token, index) in sortedTokens"
            :key="index"
            :id="index + 1"
            :token="token"
          />
        </Motion>

        <div class="load" v-if="process">
          <TheLoader />
        </div>
      </div>
    </TheCard>
  </div>
</template>

<style scoped lang="scss">
.token-prices {
  height: 100%;
  max-height: var(--board-height);
  min-width: 320px;
  max-width: 340px;
  display: flex;
}

.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 20px;
}

.title {
  text-align: left;
  span {
    font-size: 20px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
}

.list {
  height: 100%;
  max-height: 312px;
  display: grid;

  overflow-y: auto;
  padding: 0 2px;

  &::-webkit-scrollbar {
    width: 0;
  }
}

.load {
  position: absolute;

  top: 50%;
  left: 50%;
  translate: -50% -50%;
}

@media screen and (max-width: 768px) {
  .token-prices {
    min-width: 100%;
  }
}
</style>

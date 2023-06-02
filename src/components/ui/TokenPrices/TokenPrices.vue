<script setup lang="ts">
const { tokens, process, game} = storeToRefs(useTournamentStore());
const showLiquidity = ref(false);

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

const toggle = () => {
  showLiquidity.value = !showLiquidity.value;
};

const blur = {
  from: {
    'backdrop-filter': 'blur(0px)',
    '-webkit-backdrop-filter': 'blur(0px)'
  },
  to: {
    'backdrop-filter': 'blur(10px)',
    '-webkit-backdrop-filter': 'blur(10px)'
  }
}
</script>

<template>
  <div class="token-prices">
    <TheCard :background="1">
      <div class="wrapper">
        <div class="title">
          <span v-if="!showLiquidity">token prices</span>
          <span v-if="showLiquidity">token liquidities</span>
        </div>

        <Motion class="list" v-if="tokens && tokens.length && !process && !showLiquidity">
          <TokenPricesItem
            v-for="(token, index) in sortedTokens"
            :key="index"
            :id="index + 1"
            :token="token"
            field="price"
          />
        </Motion>

        <Motion class="list" v-if="tokens && tokens.length && !process && showLiquidity">
          <TokenPricesItem
            v-for="(token, index) in sortedTokens"
            :key="index"
            :id="index + 1"
            :token="token"
            field="liquidityPool"
          />
        </Motion>

        <div class="toggle" v-if="tokens && tokens.length && !process">
          <div
            class="toggle-point"
            :class="{ active: showLiquidity }"
            @click.stop="toggle"
          >
            <span></span>
          </div>
          <div
            class="toggle-point"
            :class="{ active: !showLiquidity }"
            @click.stop="toggle"
          >
            <span></span>
          </div>
        </div>

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
  position: relative;
  overflow: hidden;
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
  align-items: center;
  padding: 10px 2.5px;

  span {
    border-radius: 30px;
    background: var(--black-400);
    border: 1px solid var(--accent);

    width: 8px;
    height: 8px;
    opacity: 0.5;
    transition: all 0.3s ease;
  }

  cursor: pointer;

  &.active {
    cursor: unset;
    span {
      width: 12px;
      height: 12px;
      opacity: 1;
    }
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

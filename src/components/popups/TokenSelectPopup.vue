<script setup lang="ts">
const {
  tokens,
  game,
  usdc,
} = storeToRefs(useTournamentStore());
const { hideAllPopups } = usePopupsStore();
const { setTo, setFrom } = useSwapStore();

interface Props {
  emitted: string;
}

const props = defineProps<Props>();

const close = () => {
  hideAllPopups();
};

const setToken = (token: IToken) => {
  if (props.emitted === "from") setFrom(token);
  if (props.emitted === "to") setTo(token);
  close();
};


const formatedTokens = computed(() => {
  if (!game) return [];
  return tokens.value
    .filter((t) => t?.address !== usdc.value?.address)
    .map((token) => {
      if (game.value?.loosers.includes(token.address)) {
        token.price = "0.00";
        token.inactive = true;
      }
      return token;
    });
});

const sortedTokens = computed(() => {
  return formatedTokens.value.sort((a, b) => {
    if (+a.amount > +b.amount) return -1;
    if (+a.amount < +b.amount) return 1;
    return 0;
  });
});

const animation = {
  content: {
    from: {
      y: -30,
      "backdrop-filter": "blur(20px)",
      "-webkit-backdrop-filter": "blur(20px)",
    },
    to: { y: 0 },
  },
};
</script>

<template>
  <div class="token-select-popup">
    <div class="popup-overlay" @click.stop="close"></div>

    <Motion v-bind="animation.content" class="content">
      <div class="popup-content">
        <div class="title">Select token</div>

        <div class="list" v-if="game">
          <div
            v-if="usdc"
            class="list-item"
            :class="{ inactive: usdc.inactive }"
            @click.stop="setToken(usdc as IToken)"
          >
            <div class="token-icon">
              <TokenIcon
                :name="usdc.symbol"
                :hexagon="false"
                :border="false"
              />
            </div>
            <div class="token-data">
              <span class="token-name">{{ usdc.name }}</span>
              <span class="token-amount">{{ cutString(usdc.amount, 6) }}</span>
            </div>
          </div>
          <div
            class="list-item"
            v-for="(token, index) in sortedTokens"
            :key="index"
            :class="{ inactive: token.inactive }"
            @click.stop="setToken(token)"
          >
            <div class="token-icon">
              <TokenIcon
                :name="token.symbol"
                :hexagon="false"
                :border="false"
              />
            </div>
            <div class="token-data">
              <span class="token-name">{{ token.name }}</span>
              <span class="token-amount">{{ cutString(token.amount, 6) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="close" @click.stop="close"></div>
    </Motion>
  </div>
</template>

<style scoped lang="scss">
.token-select-popup {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;

  display: grid;
  place-items: center;
}

.content {
  background: linear-gradient(
      112.48deg,
      rgba(255, 255, 255, 0.2) 3.47%,
      rgba(255, 255, 255, 0) 101.88%
    );

  border: 1px solid var(--white-500);
  backdrop-filter: blur(15px);
  border-radius: 28px;
  padding: 35px 25px;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--black-600);
}

.popup-content {
  position: relative;
  height: 100%;
  width: 360px;
  display: grid;
  gap: 10px;
}

.title {
  font-size: 24px;
  text-align: center;
}

.list {
  display: grid;
}

.list-item {
  display: flex;
  align-items: center;
  text-transform: capitalize;
  height: 56px;
  gap: 10px;
  transition: all 0.3s ease;
  padding: 0 8px;
  border-radius: 8px;

  &.inactive {
    opacity: 0.5;
    user-select: none;
    pointer-events: none;
  }
}

.list-item:hover {
  cursor: pointer;
  background: var(--accent-400);

  .token-data {
    border-color: transparent;
  }
}

.token-icon {
  width: 41px;
  height: 41px;
  background: #000;
  border: 1px solid var(--gray);
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
}

.token-data {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--white-100);
}

.token-amount {
  font-size: 20px;
  font-weight: 600;
}

.close {
  position: absolute;
  width: 14px;
  height: 14px;

  top: 15px;
  right: 15px;

  display: flex;
  align-items: center;
  cursor: pointer;

  &::after,
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    background: var(--white-300);
  }

  &::after {
    rotate: -45deg;
  }

  &::before {
    rotate: 45deg;
  }
}

@media screen and (max-width: 768px) {
  .popup-content {
    width: 300px;

    max-height: 440px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 0;
    }
  }
}
</style>

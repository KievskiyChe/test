<script setup lang="ts"></script>

<template>
  <div class="battle-view">
    <div class="overlay" v-overlay>
      <img src="@/assets/img/backgrounds/1.webp" />
      <img src="@/assets/img/backgrounds/2.webp" />
      <img src="@/assets/img/backgrounds/3.webp" />
      <img src="@/assets/img/backgrounds/4.webp" />
      <img src="@/assets/img/backgrounds/5.webp" />
    </div>

    <div class="overlay overlay-mobile">
      <img src="@/assets/img/backgrounds/1.webp" />
    </div>

    <TheHeader />

    <main class="container content">
      <div class="board">
        <TokenSwap />
        <TokenPrices />
        <TokenAmounts />
      </div>

      <TheTournament />
    </main>

    <TheFooter />
  </div>
</template>

<style scoped lang="scss">
.battle-view {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  position: relative;

  display: grid;
  gap: 30px;
}

.content {
  width: 100%;
  height: 100%;

  display: grid;
}

.overlay {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  position: absolute;
  overflow: hidden;

  z-index: -1;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(37, 39, 47, 0.5);
    filter: contrast(120%);
  }

  &-mobile {
    display: none;
    top: -10px;
    left: -10px;
    width: calc(100% + 10px);
    min-height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.board {
  width: 100%;
  height: var(--board-height);
  display: flex;
  gap: 30px;
}

@media screen and (max-width: 1100px) {
  .board {
    flex-wrap: wrap;
    height: unset;
  }
}

@media screen and (max-width: 768px) {
  .board {
    height: 100%;
    justify-content: center;
  }

  .overlay {
    display: none;

    &-mobile {
      display: block;
    }
  }
}
</style>

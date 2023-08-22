<script setup lang="ts"></script>

<template>
  <div class="battle-view">
    <div class="overlay" v-overlay>
      <img src="@/assets/img/backgrounds/new/1.jpeg" alt="1" />
      <!-- <img src="@/assets/img/backgrounds/new/2.jpeg" alt="2" /> -->
      <img src="@/assets/img/backgrounds/new/3.jpeg" alt="3" />
      <!-- <img src="@/assets/img/backgrounds/new/4.jpeg" alt="4" /> -->
      <img src="@/assets/img/backgrounds/new/5.jpeg" alt="5" />
      <img src="@/assets/img/backgrounds/new/6.jpeg" alt="6" />
    </div>
<!--    <div class="overlay">-->
<!--      <img src="@/assets/img/bb.png" v-lazyload />-->
<!--    </div>-->

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
  height: 100vh;
  top: 0;
  left: 0;

  position: fixed;
  overflow: hidden;

  z-index: -1;

  div {
    height: 100%;
  }

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: var(--black-500);
    filter: contrast(120%);
  }

  &-mobile {
    display: none;
    top: -10px;
    left: -10px;
    width: calc(100% + 10px);
    min-height: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    /* display: none; */

    &-mobile {
      display: block;
    }
  }
}
</style>

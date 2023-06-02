<script setup lang="ts">
const store = useTournamentStore();
const { tokens } = storeToRefs(store);
const { percentage } = store;
</script>

<template>
  <Motion class="chart">
    <div
      class="circle"
      v-for="(token, index) in tokens"
      :key="index"
      :class="[
        { big: percentage(token.amount) > 40 },
        { empty: !percentage(token.amount) },
      ]"
      :data-percent="`%${percentage(token.amount).toFixed(0)}`"
    >
      <div class="mini" v-if="!percentage(token.amount)"></div>

      <div
        class="img"
        :style="getBackgroundImage(`tokens/${token.symbol}.png`)"
      ></div>
    </div>
  </Motion>
</template>

<style scoped lang="scss">
.chart {
  width: 100%;
  height: 100%;
  background-image: url("@/assets/img/icons/circles.svg");
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;

  margin-top: -10px;
  padding-bottom: 10px;
}

.chart .circle {
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--accent);

  top: 0;
  left: 0;

  background: var(--circle-bg);
  /* backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px); */

  display: flex;
  align-items: center;
  justify-content: center;

  .img {
    width: 100%;
    height: 100%;
    position: absolute;
    background-size: 100%;
    background-position: center center;
    border-radius: 50%;
  }

  .mini {
    background: var(--black-400);
    border: 1px solid var(--black-100);
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }

  &.empty {
    .img,
    &::before {
      display: none;
    }
    &::after {
      content: "";
      width: 14px;
      height: 14px;
      background-image: url("@/assets/img/icons/circle-empty.svg");
      background-repeat: no-repeat;
      position: absolute;

      top: 50%;
      left: 50%;
      translate: -50% -50%;
    }
  }

  &::after {
    content: "";
    width: 20px;
    height: 17px;
    position: absolute;
    background-image: url("@/assets/img/icons/circle-gun.svg");
    right: -20px;
    bottom: 5px;
    z-index: 1;
  }

  &::before {
    content: attr(data-percent);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid var(--accent);
    background: #000;
    position: absolute;
    bottom: -22px;
    right: -23px;
    font-size: 7px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  &.big {
    width: 50px;
    height: 50px;
    border-width: 4px;

    &::after {
      right: -12px;
      bottom: 12px;
    }

    &::before {
      bottom: -15px;
      right: -15px;
    }
  }

  &:nth-child(1) {
    top: 10.5%;
    left: 10%;
  }

  &:nth-child(2) {
    top: 25%;
    left: 42.5%;
  }

  &:nth-child(3) {
    top: 10%;
    left: 70%;
  }

  &:nth-child(4) {
    top: 40%;
    left: 10%;
  }

  &:nth-child(5) {
    top: 40%;
    left: 75%;
  }

  &:nth-child(6) {
    top: 75%;
    left: 10%;
  }

  &:nth-child(7) {
    top: 64%;
    left: 42.5%;
  }

  &:nth-child(8) {
    top: 80%;
    left: 70%;
  }
}
</style>

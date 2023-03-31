<script setup lang="ts"></script>

<template>
  <div class="card-wrapper">
    <TheCard :smallEdges="true">
      <div class="stats">
        <div class="stats-prize">
          <img src="@/assets/img/icons/prize.svg" alt="prize" />
          <div class="stats-title">
            <span>total prize <br />pool</span>
            <h2><sup>$</sup>0</h2>
          </div>

          <div class="info-icon"></div>
        </div>

        <div class="stats-players">
          <img src="@/assets/img/icons/players.svg" alt="players" />
          <div class="stats-title">
            <span>players</span>
            <h2>0</h2>
          </div>
        </div>
      </div>
    </TheCard>
  </div>
</template>

<style scoped lang="scss">
.stats {
  display: grid;
  gap: 20px;
  position: relative;

  img {
    width: 40px;
  }
}

.stats .info-icon {
  position: absolute;
  top: 10px;
  right: -10px;

  width: 12px;
  height: 12px;
  border: 1.5px solid;
  cursor: pointer;

  &::after {
    content: "i";
    font-size: 7px;
    font-weight: bold;

    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 0.5px;
  }
}

.stats-prize,
.stats-players {
  display: flex;
  gap: 15px;
}

.stats-title {
  display: grid;
  gap: 5px;

  span {
    text-transform: uppercase;
  }
  sup {
    font-size: 14px;
  }

  h2 {
    font-size: 32px;
    display: flex;
    align-items: center;
    gap: 3px;
  }
}
</style>

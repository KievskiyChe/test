<script setup lang="ts">
const { game, round } = storeToRefs(useTournamentStore());

const isActive = (token: IToken, winner: IToken, active: boolean) => {
  if (active) return true;
  if (!token || !winner) return false;
  return token.symbol === winner.symbol;
};

const isWinner = (token: IToken, winner: IToken) => {
  if (!token || !winner) return false;
  return token.symbol === winner.symbol;
};
</script>

<template>
  <div class="tournament">
    <div class="title">TOURNAMENT</div>
    <div class="content">
      <div class="sidebar">
        <div class="sidebar-title">tournament <br />stats:</div>

        <div class="sidebar-data">
          <!-- prize and players -->
          <TheTournamentStats />
  
          <!-- status and timer -->
          <TheTournamentStatus />
        </div>
      </div>

      <!-- players -->
      <div class="players" v-if="game">
        <div class="section" v-for="(r, i) of game.getRounds()" :key="i">
          <div class="pair" v-for="(pair, j) in r.pairs" :key="j">
            <ThePlayer
              :token="pair.token1"
              :active="isActive(pair.token1, pair.winner, r.active)"
              :winner="isWinner(pair.token1, pair.winner)"
              :past="i < round"
            />
            <ThePlayer
              :token="pair.token2"
              :active="isActive(pair.token2, pair.winner, r.active)"
              :winner="isWinner(pair.token2, pair.winner)"
              :past="i < round"
            />

            <span class="pair-name" v-if="pair.token1">
              <small>{{ pair.token1?.symbol }}</small>
              <small>vs</small>
              <small>{{ pair.token2?.symbol }}</small>
            </span>

            <div class="battle-icon">
              <Motion v-if="r.active">
                <img src="@/assets/img/icons/battle-icon-active.svg" alt="" />
              </Motion>
              <Motion v-if="!r.active">
                <img src="@/assets/img/icons/battle-icon-inactive.svg" alt="" />
              </Motion>
            </div>
          </div>
        </div>
      </div>

      <div class="players-process" v-if="!game">
        <div class="process">
          <TheLoader />
          <span>Loading tournament...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.title {
  text-align: center;
  padding: 80px 0;
  font-size: 32px;
  // font-family: "Aurebesh", sans-serif;
}

.content {
  display: grid;
  grid-template-columns: 230px 1fr;
  gap: 30px;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 25px;

  &-data {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }
}

.sidebar-title {
  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  line-height: 32px;
}

.players {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.players-process {
  display: grid;
  place-items: center;
  height: 100%;
}

.players-process .process {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;

  width: 240px;
  height: 140px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.015);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 50px;
}

.section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  padding-right: 30px;
}

.pair {
  display: grid;
  gap: 30px;
  position: relative;

  &-name {
    display: none;

    align-items: center;
    flex-direction: column;
    justify-content: center;

    top: 50%;
    left: 50%;
    font-size: 12px;
    text-align: center;
    position: absolute;
    translate: -50% -50%;

    gap: 5px;

    small {
      font-weight: 900;
      text-align: center;
      font-size: 14px;
      text-transform: uppercase;
      /* color: #1e1e1e;
      text-shadow: -1px -1px 0 var(--accent), 1px -1px 0 var(--accent),
      -1px 1px 0 var(--accent), 1px 1px 0 var(--accent); */

      &:nth-child(2) {
        color: var(--accent);
        font-size: 9px;
        text-shadow: none;
        text-transform: lowercase;
        font-weight: 500;
      }
    }
  }
}

.battle-icon {
  position: absolute;
  top: 50%;
  right: -18px;
  translate: 0 calc(-50%);
}

@media screen and (max-width: 768px) {
  .content {
    justify-content: center;
  }
  .content {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .players {
    gap: unset;
    padding: 40px 20px;
    border-radius: 8px;
    background: var(--card-bg);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid var(--white-50);

    .section {
      padding-right: 14px;
      gap: 25px;
    }

    .pair {
      gap: 60px;
      padding: 0;

      &-name {
        display: flex;
      }
    }

    .battle-icon {
      top: 48%;
      right: calc(50% - 61px);
    }
  }

  .timer-wrapper {
    display: grid;
    place-items: center;
  }

  .sidebar-title {
    text-align: center;
  }

  .stats {
    justify-content: center;
  }
}
</style>

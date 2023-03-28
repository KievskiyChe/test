<script setup lang="ts">
import { addTokenToMetaMask } from "@/common/helpers";
const { id, round, isActive, tokens, process } = storeToRefs(
  useTournamentStore()
);

const scaleAnimation = {
  from: { y: -20 },
  to: { y: 0 },
};
</script>

<template>
  <div class="home-view">
    <div class="overlay" v-overlay>
      <img src="@/assets/img/backgrounds/1.webp" />
      <img src="@/assets/img/backgrounds/2.webp" />
      <img src="@/assets/img/backgrounds/3.webp" />
      <img src="@/assets/img/backgrounds/4.webp" />
      <img src="@/assets/img/backgrounds/5.webp" />
    </div>

    <TheHeader />

    <main class="container">
      <TheCircle />

      <div class="content">
        <div class="info" v-if="isActive">
          <Motion
            class="text text-right"
            v-if="!process"
            :delay="0.5"
            v-bind="scaleAnimation"
          >
            <router-link to="/battle">tournament # {{ id + 1 }}</router-link>
          </Motion>
          <div class="text" v-else></div>

          <div class="splitter">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <Motion
            class="text text-left"
            v-if="!process"
            :delay="0.65"
            v-bind="scaleAnimation"
          >
            <router-link to="/battle">round # {{ round + 1 }}</router-link>
          </Motion>
          <div class="text" v-else></div>
        </div>

        <Motion :delay="0.35" v-bind="scaleAnimation">
          <div class="title">
            <h1>The Galactic War is <br />upon us...</h1>
          </div>
        </Motion>

        <Motion :delay="0.8" v-if="tokens">
          <div class="token-list">
            <Motion
              v-for="(token, index) in tokens"
              :key="index"
              :from="{ y: -10 }"
              :to="{ y: 0 }"
              :delay="0.15 * index"
            >
              <TokenIconCircle
                :token="token.symbol"
                @click.stop="addTokenToMetaMask(token.symbol)"
              />
            </Motion>
          </div>
        </Motion>

        <Motion v-if="!tokens">
          <div class="token-list"></div>
        </Motion>
      </div>
    </main>

    <!-- <Motion :delay="2" :from="{ y: 20 }" :to="{ y: 0 }">
      <div class="timer-wrapper">
        <TheTimer title="time from last battle" />
      </div>
    </Motion> -->

    <TheFooter />
  </div>
</template>

<style scoped lang="scss">
.home-view {
  height: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  position: relative;
  overflow: hidden;
}

.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(37, 39, 47, 0.5);
    filter: contrast(120%);
  }
}

main {
  height: 100%;
  width: 100%;
  padding: 30px;

  display: grid;
  place-items: center;
  position: relative;
}

.content {
  position: absolute;
  display: grid;
  gap: 30px;
  text-align: center;
  justify-content: center;
}

.info {
  display: grid;
  grid-template-columns: 150px auto 150px;
  align-items: center;
  justify-content: center;
  gap: 25px;
  position: relative;

  .text {
    text-transform: uppercase;
    letter-spacing: 0.18em;
    height: 20px;

    &-left {
      text-align: left;
    }

    &-right {
      text-align: right;
    }
  }

  .splitter {
    display: flex;
    align-items: center;
    gap: 20px;

    span {
      &:nth-child(2) {
        width: 10px;
        height: 10px;
        border: 1px solid var(--white-200);
        rotate: 45deg;
      }

      &:nth-child(1),
      &:nth-child(3) {
        width: 20px;
        height: 1px;
        background: var(--white-200);
      }
    }
  }
}

.title {
  h1 {
    font-size: 60px;
    font-weight: 600;
    letter-spacing: 0.35em;
    color: var(--shadow-yellow);
    text-transform: uppercase;
  }
}

.timer-wrapper {
  position: fixed;
  bottom: 80px;
  left: 80px;
}

.token-list {
  display: flex;
  gap: 10px;
  height: 48px;
  justify-content: center;
}

.token-list .circle {
  width: var(--token-list-item-size);
  height: var(--token-list-item-size);
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.2);
}

@media screen and (max-width: 768px) {
  main {
    padding: 30px 17px;
  }

  .content {
    position: relative;
    overflow: hidden;
  }

  .info {
    gap: 10px;

    .splitter {
      gap: 10px;
    }

    a {
      font-size: 14px;
    }
  }

  .title {
    h1 {
      font-size: 40px;
    }
  }

  .timer-wrapper {
    position: relative;
    left: 0;
    bottom: 0;

    height: 250px;

    display: grid;
    place-items: center;
  }
}
</style>

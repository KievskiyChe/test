<script setup lang="ts">
const { rewards } = storeToRefs(useRewardsStore());
const { process } = storeToRefs(useTournamentStore());

const animation = {
  from: {
    y: -30,
    "backdrop-filter": "blur(0px)",
  },
  to: {
    y: 0,
    "backdrop-filter": "blur(20px)",
  },
};
</script>
<template>
  <div class="history">
    <div class="overlay">
      <img src="@/assets/img/claim-history-bg.png" alt="" v-lazyload />
    </div>

    <TheHeader />

    <main class="content container">
      <div class="title">
        <h1>Battle History</h1>
        <p>prizes information</p>
      </div>

      <div class="rewards" v-if="!process">
        <template v-if="rewards.length">
          <div class="list">
            <Motion
              v-bind="animation"
              v-for="(claim, i) in rewards"
              :key="i"
              :delay="i * 0.1"
            >
              <ClaimCard :claim="claim" />
            </Motion>
          </div>
        </template>

        <template v-if="!rewards.length">
          <Motion>
            <div class="wrapper">
              <p>No rewards yet</p>
            </div>
          </Motion>
        </template>
      </div>

      <div class="process" v-if="process">
        <div class="wrapper">
          <TheLoader />
        </div>
      </div>
    </main>

    <TheFooter />
  </div>
</template>

<style scoped lang="scss">
.history {
  height: 100%;
  min-height: 100vh;
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr 80px;
  overflow: hidden;
  gap: 30px;
}

.process {
  height: 100%;
  display: grid;
  place-items: center;
}

.process .wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 140px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.015);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 50px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: radial-gradient(
      30.58% 50% at 50% 50%,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.7) 100%
    );
  }
}

.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  text-align: center;
}

.title {
  display: flex;
  flex-direction: column;
  gap: 10px;

  h1 {
    font-size: 36px;
  }
  p {
    font-size: 20px;
    text-transform: uppercase;
  }
}

.list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
}

@media screen and (max-width: 768px) {
  .list {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
</style>

<script setup lang="ts">
const retry = () => window.location.reload();
</script>

<template>
  <div class="offline-view">
    <div></div>
    <main class="container content">
      <Motion class="offline">
        <img src="@/assets/img/icons/offline.svg" />
        <p>You’re offline</p>
        <div class="button-wrapper">
          <TheButton @click.stop="retry">
            <span>retry</span>
          </TheButton>
        </div>
      </Motion>
    </main>
    <TheFooter />
  </div>
</template>

<style scoped lang="scss">
.offline-view {
  height: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-rows: 80px 1fr 80px;
  position: relative;
  overflow: hidden;
  background-image: url("@/assets/img/claim-history-bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  animation: animate 120s ease infinite;
}

.offline {
  width: 200px;
  text-align: center;
  display: grid;
  place-items: center;
  gap: 20px;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: 600;
  color: var(--shadow-yellow);
}

.button-wrapper {
  width: 80%;
}

main {
  height: 100%;
  width: 100%;
  padding: 30px;

  display: grid;
  place-items: center;
  position: relative;
}

@keyframes animate {
  0% {
    background-size: 100%;
  }
  50% {
    background-size: 120%;
  }
  100% {
    background-size: 100%;
  }
}
</style>

<script setup lang="ts">
const { isActive, round, startTime } = storeToRefs(useTournamentStore());
</script>

<template>
  <div class="card-wrapper">
    <TheCard background="5" v-if="startTime">
      <div class="info">
        <div class="info-head">
          <div class="round-number">
            <div class="round-from">
              <span>0{{ round + 1 > 3 ? 3 : round + 1 }}/</span>
              <small>03</small>
            </div>
            <span>round</span>
          </div>

          <div class="badge" :class="{ active: isActive }">
            {{ isActive ? "active" : "end" }}
          </div>
        </div>

        <div class="wrapper">
          <div class="timer-wrapper">
            <TheTimer title="round time" :time="startTime" />
          </div>

          <div class="info-bottom">min 10 h max 30 h</div>
        </div>
      </div>
    </TheCard>

    <TheCard v-else>
      <div class="card-loading">
        <TheLoader />
      </div>
    </TheCard>
  </div>
</template>

<style scoped lang="scss">
.info {
  display: grid;
  gap: 20px;
}

.card-loading {
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-head {
  display: flex;
  justify-content: space-between;

  .round-number {
    display: grid;
    font-size: 20px;
    text-transform: uppercase;
    font-weight: 600;
  }
  .round-from {
    display: flex;
    span,
    small {
      font-size: 24px;
      /* font-family: "Aurebesh"; */
    }

    small {
      margin-top: 5px;
      font-size: 12px;
    }
  }
}

.info-bottom {
  color: var(--white-200);
  border: 1px solid var(--white-100);
  font-size: 12px;
  text-transform: uppercase;
  border-radius: 30px;
  background: var(--black-200);
  text-align: center;
  padding: 2px 0;
}

.wrapper {
  display: grid;
  gap: 5px;
}

.badge {
  margin-top: 5px;
  height: 21px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0.13em;
  border-radius: 30px;

  color: var(--accent);
  background: var(--accent-500);
  box-shadow: 0px 2px 2px rgba(255, 255, 255, 0.1),
    inset 0px 4px 4px var(--accent-500);

  &.active {
    box-shadow: inset 0px 4px 4px rgba(66, 192, 247, 0.5);
    filter: drop-shadow(0px 2px 2px rgba(73, 73, 73, 0.1));
  }
}

.timer-wrapper {
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 768px) {
  .info {
    gap: 10px;
    display: flex;
    justify-content: space-between;
  }

  .info-head {
    flex-direction: column;
    position: relative;
    justify-content: center;
    gap: 5px;
    text-align: center;
    align-items: center;

    &::after {
      content: "";
      position: absolute;
      width: 1px;
      top: 20%;
      height: 60%;
      background: var(--white-100);
      right: -40px;
      border-radius: 2px;
    }
  }

  .wrapper {
    display: grid;
    gap: 5px;
  }
}
</style>

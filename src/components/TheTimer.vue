<script setup lang="ts">
import { useIntervalFn } from "@vueuse/core";

interface Props {
  title?: string;
  time?: number; // timestamp, for example: Date.now()
}

const props = withDefaults(defineProps<Props>(), {
  title: "title",
  time: 0,
});

const hours = ref(0);
const mins = ref(0);
const secs = ref(0);

const calculateTime = () => {
  if (!props.time) return;

  const d1 = new Date().getTime();
  const d2 = new Date(props.time).getTime();

  const diff = d1 - d2;

  hours.value = Math.floor(diff / (1000 * 60 * 60));
  mins.value = Math.floor((diff / (1000 * 60)) % 60);
  secs.value = Math.floor((diff / 1000) % 60);
};

onMounted(() => {
  useIntervalFn(() => {
    calculateTime();
  }, 500);
});
</script>

<template>
  <div class="timer">
    <div class="wrapper" v-if="props.time">
      <div class="title">{{ props.title }}</div>

      <div class="digits">
        <!-- hours -->
        <div class="symbols hours">
          <div class="value">{{ hours }}</div>
        </div>

        <span>:</span>

        <!-- minutes -->
        <div class="symbols mins">
          <div class="value">{{ mins }}</div>
        </div>

        <span>:</span>

        <!-- seconds -->
        <div class="symbols secs">
          <div class="value">{{ secs }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.timer {
  height: 85px;
  width: 150px;
  display: grid;
  gap: 15px;
}

.wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.title {
  text-align: right;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-size: 13px;
  line-height: 150%;
  padding-right: 10px;
}

.digits {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.symbols {
  display: grid;
  gap: 5px;
  position: relative;

  &.hours,
  &.mins,
  &.secs {
    &::after {
      font-size: 8px;
      text-align: center;
      text-transform: uppercase;
    }
  }

  &.hours {
    &::after {
      content: "hours";
    }
  }

  &.mins {
    &::after {
      content: "mins";
    }
  }

  &.secs {
    &::after {
      content: "secs";
    }
  }
}

.value {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;

  background: rgba(0, 0, 0, 0.2);

  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  // font-family: "Aurebesh";
  font-size: 12px;
}

@media screen and (max-width: 768px) {
  .title {
    text-align: center;
    padding-right: 0;
  }

  .wrapper {
    width: 100%;
    justify-content: center;
  }
}
</style>

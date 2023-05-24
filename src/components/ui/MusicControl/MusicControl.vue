<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";

const outside = ref<HTMLElement | null>(null);

const isPlaying = ref(false);
const sound = ref<HTMLAudioElement>();
const currentTime = ref(0);
const duration = ref(0);
const volumeOn = ref(true);

const showCard = ref(false);

const play = () => {
  isPlaying.value = true;
  sound.value?.play();
};

const pause = () => {
  isPlaying.value = false;
  sound.value?.pause();
};

const update = () => {
  currentTime.value = sound.value?.currentTime || 0;
  duration.value = sound.value?.duration || 0;

  if (!volumeOn.value) {
    sound.value!.volume = 0;
  } else {
    sound.value!.volume = 1;
  }
};

const percent = computed(() => {
  if (!duration.value || !currentTime.value) return 0;
  return (currentTime.value / duration.value) * 100;
});

const parseTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time - minutes * 60);

  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
};

const handleChangePlayTime = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const rect = target.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const percent = x / target.offsetWidth;
  const newTime = percent * duration.value;
  sound.value!.currentTime = newTime;
};

onClickOutside(outside, () => {
  showCard.value = false;
});

onMounted(() => {
  sound.value = unref(sound);
  sound.value?.addEventListener("ended", () => {
    isPlaying.value = false;
  });
});
</script>

<template>
  <div ref="outside">
    <audio
      src="/sounds/sound.wav"
      hidden
      ref="sound"
      :ontimeupdate="update"
      loop
    ></audio>

    <div class="icon" @click="showCard = !showCard">
      <img src="@/assets/img/icons/music.svg" alt="music" />
    </div>

    <Motion>
      <div class="player" v-if="showCard">
        <TheCard :small-edges="true">
          <div class="player-content">
            <div class="player-head">
              <div class="left">
                <div class="sound-name">Slippage</div>
                <div class="sound-desc">Slippage tolerance</div>
              </div>
              <div class="right">
                <img
                  v-if="volumeOn"
                  src="@/assets/img/icons/sound-on.svg"
                  alt=""
                  @click="volumeOn = false"
                />
                <img
                  v-if="!volumeOn"
                  src="@/assets/img/icons/sound-off.svg"
                  alt=""
                  @click="volumeOn = true"
                />
              </div>
            </div>

            <div class="player-body">
              <div class="time">{{ parseTime(currentTime) }}</div>
              <div class="progress" @click="handleChangePlayTime($event)">
                <div
                  class="progress-bar"
                  :style="{ width: percent + '%' }"
                ></div>
              </div>
              <div class="time">{{ parseTime(duration) }}</div>
            </div>

            <div class="player-actions">
              <img
                v-if="isPlaying"
                src="@/assets/img/icons/sound-pause.svg"
                alt=""
                @click.stop="pause()"
              />
              <img
                v-if="!isPlaying"
                src="@/assets/img/icons/sound-play.svg"
                alt=""
                @click.stop="play()"
              />
            </div>
          </div>
        </TheCard>
      </div>
    </Motion>
  </div>
</template>

<style scoped lang="scss">
.icon {
  height: 20px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
}

.sound-name {
  font-weight: 600;
}

.sound-desc {
  opacity: 0.6;
}

.time {
  opacity: 0.6;
  font-size: 14px;
}

.player {
  width: 370px;
  height: 160px;
  position: absolute;
  margin-top: 20px;

  img {
    cursor: pointer;
  }
}

.player-content {
  display: grid;
  gap: 15px;
}

.player-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.player-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.player-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.progress {
  width: 100%;
  height: 8px;
  border-radius: 8px;
  overflow: hidden;

  background: linear-gradient(
    95.41deg,
    rgba(0, 0, 0, 0.114) 0%,
    rgba(0, 0, 0, 0.066) 50.4%,
    rgba(0, 0, 0, 0.294) 100%
  );
  backdrop-filter: blur(10px);

  &-bar {
    height: 100%;
    border-radius: 8px;
    background-color: var(--shadow-yellow);
  }
}

@media screen and (max-width: 768px) {
  .player {
    left: -47px;
  }
}
</style>

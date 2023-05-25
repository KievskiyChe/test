<script setup lang="ts">
import { onClickOutside, useStorage, useElementBounding } from "@vueuse/core";

const outside = ref<HTMLElement | null>(null);
const progressRef = ref<HTMLElement | null>(null);

const isPlaying = ref(false);
const sound = ref<HTMLAudioElement>();
const currentTime = ref(0);
const duration = ref(0);
const volumeOn = useStorage("volumeOn", true);
const volume = useStorage("volume", 0.5) || 0.5;

const showCard = ref(false);

const play = async () => {
  try {
    isPlaying.value = true;
    sound.value
      ?.play()
      .then(() => Promise.resolve())
      .catch(() => Promise.reject());
  } catch (error) {
    Promise.reject(error);
  }
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
    return;
  } else {
    sound.value!.volume = volume.value;
  }
};

const volumeUp = () => {
  volume.value! += 0.1;
  volumeOn.value = true;
  if (volume.value >= 1) {
    volume.value = 1;
  }
};

const volumeDown = () => {
  if (!volume.value) return;

  volume.value -= 0.1;
  if (volume.value <= 0.1) {
    volume.value = 0;
    volumeOn.value = false;
  }
};

const percent = computed(() => {
  if (!duration.value || !currentTime.value) return 0;
  return (currentTime.value / duration.value) * 100;
});

const volumePercent = computed(() => {
  return parseInt((volume.value * 100).toString(), 10);
});

const parseTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time - minutes * 60);

  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
};

const handleChangePlayTime = (e: MouseEvent) => {
  const { width } = useElementBounding(progressRef);

  const percent = (e.offsetX / width.value) * 100;
  const time = (percent * duration.value) / 100;

  sound.value!.currentTime = time;

  if (!isPlaying.value) {
    play();
  }
};

onClickOutside(outside, () => {
  showCard.value = false;
});

onMounted(() => {
  const item = localStorage.getItem("volume");
  if (!item || !parseFloat(item)) {
    volume.value = 0.5;
  }

  sound.value = unref(sound);
  sound.value?.addEventListener("ended", () => {
    isPlaying.value = false;
  });

  sound.value?.addEventListener("loadedmetadata", () => {
    duration.value = sound.value?.duration || 0;
  });

  setTimeout(() => {
    const tryToPlay = setInterval(() => {
      play()
        .then(() => {
          clearInterval(tryToPlay);
        })
        .catch((error) => {
          console.info("User has not interacted with document yet.");
        });
    }, 300);
  }, 1000);
});
</script>

<template>
  <div ref="outside" class="music-control" :class="{ active: showCard }">
    <audio
      src="/sounds/sound.wav"
      hidden
      ref="sound"
      loop
      :ontimeupdate="update"
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
                <div class="sound-name">Awakness</div>
                <div class="sound-desc">Epic music</div>
              </div>
              <div class="right">
                <div class="right-state">
                  <div class="action-icon mute" v-if="volumeOn">
                    <img
                      src="@/assets/img/icons/sound-on.svg"
                      alt=""
                      @click="volumeOn = false"
                    />
                  </div>

                  <div class="action-icon mute" v-if="!volumeOn">
                    <img
                      src="@/assets/img/icons/sound-off.svg"
                      alt=""
                      @click="volumeOn = true"
                    />
                  </div>
                  <div class="volume-progress">{{ volumePercent }}</div>
                </div>

                <div class="volume">
                  <div class="up" @click.stop="volumeUp()"></div>
                  <div class="down" @click.stop="volumeDown()"></div>
                </div>
              </div>
            </div>

            <div class="player-body">
              <div class="time">{{ parseTime(currentTime) }}</div>
              <div
                class="progress"
                @click="handleChangePlayTime($event)"
                ref="progressRef"
              >
                <div
                  class="progress-bar"
                  :style="{ width: percent + '%' }"
                ></div>
              </div>
              <div class="time">{{ parseTime(duration) }}</div>
            </div>

            <div class="player-actions">
              <div class="action-icon" v-if="isPlaying">
                <img
                  src="@/assets/img/icons/sound-pause.svg"
                  alt=""
                  @click.stop="pause()"
                />
              </div>

              <div class="action-icon" v-if="!isPlaying">
                <img
                  src="@/assets/img/icons/sound-play.svg"
                  alt=""
                  @click.stop="play()"
                />
              </div>
            </div>
          </div>
        </TheCard>
      </div>
    </Motion>
  </div>
</template>

<style scoped lang="scss">
.music-control {
  position: relative;

  &.active {
    .icon {
      &::after {
        border: 1px solid rgba(255, 255, 255, 0.3);
        box-shadow: 0px 0px 8px 2px #f9d66750;
      }
    }
  }
}

.icon {
  padding: 6px;
  cursor: pointer;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    rotate: 45deg;
    transition: all 0.3s ease;
    border: 1px solid transparent;
    border-radius: 4px;
  }
}

.volume {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 34px;

  .up {
    &::after {
      content: "+";
    }
  }

  .down {
    &::after {
      content: "-";
    }
  }

  .up,
  .down {
    border: 1px solid transparent;
    opacity: 0.3;
    width: 12px;
    height: 14px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    font-size: 14px;
  }

  .up:hover,
  .down:hover {
    cursor: pointer;
    opacity: 1;
    color: var(--shadow-yellow);
  }

  .up:active,
  .down:active {
    transform: scale(0.9);
  }
}

.volume-progress {
  opacity: 0.6;
  font-size: 7px;
  text-align: center;
  user-select: none;
}

.sound-name {
  font-weight: 600;
}

.sound-desc {
  opacity: 0.6;
}

.time {
  opacity: 0.6;
  font-size: 11px;
  width: 50px;
  text-align: center;
}

.right {
  display: flex;
  align-items: center;
  position: relative;
  gap: 4px;

  &-state {
    height: 34px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }
}

.player {
  width: 370px;
  height: 160px;
  position: absolute;
  margin-top: 20px;
}

.action-icon {
  width: 24px;
  height: 24px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &.mute {
    width: 20px;
    height: 20px;
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
  margin-top: 10px;
}

.player-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.progress {
  width: 100%;
  height: 6px;
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

  &:hover {
    cursor: pointer;
  }
}

@media screen and (max-width: 768px) {
  .player {
    left: -44px;
  }
}
</style>

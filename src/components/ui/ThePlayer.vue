<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";

const { width, height } = useWindowSize();

interface Props {
  active?: boolean;
  token?: IToken;
  winner?: boolean;
  past?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  winner: false,
  past: false,
});

const color = computed(() => {
  if (props.active && props.past) return "#70D0B550";
  if (props.active && !props.past) return "#70D0B5";
  if (!props.active && props.past) return "#aab2cc50";
  if (!props.active && !props.past) return "#aab2cc";
  return "#aab2cc";
});

const mobile = computed(() => {
  return width.value < 768;
});
</script>

<template>
  <div
    class="player"
    :class="[
      { active: props.active },
      { winner: props.winner },
      { looser: !props.winner },
      { past: props.past },
    ]"
  >
    <div class="card">
      <img
        src="@/assets/img/p-active.svg"
        alt=""
        v-if="
          !mobile && (props.winner && token || !props.winner && !props.past && token)
        "
      />
      <img
        src="@/assets/img/p-inactive-p.svg"
        alt=""
        v-if="!props.winner && props.past && !mobile"
      />
      <img src="@/assets/img/p-inactive-f.svg" alt="" v-if="!token && !mobile" />

      <div class="icon">
        <ThePlayerToken
          v-if="token?.symbol"
          :name="token?.symbol"
          :active="props.active"
          :big="mobile"
          :border="!props.winner && props.past ? '1px solid #ffffff50' : '1px solid var(--accent)'"
        />
      </div>

      <div class="winner-icon" v-if="props.winner">
        <img src="@/assets/img/icons/winner-icon.svg" alt="" />
      </div>

      <div class="player-name" v-if="token">
        <small class="winner" v-if="winner">winner</small>
        <span>{{ token.name }}</span>
      </div>
    </div>

    <div class="connect-lines"></div>
  </div>
</template>

<style scoped lang="scss">
.player {
  position: relative;

  #layer {
    fill: url(#gradientInactive);
  }

  // odd (1,3,5,7)
  &:nth-child(odd) .connect-lines {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;

    &::after {
      content: "";
      position: absolute;
      width: 8px;
      height: 54%;
      border: 2px dotted #aab2cc;
      border-radius: 0 3px 3px 0;
      top: 54%;
      right: -9px;
      border-left: 0;
      border-bottom: 0;
      border-bottom-right-radius: 0;
    }
  }

  // even (2,4,6,8)
  &:nth-child(even) .connect-lines {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;

    &::after {
      content: "";
      position: absolute;
      width: 8px;
      height: 54%;
      border: 2px dotted #aab2cc;
      border-radius: 0 3px 3px 0;
      bottom: 44%;
      right: -9px;
      border-left: 0;
      border-top: 0;
      border-top-right-radius: 0;
    }
  }

  svg {
    width: 100%;
    height: 100%;

    path {
      stroke: v-bind(color);
    }
  }
}

.player.winner.past {
  #layer {
    fill: url(#gradientActivePast);
  }

  .player-name span {
    color: #fff;
  }
}

.player.looser.past {
  #layer {
    fill: url(#gradientInactivePast);
  }
}

.player.looser.past {
  .player-name span {
    opacity: 0.5;
  }
}

.player .card {
  position: relative;
  &::after {
    content: "";
    position: absolute;
    width: 90%;
    height: 60%;
    left: 3.25%;
    top: 25%;
    border-radius: 10px;
    background: var(--black-100);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    z-index: -1;
  }
  img {
    width: 100%;
  }
}

.player .icon {
  position: absolute;
  width: 100%;
  height: 100%;

  top: 6px;
  left: 8px;
}

.player .winner-icon {
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: var(--accent);

  top: 30px;
  left: 34px;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.player-name {
  position: absolute;
  width: 100%;
  height: 100%;

  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 10px;

  span {
    font-weight: 900;
    text-align: center;
    font-size: 18px;
    text-transform: uppercase;
    color: #fff;
    background-color: transparent;
  }

  small {
    font-weight: 900;
    text-transform: uppercase;
    font-size: 9px;
    color: #70d0b5;
  }
}

.player.active {
  .connect-lines::after {
    border-color: var(--accent);
  }

  #layer {
    fill: url(#gradientActive);
  }
}

@media screen and (max-width: 1100px) {
  .player-name {
    padding-top: 5px;

    span {
      font-size: 12px;
    }
    small {
      font-size: 7px;
    }
  }

  .player .winner-icon {
    top: unset;
    top: 15px;
    left: 20px;
    width: 12px;
    height: 12px;
  }
}

@media screen and (max-width: 768px) {
  .player {
    svg {
      display: none;
    }

    &-name {
      display: none;
    }

    .icon {
      top: unset;
      left: unset;
      position: relative;
      display: flex;
      justify-content: center;
    }

    // odd (1,3,5,7)
    &:nth-child(odd) .connect-lines {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;

      &::after {
        height: 79%;
        top: 50%;
        right: calc(50% - 50px);
        border-radius: 0;
      }

      &::before {
        display: none;
      }
    }

    // even (2,4,6,8)
    &:nth-child(even) .connect-lines {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;

      &::after {
        height: 78%;
        bottom: 50%;
        right: calc(50% - 50px);
        border-radius: 0;
      }

      &::before {
        display: none;
      }
    }
  }

  .player .card {
    padding: 10px 0;
    min-height: 60px;
    &::after {
      height: 100%;
      top: 0;
    }
  }

  .player .winner-icon {
    top: unset;
    bottom: 10px;
    left: unset;
    right: 25px;
  }
}
</style>

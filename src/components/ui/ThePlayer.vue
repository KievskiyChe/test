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
  if (props.active && props.past) return "#f9d66750";
  if (props.active && !props.past) return "#f9d667";
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
      <svg
        width="359"
        height="106"
        viewBox="0 0 359 106"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_bd_808_110255)">
          <path
            id="layer"
            d="M339 39.281V86H121L107.696 78.0001H79.856L67.256 86.0001H39L20 63.5001V20.0001H132.752L145 27.0001H274L287 20.0001L320 20L339 39.281Z"
            fill="url(#paint0_linear_808_110255)"
          />
          <path
            d="M132.486 21.0001H21V63.1343L39.4644 85.0001H66.9654L79.32 77.1558L79.5654 77.0001H79.856H107.696H107.973L108.211 77.1431L121.277 85H338V39.6909L319.581 21L287.252 21.0001L274.474 27.8805L274.252 28.0001H274H145H144.734L144.504 27.8683L132.486 21.0001Z"
            stroke="#FFD54F"
            stroke-width="2"
          />
        </g>
        <path
          d="M348.5 95.5V32.9085L328.024 11.5H9.49997V71.6041L30.664 95.5H348.5Z"
          fill="url(#paint1_linear_808_110255)"
          fill-opacity="0.6"
          stroke="#FFD54F"
        />
        <mask
          id="mask0_808_110255"
          style="mask-type: alpha"
          maskUnits="userSpaceOnUse"
          x="20"
          y="20"
          width="319"
          height="66"
        >
          <path
            d="M132.486 21.0001H21V63.1343L39.4644 85.0001H66.9654L79.32 77.1558L79.5654 77.0001H79.856H107.696H107.973L108.211 77.1431L121.277 85H338V39.6909L319.581 21L287.252 21.0001L274.474 27.8805L274.252 28.0001H274H145H144.734L144.504 27.8683L132.486 21.0001Z"
            fill="url(#paint2_linear_808_110255)"
            fill-opacity="0.5"
            stroke="#FFD54F"
            stroke-width="2"
          />
        </mask>
        <g mask="url(#mask0_808_110255)">
          <line
            x1="180.06"
            y1="-62.84"
            x2="180.06"
            y2="255.4"
            :stroke="color"
            stroke-opacity="0.4"
          />
          <line
            x1="340"
            y1="57.5"
            x2="20"
            y2="57.5"
            :stroke="color"
            stroke-opacity="0.4"
          />
          <line
            x1="129.338"
            y1="8.18708"
            x2="1.17835"
            y2="57.1471"
            :stroke="color"
            stroke-opacity="0.4"
          />
          <line
            x1="232.662"
            y1="108.053"
            x2="360.822"
            y2="59.0929"
            :stroke="color"
            stroke-opacity="0.4"
          />
          <line
            y1="-0.5"
            x2="137.194"
            y2="-0.5"
            transform="matrix(0.934155 0.356868 0.356868 -0.934155 232.84 7.72)"
            :stroke="color"
            stroke-opacity="0.4"
          />
          <line
            y1="-0.5"
            x2="137.194"
            y2="-0.5"
            transform="matrix(-0.934155 -0.356868 -0.356868 0.934155 129.16 108.52)"
            :stroke="color"
            stroke-opacity="0.4"
          />
          <line
            x1="321.564"
            y1="-82.6464"
            x2="1.88376"
            y2="237.034"
            :stroke="color"
            stroke-opacity="0.4"
          />
          <line
            x1="40.585"
            y1="-82.8234"
            x2="359.205"
            y2="235.796"
            :stroke="color"
            stroke-opacity="0.4"
          />
          <circle
            cx="271.72"
            cy="58.12"
            r="11.52"
            :stroke="color"
            stroke-opacity="0.4"
          />
          <circle
            cx="101.8"
            cy="58.12"
            r="11.52"
            :stroke="color"
            stroke-opacity="0.4"
          />
        </g>
        <defs>
          <filter
            id="filter0_bd_808_110255"
            x="0"
            y="0"
            width="359"
            height="106"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="10" />
            <feComposite
              in2="SourceAlpha"
              operator="in"
              result="effect1_backgroundBlur_808_110255"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="10" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0"
            />
            <feBlend
              mode="normal"
              in2="effect1_backgroundBlur_808_110255"
              result="effect2_dropShadow_808_110255"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect2_dropShadow_808_110255"
              result="shape"
            />
          </filter>

          <linearGradient
            id="gradientActive"
            x1="179.5"
            y1="-86.9756"
            x2="179.5"
            y2="149.374"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#f9d667" />
            <stop offset="1" stop-color="#1E1E1E" />
          </linearGradient>

          <linearGradient
            id="gradientActivePast"
            x1="179.5"
            y1="-86.9756"
            x2="179.5"
            y2="149.374"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#F9D667" stop-opacity="0.2" />
            <stop offset="1" stop-color="#1E1E1E" />
          </linearGradient>

          <linearGradient
            id="gradientInactive"
            x1="179.5"
            y1="-86.9756"
            x2="179.5"
            y2="149.374"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#aab2cc" />
            <stop offset="1" stop-color="#1E1E1E" />
          </linearGradient>

          <linearGradient
            id="gradientInactivePast"
            x1="179.5"
            y1="-86.9756"
            x2="179.5"
            y2="149.374"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#686C79" stop-opacity="1" />
            <stop offset="1" stop-color="#1E1E1E" />
          </linearGradient>

          <linearGradient
            id="paint1_linear_808_110255"
            x1="179"
            y1="11"
            x2="179"
            y2="96"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-opacity="0" />
            <stop offset="1" stop-opacity="1" />
          </linearGradient>

          <linearGradient
            id="paint2_linear_808_110255"
            x1="191"
            y1="-67.4229"
            x2="191"
            y2="113.962"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#1e1e1e" />
            <stop offset="1" stop-color="#1E1E1E" />
          </linearGradient>
        </defs>
      </svg>

      <div class="icon">
        <TokenIcon :name="token?.symbol" :active="props.active" :big="mobile" />
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
      width: 15px;
      height: 50%;
      border: 2px dotted #aab2cc;
      border-radius: 0 3px 3px 0;
      top: 55%;
      right: -9px;
      border-left: 0;
      border-bottom: 0;
      border-bottom-right-radius: 0;
    }

    &::before {
      content: "";
      width: 4px;
      height: 12px;
      background: v-bind(color);
      position: absolute;

      top: 56%;
      right: 6px;
      translate: 0 -50%;
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
      width: 15px;
      height: 50%;
      border: 2px dotted #aab2cc;
      border-radius: 0 3px 3px 0;
      bottom: 45%;
      right: -9px;
      border-left: 0;
      border-top: 0;
      border-top-right-radius: 0;
    }

    &::before {
      content: "";
      width: 4px;
      height: 12px;
      background: v-bind(color);
      position: absolute;

      top: 54%;
      right: 6px;
      translate: 0 -50%;
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
    text-shadow: -1px -1px 0 #f9d667, 1px -1px 0 #f9d667, -1px 1px 0 #f9d667,
      1px 1px 0 #f9d667;
  }
}

.player.looser.past {
  #layer {
    fill: url(#gradientInactivePast);
  }
}

.player .card {
  position: relative;
}

.player .icon {
  position: absolute;
  width: 100%;
  height: 100%;

  top: -7px;
  left: 15px;
}

.player .winner-icon {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  img {
    position: absolute;
    top: 20px;
    right: 38px;
    width: 14px;
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

  span {
    padding-top: -4px;
    font-weight: 900;
    text-align: center;
    font-size: 18px;
    text-transform: uppercase;
    color: #1e1e1e;
    background-color: transparent;
    text-shadow: -1px -1px 0 v-bind(color), 1px -1px 0 v-bind(color),
      -1px 1px 0 v-bind(color), 1px 1px 0 v-bind(color);
  }

  small {
    font-weight: 900;
    text-transform: uppercase;
    font-size: 9px;
    color: #ac9f78;
  }
}

.player.active {
  .connect-lines::after {
    border-color: var(--shadow-yellow);
  }

  #layer {
    fill: url(#gradientActive);
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
      height: 100%;
      top: 48%;
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
      height: 100%;
      bottom: 47%;
      right: calc(50% - 50px);
      border-radius: 0;
    }

    &::before {
      display: none;
    }
  }
  }
}
</style>

<script setup lang="ts">
interface Props {
  name?: string;
  active?: boolean;
  hexagon?: boolean;
  big?: boolean;
  border?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  big: false,
  active: false,
  hexagon: true,
  border: true,
});

const token = computed(() => {
  return props.name?.toLowerCase();
});
</script>

<template>
  <div
    class="token-icon"
    :class="[
      { big: props.big },
      { border: props.border },
      { 'token-border-yellow': props.active },
      { 'without-hexagon': !props.hexagon },
    ]"
  >
    <div class="token-image">
      <img :src="getImage(`tokens/new/${token}.png`)" :alt="name" v-if="name"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.token-icon {
  z-index: 1;
  position: relative;

  width: 38px;
  height: 32px;
  background: #aab2cc;
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);

  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: "";
    position: absolute;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    left: 2px;
    top: 2px;
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
    background: linear-gradient(180.71deg, #7c8293 -40.94%, #1e1e1e 57.7%);
  }

  &.big {
    min-width: 64px;
    min-height: 56px;

    .token-image {
      min-width: 38px;
      min-height: 38px;

      img {
        min-width: 30px;
        min-height: 30px;
      }
    }
  }
}
.token-image {
  position: absolute;
  z-index: 1;

  width: 24px;
  height: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #000;
  border-radius: 50%;

  img {
    width: 14px;
  }
}

/** border */
.border {
  .token-image {
    border: 1px solid var(--gray);
  }
}

/** big (home page) */
.without-hexagon.big {
  .token-image {
    background: unset;
    border: none;

    img {
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }
  }
}

/** without hexagon */
.without-hexagon {
  clip-path: none;
  background: unset;

  &::after {
    clip-path: none;
    background: unset;
  }

  .token-image {
    img {
      width: 14px;
      height: 14px;
    }
  }
}

/** token border colors */
.token-border-yellow {
  background: var(--shadow-yellow);
}
</style>

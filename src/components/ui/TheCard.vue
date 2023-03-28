<script setup lang="ts">
interface Props {
  edges?: boolean;
  frozen?: boolean;
  swapEdges?: boolean;
  smallEdges?: boolean;
}

withDefaults(defineProps<Props>(), {
  edges: true,
  frozen: false,
  swapEdges: false,
  smallEdges: false,
});
</script>

<template>
  <div
    class="card"
    :class="[
      { frozen },
      { 'no-edges': !edges },
      { 'swap-edges': swapEdges },
      { 'small-edges': smallEdges },
    ]"
  >
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.frozen {
  .content {
    &::before {
      content: "";
      position: absolute;
      border-radius: 8px;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
      background: var(--black-100);
      user-select: none;
    }
  }
}

.card.no-edges {
  .content {
    clip-path: unset;
    &::after {
      clip-path: unset;
    }
  }
}
.card.swap-edges {
  .content {
    clip-path: var(--card-clip-path-right);
    &::after {
      clip-path: var(--card-clip-path-right);
    }
  }
}

.card.small-edges {
  .content {
    clip-path: var(--card-clip-path-small-right);
    &::after {
      clip-path: var(--card-clip-path-small-right);
    }
  }
}

.card {
  width: 100%;
  height: 100%;
  position: relative;

  .content {
    padding: 30px;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);

    display: grid;
    gap: 20px;

    isolation: isolate;

    clip-path: var(--card-clip-path-left);
    background: var(--white-50);
    filter: drop-shadow(0px 0px 0px #000000);
    border-radius: 8px;

    &::after {
      content: "";
      position: absolute;
      width: calc(100% - 2px);
      height: calc(100% - 2px);
      background: var(--card-bg);
      inset: 0;

      top: 1px;
      left: 1px;
      border-radius: 8px;

      z-index: -1;
      clip-path: var(--card-clip-path-left);
    }
  }
}

@media screen and (max-width: 768px) {
  .card {
    min-width: 100%;
  }
}
</style>

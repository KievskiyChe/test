<script setup lang="ts">
interface Props {
  disabled?: boolean;
}

defineProps<Props>();
</script>

<template>
  <button class="btn" :disabled="disabled">
    <div class="content">
      <slot name="icon"></slot>
      <slot></slot>
    </div>
  </button>
</template>

<style scoped lang="scss">
.btn {
  --edge: 10px;
  --border-size: 4px;

  background: var(--shadow-yellow);

  text-transform: uppercase;
  font-weight: 900;
  color: #fff;

  border: 0;
  outline: 0;

  height: 54px;
  width: 100%;
  max-width: 280px;

  position: relative;
  z-index: 2;
  cursor: pointer;

  clip-path: polygon(
    var(--edge) 0%,
    100% 0,
    100% calc(100% - var(--edge)),
    calc(100% - var(--edge)) 100%,
    0 100%,
    0% var(--edge)
  );

  &:hover {
    &::after {
      background: var(--shadow-yellow);
    }
  }

  &::after {
    content: "";
    position: absolute;

    top: var(--border-size);
    left: var(--border-size);

    width: calc(100% - calc(var(--border-size) * 2));
    height: calc(100% - calc(var(--border-size) * 2));

    transition: all 0.3s ease;

    background: linear-gradient(
      108.41deg,
      rgba(0, 0, 0, 1) 0.93%,
      rgba(69, 73, 83, 1) 100%
    );

    clip-path: polygon(
      calc(var(--edge) * 0.85) 0%,
      100% 0,
      100% calc(100% - var(--edge) * 0.85),
      calc(100% - var(--edge) * 0.85) 100%,
      0 100%,
      0% calc(var(--edge) * 0.85)
    );
  }

  .content {
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    z-index: 1;
  }
}

// disabled
.btn[disabled] {
  background: var(--white-50);
  cursor: not-allowed;

  &::after {
    background: var(--white-50);
  }

  color: #ffffff50;
}
</style>

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

  /* background: var(--accent); */
  background: var(--white-50);
  border: 3px solid var(--accent);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  color: #fff;

  outline: 0;

  height: 44px;
  width: 100%;
  max-width: 220px;

  position: relative;
  z-index: 2;
  cursor: pointer;
  transition: all 0.3s ease;

  .content {
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    z-index: 1;
    text-transform: uppercase;
  }

  &:hover {
    background: var(--accent);
    color: var(--white);
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

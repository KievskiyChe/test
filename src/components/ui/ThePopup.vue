<script setup lang="ts"></script>

<template>
  <div class="popup">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.popup {
  padding: 24px;
  min-width: 200px;
  position: relative;
  z-index: 9999;

  display: grid;
  gap: 10px;
  place-items: center;

  background: linear-gradient(
    112.48deg,
    rgba(255, 255, 255, 0.2) 3.47%,
    rgba(255, 255, 255, 0) 101.88%
  );

  border: 1px solid var(--white-400);
  backdrop-filter: blur(25px);
  border-radius: 12px;
}
</style>

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

  background: rgba(0, 0, 0, 0.01);
  backdrop-filter: blur(10px);

  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.6);
  border-radius: 8px;

  display: grid;
  place-items: center;
}
</style>

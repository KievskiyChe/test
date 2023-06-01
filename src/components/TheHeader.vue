<script setup lang="ts"></script>

<template>
  <header class="header container">
    <div style="display: flex; align-items: center; gap: 20px;">
      <UserMenu />
      <MusicControl />
    </div>

    <div class="title">
      <span class="line"></span>

      <router-link to="/tournament" class="text">awakeness</router-link>

      <span class="line"></span>
    </div>

    <UserConnect />
  </header>
</template>

<style scoped lang="scss">
.header {
  width: 100%;
  height: var(--header-height);

  display: grid;
  grid-template-columns: 0.25fr 1fr 0.25fr;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1;

  margin-bottom: 40px;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 55px;

  .text {
    font-size: 24px;
    font-weight: bold;
  }

  .line {
    width: 100%;
    height: 1px;
    background-color: #ffffff40;
  }
}

@media screen and (max-width: 768px) {
  .header {
    grid-template-columns: 60px 1fr 60px;
    gap: 20px;
    margin-bottom: 0;
  }

  .title {
    gap: 20px;

    .text {
      font-size: 18px;
    }

    .line {
      width: 30px;
    }
  }
}
</style>

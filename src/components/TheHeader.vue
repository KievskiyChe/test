<script setup lang="ts"></script>

<template>
  <header class="header container">
    <UserMenu />

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
    grid-template-columns: auto 1fr auto;
    gap: 20px;
  }

  .title {
    gap: 20px;

    .text {
      font-size: 18px;
    }

    .line {
      width: 50px;
    }
  }
}
</style>

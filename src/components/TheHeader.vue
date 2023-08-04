<script setup lang="ts">
</script>

<template>
  <header class="header container">
    <div style="display: flex; align-items: center; gap: 10px;">
      <UserMenu />
<!--      <MusicControl />-->
    </div>

    <div class="title">
      <span class="line"></span>

      <router-link to="/tournament" class="text">
        <p>awakeness</p>
        <p>crypto legends</p>
      </router-link>

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

  gap: 10px;

  margin-bottom: 40px;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 55px;

  .text {
    font-size: 22px;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
  }

  .line {
    width: 100%;
    height: 1px;
    background-color: #ffffff40;
  }
}

@media screen and (max-width: 768px) {
  .header {
    grid-template-columns: 50px 1fr 50px;
    gap: 0;
    margin-bottom: 0;
  }

  .title {
    gap: 20px;

    .text {
      font-size: 18px;
      white-space: nowrap;
      text-align: center;
    }

    .line {
      width: 30px;
    }
  }
}
</style>

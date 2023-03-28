<script setup lang="ts">
interface Props {
  text?: string;
}

withDefaults(defineProps<Props>(), {
  text: "swap",
});
</script>

<template>
  <div class="title">
    <div class="icon">
      <img src="@/assets/img/icons/card-head-icon.svg" alt="" />
    </div>
    <div class="line"></div>
    <span>{{ text }}</span>
    <div class="line"></div>
    <div class="icon">
      <img src="@/assets/img/icons/card-head-icon.svg" alt="" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.title {
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin-top: -10px;

  span {
    text-transform: uppercase;
    font-size: 32px;
    font-weight: 600;
  }

  .line {
    max-width: 50px;
    height: 1px;
    background: var(--white-100);
  }

  .icon {
    img {
      width: 100%;
    }
    &:last-child {
      rotate: 180deg;
    }
  }
}

@media screen and (max-width: 768px) {
  .title {
    span {
      font-size: 20px;
      padding: 0;
      position: relative;
      bottom: 7px;
      left: -5px;
    }
  }
}
</style>

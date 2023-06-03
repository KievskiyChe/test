<script setup lang="ts">
interface Props {
  frozen?: boolean;
  radius?: number;
  background?: string | number;
}

withDefaults(defineProps<Props>(), {
  edges: true,
  frozen: false,
  swapEdges: false,
  smallEdges: false,
  radius: 28,
  background: ''
});
</script>

<template>
  <div class="card" :class="[{ frozen }]">
    <div class="content" :style="{ borderRadius: `${radius}px` }">
      <img v-if="background" :src="getImage(`card-backgrounds/${background}.svg`)" alt="" />
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  width: 100%;
  height: 100%;
  position: relative;
  
  .content {
    padding: 30px;
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;

    background: linear-gradient(
      112.48deg,
      rgba(255, 255, 255, 0.2) 3.47%,
      rgba(255, 255, 255, 0) 101.88%
    );

    border: 1px solid var(--white-400);
    backdrop-filter: blur(25px);
    -webkit-backdrop-filter: blur(25px);
    border-radius: 28px;

    display: grid;
    gap: 20px;

    isolation: isolate;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
}

@media screen and (max-width: 768px) {
  .card {
    min-width: 100%;
  }
}
</style>

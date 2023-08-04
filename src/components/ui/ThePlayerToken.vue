<script setup lang="ts">
interface Props {
  name?: string;
  big?: boolean;
  border?: string;
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  big: false,
  border: '1px solid var(--accent)',
});

const token = computed(() => {
  return props.name?.toLowerCase();
});
</script>

<template>
  <div
    class="token-icon"
    :class="[{
      big : props.big,
    }]"
    :style="{ border: props.border }"
  >
    <div class="token-image">
      <img :src="getImage(`tokens/new/${token}.png`)" :alt="name" v-if="name"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.token-icon {
  z-index: 1;
  position: relative;

  width: 40px;
  height: 40px;
  background: var(--black-700);

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  /* border: 1px solid var(--accent); */

  &.big {
    width: 40px;
    height: 40px;
    padding: 10px;

    border: 4px solid var(--white-500);
  }
}

.token-image {
  position: absolute;
  z-index: 1;

  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
}

@media screen and (max-width: 1100px) {
  .token-icon {
    width: 20px;
    height: 20px;
  }
}
</style>

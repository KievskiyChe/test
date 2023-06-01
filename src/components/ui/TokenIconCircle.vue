<script setup lang="ts">
defineProps<{
  token: string;
}>();
</script>

<template>
  <div class="token">
    <div class="circle"></div>

    <div class="content">
      <div class="icon">
        <TokenIcon :name="token" :hexagon="false" :big="true" />
      </div>
      <div class="token-circle"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.token {
  width: var(--token-list-item-size);
  height: var(--token-list-item-size);
  position: relative;
}

.circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--white-50);

  border: 1px solid var(--accent);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);
  position: relative;

  &::after {
    content: "";
    width: 86%;
    height: 86%;
    border: 1px dashed var(--accent);
    border-radius: 50%;
    filter: drop-shadow(0px 0px 4px var(--accent));

    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
  }
}

.content {
  width: 34px;
  height: 34px;
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;

  display: grid;
  place-items: center;

  .token-circle {
    width: 100%;
    height: 100%;
    background: #25272f;
    border: 1px solid #454953;

    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    border-radius: 50%;
  }
}

.icon {
  position: absolute;
}
</style>

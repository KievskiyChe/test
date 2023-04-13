<script setup lang="ts">
const { showPopup } = usePopupsStore();

interface Props {
  token: IToken;
  emitted: string;
}

const props = defineProps<Props>();

const show = () => {
  if (props.emitted === "from") showPopup(Popup.TOKEN_SELECT_FROM);
  if (props.emitted === "to") showPopup(Popup.TOKEN_SELECT_TO);
};

const tokenAmount = computed(() => {
  return parseString(props.token.amount, 6);
});
</script>

<template>
  <div class="select-wrapper" @click.stop="show()">
    <div class="select" v-if="token && token.symbol">
      <div class="select-icon">
        <img :src="getImage(`tokens/${token.symbol}.png`)" />
      </div>

      <div class="select-info">
        <span>{{ token.symbol }}</span>
        <small>Balance: {{ tokenAmount }}</small>
      </div>

      <div class="chevron"></div>
    </div>

    <div class="select active" v-else>
      <div class="select-icon">
        <img src="@/assets/img/icons/circles.svg" />
      </div>

      <div class="select-info">
        <span>Select</span>
      </div>

      <div class="chevron"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.select-wrapper {
  padding: 5px;
  display: flex;
  height: 100%;
}

.select {
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  gap: 5px;
  transition: all 0.3s ease;
  width: 100%;
}

.select:hover {
  cursor: pointer;
  background: var(--white-100);
}

.select.active {
  background: var(--white-50);
  &:hover {
    background: var(--white-100);
  }
}

.select:active,
.select:focus {
  scale: 0.95;
}

.select-icon {
  width: 32px;
  height: 32px;
  min-width: 32px;
  min-height: 32px;
  border-radius: 50%;
  border: 1px solid var(--white-600);

  overflow: hidden;
  display: flex;
}

.select-info {
  display: grid;
  width: 100%;

  span {
    text-transform: uppercase;
  }

  small {
    font-size: 12px;
    color: var(--white-800);

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.chevron {
  min-width: 7px;
  min-height: 7px;
  border: 1px solid;
  border-top: 0;
  border-right: 0;
  rotate: -45deg;
  margin-left: 5px;
}
</style>

<script setup lang="ts">
import { useAccount, useConnect } from 'vagmi'
import { MetaMaskConnector } from 'vagmi/connectors/metaMask';

const connector = new MetaMaskConnector();

const { isConnected } = useAccount()
const { connect } = useConnect({
  connector,
})
</script>

<template>
  <div class="user-not-connected">
    <div class="icon">
      <img src="@/assets/img/icons/connect.svg" />
    </div>
    <p>To see your balance and participate in the battle, connect wallet</p>
    <div class="foo">
      <TheButton @click.prevent="connect()">
        <span>connect wallet</span>
      </TheButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-not-connected {
  max-width: 260px;
  max-height: 300px;
  display: grid;
  place-items: center;
  gap: 20px;
  text-align: center;
  text-transform: uppercase;
  color: var(--shadow-yellow);
  line-height: 20px;
}

.foo {
  width: 80%;
}
</style>

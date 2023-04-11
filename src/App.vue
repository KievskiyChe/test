<script setup lang="ts">
import { useAccount, useProvider } from "vagmi";
import Tournament from "./core";

const { exists } = usePopupsStore();
const { isConnected, address } = useAccount();

const provider = useProvider({
  chainId: 137,
}).value;

setGlobals({
  provider,
  userAddress: isConnected.value ? (address.value ? address.value : "") : "",
  signer: provider,
});


onMounted(async () => {
  const tournament = new Tournament();
  setTouranment(tournament);
  await tournament.update();
});
</script>

<template>
  <router-view></router-view>

  <!-- notifications -->
  <NotificationList />

  <!-- popups -->
  <template v-if="exists(Popup.CLAIM)">
    <ClaimPopup />
  </template>

  <template v-if="exists(Popup.TOKEN_SELECT_FROM)">
    <TokenSelectPopup emitted="from" />
  </template>

  <template v-if="exists(Popup.TOKEN_SELECT_TO)">
    <TokenSelectPopup emitted="to" />
  </template>

  <template v-if="exists(Popup.INVALID_NETWORK)">
    <InvalidNetworkPopup />
  </template>
</template>

<style lang="scss" scoped></style>

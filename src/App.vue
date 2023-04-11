<script setup lang="ts">
import { useProvider } from "vagmi";
import Tournament from "./core";
const { exists, showPopup } = usePopupsStore();

const provider = useProvider({
  chainId: 137
}).value;

console.log(provider)

setGlobals({ provider, userAddress: "", signer: provider });


const main = async () => {
  const tournament = new Tournament();
  tournament.fetchStatus();

  await tournament.update();
  setTouranment(tournament);
}

main()
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

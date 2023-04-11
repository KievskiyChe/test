<script setup lang="ts">
import { useProvider, useSigner } from "vagmi";
import Tournament from "./core";
const { exists, showPopup } = usePopupsStore();

const provider = useProvider({
  chainId: 137
}).value;


const { data, isError, isLoading, error } = useSigner();
console.log(data)

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
   <div>
    Sign: {{ isLoading ? data : 'd' }}
  </div>
  <div v-if="isLoading">
    Loading...
  </div>
  <div v-if="isError && error">
    {{ error.message }}
  </div>

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

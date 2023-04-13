<script setup lang="ts">
import { Popup } from "./common/interfaces";
import { useAccount, useProvider, useSigner, useNetwork } from "vagmi";
import Tournament from "./core";
import { useRoute, useRouter } from "vue-router";

const { exists, showPopup, hidePopup } = usePopupsStore();
const { isConnected, address } = useAccount();
const { chain } = useNetwork();
const route = useRoute()
const router = useRouter();
const { isActive } = storeToRefs(useTournamentStore())

const provider = useProvider({
  chainId: 137,
}).value;


useSigner({
  onSuccess: (signer) => {
    setGlobals({
      signer: signer ?? provider,
      provider,
      userAddress: isConnected.value ? address.value! : "",
    })
  },
  onError: (e) => {
    console.log(e);
    console.log("error getting signer");
  },
});

watchEffect(() => {
  if (chain?.value?.unsupported) {
    showPopup(Popup.INVALID_NETWORK);
  } else {
    hidePopup(Popup.INVALID_NETWORK);
  }
});

onMounted(() => {
  setTimeout(async () => {
    const tournament = new Tournament();
    await tournament.fetchStatus()
    setTouranment(tournament);

    if (route.path === '/' && isActive.value) {
      router.push("/tournament");
    }

    if (route.path === '/tournament' && !isActive.value) {
      router.push("/waitplease");
    }

    tournament.update();
  }, 1500);
})
</script>

<template>
  <router-view></router-view>

  <!-- notifications -->
  <NotificationList />

  <!-- popups -->
  <template v-if="exists(Popup.AUTH)">
    <AuthPopup />
  </template>

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

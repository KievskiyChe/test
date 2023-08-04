<script setup lang="ts">
import Tournament from "./core";
import { Popup } from "./common/interfaces";
import { useAccount, useProvider, useSigner, useNetwork } from "vagmi";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const { exists, showPopup, hidePopup } = usePopupsStore();
const { isConnected, address } = useAccount();
const { chain } = useNetwork();
const { isActive } = storeToRefs(useTournamentStore());

const chainId = +import.meta.env.VITE_APP_CHAIN;

const provider = useProvider({
  chainId,
}).value;

// update
useSigner({
  onSuccess: (signer) => {
    setGlobals({
      signer: signer ?? provider,
      provider,
      userAddress: isConnected.value ? address.value! : "",
    });
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

onMounted(async () => {
  setGlobals({
    signer: null,
    provider,
    userAddress: isConnected.value ? address.value! : "",
  });

  const tournament = new Tournament(provider);
  setTouranment(tournament);

  const status = await tournament.fetchStatus();
  useTournamentStore().setIsActive(status);
  await tournament.init();

  if ((route.path === "/" || route.path === "/waitplease") && isActive.value) {
    // router.push("/tournament");
  }

  if (route.path === "/tournament" && !isActive.value) {
    router.push("/waitplease");
  }
});
</script>

<template>
  <TheHeader />

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

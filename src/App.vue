<script setup lang="ts">
import { Popup } from "./common/interfaces";
import { useAccount, useProvider, useSigner, useNetwork } from "vagmi";
import { useRoute, useRouter } from "vue-router";

import Tournament from "./core/v1/";
import TournamentV2 from "./core/v2";

const route = useRoute();
const router = useRouter();
const { exists, showPopup, hidePopup } = usePopupsStore();
const { isConnected, address } = useAccount();
const { chain } = useNetwork();
const { isActive } = storeToRefs(useTournamentStore());
const { multicall } = storeToRefs(useUserStore());
const updateInterval = ref();

const provider = useProvider({
  chainId: 137,
}).value;

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

  if (multicall.value) {
    clearInterval(updateInterval.value);

    const tournamentV2 = new TournamentV2(provider);
    setTouranment(tournamentV2 as any)
    const status = await tournamentV2.fetchStatus();
    useTournamentStore().setIsActive(status);
    await tournamentV2.init();
  } else {
    const tournament = new Tournament();
    await tournament.fetchStatus();
    setTouranment(tournament);
    tournament.update();
  }
  
  
  if ((route.path === '/' || route.path === '/waitplease') && isActive.value) {
    router.push("/tournament");
  }
  
  if (route.path === '/tournament' && !isActive.value) {
    router.push("/waitplease");
  }

  
});
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

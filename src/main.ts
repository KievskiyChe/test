import { createApp } from "vue";
import { createPinia } from "pinia";
import { Connector, EVENTS } from "@/libs/connector";
import { connectorPluginCustomStyles } from "./plugins/connector-modal";
import { useUserStore } from "@/stores/user";
import { checkNetwork } from "@/common/helpers";
import {
  checkProviderAndSigner,
  getProvider,
  getSigner,
} from "./core/common/helpers";
import Tournament from "./core";

import App from "./App.vue";
import router from "./router";
import { overlay, lazyload } from "./directives";
import "./assets/scss/style.scss";
import { ethers } from "ethers";

const app = createApp(App);

const pinia = createPinia();
const connector = new Connector();

// register plugins
app.use(pinia);

app.directive("overlay", overlay);
app.directive("lazyload", lazyload);

const { setUser } = useUserStore();

const state = {
  userAddress: "",
  provider: new ethers.providers.JsonRpcProvider("https://polygon.llamarpc.com"),
  signer: null as ethers.Signer | null | any,
}

connector
  .authenticate()
  .then((data) => {
    if (!data) {
      state.signer = state.provider;
      return { userAddress: "", provider: state.provider, signer: state.provider };
    }

    const { wallet, network } = data;

    setUser({ wallet, network });
    checkNetwork(network.id);

    state.userAddress = wallet.address;
    state.provider = connector.getProvider();
    state.signer = state.provider.getSigner(state.userAddress);
  })
  .catch(() => {
    state.signer = state.provider;
  })
  .finally(async () => {
    setGlobals(state)
    const tournament = new Tournament();
    await tournament.fetchStatus();

    connectorPluginCustomStyles(connector);
    app.provide("Connector", connector);
    app.provide("Tournament", tournament);

    app.use(router);
    app.mount("#app");

    await tournament.update();
    setTouranment(tournament);
  });

connector.on(EVENTS.CHAIN_CHANGED, (data) => {
  setUser(data);
  checkNetwork(data.network.id);
});

connector.on(EVENTS.UPDATED, () => {
  console.log('updated')
  // window.location.reload();
});

connector.on(EVENTS.DISCONNECTED, () => {
  window.location.reload();
});

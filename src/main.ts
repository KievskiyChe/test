import { createApp } from "vue";
import { createPinia } from "pinia";
import { Connector, EVENTS } from "vue-dapp-connector";
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

const app = createApp(App);

const pinia = createPinia();
const connector = new Connector();

// register plugins
app.use(pinia);

app.directive("overlay", overlay);
app.directive("lazyload", lazyload);

const { setUser } = useUserStore();

connector
  .authenticate()
  .then((data) => {
    if (!data) {
      const provider = getProvider(null);
      const signer = getSigner(null, provider);
      return { userAddress: "", provider, signer };
    }

    const { wallet, network } = data;

    setUser({ wallet, network });
    checkNetwork(network.id);

    const userAddress = wallet.address;
    const provider = connector.getProvider();

    const signer = provider.getSigner(userAddress);
    const result = checkProviderAndSigner(provider, signer);

    console.log(result.provider);

    return { userAddress, provider: result.provider, signer: result.signer };
  })
  .then((data) => setGlobals(data))
  .finally(async () => {
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
  window.location.reload();
});

connector.on(EVENTS.DISCONNECTED, () => {
  window.location.reload();
});

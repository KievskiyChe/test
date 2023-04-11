import { createApp } from "vue";
import { createPinia } from "pinia";
// import { Connector, EVENTS } from "@/libs/connector";
import { connectorPluginCustomStyles } from "./plugins/connector-modal";
import { useUserStore } from "@/stores/user";
import { checkNetwork } from "@/common/helpers";
import {
  checkProviderAndSigner,
  getProvider,
  getSigner,
} from "./core/common/helpers";
import Tournament from "./core";

// 
import { getDefaultProvider } from 'ethers';
import {
  configureChains,
  createClient,
  defaultChains,
  chain,
  VagmiPlugin
} from 'vagmi';
import { publicProvider } from 'vagmi/providers/public';

// 

import App from "./App.vue";
import router from "./router";
import { overlay, lazyload } from "./directives";
import "./assets/scss/style.scss";

import { Auth } from "./core/auth";

const app = createApp(App);
const auth = new Auth();
const pinia = createPinia();
// const connector = new Connector();

const { chains, provider, webSocketProvider } = configureChains(
  [chain.polygon],
  [publicProvider()],
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

app.use(VagmiPlugin(client));

// register plugins
app.use(pinia);
app.use(router);
const { setUser } = useUserStore();

app.directive("overlay", overlay);
app.directive("lazyload", lazyload);

app.provide("Auth", auth);
app.mount("#app");

// connector
//   .authenticate()
//   .then((data) => {
//     if (!data) {
//       state.signer = state.provider;
//       return { userAddress: "", provider: state.provider, signer: state.provider };
//     }

//     const { wallet, network } = data;

//     setUser({ wallet, network });
//     checkNetwork(network.id);

//     state.userAddress = wallet.address;
//     state.provider = connector.getProvider();
//     state.signer = state.provider.getSigner(state.userAddress);
//   })
//   .catch(() => {
//     state.signer = state.provider;
//   })
//   .finally(async () => {
//     setGlobals(state)
//     const tournament = new Tournament();
//     await tournament.fetchStatus();

//     connectorPluginCustomStyles(connector);
//     app.provide("Connector", connector);
//     app.provide("Tournament", tournament);

//     app.use(router);
//     app.mount("#app");

//     await tournament.update();
//     setTouranment(tournament);
//   });

// connector.on(EVENTS.CHAIN_CHANGED, (data) => {
//   setUser(data);
//   checkNetwork(data.network.id);
// });

// connector.on(EVENTS.UPDATED, () => {
//   console.log('updated')
//   // window.location.reload();
// });

// connector.on(EVENTS.DISCONNECTED, () => {
//   window.location.reload();
// });

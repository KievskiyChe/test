import { createApp } from "vue";
import { createPinia } from "pinia";
import { configureChains, createClient, chain, VagmiPlugin } from "vagmi";

import { publicProvider } from "vagmi/providers/public";
import { alchemyProvider } from "vagmi/providers/alchemy";
import { infuraProvider } from "vagmi/providers/infura";
import { connectors } from '@/common/auth.config'

import App from "./App.vue";
import router from "./router";
import { overlay, lazyload } from "./directives";
import "./assets/scss/style.scss";

const app = createApp(App);
const pinia = createPinia();

const { provider, webSocketProvider } = configureChains(
  [chain.arbitrum],
  [
    publicProvider(),
    alchemyProvider({ alchemyId: import.meta.env.VITE_APP_ALCHEMY_KEY }),
    infuraProvider({ infuraId: import.meta.env.VITE_APP_INFURA_KEY }),
  ]
);

const client = createClient({
  autoConnect: true,
  connectors: connectors.map((c) => c.connector),
  provider,
  webSocketProvider,
});

app.use(VagmiPlugin(client));

// register plugins
app.use(pinia);
app.use(router);

app.directive("overlay", overlay);
app.directive("lazyload", lazyload);
app.mount("#app");

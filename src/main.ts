import { createApp } from "vue";
import { createPinia } from "pinia";
import {
  configureChains,
  createClient,
  chain,
  VagmiPlugin
} from 'vagmi';
import { publicProvider } from 'vagmi/providers/public';

import App from "./App.vue";
import router from "./router";
import { overlay, lazyload } from "./directives";
import "./assets/scss/style.scss";

const app = createApp(App);
const pinia = createPinia();

const { provider, webSocketProvider } = configureChains(
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

app.directive("overlay", overlay);
app.directive("lazyload", lazyload);
app.mount("#app");

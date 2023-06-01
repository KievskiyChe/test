import { chain } from "vagmi";

import { CoinbaseWalletConnector } from "vagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "vagmi/connectors/metaMask";
import { WalletConnectConnector } from "vagmi/connectors/walletConnect";

const walletconnect = new WalletConnectConnector({
  chains: [chain.polygon, chain.goerli],
  options: {
    qrcode: true,
  },
});

const metamask = new MetaMaskConnector({
  chains: [chain.polygon, chain.goerli],
});

const coinbase = new CoinbaseWalletConnector({
  chains: [chain.polygon, chain.goerli],
  options: {
    appName: 'Awakeness',
    jsonRpcUrl: 'https://eth-mainnet.alchemyapi.io/v2/l8pB5q8P2MCYvTvXEjKOyfnwG1eycTku',
  },
});

export const connectors = [
  {
    tag: 'metamask',
    name: 'MetaMask',
    connector: metamask,
  },
  {
    tag: 'walletconnect',
    name: 'WalletConnect',
    connector: walletconnect,
  },
  {
    tag: 'coinbase',
    name: 'Coinbase Wallet',
    connector: coinbase,
  }
]

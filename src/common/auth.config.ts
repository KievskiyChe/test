import { chain } from "vagmi";

import { CoinbaseWalletConnector } from "vagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "vagmi/connectors/metaMask";
import { WalletConnectConnector } from "vagmi/connectors/walletConnect";

const walletconnect = new WalletConnectConnector({
  chains: [chain.polygon],
  options: {
    qrcode: true,
  },
});

const metamask = new MetaMaskConnector({
  chains: [chain.polygon],
});

const coinbase = new CoinbaseWalletConnector({
  options: {
    appName: 'vagmi.sh',
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

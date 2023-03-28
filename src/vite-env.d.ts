/// <reference types="vite/client" />
/// <reference path="./core/index.d.ts" />

declare global {
  interface Window {
    ethereum: any;
  }
}

interface Window {
  ethereum: any;
  __PROVIDER__: Provider;
  __SIGNER__: Signer;
  __USER_ADDRESS__: string;
  __TOURNAMENT__: Tournament;
}

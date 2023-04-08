import { ethers } from "ethers";
import type { BigNumber } from "@ethersproject/bignumber";
import ERC_20_ABI from "../abis/ERC20.json";
import MANAGER_ABI from "../abis/Manager.json";
import ROUTER_ABI from "../abis/Router.json";
import FACTORY_ABI from "../abis/Factory.json";

const NETWORK = import.meta.env.VITE_APP_NETWORK;

const MANAGER_ADDRESS = import.meta.env.VITE_APP_MANAGER_ADDRESS;
const ROUTER_ADDRESS = import.meta.env.VITE_APP_ROUTER_ADDRESS;
const FACTORY_ADDRESS = import.meta.env.VITE_APP_FACTORY_ADDRESS;

if (!NETWORK) {
  throw new Error("Missing network");
}

if (!MANAGER_ADDRESS) {
  throw new Error("Missing contract address");
}

export const createContractManager = (
  signer: Signer | null = null
): Contract => {
  return new ethers.Contract(
    MANAGER_ADDRESS,
    MANAGER_ABI,
    signer ? signer : window.__PROVIDER__
  );
};

export const createContractRouter = (): Contract => {
  return new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, window.__SIGNER__);
};

export const createContractERC20 = (address: string) => {
  return new ethers.Contract(address, ERC_20_ABI, window.__SIGNER__);
};

export const createContractFactory = () => {
  return new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, window.__SIGNER__);
};

// TODO: change rpc provider
export const getProvider = (provider: Provider): Provider => {
  const chain = import.meta.env.VITE_APP_CHAIN;
  const rpc = getRpcByChain(chain);
  const p = new ethers.providers.JsonRpcProvider(rpc);
  
  return p;
  // if (provider) {
  //   return provider;
  // } else {
  //   return new ethers.providers.JsonRpcProvider(rpc);
  // }
};

export const getRpcByChain = (chain: string) => {
  switch (+chain) {
    case 5:
      return "https://rpc.ankr.com/eth_goerli";
    case 137:
      return "https://polygon.llamarpc.com";
    default:
      return "https://polygon.llamarpc.com";
  }
};

export const getSigner = (signer: Signer, provider: Provider): Signer => {
  if (signer) return signer;
  else return getProvider(provider);
};

export const checkProviderAndSigner = (provider: Provider, signer: Signer) => {
  return {
    provider: getProvider(provider),
    signer: getSigner(signer, provider),
  };
};

export const formatBigNumber = (
  value: BigNumber,
  decimals: number,
  splitter: number = 2
): string => {
  if (!value || !decimals) return "0.00";
  return parseFloat(ethers.utils.formatUnits(Number(value), decimals)).toFixed(
    splitter
  );
};

export const parseLog = (log: any) => {
  const intrfc = new ethers.utils.Interface(ERC_20_ABI);
  return intrfc.parseLog(log);
};

export const randomHash = (len: number) => {
  const arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (dec) => dec.toString(16).padStart(2, "0")).join("");
};

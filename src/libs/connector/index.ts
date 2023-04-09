import { ref } from "vue";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import config, { type ConnectorResponse } from "./types";
import Wallet from "./Wallet";
import Network from "./Network";

export enum EVENTS {
  CHAIN_CHANGED = "chain-changed",
  ACCOUNTS_CHANGED = "accounts-changed",
  DISCONNECTED = "disconnected",
  UPDATED = "updated",
}

export class Connector {
  private instance: any;
  private readonly modal: any;
  private provider: any;

  public networkService: any;
  public walletService: any;
  public isAuthenticated = ref<boolean>(false);

  constructor() {
    this.modal = new Web3Modal({
      cacheProvider: false,
      providerOptions: {
        coinbasewallet: config.coinbasewallet,
        walletconnect: config.walletconnect,
      },
    });
  }

  authenticate = async () => {
    try {
      if (this.modal.cachedProvider) return await this.connect();
      return null;
    } catch (error) {
      alert({ type: 'auth', error });
    }
  };

  connect = async (): Promise<ConnectorResponse> => {
    this.instance = await this.modal.connect();
    this.isAuthenticated.value = true;

    await this.init();
    this.registerEvents();

    return this.generateDetail();
  };

  on = (event: EVENTS | string, callback: (e: ConnectorResponse) => void) => {
    window.addEventListener(event, (e: any) => {
      callback(e.detail);
    });
  };

  private registerEvents = () => {
    this.provider.provider.on("chainChanged", async () => {
      await this.update();
      return window.dispatchEvent(
        await this.generateEventDetail(EVENTS.CHAIN_CHANGED)
      );
    });

    this.provider.provider.on("accountsChanged", async (accounts: []) => {
      if (!accounts.length) {
        return await this.disconnect();
      } else {
        await this.update();
        return window.dispatchEvent(
          await this.generateEventDetail(EVENTS.ACCOUNTS_CHANGED)
        );
      }
    });

    this.provider.provider.on("disconnect", async () => {
      // return await this.disconnect();
    });
  };

  private init = async () => {
    this.provider = this.getProvider();
    this.walletService = new Wallet(this.provider);
    this.networkService = new Network(this.provider);
    return await this.walletService.requestBalance();
  };

  public update = async () => {
    await this.init();
    return window.dispatchEvent(await this.generateEventDetail(EVENTS.UPDATED));
  };

  public getProvider = () => {
    return new ethers.providers.Web3Provider(this.instance);
  };

  private generateEventDetail = async (
    eventName: string,
    needDetail: boolean = true
  ) => {
    return new CustomEvent(eventName, {
      detail: needDetail ? this.generateDetail() : null,
    });
  };

  private generateDetail = () => {
    return {
      wallet: this.walletService.getWallet(),
      network: this.networkService.getNetwork(),
    };
  };

  disconnect = async () => {
    this.isAuthenticated.value = false;
    this.modal.clearCachedProvider();
    return window.dispatchEvent(
      await this.generateEventDetail(EVENTS.DISCONNECTED, false)
    );
  };

  async connectMetamask() {
    // Check if Metamask is installed
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request access to the user's Metamask account
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Create a Web3Provider instance using the Metamask provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        
        // Set the signer to the current account
        const signer = provider.getSigner();
        
        // Get the current network ID
        const network = await provider.getNetwork();
        
        // Log some info
        console.log('Connected to Metamask with account', accounts[0]);
        console.log('Current network is', network.name, 'with ID', network.chainId);
        
        // Return the provider and signer
        return { provider, signer };
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('Metamask is not installed');
    }
  }
}

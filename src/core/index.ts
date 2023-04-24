import router from "@/router";
import { BigNumber, ethers } from "ethers";
import { Game } from "./models/Game";

import ROUTER_ABI from "./abis/Router.json";
import MANAGER_ABI from "./abis/Manager.json";
import FACTORY_ABI from "./abis/Factory.json";
import type { Token } from "./models/Token";
import { Caller } from "./multicall";
import type { ManagerData } from "./common/interfaces";

const ROUTER = import.meta.env.VITE_APP_ROUTER_ADDRESS;
const MANAGER = import.meta.env.VITE_APP_MANAGER_ADDRESS;
const FACTORY = import.meta.env.VITE_APP_FACTORY_ADDRESS;

type Contract = ethers.Contract;
type Provider = ethers.providers.Provider;

export default class Tournament implements ITournament {
  private readonly provider: Provider;
  private readonly router: Contract;
  private readonly manager: Contract;
  private readonly factory: Contract;
  private readonly caller: Caller;

  constructor(provider: Provider) {
    this.provider = provider;
    this.router = new ethers.Contract(ROUTER, ROUTER_ABI, this.provider);
    this.manager = new ethers.Contract(MANAGER, MANAGER_ABI, this.provider);
    this.factory = new ethers.Contract(FACTORY, FACTORY_ABI, this.provider);
    this.caller = new Caller();
  }

  async init() {
    try {
      await this.update();
      useSwapStore().init();
    } catch (error) {
      console.log(error);
      console.log("Error while init Tournament");
    } finally {
      this.eventListener();
    }
  }

  public fetchStatus = async (): Promise<boolean> => {
    return await this.caller.preFetch();
  };

  public fetchData = async (): Promise<ManagerData> => {
    const data = await this.caller.main();

    if (data.tokens) {
      const { round, tokens, bracket, winningToken } = data;
      const game = new Game(round, tokens, bracket);
      const winner = tokens.find((t: Token) => t.address === winningToken);

      if (winner) {
        game.setWinner(winner);
      }

      data.game = game;
    }

    return data;
  };

  public update = async (): Promise<void> => {
    this.updateStoreProcess(true);
    try {
      const data = await this.fetchData();
      this.updateStore(data);
    } catch (error: any) {
      console.log(error);
      console.log("Error while updating Tournament");
    } finally {
      this.updateStoreProcess(false);
    }
  };

  public updateSilent = async () => {
    try {
      const data = await this.fetchData();
      this.updateStore(data);
    } catch (error) {
      console.log(error);
      console.log("Error while silent updating Tournament");
    }
  }

  public updateStore = (data: ManagerData): void => {
    useTournamentStore().update(data);
    useRewardsStore().update(data.rewards as Reward[]);
    useSwapStore().update();

    if (data.usdc && data.usdc.amount) {
      useUserStore().setUsdcBalance(
        parseFloat(data.usdc.amount.toString()).toFixed(4) ?? "0.00"
      );
    }
  };

  private updateStoreProcess = (process: boolean): void => {
    useTournamentStore().setProcess(process);
    useSwapStore().setProcess(process);
    useRewardsStore().setProcess(process);
  };

  public getAmountsOut = async (
    options: AmountsOutOptions
  ): Promise<string | undefined> => {
    try {
      const { from, to } = options;

      const path = [from.address, to.address];
      console.log(options)
      const amountIn = ethers.utils
        .parseUnits(parseFloat(options.amount).toFixed(from.decimals), from.decimals)
        .toString()

      if (!options.amount || !options.from.address || !options.to.address)
        return;

      const args = [amountIn, path];

      const result = await this.router.getAmountsOutWithFee(...args);
      const [_, value] = result.toString().split(",");

      return ethers.utils.formatUnits(value, options.to.decimals);
    } catch (error) {
      console.log(`Error while getting amounts out: ${error}`);
    }
  };

  public swap = async (
    options: SwapOptions | undefined
  ): Promise<TransactionReceipt> => {
    if (!options) return Promise.reject("No options provided");
    return await this.swapTokens(options);
  };

  public swapTokens = async (
    options: SwapOptions
  ): Promise<TransactionReceipt> => {
    const gasLimit = 100_000;

    try {
      const signerContract = this.router.connect(window.__SIGNER__);
      const tx = await signerContract.swapExactTokensForTokens(
        ...Object.values(options)
      );
      return await tx.wait();
    } catch (error) {
      console.log(error);
      console.log("Error while swapping tokens");
      return Promise.reject(error);
    } finally {
      this.updateSilent();
    }
  };

  public redeem = async (tournamentId: number, token: IToken) => {
    const amount = ethers.utils.parseUnits(token.amount, token.decimals);
    try {
      const signerContract = this.manager.connect(window.__SIGNER__);
      const tx = await signerContract.redeem(tournamentId, amount);
      return await tx.wait();
    } catch (error) {
      return Promise.reject(error);
    } finally {
      this.updateSilent();
    }
  };

  private eventListener = () => {
    console.log("Start listening for manager events");

    if (!this.provider) {
      console.error("Provider is not defined");
      return;
    }

    // round started
    this.manager.on("RoundStarted", this.roundStarted);
    // round ended
    this.manager.on("RoundEnded", this.roundEnded);
    // tournament started
    this.manager.on("TournamentStarted", this.tournamentStarted);
  };

  /**
   * Events functions
   */
  private roundStarted = async (tournamentId: number, round: number) => {
    const { pushNotification, removeAllNotifications } = useNotificationStore();

    await sleep(750);
    pushNotification({
      title: "Round started",
      status: INotificationStatus.SUBMITTED,
      description: `Round ${Number(round) + 1} started`,
    });

    await sleep(750);
    pushNotification({
      title: "Updating",
      status: INotificationStatus.PENDING,
      description: `Wait for updating...`,
    });

    await this.update();
    removeAllNotifications();
  };

  private roundEnded = async (
    tournamentId: number,
    round: number,
    bracket: number[]
  ) => {
    const { pushNotification } = useNotificationStore();

    pushNotification({
      title: "Round ended",
      status: INotificationStatus.PENDING,
      description: `Round ${Number(round) + 1} ended`,
    });

    // last round
    if (Number(round) === 2) {
      pushNotification({
        title: "Tournament ended",
        status: INotificationStatus.EXPIRED,
        description: `Tournament ${Number(tournamentId)} ended`,
      });

      await sleep(750);
      pushNotification({
        title: "Updating",
        status: INotificationStatus.PENDING,
        description: `Wait for updating...`,
      });

      await this.update();

      const { showPopup } = usePopupsStore();
      showPopup(Popup.CLAIM);
    }
  };

  private tournamentStarted = async (tournamentId: number) => {
    const { pushNotification } = useNotificationStore();
    await this.update();

    pushNotification({
      title: "Tournament started",
      status: INotificationStatus.SUBMITTED,
      description: `Tournament ${Number(tournamentId)} started`,
    });

    await sleep(2000);

    if (router.currentRoute.value.name !== "claim-rewards") {
      router.push("/battle");
    }
  };
}
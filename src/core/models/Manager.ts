/** Tournament Manager */
import { ethers } from "ethers";
import router from "@/router";

import { Token } from "./Token";
import { TokenUSDC } from "./TokenUSDC";
import { createContractManager } from "../common/helpers";
import { Popup } from "@/common/interfaces";

export class Manager implements IManager {
  public readonly contract = {} as Contract;
  private readonly provider = {} as Provider;
  private readonly signer = {} as Signer;
  private readonly tournament = {} as ITournament;
  private tournamentId = null as number | null;
  private addresses = [] as string[];

  constructor(tournament: ITournament) {
    this.tournament = tournament;
    this.provider = window.__PROVIDER__;
    this.signer = window.__SIGNER__;
    this.contract = createContractManager(this.signer);
    this.eventListener();
  }

  public fetchId = async (): Promise<number> => {
    const id = Number(await this.contract.id());
    this.tournamentId = id;
    return id;
  };

  public fetchBracket = async (tournamentId: number): Promise<number[]> => {
    return await this.contract.getBracket(tournamentId);
  };

  public fetchRound = async (): Promise<number> => {
    return Number(await this.contract.round());
  };

  public fetchStatus = async (): Promise<boolean> => {
    return await this.contract.isTournamentActive();
  };

  public fetchTokens = async (tournamentId: number): Promise<IToken[]> => {
    const addresses: string[] = await this.contract.getTokens(tournamentId);
    this.addresses = addresses;

    const promises = addresses.map(async (address: string): Promise<IToken> => {
      const params = {
        address,
        router: this.tournament.router.contract,
        manager: this.contract,
      };
      
      return await new Token(params).init();
    });

    return await Promise.all(promises);
  };

  public fetchUSDC = async (): Promise<IToken> => {
    const usdcAddress: string = await this.contract.usdc();

    const params = {
      address: usdcAddress,
      router: this.tournament.router.contract,
      manager: this.contract,
    };

    return await new TokenUSDC(params).init();
  };

  public fetchFee = async (): Promise<number> => {
    return await this.contract.fee();
  };

  public fetchStartTime = async (): Promise<number> => {
    return Number(await this.contract.startTime()) * 1000;
  };

  /**
   * @returns {Promise<Reward[] | undefined>}
   */
  public fetchRewards = async (
    tournamentId: number
  ): Promise<Reward[] | undefined> => {
    const userAddress = window.__USER_ADDRESS__;
    const tournamentIds = Array.from({ length: tournamentId }, (_, i) => i);

    if (!userAddress) return Promise.resolve([]);

    try {
      const promises = tournamentIds.map(async (tournamentId) => {
        return await this.fetchRewardsByTournamentId(tournamentId, userAddress);
      });

      const arr = (await Promise.all(promises)) as Reward[];

      const rewards = arr.sort((a, b) => {
        if (a.canClaim === true && b.canClaim === false) {
          return -1;
        } else if (a.canClaim === false && b.canClaim === true) {
          return 1;
        } else {
          return 0;
        }
      });

      return rewards;
    } catch (error) {
      console.log(error);
      console.log("Error while fetching rewards");
    }
  };

  /**
   * @param {number} tournamentId
   * @param {string} userAddress
   * @returns {Promise<Reward | undefined>}
   */
  public fetchRewardsByTournamentId = async (
    tournamentId: number,
    userAddress: string
  ): Promise<Reward | undefined> => {
    const decimals = 6;

    try {
      const rewards = await this.getReward(tournamentId);
      const address = await this.getWinningToken(tournamentId);
      if (!address) return;

      const manager = this.contract;
      const router = this.tournament.router.contract;

      const tokenParams = {
        address: address,
        manager: manager,
        router: router,
      };

      const token = await new Token(tokenParams).init();
      if (!token || !decimals || !rewards) return;

      const userBalance = await token.balanceOf(userAddress);
      const userReward = Number(rewards) * Number(userBalance);

      // userReward / 1e6
      const reward = String(userReward / 10 ** decimals);
      token.amount = userBalance;

      const approved = await token.fetchAllowanceManager();
      const canClaim = parseFloat(userBalance) > 0;

      return { tournamentId, token, reward, canClaim, approved };
    } catch (error) {
      console.log(error);
      console.log(`Error while claiming rewards by tournament ${tournamentId}`);
    }
  };

  public fetchTotalPrize = async (usdc: IToken): Promise<string> => {
    const balancePromises = this.addresses.map(async (address: string) => {
      const poolData = await this.contract.getSpotPriceAndPair(address);
      const pool = poolData[1];
      return await usdc.balanceOf(pool);
    });

    const balancesList = await Promise.all(balancePromises);

    const totalPrize = balancesList.reduce((acc, cur) => {
      return Number(acc) + Number(cur);
    }, 0);

    return String(totalPrize);
  }

  public getReward = async (tournamentId: number): Promise<string> => {
    return String(await this.contract.getReward(tournamentId));
  };

  public getPendingFees = async (): Promise<string> => {
    return String(await this.contract.pendingFees());
  };

  public getPendingRewards = async (): Promise<string> => {
    return String(await this.contract.pendingRewards());
  };

  public getWinningToken = async (tournamentId: number): Promise<string> => {
    return await this.contract.getWinningToken(tournamentId);
  };

  private eventListener = () => {
    console.log("Start listening for manager events");

    if (!this.provider) {
      console.error("Provider is not defined");
      return;
    }

    // round started
    this.contract.on("RoundStarted", this.roundStarted);
    // round ended
    this.contract.on("RoundEnded", this.roundEnded);
    // tournament started
    this.contract.on("TournamentStarted", this.tournamentStarted);
  };

  public redeem = async (tournamentId: number, token: IToken) => {
    const amount = ethers.utils.parseUnits(token.amount, token.decimals);
    try {
      const tx = await this.contract.redeem(tournamentId, amount);
      return await tx.wait();
    } catch (error) {
      return Promise.reject(error);
    }
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

    await this.tournament.update();
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

      await this.tournament.update();
      await this.tournament.updateRewards();

      const { showPopup } = usePopupsStore();
      showPopup(Popup.CLAIM);
    }
  };

  private tournamentStarted = async (tournamentId: number) => {
    const { pushNotification } = useNotificationStore();
    await this.tournament.update();

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

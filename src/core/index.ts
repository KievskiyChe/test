/** Tournament */
import { Router } from "./models/Router";
import { Factory } from "./models/Factory";
import { Manager } from "./models/Manager";
import { Game } from "./models/Game";
import { randomHash } from "./common/helpers";

const LAST_ROUND = 3;

export default class Tournament implements ITournament {
  private readonly sleepTime = 1000;

  public readonly router = {} as IRouter;
  public readonly factory = {} as IFactory;
  public readonly manager = {} as IManager;
  public readonly params: TournamentParams = new Map();

  constructor() {
    this.router = new Router();
    this.manager = new Manager(this);
    this.factory = new Factory();
  }

  /**
   * Update tournament data
   * @dev Each time the tournament data is updated, the store is updated.
   * @returns {Promise<void>}
   */
  private setParam = <T>(key: keyof Params, value: T): T => {
    this.params.set(key, value);
    this.updateStore();
    return value;
  };

  private getParam = <T>(key: keyof Params): T => {
    return this.params.get(key) as T;
  };

  public fetchStatus = async (): Promise<void> => {
    const { fetchRound, fetchStatus } = this.manager;
    await this.fetchParam("round", fetchRound);
    await this.fetchParam("status", fetchStatus);
  };

  /**
   * Main function.
   * Calls all necessary functions to update tournament data.
   * Get tournament id, status, fee, round, tokens, bracket, usdc.
   * @returns {Promise<void>}
   */
  private fetch = async (): Promise<void> => {
    this.updateStoreProcess(true);

    const slt = this.sleepTime;
    const {
      fetchId,
      fetchRound,
      fetchUSDC,
      fetchStatus,
      fetchTokens,
      fetchBracket,
      fetchStartTime,
      fetchRewards,
    } = this.manager;
    const { fetchFee } = this.factory;

    try {
      await this.fetchParam("id", fetchId, 200);
      await this.fetchParam("round", fetchRound, 200);
      await this.fetchParam("startTime", fetchStartTime, 200);
      await this.fetchParam("fee", fetchFee, 200);
      await this.fetchParam("usdc", fetchUSDC, 200);
      await this.fetchParam("status", fetchStatus, 200);

      const round = this.getParam<number>("round");
      const currentId = this.getParam<number>("id");
      const id = round !== LAST_ROUND ? currentId : currentId - 1;

      await this.fetchParam("tokens", () => fetchTokens(id), slt);
      await this.fetchParam("bracket", () => fetchBracket(id), 200);
      await this.fetchParam("rewards", () => fetchRewards(currentId), 200);
      await this.fetchWinner(id);

      const tokens = this.getParam<IToken[]>("tokens");
      const bracket = this.getParam<number[]>("bracket");
      const game = new Game(round, tokens, bracket);

      if (round === LAST_ROUND) {
        const winner = this.getParam<IToken>("winner");
        game.setWinner(winner);
        game.update(LAST_ROUND, bracket);
      }

      this.setParam("game", game);
    } catch (error) {
      console.log("error");
      await Promise.reject("Error while fetching Tournament");
    } finally {
      this.updateStoreProcess(false);
    }
  };

  /**
   * Fetch param and set it to the store on the fly
   * @param {keyof Params} key
   * @param {Promise<any>} fn - callable function
   * @param {number} sleepTime - sleep time in ms
   * @dev 'sleepTime' need for correct work of
   * the fetching process. By example, polygon_mumbai testnet is very slow and
   * have request limits for calls (40 per second). So, we need to wait a
   * little bit between calls.
   * @returns {Promise<void>}
   */
  private fetchParam = async (
    key: keyof Params,
    fn: () => Promise<any>,
    sleepTime: number = 0
  ): Promise<void> => {
    const timer = `getting ${key}-${randomHash(4)}`;
    console.time(timer);
    try {
      await sleep(sleepTime);
      return this.setParam(key, await fn());
    } catch (error) {
      console.log(error);
      console.log(`Error while getting ${key}`);
    } finally {
      console.timeEnd(timer);
    }
  };

  /**
   * Fetch winner by tournament id
   * @param {number} tournamentId
   * @returns {Promise<void>}
   */
  private fetchWinner = async (tournamentId: number): Promise<void> => {
    if (this.getParam<number>("round") !== LAST_ROUND)
      return Promise.resolve(undefined);

    const winnerAddress = await this.manager.getWinningToken(tournamentId);
    const winner = this.getParam<IToken[]>("tokens").find(
      (token) => token.address === winnerAddress
    );

    this.setParam("winner", winner);
  };

  /**
   * Claim rewards by user address
   * and tournament id
   */
  public claimRewards = async (tournamentId: number, token: IToken) => {
    try {
      return await this.manager.redeem(tournamentId, token);
    } catch (error) {
      console.log(error);
      return Promise.reject("Error while claiming rewards");
    }
  };

  /**
   * Update tournament data
   * @returns {Promise<void>}
   */
  public update = async (): Promise<void> => {
    const timer = `updating-${randomHash(4)}`;
    console.time(timer);

    try {
      await this.fetch();
      this.updateStore();
    } catch (error: any) {
      console.log(error);
      console.log("Error while updating Tournament");
    } finally {
      console.timeEnd(timer);
    }
  };

  /**
   * Update user balances
   * @returns {Promise<void>}
   */
  public updateBalances = async (): Promise<void> => {
    const timer = `updating-${randomHash(4)}`;
    console.time(timer);

    const id = this.getParam<number>("id");
    const { fetchFee } = this.factory;
    const { fetchUSDC, fetchTokens } = this.manager;

    try {
      await this.fetchParam("fee", fetchFee);
      await this.fetchParam("usdc", fetchUSDC);
      await this.fetchParam("tokens", () => fetchTokens(id));
    } catch (error: any) {
      console.log(error);
      console.log("Error while updating Tournament");
    } finally {
      console.timeEnd(timer);
    }
  };

  /**
   * Update user rewards
   * @returns {Promise<void>}
   */
  public updateRewards = async (): Promise<void> => {
    const timer = `updating-${randomHash(4)}`;
    console.time(timer);

    const id = this.getParam<number>("id");
    const { fetchRewards } = this.manager;

    try {
      await this.fetchParam("rewards", () => fetchRewards(id));
    } catch (error: any) {
      console.log(error);
      console.log("Error while updating Tournament");
    } finally {
      console.timeEnd(timer);
    }
  };

  /**
   * Swap tokens
   * @param {SwapOptions} options
   * @returns {Promise<TransactionReceipt>}
   */
  public swap = async (
    options: SwapOptions | undefined
  ): Promise<TransactionReceipt> => {
    if (!options) return Promise.reject("No options provided");
    return await this.router.swapTokens(options);
  };

  /**
   * Update tournament data in stores (pinia)
   * @returns {void}
   */
  private updateStore = (): void => {
    const data = Object.fromEntries(this.params) as Params;
    useTournamentStore().update(data);
    useSwapStore().update();
    useRewardsStore().update(data.rewards);
  };

  /**
   * Update tournament process in stores (pinia)
   * @param {boolean} process
   * @returns {void}
   */
  private updateStoreProcess = (process: boolean): void => {
    useTournamentStore().setProcess(process);
    useSwapStore().setProcess(process);
    useRewardsStore().setProcess(process);
  };
}

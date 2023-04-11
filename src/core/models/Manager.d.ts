interface IManager {
  contract: Contract;
  fetchId: () => Promise<number>;
  fetchBracket: (tournamentId: number) => Promise<number[]>;
  fetchRound: () => Promise<number>;
  fetchStatus: () => Promise<boolean>;
  fetchTokens: (tournamentId: number) => Promise<IToken[]>;
  fetchUSDC: () => Promise<IToken>;
  fetchFee: () => Promise<number>;
  fetchStartTime: () => Promise<number>;
  fetchTotalPrize: (usdc: IToken) => Promise<string>;
  fetchRewards: (tournamentId: number) => Promise<Reward[] | undefined>;
  getReward: (tournamentId: number) => Promise<string>;
  getPendingFees: () => Promise<string>;
  getPendingRewards: () => Promise<string>;
  getWinningToken: (tournamentId: number) => Promise<string>;
  redeem: (tournamentId: number, token: IToken) => Promise<any>;
}

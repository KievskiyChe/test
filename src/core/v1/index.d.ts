/// <reference path="./models/Token.d.ts" />
/// <reference path="./models/Router.d.ts" />
/// <reference path="./models/Factory.d.ts" />
/// <reference path="./models/Manager.d.ts" />
/// <reference path="./models/Game.d.ts" />

type Contract = ethers.Contract;
type Provider = ethers.JsonRpcProvider;
type Signer = ethers.Signer;
type ContractTransaction = ethers.ContractTransaction;
type TransactionReceipt = ethers.TransactionReceipt;

interface ITournament {
  router: IRouter;
  factory: IFactory;
  manager: IManager;
  params: TournamentParams;
  fetchStatus: () => Promise<void>;
  claimRewards: (
    tournamentId: number,
    token: IToken
  ) => Promise<TransactionReceipt>;
  update: () => Promise<void>;
  updateBalances: () => Promise<void>;
  updateRewards: () => Promise<void>;
  swap: (options: SwapOptions | undefined) => Promise<TransactionReceipt>;
}

interface Params {
  id: number;
  round: number;
  bracket: number[];

  status: boolean;
  fee: number;
  startTime: number;

  tokens: IToken[];
  usdc: IToken;
  totalPrize: string;

  game: IGame;
  rewards: Reward[];
  winner: IToken;
}

interface Reward {
  tournamentId: number;
  token: IToken;
  reward: string;
  canClaim: boolean;
  approved: boolean;
}

type TournamentParams = Map<keyof Params, (typeof Params)[keyof Params]>;

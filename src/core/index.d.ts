/// <reference path="./models/Token.d.ts" />
/// <reference path="./models/Game.d.ts" />

type Contract = ethers.Contract;
type Provider = ethers.JsonRpcProvider;
type Signer = ethers.Signer;
type ContractTransaction = ethers.ContractTransaction;
type TransactionReceipt = ethers.TransactionReceipt;

interface ITournament {
  fetchStatus: () => Promise<boolean>;
  init: () => Promise<void>;
  updateSilent: () => Promise<void>;
  update: () => Promise<void>;
  getAmountsOut: (options: AmountsOutOptions) => Promise<string | undefined>;
  swap: (options: SwapOptions) => Promise<ContractTransaction>;
  swapTokens: (options: SwapOptions) => Promise<ContractTransaction>;
}

interface Reward {
  tournamentId: number;
  token: IToken;
  reward: string;
  canClaim: boolean;
  approved: boolean;
}

interface SwapOptions {
  amount: string;
  slippage: string;
  path: string[];
  to: string;
  deadline: number;
}

interface AmountsOutOptions {
  amount: string;
  from: IToken;
  to: IToken;
}

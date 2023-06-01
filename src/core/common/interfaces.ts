import type { Token } from "../models/Token";
import type { Game } from "../models/Game";

export interface ManagerDataResults {
  tokens: string[];
  baseTokens: string[];
  bracket: number[];
  isRoundActive: boolean;
  pendingFees: string;
  pendingRewards: string;
  reward: string;
  round: number;
  startTime: string;
  usdc: string;
  winningToken: string;
  startingLiquidity: string;
}
export interface ManagerData {
  id: number;
  fee?: number;
  status: boolean;
  tokens?: Token[],
  baseTokens: string[],
  bracket: number[],
  isRoundActive: boolean,
  pendingFees: string,
  pendingRewards: string,
  reward: string,
  rewards?: any[],
  round: number,
  startTime: number,
  usdc?: Token,
  winningToken?: string,
  game?: Game,
  startingLiquidity: string
}

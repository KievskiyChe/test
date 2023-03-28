interface IRouter {
  contract: Contract;
  getAmountsOut: (options) => Promise<string | undefined>;
  swapTokens(options: SwapOptions): Promise<TransactionReceipt>;
}

interface SwapOptions {
  amount: string;
  slippage: string;
  path: string[];
  to: string;
  expiration: number;
}

interface AmountsOutOptions {
  amount: string;
  from: IToken;
  to: IToken;
}

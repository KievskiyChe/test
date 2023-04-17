interface IToken {
  needMoreApprove?: boolean;
  allowance?: string;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  price: string;
  amount: string;
  approved: boolean;
  inactive?: boolean;
  managerAddress?: string;
  liquidityPool: string;
  get amountUSD(): string;
  balanceOf: (address: string) => Promise<string>;
  totalSupply: () => Promise<string>;
  approve: (spender: string) => Promise<TransactionReceipt>;
  approveManager: (amount: string) => Promise<TransactionReceipt>;
  fetchAllowanceManager: () => Promise<boolean>;
}

interface TokenCreate {
  address: string;
  router: Contract;
  manager: Contract;
}

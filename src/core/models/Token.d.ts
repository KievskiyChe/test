interface IToken {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  price: string;
  amount: string;
  approved: boolean;
  get amountUSD(): string;
  balanceOf: (address: string) => Promise<string>;
  totalSupply: () => Promise<string>;
  approve: () => Promise<TransactionReceipt>;
  approveManager: (amount: string) => Promise<TransactionReceipt>;
  fetchAllowanceManager: () => Promise<boolean>;
}

interface TokenCreate {
  address: string;
  router: Contract;
  manager: Contract;
}

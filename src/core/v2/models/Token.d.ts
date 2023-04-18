interface IToken {
  public address: string;
  public name: string;
  public symbol: string;
  public decimals: number;
  public price: string;
  public amount: string;
  public liquidityPool: string;
  public liquidityPoolAddress: string;
  public approved: boolean;
  public approvedManager: boolean;
  public allowance: string;
  public allowanceManager: string;
  public routerAddress: string;
  public managerAddress: string;
  public needMoreApprove?: boolean;
  public approve: (spender: string) => Promise<TransactionReceipt>;
}

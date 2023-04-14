import { ethers } from "ethers";
import ABI_ERC_20 from "../abis/ERC20.json";
import { Multicall } from "ethereum-multicall";
import { formatUnits } from "ethers/lib/utils";

interface TokenCreate {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  price: string;
  liquidityPool: string;
  liquidityPoolAddress: string;
  amount: string;
  approved: boolean;
  approvedManager: boolean;
  allowance: string;
  allowanceManager: string;
  routerAddress: string;
  managerAddress: string;
}

export class Token {
  private readonly provider = {} as Signer;
  private userAddress: string | undefined;
  private contract: Contract;

  public address: string;
  public name!: string;
  public symbol!: string;
  public decimals!: number;
  public price!: string;
  public amount!: string;
  public liquidityPool!: string;
  public liquidityPoolAddress!: string;
  public approved = false;
  public approvedManager = false;
  public allowance!: string;
  public allowanceManager!: string;
  public routerAddress!: string;
  public managerAddress!: string;

  constructor(params: TokenCreate) {
    this.address = params.address;
    this.provider = window.__PROVIDER__;
    this.userAddress = window.__USER_ADDRESS__;
    this.contract = new ethers.Contract(params.address, ABI_ERC_20, this.provider);
    this.name = params.name;
    this.symbol = params.symbol;
    this.decimals = params.decimals;
    this.price = params.price;
    this.liquidityPool = params.liquidityPool;
    this.liquidityPoolAddress = params.liquidityPoolAddress;
    this.amount = params.amount;
    this.approved = params.approved;
    this.allowance = params.allowance;
    this.approvedManager = params.approvedManager;
    this.allowanceManager = params.allowanceManager;
    this.routerAddress = params.routerAddress;
    this.managerAddress = params.managerAddress;
  }

  public get(): any {
    return {
      address: this.address,
      userAddress: this.userAddress,
      name: this.name,
      symbol: this.symbol,
      decimals: this.decimals,
      price: this.price,
      liquidityPool: this.liquidityPool,
      liquidityPoolAddress: this.liquidityPoolAddress,
      amount: this.amount,
      approved: this.approved,
      allowance: this.allowance,
      approvedManager: this.approvedManager,
      allowanceManager: this.allowanceManager,
      routerAddress: this.routerAddress,
      managerAddress: this.managerAddress,
      approve: this.approve,
      balanceOf: this.balanceOf
    };
  }

  public approve = async (spender: string): Promise<TransactionReceipt> => {
    const signerContract = this.contract.connect(window.__SIGNER__);

    const tx = await signerContract.approve(
      spender,
      "100000000000000000000000"
    );

    return await tx.wait().then((receipt: TransactionReceipt) => receipt);
  };

  public balanceOf = async (address: string): Promise<string> => {
    const balance = await this.contract.balanceOf(address);
    return formatUnits(balance, this.decimals);
  }
}

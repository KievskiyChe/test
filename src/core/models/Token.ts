import { ethers } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import ABI_ERC_20 from "../abis/ERC20.json";

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
  needMoreApprove: boolean;
}

export class Token implements IToken {
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
  public needMoreApprove = false;

  constructor(params: TokenCreate) {
    this.address = params.address;
    this.provider = window.__PROVIDER__;
    this.userAddress = window.__USER_ADDRESS__;
    this.contract = new ethers.Contract(
      params.address,
      ABI_ERC_20,
      this.provider
    );
    Object.assign(this, params);
  }

  public getAsset(): any {
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
      balanceOf: this.balanceOf,
    };
  }

  public approve = async (spender: string): Promise<TransactionReceipt> => {
    const approvedValue = "100000000000000000000000";
    const signerContract = this.contract.connect(window.__SIGNER__);

    const tx = await signerContract.approve(spender, approvedValue);
    return await tx.wait();
  };

  public balanceOf = async (address: string): Promise<string> => {
    const balance = await this.contract.balanceOf(address);
    return formatUnits(balance, this.decimals);
  };
}

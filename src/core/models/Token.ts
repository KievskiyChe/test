import { BigNumber, ethers } from "ethers";
import { createContractERC20 } from "../common/helpers";

export class Token implements IToken {
  private provider = {} as Signer;
  private readonly sleepTime = 150;

  protected contract: Contract;
  protected router: Contract;
  protected manager: Contract;
  protected userAddress: string | undefined;

  public address: string;
  public name!: string;
  public symbol!: string;
  public decimals!: number;
  public price!: string;
  public amount!: string;
  public approved = false;

  get amountUSD(): string {
    if (!this.amount || !this.price) return "0.00";

    const amount = Number(this.amount);
    const price = Number(this.price);
    const value = amount * price;

    return parseFloat(value.toString()).toFixed(18);
  }

  constructor({ address, router, manager }: TokenCreate) {
    this.provider = window.__PROVIDER__;
    this.userAddress = window.__USER_ADDRESS__;

    this.address = address;
    this.router = router;
    this.manager = manager;
    this.contract = createContractERC20(address);
  }

  public init = async (): Promise<IToken> => {
    if (this.address !== "0x0000000000000000000000000000000000000000") {
      await this.fetch();
    }

    return {
      name: this.name,
      symbol: this.symbol,
      address: this.address,
      decimals: this.decimals,
      price: this.price,
      amount: this.amount,
      amountUSD: this.amountUSD,
      approved: this.approved,
      approve: this.approve,
      approveManager: this.approveManager,
      fetchAllowanceManager: this.fetchAllowanceManager,
      balanceOf: this.balanceOf,
      totalSupply: this.totalSupply,
    };
  };

  /**
   * Approve token for spending (swaps)
   * @memberof Token
   */
  public approve = async (): Promise<TransactionReceipt> => {
    const tx = await this.contract.approve(
      this.router.address,
      ethers.constants.MaxUint256
    );
    return await tx.wait().then((receipt: TransactionReceipt) => receipt);
  };

  /**
   * Approve token for spending (swaps)
   * @memberof Token
   */
  public approveManager = async (
    amount: string
  ): Promise<TransactionReceipt> => {
    const tx = await this.contract.approve(
      this.manager.address,
      ethers.utils.parseUnits(amount, this.decimals)
    );
    return await tx.wait().then((receipt: TransactionReceipt) => receipt);
  };

  /**
   * Fetch token metadata and allowance
   * @returns {Promise<void>}
   * @memberof Token
   */
  public fetch = async (): Promise<void> => {
    await this.fetchMetadata();
    await this.fetchAllowance();
  };

  /**
   * @param {string} address
   * @returns {Promise<string>}
   */
  public balanceOf = async (address: string): Promise<string> => {
    const balance: BigNumber = await this.contract.balanceOf(address);
    return ethers.utils.formatUnits(balance, this.decimals);
  };

  /**
   * @returns {Promise<string>}
   */
  public totalSupply = async (): Promise<string> => {
    const supply: BigNumber = await this.contract.totalSupply();
    return ethers.utils.formatUnits(supply, this.decimals);
  };

  /**
   * Fetch token metadata
   * @returns {Promise<void>}
   * @memberof Token
   */
  public fetchMetadata = async (): Promise<void> => {
    try {
      const name = await this.contract.name();
      const symbol = await this.contract.symbol();
      const decimals = await this.contract.decimals();
      const price = await this.manager.getSpotPrice(this.address);
      await sleep(this.sleepTime);

      let amount = 0;

      if (this.userAddress) {
        amount = await this.contract.balanceOf(this.userAddress);
      }

      this.name = name;
      this.symbol = symbol;
      this.decimals = decimals;
      this.price = ethers.utils.formatUnits(price, decimals);

      if (amount) {
        this.amount = ethers.utils.formatUnits(amount, decimals);
      }
    } catch (error) {
      console.log(error);
      console.log(`Error while fetching token ${this.symbol} metadata`);
    }
  };

  /**
   * Fetch token allowance
   * @returns {Promise<void>}
   * @memberof Token
   */
  public fetchAllowance = async (): Promise<void> => {
    if (!this.userAddress) {
      this.approved = false;
      return;
    }

    try {
      const result: BigNumber = await this.contract.allowance(
        this.userAddress,
        this.router.address
      );

      this.approved = !!Number(result);
    } catch (error) {
      console.log(error);
      console.log(`Error while fetching token ${this.symbol} allowance`);
    }
  };

  public fetchAllowanceManager = async (): Promise<boolean> => {
    if (!this.userAddress) {
      return false;
    }

    try {
      const result: BigNumber = await this.contract.allowance(
        this.userAddress,
        this.manager.address
      );

      return !!Number(result);
    } catch (error) {
      console.log(error);
      console.log(`Error while fetching token ${this.symbol} allowance`);
      return false;
    }
  };
}

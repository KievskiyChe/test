/** Tournament Router */
import { createContractRouter } from "../common/helpers";
import { ethers } from "ethers";

export class Router implements IRouter {
  public readonly contract = {} as Contract;

  constructor() {
    this.contract = createContractRouter();
  }

  public getAmountsOut = async (
    options: AmountsOutOptions
  ): Promise<string | undefined> => {
    try {
      const path = [options.from.address, options.to.address];
      const amount = ethers.utils.parseUnits(
        options.amount,
        options.from.decimals
      );

      if (!options.amount) return;

      console.log(amount, path);
      
      const result = await this.contract.getAmountsOutWithFee(amount, path);
      const value = result.toString().split(",")[1];

      console.log("Amounts out: ", value);
      
      

      return ethers.utils.formatUnits(value, options.to.decimals);
    } catch (error) {
      console.log(error);
      console.log("Error while getting amounts out");
    }
  };

  /**
   * Swap tokens
   */
  public swapTokens = async (
    options: SwapOptions
  ): Promise<TransactionReceipt> => {
    try {
      const tx = await this.contract.swapExactTokensForTokens(
        ...Object.values(options),
        { gasLimit: 6_000_000 }
      );

      return await tx.wait().then((reciept: TransactionReceipt) => reciept);
    } catch (error) {
      console.log(error);
      console.log("Error while swapping tokens");
      return Promise.reject(error);
    }
  };
}

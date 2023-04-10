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
      const { address, decimals } = options.from;
      const path = [address, options.to.address];

      const amount = ethers.utils.parseUnits(options.amount, decimals);

      if (!options.amount) return;

      const result = await this.contract.getAmountsOutWithFee(amount, path);
      const [_, value] = result.toString().split(",");

      return ethers.utils.formatUnits(value, options.to.decimals);
    } catch (error) {
      console.log(`Error while getting amounts out: ${error}`);
    }
  };

  /**
   * Swap tokens
   */
  public swapTokens = async (
    options: SwapOptions
  ): Promise<TransactionReceipt> => {
    const gasLimit = 6_000_000;

    try {
      const tx = await this.contract.swapExactTokensForTokens(
        ...Object.values(options),
        { gasLimit }
      );

      return await tx.wait().then((reciept: TransactionReceipt) => reciept);
    } catch (error) {
      console.log(error);
      console.log("Error while swapping tokens");
      return Promise.reject(error);
    }
  };
}

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
      const { from, to } = options;

      const path = [from.address, to.address];
      const amountIn = ethers.utils
        .parseUnits(options.amount, from.decimals)
        .toString();

      if (!options.amount) return;

      const args = [amountIn, path];

      const result = await this.contract.getAmountsOutWithFee(...args);
      // const result = await this.contract.getAmountsInWithFee(...args);
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
      const signerContract = this.contract.connect(window.__SIGNER__);
      const tx = await signerContract.swapExactTokensForTokens(
        ...Object.values(options),
        { gasLimit }
      );
      return await tx.wait();
    } catch (error) {
      console.log(error);
      console.log("Error while swapping tokens");
      return Promise.reject(error);
    }
  };
}

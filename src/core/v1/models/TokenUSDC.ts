import { Token } from "./Token";
import { ethers } from "ethers";

export class TokenUSDC extends Token implements IToken {
  constructor(params: TokenCreate) {
    super(params);
  }

  /**
   * Fetch token metadata
   * @returns {Promise<void>}
   * @memberof Token
   */
  public fetchMetadata = async (): Promise<void> => {
    const promises = new Map();

    promises
      .set("name", this.contract.name())
      .set("symbol", this.contract.symbol())
      .set("decimals", this.contract.decimals());

    if (this.userAddress) {
      promises.set("amount", this.contract.balanceOf(this.userAddress));
    }

    try {
      const [name, symbol, decimals, amount] = await Promise.all(
        promises.values()
      );

      this.name = name;
      this.symbol = symbol;
      this.decimals = decimals;
      this.price = "1.00";

      if (amount) {
        this.amount = ethers.utils.formatUnits(amount, decimals);
      }

      promises.clear();
    } catch (error) {
      console.log(error);
      console.log(`Error while fetching token ${this.symbol} metadata`);
    }
  };
}

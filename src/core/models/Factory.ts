/** Tournament Factory */
import { createContractFactory } from "../common/helpers";

export class Factory implements IFactory {
  public readonly contract = {} as Contract;

  constructor() {
    this.contract = createContractFactory();
  }

  public getPair = async (tokenA: string, tokenB: string): Promise<string> => {
    return await this.contract.getPair(tokenA, tokenB);
  };

  public fetchFee = async (): Promise<number> => {
    const fee = await this.contract.fee();
    return fee.toNumber();
  };
}

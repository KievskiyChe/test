import { createContractManager } from "./helpers";

export class Mock {
  public contract = {} as Contract;

  public GAS_LIMIT = 25_000_000;
  public GWEI = 1_000_000_000;

  constructor() {
    this.contract = createContractManager(window.__SIGNER__);
  }

  public mockStart = async () => {
    const txArgs = {
      gasLimit: this.GAS_LIMIT,
      maxFeePerGas: this.GWEI * 20,
      maxPriorityFeePerGas: this.GWEI * 10,
    };

    await this.contract.mockStart(txArgs);
  };

  public mockStop = async () => {
    const txArgs = {
      gasLimit: this.GAS_LIMIT,
      maxFeePerGas: this.GWEI * 20,
      maxPriorityFeePerGas: this.GWEI * 10,
    };

    await this.contract.mockStop(txArgs);
  };
}

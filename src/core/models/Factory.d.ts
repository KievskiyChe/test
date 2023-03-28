interface IFactory {
  getPair: (tokenA: string, tokenB: string) => Promise<string>;
  fetchFee: () => Promise<number>;
}

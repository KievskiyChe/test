export const useTournamentStore = defineStore("tournament-module", () => {
  const process = ref(false);
  const isActive = ref(false);
  const id = ref(0);
  const round = ref(0);

  const fee = ref(0);
  const startTime = ref(0);
  const tokens = ref<IToken[]>([]);
  const usdc = ref<IToken>();
  const game = ref<IGame>();
  const rewards = ref<Reward[]>([]);

  const setProcess = (value: boolean): void => {
    process.value = value;
  };

  const setIsActive = (value: boolean): void => {
    isActive.value = value;
  };

  const setId = (value: number): void => {
    id.value = value;
  };

  const setRound = (value: number): void => {
    round.value = value;
  };

  const setFee = (value: number): void => {
    fee.value = value;
  };

  const setStartTime = (value: number): void => {
    startTime.value = value;
  };

  const setTokens = (value: IToken[]): void => {
    tokens.value = value;
  };

  const setUSDC = (value: IToken): void => {
    usdc.value = value;
  };

  const setGame = (value: IGame): void => {
    game.value = value;
  };

  const availableAssets = (): number => {
    return tokens.value.filter((token) => {
      return Number(token.amount) > 0;
    }).length;
  };

  const totalAmounts = (): number => {
    return tokens.value.reduce((acc, token) => {
      return acc + Number(token.amount);
    }, 0);
  };

  const totalAmountsUSD = (): string => {
    const total = tokens.value.reduce((acc, token) => {
      return acc + Number(token.amountUSD);
    }, 0);

    return cutString(parseFloat(total.toString()).toFixed(4), 4);
  };

  const percentage = (amount: string): number => {
    return (parseFloat(amount) / totalAmounts()) * 100;
  };

  const update = (params: Params): void => {
    const { id, status, fee, tokens, usdc, game, round, startTime } = params;

    setId(id);
    setIsActive(status);
    setFee(fee);
    setStartTime(startTime);
    setTokens(tokens);
    setUSDC(usdc);
    setGame(game);
    setRound(round);
  };

  return {
    process,
    isActive,
    id,
    round,
    fee,
    startTime,
    tokens,
    usdc,
    game,
    rewards,
    setProcess,
    setIsActive,
    setRound,
    setTokens,
    setUSDC,
    setGame,
    setFee,
    availableAssets,
    totalAmounts,
    totalAmountsUSD,
    percentage,
    update,
  };
});

export const useSwapStore = defineStore("swap-module", () => {
  const process = ref<boolean>(false);
  const { usdc, tokens } = storeToRefs(useTournamentStore());
  const { pushNotification, removeAllNotifications } = useNotificationStore();

  // tokens
  const from = ref<IToken>();
  const to = ref<IToken>();

  // tokens amount
  const amountFrom = ref<string>("");
  const amountTo = ref<string>("");

  // tokens amount in USD
  const amountFromUSD = computed(() => {
    return calculateUSD(amountFrom.value, from.value?.price);
  });

  const amountToUSD = computed(() => {
    return calculateUSD(amountTo.value, to.value?.price);
  });

  // slippage
  const slippage = ref(1);

  // tokens amount validation
  const isValidFrom = computed<boolean>(() => {
    if (!from.value) return false;
    if (!+amountFrom.value) return false;
    return +amountFrom.value <= +from.value?.amount;
  });

  const isValidTo = computed<boolean>(() => {
    if (!to.value) return false;
    if (!+amountTo.value) return false;
    return +amountTo.value <= +to.value?.amount;
  });

  // form process
  const setProcess = (value: boolean) => {
    process.value = value;
  };

  // set token from
  const setFrom = (value: IToken | undefined) => {
    if (!usdc.value) return;

    if (!value) {
      from.value = usdc.value;
      return;
    }

    if (to.value?.address !== usdc.value.address) {
      to.value = usdc.value;
    }

    from.value = value;
    resetForm();
  };

  // set token to
  const setTo = (value: IToken | undefined) => {
    if (!usdc.value) return;

    if (!value) {
      to.value = tokens.value[0];
      return;
    }

    if (from.value?.address !== usdc.value.address) {
      from.value = usdc.value;
    }

    to.value = value;
    resetForm();
  };

  // set amount from
  const setAmountFrom = (value: string) => {
    amountFrom.value = value;
  };

  // set amount to
  const setAmountTo = (value: string) => {
    amountTo.value = value;
  };

  // set slippage
  const setSlippage = (value: number | null) => {
    if (!value) return;
    slippage.value = value;
  };

  // reset form
  const resetForm = () => {
    setAmountFrom("");
    setAmountTo("");
    setSlippage(1);
  };

  // swap tokens position
  const swapPositions = () => {
    const temp = from.value;
    from.value = to.value;
    to.value = temp;
  };

  const startProcess = () => {
    setProcess(true);

    pushNotification({
      title: "Swap",
      description: "Waiting for transaction",
      status: INotificationStatus.PENDING,
    });
  };

  const successProcess = async () => {
    setProcess(false);
    removeAllNotifications();
    await sleep(750);

    pushNotification({
      title: "Success",
      description: "Swap successfully",
      status: INotificationStatus.SUBMITTED,
    });
  };

  const errorProcess = async () => {
    setProcess(false);
    removeAllNotifications();
    await sleep(750);

    pushNotification({
      title: "Error",
      description: "Swap failed",
      status: INotificationStatus.ERROR,
    });
  };

  const getTokenFrom = (from: IToken | undefined): IToken | undefined => {
    const { tokens, usdc } = storeToRefs(useTournamentStore());

    if (!tokens.value || !usdc.value) return;

    if (!usdc.value) return tokens.value[0];
    if (!from) return usdc.value;

    if (from.address === usdc.value.address) return usdc.value;
    return tokens.value.find((token) => token.address === from.address)!;
  };

  const getTokenTo = (to: IToken | undefined): IToken | undefined => {
    const { tokens, usdc } = storeToRefs(useTournamentStore());

    if (!tokens.value || !usdc.value) return;

    if (!usdc.value) return tokens.value[0];
    if (!to) return tokens.value[0];

    if (to.address === usdc.value.address) return usdc.value;
    return tokens.value.find((token) => token.address === to.address)!;
  };

  const update = (): void => {
    from.value = getTokenFrom(from.value);
    to.value = getTokenTo(to.value);
  };

  const init = (): void => {
    from.value = getTokenFrom(from.value);
    to.value = {} as IToken;
  }

  return {
    process,
    from,
    to,
    amountFrom,
    amountTo,
    amountFromUSD,
    amountToUSD,
    slippage,
    isValidFrom,
    isValidTo,
    setProcess,
    setFrom,
    setTo,
    setAmountFrom,
    setAmountTo,
    setSlippage,
    resetForm,
    swapPositions,
    startProcess,
    successProcess,
    errorProcess,
    update,
    init
  };
});

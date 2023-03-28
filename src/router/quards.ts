export const HomeQuard = (to: any, from: any, next: CallableFunction) => {
  const { isActive, round } = storeToRefs(useTournamentStore());

  if (to.name === "home" && round.value >= 0 && round.value < 3) {
    return next("/battle");
  }

  next();
};

export const BattleQuard = (to: any, from: any, next: CallableFunction) => {
  const { isActive, round } = storeToRefs(useTournamentStore());

  if (to.name === "battle" && round.value === 3 && !isActive.value) {
    return next("/");
  }

  next();
};

export const ClaimHistoryQuard = (
  to: any,
  from: any,
  next: CallableFunction
) => {
  const { user } = storeToRefs(useUserStore());

  if (to.name === "claim-history" && !user.value) {
    return next("/");
  }

  next();
};

export const useRewardsStore = defineStore("rewards-module", () => {
  const process = ref(false);
  const { id, isActive, round } = storeToRefs(useTournamentStore());
  const { pushNotification } = useNotificationStore();

  const rewards = ref<Reward[]>([]);
  const reward = ref<Reward>();

  const setProcess = (value: boolean): void => {
    process.value = value;
  };

  const approveReward = async (userReward: Reward | undefined) => {
    process.value = true;
    const tournament = getTournament();

    if (!userReward || !tournament) return;

    try {
      await userReward.token.approveManager(userReward.token.amount);
      await tournament.updateRewards();

      pushNotification({
        status: INotificationStatus.SUBMITTED,
        title: "Approved",
        description: "Your rewards was approved",
      });
    } catch (error) {
      console.log(error);
      pushNotification({
        status: INotificationStatus.ERROR,
        title: "Error",
        description: "Error while approving rewards",
      });
    } finally {
      process.value = false;
    }
  };

  async function claimReward(userReward: Reward | undefined) {
    process.value = true;
    const tournament = getTournament();

    if (!userReward || !tournament) return;

    try {
      await tournament.claimRewards(userReward.tournamentId, userReward.token);
      await tournament.updateRewards();

      pushNotification({
        status: INotificationStatus.SUBMITTED,
        title: "Claimed",
        description: "Your rewards have been claimed",
      });
    } catch (error) {
      console.log(error);
      pushNotification({
        status: INotificationStatus.ERROR,
        title: "Error",
        description: "Error while claiming rewards",
      });
    } finally {
      process.value = false;
    }
  }

  const update = (value: Reward[]): void => {
    rewards.value = value;
    updateReward();
  };

  const updateReward = (): void => {
    /**
     * If rewards are not loaded, or tournament is not active
     * or round is 3 (ended) - do not update reward
     */
    if (!rewards.value || !id.value || isActive.value || round.value === 3)
      return;
    reward.value = rewards.value.find((r) => r.tournamentId === id.value - 1);
  };

  return {
    process,
    rewards,
    reward,
    setProcess,
    approveReward,
    claimReward,
    update,
  };
});

<script setup lang="ts">
const { game } = storeToRefs(useTournamentStore());
const { reward, process } = storeToRefs(useRewardsStore());
const { approveReward, claimReward } = useRewardsStore();
</script>

<template>
  <div class="champion" v-if="game && game.winner">
    <div class="champion-info">
      <TokenIcon :name="game.winner.symbol" :active="true" :big="true" />
      <div class="name">{{ game.winner.name }}</div>
    </div>

    <div class="reward-amount" v-if="reward && reward.canClaim">
      <span>Your prize</span>
      <h2 class="amount">
        {{ parseString(String(reward.reward), 2) }}
      </h2>
    </div>

    <div class="rewards" v-if="reward">
      <!-- not approved -->
      <TheButton
        v-if="reward.canClaim && !reward.approved"
        :disabled="process"
        @click.stop="approveReward(reward)"
      >
        <template #icon>
          <img src="@/assets/img/icons/claim.svg" />
        </template>
        <span>{{ process ? "proccess..." : "approve" }}</span>
      </TheButton>

      <!-- approved and can claim -->
      <TheButton
        v-if="reward.canClaim && reward.approved"
        :disabled="process"
        @click.stop="claimReward(reward)"
      >
        <template #icon>
          <img src="@/assets/img/icons/claim.svg" />
        </template>
        <span>{{ process ? "proccess..." : "claim" }}</span>
      </TheButton>

      <!-- no reward OR rewards already claimed -->
      <TheButton v-if="!reward.canClaim" :disabled="true">
        <template #icon>
          <img src="@/assets/img/icons/claim.svg" />
        </template>
        <span>no rewards</span>
      </TheButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.champion {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 100px;
  gap: 20px;
}

.champion .rewards {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.champion .reward-amount {
  display: grid;
  place-items: center;
  gap: 10px;

  .amount {
    font-size: 20px;
  }
}

.champion-info {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;

  .name {
    font-weight: 900;
    text-align: center;
    font-size: 26px;
    text-transform: uppercase;
    color: #1e1e1e;
    background-color: transparent;
    text-shadow: -1px -1px 0 #f9d667, 1px -1px 0 #f9d667, -1px 1px 0 #f9d667,
      1px 1px 0 #f9d667;
  }
}
</style>

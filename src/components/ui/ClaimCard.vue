<script setup lang="ts">
const { process } = storeToRefs(useRewardsStore());
const { approveReward, claimReward } = useRewardsStore();

interface Props {
  claim: any;
}

defineProps<Props>();
</script>

<template>
  <TheCard class="card">
    <div class="claim-card" v-if="claim.token">
      <div class="info">
        <div class="battle">
          <img src="@/assets/img/icons/battle.svg" />
          <span>battle #{{ claim.tournamentId + 1 }}</span>
        </div>

        <div class="winner">
          <div class="winner-icon">
            <TokenIcon :name="claim.token.symbol" />
          </div>

          <div class="winner-info">
            <span>winner</span>
            <div class="name">{{ claim.token.name }}</div>
          </div>
        </div>
      </div>

      <div class="prize" v-if="claim.canClaim">
        <p>your prize</p>
        <section>
          <img src="@/assets/img/icons/claim-gray.svg" />
          <h2>{{ parseString(String(claim.reward), 2) }}</h2>
        </section>
      </div>

      <div class="prize" v-if="!claim.canClaim"></div>

      <div class="claim">
        <TheButton
          v-if="claim.canClaim && claim.approved"
          @click.stop="claimReward(claim)"
          :disabled="process"
        >
          <template #icon>
            <img src="@/assets/img/icons/claim.svg" />
          </template>
          <span>{{ process ? "proccess..." : "claim" }}</span>
        </TheButton>

        <TheButton
          v-if="claim.canClaim && !claim.approved"
          @click.stop="approveReward(claim)"
          :disabled="process"
        >
          <template #icon>
            <img src="@/assets/img/icons/claim.svg" />
          </template>
          <span>{{ process ? "proccess..." : "approve" }}</span>
        </TheButton>

        <TheButton :disabled="true" v-if="!claim.canClaim">
          <template #icon>
            <img src="@/assets/img/icons/claim.svg" />
          </template>
          <span>no rewards</span>
        </TheButton>
      </div>
    </div>
  </TheCard>
</template>

<style scoped lang="scss">
.claim-card {
  width: 100%;
  height: 75px;
  display: grid;
  grid-template-columns: 180px 1fr 160px;
  gap: 10px;
}

.card {
  transition: all 0.3s ease;
}

.claim-card .prize {
  flex: 1;
  display: grid;
  place-items: center;

  p {
    text-transform: uppercase;
  }

  section {
    display: flex;
    justify-content: center;
    gap: 5px;
  }
}

.claim-card .claim {
  display: flex;
  align-items: center;

  span {
    font-size: 14px;
  }
}

.claim-card .info {
  display: grid;
  gap: 10px;

  .battle {
    display: flex;
    align-items: center;
    color: #aab2cc;
    text-transform: uppercase;
    font-weight: 600;
    span {
      letter-spacing: 0.17em;
    }
  }

  .winner {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .winner-icon {
    display: flex;
  }

  .winner-info {
    color: var(--accent-800);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: -5px;

    span {
      text-transform: uppercase;
      font-size: 14px;
    }
    .name {
      font-weight: 900;
      text-transform: uppercase;
      margin-left: -5px;

      font-weight: 900;
      text-align: center;
      font-size: 14px;
      text-transform: uppercase;
      color: #1e1e1e;
      background-color: transparent;
      text-shadow: -1px -1px 0 rgba(170, 178, 204, 0.8),
        1px -1px 0 rgba(170, 178, 204, 0.8), -1px 1px 0 rgba(170, 178, 204, 0.8),
        1px 1px 0 rgba(170, 178, 204, 0.8);
    }
  }
}

@media screen and (max-width: 1200px) {
  .claim-card {
    height: auto;
    display: flex;
    flex-wrap: wrap;
    .prize,
    .info {
      min-width: 200px;
    }

    .claim {
      flex: 1;
      justify-content: center;
    }

    .prize {
      display: flex;
      justify-content: flex-end;
    }
  }
}

@media screen and (max-width: 1024px) {
  .claim-card {
    height: auto;
    display: flex;
    flex-wrap: wrap;
    .prize,
    .info {
      min-width: 40%;
    }

    .claim {
      flex: 1;
      justify-content: center;
    }

    .prize {
      display: flex;
      justify-content: flex-end;
    }
  }
}

@media screen and (max-width: 768px) {
  .claim-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    gap: 20px;
  }

  .winner-info {
    display: flex;
    align-items: flex-end;

    span {
      text-align: left;
      align-self: flex-end;
    }
  }

  .claim-card .claim {
    width: 200px;
  }

  .claim-card .prize {
    gap: 5px;
    justify-content: center;
  }
}
</style>

<script setup lang="ts">
const { hidePopup } = usePopupsStore();
const { game } = storeToRefs(useTournamentStore())
const { process, reward } = storeToRefs(useRewardsStore());
const { approveReward, claimReward } = useRewardsStore();

const close = () => {
  hidePopup(Popup.CLAIM);
};

const animation = {
  content: {
    delay: 0.25,
    from: { scale: 0.5 },
    to: { scale: 1 },
    transition: {
      mass: 1,
      stiffness: 800,
    },
  },
}

</script>

<template>
  <div class="claim-popup">
    <Motion class="popup-overlay" @click.stop="close" />

    <Motion v-bind="animation.content">
      <div class="popup-content">
        <div class="title">Claim</div>

        <div class="body">
          <div class="winner" v-if="game && game.winner">
            <TokenIcon :name="game.winner.symbol" :big="true" />
            <span>{{ game.winner.name }}</span>
          </div>
          <template v-if="reward">
            <small>your prize</small>
            <h1>{{ parseString(String(reward.reward), 2) }}</h1>
          </template>
        </div>

        <div class="foo">
          <div class="claim" v-if="reward">

            <TheButton
              v-if="reward.canClaim && reward.approved"
              @click.stop="claimReward(reward)"
              :disabled="process"
            >
              <template #icon>
                <img src="@/assets/img/icons/claim.svg" />
              </template>
              <span>{{ process ? "proccess..." : "claim" }}</span>
            </TheButton>

            <TheButton
              v-if="reward.canClaim && !reward.approved"
              @click.stop="approveReward(reward)"
              :disabled="process"
            >
              <template #icon>
                <img src="@/assets/img/icons/claim.svg" />
              </template>
              <span>{{ process ? "proccess..." : "approve" }}</span>
            </TheButton>

            <TheButton :disabled="true" v-if="!reward.canClaim">
              <template #icon>
                <img src="@/assets/img/icons/claim.svg" />
              </template>
              <span>no rewards</span>
            </TheButton>
          </div>
          <div v-else>
            <p>No rewards</p>
          </div>
          <router-link :to="{ name: 'claim-history' }" @click="close">
            my battle history
          </router-link>
        </div>

        <div class="close" @click.stop="close"></div>
      </div>
    </Motion>
  </div>
</template>

<style scoped lang="scss">
.claim-popup {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;

  display: grid;
  place-items: center;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--black-600);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.winner {
  display: grid;
  gap: 10px;
  place-items: center;
  
  span {
    font-weight: 900;
    text-align: center;
    font-size: 30px;
    text-transform: uppercase;
    color: #1e1e1e;
    background-color: transparent;
    text-shadow: -1px -1px 0 var(--accent), 1px -1px 0 var(--accent), -1px 1px 0 var(--accent),
      1px 1px 0 var(--accent);
  }
}

.popup-content {
  width: 660px;
  height: 530px;
  display: grid;
  gap: 10px;
  /* background-image: url("@/assets/img/claim-history-bg.png"); */
  /* background-size: cover;
  background-position: center;
  background-repeat: no-repeat; */

  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  background: linear-gradient(
      112.48deg,
      rgba(255, 255, 255, 0.2) 3.47%,
      rgba(255, 255, 255, 0) 101.88%
    );

  border: 1px solid var(--white-500);
  backdrop-filter: blur(15px);
  border-radius: 28px;

  // animation: animate 30s ease infinite;
}

.title {
  font-size: 24px;
  text-align: center;
  padding: 20px;
  text-transform: uppercase;
  font-weight: 600;
}

.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  small {
    text-transform: capitalize;
    font-weight: 600;
    margin-bottom: 10px;
  }

  p {
    font-weight: 600;
    margin-top: 5px;
  }
}

.foo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;

  a {
    color: var(--shadow-yellow);
    text-transform: capitalize;
    font-weight: 600;
  }

  .claim {
    height: 44px;
    width: 240px;
    // border-radius: 8px;
    // border: 1px solid var(--shadow-yellow);
    // width: 90%;

    // display: flex;
    // align-items: center;
    // justify-content: center;
    // text-transform: uppercase;

    // &:hover {
    //   cursor: pointer;
    //   background: var(--shadow-yellow);
    // }
  }
}

.close {
  position: absolute;
  width: 14px;
  height: 14px;

  top: 15px;
  right: 15px;

  display: flex;
  align-items: center;
  cursor: pointer;

  &::after,
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    background: var(--white-800);
  }

  &::after {
    rotate: -45deg;
  }

  &::before {
    rotate: 45deg;
  }
}

@keyframes animate {
  0% {
    background-size: 150% 150%;
  }
  80% {
    background-size: 200% 200%;
  }
  100% {
    background-size: 150% 150%;
  }
}

@media screen and (max-width: 768px) {
  .popup-content {
    width: 340px;

    max-height: 440px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 0;
    }
  }
}
</style>

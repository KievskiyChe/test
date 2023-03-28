<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
const { user } = storeToRefs(useUserStore());

const showMenu = ref(false);
const outside = ref<HTMLElement | null>(null);

onClickOutside(outside, () => {
  showMenu.value = false;
});

const toggleMenu = () => {
  if (!user.value) return;
  showMenu.value = !showMenu.value;
};
</script>

<template>
  <div class="user-menu" ref="outside">
    <Motion>
      <div class="burger" :class="{ active: showMenu }" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </Motion>

    <template v-if="showMenu">
      <div class="popup-wrapper">
        <Motion :from="{ y: -20 }" :to="{ y: 0 }">
          <ThePopup>
            <div class="body">
              <router-link :to="{ name: 'claim-history' }" class="item">
                <div class="icon">
                  <img src="@/assets/img/icons/claim.svg" />
                </div>
                <span>Claim history</span>
              </router-link>
            </div>
          </ThePopup>
        </Motion>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.user-menu {
  position: relative;
}

.burger {
  display: grid;
  gap: 4px;
  width: 22px;
  cursor: pointer;

  span {
    width: 100%;
    height: 2px;
    border-radius: 2px;
    background-color: var(--white);
    box-shadow: 0px 0px 8px transparent;
  }

  &:hover,
  &.active {
    span {
      background-color: var(--shadow-yellow);
      box-shadow: 0px 0px 8px var(--shadow-yellow);
    }
  }
}

.popup-wrapper {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 15px;
  z-index: 1;

  font-weight: bold;
}

.body {
  display: grid;
  gap: 15px;
}

.item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 15px;

  &:hover {
    cursor: pointer;
    span {
      text-decoration: underline;
    }
  }

  .icon {
    width: 25px;
    height: 25px;
    display: grid;
    place-items: center;
  }
}
</style>

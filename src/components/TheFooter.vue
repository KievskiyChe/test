<script setup lang="ts"></script>

<template>
  <footer class="footer container">
    <span class="line"></span>

    <div class="social">
      <Motion :from="{ y: 10 }" :to="{ y: 0 }">
        <a href="https://awakeness.gitbook.io/awakeness" target="_blank" class="icon">
          <img src="@/assets/img/social/github.svg" alt="GitHub" />
        </a>
      </Motion>
      <Motion :delay="0.1" :from="{ y: 10 }" :to="{ y: 0 }">
        <a href="https://twitter.com/AwakenessFi" target="_blank" class="icon">
          <img src="@/assets/img/social/twitter.svg" alt="Twitter" />
        </a>
      </Motion>
      <!-- <Motion :delay="0.2" :from="{ y: 10 }" :to="{ y: 0 }">
        <a href="#" class="icon">
          <img src="@/assets/img/social/reddit.svg" alt="Reddit" />
        </a>
      </Motion> -->
      <Motion :delay="0.3" :from="{ y: 10 }" :to="{ y: 0 }">
        <a href="http://discord.gg/Ap9Pt32cvG" target="_blank" class="icon">
          <img src="@/assets/img/social/discord.svg" alt="Discord" />
        </a>
      </Motion>
    </div>

    <span class="line"></span>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  width: 100%;
  height: var(--footer-height);

  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 30px;
  position: relative;
  z-index: 1;
}

.line {
  width: 100%;
  height: 1px;
  background-color: #ffffff40;
}

.social {
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 30px;
  align-items: center;
  justify-content: center;
}

.icon {
  cursor: pointer;
  width: 24px;
  height: 24px;

  img {
    width: 100%;
  }
}
</style>

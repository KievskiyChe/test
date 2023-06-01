<script setup lang="ts"></script>

<template>
  <div class="layer">
    <div class="circle-out"></div>
    <div class="circle-in"></div>
  </div>

  <div class="lines">
    <div class="top-left">
      <Motion :delay="1.2" :from="{ x: -60 }" :to="{ x: 0 }">
        <div class="line"></div>
      </Motion>
      <Motion :delay="1.25" :from="{ x: -100 }" :to="{ x: -60 }">
        <div class="line"></div>
      </Motion>
    </div>

    <div class="top-right">
      <Motion :delay="1.3" :from="{ x: 100 }" :to="{ x: -75 }">
        <div class="line"></div>
      </Motion>
      <Motion :delay="1.35" :from="{ x: 120 }" :to="{ x: -20 }">
        <div class="line"></div>
      </Motion>
    </div>

    <div class="center">
      <div class="line"></div>
      <div class="line"></div>
    </div>

    <div class="bottom-left">
      <Motion :delay="1.4" :from="{ x: -60 }" :to="{ x: 0 }">
        <div class="line"></div>
      </Motion>
      <Motion :delay="1.45" :from="{ x: -100 }" :to="{ x: -60 }">
        <div class="line"></div>
      </Motion>
    </div>

    <div class="bottom-right">
      <Motion :delay="1.5" :from="{ x: 100 }" :to="{ x: -75 }">
        <div class="line"></div>
      </Motion>
      <Motion :delay="1.55" :from="{ x: 120 }" :to="{ x: -20 }">
        <div class="line"></div>
      </Motion>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layer {
  width: 540px;
  height: 540px;
  position: absolute;
}

.lines {
  width: 850px;
  height: 340px;
  position: absolute;
}

.circle-out {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 0px solid var(--accent-400);
  position: relative;

  animation: showOutCircle 1s ease forwards;
  animation-delay: 2.5s;

  &::after {
    content: "";
    position: absolute;
    width: calc(100% + 30px);
    height: calc(100% + 30px);
    border-radius: 50%;
    border: 0px dotted var(--accent-200);
    top: -17px;
    left: -17px;
    animation: showOutCircleDotted 1s ease forwards, spin 100s linear infinite;
    animation-delay: 1.5s;
  }
}

.circle-in {
  width: calc(100% - 60px);
  height: calc(100% - 60px);
  border-radius: 50%;
  border: 1px solid var(--accent-500);
  position: absolute;

  top: 50%;
  left: 50%;
  translate: -50% -50%;

  opacity: 0;
  animation: showInCircle 0.5s ease forwards;
  animation-delay: 1s;

  &::after {
    content: "";
    position: absolute;
    width: calc(100% - 32px);
    height: calc(100% - 32px);
    border-radius: 50%;
    border: 2px dotted var(--accent-200);
    top: 15px;
    left: 15px;
    animation: spin-reverse 120s linear infinite;
  }

  &::before {
    content: "";
    width: 1px;
    height: 0px;
    background: var(--accent-500);
    position: absolute;

    top: 0;
    left: calc(50% - 1px);
    translate: -50% 0;

    opacity: 0;
    animation: showInCircleTopLine 0.5s ease forwards;
    animation-delay: 3s;
  }
}

.top-left,
.top-right,
.bottom-left,
.bottom-right {
  position: absolute;
  display: grid;
  gap: 30px;
}

.top-left {
  top: 0;
  left: 0;
}

.top-right {
  top: 0;
  right: 0;
}

.center {
  position: absolute;
  width: 100%;
  top: 50%;
  display: flex;
  gap: 20px;

  .line {
    opacity: 0;
    position: absolute;
    animation: showCenterLine 1s ease forwards;
    animation-delay: 1s;
  }

  .line:nth-child(1) {
    left: -20px;
  }

  .line:nth-child(2) {
    right: -20px;
  }
}

.bottom-left {
  bottom: 0;
  left: 0;
}

.bottom-right {
  bottom: 0;
  right: 0;
}

.line {
  width: 160px;
  height: 1px;
  background: var(--white-100);
}

.top-left,
.bottom-right {
  rotate: 25deg;
}

.top-right,
.bottom-left {
  rotate: -25deg;
}

.top-left,
.bottom-left {
  .line:nth-child(1) {
    margin-left: 60px;
  }

  .line:nth-child(2) {
    width: 140px;
  }
}

.top-right,
.bottom-right {
  .line:nth-child(2) {
    margin-left: 60px;
  }

  .line:nth-child(1) {
    width: 140px;
  }
}

@keyframes spin {
  from {
    rotate: 0deg;
  }
  to {
    rotate: 360deg;
  }
}

@keyframes spin-reverse {
  from {
    rotate: 0deg;
  }
  to {
    rotate: -360deg;
  }
}

@keyframes showOutCircle {
  0% {
    border-width: 0;
  }

  100% {
    border-width: 12px;
  }
}

@keyframes showOutCircleDotted {
  from {
    opacity: 0;
    border-width: 2px;
  }
  to {
    opacity: 1;
    border-width: 2px;
  }
}

@keyframes showCenterLine {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes showInCircle {
  from {
    opacity: 0;
    scale: 0.75;
  }
  to {
    opacity: 1;
    scale: 1;
  }
}

@keyframes showInCircleTopLine {
  from {
    opacity: 0.2;
    height: 0;
  }
  to {
    opacity: 1;
    height: 50px;
  }
}

@media screen and (max-width: 768px) {
  .layer {
    width: 520px;
    height: 520px;
    top: 0;
  }

  .lines {
    display: none;
  }
}
</style>

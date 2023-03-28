<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { useMotion } from "@vueuse/motion";

interface Props {
  from?: any;
  to?: any;
  visible?: boolean;
  visibleOnce?: boolean;
  transition?: any;
  delay?: number;
  duration?: number;
  levitate?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  delay: 0,
  duration: 0.15,
  visible: false,
  visibleOnce: false,
  levitate: false,
});

const element = ref();

onMounted(() => {
  nextTick(async () => {
    const variantProp = props.visible
      ? "visible"
      : props.visibleOnce
      ? "visibleOnce"
      : "enter";

    const transitionType = {
      type: "spring",
      shiffness: 600,
      damping: 20,
      mass: 0.75,
    };

    const options = {
      ...transitionType,
      ...props.transition,
      delay: props.delay * 1000,
      duration: props.duration * 1000,
    };

    const { variant } = useMotion(element, {
      initial: {
        opacity: 0,
        ...props.from,
      },
      [variantProp]: {
        opacity: 1,
        ...props.to,

        transition: {
          ...transitionType,
          ...props.transition,
          ...options,
          onComplete: () => {
            if (props.levitate) {
              variant.value = "levitate";
            }
          },
        },
      },
      levitate: {
        y: -20,
        transition: {
          duration: 2000,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "mirror",
        },
      },
    });
  });
});
</script>

<template>
  <div ref="element">
    <slot></slot>
  </div>
</template>

<style lang="scss"></style>

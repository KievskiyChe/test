declare module "@vueuse/motion" {
  import { Ref } from "vue-demi";
  export function useMotion(
    target: Ref<HTMLElement>,
    options?: {
      stiffness?: number;
      damping?: number;
      mass?: number;
      precision?: number;
      initial?: boolean;
      levitate?: any;
    }
  ): {
    x: Ref<number>;
    y: Ref<number>;
    vx: Ref<number>;
    vy: Ref<number>;
    initial: () => void;
    set: (x: number, y: number) => void;
    stop: () => void;
    variant: any;
  };
}

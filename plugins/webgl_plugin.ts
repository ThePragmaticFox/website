import * as Po from "./webgl/particle_optimization";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      Po: Po,
    },
  };
});

<template>
  <div>
    <canvas class="format-canvas-rendering" id="glCanvas">
      Your browser does not seem to support HTML5 canvas.
    </canvas>
    <div class="format-div-fps">
      FPS: {{ (1.0 / context.deltaMean).toFixed(0) }}
    </div>
    <div class="format-div-slider">
      #particles: {{ context.vSize }}<br />
      <input
        type="range"
        value="3"
        min="0"
        max="7"
        class="format-input-type-slider"
        id="particle_slider"
        list="particle_slider_tickmarks"
      />
    </div>
    <div class="format-div-title">Particle Optimization</div>
  </div>
</template>

<script setup lang="ts">
const { $Po } = useNuxtApp();
</script>

<script lang="ts">
const vSize = 50000;
export default {
  data() {
    return {
      gl: <any> null,
      context: <any>{
        timeAnchor_ms: <number>Date.now(),
        then_ms: <number>0.0,
        now_ms: <number>0.0,
        deltaMean: <number>1.0,
        deltaArr: <Array<number>>[],
        deltaSize: <number>1000,
        vSize: <number>vSize,
        vertices: new Float32Array(3 * vSize),
        hasBeenFilled: <Boolean>false,
      },
    };
  },
  async mounted() {
    const canvas = document.querySelector("#glCanvas");
    if (!(canvas instanceof HTMLCanvasElement)) {
      return;
    }
    const gl: null | WebGL2RenderingContext = canvas.getContext("webgl2");
    if (gl == null || !gl) {
      alert(
        "Failed to get WebGL context. Your browser or device may not support WebGL."
      );
      return;
    }
    this.gl = gl;
    await this.$Po.create(gl);
    this.renderLoop();
    await this.$Po.destroy(gl);
  },
  methods: {
    async renderLoop() {
      const timer = setTimeout(this.renderLoop, 1000 / 120);
      const particleSliderDOM: HTMLInputElement = <HTMLInputElement>(
        document.getElementById("particle_slider")
      );
      this.context.vSize = Math.pow(10, Number(particleSliderDOM.value));
      this.$Po.render(this.gl, this.context).then((isOk) => {
        if (!isOk) {
          clearTimeout(timer);
        }
      });
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
}

body {
  height: 100vh;
  width: 100vw;
}

.format-canvas-rendering {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.format-div-title {
  position: absolute;
  left: 3%;
  top: 5%;
  font-size: 2vw;
  z-index: 100;
  color: white;
}

.format-div-fps {
  position: absolute;
  left: 3%;
  top: 10%;
  font-size: 2vw;
  z-index: 100;
  color: white;
}

.format-div-slider {
  position: absolute;
  left: 3%;
  bottom: 5%;
  font-size: 1vw;
  z-index: 100;
  color: white;
}

.format-input-type-slider {
  position: fixed;
  left: 3%;
  bottom: 3%;
}

.format-input-type-slider:hover {
  opacity: 1;
}

.format-input-type-slider::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  background: #04aa6d; /* Green background */
  cursor: pointer; /* Cursor on hover */
}

.format-input-type-slider::-moz-range-thumb {
  background: #04aa6d; /* Green background */
  cursor: pointer; /* Cursor on hover */
}
</style>

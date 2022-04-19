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
        max="6"
        class="format-input-type-slider"
        id="particle_slider"
        list="particle_slider_tickmarks"
      />
    </div>
    <div class="format-div-title">Particle Optimization</div>
  </div>
</template>

<script setup lang="ts">
const { $render_particle_optimization } = useNuxtApp();
</script>

<script lang="ts">
const vSize = 50000;
export default {
  data() {
    return {
      context: {
        gl: null,
        vertexShader: null,
        vertexShaderSrc: null,
        fragmentShader: null,
        fragmentShaderSrc: null,
        buffer: null,
        program: null,
        timeAnchor_ms: Date.now(),
        then_ms: 0.0,
        now_ms: 0.0,
        deltaMean: 1.0,
        deltaArr: [],
        deltaSize: 1000,
        vSize: vSize,
        vertices: new Float32Array(3 * vSize),
        hasBeenFilled: false,
      },
    };
  },
  mounted() {
    const canvas = document.querySelector("#glCanvas");
    if (canvas instanceof HTMLCanvasElement) {
      this.context.gl = canvas.getContext("webgl2");
    }
    if (!this.context.gl) {
      alert(
        "Failed to get WebGL context. Your browser or device may not support WebGL."
      );
      return;
    }
    this.renderLoop();
  },
  methods: {
    renderLoop() {
      setTimeout(this.renderLoop, 1000 / 60);
      this.context.vSize = Math.pow(
        10,
        document.getElementById("particle_slider").value
      );
      this.$render_particle_optimization(this.context);
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

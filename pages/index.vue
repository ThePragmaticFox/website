<template>
  <canvas class="format-canvas-rendering" id="glCanvas">
    Your browser does not seem to support HTML5 canvas.
  </canvas>
  <div class="format-div-fps">
    fps: {{ (1.0 / context.deltaMean).toFixed(0) }}
  </div>
</template>

<script setup lang="ts">
const { $render } = useNuxtApp();
</script>

<script lang="ts">
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
        verticesArr: [],
        verticesSize: 100000,
        isVerticesArrInitiated: false
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
     /*
    this.context.gl.viewport(
      0,
      0,
      this.context.gl.canvas.width,
      this.context.gl.canvas.height
    );
    */
    this.renderLoop();
  },
  methods: {
    renderLoop() {
      setTimeout(this.renderLoop, 1000 / 60);
      this.$render(this.context);
    },
  },
};
</script>

<style>
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

.format-div-fps {
  left: 0;
  top: 0;
  font-size: 2vw;
  z-index: 100;
  color: white;
}
</style>
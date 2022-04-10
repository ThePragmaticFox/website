<template>
  <section class="section">
    <div class="hero is-fullheight">
      <div class="hero-head"></div>
      <canvas id="canvas" ref="canvas">
        Your browser does not seem to support HTML5 canvas.
      </canvas>
    </div>
  </section>
</template>

<script setup>
const start = Date.now();
</script>

<script>
function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

function getHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
}

export default {
  data() {
    return {
      gl: undefined,
      vertexShaderCode: `
        #version 100
        uniform float u_time;
        void main() {
          float x = sin(u_time)/5.0;
          float y = cos(u_time)/5.0;
          gl_Position = vec4(x, y, 0.0, 1.0);
          gl_PointSize = 100.0;
        }
      `,
      vertexShader: undefined,
      fragmentShaderCode: `
        #version 100
        void main() {
          gl_FragColor = vec4(0.88, 0.54, 0.34, 1.0);
        }
      `,
      fragmentShader: undefined,
      program: undefined,
      buffer: undefined,
    };
  },
  mounted() {
    console.log(this.$refs.canvas.clientWidth);
    this.$refs.canvas.width = (98.0 / 100.0) * getWidth();
    this.$refs.canvas.height = (98.0 / 100.0) * getHeight();

    this.gl =
      this.$refs.canvas.getContext("webgl") ||
      this.$refs.canvas.getContext("experimental-webgl");

    if (!this.gl) {
      alert(
        "Failed to get WebGL context. Your browser or device may not support WebGL."
      );
    } else {
      this.gl.viewport(
        0,
        0,
        this.gl.drawingBufferWidth,
        this.gl.drawingBufferHeight
      );
      this.renderLoop();
    }
  },
  methods: {
    render() {
      // Set the WebGLRenderingContext clear color to the random color.
      this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
      // Clear the context with the newly set color.
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);

      // set up shaders and program
      this.setupVertexShader();
      this.setupFragmentShader();
      this.setupProgram();
    },
    renderLoop() {
      this.render();
      setInterval(this.renderLoop, 1000 / 60);
    },
    setupVertexShader() {
      // vertex shader handles geometry
      this.vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
      this.gl.shaderSource(this.vertexShader, this.vertexShaderCode);
      this.gl.compileShader(this.vertexShader);
    },
    setupFragmentShader() {
      // fragment shader handles color
      this.fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
      this.gl.shaderSource(this.fragmentShader, this.fragmentShaderCode);
      this.gl.compileShader(this.fragmentShader);
    },
    setupProgram() {
      this.program = this.gl.createProgram();

      const millis = Date.now() - this.start;
  

      this.gl.attachShader(this.program, this.vertexShader);
      this.gl.attachShader(this.program, this.fragmentShader);
      this.gl.linkProgram(this.program);

      var timeLoc = this.gl.getUniformLocation(this.program, "u_time");

      this.gl.detachShader(this.program, this.vertexShader);
      this.gl.detachShader(this.program, this.fragmentShader);
      this.gl.deleteShader(this.vertexShader);
      this.gl.deleteShader(this.fragmentShader);

      if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
        const linkErrLog = this.gl.getProgramInfoLog(this.program);

        this.cleanup();

        console.error(
          "Shader program did not link successfully. " +
            "Error log: " +
            linkErrLog
        );
        return;
      }

      this.initializeAttributes();

      this.gl.useProgram(this.program);
      this.gl.uniform1f(timeLoc, millis);
      this.gl.drawArrays(this.gl.POINTS, 0, 1);

      this.cleanup();
    },
    initializeAttributes() {
      this.gl.enableVertexAttribArray(0);
      this.buffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
      this.gl.vertexAttribPointer(0, 1, this.gl.FLOAT, false, 0, 0);
    },
    cleanup() {
      this.gl.useProgram(null);
      if (this.buffer) this.gl.deleteBuffer(this.buffer);
      if (this.program) this.gl.deleteProgram(this.program);
    },
  },
};
</script>

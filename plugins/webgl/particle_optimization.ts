import * as M4 from "./m4";
import * as Mu from "./mu";
import * as Wgl from "./wgl";

const pName: String = "particle_optimization";
const pVSrcFile: String = "/shaders/" + pName + ".vert";
const pFSrcFile: String = "/shaders/" + pName + ".frag";
const programMap: Map<String, WebGLProgram | null> = new Map();
var VBO: null | WebGLBuffer;

export async function create(gl: WebGL2RenderingContext): Promise<Boolean> {
  const program = await Wgl.createProgram(
    gl,
    pName,
    <RequestInfo>pVSrcFile,
    <RequestInfo>pFSrcFile
  );
  programMap.set(pName, program);
  if (program == undefined || program == null) {
    return false;
  }
  return true;
}

export function destroy(gl: WebGL2RenderingContext) {
  const program = programMap.get(pName);
  if (program == undefined || program == null) {
    return;
  }
  Wgl.deleteShader(gl, program, pVSrcFile);
  Wgl.deleteShader(gl, program, pFSrcFile);
}

function fillVertices(ctx: any) {
  if (3 * ctx.vSize != ctx.vertices.length) {
    ctx.vertices = new Float32Array(3 * ctx.vSize);
    ctx.hasBeenFilled = false;
  }
  if (ctx.hasBeenFilled) {
    return;
  }
  ctx.hasBeenFilled = true;
  const vSizeFixed = ctx.vertices.length / 3;
  const delta = 1.0 / vSizeFixed;
  for (let i = 0; i < vSizeFixed; i++) {
    let sign = 1.0;
    if (i % 2 == 1) {
      sign = -1.0;
    }
    ctx.vertices[3 * i + 0] = delta * i;
    ctx.vertices[3 * i + 1] = delta * i;
    ctx.vertices[3 * i + 2] = sign;
  }
}

export async function render(
  gl: WebGL2RenderingContext,
  ctx: any
): Promise<Boolean> {
  const program = programMap.get(pName);
  if (program == undefined || program == null) {
    return false;
  }

  const hasBeenFilled = 3 * ctx.vSize == ctx.vertices.length;

  fillVertices(ctx);
  Mu.udpateDelta(ctx);
  Mu.resizeCanvasToDisplaySize(gl);

  const coord = gl.getAttribLocation(program, "vertex_coord");
  const timeLoc = gl.getUniformLocation(program, "u_time");
  const deltaLoc = gl.getUniformLocation(program, "u_delta");
  const cameraMatrixLoc = gl.getUniformLocation(program, "u_camera");

  const translation = [0.0, 0.0, -20.0];
  const rotation = [0.0, 0.0, 0.0];
  const scale = [1.0, 1.0, 1.0];

  const fovDeg = 5.0;
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const near = 1.0;
  const far = 1000.0;
  var perspective: M4.mat4fv = M4.getPerspectiveDeg(fovDeg, aspect, near, far);
  perspective = M4.translate(
    perspective,
    translation[0],
    translation[1],
    translation[2]
  );
  perspective = M4.rotateXDeg(perspective, rotation[0]);
  perspective = M4.rotateYDeg(perspective, rotation[1]);
  perspective = M4.rotateZDeg(perspective, rotation[2]);
  perspective = M4.scale(perspective, scale[0], scale[1], scale[2]);

  if (!hasBeenFilled || VBO == undefined || VBO == null) {
    VBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
    gl.bufferData(gl.ARRAY_BUFFER, ctx.vertices, gl.STREAM_DRAW);
  }

  gl.useProgram(program);

  gl.uniform1f(timeLoc, ctx.now_ms);
  gl.uniform1f(deltaLoc, ctx.deltaMean);
  gl.uniformMatrix4fv(cameraMatrixLoc, false, perspective);
  gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(coord);

  /*============= Drawing the primitive ===============*/

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.drawArrays(gl.POINTS, 0, ctx.vSize);
  return true;
}

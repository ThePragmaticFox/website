import * as help from "./helper";

const shaderMap = new Map();
const shaderSourceMap = new Map();
const programMap = new Map();

export function getShader(shaderSource: String): String {
  return shaderMap.get(shaderSource);
}

export function getProgram(name: String): WebGLProgram {
  return programMap.get(name);
}

export async function createShader(
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
  srcFile: RequestInfo,
  shaderType: GLenum
): Promise<WebGLShader> {
  var shader = shaderMap.get(srcFile);
  if (shader != undefined && shader != null) {
    return shader;
  }
  shader = gl.createShader(shaderType);
  let src: string = shaderSourceMap.get(srcFile);
  while (src == undefined || src == null || src == "null") {
    src = <string> await help.getSourceSynch(srcFile);
  }
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  gl.attachShader(program, shader);
  shaderSourceMap.set(srcFile, src);
  shaderMap.set(srcFile, shader);
  return shader;
}

export function deleteShader(
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
  srcFile: String
) {
  const shader = shaderMap.get(srcFile);
  if (shader != undefined && shader != null) {
    gl.detachShader(program, shader);
    gl.deleteShader(shader);
    shaderMap.delete(srcFile);
  }
}

export async function createProgram(
  gl: WebGL2RenderingContext,
  name: String,
  vSrcFile: RequestInfo,
  fSrcFile: RequestInfo
): Promise<null | WebGLProgram> {
  var program = programMap.get(name);
  if (program == undefined || program == null) {
    program = gl.createProgram();
  }
  programMap.set(name, program);
  await createShader(gl, program, vSrcFile, gl.VERTEX_SHADER);
  await createShader(gl, program, fSrcFile, gl.FRAGMENT_SHADER);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const linkErrLog = gl.getProgramInfoLog(program);
    console.error(
      "Shader program did not link successfully. " + "Error log: " + linkErrLog
    );
    return null;
  }
  return program;
}

export function closeProgram(
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
  vSrcFile: String,
  fSrcFile: String
) {
  deleteShader(gl, program, vSrcFile);
  deleteShader(gl, program, fSrcFile);
}

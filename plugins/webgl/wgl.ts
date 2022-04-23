import * as help from "./helper";

const shaderMap = new Map();
const shaderSourceMap = new Map();
const programMap = new Map();

export function getShader(shaderSource) {
  return shaderMap.get(shaderSource);
}

export function getProgram(name) {
  return programMap.get(name);
}

export async function createShader(gl, program, srcFile, shaderType) {
  var shader = shaderMap.get(srcFile);
  if (shader != undefined && shader != null) {
    return shader;
  }
  shader = gl.createShader(shaderType);
  var src = shaderSourceMap.get(srcFile);
  while (src == undefined || src == null) {
    src = await help.getSourceSynch(srcFile);
  }
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  gl.attachShader(program, shader);
  shaderSourceMap.set(srcFile, src);
  shaderMap.set(srcFile, shader);
  return shader;
}

export function deleteShader(gl, program, srcFile) {
  const shader = shaderMap.get(srcFile);
  if (shader != undefined && shader != null) {
    gl.detachShader(program, shader);
    gl.deleteShader(shader);
    shaderMap.delete(srcFile);
  }
}

export async function createProgram(gl, name, vSrcFile, fSrcFile) {
  var program = programMap.get(name);
  if (program == undefined || program == null) {
    program = gl.createProgram();
  }
  programMap.set(name, program);
  await this.createShader(gl, program, vSrcFile, gl.VERTEX_SHADER);
  await this.createShader(gl, program, fSrcFile, gl.FRAGMENT_SHADER);
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

export async function closeProgram(gl, program, vSrcFile, fSrcFile) {
  this.deleteShader(gl, program, vSrcFile);
  this.deleteShader(gl, program, fSrcFile);
}

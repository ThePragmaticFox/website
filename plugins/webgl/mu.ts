function getDelta(ctx) {
  const time = Date.now();
  const next_ms = time - ctx.timeAnchor_ms;
  ctx.then_ms = ctx.now_ms;
  ctx.now_ms = next_ms;
  const delta_ms = ctx.now_ms - ctx.then_ms;
  const delta = delta_ms / 1000.0;
  return delta;
}

export function udpateDelta(ctx) {
  const delta = getDelta(ctx);
  if (ctx.deltaArr.length > ctx.deltaSize) {
    ctx.deltaArr.push(delta);
    const oldDelta = ctx.deltaArr.shift();
    ctx.deltaMean = ctx.deltaMean + (delta - oldDelta) / ctx.deltaSize;
  } else if (ctx.deltaArr.length == ctx.deltaSize - 1) {
    ctx.deltaArr.push(delta);
    const sum = ctx.deltaArr.reduce((left, right) => left + right, 0.0);
    ctx.deltaMean = sum / ctx.deltaSize;
  } else {
    ctx.deltaArr.push(delta);
    const sum = ctx.deltaArr.reduce((left, right) => left + right, 0.0);
    ctx.deltaMean = sum / ctx.deltaArr.length;
  }
}

export function resizeCanvasToDisplaySize(gl) {
  gl.canvas.width = Math.min(1920, gl.canvas.clientWidth);
  gl.canvas.height = Math.min(1080, gl.canvas.clientHeight);
}

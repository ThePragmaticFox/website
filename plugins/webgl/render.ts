import * as M4 from "./m4.js"

function getDelta(ctx) {
    const time = Date.now();
    const next_ms = time - ctx.timeAnchor_ms;
    ctx.then_ms = ctx.now_ms;
    ctx.now_ms = next_ms;
    const delta_ms = ctx.now_ms - ctx.then_ms;
    const delta = delta_ms / 1000.0;
    return delta;
}

function udpateDelta(ctx) {
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

function getSourceSynch(url) {
    var req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.send(null);
    return (req.status == 200) ? req.responseText : null;
};

function resizeCanvasToDisplaySize(ctx) {
    ctx.gl.canvas.width = ctx.gl.canvas.clientWidth;
    ctx.gl.canvas.height = ctx.gl.canvas.clientHeight;
}

function getVertices(vertices, vSize) {
    if (vertices.length != 0) {
        return vertices;
    }
    const vSizeF = parseFloat(vSize);
    const delta = 1.0 / vSizeF;
    for (let i = 0; i < vSize; i++) {
        let sign = 1.0;
        if (i % 2 == 1) {
            sign = -1.0;
        }
        vertices.push(delta * i);
        vertices.push(delta * i);
        vertices.push(sign);
    }
    return vertices;
} 

export function render(ctx) {

    var vertices = [];
    const vSize = 100000;
    vertices = getVertices(vertices, vSize);

    udpateDelta(ctx);
    resizeCanvasToDisplaySize(ctx);

    if (ctx.vertexShaderSrc == null) {
        ctx.vertexShaderSrc = getSourceSynch("/shaders/shader_1.vert");
    }
    if (ctx.fragmentShaderSrc == null) {
        ctx.fragmentShaderSrc = getSourceSynch("/shaders/shader_1.frag");
    }

    ctx.program = ctx.gl.createProgram();

    ctx.vertexShader = ctx.gl.createShader(ctx.gl.VERTEX_SHADER);
    ctx.gl.shaderSource(ctx.vertexShader, ctx.vertexShaderSrc);
    ctx.gl.compileShader(ctx.vertexShader);
    ctx.gl.attachShader(ctx.program, ctx.vertexShader);

    ctx.fragmentShader = ctx.gl.createShader(ctx.gl.FRAGMENT_SHADER);
    ctx.gl.shaderSource(ctx.fragmentShader, ctx.fragmentShaderSrc);
    ctx.gl.compileShader(ctx.fragmentShader);
    ctx.gl.attachShader(ctx.program, ctx.fragmentShader);

    ctx.gl.linkProgram(ctx.program);

    const timeLoc = ctx.gl.getUniformLocation(ctx.program, 'u_time');
    const deltaLoc = ctx.gl.getUniformLocation(ctx.program, 'u_delta');
    const cameraMatrixLoc = ctx.gl.getUniformLocation(ctx.program, 'u_camera');

    ctx.gl.detachShader(ctx.program, ctx.vertexShader);
    ctx.gl.detachShader(ctx.program, ctx.fragmentShader);
    ctx.gl.deleteShader(ctx.vertexShader);
    ctx.gl.deleteShader(ctx.fragmentShader);

    if (!ctx.gl.getProgramParameter(ctx.program, ctx.gl.LINK_STATUS)) {
        const linkErrLog = ctx.gl.getProgramInfoLog(ctx.program);
        console.error(
            "Shader program did not link successfully. " +
            "Error log: " +
            linkErrLog
        );
        return;
    }

    const translation = [0.0, 0.0, -20.0];
    const rotation = [0.0, 0.0, 0.0];
    const scale = [1.0, 1.0, 1.0];

    const fovDeg = 6.0;
    const aspect = ctx.gl.canvas.clientWidth / ctx.gl.canvas.clientHeight;
    const near = 1.0;
    const far = 1000.0;
    var perspective = M4.getPerspectiveDeg(fovDeg, aspect, near, far);
    perspective = M4.translate(perspective, translation[0], translation[1], translation[2]);
    perspective = M4.rotateXDeg(perspective, rotation[0]);
    perspective = M4.rotateYDeg(perspective, rotation[1]);
    perspective = M4.rotateZDeg(perspective, rotation[2]);
    perspective = M4.scale(perspective, scale[0], scale[1], scale[2]);

    // Create an empty buffer object to store the vertex buffer
    const vertex_buffer = ctx.gl.createBuffer();

    //Bind appropriate array buffer to it
    ctx.gl.bindBuffer(ctx.gl.ARRAY_BUFFER, vertex_buffer);

    // Pass the vertex data to the buffer
    ctx.gl.bufferData(ctx.gl.ARRAY_BUFFER, new Float32Array(vertices), ctx.gl.STATIC_DRAW);

    // Unbind the buffer
    ctx.gl.bindBuffer(ctx.gl.ARRAY_BUFFER, null);

    // Use the combined shader program object
    ctx.gl.useProgram(ctx.program);

    ctx.gl.uniform1f(timeLoc, ctx.now_ms);
    ctx.gl.uniform1f(deltaLoc, ctx.deltaMean);
    ctx.gl.uniformMatrix4fv(cameraMatrixLoc, false, perspective);

    // Bind vertex buffer object
    ctx.gl.bindBuffer(ctx.gl.ARRAY_BUFFER, vertex_buffer);

    // Get the attribute location
    const coord = ctx.gl.getAttribLocation(ctx.program, "vertex_coord");

    // Point an attribute to the currently bound VBO
    ctx.gl.vertexAttribPointer(coord, 3, ctx.gl.FLOAT, false, 0, 0);

    // Enable the attribute
    ctx.gl.enableVertexAttribArray(coord);

    /*============= Drawing the primitive ===============*/

    // Clear the canvas
    ctx.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // Enable the depth test
    ctx.gl.enable(ctx.gl.DEPTH_TEST);

    // Clear the color buffer bit
    ctx.gl.clear(ctx.gl.COLOR_BUFFER_BIT);

    // Set the view port
    ctx.gl.viewport(0, 0, ctx.gl.drawingBufferWidth, ctx.gl.drawingBufferHeight);

    // Draw the triangle
    ctx.gl.drawArrays(ctx.gl.POINTS, 0, vSize);

    ctx.gl.useProgram(null);
    if (ctx.buffer) {
        ctx.gl.deleteBuffer(ctx.buffer);
    }
    if (ctx.program) {
        ctx.gl.deleteProgram(ctx.program);
    }
}

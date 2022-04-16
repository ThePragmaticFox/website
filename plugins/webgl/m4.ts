export function degToRad(angle) {
    return angle * Math.PI / 180.0;
}

export function radToDeg(angle) {
    return angle * 180.0 / Math.PI;
}

export function getPerspectiveDeg(fov, aspect, near, far) {
    return getPerspectiveRad(degToRad(fov), aspect, near, far);
}

export function getPerspectiveRad(fov, aspect, near, far) {
    const f = Math.tan(Math.PI * 0.5 - 0.5 * fov);
    const rangeInv = 1.0 / (near - far);
    const perspective = [
        f / aspect, 0.0, 0.0, 0.0,
        0.0, f, 0.0, 0.0,
        0.0, 0.0, (near + far) * rangeInv, -1.0,
        0.0, 0.0, near * far * rangeInv * 2.0, 0.0
    ];
    return perspective;
}

export function getProjection(width, height, depth) {
    const projection = [
        2.0 / width, 0.0, 0.0, 0.0,
        0.0, -2.0 / height, 0.0, 0.0,
        0.0, 0.0, 2.0 / depth, 0.0, 0.0,
        -1.0, 1.0, 0.0, 1.0
    ];
    return projection;
}

export function translate(m, tx, ty, tz) {
    const t = translation(tx, ty, tz);
    const mt = multiply(m, t);
    return mt;
}

export function scale(m, sx, sy, sz) {
    const s = scaling(sx, sy, sz);
    const ms = multiply(m, s);
    return ms;
}

export function rotateXDeg(m, angle) {
    const r = rotationXDeg(angle);
    const mr = multiply(m, r);
    return mr;
}

export function rotateXRad(m, angle) {
    const r = rotationXRad(angle);
    const mr = multiply(m, r);
    return mr;
}

export function rotateYDeg(m, angle) {
    const r = rotationYDeg(angle);
    const mr = multiply(m, r);
    return mr;
}

export function rotateYRad(m, angle) {
    const r = rotationYRad(angle);
    const mr = multiply(m, r);
    return mr;
}

export function rotateZDeg(m, angle) {
    const r = rotationZDeg(angle);
    const mr = multiply(m, r);
    return mr;
}

export function rotateZRad(m, angle) {
    const r = rotationZRad(angle);
    const mr = multiply(m, r);
    return mr;
}

export function translation(tx, ty, tz) {
    const t = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        tx, ty, tz, 1.0
    ];
    return t;
}

export function scaling(sx, sy, sz) {
    const s = [
        sx, 0.0, 0.0, 0.0,
        0.0, sy, 0.0, 0.0,
        0.0, 0.0, sz, 0.0,
        0.0, 0.0, 0.0, 1.0
    ];
    return s;
}

export function rotationXDeg(angle) {
    return rotationXRad(degToRad(angle));
}

export function rotationXRad(angle) {
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    const r = [
        1.0, 0.0, 0.0, 0.0,
        0.0, c, s, 0.0,
        0.0, -s, c, 0.0,
        0.0, 0.0, 0.0, 1.0,
    ];
    return r;
}

export function rotationYDeg(angle) {
    return rotationYRad(degToRad(angle));
}

export function rotationYRad(angle) {
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    const r = [
        c, 0.0, -s, 0.0,
        0.0, 1.0, 0.0, 0.0,
        s, 0.0, c, 0.0,
        0.0, 0.0, 0.0, 1.0,
    ];
    return r;
}

export function rotationZDeg(angle) {
    return rotationZRad(degToRad(angle));
}

export function rotationZRad(angle) {
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    const r = [
        c, s, 0.0, 0.0,
        -s, c, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0,
    ];
    return r;
}

export function multiply(a, b) {
    const a00 = a[0 * 4 + 0];
    const a01 = a[0 * 4 + 1];
    const a02 = a[0 * 4 + 2];
    const a03 = a[0 * 4 + 3];
    const a10 = a[1 * 4 + 0];
    const a11 = a[1 * 4 + 1];
    const a12 = a[1 * 4 + 2];
    const a13 = a[1 * 4 + 3];
    const a20 = a[2 * 4 + 0];
    const a21 = a[2 * 4 + 1];
    const a22 = a[2 * 4 + 2];
    const a23 = a[2 * 4 + 3];
    const a30 = a[3 * 4 + 0];
    const a31 = a[3 * 4 + 1];
    const a32 = a[3 * 4 + 2];
    const a33 = a[3 * 4 + 3];

    const b00 = b[0 * 4 + 0];
    const b01 = b[0 * 4 + 1];
    const b02 = b[0 * 4 + 2];
    const b03 = b[0 * 4 + 3];
    const b10 = b[1 * 4 + 0];
    const b11 = b[1 * 4 + 1];
    const b12 = b[1 * 4 + 2];
    const b13 = b[1 * 4 + 3];
    const b20 = b[2 * 4 + 0];
    const b21 = b[2 * 4 + 1];
    const b22 = b[2 * 4 + 2];
    const b23 = b[2 * 4 + 3];
    const b30 = b[3 * 4 + 0];
    const b31 = b[3 * 4 + 1];
    const b32 = b[3 * 4 + 2];
    const b33 = b[3 * 4 + 3];

    const c00 = a00 * b00 + a10 * b01 + a20 * b02 + a30 * b03;
    const c01 = a01 * b00 + a11 * b01 + a21 * b02 + a31 * b03;
    const c02 = a02 * b00 + a12 * b01 + a22 * b02 + a32 * b03;
    const c03 = a03 * b00 + a13 * b01 + a23 * b02 + a33 * b03;

    const c10 = a00 * b10 + a10 * b11 + a20 * b12 + a30 * b13;
    const c11 = a01 * b10 + a11 * b11 + a21 * b12 + a31 * b13;
    const c12 = a02 * b10 + a12 * b11 + a22 * b12 + a32 * b13;
    const c13 = a03 * b10 + a13 * b11 + a23 * b12 + a33 * b13;

    const c20 = a00 * b20 + a10 * b21 + a20 * b22 + a30 * b23;
    const c21 = a01 * b20 + a11 * b21 + a21 * b22 + a31 * b23;
    const c22 = a02 * b20 + a12 * b21 + a22 * b22 + a32 * b23;
    const c23 = a03 * b20 + a13 * b21 + a23 * b22 + a33 * b23;

    const c30 = a00 * b30 + a10 * b31 + a20 * b32 + a30 * b33;
    const c31 = a01 * b30 + a11 * b31 + a21 * b32 + a31 * b33;
    const c32 = a02 * b30 + a12 * b31 + a22 * b32 + a32 * b33;
    const c33 = a03 * b30 + a13 * b31 + a23 * b32 + a33 * b33;

    const c = [
        c00, c01, c02, c03,
        c10, c11, c12, c13,
        c20, c21, c22, c23,
        c30, c31, c32, c33
    ];

    return c;
}

export function add(a, b) {
    const a00 = a[0 * 4 + 0];
    const a01 = a[0 * 4 + 1];
    const a02 = a[0 * 4 + 2];
    const a03 = a[0 * 4 + 3];
    const a10 = a[1 * 4 + 0];
    const a11 = a[1 * 4 + 1];
    const a12 = a[1 * 4 + 2];
    const a13 = a[1 * 4 + 3];
    const a20 = a[2 * 4 + 0];
    const a21 = a[2 * 4 + 1];
    const a22 = a[2 * 4 + 2];
    const a23 = a[2 * 4 + 3];
    const a30 = a[3 * 4 + 0];
    const a31 = a[3 * 4 + 1];
    const a32 = a[3 * 4 + 2];
    const a33 = a[3 * 4 + 3];

    const b00 = b[0 * 4 + 0];
    const b01 = b[0 * 4 + 1];
    const b02 = b[0 * 4 + 2];
    const b03 = b[0 * 4 + 3];
    const b10 = b[1 * 4 + 0];
    const b11 = b[1 * 4 + 1];
    const b12 = b[1 * 4 + 2];
    const b13 = b[1 * 4 + 3];
    const b20 = b[2 * 4 + 0];
    const b21 = b[2 * 4 + 1];
    const b22 = b[2 * 4 + 2];
    const b23 = b[2 * 4 + 3];
    const b30 = b[3 * 4 + 0];
    const b31 = b[3 * 4 + 1];
    const b32 = b[3 * 4 + 2];
    const b33 = b[3 * 4 + 3];

    const c00 = a00 + b00;
    const c01 = a01 + b01;
    const c02 = a02 + b02;
    const c03 = a03 + b03;
    const c10 = a10 + b10;
    const c11 = a11 + b11;
    const c12 = a12 + b12;
    const c13 = a13 + b13;
    const c20 = a20 + b20;
    const c21 = a21 + b21;
    const c22 = a22 + b22;
    const c23 = a23 + b23;
    const c30 = a30 + b30;
    const c31 = a31 + b31;
    const c32 = a32 + b32;
    const c33 = a33 + b33;

    const c = [
        c00, c01, c02, c03,
        c10, c11, c12, c13,
        c20, c21, c22, c23,
        c30, c31, c32, c33
    ];

    return c;
}
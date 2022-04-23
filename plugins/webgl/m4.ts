export type mat4fv = Float32List;

export function degToRad(angle: number): number {
    return angle * Math.PI / 180.0;
}

export function radToDeg(angle: number): number {
    return angle * 180.0 / Math.PI;
}

export function getPerspectiveDeg(fov: number, aspect: number, near: number, far: number): mat4fv {
    return getPerspectiveRad(degToRad(fov), aspect, near, far);
}

export function getPerspectiveRad(fov: number, aspect: number, near: number, far: number): mat4fv {
    const f: number = Math.tan(Math.PI * 0.5 - 0.5 * fov);
    const rangeInv: number = 1.0 / (near - far);
    const perspective: mat4fv = [
        f / aspect, 0.0, 0.0, 0.0,
        0.0, f, 0.0, 0.0,
        0.0, 0.0, (near + far) * rangeInv, -1.0,
        0.0, 0.0, near * far * rangeInv * 2.0, 0.0
    ];
    return perspective;
}

export function getProjection(width: number, height: number, depth: number): mat4fv {
    const projection: mat4fv = [
        2.0 / width, 0.0, 0.0, 0.0,
        0.0, -2.0 / height, 0.0, 0.0,
        0.0, 0.0, 2.0 / depth, 0.0,
        -1.0, 1.0, 0.0, 1.0
    ];
    return projection;
}

export function translate(m: mat4fv, tx: number, ty: number, tz: number): mat4fv {
    const t: mat4fv = translation(tx, ty, tz);
    const mt: mat4fv = multiply(m, t);
    return mt;
}

export function scale(m: mat4fv, sx: number, sy: number, sz: number): mat4fv {
    const s: mat4fv = scaling(sx, sy, sz);
    const ms: mat4fv = multiply(m, s);
    return ms;
}

export function rotateXDeg(m: mat4fv, angle: number): mat4fv {
    const r: mat4fv = rotationXDeg(angle);
    const mr: mat4fv = multiply(m, r);
    return mr;
}

export function rotateXRad(m: mat4fv, angle: number): mat4fv {
    const r: mat4fv = rotationXRad(angle);
    const mr: mat4fv = multiply(m, r);
    return mr;
}

export function rotateYDeg(m: mat4fv, angle: number): mat4fv {
    const r: mat4fv = rotationYDeg(angle);
    const mr: mat4fv = multiply(m, r);
    return mr;
}

export function rotateYRad(m: mat4fv, angle: number): mat4fv {
    const r: mat4fv = rotationYRad(angle);
    const mr: mat4fv = multiply(m, r);
    return mr;
}

export function rotateZDeg(m: mat4fv, angle: number): mat4fv {
    const r: mat4fv = rotationZDeg(angle);
    const mr: mat4fv = multiply(m, r);
    return mr;
}

export function rotateZRad(m: mat4fv, angle: number): mat4fv {
    const r: mat4fv = rotationZRad(angle);
    const mr: mat4fv = multiply(m, r);
    return mr;
}

export function translation(tx: number, ty: number, tz: number): mat4fv {
    const t: mat4fv = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        tx, ty, tz, 1.0
    ];
    return t;
}

export function scaling(sx: number, sy: number, sz: number): mat4fv {
    const s: mat4fv = [
        sx, 0.0, 0.0, 0.0,
        0.0, sy, 0.0, 0.0,
        0.0, 0.0, sz, 0.0,
        0.0, 0.0, 0.0, 1.0
    ];
    return s;
}

export function rotationXDeg(angle: number): mat4fv {
    return rotationXRad(degToRad(angle));
}

export function rotationXRad(angle: number): mat4fv {
    const s: number = Math.sin(angle);
    const c: number = Math.cos(angle);
    const r: mat4fv = [
        1.0, 0.0, 0.0, 0.0,
        0.0, c, s, 0.0,
        0.0, -s, c, 0.0,
        0.0, 0.0, 0.0, 1.0,
    ];
    return r;
}

export function rotationYDeg(angle: number): mat4fv {
    return rotationYRad(degToRad(angle));
}

export function rotationYRad(angle: number): mat4fv {
    const s: number = Math.sin(angle);
    const c: number = Math.cos(angle);
    const r: mat4fv = [
        c, 0.0, -s, 0.0,
        0.0, 1.0, 0.0, 0.0,
        s, 0.0, c, 0.0,
        0.0, 0.0, 0.0, 1.0,
    ];
    return r;
}

export function rotationZDeg(angle: number): mat4fv {
    return rotationZRad(degToRad(angle));
}

export function rotationZRad(angle: number): mat4fv {
    const s: number = Math.sin(angle);
    const c: number = Math.cos(angle);
    const r: mat4fv = [
        c, s, 0.0, 0.0,
        -s, c, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0,
    ];
    return r;
}

export function multiply(a: mat4fv, b: mat4fv): mat4fv {
    const a00: number = a[0 * 4 + 0];
    const a01: number = a[0 * 4 + 1];
    const a02: number = a[0 * 4 + 2];
    const a03: number = a[0 * 4 + 3];
    const a10: number = a[1 * 4 + 0];
    const a11: number = a[1 * 4 + 1];
    const a12: number = a[1 * 4 + 2];
    const a13: number = a[1 * 4 + 3];
    const a20: number = a[2 * 4 + 0];
    const a21: number = a[2 * 4 + 1];
    const a22: number = a[2 * 4 + 2];
    const a23: number = a[2 * 4 + 3];
    const a30: number = a[3 * 4 + 0];
    const a31: number = a[3 * 4 + 1];
    const a32: number = a[3 * 4 + 2];
    const a33: number = a[3 * 4 + 3];

    const b00: number = b[0 * 4 + 0];
    const b01: number = b[0 * 4 + 1];
    const b02: number = b[0 * 4 + 2];
    const b03: number = b[0 * 4 + 3];
    const b10: number = b[1 * 4 + 0];
    const b11: number = b[1 * 4 + 1];
    const b12: number = b[1 * 4 + 2];
    const b13: number = b[1 * 4 + 3];
    const b20: number = b[2 * 4 + 0];
    const b21: number = b[2 * 4 + 1];
    const b22: number = b[2 * 4 + 2];
    const b23: number = b[2 * 4 + 3];
    const b30: number = b[3 * 4 + 0];
    const b31: number = b[3 * 4 + 1];
    const b32: number = b[3 * 4 + 2];
    const b33: number = b[3 * 4 + 3];

    const c00: number = a00 * b00 + a10 * b01 + a20 * b02 + a30 * b03;
    const c01: number = a01 * b00 + a11 * b01 + a21 * b02 + a31 * b03;
    const c02: number = a02 * b00 + a12 * b01 + a22 * b02 + a32 * b03;
    const c03: number = a03 * b00 + a13 * b01 + a23 * b02 + a33 * b03;

    const c10: number = a00 * b10 + a10 * b11 + a20 * b12 + a30 * b13;
    const c11: number = a01 * b10 + a11 * b11 + a21 * b12 + a31 * b13;
    const c12: number = a02 * b10 + a12 * b11 + a22 * b12 + a32 * b13;
    const c13: number = a03 * b10 + a13 * b11 + a23 * b12 + a33 * b13;

    const c20: number = a00 * b20 + a10 * b21 + a20 * b22 + a30 * b23;
    const c21: number = a01 * b20 + a11 * b21 + a21 * b22 + a31 * b23;
    const c22: number = a02 * b20 + a12 * b21 + a22 * b22 + a32 * b23;
    const c23: number = a03 * b20 + a13 * b21 + a23 * b22 + a33 * b23;

    const c30: number = a00 * b30 + a10 * b31 + a20 * b32 + a30 * b33;
    const c31: number = a01 * b30 + a11 * b31 + a21 * b32 + a31 * b33;
    const c32: number = a02 * b30 + a12 * b31 + a22 * b32 + a32 * b33;
    const c33: number = a03 * b30 + a13 * b31 + a23 * b32 + a33 * b33;

    const c: mat4fv = [
        c00, c01, c02, c03,
        c10, c11, c12, c13,
        c20, c21, c22, c23,
        c30, c31, c32, c33
    ];

    return c;
}

export function add(a: mat4fv, b: mat4fv): mat4fv {
    const a00: number = a[0 * 4 + 0];
    const a01: number = a[0 * 4 + 1];
    const a02: number = a[0 * 4 + 2];
    const a03: number = a[0 * 4 + 3];
    const a10: number = a[1 * 4 + 0];
    const a11: number = a[1 * 4 + 1];
    const a12: number = a[1 * 4 + 2];
    const a13: number = a[1 * 4 + 3];
    const a20: number = a[2 * 4 + 0];
    const a21: number = a[2 * 4 + 1];
    const a22: number = a[2 * 4 + 2];
    const a23: number = a[2 * 4 + 3];
    const a30: number = a[3 * 4 + 0];
    const a31: number = a[3 * 4 + 1];
    const a32: number = a[3 * 4 + 2];
    const a33: number = a[3 * 4 + 3];

    const b00: number = b[0 * 4 + 0];
    const b01: number = b[0 * 4 + 1];
    const b02: number = b[0 * 4 + 2];
    const b03: number = b[0 * 4 + 3];
    const b10: number = b[1 * 4 + 0];
    const b11: number = b[1 * 4 + 1];
    const b12: number = b[1 * 4 + 2];
    const b13: number = b[1 * 4 + 3];
    const b20: number = b[2 * 4 + 0];
    const b21: number = b[2 * 4 + 1];
    const b22: number = b[2 * 4 + 2];
    const b23: number = b[2 * 4 + 3];
    const b30: number = b[3 * 4 + 0];
    const b31: number = b[3 * 4 + 1];
    const b32: number = b[3 * 4 + 2];
    const b33: number = b[3 * 4 + 3];

    const c00: number = a00 + b00;
    const c01: number = a01 + b01;
    const c02: number = a02 + b02;
    const c03: number = a03 + b03;
    const c10: number = a10 + b10;
    const c11: number = a11 + b11;
    const c12: number = a12 + b12;
    const c13: number = a13 + b13;
    const c20: number = a20 + b20;
    const c21: number = a21 + b21;
    const c22: number = a22 + b22;
    const c23: number = a23 + b23;
    const c30: number = a30 + b30;
    const c31: number = a31 + b31;
    const c32: number = a32 + b32;
    const c33: number = a33 + b33;

    const c: mat4fv = [
        c00, c01, c02, c03,
        c10, c11, c12, c13,
        c20, c21, c22, c23,
        c30, c31, c32, c33
    ];

    return c;
}
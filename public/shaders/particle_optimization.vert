#version 300 es

float pi = 3.1415926538;

uniform float u_delta;
uniform mat4 u_camera;
uniform float u_time;
in vec3 vertex_coord;
out vec4 color;

float rand(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    //float sin_in = mod(vertex_coord.z * 0.005 * u_time, 2.0 * pi);
    //float cos_in = mod(vertex_coord.z * 0.005 * u_time, 2.0 * pi);
    float x = vertex_coord.y * sin(vertex_coord.y * vertex_coord.z * 0.005 * u_time);
    float y = vertex_coord.x * cos(vertex_coord.x * vertex_coord.z * 0.005 *
    u_time);
    float z = 0.0;
    if (-0.01 < x && x < 0.01 && -0.01 < y && y < 0.01) {
        z = 1000000.0;
    }
    gl_Position = u_camera * vec4(x, y, z, 1.0);
    gl_PointSize = 3.0;
    if (vertex_coord.z < 0.0) {
        color = vec4(0.79, 0.15, 0.15, 1);
    } else {
        color = vec4(0.07, 0.15, 0.88, 1);
    }
}
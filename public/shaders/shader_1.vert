#version 300 es

float pi = 3.1415926538;

uniform float u_delta;
uniform mat4 u_camera;
uniform float u_time;
in vec3 vertex_coord;

float rand(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    //float sin_in = mod(vertex_coord.z * 0.005 * u_time, 2.0 * pi);
    //float cos_in = mod(vertex_coord.z * 0.005 * u_time, 2.0 * pi);
    float x = vertex_coord.y * sin(vertex_coord.y * vertex_coord.z * 0.005 * u_time);
    float y = vertex_coord.x * cos(vertex_coord.x * vertex_coord.z * 0.005 * u_time);
    gl_Position = u_camera * vec4(x, y, 0.0, 1.0);
    gl_PointSize = 3.0;
}
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
    float x = 0.0;
    float y = 0.0;
    float z = 0.0;
    if(vertex_coord.z < 0.0) {
        x = vertex_coord.x * cos(1000.0 * vertex_coord.x);
        y = vertex_coord.y * sin(1000.0 * vertex_coord.y);
        z = 100.0 * (vertex_coord.x * vertex_coord.x + vertex_coord.y *
            vertex_coord.y) * cos(0.001 * u_time * vertex_coord.y * vertex_coord.x);
        color = vec4(0.79, 0.15, 0.15, 1);
    } else {
        x = vertex_coord.x * sin(1000.0 * vertex_coord.x);
        y = vertex_coord.y * cos(1000.0 * vertex_coord.y);
        z = 100.0 * (vertex_coord.x * vertex_coord.x + vertex_coord.y *
            vertex_coord.y) * sin(0.001 * u_time * vertex_coord.y * vertex_coord.x);
        color = vec4(0.07, 0.15, 0.88, 1);
    }
    gl_PointSize = 2.0;
    gl_Position = u_camera * vec4(x, y, z, 1.0);
}
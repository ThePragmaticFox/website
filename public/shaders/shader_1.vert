#version 300 es

uniform mat4 u_camera;
uniform float u_time;
in vec3 coordinates;

void main() {
    float x = coordinates.x * sin(coordinates.z * 0.005 * u_time);
    float y = coordinates.y * cos(coordinates.z * 0.005 * u_time);
    gl_Position = u_camera * vec4(x, y, 0.0, 1.0);
    gl_PointSize = 100.0;
}
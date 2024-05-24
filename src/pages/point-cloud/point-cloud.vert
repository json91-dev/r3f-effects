uniform float time;
uniform float count;
attribute float index;
varying vec3 vPosition;

const float TAU = 6.283185307179586;

void main() {
    float t = index / count;
    float a = t * TAU * 10.0 - time;
    vec3 pos = position;
    pos.x = cos(a);
    pos.y = sin(a);
    pos.xy *= t;
    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
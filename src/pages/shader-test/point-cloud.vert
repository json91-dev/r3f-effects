uniform float time;
uniform float count;
attribute float index;
varying vec3 vPosition;

const float TAU = 6.283185307179586;

struct Point {
    vec4 pos;
    vec4 prev;
};

void iter(inout Point p) {
    vec4 v = p.pos - p.prev;
    p.pos.xyz += v.xzy;
}

void main() {
    float t = index * 1.0 / count;
    float a = t * TAU * 20.0 + time;
    vec3 pos = position;
    pos.x = cos(a);
    pos.y = sin(a);
    pos.xy *= t;
    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
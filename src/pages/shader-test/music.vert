uniform float time;
uniform float count;
attribute float index;
varying vec3 vPosition;

const float TAU = 6.283185307179586; // 2 파이

struct Point {
    vec4 pos;
    vec4 prev;
};

void iter(inout Point p) {
    vec4 v = p.pos - p.prev;
    p.pos.xyz += v.xzy;
}

void main() {
    float progress = index * 1.0 / count;

    vec3 pos = position;
    pos.x = progress;
    pos.y -= 0.0;


    if (pos.y <= 0.0) {
        pos.y = 1.0;
    }


    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
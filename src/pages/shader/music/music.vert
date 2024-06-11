uniform float time;
uniform float count;
attribute float index;
attribute float random;
varying vec3 vPosition;

const float TAU = 6.283185307179586; // 2 파이


void main() {
    vec3 pos = position;

    float t = time * 5.0 + random * 3.0;

    pos.x = index * .001;
    pos.y = 0.5 - fract(t) ;

    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos * 2.0, 1.0);
}
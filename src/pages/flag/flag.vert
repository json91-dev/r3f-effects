
#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

uniform float timeMsec;
uniform float noiseScale;
uniform float noiseStrength;
uniform float waveLength;
uniform float waveHeight;

void main() {
    vPosition = position;
    vNormal = normal;
    vUv = uv;

    float time = timeMsec / 1000.0 * 0.5;
    vec3 transformed = position;
    float noise = snoise2(vec2(transformed.xy * noiseScale + time));
    transformed.z += noise * noiseStrength * (1.0 - abs(transformed.x) / 2.0);
    transformed.z += sin(transformed.x * waveLength * time) * waveHeight;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}
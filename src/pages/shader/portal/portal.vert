varying vec2 vUv;
varying vec3 vNormal;

uniform float timeMsec;

void main() {
    vUv = uv;

    float time = timeMsec / 1000.0;

    float angle = time * 0.5;
    mat4 rotationMatrix = mat4(
        cos(angle), -sin(angle), 0.0, 0.0,
        sin(angle), cos(angle), 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    );

    gl_Position = projectionMatrix * modelViewMatrix * rotationMatrix * vec4(position, 1.0);
}
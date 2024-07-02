attribute float size;
varying vec3 vColor;
void main() {
    vColor = vec3(1.0, 1.0, 1.0); // 하얀색
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}
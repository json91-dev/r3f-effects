
attribute float pos;
attribute float progress;
varying vec2 vUv;
varying vec3 vColor;
varying float vProgress;
uniform float time;

void main() {
    vUv = position.xy + vec2(0.5);
    vColor = vec3(1.0, 1.0, 1.0); // 하얀색
    vProgress = progress;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = 0.15 * vProgress;

    float t = time * 0.2 + 1000. * vProgress;

//    vec3 world_pos = pos;
//    world_pos.y = vProgress * sin(t);


    gl_Position = projectionMatrix * mvPosition;
}
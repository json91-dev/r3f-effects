uniform float time;
attribute vec3 pos;
attribute float progress;
attribute float opacity;
varying vec2 vUv;
varying float particle_size;
varying float vProgress;
varying float vOpacity;

void main() {
    vUv = position.xy + vec2(0.5);
    vProgress = progress;
    vOpacity = opacity;

    particle_size = 0.15 * progress;
    float t = time * 0.2 + 1000. * progress;

    vec3 world_pos = pos;
    world_pos.y = -4. + 8. * fract(t);
    world_pos.x += sin(t * 50.0 * (normalize(pos).x + particle_size)) * 0.15;
    world_pos.z += cos(t * 50.0 * (normalize(pos).z + particle_size)) * 0.15;

    vec3 particle_position = (modelMatrix * vec4(world_pos, 1.)).xyz;

    vec4 view_pos = viewMatrix * vec4(particle_position, 1.);

    // 각각의 파티클의 스케일 조정 : 각 파티클 정보를 담는 position을 이용
    view_pos.xyz += position * particle_size;

    gl_Position = projectionMatrix * view_pos;
}
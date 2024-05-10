uniform float time;
attribute vec3 pos;
attribute float progress;
attribute float opacity;

varying vec2 vUv;
varying float particle_size;
varying float vProgress;
varying float vOpacity;
varying float vParticleTextureIndex;


void main() {
    vUv = position.xy + vec2(0.5);
    vProgress = progress;
    vOpacity = opacity;

    particle_size = 0.15 * progress; // 0 ~ 0.15
    vec3 world_pos = pos;
    float rotationTime = time * 2.0 * progress;
    float moveToCenterTime = time * progress * 0.5;


    /** 회전 적용 **/
    mat3 rotationMatrix = mat3(
        cos(rotationTime), 0.0, sin(rotationTime),
        0, 1, 0.0,
        -sin(rotationTime), 0.0, cos(rotationTime)
    );
    world_pos = world_pos * rotationMatrix;

    /** 중앙으로 파티클 이동 **/
    vec3 moveVector = normalize(-world_pos) * fract(moveToCenterTime);

    world_pos = world_pos + moveVector;
    /** 원점 이동시 원래 위치로 복귀 **/
    world_pos = mix(world_pos, world_pos, step(length(world_pos), 0.1));

    vec3 particle_position = (modelMatrix * vec4(world_pos, 1.)).xyz;
    vec4 view_pos = viewMatrix * vec4(particle_position, 1.);

    /** 파티클 크기 **/
    view_pos.xyz += position * 0.25;
    gl_Position = projectionMatrix * view_pos;
}
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

uniform float uOpacity;
uniform sampler2D uTexture;

void main() {
    // 투명도 설정
    float distance = length(vPosition.xy);
    float opacity = 1.0 - smoothstep(0.0, 0.95, distance);
    // 텍스쳐 설정
    vec2 uv = vUv;
    vec4 tex1 = texture2D(uTexture, uv * 1.0);
    // 밖에서 gsap 애니메이션을 위한 커스텀 설정
    if (uOpacity < 1.0) opacity = min(opacity, uOpacity);
    // 최종 결과 값 설정
    gl_FragColor = vec4(tex1.r, tex1.g, tex1.b, opacity);
}

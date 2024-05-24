varying vec3 vPosition; // vertex shader에서 넘어온 varying 변수

void main() {
    gl_FragColor = vec4(vPosition, 1.0); // vPosition을 사용하여 점의 색상을 설정
}
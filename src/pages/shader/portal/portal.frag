#define tau 6.2831853 // 반지름이 1인 원의 둘레 (원주율의 2배)

varying vec2 vUv;
varying vec3 vNormal;

uniform float timeMsec;
uniform sampler2D uTexture;
uniform float colorDelta;
uniform float isPortalFinished;

// 시계 반대방향의 회전 행렬 구하기
mat2 makem2(float theta){
    float c = cos(theta);
    float s = sin(theta);
    return mat2(c,-s,s,c);
}

// noise 텍스쳐를 이용한 노이즈 색상값 얻어오기 (검정 0 / 흰 1)
float noise(vec2 x) {
    vec4 texture = texture2D(uTexture, x * 0.05);
    return texture.x;
}

// 프로시저 노이어 생성.
float fbm(vec2 p, float time) {
    vec4 tt=fract(vec4(time*2.)+vec4(0.0,0.25,0.5,0.75)); // 소숫점 이하만 남기고 나머지 버림
    vec2 p1=p-normalize(p)*tt.x; // 첫번째 noise 생성
    vec2 p2=vec2(4.0)+p-normalize(p)*tt.y;
    vec2 p3=vec2(12.0)+p-normalize(p)*tt.z;
    vec2 p4=vec2(3.0)+p-normalize(p)*tt.w;
    vec4 tr=vec4(1.0)-abs(tt-vec4(0.5))*2.0;//*vec4(0.0,1.0,0.0,1.0);
    float z=2.;
    vec4 rz = vec4(0.);
    for (float i= 1.;i < 4.;i++)
    {
        rz+= abs((vec4(noise(p1),noise(p2),noise(p3),noise(p4))-vec4(0.5))*2.)/z;
        z = z*2.;
        p1 = p1*2.;
        p2 = p2*2.;
        p3 = p3*2.;
        p4 = p4*2.;
    }
    return dot(rz,tr)*0.25;
}

// get two rotated fbm calls and displace the domain
float dualfbm(vec2 p, float time) {
    vec2 p2 = p*.7; // 입력점을 크기가 0.7인 비율로 조절
    vec2 basis = vec2(fbm(p2-time*1.6, time),fbm(p2+time*1.7, time));
    basis = (basis-.5)*.2;
    p += basis; // 점 주변에 노이즈 더함

    //coloring
    return fbm(p, time);
}

/** 2D 평면상의 점 p에서 원 모양의 값을 생성하는 함수 **/
float circ(vec2 p) {
    float r = length(p);
    r = log(sqrt(r));
    //    return abs(mod(r*2.,tau)-4.54)*10.+.5;
    //    return abs(mod(r*2.,tau)-4.54)*15.+3.5;
    return abs(mod(r*2., tau) - 4.64) * 13.5 + 4.0;

}

void main() {
    vec2 p = vUv * 6.0 - vec2(3.0);
    float time = timeMsec / 1000.0 * 0.15;
    float rz = dualfbm(p, time);

    rz *= abs((-circ(vec2(p.x / 5.0, p.y / 5.0))));
    rz *= abs((-circ(vec2(p.x / 5.0, p.y / 5.0))));
    rz *= abs((-circ(vec2(p.x / 5.0, p.y / 5.0))));
    rz *= 1.5;

    //final color
    float r = 8.0;
    float g = 8.0 + 2.00;
    float b = 8.0 + 7.15;
    vec3 col = vec3(r, g, b)/rz;
    col=pow(abs(col),vec3(1.63));

    gl_FragColor = vec4(col, 1.0);

    if ((gl_FragColor.a = length(gl_FragColor.rgb)) < 0.0) discard;
}

varying vec2 vUv;
varying float vProgress;
varying float vOpacity;
varying float particle_size;
uniform float time;
uniform sampler2D imageTexture;

void main() {
    float t = time * 0.1 + 1000. * vProgress;

    vec4 imageColor = texture2D(imageTexture, vUv);

    gl_FragColor = imageColor * vOpacity * 0.7;
    gl_FragColor.r -= .2;
    gl_FragColor.g -= 0.0;
}
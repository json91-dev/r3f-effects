varying vec2 vUv;
varying float vProgress;
varying float vOpacity;
varying float particle_size;

uniform float time;
uniform sampler2D imageTexture;

void main() {
    vec4 imageColor = texture2D(imageTexture, vUv);
    gl_FragColor = imageColor;
}
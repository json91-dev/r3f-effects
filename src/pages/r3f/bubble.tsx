import { extend, ReactThreeFiber, useFrame, useLoader } from '@react-three/fiber'
import React, { Suspense, useLayoutEffect, useRef } from 'react'
import { shaderMaterial, useTexture } from '@react-three/drei'
import * as THREE from 'three'

import bubblesObj from '@static/models/bubbleVerts.obj'
import bubbleImg from '@static/images/texture.bubble.png'
// @ts-ignore
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

export default function Bubbles() {
  const obj = useLoader(OBJLoader, bubblesObj)
  const ref = useRef<THREE.Mesh>(null!)
  const imageTexture = useTexture(bubbleImg)

  useLayoutEffect(() => {
    const particleGeo = new THREE.PlaneGeometry(1, 1)
    const geo = new THREE.InstancedBufferGeometry()
    geo.setAttribute('position', particleGeo.getAttribute('position'))

    const count = obj.children[0].geometry.attributes.position.count
    geo.instanceCount = count
    // geo.index = particleGeo.index // 지오메트리 인덱스 설정

    const pos = new Float32Array(count * 3)
    const progress = new Float32Array(count)
    const opacity = new Float32Array(count)

    for (let i = 0; i < count; i += 1) {
      const x = obj.children[0].geometry.attributes.position.array[i * 3] // 0 6 12 18 24 30
      const y = obj.children[0].geometry.attributes.position.array[i * 3 + 1] // 1 7 13 19 25 31
      const z = obj.children[0].geometry.attributes.position.array[i * 3 + 2] // 2 8 14 20 26 32

      pos[i * 3] = x // (0 => 0, 3 => 6, 6=> 12, 9 => 18, 12 => 24)
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z

      progress[i] = Math.random()
      opacity[i] = Math.random()

      geo.setAttribute('pos', new THREE.InstancedBufferAttribute(pos, 3, false))
      geo.setAttribute('progress', new THREE.InstancedBufferAttribute(progress, 1, false))
      geo.setAttribute('opacity', new THREE.InstancedBufferAttribute(opacity, 1, false))

      ref.current.geometry = geo
    }
  }, [])

  /** 각 프레임마다 버블 애니메이션 적용 **/
  useFrame((state) => {
    const { uniforms }: any = ref.current.material
    uniforms.time.value = state.clock.elapsedTime
  })

  return (
    <Suspense fallback={null}>
      <mesh ref={ref} position={[0, 0, 0]} scale={1} frustumCulled={false}>
        <bubbleMaterial
          key={BubbleMaterial.key}
          transparent={true}
          depthWrite={false}
          side={THREE.DoubleSide}
          imageTexture={imageTexture}
        />
      </mesh>
    </Suspense>
  )
}

/** 버블 효과를 위한 셰이더 머티리얼 정의 */
const BubbleMaterial: any = shaderMaterial(
  {
    time: 0, // 시간 유니폼
    imageTexture: null, // 텍스처 유니폼
  },
  `
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
  `,
  `
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
  `,
)

/** BubbleMaterial 셰이더를 React Three Fiber의 확장 요소로 등록 */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      bubbleMaterial: ReactThreeFiber.Node<
        typeof BubbleMaterial & JSX.IntrinsicElements['shaderMaterial'],
        typeof BubbleMaterial
      >
    }
  }
}

/** 확장을 통해 커스텀 셰이더 재질을 사용할 수 있도록 합니다. */
extend({ BubbleMaterial })

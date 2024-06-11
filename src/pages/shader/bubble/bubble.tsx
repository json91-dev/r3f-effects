import { extend, ReactThreeFiber, useFrame, useLoader } from '@react-three/fiber'
import React, { Suspense, useLayoutEffect, useRef } from 'react'
import { shaderMaterial, useTexture } from '@react-three/drei'
import * as THREE from 'three'

import bubblesObj from '@static/models/bubbleVerts.obj'
import bubbleImg from '@static/images/texture.bubble.png'
// @ts-ignore
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

import bubbleVert from './bubble.vert'
import bubbleFrag from './bubble.frag'

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
    <>
      <mesh ref={ref} position={[0, 0, 0]} scale={1} frustumCulled={false}>
        <bubbleMaterial
          key={BubbleMaterial.key}
          transparent={true}
          depthWrite={false}
          side={THREE.DoubleSide}
          imageTexture={imageTexture}
        />
      </mesh>
    </>
  )
}

/** 버블 효과를 위한 셰이더 머티리얼 정의 */
const BubbleMaterial: any = shaderMaterial(
  {
    time: 0, // 시간 유니폼
    imageTexture: null, // 텍스처 유니폼
  },
  bubbleVert,
  bubbleFrag,
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

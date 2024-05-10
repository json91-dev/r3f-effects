import { extend, ReactThreeFiber, useFrame, useLoader, useThree } from '@react-three/fiber'
import React, { Suspense, useEffect, useLayoutEffect, useRef } from 'react'
import { Environment, shaderMaterial, useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { Bloom } from '@react-three/postprocessing'

import blossomObj from '@static/models/blossom.vert.2.obj'
import blossomTexture2 from '@static/images/blossom.2.png'
// @ts-ignore
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import blossomVert from './blossom.vert'
import blossomFrag from './blossom.frag'
import circleModel from '@static/models/circle.glb'

export default function Blossoms() {
  const obj = useLoader(OBJLoader, blossomObj)
  const meshRef = useRef<THREE.Mesh>(null!)
  const blossom2 = useTexture(blossomTexture2)
  const { scene, camera } = useThree()
  const { scene: modelScene }: any = useGLTF(circleModel)

  useEffect(() => {
    scene.background = new THREE.Color('black')
    camera.position.set(0, 0, 10)
  }, [])

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

      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z

      progress[i] = Math.random()
      opacity[i] = Math.random()

      geo.setAttribute('pos', new THREE.InstancedBufferAttribute(pos, 3, false))
      geo.setAttribute('progress', new THREE.InstancedBufferAttribute(progress, 1, false))
      geo.setAttribute('opacity', new THREE.InstancedBufferAttribute(opacity, 1, false))

      meshRef.current.geometry = geo
    }
  }, [])

  /** 각 프레임마다 버블 애니메이션 적용 **/
  useFrame((state) => {
    const { uniforms }: any = meshRef.current.material
    uniforms.time.value = state.clock.elapsedTime
  })

  return (
    <Suspense fallback={null}>
      <ambientLight intensity={1.5} color='#fff' />
      <Environment preset='forest' blur={100} />
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.5, 32, 16]} />
        <meshStandardMaterial color={'gray'} />
      </mesh>
      <mesh ref={meshRef} position={[0, 0, 0]} rotation={[0, 0, 0]} scale={4} frustumCulled={false}>
        <blossomMaterial
          key={BlossomMaterial.key}
          transparent={true}
          depthWrite={false}
          side={THREE.DoubleSide}
          imageTexture={blossom2}
        />
      </mesh>
    </Suspense>
  )
}

/** 버블 효과를 위한 셰이더 머티리얼 정의 */
const BlossomMaterial: any = shaderMaterial(
  {
    time: 0, // 시간 유니폼
    imageTexture: null, // 텍스처 유니폼
  },
  blossomVert,
  blossomFrag,
)

/** BlossomMaterial 셰이더를 React Three Fiber의 확장 요소로 등록 */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      blossomMaterial: ReactThreeFiber.Node<
        typeof BlossomMaterial & JSX.IntrinsicElements['shaderMaterial'],
        typeof BlossomMaterial
      >
    }
  }
}

/** 확장을 통해 커스텀 셰이더 재질을 사용할 수 있도록 합니다. */
extend({ BlossomMaterial })

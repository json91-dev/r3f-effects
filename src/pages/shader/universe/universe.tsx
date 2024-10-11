import { extend, ReactThreeFiber, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { PerspectiveCamera, shaderMaterial } from '@react-three/drei'
import vert from './universe.vert'
import frag from './universe.frag'
import * as THREE from 'three'
import gsap from 'gsap'

export default function Universe() {
  return <Stars />
}

function Stars() {
  const materialRef = useRef<any>()
  const cameraRef = useRef<any>()

  useEffect(() => {
    const timeline = gsap.timeline()
    timeline.to(cameraRef.current, {
      fov: 100,
      duration: 5,
      onUpdate: () => {
        if (cameraRef.current) {
          cameraRef.current.updateProjectionMatrix() // 애니메이션 중 fov 업데이트
        }
      },
    })
  }, [])

  // Update time uniform to animate the shader
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime()
    }
  })

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 0]} fov={50} near={0.1} far={1000} />
      <mesh
        position={[0, 0, 0]}
        scale={0.5}
        rotation={[THREE.MathUtils.degToRad(180), THREE.MathUtils.degToRad(90), 2]}
      >
        <sphereGeometry args={[10, 10]} />
        <spaceShaderMaterial ref={materialRef} side={THREE.BackSide} />
      </mesh>
    </>
  )
}

// 커스텀 쉐이더 재질 생성
const SpaceShaderMaterial: any = shaderMaterial(
  { time: 0, resolution: [window.innerWidth, window.innerHeight] }, // 시간 유니폼 },
  vert,
  frag,
)

/** BubbleMaterial 셰이더를 React Three Fiber의 확장 요소로 등록 */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      spaceShaderMaterial: ReactThreeFiber.Node<
        typeof SpaceShaderMaterial & JSX.IntrinsicElements['shaderMaterial'],
        typeof SpaceShaderMaterial
      >
    }
  }
}

extend({ SpaceShaderMaterial })

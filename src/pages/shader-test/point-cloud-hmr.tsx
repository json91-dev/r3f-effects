import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { extend, ReactThreeFiber, useFrame } from '@react-three/fiber'
import frag from '@src/pages/shader-test/point-cloud.frag'
import vert from '@src/pages/shader-test/point-cloud.vert'
import { shaderMaterial } from '@react-three/drei'
export default function PointCloud() {
  const pointsRef = useRef<any>(null!)

  /** Vector 3 배열 만들기 **/
  useLayoutEffect(() => {
    const points = []
    const count = 1000 // 점의 개수
    for (let i = 0; i < count; i++) {
      points.push(new THREE.Vector3())
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(points.flatMap((point) => [point.x, point.y, point.z])), 3, false),
    )
    geo.setAttribute('index', new THREE.BufferAttribute(new Float32Array(points.map((_, i) => i)), 1, false))

    pointsRef.current.geometry = geo
  }, [])

  const pointMaterialRef = useRef<any>()
  useFrame(({ clock }) => {
    if (pointMaterialRef.current) {
      pointMaterialRef.current.uniforms.time.value = clock.getElapsedTime()
    }
  })

  return (
    <group position={[0, 0, -3]} scale={[2, 2, 2]}>
      <points ref={pointsRef}>
        <cloudShaderMaterial ref={pointMaterialRef} />
      </points>
    </group>
  )
}

/** 버블 효과를 위한 셰이더 머티리얼 정의 */
const CloudMaterial: any = shaderMaterial(
  {
    time: 0,
    count: 1000,
  },
  vert,
  frag,
)

/** BubbleMaterial 셰이더를 React Three Fiber의 확장 요소로 등록 */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      cloudShaderMaterial: ReactThreeFiber.Node<
        typeof CloudMaterial & JSX.IntrinsicElements['shaderMaterial'],
        typeof CloudMaterial
      >
    }
  }
}

/** 확장을 통해 커스텀 셰이더 재질을 사용할 수 있도록 합니다. */
extend({ CloudMaterial })

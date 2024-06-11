import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { extend, ReactThreeFiber, useFrame, useThree } from '@react-three/fiber'
import frag from '@src/pages/shader/music/music.frag'
import vert from '@src/pages/shader/music/music.vert'
import { shaderMaterial } from '@react-three/drei'
export default function Music() {
  const [points, setPoints] = useState<THREE.Vector3[]>([])
  const geoRef = useRef(null)
  const { camera } = useThree()

  /** Vector 3 배열 만들기 **/
  useLayoutEffect(() => {
    if (geoRef.current) {
      geoRef.current = null
      console.log(geoRef.current)
    }

    const points = []
    const count = 1000 // 점의 개수
    for (let i = 0; i < count; i++) {
      points.push(new THREE.Vector3())
    }
    setPoints(points)
  }, [])

  useEffect(() => {
    camera.position.set(0, 0, 5)
  }, [])

  const pointMaterialRef = useRef<any>()

  useFrame(({ clock }) => {
    if (pointMaterialRef.current) {
      pointMaterialRef.current.uniforms.time.value = clock.getElapsedTime()
    }
  })

  if (points.length === 0) {
    return null
  }

  return (
    <group position={[0, 0, 0]} scale={[1, 1, 1]}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach={'attributes-position'}
            count={points.length}
            array={new Float32Array(points.flatMap((point) => [point.x, point.y, point.z]))}
            itemSize={3}
            needsUpdate={true}
          />

          <bufferAttribute
            attach={'attributes-index'}
            count={points.length}
            array={new Float32Array(points.map((_, i) => i))}
            itemSize={1}
            needsUpdate={true}
          />

          <bufferAttribute
            attach={'attributes-random'}
            count={points.length}
            array={new Float32Array(points.map((_) => Math.random()))}
            itemSize={1}
            needsUpdate={true}
          />
        </bufferGeometry>
        <cloudShaderMaterial ref={pointMaterialRef} />
      </points>
    </group>
  )
}

/** 버블 효과를 위한 셰이더 머티리얼 정의 */
const CloudShaderMaterial: any = shaderMaterial(
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
        typeof CloudShaderMaterial & JSX.IntrinsicElements['shaderMaterial'],
        typeof CloudShaderMaterial
      >
    }
  }
}

/** 확장을 통해 커스텀 셰이더 재질을 사용할 수 있도록 합니다. */
extend({ CloudShaderMaterial })

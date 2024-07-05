import { extend, ReactThreeFiber, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { TextureLoader } from 'three'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import frag from './flower-dust.frag'
import vert from './flower-dust.vert'

export default function FlowerDust() {
  return (
    <group rotation={[THREE.MathUtils.degToRad(180), 0, 0]} scale={[0.1, 0.1, 0.1]} position={[0, 0, -10]}>
      <ambientLight intensity={0.5} />
      <Stars />
    </group>
  )
}

function Stars() {
  const ref = useRef<THREE.Points>(null!)
  const particleCount = 1000

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const progress = new Float32Array(particleCount)
    for (let i = 0; i < particleCount; i++) {
      // 초기 위치를 중앙으로 설정
      positions[i * 3] = 0
      positions[i * 3 + 1] = 0
      positions[i * 3 + 2] = 0
    }

    for (let i = 0; i < particleCount; i++) {
      progress[i] = Math.random()
    }

    return { positions, progress }
  }, [particleCount])

  /** 각 프레임마다 버블 애니메이션 적용 **/
  useFrame((state) => {
    const { uniforms }: any = ref.current.material
    uniforms.time.value = state.clock.elapsedTime
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach={'attributes-pos'}
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />

        <bufferAttribute
          attach={'attributes-progress'}
          count={particles.progress.length}
          array={particles.progress}
          itemSize={1}
        />
      </bufferGeometry>
      <starMaterial attach={'material'} />
    </points>
  )
}

// 커스텀 쉐이더 재질 생성
const StarMaterial: any = shaderMaterial(
  {
    pointTexture: new TextureLoader().load('/static/images/star.particle.origin.png'),
    time: 0,
  },
  vert,
  frag,
)

/** BubbleMaterial 셰이더를 React Three Fiber의 확장 요소로 등록 */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      starMaterial: ReactThreeFiber.Node<
        typeof StarMaterial & JSX.IntrinsicElements['shaderMaterial'],
        typeof StarMaterial
      >
    }
  }
}

extend({ StarMaterial })

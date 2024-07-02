import { extend, ReactThreeFiber, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { TextureLoader } from 'three'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

export default function FlowerDust() {
  return (
    <group rotation={[THREE.MathUtils.degToRad(180), 0, 0]} scale={[0.1, 0.1, 0.1]} position={[0, 0, -10]}>
      <ambientLight intensity={0.5} />
      <Stars />
    </group>
  )
}

function Stars() {
  const ref = useRef()
  const particleCount = 1000

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)
    for (let i = 0; i < particleCount; i++) {
      // 초기 위치를 중앙으로 설정
      positions[i * 3] = 0
      positions[i * 3 + 1] = 0
      positions[i * 3 + 2] = 0

      // 랜덤한 방향과 속도로 초기 속도 설정
      const angle = Math.random() * 2 * Math.PI
      const speed = Math.random() * 2
      velocities[i * 3] = Math.cos(angle) * speed
      velocities[i * 3 + 1] = Math.sin(angle) * speed
      velocities[i * 3 + 2] = Math.random() - 0.5 // z 축도 랜덤하게

      sizes[i] = Math.random() * 2 + 1 // size
    }
    return { positions, velocities, sizes }
  }, [particleCount])

  useFrame(() => {
    if (ref.current) {
      const positions = ref.current.geometry.attributes.position.array
      const velocities = particles.velocities
      for (let i = 0; i < particleCount; i++) {
        // 속도에 따라 위치 업데이트
        positions[i * 3] += velocities[i * 3]
        positions[i * 3 + 1] += velocities[i * 3 + 1]
        positions[i * 3 + 2] += velocities[i * 3 + 2]

        // y 축이 특정 값 아래로 내려가면 다시 중앙으로 초기화
        if (positions[i * 3 + 1] < -100) {
          positions[i * 3] = 0
          positions[i * 3 + 1] = 0
          positions[i * 3 + 2] = 0
        }
      }
      ref.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach={'attributes-position'}
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach={'attributes-size'}
          count={particles.sizes.length}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <starMaterial attach={'material'} />
    </points>
  )
}

// WebGL 쉐이더 소스 코드
const vertexShader = `
attribute float size;
varying vec3 vColor;
void main() {
  vColor = vec3(1.0, 1.0, 1.0); // 하얀색
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = size * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`

const fragmentShader = `
uniform sampler2D pointTexture;
varying vec3 vColor;
void main() {
  gl_FragColor = vec4(vColor, 1.0);
  gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);
}
`

// 커스텀 쉐이더 재질 생성
const StarMaterial: any = shaderMaterial(
  { pointTexture: new TextureLoader().load('/static/images/star.particle.origin.png') },
  vertexShader,
  fragmentShader,
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

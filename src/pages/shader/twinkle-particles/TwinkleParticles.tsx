import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { extend, ReactThreeFiber, useFrame } from '@react-three/fiber'
import React, { useEffect, useMemo, useRef } from 'react'

interface GlowParticleUniforms {
  uColor: THREE.Color
  uSize: number
  uTime: number
  uScale: number
  [key: string]: any // 인덱스 서명 추가
}

const GlowParticleMaterial = shaderMaterial(
  {
    uColor: new THREE.Color(0xffffff),
    uSize: 0.03,
    uTime: 0,
    uScale: 1.0,
  } as GlowParticleUniforms,
  // 버텍스 셰이더
  `
uniform float uSize;
uniform float uTime;
uniform float uScale;
attribute float aScale;
attribute vec3 aRandomness;
attribute float aTwinkleSpeed; // Twinkle 속도 속성 추가
varying vec3 vRandomness;
varying float vDistance;
varying float vTwinkleSpeed; // Twinkle 속도 전달

void main() {
  vec4 scaledPosition = vec4(position * uScale, 1.0);
  vec4 mvPosition = modelViewMatrix * scaledPosition;
  gl_Position = projectionMatrix * mvPosition;
  float distance = length(scaledPosition.xyz);
  vDistance = distance / (5.0 * uScale);
  gl_PointSize = uSize * aScale * (300.0 / -mvPosition.z) * (1.0 - vDistance);
  vRandomness = aRandomness;
  vTwinkleSpeed = aTwinkleSpeed; // Twinkle 속도 전달
}

  `,
  // 프래그먼트 셰이더
  `
uniform vec3 uColor;
uniform float uTime;
varying vec3 vRandomness;
varying float vDistance;
varying float vTwinkleSpeed; // Twinkle 속도 받기

void main() {
  float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
  float strength = 0.05 / distanceToCenter - 0.1;
  float fadeDistance = smoothstep(0.8, 1.0, vDistance);
  float twinkle = sin(uTime * vRandomness.x * vTwinkleSpeed) * 0.5 + 0.5; // Twinkle 속도 적용
  float alpha = strength * twinkle * (1.0 - fadeDistance);
  gl_FragColor = vec4(uColor, alpha);
}

  `,
)

extend({ GlowParticleMaterial })

/** WaveMaterial 셰이더를 React Three Fiber의 확장 요소로 등록 */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      glowParticleMaterial: ReactThreeFiber.Node<
        typeof GlowParticleMaterial & JSX.IntrinsicElements['shaderMaterial'] & GlowParticleUniforms,
        GlowParticleUniforms
      >
    }
  }
}

const TwinkleParticles = ({
  count = 1000,
  color = '#ffffff',
  minSpeed = 0.0001,
  maxSpeed = 0.0003,
  particleSize = 1,
  spaceSize = 10.0,
  minTwinkleSpeed = 0.5, // 새로운 속성
  maxTwinkleSpeed = 2.0, // 새로운 속성
}) => {
  const particles = useRef<any>(null!)
  const positionsAttribute = useRef<any>(null!)
  const scalesAttribute = useRef<any>(null!)
  const randomnessAttribute = useRef<any>(null!)
  const twinkleSpeedsAttribute = useRef<any>(null!) // Twinkle Speed Attribute 추가

  const [positions, velocities, scales, randomness, twinkleSpeeds] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    const scales = new Float32Array(count)
    const randomness = new Float32Array(count * 3)
    const twinkleSpeeds = new Float32Array(count) // Twinkle Speeds 추가
    for (let i = 0; i < count; i++) {
      // 큐브 내에서 무작위 위치 생성
      positions[i * 3] = (Math.random() - 0.5) * 2
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2

      // 완전히 랜덤한 방향의 속도 벡터 생성
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const speed = minSpeed + Math.random() * (maxSpeed - minSpeed)
      velocities[i * 3] = speed * Math.sin(phi) * Math.cos(theta)
      velocities[i * 3 + 1] = speed * Math.sin(phi) * Math.sin(theta)
      velocities[i * 3 + 2] = speed * Math.cos(phi)

      scales[i] = Math.random() * 0.5 + 0.5
      randomness[i * 3] = Math.random()
      randomness[i * 3 + 1] = Math.random()
      randomness[i * 3 + 2] = Math.random()

      // Twinkle 속도 설정
      twinkleSpeeds[i] = minTwinkleSpeed + Math.random() * (maxTwinkleSpeed - minTwinkleSpeed)
    }
    return [positions, velocities, scales, randomness, twinkleSpeeds]
  }, [count, minSpeed, maxSpeed, minTwinkleSpeed, maxTwinkleSpeed])

  useEffect(() => {
    if (particles.current) {
      positionsAttribute.current = new THREE.BufferAttribute(positions, 3)
      particles.current.geometry.setAttribute('position', positionsAttribute.current)
      scalesAttribute.current = new THREE.BufferAttribute(scales, 1)
      particles.current.geometry.setAttribute('aScale', scalesAttribute.current)
      randomnessAttribute.current = new THREE.BufferAttribute(randomness, 3)
      particles.current.geometry.setAttribute('aRandomness', randomnessAttribute.current)
      twinkleSpeedsAttribute.current = new THREE.BufferAttribute(twinkleSpeeds, 1) // Twinkle Speed Attribute 추가
      particles.current.geometry.setAttribute('aTwinkleSpeed', twinkleSpeedsAttribute.current)
    }
  }, [positions, scales, randomness, twinkleSpeeds])

  useFrame(({ clock }) => {
    if (positionsAttribute.current && particles.current.material) {
      const positions = positionsAttribute.current.array
      for (let i = 0; i < count; i++) {
        positions[i * 3] += velocities[i * 3]
        positions[i * 3 + 1] += velocities[i * 3 + 1]
        positions[i * 3 + 2] += velocities[i * 3 + 2]

        // 큐브 경계 검사
        for (let j = 0; j < 3; j++) {
          if (Math.abs(positions[i * 3 + j]) > 1) {
            positions[i * 3 + j] = Math.sign(positions[i * 3 + j]) * 0.99
            velocities[i * 3 + j] *= -1 // 방향 반전

            // 속도에 약간의 랜덤성 추가
            // velocities[i * 3 + j] += (Math.random() - 0.5) * 0.002;
            if (Math.abs(positions[i * 3 + j]) > 1) {
              positions[i * 3 + j] = Math.sign(positions[i * 3 + j]) * 0.99
              velocities[i * 3 + j] *= -1 // 방향 반전
            }
          }
        }
      }
      positionsAttribute.current.needsUpdate = true
      particles.current.material.uTime = clock.elapsedTime
      particles.current.material.uScale = spaceSize
    }
  })

  // @ts-ignore
  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute attach={'attributes-position'} count={count} array={positions} itemSize={3} />
        <bufferAttribute attach={'attributes-aScale'} count={count} array={scales} itemSize={1} />
        <bufferAttribute attach={'attributes-aRandomness'} count={count} array={randomness} itemSize={3} />
        <bufferAttribute
          attach={'attributes-aTwinkleSpeed'} // Twinkle Speed Attribute 연결
          count={count}
          array={twinkleSpeeds}
          itemSize={1}
        />
      </bufferGeometry>
      <glowParticleMaterial
        uColor={new THREE.Color(color)}
        uSize={particleSize}
        uScale={spaceSize}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default TwinkleParticles

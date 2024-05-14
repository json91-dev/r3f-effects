import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function RollingBall() {
  const { scene } = useThree()
  const meshRef = useRef<THREE.Mesh>(null!)

  useEffect(() => {
    scene.background = new THREE.Color('black')
  }, [])

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotateY(0.4)

      // meshRef.current.rotateZ(0.5)
    }
  })

  return (
    <>
      <mesh position={[0, 0, -1]} ref={meshRef}>
        <hemisphereLight args={['#fff', '#f00', 4]} />
        <directionalLight color={0xffffff} position={[1, 5, 0]} intensity={1} />
        <sphereGeometry args={[1, 32, 16]} />
        <meshStandardMaterial roughness={0.5} metalness={0.5} />
      </mesh>
    </>
  )
}

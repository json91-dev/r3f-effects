import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { useTexture } from '@react-three/drei'
import towerImg from '@static/images/intro.bg.tower.jpg'
import frag from '@src/pages/r3f/frag/flag.frag'
import vert from '@src/pages/r3f/frag/flag.vert'
import { useFrame } from '@react-three/fiber'

export default function Flag() {
  const groupRef = useRef(null)
  const [portalOpened, setPortalOpened] = useState(true)

  const map = useTexture(towerImg)
  const shaderRef = useRef(null!)

  const uniforms = useMemo(
    () => ({
      timeMsec: { value: 0.0 },
      noiseScale: { value: 0.1 },
      noiseStrength: { value: 0.4 },
      waveLength: { value: 0.1 },
      waveHeight: { value: 0.1 },
      uOpacity: { value: 1.0 },
      uTexture: { value: map },
    }),
    [],
  )

  useEffect(() => {
    if (portalOpened) return
  }, [portalOpened])

  useFrame((state) => {
    // @ts-ignore
    shaderRef.current.uniforms.timeMsec.value = state.clock.getElapsedTime() * 1000
  })

  return (
    <>
      <group name={'portal-group'} ref={groupRef} position={[0, 0, -2]}>
        <mesh position={[0, 0, -0.1]} scale={3}>
          <circleGeometry args={[0.5, 32]} />
          <shaderMaterial
            ref={shaderRef}
            fragmentShader={frag}
            vertexShader={vert}
            uniforms={uniforms}
            transparent={true}
            opacity={0.1}
          />
        </mesh>
      </group>
    </>
  )
}

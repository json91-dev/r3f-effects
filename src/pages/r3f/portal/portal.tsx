import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { useTexture } from '@react-three/drei'
import noiseTexture from '@static/images/texture.noise.png'
import frag from './portal.frag'
import vert from './portal.vert'
import { useFrame } from '@react-three/fiber'

export default function Flag() {
  const groupRef = useRef(null)
  const [portalOpened, setPortalOpened] = useState(true)

  const map = useTexture(noiseTexture)
  // refs
  const portalRef = useRef(null) // 포탈 메쉬 ref
  const shaderRef = useRef(null) // 포탈 쉐이더 머터리얼 ref

  /** 쉐이더 uniform 정의 */
  const uniforms = useMemo(
    () => ({
      timeMsec: { value: 0.0 },
      isPortalFinished: { value: 1.0 },
      uOpacity: { value: 0.8 },
      uTexture: { value: map },
      colorDelta: { value: 0.0 },
    }),
    [],
  )

  useFrame((state) => {
    // @ts-ignore
    shaderRef.current.uniforms.timeMsec.value = state.clock.getElapsedTime() * 1000
  })

  return (
    <Suspense fallback={null}>
      <group name={'portal-group'} ref={groupRef} position={[0, 0, -2]}>
        <mesh position={[0, 0, 0]} ref={portalRef} name='portal-outside' scale={2}>
          <planeGeometry args={[3, 3]} />
          <shaderMaterial
            ref={shaderRef}
            fragmentShader={frag}
            vertexShader={vert}
            uniforms={uniforms}
            transparent={true}
            opacity={0.1}
            depthWrite={false}
            depthTest={false}
          />
        </mesh>
      </group>
    </Suspense>
  )
}

import { useThree } from '@react-three/fiber'
import React, { Suspense, useEffect } from 'react'
import Box from '@src/components/Box.tsx'
export default function BoxPage() {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 0, 10)
  }, [])

  return (
    <Suspense fallback={null}>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Suspense>
  )
}

import { Canvas, SceneProps } from '@react-three/fiber'
import { Outlet } from 'react-router-dom'
export default function ArCanvasLayout() {
  return (
    <div className={'h-full'} style={{ backgroundColor: 'black' }}>
      <Canvas dpr={[1, 1.5]}>
        <Outlet />
      </Canvas>
    </div>
  )
}

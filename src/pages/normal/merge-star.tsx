import starModel from '@static/models/star.merge.glb'
import { Environment, useGLTF } from '@react-three/drei'
import { useLayoutEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import * as THREE from 'three'
import { Group } from 'three'
import { randomNumBetween } from '@src/utils/utils.tsx'
import gsap from 'gsap'
import { degToRad, radToDeg } from 'three/src/math/MathUtils'
useGLTF.preload(starModel)

export default function MergeStarPage() {
  const { nodes, materials, scene }: any = useGLTF(starModel)
  const fractsRef = useRef<any>(null!)
  useLayoutEffect(() => {
    materials['Material.001'].metalness = 0
    materials['Material.001'].roughness = 0
    materials['Material.001'].transparent = true
    materials['Material.001'].opacity = 0.5
    materials['Material.001'].envMapIntensity = 1.5
    materials['Material.001'].depthWrite = false
  }, [])

  const tl = gsap.timeline({
    delay: 1,
    repeat: -1,
    repeatDelay: 2,

    onRepeat: () => {
      if (fractsRef.current) {
        fractsRef.current.children.forEach((mesh) => {
          mesh.position.set(0, 0, 0)
          mesh.material.opacity = 1
        })
      }
    },
  })

  useGSAP(() => {
    fractsRef.current.children.forEach((mesh: any, index: number) => {
      mesh.meshWorldPosition = new THREE.Vector3()
      mesh.getWorldPosition(mesh.meshWorldPosition)
      mesh.directionVector = mesh.meshWorldPosition
        .clone()
        .sub(new THREE.Vector3(0, 0, 0))
        .normalize()
      mesh.directionVector
        .add(new THREE.Vector3(randomNumBetween(-0.6, 0.6), randomNumBetween(-0.6, 0.6), randomNumBetween(-0.6, 0.6)))
        .normalize()
      mesh.destination = mesh.directionVector.multiplyScalar(15)

      tl.to(mesh.position, { ...mesh.destination, duration: 3, ease: 'power1.out' }, index === 0 ? '>' : '<')
      tl.to(mesh.material, { opacity: 0, duration: 3, ease: 'power1.in' }, '<')
    })

    // 모든 애니메이션이 끝난 후 원본 상태로 복귀하는 애니메이션 추가
    fractsRef.current.children.forEach((mesh) => {
      tl.to(mesh.position, { x: 0, y: 0, z: 0, duration: 0, immediateRender: false }, '+=0') // 1초 대기 후 복귀
      tl.to(mesh.material, { opacity: 1, duration: 0, immediateRender: false }, '-=0') // 복귀 시 불투명도 설정
    })
  }, [])

  return (
    <group position={[0, 0, 0]} rotation={[degToRad(90), 0, 0]}>
      <ambientLight intensity={1.5} color='#fff' />
      <Environment preset='forest' blur={100} />
      <group ref={fractsRef}>
        <mesh
          geometry={nodes.Circle001.geometry}
          material={materials['Material.001']}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
        />
        <mesh
          geometry={nodes.Circle002.geometry}
          material={materials['Material.001']}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
        />
        <mesh
          geometry={nodes.Circle003.geometry}
          material={materials['Material.001']}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
        />
        <mesh
          geometry={nodes.Circle004.geometry}
          material={materials['Material.001']}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
        />
        <mesh
          geometry={nodes.Circle005.geometry}
          material={materials['Material.001']}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
        />
      </group>
    </group>
  )
}

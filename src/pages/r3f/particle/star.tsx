import starParticleTexture from '@static/images/star.particle.origin.png'
import starModel from '@static/models/star.glb'
import { Environment, useGLTF, useTexture } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { dtr, randomIntBetween, randomNumBetween } from '@src/utils/utils.tsx'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'

const count = 100 // 파티클 갯수
export default function StarParticles() {
  const { scene: modelScene }: any = useGLTF(starModel)
  const { scene } = useThree()
  const texture: any = useTexture(starParticleTexture)
  const groupRef = useRef<THREE.Group>(null!)
  const instances = useRef<Star[]>([])

  useEffect(() => {
    scene.background = new THREE.Color('black')

    for (let i = 0; i < count; i++) {
      const particleInstance = new Star(texture)

      const mesh = particleInstance.create()
      groupRef.current.add(mesh)
      instances.current.push(particleInstance)
    }

    return () => {
      instances.current.forEach((instance) => instance.dispose())
      instances.current = []
    }
  }, [])

  /** 매프레임마다 파티클 애니메이션 */
  useFrame(() => {
    instances.current.forEach((instance) => {
      instance.update()
      if (instance.isOutside()) {
        instance.setRandomPosition()
      }
    })
  })

  return (
    <group>
      <ambientLight intensity={1.5} color='#fff' />
      <Environment preset='forest' blur={100} />
      <group ref={groupRef} rotation={[dtr(90), 0, 0]} position={[0, 0, 0]} />
      <primitive object={modelScene} position={[0, 0, 1]} scale={[1, 1, 1]} />
    </group>
  )
}

class Star {
  texture: THREE.Texture
  colors: string[]
  blinkAlphaDeg: number
  deg: number
  radius: number
  radiusVel: number
  mesh?: THREE.Sprite

  /** 초기 파티클 값 구현 **/
  constructor(texture: THREE.Texture) {
    this.texture = texture // 텍스쳐
    this.colors = ['#DCD157', '#DCD157', '#F3DC2D', '#F3DC2D'] // 택스쳐 색상
    this.blinkAlphaDeg = randomIntBetween(0, 360) // 깜박거리게 만드는 범위지정시 사용되는 삼각함수 각도
    this.deg = randomIntBetween(0, 360) // x, y 위치를 정하기 위한 값
    this.radius = randomNumBetween(0.3, 0.4)
    this.radiusVel = randomNumBetween(0.985, 0.99)
  }

  /** 맨 처음 파티클 값 생성시 **/
  create() {
    const material = new THREE.SpriteMaterial({
      map: this.texture,
      color: this.colors[randomIntBetween(0, this.colors.length - 1)],
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 1,
      depthTest: true,
      rotation: (Math.PI / 180) * randomIntBetween(0, 360),
    })

    this.mesh = new THREE.Sprite(material)
    this.mesh.scale.setScalar(randomNumBetween(0.1, 0.14))

    const x = Math.cos((Math.PI / 180) * this.deg) * this.radius
    const y = Math.sin((Math.PI / 180) * this.deg) * this.radius
    const z = randomNumBetween(0, 3)
    this.mesh.position.set(x, y, z)

    return this.mesh
  }

  setRandomPosition() {
    this.deg = randomIntBetween(0, 360)
    this.radius = randomNumBetween(0.3, 0.4)
    this.radiusVel = randomNumBetween(0.99, 0.999)
    const x = Math.cos((Math.PI / 180) * this.deg) * this.radius
    const y = Math.sin((Math.PI / 180) * this.deg) * this.radius
    const z = 0
    this.mesh?.position.set(x, y, z)

    if (this.mesh?.material.opacity) {
      this.mesh.material.opacity = 1
    }
  }

  dispose() {
    if (this.mesh) {
      this.mesh.geometry.dispose()
      this.mesh.material.dispose()
    }
  }
  update() {
    if (this.mesh) {
      this.mesh.position.z += 0.03
      this.blinkAlphaDeg += 3
      this.mesh.material.opacity = 0.6 + 0.4 * Math.sin((this.blinkAlphaDeg * Math.PI) / 180)
    }
  }
  isOutside() {
    if (!this.mesh) return false
    return this.mesh.position.z > 3
  }
}

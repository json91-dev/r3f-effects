import starParticleTexture from '@static/images/star.particle.png'
import { useTexture } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { dtr, randomIntBetween, randomNumBetween } from '@src/utils/utils.tsx'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

const count = 100 // 파티클 갯수
export default function StarParticles() {
  const texture: any = useTexture(starParticleTexture)

  const groupRef = useRef<THREE.Group>(null!)
  const instances = useRef<Particle[]>([])

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      const particleInstance = new Particle(texture)

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
      if (instance.isCenter()) {
        instance.setRandomPosition()
      }
    })
  })

  return <group ref={groupRef} rotation={[dtr(-40), 0, 0]} position={[0, -0.15, 0]} />
}

class Particle {
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
    this.colors = ['#ffbee4', '#ff81ef', '#ff93c3', '#ab87ff'] // 택스쳐 색상
    this.blinkAlphaDeg = randomIntBetween(0, 360) // 깜박거리게 만드는 범위지정시 사용되는 삼각함수 각도
    this.deg = randomIntBetween(0, 360) // x, y 위치를 정하기 위한 값
    this.radius = randomNumBetween(0, 1)
    this.radiusVel = randomNumBetween(0.985, 0.99)
  }

  create() {
    const material = new THREE.SpriteMaterial({
      map: this.texture,
      color: this.colors[randomIntBetween(0, this.colors.length - 1)],
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 1,
      depthTest: false,
      rotation: (Math.PI / 180) * randomIntBetween(0, 360),
    })

    this.mesh = new THREE.Sprite(material)
    this.mesh.scale.setScalar(randomNumBetween(0.05, 0.07))
    this.setRandomPosition()

    const x = Math.cos((Math.PI / 180) * this.deg) * this.radius
    const y = Math.sin((Math.PI / 180) * this.deg) * this.radius
    const z = randomNumBetween(0, 1)
    this.mesh.position.set(x, y, z)
    return this.mesh
  }

  setRandomPosition() {
    this.deg = randomIntBetween(0, 360)
    this.radius = randomNumBetween(1.3, 1.4)
    this.radiusVel = randomNumBetween(0.99, 0.999)
    const x = Math.cos((Math.PI / 180) * this.deg) * this.radius
    const y = Math.sin((Math.PI / 180) * this.deg) * this.radius
    const z = 2.2
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
      this.radiusVel -= 0.00001
      this.radius *= this.radiusVel * 0.999
      this.mesh.position.x = Math.cos((Math.PI / 180) * this.deg) * this.radius * this.radius
      this.mesh.position.y = Math.sin((Math.PI / 180) * this.deg) * this.radius * this.radius
      this.mesh.position.z *= this.radiusVel
      this.blinkAlphaDeg += 3
      this.mesh.material.opacity = 0.6 + 0.4 * Math.sin((this.blinkAlphaDeg * Math.PI) / 180)
    }
  }
  isCenter() {
    if (!this.mesh) return false
    return this.mesh.position.z <= 0.08
  }
}

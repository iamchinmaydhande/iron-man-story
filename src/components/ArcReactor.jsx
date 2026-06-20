import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Torus, Sphere } from '@react-three/drei'
import * as THREE from 'three'

function ReactorCore() {
  const outerRing = useRef()
  const middleRing = useRef()
  const innerRing = useRef()
  const core = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (outerRing.current)  outerRing.current.rotation.z  =  t * 0.4
    if (middleRing.current) middleRing.current.rotation.z = -t * 0.7
    if (innerRing.current)  innerRing.current.rotation.z  =  t * 1.1
    if (core.current) {
      const pulse = 1 + Math.sin(t * 2) * 0.08
      core.current.scale.set(pulse, pulse, pulse)
    }
  })

  return (
    <>
      {/* Outer ring */}
      <Torus ref={outerRing} args={[2.2, 0.08, 16, 80]}>
        <meshStandardMaterial color="#00bfff" emissive="#00bfff" emissiveIntensity={2} />
      </Torus>

      {/* Middle ring */}
      <Torus ref={middleRing} args={[1.6, 0.06, 16, 80]}>
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={2.5} />
      </Torus>

      {/* Inner ring */}
      <Torus ref={innerRing} args={[1.0, 0.05, 16, 80]} rotation={[Math.PI / 4, 0, 0]}>
        <meshStandardMaterial color="#7df9ff" emissive="#7df9ff" emissiveIntensity={3} />
      </Torus>

      {/* Core sphere */}
      <Sphere ref={core} args={[0.35, 32, 32]}>
        <meshStandardMaterial color="#ffffff" emissive="#00cfff" emissiveIntensity={4} />
      </Sphere>

      {/* Glow light */}
      <pointLight color="#00bfff" intensity={6} distance={8} />
      <ambientLight intensity={0.1} />
    </>
  )
}

export default function ArcReactor() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ReactorCore />
      </Canvas>
    </div>
  )
}
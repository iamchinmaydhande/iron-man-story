import { useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 13000

function ParticleSystem({ colorRef }) {
  const pointsRef = useRef()
  const mouse = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

  const positions = useRef()
  const basePositions = useRef()
  const speeds = useRef()

  if (!positions.current) {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    const base = new Float32Array(PARTICLE_COUNT * 3)
    const spd = new Float32Array(PARTICLE_COUNT)
    // INSIDE ParticleSystem function
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 30  // Spread slightly wider
      
      // 🚨 THE FIX: Start slightly above the camera (+10), 
      // and distribute them deep into the negative space (-120)
      const y = 10 - Math.random() * 130 
      
      const z = (Math.random() - 0.5) * 15
      
      pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = z
      base[i * 3] = x; base[i * 3 + 1] = y; base[i * 3 + 2] = z
      spd[i] = 0.2 + Math.random() * 0.6
    }
    positions.current = pos
    basePositions.current = base
    speeds.current = spd
  }

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const pos = pointsRef.current.geometry.attributes.position.array
    const base = basePositions.current
    const spd = speeds.current

    const mx = mouse.current.x * 6
   const my = (mouse.current.y * 8) + state.camera.position.y

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3
      const iy = i * 3 + 1
      const iz = i * 3 + 2

      const driftX = base[ix] + Math.sin(t * spd[i] + i) * 0.3
      const driftY = base[iy] + Math.cos(t * spd[i] * 0.8 + i) * 0.3

      const dx = driftX - mx
      const dy = driftY - my
      const dist = Math.sqrt(dx * dx + dy * dy)
      const force = Math.max(0, 1 - dist / 3)

      pos[ix] = driftX + (dx / (dist || 1)) * force * 1.5
      pos[iy] = driftY + (dy / (dist || 1)) * force * 1.5
      pos[iz] = base[iz]
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.rotation.y = t * 0.02

    if (pointsRef.current.material && colorRef.current) {
      pointsRef.current.material.color.lerp(
        new THREE.Color(colorRef.current), 0.02
      )
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#00bfff"
        transparent
        opacity={0.65}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function ScrollCamera() {
  const { camera } = useThree()
  const scrollProgress = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight
      scrollProgress.current = max > 0 ? window.scrollY / max : 0
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // INSIDE ScrollCamera function
  useFrame(() => {
    // 🚨 CHANGED from 26 to 100 so the camera drops all the way through the new field
    camera.position.y = -scrollProgress.current * 100 
    camera.position.z = 9 + Math.sin(scrollProgress.current * Math.PI) * 1.5
  })

  return null
}

export default function WebGLBackground({ colorRef }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0,
      width: '100vw', height: '100vh',
      
      // 1. Keep it on top so it never gets hidden by your layout
      zIndex: 9999, 
      
      // 2. Let the mouse click right through it
      pointerEvents: 'none', 
      
      // 3. THE MAGIC: This makes the empty space invisible, but keeps the glowing dots!
      mixBlendMode: 'screen', 
    }}>
      <Canvas camera={{ position: [0, 0, 9], fov: 60 }} style={{ pointerEvents: 'none' }}>
        <ScrollCamera />
        <ParticleSystem colorRef={colorRef} />
        <ambientLight intensity={0.2} />
      </Canvas>
    </div>
  )
}
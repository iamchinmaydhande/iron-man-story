import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Grid, Sparkles } from '@react-three/drei'
import IronManModel from './IronManModel'

export default function HeroModelStage() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 50 }} style={{ pointerEvents: 'none' }}>
      <Suspense fallback={null}>
        
        {/* 🚨 DIMMED ENVIRONMENT: Dropped intensity to 0.3 so the armor is darker 
            and our custom lights can actually be seen reflecting off the metal. */}
        <Environment preset="city" intensity={0.3} />

        {/* ── STANDARD LIGHTING ── */}
        <ambientLight intensity={1} />
        <directionalLight position={[5, 8, 5]} intensity={2} color="#ffffff" />
        <spotLight position={[-4, 2, -3]} angle={0.6} intensity={4} color="#fbbf24" />

        {/* 🚨 CINEMATIC RIM LIGHTS 
            Positioned off-axis. Because the environment is now dim, 
            these intense blue lights will catch the edges of his armor perfectly. */}
        <directionalLight position={[-6, 6, -5]} intensity={8} color="#00bfff" />
        <directionalLight position={[6, -4, -5]} intensity={8} color="#00bfff" />

        {/* ── HOLOGRAPHIC FLOOR & PARTICLES ── */}
        <Grid 
          position={[0, -2.5, 0]} args={[30, 30]} 
          cellSize={0.5} cellThickness={1} cellColor="#00bfff" 
          sectionSize={2.5} sectionThickness={1.5} sectionColor="#00bfff" 
          fadeDistance={15} fadeStrength={1.5} 
        />
        <Sparkles count={100} scale={15} size={4} speed={0.4} opacity={0.3} color="#00bfff" />

        <IronManModel />
      </Suspense>
    </Canvas>
  )
}
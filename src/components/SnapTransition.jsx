import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SnapTransition() {
  const containerRef = useRef()
  const particlesRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      )
      particlesRef.current.forEach((p, i) => {
        if (!p) return
        gsap.fromTo(p,
          { x: 0, y: 0, opacity: 1, scale: 1 },
          {
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 300,
            opacity: 0,
            scale: 0,
            duration: 1.5 + Math.random(),
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
            delay: i * 0.015,
          }
        )
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        opacity: 0,
      }}
    >
      {/* Particle grid that dissolves */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'grid',
        gridTemplateColumns: 'repeat(30, 1fr)',
        gridTemplateRows: 'repeat(8, 1fr)',
        gap: 2,
      }}>
        {Array.from({ length: 240 }).map((_, i) => (
          <div
            key={i}
            ref={el => particlesRef.current[i] = el}
            style={{
              borderRadius: 2,
              background: `hsl(${190 + Math.random() * 40}, 80%, ${40 + Math.random() * 30}%)`,
              opacity: 0.6 + Math.random() * 0.4,
            }}
          />
        ))}
      </div>

      {/* Center text */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <p style={{
          fontSize: 11, letterSpacing: '0.4em',
          color: '#7c3aed', textTransform: 'uppercase',
          marginBottom: 8,
        }}>
          Avengers: Infinity War · 2018
        </p>
        <p style={{
          fontSize: 28, fontWeight: 900, color: '#fff',
          textShadow: '0 0 40px #7c3aed',
        }}>
          "Mr. Stark, I don't feel so good."
        </p>
      </div>
    </div>
  )
}
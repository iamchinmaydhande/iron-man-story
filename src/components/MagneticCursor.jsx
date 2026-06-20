// src/components/MagneticCursor.jsx
import { useEffect, useRef } from 'react'

export default function MagneticCursor() {
  const dotRef = useRef()
  const ringRef = useRef()
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const hovering = useRef(false)
  const raf = useRef()

  useEffect(() => {
    const onMove = (e) => { pos.current = { x: e.clientX, y: e.clientY } }
    
    // Listen to the window, not the div
    window.addEventListener('mousemove', onMove)

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12
      
      if (dotRef.current) dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`
      if (ringRef.current) ringRef.current.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px) scale(${hovering.current ? 2.2 : 1})`
      
      raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    // 🚨 pointer-events: none here ensures clicks pass through the cursor layer
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999, pointerEvents: 'none' }}>
      <div ref={dotRef} style={{ position: 'fixed', width: 8, height: 8, borderRadius: '50%', background: '#00bfff', boxShadow: '0 0 10px #00bfff' }} />
      <div ref={ringRef} style={{ position: 'fixed', width: 40, height: 40, borderRadius: '50%', border: '1px solid #00bfff88' }} />
    </div>
  )
}
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ParallaxImage({ src, alt, accentColor, speed = 0.3, label = '' }) {
  const wrapRef = useRef()
  const imgRef  = useRef()

  useEffect(() => {
    gsap.to(imgRef.current, {
      yPercent: speed * 40,
      ease: 'none',
      scrollTrigger: {
        trigger: wrapRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    })
  }, [speed])

  return (
    <div ref={wrapRef} style={{
      position: 'relative', overflow: 'hidden',
      borderRadius: 16, maxHeight: 480,
      border: `1px solid ${accentColor}33`,
      boxShadow: `0 0 80px ${accentColor}22`,
    }}>
      <HUDOverlay color={accentColor} label={label} />
      <img
        ref={imgRef}
        src={src} alt={alt}
        style={{
          width: '100%', height: '130%',
          objectFit: 'cover', objectPosition: 'top',
          display: 'block', willChange: 'transform',
        }}
      />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
        background: 'linear-gradient(to top, #000000ee, transparent)',
      }} />
      {alt && (
        <p style={{
          position: 'absolute', bottom: 12, left: 20,
          fontSize: 10, letterSpacing: '0.2em',
          color: accentColor + 'cc', textTransform: 'uppercase',
        }}>{alt}</p>
      )}
    </div>
  )
}

function HUDOverlay({ color, label }) {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5 }}>
      <div style={{
        position: 'absolute', left: 0, right: 0, height: 1,
        background: `linear-gradient(to right, transparent, ${color}66, transparent)`,
        animation: 'scanline 4s linear infinite',
      }} />
      {['tl','tr','bl','br'].map(pos => (
        <div key={pos} className={`hud-corner ${pos}`} style={{ color }} />
      ))}
      {label && (
        <div style={{
          position: 'absolute', bottom: 12, left: 16,
          fontSize: 9, letterSpacing: '0.25em',
          color: color + '99', textTransform: 'uppercase',
          animation: 'hudpulse 2s ease-in-out infinite',
        }}>{label}</div>
      )}
      <div style={{
        position: 'absolute', top: 12, right: 16,
        fontSize: 9, color: color + '66',
        letterSpacing: '0.15em', textAlign: 'right', lineHeight: 1.8,
      }}>
        <div>SYS: ONLINE</div>
        <div>PWR: 100%</div>
      </div>
    </div>
  )
}
import { useRef } from 'react'

export default function TiltCard({ children, accentColor, className = '', style = {} }) {
  const cardRef = useRef()

  const handleMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotX = ((y - cy) / cy) * -12
    const rotY = ((x - cx) / cx) * 12
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`
  }

  const handleLeave = () => {
    if (cardRef.current)
      cardRef.current.style.transform =
        'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
  }

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transition: 'transform 0.15s ease-out',
        borderRadius: 16,
        overflow: 'hidden',
        border: `1px solid ${accentColor}33`,
        boxShadow: `0 0 40px ${accentColor}22`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
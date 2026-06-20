import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&'

export default function ScrambleTitle({ text, color = '#ffffff', className = '', style = {} }) {
  const [display, setDisplay] = useState(text)
  const ref        = useRef()
  const frameRef   = useRef()
  const hasRun     = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasRun.current) {
        hasRun.current = true
        scramble()
      }
    }, { threshold: 0.3 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [text])

  const scramble = () => {
    let iteration = 0
    const total = text.length * 5
    clearInterval(frameRef.current)
    frameRef.current = setInterval(() => {
      setDisplay(
        text.split('').map((char, i) => {
          if (char === ' ') return ' '
          if (i < iteration / 5) return char
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join('')
      )
      iteration++
      if (iteration >= total) {
        clearInterval(frameRef.current)
        setDisplay(text)
      }
    }, 30)
  }

  return (
    <span
      ref={ref}
      className={className}
      style={{ color, fontFamily: 'monospace', ...style }}
      onMouseEnter={scramble}
    >
      {display}
    </span>
  )
}
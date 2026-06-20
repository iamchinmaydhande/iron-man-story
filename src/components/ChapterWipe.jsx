import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ChapterWipe({ color }) {
  const wipeRef = useRef()

  useEffect(() => {
    gsap.fromTo(wipeRef.current,
      { scaleX: 1, transformOrigin: 'left center' },
      {
        scaleX: 0,
        duration: 0.8,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: wipeRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    )
  }, [])

  return (
    <div ref={wipeRef} style={{
      height: 3,
      width: '100%',
      background: `linear-gradient(to right, ${color}, ${color}00)`,
      margin: '0 0 0 0',
      transformOrigin: 'left center',
    }} />
  )
}
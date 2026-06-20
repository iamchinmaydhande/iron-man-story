import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const YEARS = ['2008','2010','2012','2013','2015','2016','2017','2018','2019']

export default function TimelineScrubber() {
  const lineRef = useRef()
  const dotRef  = useRef()

  useEffect(() => {
    gsap.to(lineRef.current, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      }
    })
  }, [])

  return (
    <div style={{
      position: 'fixed', right: 24, top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 100, display: 'flex', flexDirection: 'column',
      alignItems: 'center', gap: 0,
      height: '60vh',
    }}>
      {/* Track */}
      <div style={{
        position: 'absolute', top: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: 1, height: '100%',
        background: '#ffffff15',
      }} />
      {/* Fill */}
      <div ref={lineRef} style={{
        position: 'absolute', top: 0, left: '50%',
        transform: 'translateX(-50%) scaleY(0)',
        transformOrigin: 'top center',
        width: 1, height: '100%',
        background: 'linear-gradient(to bottom, #00bfff, #fbbf24)',
      }} />
      {/* Year dots */}
      {YEARS.map((yr, i) => (
        <div key={yr} style={{
          position: 'absolute',
          top: `${(i / (YEARS.length - 1)) * 100}%`,
          left: '50%', transform: 'translate(-50%, -50%)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <div style={{
            width: 5, height: 5, borderRadius: '50%',
            background: '#00bfff', boxShadow: '0 0 8px #00bfff',
          }} />
          <span style={{
            fontSize: 9, color: '#ffffff44',
            letterSpacing: '0.1em', whiteSpace: 'nowrap',
          }}>{yr}</span>
        </div>
      ))}
    </div>
  )
}
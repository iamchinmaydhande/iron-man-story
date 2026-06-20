import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function StoryLine({ lines = [], accentColor = '#00bfff' }) {
  const refs = useRef([])

  useEffect(() => {
    refs.current.forEach((el, i) => {
      if (!el) return
      gsap.fromTo(el,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
          delay: i * 0.08,
        }
      )
    })
  }, [])

  const handleEnter = (e) => {
    gsap.to(e.currentTarget, {
      color: '#ffffff',
      textShadow: `0 0 16px ${accentColor}, 0 0 32px ${accentColor}aa`,
      borderLeftColor: accentColor,
      x: 8,
      duration: 0.35,
      ease: 'power2.out',
    })
  }

  const handleLeave = (e) => {
    gsap.to(e.currentTarget, {
      color: '#d1d5db',
      textShadow: '0 0 0px transparent',
      borderLeftColor: accentColor + '55',
      x: 0,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  return (
    <div className="max-w-2xl mx-auto px-8 pb-32 space-y-8">
      {lines.map((line, i) => (
        <p
          key={i}
          ref={el => refs.current[i] = el}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          className="text-lg md:text-xl font-light leading-relaxed opacity-0 cursor-pointer"
          style={{
            color: '#d1d5db',
            borderLeft: `2px solid ${accentColor}55`,
            paddingLeft: '1.5rem',
            transition: 'none',
          }}
        >
          {line}
        </p>
      ))}
    </div>
  )
}
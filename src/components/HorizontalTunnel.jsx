import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HorizontalTunnel({ children }) {
  const containerRef = useRef()
  const trackRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      
      // Calculate total scroll distance based on how many cards are in the track
      const scrollDistance = track.scrollWidth - window.innerWidth + 128 

      gsap.to(track, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "center center", 
          end: `+=${scrollDistance}`, // Scroll duration maps 1:1 with track length
        }
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="w-full overflow-hidden my-16 bg-black/40 py-16 border-y border-gray-800">
      <div ref={trackRef} className="flex gap-8 px-16 w-max items-center">
        {children}
      </div>
    </div>
  )
}
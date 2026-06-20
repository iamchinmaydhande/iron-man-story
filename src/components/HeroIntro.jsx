import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import HeroModelStage from './HeroModelStage'
import ParticleField from './ParticleField'

export default function HeroIntro() {
  const titleRef = useRef()
  const subtitleRef = useRef()
  const scrollRef = useRef()

  useEffect(() => {
    const letters = titleRef.current.querySelectorAll('.letter')
    gsap.fromTo(letters,
      { y: 120, rotateX: -90, opacity: 0 },
      { y: 0, rotateX: 0, opacity: 1, duration: 0.9, ease: 'back.out(1.5)', stagger: 0.06, delay: 0.3 }
    )
    gsap.fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2, delay: 1.2 }
    )
    gsap.fromTo(scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 2 }
    )
  }, [])

  const title = 'TONY STARK'

  return (
    <section style={{
      position: 'relative', width: '100%', height: '100vh',
      overflow: 'hidden', background: '#000',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Starfield, behind everything */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <ParticleField color="#00bfff" count={70} />
      </div>

      {/* 🚨 NEW: THE REACTOR GLOW 
          This creates a massive, soft blue aura directly in the center of the screen, 
          sitting behind the 3D model to simulate volumetric backlighting. */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw', height: '80vw', maxWidth: '800px', maxHeight: '800px',
        background: 'radial-gradient(circle, rgba(0, 191, 255, 0.15) 0%, rgba(0, 0, 0, 0) 60%)',
        zIndex: 0, pointerEvents: 'none'
      }} />

      {/* Title block — fixed height, top of section, NOT overlapping model */}
      <div style={{
        position: 'relative', zIndex: 2,
        height: '22vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <div
          ref={titleRef}
          style={{ perspective: 800, overflow: 'hidden', display: 'flex', gap: 4 }}
        >
          {title.split('').map((ch, i) => (
            <span
              key={i}
              className="letter"
              style={{
                display: 'inline-block',
                fontSize: 'clamp(36px, 7vw, 80px)',
                fontWeight: 900,
                color: ch === ' ' ? 'transparent' : '#fff',
                width: ch === ' ' ? 18 : 'auto',
                textShadow: '0 0 40px #00bfff88, 0 0 80px #00bfff33',
                letterSpacing: '0.05em',
                lineHeight: 1,
              }}
            >
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          ))}
        </div>

        <p
          ref={subtitleRef}
          style={{
            marginTop: 14, color: '#00bfff', letterSpacing: '0.4em',
            fontSize: 11, textTransform: 'uppercase', opacity: 0,
          }}
        >
          A Legacy in Nine Acts · 2008 — 2019
        </p>
      </div>

      {/* Model block — takes remaining space below the title 
      <div style={{
        position: 'relative', zIndex: 1,
        flex: 1,
        width: '100%',
        pointerEvents: 'none', // 🚨 ADD THIS LINE
      }}>
        <HeroModelStage />
      </div>   */}

      {/* Model block — takes remaining space below the title */}
      <div style={{
        position: 'relative', zIndex: 1,
        flex: 1,
        width: '100%',
        /* 🚨 THE FIX: Forces the 3D Canvas to stop 80px before the bottom of the screen */
        paddingBottom: '80px', 
        pointerEvents: 'none',
      }}>
        <HeroModelStage />
      </div>




      {/* Scroll cue, fixed at bottom 
      <div
        ref={scrollRef}
        style={{
          position: 'absolute', bottom: 4, left: 0, right: 0,
          zIndex: 2, display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 8, opacity: 0,
          animation: 'float 3s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      >
        <span style={{ color: '#00bfff88', fontSize: 10, letterSpacing: '0.3em' }}>
          SCROLL TO BEGIN
        </span>
        <div style={{ width: 1, height: 20, background: '#00bfff44' }} />
      </div> */}


      {/* Scroll cue, pinned to the absolute floor */}
      <div
        ref={scrollRef}
        style={{
          position: 'absolute', 
          bottom: 0, /* 🚨 Forces the container to the literal 0px bottom edge */
          left: 0, right: 0,
          zIndex: 2, display: 'flex', flexDirection: 'column',
          alignItems: 'center', 
          gap: 4, /* 🚨 Reduced from 8 to pack the text and line tighter together */
          opacity: 0,
          animation: 'float 3s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      >
        <span style={{ color: '#00bfff88', fontSize: 10, letterSpacing: '0.3em' }}>
          SCROLL TO BEGIN
        </span>
        {/* 🚨 Shrunk the line down to 12px so it barely takes up any height */ }
        <div style={{ width: 1, height: 12, background: '#00bfff44' }} />
      </div>
    </section>
  )
}
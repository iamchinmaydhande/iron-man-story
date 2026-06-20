import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ParticleField from './ParticleField'
import ScrambleTitle from './ScrambleTitle'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { label: 'Suits Built',        value: '85+' },
  { label: 'Lives Saved',        value: '∞'   },
  { label: 'Years as Iron Man',  value: '11'  },
  { label: 'Infinity Stones',    value: '6'   },
]

// Ensure you pass your img object down or import it if the video path is here
// For simplicity, hardcode the path here since it's just one video
const egLoveVideo = '/src/assets/endgame/i_love_you_3000.mp4'

export default function LegacySection() {
  const statsRef = useRef([])
  const quoteRef = useRef()

  useEffect(() => {
    statsRef.current.forEach((el, i) => {
      if (!el) return
      gsap.fromTo(el,
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7, ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          delay: i * 0.1,
        }
      )
    })

    gsap.fromTo(quoteRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1.2,
        scrollTrigger: {
          trigger: quoteRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    )
  }, [])

  return (
    <section style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'transparent',  // <-- CHANGED THIS
      padding: '80px 32px',
      overflow: 'hidden',
    }}>


      <ParticleField color="#fbbf24" count={50} />

      {/* Glow */}
      <div style={{
        position: 'absolute', top: '40%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, #fbbf2412 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <p style={{
        fontSize: 10, letterSpacing: '0.4em',
        color: '#fbbf2466', textTransform: 'uppercase',
        marginBottom: 24,
      }}>
        In Memoriam · Anthony Edward Stark
      </p>

      <ScrambleTitle
        text="I LOVE YOU 3000"
        color="#fbbf24"
        style={{
          fontSize: 'clamp(36px, 7vw, 80px)',
          fontWeight: 900,
          textShadow: '0 0 40px #fbbf24, 0 0 80px #fbbf2444',
          display: 'block',
          textAlign: 'center',
          marginBottom: 48,
          letterSpacing: '0.05em',
        }}
      />

      {/* OUR PRESERVED VIDEO PLAYER */}
      <div className="relative z-10 rounded-xl overflow-hidden w-full md:w-3/4 mb-16 bg-black flex items-center justify-center"
        style={{ border: `1px solid #fbbf2455`, boxShadow: `0 0 60px #fbbf2433` }}>
        <video 
          src={egLoveVideo} 
          controls 
          playsInline 
          className="w-full aspect-video object-cover object-center" 
        />
      </div>

      {/* Stats grid */}
      <div className="relative z-10" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 16,
        maxWidth: 700,
        width: '100%',
        marginBottom: 64,
      }}>
        {stats.map((s, i) => (
          <div
            key={s.label}
            ref={el => statsRef.current[i] = el}
            style={{
              background: '#fbbf2408',
              border: '1px solid #fbbf2422',
              borderRadius: 12,
              padding: '20px 12px',
              textAlign: 'center',
              opacity: 0,
            }}
          >
            <div style={{
              fontSize: 32, fontWeight: 900,
              color: '#fbbf24',
              textShadow: '0 0 20px #fbbf24',
              lineHeight: 1,
            }}>{s.value}</div>
            <div style={{
              fontSize: 10, color: '#fbbf2466',
              letterSpacing: '0.15em', marginTop: 8,
              textTransform: 'uppercase',
            }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Final quote */}
      <div ref={quoteRef} className="relative z-10" style={{
        maxWidth: 560, textAlign: 'center', opacity: 0,
      }}>
        <p style={{
          color: '#9ca3af', fontSize: 18,
          fontWeight: 300, lineHeight: 1.8,
          marginBottom: 32,
        }}>
          Genius. Billionaire. Playboy. Philanthropist.
          <br />Husband. Father. Hero.
          <br /><br />
          He didn't become Iron Man because he had a suit.
          <br />He became Iron Man because he refused to look away.
        </p>
        <div style={{ width: 1, height: 60, background: '#fbbf2433', margin: '0 auto' }} />
        <p style={{
          marginTop: 20, fontSize: 10,
          letterSpacing: '0.3em', color: '#fbbf2444',
          textTransform: 'uppercase',
        }}>2008 — 2019</p>
      </div>
    </section>
  )
}
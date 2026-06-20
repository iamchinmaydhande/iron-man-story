import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ParticleField from './ParticleField'
import StoryLine from './StoryLine'
import TiltCard from './TiltCard'
import ScrambleTitle from './ScrambleTitle'
import ChapterWipe from './ChapterWipe'
import SnapTransition from './SnapTransition'
import HUDOverlay from './HUDOverlay'
import HorizontalTunnel from './HorizontalTunnel'

gsap.registerPlugin(ScrollTrigger)

// ─── Image paths ───────────────────────────────────────────────────
const img = {
  intro:            '/src/assets/intro.jpg',
  mark1:            '/src/assets/ironman1/mark1.webp',
  mark1mask:        '/src/assets/ironman1/mark1-mask.webp',
  mark1Press: '/src/assets/ironman1/i_am_iron_man_press_conference_scene.mp4',
  im2poster:        '/src/assets/ironman2/im2-poster.jpg',
  im2expo:          '/src/assets/ironman2/im2-expo.jpg',
  im2donut:         '/src/assets/ironman2/im2-donut.jpg',
  avengersPoster:   '/src/assets/avengers/Avengers_poster_2012.webp',
  missileSave:      '/src/assets/avengers/missile_save.jpg',
  im3poster:        '/src/assets/ironman2/im3-poster.jpg',
  aouPoster:        '/src/assets/aou/aou-poster.webp',
  aouHulk:          '/src/assets/aou/aou-hulkbuster.jpg',
  aouVision:        '/src/assets/aou/aou-vision.jpg',
  cwPoster:         '/src/assets/civilwar/cw-poster.jpg',
  cwAirport:        '/src/assets/civilwar/cw-airport.webp',
  cwFight:          '/src/assets/civilwar/cw-finalfight.jpg',
  homecoming:       '/src/assets/homecoming/homecoming-rooftop.jpg',
  iwPoster:         '/src/assets/infinitywar/iw-poster.jpg',
  iwThanos:         '/src/assets/infinitywar/iw-tony-thanos.jpg',
  iwTitan:          '/src/assets/infinitywar/iw-titan.jpg',
 // Update these lines in your img object
  egPoster:         '/src/assets/endgame/eg-poster.jpg',
  egSnap:           '/src/assets/endgame/eg-snap.mp4',
  egLove:           '/src/assets/endgame/i_love_you_3000.mp4',
}

// ─── Chapter data ──────────────────────────────────────────────────
const chapters = [
  
  {
    number: 1, year: '2008', accentColor: '#00bfff',
    title: 'Iron Man',
    subtitle: 'The birth of the armored avenger',
    imageSrc: img.intro, imageAlt: 'Tony Stark — the man behind the iron',
    lines: [
      "Tony Stark — billionaire, genius, weapons dealer. Stark Industries was the arsenal of democracy.",
      "Captured in Afghanistan, forced to build a missile, he built a suit instead.",
      "The Mark I: iron scraps, a car battery, and sheer will. The world's most dangerous weapon.",
      "Back home, he shut down the weapons division. Nobody believed him.",
      "Then he built the Mark III — and flew.",
      "At a press conference, no note cards. No PR filter. Just: 'I am Iron Man.'",
    ],
    extra: 'mark1',
    outro: 'iamironman',   // <-- Add this new property
  },
  {
    number: 2, year: '2010', accentColor: '#c084fc',
    title: 'Iron Man 2',
    subtitle: 'The price of being the man in the suit',
    imageSrc: img.im2expo, imageAlt: 'Stark Expo — Tony at his most theatrical',
    lines: [
      "The world wanted Iron Man. Tony gave them a show — and slowly fell apart behind the mask.",
      "The arc reactor keeping him alive was poisoning his blood. He was dying.",
      "He raced cars in Monaco. Fought Rhodey in his own house. Drank in the suit.",
      "He discovered a new element — one his father hid for him in a 1974 Expo model.",
      "Whiplash brought the chaos. Nick Fury brought the context.",
      "Tony Stark didn't just survive. He threw a donut in the air and caught it on the way down.",
    ],
    extra: 'im2grid',
  },
  {
    number: 3, year: '2012', accentColor: '#34d399',
    title: 'The Avengers',
    subtitle: 'Earth\'s mightiest — barely',
    imageSrc: img.missileSave,       // <-- Moved the wide shot to the hero
    imageAlt: 'Iron Man missile sacrifice',
    lines: [
      "Loki came for the Tesseract. Tony came with a scotch and a bad attitude.",
      "He met a god, a soldier out of time, a monster, and an archer — and called them all out.",
      "'We're not soldiers.' Tony never wanted to be on a team.",
      "When a nuclear missile was launched at Manhattan, there was no time to ask permission.",
      "He flew it through the portal. Into deep space. Alone. No guarantee of coming back.",
      "He came back. He made a shawarma joke. But something had changed.",
      "The portal never fully closed inside him.",
    ],
    extra: 'avengersMissile',        // <-- You MUST change this from null!
  },
  {
    
    number: 4, year: '2013', accentColor: '#f97316',
    title: 'Iron Man 3',
    subtitle: 'The man, not the machine',
    imageSrc: null,                 // <-- Remove from the Hero to prevent widescreen cropping
    imageAlt: null,
    lines: [
      "After the portal, Tony couldn't sleep. Panic attacks. Obsession. Dozens of suits built in the dark.",
      "The Mandarin blew up his home. Left him stranded in Tennessee with a broken suit and a kid named Harley.",
      "No suit. No resources. Just Tony Stark with a hardware store.",
      "He dismantled the Mandarin myth — and found the real monster: Aldrich Killian and Extremis.",
      "Pepper was injected. The suits flew in remotely. He fought in a scrapyard with bare hands.",
      "'You can take away my suits, take away my home — but I am Iron Man.'",
      "He blew up every suit. Proof he didn't need them.",
    ],
    extra: 'im3posterBlock',        // <-- Trigger the custom portrait block
  },
  {
    number: 5, year: '2015', accentColor: '#facc15',
    title: 'Age of Ultron',
    subtitle: 'He built the monster to protect the world',
    imageSrc: null,             // <-- Set to null to prevent the aggressive cropping
    imageAlt: null,
    lines: [
      "Tony saw a vision of everyone dead. His fault. He decided to build a suit around the world.",
      "Ultron was supposed to be peace. It became extinction.",
      "'I had a vision — we all die and it's my fault.' He never stopped believing he caused it.",
      "Johannesburg: the Hulkbuster vs a mind-controlled Hulk. One of Tony's greatest fights — against a friend.",
      "Ultron was defeated. Sokovia was destroyed. Another city, another cost.",
      "Vision was born from the Mind Stone — Tony's last gamble that paid off.",
      "The team fractured quietly. Tony kept building. He couldn't stop.",
    ],
    extra: 'aougrid',
  },
 {
    number: 6, year: '2016', accentColor: '#ef4444',
    title: 'Civil War',
    subtitle: 'The fracture that changed everything',
    imageSrc: img.cwAirport,        // <-- Widescreen asset perfectly fits the Hero component
    imageAlt: 'Avengers divided at the airport',
    lines: [
      "A mother confronted Tony about her son — killed in Sokovia. He signed the Accords that night.",
      "Steve Rogers refused. Oversight meant delay. Delay meant lives.",
      "'We need to be put in check. We're not monitoring our own impact.' Tony meant every word.",
      "The airport battle: every Avenger turned against each other. Nobody really won.",
      "Then Tony learned the truth — Bucky Barnes killed his parents. Steve knew.",
      "The fight in that Siberian bunker wasn't about politics anymore. It was grief, raw and furious.",
      "Steve left his shield behind. The Avengers were over.",
      "Peter Parker got a new suit. Tony got a new responsibility he didn't ask for.",
    ],
    extra: 'cwgrid',
  },
  {
    number: 7, year: '2017', accentColor: '#f59e0b',
    title: 'Homecoming',
    subtitle: 'The mentor he never intended to become',
    imageSrc: img.homecoming, imageAlt: 'A rooftop lesson — without the suit, who are you?',
    lines: [
      "Tony gave a 15-year-old kid a billion-dollar suit and said 'stay local.'",
      "Peter Parker saw the world through Iron Man's eyes. Tony saw a version of himself — reckless, brilliant, stubborn.",
      "When Peter let the Vulture's weapons deal almost level a ferry, Tony took the suit back.",
      "'If you're nothing without the suit, you shouldn't have it.' He knew — he'd lived it.",
      "Peter stopped the Vulture anyway. With no suit. On his own.",
      "Tony offered him an Avengers membership. Peter said no.",
      "For once, Tony respected that someone didn't want the spotlight.",
    ],
    extra: null,
  },
  {
    number: 8, year: '2018', accentColor: '#7c3aed',
    title: 'Infinity War',
    subtitle: 'The worst day — and he saw it coming',
    imageSrc: null,             // <-- Set to null to prevent the aggressive cropping
    imageAlt: null,
    lines: [
      "Tony had been preparing for this for six years. The moment the alien ring appeared over Manhattan, he knew.",
      "He fought Thanos on Titan with everything. Nano-suit constructs. Every trick. Every upgrade.",
      "Thanos stabbed him. Blood on the ground of an alien world.",
      "'You have my respect, Stark.' Thanos knew his name. Tony was the only human he acknowledged.",
      "'Cursed with knowledge' — both of them saw what was coming and couldn't stop it.",
      "The snap. Half of all life — gone.",
      "Peter Parker dissolved in Tony's arms. 'Mr. Stark, I don't feel so good.'",
      "Stranded on Titan. The one who saw it coming, left alive to live with it.",
    ],
    extra: 'iwgrid',
  },
  {
    number: 9, year: '2019', accentColor: '#fbbf24',
    title: 'Endgame',
    subtitle: 'Whatever it takes',
    imageSrc: null,             // <-- Prevent Hero from aggressive cropping
    imageAlt: null,
    lines: [
      "Five years later. A lake house. A daughter named Morgan. Pepper. Peace.",
      "'I love you 3000.' He had everything. He nearly said no.",
      "He solved time travel in one night. Then called Fury.",
      "The Time Heist. Every impossible thing, one after another.",
      "When past-Thanos arrived with his army — Tony stood between them and everything he loved.",
      "Six Infinity Stones. One chance. Three words.",
      "'I am Iron Man.'",
      "The snap. The price.",
      "A pre-recorded message to Morgan. A small funeral on a lake. An Iron Man helmet floating on the water.",
      "He was never just the suit. He was the proof that one person — if they're brave enough — can change everything.",
    ],
    extra: 'eggrid',            // <-- Trigger the new layout block
  },
]
// ─── Background colors per chapter ────────────────────────────────
const bgColors = [
  '#000000', '#0a0010', '#001a0a', '#0d0500',
  '#0d0a00', '#0d0000', '#0d0800', '#050008', '#000000',
]

function ChapterSection({ ch, index }) {
  const sectionRef = useRef()
  const metaRef    = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(metaRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1,
          scrollTrigger: {
            trigger: metaRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id={`chapter-${ch.number}`}
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: '100px 0 40px',
        overflow: 'hidden',
      }}
    >
      <ParticleField color={ch.accentColor} count={25} />

      {/* Chapter number watermark */}
      <span style={{
        position: 'absolute', right: 60, top: 60,
        fontSize: 160, fontWeight: 900,
        color: ch.accentColor + '08',
        lineHeight: 1, userSelect: 'none',
        pointerEvents: 'none',
      }}>
        {String(ch.number).padStart(2, '0')}
      </span>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px' }}>

        {/* Meta */}
        <div ref={metaRef} style={{
          display: 'flex', alignItems: 'center',
          gap: 16, marginBottom: 24, opacity: 0,
        }}>
          <span style={{
            fontSize: 10, fontWeight: 700,
            letterSpacing: '0.3em', textTransform: 'uppercase',
            padding: '4px 14px', borderRadius: 100,
            background: ch.accentColor + '18',
            color: ch.accentColor,
            border: `1px solid ${ch.accentColor}33`,
          }}>{ch.year}</span>
          <span style={{
            fontSize: 10, color: ch.accentColor + '66',
            letterSpacing: '0.25em', textTransform: 'uppercase',
          }}>Chapter {ch.number} of 9</span>
        </div>

        {/* Scramble title */}
        <ScrambleTitle
          text={ch.title}
          color="#ffffff"
          style={{
            fontSize: 'clamp(40px, 8vw, 88px)',
            fontWeight: 900,
            display: 'block',
            letterSpacing: '0.04em',
            textShadow: `0 0 60px ${ch.accentColor}55`,
            marginBottom: 8,
            lineHeight: 1,
          }}
        />

        <p style={{
          color: ch.accentColor,
          fontSize: 12,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          marginBottom: 48,
        }}>{ch.subtitle}</p>

        {/* ── OUR CUSTOM GEOMETRY BLOCKS GO HERE ── */}
        {ch.imageSrc && (
          <div className="rounded-xl overflow-hidden w-full mb-8"
            style={{ border: `1px solid ${ch.accentColor}33`, boxShadow: `0 0 40px ${ch.accentColor}22` }}>
            <div className="relative w-full h-full">
              <HUDOverlay color={ch.accentColor} />
              <img src={ch.imageSrc} alt={ch.imageAlt} className="w-full aspect-video object-cover object-top" />
            </div>
          </div>
        )}

        {ch.extra === 'mark1' && (
          <HorizontalTunnel>
            {[img.mark1, img.mark1mask].map((src, i) => (
              <div key={i} className="w-[85vw] md:w-[60vw] shrink-0">
                <TiltCard accentColor={ch.accentColor}>
                  <div className="relative w-full h-full">
                    <HUDOverlay color={ch.accentColor} />
                    <img src={src} alt="Mark I suit" className="w-full aspect-video object-cover object-top" />
                  </div>
                </TiltCard>
              </div>
            ))}
            {/* ENGINEERING FIX: Trailing spacer pushes the last item to the center */}
            <div className="w-[10vw] md:w-[20vw] shrink-0" />
          </HorizontalTunnel>
        )}

        {ch.extra === 'im2grid' && (
          <HorizontalTunnel>
            <div className="w-[85vw] md:w-[60vw] shrink-0">
              <TiltCard accentColor={ch.accentColor}>
                <div className="relative w-full h-full">
                  <HUDOverlay color={ch.accentColor} />
                  <img src={img.im2donut} alt="Iron Man 2 scene" className="w-full aspect-video object-cover object-center" />
                </div>
              </TiltCard>
            </div>
            <div className="w-[60vw] md:w-[35vw] shrink-0">
              <TiltCard accentColor={ch.accentColor}>
                <div className="relative w-full h-full">
                  <HUDOverlay color={ch.accentColor} />
                  <img src={img.im2poster} alt="Iron Man 2 poster" className="w-full aspect-[2/3] object-cover object-top" />
                </div>
              </TiltCard>
            </div>
            {/* ENGINEERING FIX: Trailing spacer pushes the poster to the center */}
            <div className="w-[15vw] md:w-[30vw] shrink-0" />
          </HorizontalTunnel>
        )}

        {ch.extra === 'avengersMissile' && (
          <div className="flex flex-col items-center mb-8">
            <TiltCard accentColor={ch.accentColor} className="w-1/2 md:w-1/3">
              <div className="relative w-full h-full">
                <HUDOverlay color={ch.accentColor} />
                <img src={img.avengersPoster} alt="The Avengers Assemble" className="w-full aspect-[2/3] object-cover object-top" />
              </div>
            </TiltCard>
          </div>
        )}

        {ch.extra === 'im3posterBlock' && (
          <div className="flex flex-col items-center mb-8">
            <TiltCard accentColor={ch.accentColor} className="w-1/2 md:w-1/3">
              <div className="relative w-full h-full">
                <HUDOverlay color={ch.accentColor} />
                <img src={img.im3poster} alt="Iron Man 3 poster" className="w-full aspect-[2/3] object-cover object-top" />
              </div>
            </TiltCard>
          </div>
        )}

        {ch.extra === 'aougrid' && (
          <div className="flex flex-col items-center gap-8 mb-8">
            <TiltCard accentColor={ch.accentColor} className="w-1/2 md:w-1/3">
              <div className="relative w-full h-full">
                <HUDOverlay color={ch.accentColor} />
                <img src={img.aouPoster} alt="Age of Ultron Poster" className="w-full aspect-[2/3] object-cover object-top" />
              </div>
            </TiltCard>
            <div className="grid grid-cols-2 gap-4 w-full">
              {[img.aouHulk, img.aouVision].map((src, i) => (
                <TiltCard key={i} accentColor={ch.accentColor}>
                  <div className="relative w-full h-full">
                    <HUDOverlay color={ch.accentColor} />
                    <img src={src} alt="Age of Ultron scene" className="w-full aspect-video object-cover object-center" />
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        )}

        {ch.extra === 'cwgrid' && (
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[img.cwPoster, img.cwFight].map((src, i) => (
              <TiltCard key={i} accentColor={ch.accentColor}>
                <div className="relative w-full h-full">
                  <HUDOverlay color={ch.accentColor} />
                  <img src={src} alt="Civil War vertical art" className="w-full aspect-[2/3] object-cover object-top" />
                </div>
              </TiltCard>
            ))}
          </div>
        )}

        {ch.extra === 'iwgrid' && (
          <div className="flex flex-col items-center gap-8 mb-8">
            <TiltCard accentColor={ch.accentColor} className="w-1/2 md:w-1/3">
              <div className="relative w-full h-full">
                <HUDOverlay color={ch.accentColor} />
                <img src={img.iwPoster} alt="Infinity War Poster" className="w-full aspect-[2/3] object-cover object-top" />
              </div>
            </TiltCard>
            <div className="grid grid-cols-2 gap-4 w-full">
              {[img.iwThanos, img.iwTitan].map((src, i) => (
                <TiltCard key={i} accentColor={ch.accentColor}>
                  <div className="relative w-full h-full">
                    <HUDOverlay color={ch.accentColor} />
                    <img src={src} alt="Infinity War scene" className="w-full aspect-video object-cover object-center" />
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        )}

        {ch.extra === 'eggrid' && (
          <div className="flex flex-col items-center gap-8 mb-8">
            <TiltCard accentColor={ch.accentColor} className="w-1/2 md:w-1/3">
              <div className="relative w-full h-full">
                <HUDOverlay color={ch.accentColor} />
                <img src={img.egPoster} alt="Endgame Poster" className="w-full aspect-[2/3] object-cover object-top" />
              </div>
            </TiltCard>
            <div className="flex flex-col items-center w-full">
              <TiltCard accentColor={ch.accentColor} className="w-5/6 md:w-3/4 bg-black">
                <div className="relative w-full h-full">
                  <HUDOverlay color={ch.accentColor} />
                  <video src={img.egSnap} controls playsInline className="w-full aspect-video object-cover object-center" />
                </div>
              </TiltCard>
            </div>
          </div>
        )}
      </div>

      <StoryLine lines={ch.lines} accentColor={ch.accentColor} />

      {/* ── OUR POST-STORY OUTRO MEDIA ── */}
      {ch.outro === 'iamironman' && (
        <div className="flex flex-col items-center w-full mt-8 mb-16 px-8 relative z-10">
          <div className="rounded-xl overflow-hidden bg-black w-full md:w-3/4 flex items-center justify-center"
            style={{ border: `1px solid ${ch.accentColor}33`, boxShadow: `0 0 40px ${ch.accentColor}44` }}>
            <div className="relative w-full h-full">
              <HUDOverlay color={ch.accentColor} />
              <video src={img.mark1Press} controls playsInline className="w-full aspect-video object-cover object-center" />
            </div>
          </div>
        </div>
      )}

      {/* Snap transition after chapter 8 */}
      {ch.number === 8 && <SnapTransition />}

      {/* Wipe divider */}
      <ChapterWipe color={ch.accentColor} />
    </section>
  )
}

// Replace your entire bottom ScrollStory export with this:

export default function ScrollStory({ colorRef }) {
  const wrapperRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      chapters.forEach((ch, i) => {
        if (i === 0) return
        const section = document.querySelector(`#chapter-${ch.number}`)
        if (!section) return
        
        gsap.to(wrapperRef.current, {
          backgroundColor: bgColors[i],
          scrollTrigger: {
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
          }
        })

        // ─── PHASE 4: The Color Tracker ───
        // This tells the WebGL background to change color when a new chapter enters the screen
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => { if (colorRef) colorRef.current = ch.accentColor },
          onEnterBack: () => { if (colorRef) colorRef.current = ch.accentColor },
        })

      })
    }, wrapperRef)
    return () => ctx.revert()
  }, [colorRef])

  return (
    // ─── PHASE 4: Transparency ───
    // We added opacity: 0.92 so the 3D particles show through the background
    <div ref={wrapperRef} style={{ backgroundColor: bgColors[0], opacity: 0.92, mixBlendMode: 'normal' }}>
      {chapters.map((ch, i) => (
        <ChapterSection key={ch.number} ch={ch} index={i} />
      ))}
    </div>
  )
}
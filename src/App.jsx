{/*import SmoothScroll from './components/SmoothScroll'
import MagneticCursor from './components/MagneticCursor'
import TimelineScrubber from './components/TimelineScrubber'
import HeroIntro from './components/HeroIntro'
import ScrollStory from './components/ScrollStory'
import LegacySection from './components/LegacySection'

function App() {
  return (
    <SmoothScroll>
      <div style={{ background: '#000', minHeight: '100vh' }}>
        <MagneticCursor />
        <TimelineScrubber />
        <HeroIntro />
        <ScrollStory />
        <LegacySection />
      </div>
    </SmoothScroll>
  )
}

export default App   */}

import { useRef } from 'react'
import SmoothScroll from './components/SmoothScroll'
import MagneticCursor from './components/MagneticCursor'
import TimelineScrubber from './components/TimelineScrubber'
import HeroIntro from './components/HeroIntro'
import ScrollStory from './components/ScrollStory'
import LegacySection from './components/LegacySection'
import WebGLBackground from './components/WebGLBackground'

function App() {
  const colorRef = useRef('#00bfff')

  return (
    <>
      {/* 🚨 MOVED OUTSIDE: WebGL sits entirely behind the scroll wrapper now */}
      <WebGLBackground colorRef={colorRef} />
      
      <SmoothScroll>
        <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
          <MagneticCursor />
          <TimelineScrubber />
          <HeroIntro />
          <ScrollStory colorRef={colorRef} />
          <LegacySection />
        </div>
      </SmoothScroll>
    </>
  )
}

export default App
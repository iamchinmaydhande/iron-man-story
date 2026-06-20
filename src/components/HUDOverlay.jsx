export default function HUDOverlay({ color = '#00bfff', label = '' }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      pointerEvents: 'none', zIndex: 5,
    }}>
      {/* Scanline */}
      <div style={{
        position: 'absolute', left: 0, right: 0,
        height: 1,
        background: `linear-gradient(to right, transparent, ${color}66, transparent)`,
        animation: 'scanline 4s linear infinite',
      }} />

      {/* Corners */}
      <div className="hud-corner tl" style={{ color }} />
      <div className="hud-corner tr" style={{ color }} />
      <div className="hud-corner bl" style={{ color }} />
      <div className="hud-corner br" style={{ color }} />

      {/* Label */}
      {label && (
        <div style={{
          position: 'absolute', bottom: 12, left: 16,
          fontSize: 9, letterSpacing: '0.25em',
          color: color + '99', textTransform: 'uppercase',
          animation: 'hudpulse 2s ease-in-out infinite',
        }}>
          {label}
        </div>
      )}

      {/* Top right data readout */}
      <div style={{
        position: 'absolute', top: 12, right: 16,
        fontSize: 9, color: color + '66',
        letterSpacing: '0.15em', textAlign: 'right',
        lineHeight: 1.8,
      }}>
        <div>SYS: ONLINE</div>
        <div>PWR: 100%</div>
      </div>
    </div>
  )
}